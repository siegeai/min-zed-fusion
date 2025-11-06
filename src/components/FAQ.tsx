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
      answer: "Our AI reads every single email and gives it a gist (tldr) and determines a lane (like a Gmail label). You can add your own small task agents to every lane so it can research, extract, group emails based on its content, including attachments!"
    },
    {
      question: "How many emails can I process?",
      answer: "The limit is 1,000 emails per inbox per month - which is more than enough for most use cases! Plus, one workspace can support unlimited inboxes. On the solo plan, you can connect as many inboxes as you want (hello@, support@, sales@, etc.)."
    },
    {
      question: "What happens to my existing emails?",
      answer: "When you connect Gmail, min. processes the most recent 300 emails per inbox to get you started. After that, every new incoming email is automatically processed and organized into lanes. Your old emails stay safely in Gmail."
    },
    {
      question: "What are lanes and how do they help me?",
      answer: "Lanes are smart email categories that auto-sort your inbox. Default lanes include Front Office (customer-facing), Back Office (internal ops), Mailroom (transactional), Noise (newsletters, promos), and Human Conversations (real people needing replies). Each email gets automatically routed to the right lane, so you see what matters first."
    },
    {
      question: "Do I need to leave Gmail?",
      answer: "Nope! min. lives on top of Gmail. Your emails stay in Gmail, we just give you a better way to collaborate on them as a team. Think of it as Gmail with superpowers - all the power, none of the mess."
    },
    {
      question: "Does min. sync with Gmail?",
      answer: "min. supports bidirectional sync. When you reply in Gmail, it shows up in min. When you reply in min., it shows up in Gmail. We also sync read status, so your team always knows what's been handled, regardless of where you're working."
    },
    {
      question: "Can my whole team use the same inbox?",
      answer: "Yes! That's the whole point. Everyone sees hello@, support@, and sales@ in one workspace. You can connect unlimited inboxes to a single workspace. Assign ownership, leave internal notes, tag teammates - all without forwarding or cc'ing. Finally, true email collaboration."
    },
    {
      question: "How is this different from a helpdesk or CRM?",
      answer: "Helpdesks turn conversations into tickets. CRMs force you into rigid workflows. min. keeps email human and fast. We're the layer before your CRM (triage), around it (collaboration), and after it (keep it personal). Perfect for founders who want to scale without losing the human touch."
    },
    {
      question: "How long does setup actually take?",
      answer: "Literally 36 seconds. Connect your Gmail, invite your team, and lanes start auto-organizing immediately. No forms, no training, no complex onboarding. If you can click 'Connect with Google', you're done."
    },
    {
      question: "What about privacy and security?",
      answer: "We take security seriously. We're Google CASA Tier 1 compliant with a 9.7/10 score, and we're currently in the process of obtaining SOC 2 certification. Your emails are processed with enterprise-grade encryption. AI reads emails to create summaries and lane assignments, but we never train models on your data or share it with third parties."
    },
    {
      question: "Can I customize the lanes and task agents?",
      answer: "Absolutely! While we provide default lanes that work for most teams, you can customize them to match your workflow. Add your own task agents to any lane - they can research, extract data, group emails based on content, and even process attachments. It's like having a smart assistant for each category of email."
    },
    {
      question: "What if the AI categorizes something wrong?",
      answer: "Just move the email to the correct lane. The AI learns from these corrections and gets smarter over time. You're always in control - lanes are suggestions, not hard rules. Everything stays flexible and human-friendly."
    },
    {
      question: "Does this work with Outlook or other email providers?",
      answer: "Currently, min. works with Gmail and Google Workspace accounts. We chose Gmail because it's what most startups use, and it lets us build the best possible experience. Support for other providers is on our roadmap based on demand!"
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
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 font-light">
            Everything you need to know about min.
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

