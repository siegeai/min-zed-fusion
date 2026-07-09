import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Mail,
  Copy,
  Check,
  MessageCircle,
  Users,
  BarChart3,
  Zap,
  Clock,
} from "lucide-react";
import PillNav from "@/components/PillNav";
import MinFooter from "@/components/MinFooter";
import {
  IconTile,
  CARD_SURFACE,
  HeroAmbientGlow,
  PillButton,
} from "@/components/MinPrimitives";

const INQUIRIES = [
  {
    Icon: BarChart3,
    title: "Sales",
    body: "Ready to bring min. to your team, or want to see it on your own relationships.",
  },
  {
    Icon: Users,
    title: "Support",
    body: "Need help getting more out of min. across your team.",
  },
  {
    Icon: MessageCircle,
    title: "Partnerships",
    body: "Integrations, agencies, and co-marketing.",
  },
  {
    Icon: Zap,
    title: "Investors & Press",
    body: "Media inquiries and investment conversations.",
  },
];

export default function Contact() {
  const email = "hello@getmin.ai";
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      console.warn("clipboard:", e);
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact min.</title>
        <meta
          name="description"
          content="Relationship memory for teams. Get in touch with min. for sales, support, partnerships, investors, press. Email hello@getmin.ai, average reply under 2 hours."
        />
        <link rel="canonical" href="https://getmin.ai/contact" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-gray-900 font-sans antialiased overflow-x-hidden">
        <PillNav />

        <main>
          {/* Hero */}
          <section className="relative pt-36 md:pt-44 pb-12 overflow-hidden">
            <HeroAmbientGlow />
            <div className="relative max-w-3xl mx-auto px-6 text-center">
              <p className="text-[11px] md:text-xs tracking-[0.2em] uppercase text-gray-400 mb-6">
                Contact
              </p>
              <h1 className="font-display text-gray-900 font-semibold tracking-[-0.025em] leading-[1.08] text-4xl md:text-6xl">
                Talk to{" "}
                <span className="text-blue-600">a human</span>.
              </h1>
              <p className="mt-7 text-gray-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                Sales, support, partnerships, investors, press. One email,
                fast replies, no chatbots.
              </p>
            </div>
          </section>

          {/* Email card */}
          <section className="pb-16">
            <div className="max-w-2xl mx-auto px-6">
              <div className={`${CARD_SURFACE} p-8 md:p-10 text-center`}>
                <div className="flex justify-center mb-5">
                  <IconTile Icon={Mail} size="lg" tint="blue" glow="strong" />
                </div>
                <h2 className="text-gray-900 text-2xl font-semibold tracking-[-0.01em] mb-3">
                  hello@getmin.ai
                </h2>

                <div className="flex justify-center mb-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5">
                    <span className="block w-1.5 h-1.5 rounded-full bg-gray-900" />
                    <Clock
                      className="w-3.5 h-3.5 text-gray-500"
                      strokeWidth={2}
                    />
                    <span className="text-[11px] tracking-[0.12em] uppercase text-gray-600 font-medium">
                      Avg. reply &lt; 2 hours
                    </span>
                  </div>
                </div>

                <div
                  className={`${CARD_SURFACE} flex items-center justify-between gap-3 px-4 py-3 mb-6 max-w-sm mx-auto`}
                >
                  <span className="text-gray-900 font-medium font-mono text-sm">
                    {email}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="grid place-items-center w-8 h-8 rounded-md hover:bg-gray-50 transition-colors"
                    aria-label="Copy email"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-gray-900" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                </div>
                <PillButton href={`mailto:${email}`}>
                  <Mail className="w-4 h-4" strokeWidth={2} />
                  Send us an email
                </PillButton>
              </div>
            </div>
          </section>

          {/* Inquiry types */}
          <section className="pb-24">
            <div className="max-w-5xl mx-auto px-6">
              <p className="text-[11px] tracking-[0.2em] uppercase text-gray-500 mb-3 text-center">
                What to reach out about
              </p>
              <h2 className="font-display text-gray-900 text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-center mb-12">
                Pick a topic.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INQUIRIES.map((q) => (
                  <div
                    key={q.title}
                    className={`${CARD_SURFACE} p-6 flex items-start gap-4`}
                  >
                    <div className="shrink-0">
                      <IconTile Icon={q.Icon} size="sm" tint="blue" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 text-base font-semibold tracking-[-0.01em] mb-1">
                        {q.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {q.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <MinFooter />
      </div>
    </>
  );
}
