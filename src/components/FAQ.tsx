import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How does it work?",
      answer: "Connect your inbox to your minion. You tell it what you need in plain English—carrier blasts, rate lookups, track and trace. It pulls quotes and context from your emails and handles the grunt work so you can focus on winning loads and making decisions."
    },
    {
      question: "What can I ask my minion to do?",
      answer: "Ask for carriers that run a lane, average booked and quoted rates for a lane, email blasts to your carrier list, status updates on active loads, load confirmations, and ops digests. If you’d normally do it over email, you can delegate it to your minion."
    },
    {
      question: "Does it work with my email?",
      answer: "Yes. min. connects to Gmail or Outlook and works with your existing inbox. Your minion can send and organize on your behalf so everything stays in one place—one shared memory, not 10 private inboxes."
    },
    {
      question: "How long does setup take?",
      answer: "Seconds. Connect Gmail or Outlook, tell your minion what you need, and you’re live. No training, no complex onboarding."
    },
    {
      question: "What about privacy and security?",
      answer: "We’re Google CASA Tier 1 compliant. Your emails and quotes are encrypted. We never train models on your inbox or share your information with third parties."
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `
          linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-3">
            Frequently asked questions
          </h2>
          <p className="text-lg text-gray-600 font-light">
            Your minion, your inbox, your edge.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white border-2 border-green-100/60 rounded-lg px-6 hover:border-green-200/80 transition-colors -mt-[2px] first:mt-0"
            >
              <AccordionTrigger className="text-left text-gray-900 font-normal hover:text-green-600 py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4 leading-relaxed font-light">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-3 font-light">Still have questions?</p>
          <a 
            href="mailto:hello@getmin.ai" 
            className="text-green-600 hover:text-green-700 font-normal underline"
          >
            Reach out to hello@getmin.ai
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

