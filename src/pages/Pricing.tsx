import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Check, ArrowRight, Clock, TrendingUp, Sparkles } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import PillNav from "@/components/PillNav";
import MinFooter from "@/components/MinFooter";

const CARD =
  "rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-sm";
const CARD_INNER = {
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.01)",
} as const;

type Plan = {
  name: string;
  price: string;
  priceSub?: string;
  blurb: string;
  features: string[];
  cta: { label: string; href: string };
  ctaSubtle?: string;
  highlighted?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Free",
    price: "$0",
    priceSub: "14-day trial",
    blurb: "Kick the tires. No credit card.",
    features: [
      "25 quote runs",
      "1 seat",
      "Private network + sample public network",
    ],
    cta: { label: "Try it for free", href: "https://app.getmin.ai/find" },
    ctaSubtle: "no credit card, no sign up",
  },
  {
    name: "Plus",
    price: "$49",
    priceSub: "per month",
    blurb: "For solo brokers running a steady book.",
    features: [
      "150 quote runs / month",
      "1 seat",
      "Full private + public network",
      "$1 / run overage above 150 (soft cap at 300)",
    ],
    cta: { label: "Try it for free", href: "https://app.getmin.ai/find" },
    ctaSubtle: "no credit card, no sign up",
  },
  {
    name: "Pro",
    price: "$99",
    priceSub: "per seat / month",
    blurb: "For desks running volume across multiple reps.",
    features: [
      "500 quote runs per seat, pooled across the org",
      "Per-seat (1+)",
      "Full network + priority routing",
      "$0.50 / run overage above bundle (soft cap at 2× bundle)",
    ],
    cta: { label: "Try it for free", href: "https://app.getmin.ai/find" },
    ctaSubtle: "no credit card, no sign up",
    highlighted: true,
  },
  {
    name: "Team",
    price: "Custom",
    priceSub: "contact sales",
    blurb: "For larger brokerages with custom workflows.",
    features: [
      "Custom quote-run volume",
      "5+ seats",
      "Full network + custom integrations",
      "Priority support & SLA",
    ],
    cta: {
      label: "Contact sales",
      href: "mailto:hello@getmin.ai?subject=Team%20Plan%20Inquiry",
    },
  },
];

const SEAT_EXAMPLES = [
  { label: "Solo Pro", price: "$99 / mo", bundle: "500 runs" },
  { label: "2-seat shop", price: "$198 / mo", bundle: "1,000 runs" },
  { label: "3-seat shop", price: "$297 / mo", bundle: "1,500 runs" },
  { label: "4+ seats", price: "Talk to us", bundle: "Custom" },
];

