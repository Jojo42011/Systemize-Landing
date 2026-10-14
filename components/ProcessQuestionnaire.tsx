"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { rememberLeadId, trackConfirmedBooking, trackConversion } from "@/lib/meta-events";
import { buildLeadPayload, captureAttribution, submitLead, type QuestionnaireAnswers } from "@/lib/lead-submission";

const CAL_LINK = "info-systemize-agqycu/30min";
const CAL_NAMESPACE = "30min";
const CAL_SCRIPT = "https://app.cal.com/embed/embed.js";

type EmbedApi = {
  (...args: unknown[]): void;
  q?: unknown[][];
  ns?: Record<string, EmbedApi>;
  loaded?: boolean;
  config?: { forwardQueryParams?: boolean };
};

let calendarPromise: Promise<EmbedApi> | undefined;
let activeCalendarEventId: string | undefined;

function loadCalendar(): Promise<EmbedApi> {
  if (calendarPromise) return calendarPromise;
  calendarPromise = new Promise<EmbedApi>((resolve, reject) => {
    const win = window as Window & { Cal?: EmbedApi };
    let script: HTMLScriptElement | undefined;
    const cal: EmbedApi = win.Cal ?? function (...args: unknown[]) {
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = [];
        script = document.createElement("script");
        script.src = CAL_SCRIPT;
        script.async = true;
        cal.loaded = true;
      }
      if (args[0] === "init") {
        const api: EmbedApi = (...items: unknown[]) => { api.q!.push(items); };
        api.q = [];
        const namespace = args[1];
        if (typeof namespace === "string") {
          cal.ns![namespace] = cal.ns![namespace] ?? api;
          cal.ns![namespace].q!.push(args);
          cal.q!.push(["initNamespace", namespace]);
        } else cal.q!.push(args);
        return;
      }
      cal.q!.push(args);
    };
    win.Cal = cal;
    cal("init", CAL_NAMESPACE, { origin: "https://app.cal.com" });
    cal.config = cal.config ?? {};
    cal.config.forwardQueryParams = true;
    const api = cal.ns![CAL_NAMESPACE];
    api("on", { action: "bookingSuccessfulV2", callback: trackConfirmedBooking });
    api("on", { action: "bookerViewed", callback: () => {
      if (activeCalendarEventId) trackConversion("CalendarOpened", activeCalendarEventId);
    } });
    api("ui", {
      theme: "light",
      cssVarsPerTheme: { light: { "cal-brand": "#131DA6" }, dark: { "cal-brand": "#ffffff" } },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
    if (!script) { resolve(api); return; }
    function fail(message: string) {
      window.clearTimeout(timeout);
      script?.remove();
      if (win.Cal === cal) delete win.Cal;
      calendarPromise = undefined;
      reject(new Error(message));
    }
    const timeout = window.setTimeout(() => fail("Calendar loading timed out"), 15000);
    script.onload = () => { window.clearTimeout(timeout); resolve(api); };
    script.onerror = () => fail("Calendar could not load");
    document.head.appendChild(script);
  });
  return calendarPromise;
}

const blankAnswers: QuestionnaireAnswers = {
  companyName: "", annualRevenue: "", decisionMaker: "", startTimeline: "", name: "", email: "", note: "",
};
const steps = ["Your clinic", "Your plans", "Your details"];
const fieldClass = "mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink outline-offset-4 focus:border-accent";
const buttonClass = "inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-bold text-on-accent transition-colors hover:bg-canvas-deep disabled:cursor-wait disabled:opacity-60";

export default function ProcessQuestionnaire() {
  const dialog = useRef<HTMLDialogElement>(null);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const journeyId = useRef<string | null>(null);
  const busy = useRef(false);
  const attempt = useRef<{ fingerprint: string; id: string; saved: boolean } | null>(null);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireAnswers>(blankAnswers);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<"save" | "calendar" | "rate_limit" | null>(null);
  const [progress, setProgress] = useState("");
  const [companySite, setCompanySite] = useState("");

  useEffect(() => { captureAttribution(); }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  useEffect(() => { if (open) stepHeading.current?.focus(); }, [step, open]);

  function close() {
    dialog.current?.close();
    setOpen(false);
  }

  function update(key: keyof QuestionnaireAnswers, value: string) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    if (step < 2) { setStep(step + 1); return; }
    if (companySite) { setError("save"); return; }
    busy.current = true;
    setSubmitting(true);
    setError(null);
    const fingerprint = JSON.stringify(answers);
    if (attempt.current?.fingerprint !== fingerprint) {
      attempt.current = { fingerprint, id: crypto.randomUUID(), saved: false };
    }
    const current = attempt.current;
    try {
      if (!current.saved) {
        setProgress("Saving your answers…");
        const lead = await submitLead(buildLeadPayload(answers, current.id, captureAttribution(), companySite));
        rememberLeadId(lead.id);
        current.saved = true;
        // Match the CRM Conversions API event ID exactly. Duplicate CRM leads do not create another conversion.
        if (!lead.duplicate) trackConversion("Lead", current.id);
      }
      setProgress("Opening calendar…");
      const api = await loadCalendar();
      activeCalendarEventId = `calendar_${current.id}`;
      api("modal", {
        calLink: CAL_LINK,
        config: {
          layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "light",
          name: answers.name.trim(), email: answers.email.trim(),
        },
      });
      close();
    } catch (cause) {
      setError(current.saved ? "calendar" : cause instanceof Error && cause.message === "rate_limit" ? "rate_limit" : "save");
    } finally {
      busy.current = false;
      setSubmitting(false);
    }
  }

  return (
    <>
      <button type="button" className="inline-flex min-h-16 items-center justify-center gap-3 rounded-full bg-accent px-12 py-4 text-xl font-bold text-on-accent shadow-[0_6px_24px_-6px_rgba(19,29,166,0.35)] transition-colors hover:bg-canvas-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:px-14" onClick={() => {
        journeyId.current ??= crypto.randomUUID();
        trackConversion("QuestionnaireStarted", `start_${journeyId.current}`);
        setOpen(true); setError(null);
      }}>
        See the process <span aria-hidden="true">→</span>
      </button>
      <dialog ref={dialog} aria-labelledby="process-title" onCancel={(event) => { if (submitting) event.preventDefault(); else setOpen(false); }} onClose={() => setOpen(false)} className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-3xl border border-line bg-canvas p-0 text-left text-ink shadow-2xl backdrop:bg-canvas-deep/65">
        <div className="p-6 sm:p-9">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Your next step</p>
              <h2 id="process-title" className="font-display mt-2 text-2xl sm:text-3xl">Tell us about yourself</h2>
            </div>
            <button type="button" aria-label="Close questionnaire" onClick={close} disabled={submitting} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-2xl hover:bg-canvas-tint disabled:opacity-50">×</button>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink-2">Tell us a little about your clinic, then choose a time to see how the system works.</p>
          <ol aria-label="Questionnaire progress" className="mt-7 grid grid-cols-3 gap-2">
            {steps.map((label, index) => <li key={label} aria-current={index === step ? "step" : undefined} className={`border-t-4 pt-2 text-xs font-semibold ${index <= step ? "border-accent text-accent" : "border-line text-muted"}`}>{index + 1}. {label}</li>)}
          </ol>
          <form onSubmit={submit} aria-busy={submitting} className="mt-7">
            <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
              <label htmlFor="company-site">Company website<input id="company-site" name="company_site" tabIndex={-1} autoComplete="off" value={companySite} onChange={(event) => setCompanySite(event.target.value)} /></label>
            </div>
            <h3 ref={stepHeading} tabIndex={-1} className="mb-5 text-lg font-bold outline-none">{steps[step]}</h3>
            <fieldset disabled={submitting} className="space-y-5">
              <legend className="sr-only">{steps[step]}</legend>
              {step === 0 && <>
                <label className="block text-sm font-semibold" htmlFor="company-name">Company name<input id="company-name" autoComplete="organization" required maxLength={160} pattern=".*\S.*" value={answers.companyName} onChange={(e) => update("companyName", e.target.value)} className={fieldClass} /></label>
                <label className="block text-sm font-semibold" htmlFor="annual-revenue">Annual revenue (USD)<select id="annual-revenue" required value={answers.annualRevenue} onChange={(e) => update("annualRevenue", e.target.value)} className={fieldClass}><option value="" disabled>Select a range</option>{["Pre-revenue", "Under $100,000", "$100,000–$249,999", "$250,000–$499,999", "$500,000–$999,999", "$1 million or more", "Prefer not to say"].map((item) => <option key={item}>{item}</option>)}</select></label>
              </>}
              {step === 1 && <>
                <label className="block text-sm font-semibold" htmlFor="decision-maker">Are you a decision maker?<select id="decision-maker" required value={answers.decisionMaker} onChange={(e) => update("decisionMaker", e.target.value)} className={fieldClass}><option value="" disabled>Select an option</option>{["Yes, I make the final decision", "I share the decision with a partner or team", "No, I’m researching for the decision maker"].map((item) => <option key={item}>{item}</option>)}</select></label>
                <label className="block text-sm font-semibold" htmlFor="start-timeline">How soon would you like to get started?<select id="start-timeline" required value={answers.startTimeline} onChange={(e) => update("startTimeline", e.target.value)} className={fieldClass}><option value="" disabled>Select a timeline</option>{["As soon as possible", "Within 30 days", "In 1–3 months", "Just exploring"].map((item) => <option key={item}>{item}</option>)}</select></label>
              </>}
              {step === 2 && <>
                <label className="block text-sm font-semibold" htmlFor="contact-name">Full name<input id="contact-name" required autoComplete="name" maxLength={160} pattern=".*\S.*" value={answers.name} onChange={(e) => update("name", e.target.value)} className={fieldClass} /></label>
                <label className="block text-sm font-semibold" htmlFor="contact-email">Email address<input id="contact-email" required type="email" autoComplete="email" maxLength={254} value={answers.email} onChange={(e) => update("email", e.target.value)} className={fieldClass} /></label>
                <label className="block text-sm font-semibold" htmlFor="contact-note">Anything you’d like us to know? <span className="font-normal text-muted">(optional)</span><textarea id="contact-note" rows={3} maxLength={2000} value={answers.note} onChange={(e) => update("note", e.target.value)} className={`${fieldClass} resize-y`} /></label>
              </>}
            </fieldset>
            {step === 2 && <p className="mt-4 text-xs leading-relaxed text-caption">By submitting, you ask Systemize TX to contact you by email about your inquiry. Your answers are saved in our CRM and your name and email are used to prefill the calendar. See our <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Privacy Policy</a>.</p>}
            {error && <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error === "calendar"
              ? "Your answers are saved, but the calendar could not load. Please try again to open it."
              : error === "rate_limit"
                ? "There have been too many attempts. Please wait a few minutes and try again. Your answers are still here."
                : "We could not confirm that your answers were saved. Please try again. Your answers are still here."}</p>}
            <div className="mt-7 flex items-center justify-between gap-4">
              <button type="button" onClick={() => setStep(step - 1)} disabled={step === 0 || submitting} className="rounded-full px-3 py-3 text-sm font-semibold hover:bg-canvas-tint disabled:invisible">← Back</button>
              <button type="submit" disabled={submitting} className={buttonClass}>{submitting ? progress : step === 2 ? error === "calendar" ? "Open calendar" : "Submit & choose a time" : "Continue"} {!submitting && <span aria-hidden="true">→</span>}</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
