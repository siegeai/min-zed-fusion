import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "How does it work?",
    answer:
      "Connect your inbox to your minion. You tell it what you need in plain English: carrier blasts, rate lookups, track and trace. It pulls quotes and context from your emails and handles the grunt work so you can focus on winning loads and making decisions.",
  },
  {
    question: "What can I ask my minion to do?",
    answer:
      "Ask for carriers that run a lane, average booked and quoted rates for a lane, email blasts to your carrier list, status updates on active loads, load confirmations, and ops digests. If you'd normally do it over email, you can delegate it to your minion.",
  },
  {
    question: "Does it work with my email?",
    answer:
      "Yes. min. connects to Gmail or Outlook and works with your existing inbox. Your minion can send and organize on your behalf so everything stays in one place. One shared memory, not 10 private inboxes.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Seconds. Connect Gmail or Outlook, tell your minion what you need, and you're live. No training, no complex onboarding.",
  },
  {
    question: "What about privacy and security?",
    answer:
      "We're Google CASA Tier 1 compliant. Your emails and quotes are encrypted. We never train models on your inbox or share your information with third parties.",
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
        Your minion, your inbox, your edge.
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