const Pricing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Pricing | min.</title>
        <meta
          name="description"
          content="Simple, transparent pricing for freight brokers. Start free — no credit card, no sign up. Pay as your team grows."
        />
        <link rel="canonical" href="https://getmin.ai/pricing" />
      </Helmet>

      <div className="min-h-screen bg-black text-slate-200 font-sans antialiased overflow-x-hidden">
        <PillNav />

        <main className="relative pt-36 md:pt-44 pb-20 md:pb-28 overflow-hidden">
          {/* ambient background — match Hero */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 10%, rgba(80,120,255,0.16) 0%, rgba(80,120,255,0.04) 35%, transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 80%)",
            }}
          />

          <div className="relative max-w-6xl mx-auto px-6">
            {/* Header */}
            <header className="text-center mb-14 md:mb-20">
              <p className="text-[11px] md:text-xs tracking-[0.2em] uppercase text-slate-400 mb-5">
                Pricing
              </p>
              <h1 className="text-white font-semibold tracking-[-0.025em] leading-[1.05] text-4xl md:text-5xl lg:text-6xl">
                Simple pricing. <span className="text-blue-300">Pay as you grow.</span>
              </h1>
              <p className="mt-6 text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Start free. Upgrade when your book outgrows the trial. No
                per-quote tax on day one.
              </p>
            </header>

            {/* Plan grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 mb-16 md:mb-24">
              {PLANS.map((p) => (
                <PlanCard key={p.name} plan={p} />
              ))}
            </section>

            {/* ROI Calculator */}
            <section className="mb-16 md:mb-24">
              <ValueCalculator />
            </section>

            {/* How seats scale */}
            <section className="mb-16 md:mb-24">
              <div className="text-center mb-8 md:mb-10">
                <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-[-0.02em] mb-3">
                  How seats scale on Pro
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  Bundles are <span className="text-slate-200">org-wide pooled</span>,
                  not enforced per seat. Any rep can draw from the pool — no
                  per-rep tracking.
                </p>
              </div>

              <div className={`${CARD} overflow-hidden`} style={CARD_INNER}>
                <div className="hidden md:grid md:grid-cols-3 px-6 py-3 border-b border-white/[0.06] text-[10px] tracking-[0.18em] uppercase text-slate-500 font-mono">
                  <div>Setup</div>
                  <div>Price</div>
                  <div className="text-right">Run bundle</div>
                </div>
                <ul className="divide-y divide-white/[0.05]">
                  {SEAT_EXAMPLES.map((ex) => (
                    <li
                      key={ex.label}
                      className="grid grid-cols-2 md:grid-cols-3 gap-3 px-6 py-4 items-center"
                    >
                      <span className="text-slate-200 text-[15px] font-medium md:col-span-1 col-span-2">
                        {ex.label}
                      </span>
                      <span className="text-slate-300 text-[15px] font-mono tabular-nums">
                        {ex.price}
                      </span>
                      <span className="text-slate-400 text-[14px] font-mono tabular-nums md:text-right">
                        {ex.bundle}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Overage / fine print */}
            <section className="mb-16 md:mb-24">
              <div className="text-center mb-8 md:mb-10">
                <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-[-0.02em] mb-3">
                  Overage, explained
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  No surprises. Soft caps and clear per-run prices when you
                  cross the bundle.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`${CARD} p-6 md:p-7`} style={CARD_INNER}>
                  <p className="text-[11px] tracking-[0.18em] uppercase text-slate-500 font-mono mb-2">
                    Plus
                  </p>
                  <h3 className="text-white text-lg font-semibold mb-2">
                    $1 / run above 150
                  </h3>
                  <p className="text-slate-400 text-[15px] leading-relaxed">
                    Soft cap at 300 runs. After that, we'll ask you to upgrade
                    rather than rack up surprise overages.
                  </p>
                </div>
                <div className={`${CARD} p-6 md:p-7`} style={CARD_INNER}>
                  <p className="text-[11px] tracking-[0.18em] uppercase text-slate-500 font-mono mb-2">
                    Pro
                  </p>
                  <h3 className="text-white text-lg font-semibold mb-2">
                    $0.50 / run above bundle
                  </h3>
                  <p className="text-slate-400 text-[15px] leading-relaxed">
                    Bundle is 500 runs × seat count, pooled across the org.
                    Soft cap at 2× bundle, after which we'll roll you into a
                    Team conversation.
                  </p>
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <section className="relative pt-6">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(80,120,255,0.14) 0%, rgba(80,120,255,0.04) 35%, transparent 70%)",
                }}
              />
              <div className="relative text-center">
                <h2 className="text-white font-semibold tracking-[-0.025em] leading-[1.05] text-3xl md:text-5xl">
                  Quote instantly. Find coverage.
                </h2>
                <div className="mt-9 flex flex-col items-center gap-3">
                  <a
                    href="https://app.getmin.ai/find"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-50 text-black text-sm md:text-base font-semibold px-6 py-3 hover:bg-slate-200 transition-colors"
                    style={{
                      boxShadow: "0 0 30px -6px rgba(255,255,255,0.35)",
                    }}
                  >
                    Try it for free
                    <ArrowRight className="w-4 h-4" strokeWidth={2.25} />
                  </a>
                  <p className="text-xs text-slate-500 tracking-wide">
                    no credit card, no sign up
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>

        <MinFooter />
      </div>
    </>
  );
};

function PlanCard({ plan }: { plan: Plan }) {
  const highlighted = plan.highlighted;
  return (
    <div
      className={`relative ${CARD} p-6 md:p-7 flex flex-col ${
        highlighted ? "border-blue-400/40" : ""
      }`}
      style={{
        ...CARD_INNER,
        ...(highlighted
          ? {
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 36px -10px rgba(96,140,255,0.45)",
            }
          : {}),
      }}
    >
      {highlighted && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-500/15 border border-blue-400/40 px-3 py-1 text-[10px] tracking-[0.16em] uppercase text-blue-200 font-mono font-semibold"
          style={{ boxShadow: "0 0 14px -4px rgba(96,140,255,0.5)" }}
        >
          Most popular
        </span>
      )}

      <h3 className="text-white text-lg font-semibold tracking-[-0.01em]">
        {plan.name}
      </h3>
      <p className="text-slate-400 text-[13px] mt-1 mb-5 leading-relaxed min-h-[42px]">
        {plan.blurb}
      </p>

      <div className="mb-5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-white text-4xl font-semibold tracking-[-0.02em] tabular-nums">
            {plan.price}
          </span>
          {plan.priceSub && (
            <span className="text-slate-400 text-[12px] font-mono">
              {plan.priceSub}
            </span>
          )}
        </div>
      </div>

      <ul className="flex-1 space-y-2.5 mb-6">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <span
              className={`mt-0.5 grid place-items-center w-4 h-4 rounded-full shrink-0 ${
                highlighted
                  ? "bg-blue-400/20 border border-blue-400/40"
                  : "bg-white/[0.05] border border-white/10"
              }`}
            >
              <Check
                className={`w-2.5 h-2.5 ${
                  highlighted ? "text-blue-200" : "text-slate-300"
                }`}
                strokeWidth={3}
              />
            </span>
            <span className="text-slate-300 text-[13.5px] leading-relaxed">
              {f}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <a
          href={plan.cta.href}
          className={
            highlighted
              ? "inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-50 text-black text-sm font-semibold px-5 py-2.5 hover:bg-slate-200 transition-colors"
              : "inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 text-slate-200 text-sm font-medium px-5 py-2.5 hover:bg-white/[0.04] transition-colors"
          }
        >
          {plan.cta.label}
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.25} />
        </a>
        {/* Reserved subtitle slot — always rendered to keep CTAs aligned across cards */}
        <p
          className="text-[11px] text-slate-500 text-center mt-2.5 tracking-wide leading-tight min-h-[14px]"
          aria-hidden={!plan.ctaSubtle}
        >
          {plan.ctaSubtle ?? " "}
        </p>
      </div>
    </div>
  );
}

