export type QuestionnaireAnswers = {
  companyName: string;
  annualRevenue: string;
  decisionMaker: string;
  startTimeline: string;
  name: string;
  email: string;
  phone: string;
  smsConsent: boolean;
  note: string;
};

export const SMS_CONSENT_TEXT = "I agree to receive text messages from SystemizeTX LLC about my inquiry and appointment at the number provided. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. This choice is optional and is not a condition of purchase or booking.";

export type Attribution = Partial<Record<"utm_source" | "utm_medium" | "utm_campaign" | "utm_content" | "utm_term" | "fbclid" | "fbp" | "fbc" | "page_url", string>>;

const ENDPOINT = "https://systemizetx-crm.fly.dev/api/leads";
// This is the public form submission key, not an administrative API credential.
const FORM_KEY = "stx_pub_5CDNSifCskvsmkgEF8faFWgxnEtq7Plk";
const ATTRIBUTION_KEY = "stx_attribution_v1";
const QUERY_FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"] as const;

export function captureAttribution(): Attribution {
  const url = new URL(window.location.href);
  let saved: Attribution = {};
  try {
    const parsed: unknown = JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY) ?? "{}");
    if (parsed && typeof parsed === "object") {
      for (const key of [...QUERY_FIELDS, "page_url", "fbc"] as const) {
        const value = (parsed as Attribution)[key];
        if (typeof value === "string" && value.length <= 4096) saved[key] = value;
      }
    }
  } catch { /* Attribution should never prevent submitting a lead. */ }
  const hasCampaign = QUERY_FIELDS.some((key) => url.searchParams.has(key));
  const safeUrl = new URL(url.origin + url.pathname);
  const current: Attribution = {};
  for (const key of QUERY_FIELDS) {
    const value = url.searchParams.get(key)?.slice(0, 512);
    if (value) { current[key] = value; safeUrl.searchParams.set(key, value); }
  }
  if ((hasCampaign && saved.page_url !== safeUrl.toString()) || !saved.page_url) {
    saved = { ...current, page_url: safeUrl.toString() };
  }
  const cookies = new Map(document.cookie.split(";").map((part) => {
    const index = part.indexOf("=");
    return [part.slice(0, index).trim(), part.slice(index + 1)] as const;
  }));
  const fbp = cookies.get("_fbp");
  const fbc = cookies.get("_fbc");
  if (fbp && /^fb\.\d+\.\d+\.[\w.-]+$/.test(fbp)) saved.fbp = fbp;
  if (fbc && /^fb\.\d+\.\d+\.[\w.-]+$/.test(fbc) && (!saved.fbclid || fbc.endsWith(`.${saved.fbclid}`))) saved.fbc = fbc;
  if (saved.fbclid && !saved.fbc && /^[\w.-]+$/.test(saved.fbclid)) saved.fbc = `fb.1.${Date.now()}.${saved.fbclid}`;
  try { sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(saved)); }
  catch { /* Continue when session storage is blocked. */ }
  return saved;
}

export function buildLeadPayload(answers: QuestionnaireAnswers, eventId: string, attribution: Attribution, companySite = "") {
  return {
    ...attribution,
    name: answers.name.trim(),
    email: answers.email.trim(),
    phone: answers.phone.trim(),
    consent: answers.smsConsent,
    consent_text: SMS_CONSENT_TEXT,
    business: answers.companyName.trim(),
    revenue: answers.annualRevenue,
    problem: [
      `Decision maker: ${answers.decisionMaker}`,
      `Preferred start: ${answers.startTimeline}`,
      answers.note.trim() ? `Additional information: ${answers.note.trim()}` : "",
    ].filter(Boolean).join("\n"),
    event_id: eventId,
    company_site: companySite,
  };
}

export type LeadResult = { ok: true; id: string | number; duplicate?: boolean };

export async function submitLead(payload: ReturnType<typeof buildLeadPayload>): Promise<LeadResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-stx-key": FORM_KEY },
      body: JSON.stringify(payload),
      signal: controller.signal,
      credentials: "omit",
    });
    if (!response.ok) throw new Error(response.status === 429 ? "rate_limit" : "lead_save_failed");
    const result: unknown = await response.json();
    if (!result || typeof result !== "object") throw new Error("lead_save_failed");
    const lead = result as Partial<LeadResult>;
    if (lead.ok !== true || !((typeof lead.id === "number" && Number.isFinite(lead.id)) || (typeof lead.id === "string" && lead.id.length > 0))) {
      throw new Error("lead_save_failed");
    }
    return { ok: true, id: lead.id, duplicate: lead.duplicate === true };
  } finally {
    clearTimeout(timeout);
  }
}
