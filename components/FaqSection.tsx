const faqs: { question: string; answer: string }[] = [
  {
    question: "Is this a chatbot?",
    answer:
      "No. A chatbot is a widget you bolt onto a website. What we install is a lead response system built into your actual operation: it works from your lead sources, writes into your CRM, follows your qualification rules, and hands conversations to your team at the moments you define. AI handles the conversational work, and the system around it is designed for your business specifically.",
  },
  {
    question: "Is Aethon a marketing agency?",
    answer:
      "No. We do not run ads, produce content, or generate leads. You keep whatever is already creating demand. Our work starts the moment a lead exists: making sure it gets a fast response, consistent follow up, real qualification, and a clear next step instead of going quiet.",
  },
  {
    question: "Does this replace our team?",
    answer:
      "No. It removes the repetitive work your team should not be doing, like first responses at odd hours, fifth follow ups, and chasing incomplete CRM records, so their time goes to actual conversations and closings. Handoff to a human is a designed part of the system, not an afterthought.",
  },
  {
    question: "Will it work with our existing CRM?",
    answer:
      "That is the intent of the build. We design around the tools you already run rather than asking you to switch. During the walkthrough we look at your current CRM and lead sources specifically and tell you what integration would look like before anything is committed.",
  },
  {
    question: "How custom is the implementation?",
    answer:
      "Fully. There is no prebuilt product being resold. We audit how leads actually flow through your operation, including sources, team responsibilities, qualification criteria, scheduling, and escalation, and build the system around that. Our rule is simple: we do not automate a guess. We map the real process first, prove the workflow, then automate it.",
  },
  {
    question: "What happens when a lead needs a human?",
    answer:
      "The system escalates. You define the moments that require a person, such as a qualified buyer ready to talk, a pricing question, or a sensitive situation, and the conversation routes to the right team member with full context, not a cold transfer.",
  },
  {
    question: "How is success measured?",
    answer:
      "Against your numbers, defined before the build: response times, follow up completion, qualified conversations, appointments booked, and what your CRM actually captures. We establish the baseline during the audit so improvement is measured, not asserted.",
  },
  {
    question: "How quickly can implementation begin?",
    answer:
      "The walkthrough is the first step. If it fits, the audit begins from there, and build timelines are scoped to your operation's complexity. We will give you a realistic timeline in writing rather than a universal promise.",
  },
  {
    question: "What does Aethon need from us?",
    answer:
      "Context and access, in that order. Early on: an honest picture of your lead sources, volumes, current response process, and what qualification means to you. During the build: access to the tools involved, such as your CRM, calendars, and phone or messaging channels, plus a point person who can answer questions about how things really work. Implementation is collaborative, and the system is only as good as the workflow it is built around.",
  },
  {
    question: "What happens after the first call?",
    answer:
      "If it fits, the next step is the audit: we map your actual lead flow end to end and establish the baseline numbers. From there you get a specific proposal covering what would be built, how it fits your operation, how success is measured, and a realistic timeline. Discovery sometimes surfaces larger operational opportunities beyond lead response, and whether to pursue those is always your call.",
  },
  {
    question: "What does the free walkthrough involve?",
    answer:
      "A focused call about your operation: where leads come from, what happens when one arrives, where responses and follow up currently break down, and what that is likely costing. If there is a meaningful gap, we show you what a system built around your workflow would look like. If there is not, we say so.",
  },
  {
    question: "Do you guarantee a specific number of appointments?",
    answer:
      "Not universally, and you should be wary of anyone who does before seeing your operation. We first evaluate your lead volume, sources, workflow, and baseline performance. Any performance commitment is defined around those real inputs, in written terms, for your specific engagement.",
  },
];

/**
 * Accessible FAQ accordion built on native <details>/<summary>. Fully
 * keyboard operable with no client side JavaScript.
 */
export default function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-24"
    >
      <p className="text-center text-sm font-bold uppercase tracking-[0.16em] text-saffron">
        Questions, answered
      </p>
      <h2
        id="faq-heading"
        className="font-display mt-4 text-center text-3xl sm:text-4xl"
      >
        What operators usually want to know
      </h2>

      <div className="mt-12 divide-y divide-line-soft rounded-2xl border border-line bg-white">
        {faqs.map((faq) => (
          <details key={faq.question} className="faq-item group px-6 sm:px-8">
            <summary className="flex items-center justify-between gap-4 py-5 text-left text-lg font-semibold">
              {faq.question}
              <span
                aria-hidden="true"
                className="faq-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-muted"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </summary>
            <p className="pb-6 pr-2 text-base leading-relaxed text-ink-2 sm:pr-10">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

/** Exported for the FAQPage structured data block. */
export { faqs };