/* ───────── Value Calculator ───────── */

const ASSUMPTIONS = {
  minutesSavedPerQuote: 30,
  winRate: 0.15,
  marginPerBookedLoad: 100,
  hourlyRate: 50,
} as const;

function recommendPlan(quotesPerMonth: number): {
  name: string;
  monthly: number | null;
  seats: number;
} {
  if (quotesPerMonth <= 150) return { name: "Plus", monthly: 49, seats: 1 };
  if (quotesPerMonth <= 500)
    return { name: "Pro · 1 seat", monthly: 99, seats: 1 };
  if (quotesPerMonth <= 1000)
    return { name: "Pro · 2 seats", monthly: 198, seats: 2 };
  if (quotesPerMonth <= 1500)
    return { name: "Pro · 3 seats", monthly: 297, seats: 3 };
  return { name: "Team", monthly: null, seats: 5 };
}

function fmtMoney(n: number): string {
  if (n >= 1000)
    return `$${(n / 1000).toLocaleString("en-US", {
      maximumFractionDigits: n >= 10000 ? 0 : 1,
    })}k`;
  return `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function ValueCalculator() {
  const [quotesPerWeek, setQuotesPerWeek] = useState(40);

  const metrics = useMemo(() => {
    const quotesPerMonth = Math.round(quotesPerWeek * 4.3);
    const hoursSaved = Math.round(
      (quotesPerMonth * ASSUMPTIONS.minutesSavedPerQuote) / 60
    );
    const marginGained = Math.round(
      quotesPerMonth *
        ASSUMPTIONS.winRate *
        ASSUMPTIONS.marginPerBookedLoad
    );
    const timeValue = hoursSaved * ASSUMPTIONS.hourlyRate;
    const plan = recommendPlan(quotesPerMonth);
    const netMonthly =
      plan.monthly !== null ? marginGained + timeValue - plan.monthly : null;
    return {
      quotesPerMonth,
      hoursSaved,
      marginGained,
      timeValue,
      plan,
      netMonthly,
    };
  }, [quotesPerWeek]);

  return (
    <div>
      <div className="text-center mb-8 md:mb-10">
        <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-[-0.02em] mb-3">
          What's min. worth to your desk?
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Drag the slider. Estimates are conservative — most desks save more.
        </p>
      </div>

      <div
        className={`${CARD} p-6 md:p-10 relative overflow-hidden`}
        style={CARD_INNER}
      >
        {/* ambient blue glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(80,120,255,0.12) 0%, transparent 60%)",
          }}
        />

        <div className="relative">
          {/* Slider */}
          <div className="mb-10 md:mb-12 max-w-2xl mx-auto">
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-[11px] tracking-[0.18em] uppercase text-slate-500 font-mono">
                Quotes per week
              </span>
              <span className="text-white text-3xl md:text-4xl font-semibold tracking-[-0.02em] tabular-nums">
                {quotesPerWeek}
              </span>
            </div>
            <Slider
              value={[quotesPerWeek]}
              min={10}
              max={200}
              step={5}
              onValueChange={(v) => setQuotesPerWeek(v[0] ?? 40)}
              className="[&_[role=slider]]:bg-white [&_[role=slider]]:border-white [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:shadow-[0_0_18px_-2px_rgba(96,140,255,0.6)] [&>span:first-child]:bg-white/[0.08] [&>span:first-child]:h-1.5 [&_[data-orientation=horizontal]>span]:bg-gradient-to-r [&_[data-orientation=horizontal]>span]:from-blue-400 [&_[data-orientation=horizontal]>span]:to-blue-300"
              aria-label="Quotes per week"
            />
            <div className="flex justify-between mt-2 text-[10px] font-mono text-slate-600 tabular-nums">
              <span>10</span>
              <span>200+</span>
            </div>
            <p className="text-center text-xs text-slate-500 mt-4 font-mono tabular-nums">
              ≈ {metrics.quotesPerMonth.toLocaleString("en-US")} quote runs / month
            </p>
          </div>

          {/* Metric tiles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <MetricTile
              Icon={Clock}
              label="Hours saved / mo"
              value={`${metrics.hoursSaved}`}
              sub={`≈ ${fmtMoney(metrics.timeValue)} of time at $${ASSUMPTIONS.hourlyRate}/hr`}
            />
            <MetricTile
              Icon={TrendingUp}
              label="Extra margin / mo"
              value={fmtMoney(metrics.marginGained)}
              sub={`vs. public load-board rates`}
              accent
            />
            <MetricTile
              Icon={Sparkles}
              label="Recommended plan"
              value={metrics.plan.name}
              sub={
                metrics.plan.monthly !== null
                  ? `${fmtMoney(metrics.plan.monthly)} / month`
                  : "Custom — contact sales"
              }
            />
          </div>

          {/* Net value bar */}
          {metrics.netMonthly !== null ? (
            <div
              className="rounded-2xl border border-emerald-400/30 bg-gradient-to-b from-emerald-500/[0.08] to-emerald-500/[0.02] p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.06), 0 0 26px -10px rgba(52,211,153,0.4)",
              }}
            >
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-emerald-300/80 font-mono mb-1">
                  Estimated net value
                </p>
                <p
                  className="text-emerald-200 text-3xl md:text-4xl font-semibold tracking-[-0.02em] tabular-nums leading-none"
                  style={{ textShadow: "0 0 14px rgba(52,211,153,0.5)" }}
                >
                  {fmtMoney(metrics.netMonthly)}{" "}
                  <span className="text-emerald-300/70 text-base font-mono font-normal">
                    / month
                  </span>
                </p>
              </div>
              <a
                href="https://app.getmin.ai/find"
                className="inline-flex items-center gap-2 rounded-full bg-slate-50 text-black text-sm md:text-base font-semibold px-6 py-3 hover:bg-slate-200 transition-colors"
                style={{ boxShadow: "0 0 28px -6px rgba(255,255,255,0.4)" }}
              >
                Try it for free
                <ArrowRight className="w-4 h-4" strokeWidth={2.25} />
              </a>
            </div>
          ) : (
            <div className="rounded-2xl border border-blue-400/30 bg-blue-500/[0.06] p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-blue-300/80 font-mono mb-1">
                  At this volume
                </p>
                <p className="text-white text-xl md:text-2xl font-semibold tracking-[-0.01em]">
                  Let's design a Team plan together.
                </p>
              </div>
              <a
                href="mailto:hello@getmin.ai?subject=Team%20Plan%20Inquiry"
                className="inline-flex items-center gap-2 rounded-full bg-slate-50 text-black text-sm md:text-base font-semibold px-6 py-3 hover:bg-slate-200 transition-colors"
              >
                Contact sales
                <ArrowRight className="w-4 h-4" strokeWidth={2.25} />
              </a>
            </div>
          )}

          {/* Fine print */}
          <p className="text-[11px] text-slate-500 leading-relaxed mt-5 text-center max-w-2xl mx-auto">
            Estimates assume {ASSUMPTIONS.minutesSavedPerQuote} minutes saved
            per quote run (quoting + finding coverage), a{" "}
            {Math.round(ASSUMPTIONS.winRate * 100)}% quote-to-book rate, and{" "}
            {fmtMoney(ASSUMPTIONS.marginPerBookedLoad)} of margin recovered per
            booked load vs. public load boards. Your numbers will vary.
          </p>
        </div>
      </div>
    </div>
  );
}

function MetricTile({
  Icon,
  label,
  value,
  sub,
  accent = false,
}: {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        accent
          ? "border-blue-400/30 bg-gradient-to-b from-blue-500/[0.10] to-blue-500/[0.02]"
          : "border-white/[0.08] bg-white/[0.025]"
      }`}
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon
          className={`w-4 h-4 ${accent ? "text-blue-300" : "text-slate-400"}`}
          strokeWidth={1.75}
        />
        <span className="text-[10px] tracking-[0.18em] uppercase text-slate-500 font-mono">
          {label}
        </span>
      </div>
      <p
        className={`text-3xl md:text-4xl font-semibold tracking-[-0.02em] tabular-nums leading-none ${
          accent ? "text-blue-200" : "text-white"
        }`}
        style={
          accent ? { textShadow: "0 0 14px rgba(96,140,255,0.4)" } : undefined
        }
      >
        {value}
      </p>
      <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{sub}</p>
    </div>
  );
}

export default Pricing;
