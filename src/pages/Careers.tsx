import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Mail,
  Copy,
  Check,
  Code,
  Lightbulb,
  Heart,
  Users,
  Zap,
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

const TRAITS = [
  {
    Icon: Code,
    title: "Builders",
    body: "You'd rather ship a prototype than write a doc about it.",
  },
  {
    Icon: Lightbulb,
    title: "Thinkers",
    body: "You see liquidity where others see chaos in an inbox.",
  },
  {
    Icon: Heart,
    title: "Operators",
    body: "You've felt the pain of brokerage workflow firsthand.",
  },
  {
    Icon: Users,
    title: "Collaborators",
    body: "You give honest feedback and take it the same way.",
  },
];

const BENEFITS = [
  "Competitive salary + meaningful equity",
  "Health, dental, and vision",
  "Flexible PTO and parental leave",
  "Remote-first, optional LA office",
  "Annual learning budget",
  "Whatever hardware you need",
];

export default function Careers() {
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
        <title>Careers at min. | Build the network that compounds</title>
        <meta
          name="description"
          content="Help us build the quoting and capacity engine for freight brokers. Email hello@getmin.ai with what you've built. No traditional postings."
        />
        <link rel="canonical" href="https://getmin.ai/careers" />
      </Helmet>

      <div className="min-h-screen bg-black text-slate-200 font-sans antialiased overflow-x-hidden">
        <PillNav />

        <main>
          {/* Hero */}
          <section className="relative pt-36 md:pt-44 pb-16 overflow-hidden">
            <HeroAmbientGlow />
            <div className="relative max-w-3xl mx-auto px-6 text-center">
              <p className="text-[11px] md:text-xs tracking-[0.2em] uppercase text-slate-400 mb-6">
                Careers
              </p>
              <h1 className="text-white font-semibold tracking-[-0.025em] leading-[1.08] text-4xl md:text-6xl">
                Build the network that{" "}
                <span className="text-blue-300">compounds</span>.
              </h1>
              <p className="mt-7 text-slate-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                No job postings. No five-round interviews. Email us what you've
                built and what you want to build next.
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
                  Email is the application.
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-7 max-w-md mx-auto">
                  Send a resume or a link to something you're proud of. Tell us
                  why you're excited about freight. We'll write back.
                </p>
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
                <PillButton href={`mailto:${email}?subject=Careers`}>
                  <Mail className="w-4 h-4" strokeWidth={2} />
                  Email us
                </PillButton>
              </div>
            </div>
          </section>

          {/* Who we're looking for */}
          <section className="py-16">
            <div className="max-w-5xl mx-auto px-6">
              <p className="text-[11px] tracking-[0.2em] uppercase text-slate-500 mb-3 text-center">
                Who we're looking for
              </p>
              <h2 className="text-white text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-center mb-12">
                Four kinds of people.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TRAITS.map((t) => (
                  <div
                    key={t.title}
                    className={`${CARD_SURFACE} p-6`}
                    style={CARD_INNER_HIGHLIGHT}
                  >
                    <div className="mb-4">
                      <IconTile Icon={t.Icon} size="sm" tint="blue" />
                    </div>
                    <h3 className="text-white text-base font-semibold tracking-[-0.01em] mb-2">
                      {t.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {t.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits + Vibe */}
          <section className="py-16">
            <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`${CARD_SURFACE} p-7`}
                style={CARD_INNER_HIGHLIGHT}
              >
                <h3 className="text-white text-lg font-semibold tracking-[-0.01em] mb-5">
                  Benefits
                </h3>
                <ul className="space-y-2.5">
                  {BENEFITS.map((b) => (
                    <li
                      key={b}
                      className="text-sm text-slate-400 flex items-start gap-2"
                    >
                      <span className="text-blue-300 mt-1.5 block w-1 h-1 rounded-full bg-blue-300 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={`${CARD_SURFACE} p-7 flex flex-col`}
                style={CARD_INNER_HIGHLIGHT}
              >
                <div className="mb-4">
                  <IconTile Icon={Zap} size="sm" tint="amber" filled />
                </div>
                <h3 className="text-white text-lg font-semibold tracking-[-0.01em] mb-3">
                  How we work
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  We ship fast, talk to brokers every week, and use min. on our
                  own inbox every day. Small team, big surface area, real
                  problems.
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="pb-24 pt-8">
            <div className="max-w-2xl mx-auto px-6 text-center">
              <h3 className="text-white text-2xl md:text-3xl font-semibold tracking-[-0.02em] mb-4">
                Don't overthink it.
              </h3>
              <p className="text-slate-400 mb-7">
                Hit send. Worst case, a great conversation.
              </p>
              <PillButton href={`mailto:${email}?subject=Careers`}>
                Start the conversation
              </PillButton>
            </div>
          </section>
        </main>

        <MinFooter />
      </div>
    </>
  );
}
