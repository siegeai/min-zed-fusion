import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Shield,
  ShieldCheck,
  Lock,
  Eye,
  Server,
  Award,
  Star,
  CheckCircle,
  Mail,
  FileText,
  Users,
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

const FEATURES = [
  {
    Icon: Award,
    title: "9.7 ESOF Score",
    body: "Top-tier rating from the Enterprise Security Operations Framework.",
  },
  {
    Icon: Lock,
    title: "TLS 1.3 in Transit",
    body: "Industry-standard encryption on every byte that moves.",
  },
  {
    Icon: ShieldCheck,
    title: "SOC 2 Type II Hosting",
    body: "All infrastructure providers maintain SOC 2 Type II compliance.",
  },
  {
    Icon: FileText,
    title: "Privacy-First Architecture",
    body: "Built to align with GDPR, CCPA, and modern privacy regulations.",
  },
  {
    Icon: Eye,
    title: "Zero Training, Ever",
    body: "Your network is yours. We never train models on your data, and neither do our providers.",
  },
  {
    Icon: Server,
    title: "Enterprise Infrastructure",
    body: "99.9% uptime SLA, multi-region redundancy, automated failover.",
  },
  {
    Icon: Users,
    title: "Access Controls",
    body: "MFA, role-based permissions, and least-privilege everywhere.",
  },
];

const PLEDGES = [
  {
    title: "Never sold",
    body: "Not to advertisers, not to data brokers, not to anyone.",
  },
  {
    title: "Never brokered",
    body: "We don't share, license, or expose your data to third parties.",
  },
  {
    title: "Never trained on",
    body: "Your data never enters a model's training set, ours or any provider's.",
  },
];

const CERTS = [
  "SOC 2 Type II",
  "Google CASA Tier 2",
  "GDPR compliant",
  "CCPA compliant",
  "ISO 27001",
  "PCI DSS Level 1",
  "HIPAA ready",
];

