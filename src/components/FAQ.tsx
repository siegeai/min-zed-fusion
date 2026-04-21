import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "What is min., and what it isn't.",
    answer:
      "min. turns every email, load sheet, quote, and document your team touches into a Collective Memory, a shared brain the whole company can search and act on in plain English. We are a tool company, not an ad company, not a data broker. We make money when you pay for the tool, never by selling, brokering, or exploiting your data. That's our pledge, and no amount of money will change it.",
  },
  {
    question: "How does it work?",
    answer:
      "Sign in with Gmail or Outlook. From day one, min. is already reading every reply, logging every commitment, and building your Collective Memory against your real email history. Tell it what you need in plain English, carrier blasts, rate lookups, track and trace, account check-ins, and it drafts, chases, and files the grunt work so you focus on the decisions.",
  },
  {
    question: "What can I ask min. to do?",
    answer:
      "Ask for carriers that run a lane, average booked and quoted rates for a lane, email blasts to your carrier list, status updates on active loads, load confirmations, and ops digests. If it lives in email, min. can do it.",
  },
  {
    question: "Does it work with my email?",
    answer:
      "Yes. min. connects to Gmail or Outlook and works with your existing inbox. It reads, drafts, and sends on your behalf so everything stays in one place. One shared Collective Memory, not 10 private inboxes.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Seconds to start. Sign in with Gmail or Outlook, tell min. what you need, and you're live. Your Collective Memory indexes up to 50,000 threads in under 20 minutes. No training, no complex onboarding.",
  },
  {
    question: "What about data privacy and security?",
    answer:
      "Your Collective Memory is yours. We never sell your data, never broker it, and never train our models on it, period. Your emails are encrypted, your account is isolated, and nothing is shared with third parties. We're Google CASA Tier 2 compliant.",
  },
];

const FAQ = () => (
  <section>
    <div style={{ textAlign: "center", marginBottom: 40 }}>
      <h2
        style={{
          fontSize: "clamp(1.4rem, 3.5vw, 2rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "#F9FAFB",
          margin: "0 0 8px",
        }}
      >
        Frequently asked questions
      </h2>
      <p style={{ color: "#6B7280", fontSize: 14 }}>
        Your Collective Memory, your inbox, your edge.
      </p>
    </div>

    <Accordion type="single" collapsible className="w-full space-y-2">
      {FAQS.map((faq, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          style={{
            background: "#1E2630",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 10,
            padding: "0 20px",
            marginTop: i === 0 ? 0 : undefined,
          }}
          className="-mt-px first:mt-0"
        >
          <AccordionTrigger
            className="text-left font-normal py-4 hover:no-underline"
            style={{ color: "#F9FAFB" }}
          >
            {faq.question}
          </AccordionTrigger>
          <AccordionContent
            className="pb-4 leading-relaxed font-light"
            style={{ color: "#9CA3AF" }}
          >
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>

    <div style={{ textAlign: "center", marginTop: 32 }}>
      <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 6 }}>
        Still have questions?
      </p>
      <a
        href="mailto:hello@getmin.ai"
        style={{ color: "#00AB55", fontSize: 14, textDecoration: "underline" }}
      >
        hello@getmin.ai
      </a>
    </div>
  </section>
);

export default FAQ;
