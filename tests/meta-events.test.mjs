import assert from "node:assert/strict";
import { test } from "node:test";
import { confirmedBookingId, flushMetaEvents, rememberLeadId, trackConfirmedBooking, trackConversion } from "../lib/meta-events.ts";

const booking = (data = {}, detail = {}) => ({ detail: {
  type: "bookingSuccessfulV2", namespace: "30min",
  data: { uid: "booking123", status: "ACCEPTED", paymentRequired: false, ...data }, ...detail,
} });

test("only a confirmed fresh booking with a stable ID is a Schedule conversion", () => {
  assert.equal(confirmedBookingId(booking()), "booking123");
  for (const status of ["PENDING", "CANCELLED", "REJECTED", undefined]) {
    assert.equal(confirmedBookingId(booking({ status })), null);
  }
  assert.equal(confirmedBookingId(booking({ paymentRequired: true })), null);
  assert.equal(confirmedBookingId(booking({ uid: undefined })), null);
  assert.equal(confirmedBookingId(booking({}, { namespace: "another-calendar" })), null);
  assert.equal(confirmedBookingId(booking({}, { type: "rescheduleBookingSuccessfulV2" })), null);
  assert.equal(confirmedBookingId(booking({}, { type: "dryRunBookingSuccessfulV2" })), null);
  assert.equal(confirmedBookingId(null), null);
});

test("conversion queue waits for the pixel and prevents duplicate callbacks without sending answers", () => {
  const previousEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = "production";
  const storage = new Map();
  globalThis.window = { location: { hostname: "example.com" } };
  globalThis.sessionStorage = { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) };
  const calls = [];
  trackConversion("Lead", "lead_test");
  assert.equal(calls.length, 0);
  window.fbq = (...args) => calls.push(args);
  flushMetaEvents();
  trackConversion("Lead", "lead_test");
  trackConfirmedBooking(booking());
  assert.equal(calls.length, 1, "a booking without a saved lead ID is skipped");
  // A restored tab can use the ID saved by an earlier successful submission.
  storage.set("stx_lead_id", "123");
  trackConfirmedBooking(booking());
  trackConfirmedBooking(booking());
  rememberLeadId(123);
  assert.equal(storage.get("stx_lead_id"), "123");
  trackConfirmedBooking(booking({ uid: "anotherBookingForSameLead" }));
  trackConfirmedBooking(booking({ status: "PENDING" }));
  trackConversion("CalendarOpened", "calendar_test");
  assert.deepEqual(calls, [
    ["track", "Lead", { content_name: "Business walkthrough" }, { eventID: "lead_test" }],
    ["track", "Schedule", { content_name: "Business walkthrough" }, { eventID: "stx-schedule-123" }],
    ["trackCustom", "CalendarOpened", { content_name: "Business walkthrough" }, { eventID: "calendar_test" }],
  ]);
  window.location.hostname = "localhost";
  trackConversion("Lead", "local_test");
  assert.equal(calls.length, 3);
  window.location.hostname = "example.com";
  process.env.NODE_ENV = "development";
  trackConversion("Lead", "dev_test");
  assert.equal(calls.length, 3);
  process.env.NODE_ENV = previousEnv;
  delete globalThis.window;
  delete globalThis.sessionStorage;
});
