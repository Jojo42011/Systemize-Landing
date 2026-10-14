type ConversionName = "Lead" | "Schedule" | "QuestionnaireStarted" | "CalendarOpened";
type Pixel = (...args: unknown[]) => void;
type Conversion = { name: ConversionName; id: string };

const pending = new Map<string, Conversion>();
const sent = new Set<string>();
const STORAGE_KEY = "stx_meta_events_v1";
const LEAD_ID_KEY = "stx_lead_id";
let currentLeadId: string | null = null;

function validLeadId(value: unknown): string | null {
  if (typeof value !== "string" && typeof value !== "number") return null;
  const id = String(value);
  return /^[a-zA-Z0-9_-]{1,128}$/.test(id) ? id : null;
}

export function rememberLeadId(value: string | number) {
  currentLeadId = validLeadId(value);
  try {
    if (currentLeadId) sessionStorage.setItem(LEAD_ID_KEY, currentLeadId);
    else sessionStorage.removeItem(LEAD_ID_KEY);
  } catch { /* Keep the returned lead ID in memory if session storage is blocked. */ }
}

function savedLeadId(): string | null {
  if (currentLeadId) return currentLeadId;
  try { return validLeadId(sessionStorage.getItem(LEAD_ID_KEY)); }
  catch { return null; }
}

export function pixelEnabled() {
  return typeof window !== "undefined" && process.env.NODE_ENV === "production"
    && !["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);
}

export function flushMetaEvents() {
  if (!pixelEnabled()) return;
  const fbq = (window as Window & { fbq?: Pixel }).fbq;
  if (!fbq) return;
  let saved: string[] = [];
  try {
    const parsed: unknown = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]");
    if (Array.isArray(parsed)) saved = parsed.filter((id): id is string => typeof id === "string");
  } catch { /* Storage can be unavailable in privacy modes. */ }
  saved.forEach((id) => sent.add(id));
  for (const [key, event] of pending) {
    if (!sent.has(key)) {
      try {
        fbq(event.name === "Lead" || event.name === "Schedule" ? "track" : "trackCustom",
          event.name, { content_name: "Business walkthrough" }, { eventID: event.id });
        sent.add(key);
      } catch { continue; }
    }
    pending.delete(key);
  }
  try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...sent].slice(-200))); }
  catch { /* In memory protection still prevents duplicate callbacks. */ }
}

export function trackConversion(name: ConversionName, id: string) {
  if (!pixelEnabled()) return;
  pending.set(`${name}:${id}`, { name, id });
  flushMetaEvents();
}

export function confirmedBookingId(event: unknown): string | null {
  if (!event || typeof event !== "object" || !("detail" in event)) return null;
  const detail = event.detail as { type?: unknown; namespace?: unknown; data?: unknown } | null;
  if (detail?.type !== "bookingSuccessfulV2" || detail.namespace !== "30min") return null;
  const data = detail.data as { uid?: unknown; status?: unknown; paymentRequired?: unknown } | null;
  if (!data || data.status !== "ACCEPTED" || data.paymentRequired !== false) return null;
  return typeof data.uid === "string" && /^[a-zA-Z0-9_-]{1,128}$/.test(data.uid) ? data.uid : null;
}

export function trackConfirmedBooking(event: unknown) {
  const uid = confirmedBookingId(event);
  if (!uid) return;
  const leadId = savedLeadId();
  // The CRM sends one Schedule per lead, even when that lead books again.
  if (leadId) trackConversion("Schedule", `stx-schedule-${leadId}`);
}
