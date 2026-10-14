import assert from "node:assert/strict";
import { test } from "node:test";
import { buildLeadPayload, captureAttribution, submitLead } from "../lib/lead-submission.ts";

const answers = {
  companyName: " Example Clinic ", annualRevenue: "Under $100,000",
  decisionMaker: "Yes, I make the final decision", startTimeline: "Within 30 days",
  name: " Test Visitor ", email: " test@example.com ", note: " A business inquiry ",
};

test("maps existing answers without inventing phone details or consent", () => {
  const payload = buildLeadPayload(answers, "event123", { utm_source: "meta", fbp: "fb.1.123.456" });
  assert.equal(payload.name, "Test Visitor");
  assert.equal(payload.email, "test@example.com");
  assert.equal(payload.business, "Example Clinic");
  assert.equal(payload.revenue, answers.annualRevenue);
  assert.match(payload.problem, /Decision maker: Yes, I make the final decision/);
  assert.match(payload.problem, /Preferred start: Within 30 days/);
  assert.match(payload.problem, /Additional information: A business inquiry/);
  assert.equal(payload.event_id, "event123");
  assert.equal(payload.company_site, "");
  for (const field of ["phone", "city", "state", "consent", "consent_text"]) assert.equal(field in payload, false);
});

test("retains ad attribution, removes unrelated URL parameters, and never invents a click", () => {
  const storage = new Map();
  globalThis.sessionStorage = { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) };
  globalThis.window = { location: { href: "https://example.com/?utm_source=meta&fbclid=click123&email=private%40example.com" } };
  globalThis.document = { cookie: "_fbp=fb.1.123.456; _fbc=fb.1.123.oldclick" };
  const first = captureAttribution();
  assert.equal(first.utm_source, "meta");
  assert.equal(first.fbp, "fb.1.123.456");
  assert.match(first.fbc, /^fb\.1\.\d+\.click123$/);
  assert.equal(first.page_url.includes("email"), false);
  assert.equal(captureAttribution().fbc, first.fbc);
  window.location.href = "https://example.com/";
  assert.equal(captureAttribution().fbclid, "click123");
  storage.clear(); document.cookie = "";
  const organic = captureAttribution();
  assert.equal(organic.fbclid, undefined);
  assert.equal(organic.fbc, undefined);
  assert.equal(organic.fbp, undefined);
  delete globalThis.window; delete globalThis.document; delete globalThis.sessionStorage;
});

test("requires an explicit saved lead response and preserves the shared event ID", async (t) => {
  const payload = buildLeadPayload(answers, "event123", {});
  const fetchMock = t.mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(url, "https://systemizetx-crm.fly.dev/api/leads");
    assert.equal(options.method, "POST");
    assert.ok(options.headers["x-stx-key"].startsWith("stx_pub_"));
    assert.equal(JSON.parse(options.body).event_id, "event123");
    return new Response(JSON.stringify({ ok: true, id: 123, duplicate: true }), { status: 200 });
  });
  assert.deepEqual(await submitLead(payload), { ok: true, id: 123, duplicate: true });
  for (const body of [{ ok: false }, { ok: true }, null, { ok: true, id: null }]) {
    fetchMock.mock.mockImplementation(async () => new Response(JSON.stringify(body), { status: 200 }));
    await assert.rejects(submitLead(payload), /lead_save_failed/);
  }
  for (const status of [400, 401, 500]) {
    fetchMock.mock.mockImplementation(async () => new Response("{}", { status }));
    await assert.rejects(submitLead(payload), /lead_save_failed/);
  }
  fetchMock.mock.mockImplementation(async () => new Response("{}", { status: 429 }));
  await assert.rejects(submitLead(payload), /rate_limit/);
  fetchMock.mock.mockImplementation(async () => { throw new TypeError("Network unavailable"); });
  await assert.rejects(submitLead(payload), /Network unavailable/);
});