export default function Security() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Security at min. | Enterprise-grade by default</title>
        <meta
          name="description"
          content="9.7 ESOF score, SOC 2 Type II infrastructure, zero training on your data. min. treats security as the foundation, not the afterthought."
        />
        <link rel="canonical" href="https://getmin.ai/security" />
      </Helmet>

      <div className="min-h-screen bg-black text-slate-200 font-sans antialiased overflow-x-hidden">
        <PillNav />

        <main>
          {/* Hero */}
          <section className="relative pt-36 md:pt-44 pb-12 overflow-hidden">
            <HeroAmbientGlow />
            <div className="relative max-w-3xl mx-auto px-6 text-center">
              <div className="flex justify-center mb-6">
                <IconTile Icon={Shield} size="xl" tint="blue" glow="strong" />
              </div>
              <p className="text-[11px] md:text-xs tracking-[0.2em] uppercase text-slate-400 mb-4">
                Security
              </p>
              <h1 className="text-white font-semibold tracking-[-0.025em] leading-[1.08] text-4xl md:text-6xl">
                Enterprise-grade by{" "}
                <span className="text-blue-300">default</span>.
              </h1>
              <p className="mt-7 text-slate-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                Built by engineers who shipped infrastructure at DoorDash,
                Coursera, and Sunnybrook Research Hospital. Security is the
                foundation, not the addendum.
              </p>
            </div>
          </section>

          {/* ESOF score callout */}
          <section className="py-10">
            <div className="max-w-3xl mx-auto px-6">
              <div
                className={`${CARD_SURFACE} p-8 md:p-10 text-center`}
                style={CARD_INNER_HIGHLIGHT}
              >
                <div className="flex justify-center mb-5">
                  <IconTile Icon={Award} size="lg" tint="blue" glow="strong" />
                </div>
                <div className="flex items-center justify-center gap-5 mb-3">
                  <div
                    className="text-5xl md:text-6xl font-semibold text-white tabular-nums tracking-[-0.04em]"
                    style={{ textShadow: "0 0 24px rgba(96,140,255,0.3)" }}
                  >
                    9.7
                  </div>
                  <div className="text-left">
                    <div className="text-white text-base md:text-lg font-semibold">
                      ESOF Score
                    </div>
                    <div className="text-slate-500 text-xs md:text-sm">
                      Enterprise Security Operations Framework
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1.5 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400"
                      fill="currentColor"
                    />
                  ))}
                  <span className="ml-2 text-slate-400 text-xs tracking-[0.12em] uppercase font-medium">
                    Top 1%
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Features grid */}
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-6">
              <p className="text-[11px] tracking-[0.2em] uppercase text-slate-500 mb-3 text-center">
                Foundations
              </p>
              <h2 className="text-white text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-center mb-12">
                Security on every layer.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {FEATURES.map((f) => (
                  <div
                    key={f.title}
                    className={`${CARD_SURFACE} p-6`}
                    style={CARD_INNER_HIGHLIGHT}
                  >
                    <div className="mb-4">
                      <IconTile Icon={f.Icon} size="sm" tint="blue" />
                    </div>
                    <h3 className="text-white text-base font-semibold tracking-[-0.01em] mb-2">
                      {f.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {f.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Data Pledge */}
          <section className="py-16">
            <div className="max-w-5xl mx-auto px-6">
              <p className="text-[11px] tracking-[0.2em] uppercase text-slate-500 mb-3 text-center">
                Our Data Pledge
              </p>
              <h2 className="text-white text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-center mb-3">
                Plain English. No legal gymnastics.
              </h2>
              <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
                Three things that are true today and will be true forever.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PLEDGES.map((p) => (
                  <div
                    key={p.title}
                    className={`${CARD_SURFACE} p-6 text-center`}
                    style={CARD_INNER_HIGHLIGHT}
                  >
                    <div className="flex justify-center mb-4">
                      <IconTile Icon={CheckCircle} size="md" tint="blue" />
                    </div>
                    <h3 className="text-white text-base font-semibold tracking-[-0.01em] mb-2">
                      {p.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Compliance badges */}
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-6">
              <div
                className={`${CARD_SURFACE} p-8 md:p-10`}
                style={CARD_INNER_HIGHLIGHT}
              >
                <p className="text-[11px] tracking-[0.2em] uppercase text-slate-500 mb-3 text-center">
                  Infrastructure & compliance
                </p>
                <h3 className="text-white text-xl md:text-2xl font-semibold tracking-[-0.01em] text-center mb-2">
                  We use providers that hold the certifications that matter.
                </h3>
                <p className="text-slate-400 text-sm text-center mb-7 max-w-xl mx-auto">
                  Your data sits behind every certification a Fortune 500
                  procurement team would ask for.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {CERTS.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] px-3.5 py-1.5 text-xs text-slate-200 font-medium"
                      style={{
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Trusted partnerships */}
          <section className="py-16">
            <div className="max-w-5xl mx-auto px-6">
              <p className="text-[11px] tracking-[0.2em] uppercase text-slate-500 mb-3 text-center">
                Trusted partnerships
              </p>
              <h2 className="text-white text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-center mb-12">
                Vetted by the platforms our customers already trust.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PartnerCard
                  name="Microsoft Partner"
                  body="Verified Microsoft Partner. Secure integration with Microsoft 365 and Azure."
                  logo={
                    <svg viewBox="0 0 23 23" className="w-7 h-7">
                      <rect x="1" y="1" width="10" height="10" fill="#f25022" />
                      <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
                      <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
                      <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
                    </svg>
                  }
                />
                <PartnerCard
                  name="Google CASA Tier 2"
                  body="Independently assessed at Tier 2 of Google's Cloud Application Security Assessment for handling Google user data."
                  logo={
                    <svg viewBox="0 0 24 24" className="w-7 h-7">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09A6.97 6.97 0 0 1 5.47 12c0-.72.13-1.43.37-2.09V7.07H2.18A11.96 11.96 0 0 0 .95 12c0 1.94.46 3.77 1.23 5.07l3.66-2.98z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 6.07l3.66 2.84c.87-2.6 3.3-4.16 6.16-4.16z"
                        fill="#EA4335"
                      />
                    </svg>
                  }
                />
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="pb-24 pt-8">
            <div className="max-w-2xl mx-auto px-6 text-center">
              <h3 className="text-white text-2xl md:text-3xl font-semibold tracking-[-0.02em] mb-4">
                Need to dig deeper?
              </h3>
              <p className="text-slate-400 mb-7">
                Happy to share documentation, walk through compliance, or get
                you on a call with our security team.
              </p>
              <PillButton href="mailto:hello@getmin.ai?subject=Security%20Questions">
                <Mail className="w-4 h-4" strokeWidth={2} />
                hello@getmin.ai
              </PillButton>
            </div>
          </section>
        </main>

        <MinFooter />
      </div>
    </>
  );
}

function PartnerCard({
  name,
  body,
  logo,
}: {
  name: string;
  body: string;
  logo: React.ReactNode;
}) {
  return (
    <div className={`${CARD_SURFACE} p-7`} style={CARD_INNER_HIGHLIGHT}>
      <div className="flex items-center gap-3 mb-3">
        <span className="grid place-items-center w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10">
          {logo}
        </span>
        <span className="text-white text-base font-semibold tracking-[-0.01em]">
          {name}
        </span>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed">{body}</p>
    </div>
  );
}
