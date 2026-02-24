import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import PromptBubbles from "@/components/PromptBubbles";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string })?.scrollTo;
    if (scrollTo) {
      const element = document.getElementById(scrollTo);
      if (element) {
        const headerHeight = 80;
        const top = element.offsetTop - headerHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
      navigate(".", { replace: true, state: {} });
    }
    if (location.hash) {
      const elementId = location.hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          const headerHeight = 80;
          const top = element.offsetTop - headerHeight;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 100);
    }
  }, [location, navigate]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "min. - Your rate assistant with perfect recall",
    "description": "A quoting assistant with perfect recall for freight brokers. All your quotes, centralized. Quote more, win more—delegate carrier blasts, rate lookups, and track-and-trace to your minion.",
    "url": "https://getmin.ai",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "min.",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "127" },
      "applicationSubCategory": "Freight Broker Quoting & Communication",
      "featureList": [
        "Quote lookup and perfect recall from your inbox",
        "Carrier outreach and quote requests in plain English",
        "Load tracking and ETA updates",
        "Ops digests and team collaboration",
        "One shared agent and carrier network"
      ]
    }
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "min.",
    "url": "https://getmin.ai",
    "logo": "https://app.getmin.ai/lovable-uploads/7a37e7bc-ff2e-4686-ab5e-b539c538ad30.png",
    "sameAs": ["https://twitter.com/getminai", "https://linkedin.com/company/getmin"],
    "contactPoint": { "@type": "ContactPoint", "contactType": "Customer Support", "email": "support@getmin.ai" }
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does min. work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Connect your inbox to your minion. You tell it what you need in plain English—carrier blasts, rate lookups, track and trace. It pulls quotes and context from your emails and handles the grunt work so you can focus on winning loads."
        }
      },
      {
        "@type": "Question",
        "name": "What can I ask my minion to do?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ask for carriers that run a lane, average booked and quoted rates, email blasts to your carrier list, status updates on active loads, load confirmations, and ops digests. If you'd normally do it over email, you can delegate it to your minion."
        }
      },
      {
        "@type": "Question",
        "name": "Does it work with my email?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. min. connects to Gmail or Outlook and works with your existing inbox. Your minion can send and organize on your behalf so everything stays in one place."
        }
      },
      {
        "@type": "Question",
        "name": "What about privacy and security?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We're Google CASA Tier 1 compliant. Your emails and quotes are encrypted. We never train models on your inbox or share your information with third parties."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>min. | Your rate assistant with perfect recall</title>
        <meta name="description" content="A quoting assistant with perfect recall for freight brokers. Quote more, win more. All your quotes centralized—delegate carrier blasts, rate lookups, and track-and-trace to your minion." />
        <meta name="keywords" content="freight broker, quoting assistant, rate capture, carrier outreach, load tracking, freight quoting, logistics assistant, minion" />
        <link rel="canonical" href="https://getmin.ai" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://getmin.ai/" />
        <meta property="og:title" content="min. | Your rate assistant with perfect recall" />
        <meta property="og:description" content="A quoting assistant with perfect recall for freight brokers. Quote more, win more. Delegate to your minion." />
        <meta property="og:site_name" content="min." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="min. | Your rate assistant with perfect recall" />
        <meta name="twitter:description" content="A quoting assistant with perfect recall for freight brokers. Quote more, win more. Delegate to your minion." />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(organizationData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqData)}</script>
      </Helmet>

      <div className="min-h-screen bg-white relative overflow-x-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/40 via-white to-green-50/20" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative" style={{ zIndex: 2 }}>
          <Header />

          <main className="pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-6">
              {/* Hero — simple messaging */}
              <div className="text-center mb-16 opacity-0 animate-fade-in" style={{ animationDelay: "0ms", animationFillMode: "forwards" }}>
                <h1 className="text-4xl md:text-6xl font-medium text-gray-900 mb-5 leading-tight">
                  Your very own <span className="text-green-600/90">AI minions</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-3 leading-snug font-light">
                  A quoting assistant with perfect recall, built for freight brokers who live in email.
                </p>
                <p className="text-base text-gray-500 max-w-xl mx-auto mb-10 font-light">
                  Quote freight at the speed of thought. Delegate the rest to your minion.
                </p>
                <Button size="lg" className="bg-green-600/90 hover:bg-green-700/90 text-white px-8 py-3 text-base font-normal" asChild>
                  <a href="https://app.getmin.ai/">Get started free</a>
                </Button>
              </div>

              {/* Things you can ask — Cursor-style section heading */}
              <div id="features" className="mb-24">
                <h2 className="text-center text-2xl md:text-3xl font-medium text-gray-900 mb-3">
                  Just tell your minion what you need
                </h2>
                <p className="text-center text-gray-500 mb-10 font-light max-w-xl mx-auto">
                  No forms, no workflows. Ask in plain English—carrier blasts, rate lookups, track and trace.
                </p>
                <PromptBubbles />
              </div>

              {/* Intelligence layer — after demo and prompt bubbles */}
              <div className="text-center mb-24 max-w-2xl mx-auto">
                <p className="text-gray-600 font-light text-lg md:text-xl leading-snug">
                  The intelligence layer that sits on top of your email. We handle the repetitive work so your team can focus on winning loads and deepening relationships.
                </p>
              </div>

              {/* Quote more, win more — 3-column feature blocks (Cursor-style) */}
              <section className="mb-24">
                <h2 className="text-center text-2xl md:text-3xl font-medium text-gray-900 mb-12">
                  Quote more, win more
                </h2>
                <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Instant recall</h3>
                    <p className="text-gray-600 text-sm font-light leading-relaxed">
                      Every quote from your inbox becomes a searchable asset. What did this lane move for? Who quoted last time? Your minion knows.
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Find coverage with a prompt</h3>
                    <p className="text-gray-600 text-sm font-light leading-relaxed">
                      Instead of copying 20 carrier emails per quote, tell your minion. It drafts personalized requests and collects responses—you approve and decide.
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">One shared memory</h3>
                    <p className="text-gray-600 text-sm font-light leading-relaxed">
                      One agent, not 10 private inboxes. Your team’s quotes and carrier network in one place. New hires see who to call and what to pay from day one.
                    </p>
                  </div>
                </div>
              </section>

              {/* You no longer need to */}
              <section className="mb-24 max-w-2xl mx-auto">
                <h2 className="text-center text-2xl md:text-3xl font-medium text-gray-900 mb-10">
                  You no longer need to
                </h2>
                <ul className="space-y-3 text-gray-600 font-light">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600/90 mt-1">×</span>
                    Dig through old email threads for that rate
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600/90 mt-1">×</span>
                    Copy-paste quotes into spreadsheets
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600/90 mt-1">×</span>
                    Re-price the same lane from scratch every time
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600/90 mt-1">×</span>
                    Send and manage a dozen carrier emails per quote
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600/90 mt-1">×</span>
                    Chase 10 carriers for updates separately
                  </li>
                </ul>
              </section>

              {/* FOMO quote — Cursor-style testimonial strip */}
              <section className="mb-24 max-w-3xl mx-auto">
                <blockquote className="text-center border-l-0 pl-0">
                  <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed italic">
                    “The thing is, every quote that flows through makes the next one faster. Six months from now, your agent knows your lanes, your carriers, your pricing. It’s not a static tool—it learns from you.”
                  </p>
                </blockquote>
              </section>

              {/* FAQ */}
              <div className="mb-16 max-w-5xl mx-auto">
                <FAQ />
              </div>

              {/* CTA — Cursor-style final CTA */}
              <div className="text-center py-12 bg-green-600/90 rounded-2xl px-6 max-w-5xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-medium text-white mb-4">Ready to deploy your minion?</h2>
                <p className="text-green-100/90 mb-6 font-light">Get started in seconds. No credit card.</p>
                <Button size="lg" variant="secondary" className="bg-white/95 text-green-700 hover:bg-white font-normal" asChild>
                  <a href="https://app.getmin.ai/">
                    Get started free
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Index;
