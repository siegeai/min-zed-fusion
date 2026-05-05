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
  CARD_INNER_HIGHLIGHT,
  HeroAmbientGlow,
  PillButton,
} from "@/components/MinPrimitives";

const INQUIRIES = [
  {
    Icon: MessageCircle,
    title: "General",
    body: "Questions, feedback, or just say hi.",
  },
  {
    Icon: Users,
    title: "Support",
    body: "Need help getting more out of min.?",
  },
  {
    Icon: BarChart3,
    title: "Sales & Partnerships",
    body: "Ready to plug min. into your brokerage?",
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
        <title>Contact min. | One inbox for everything</title>
        <meta
          name="description"
          content="Reach min. anytime at hello@getmin.ai. Sales, support, partnerships, investors, press. One shared inbox, fast replies."
        />
        <link rel="canonical" href="https://getmin.ai/contact" />
      </Helmet>

      <div className="min-h-screen bg-black text-slate-200 font-sans antialiased overflow-x-hidden">
        <PillNav />

        <main>
          {/* Hero */}
          <section className="relative pt-36 md:pt-44 pb-12 overflow-hidden">
            <HeroAmbientGlow />
            <div className="relative max-w-3xl mx-auto px-6 text-center">
              <p className="text-[11px] md:text-xs tracking-[0.2em] uppercase text-slate-400 mb-6">
                Contact
              </p>
              <h1 className="text-white font-semibold tracking-[-0.025em] leading-[1.08] text-4xl md:text-6xl">
                One inbox for{" "}
                <span className="text-blue-300">everything</span>.
              </h1>
              <p className="mt-7 text-slate-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                We dogfood min. The same inbox handles support, sales,
                partnerships, investors, press, and recruiting, all powered by
                our own product.
              </p>
            </div>
          </section>

          {/* Email card */}
          <section className="pb-16">
            <div className="max-w-2xl mx-auto px-6">
              <div
                className={`${CARD_SURFACE} p-8 md:p-10 text-center`}
                style={CARD_INNER_HIGHLIGHT}
              >
                <div className="flex justify-center mb-5">
                  <IconTile Icon={Mail} size="lg" tint="blue" glow="strong" />
                </div>
                <h2 className="text-white text-2xl font-semibold tracking-[-0.01em] mb-3">
                  Reach us, 24/7/365.
                </h2>

                <div className="flex justify-center mb-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5">
                    <span
                      className="block w-1.5 h-1.5 rounded-full bg-emerald-400"
                      style={{ boxShadow: "0 0 8px rgba(52,211,153,0.7)" }}
                    />
                    <Clock
                      className="w-3.5 h-3.5 text-emerald-300"
                      strokeWidth={2}
                    />
                    <span className="text-[11px] tracking-[0.12em] uppercase text-emerald-300 font-medium">
                      Avg. reply &lt; 2 hours
                    </span>
                  </div>
                </div>

                <div
                  className={`${CARD_SURFACE} flex items-center justify-between gap-3 px-4 py-3 mb-6 max-w-sm mx-auto`}
                  style={CARD_INNER_HIGHLIGHT}
                >
                  <span className="text-white font-medium font-mono text-sm">
                    {email}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="grid place-items-center w-8 h-8 rounded-md hover:bg-white/5 transition-colors"
                    aria-label="Copy email"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400" />
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
          <section className="py-16">
            <div className="max-w-5xl mx-auto px-6">
              <p className="text-[11px] tracking-[0.2em] uppercase text-slate-500 mb-3 text-center">
                What you can reach us about
              </p>
              <h2 className="text-white text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-center mb-12">
                One address, four conversations.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INQUIRIES.map((q) => (
                  <div
                    key={q.title}
                    className={`${CARD_SURFACE} p-6 flex items-start gap-4`}
                    style={CARD_INNER_HIGHLIGHT}
                  >
                    <div className="shrink-0">
                      <IconTile Icon={q.Icon} size="sm" tint="blue" />
                    </div>
                    <div>
                      <h3 className="text-white text-base font-semibold tracking-[-0.01em] mb-1">
                        {q.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {q.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Powered-by-min note */}
          <section className="pb-24 pt-4">
            <div className="max-w-2xl mx-auto px-6 text-center">
              <div
                className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-3 py-1.5"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
              >
                <Zap
                  className="w-3.5 h-3.5 text-blue-300"
                  strokeWidth={2}
                  fill="currentColor"
                />
                <span className="text-[11px] tracking-[0.12em] uppercase text-blue-200 font-medium">
                  Powered by min.
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mt-5">
                Every reply you get from us routes through min., the same
                quoting and capacity engine our customers run on.
              </p>
            </div>
          </section>
        </main>

        <MinFooter />
      </div>
    </>
  );
}
