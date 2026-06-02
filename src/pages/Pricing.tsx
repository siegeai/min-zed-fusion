import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Check, X, ArrowRight } from "lucide-react";
import PillNav from "@/components/PillNav";
import MinFooter from "@/components/MinFooter";

const CARD =
  "rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-sm";
const CARD_INNER = {
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.01)",
} as const;

type Billing = "monthly" | "annual";
type Feature = { text: string; included: boolean };

type Plan = {
  name: string;
  swatch: string; // tailwind bg class for the colored dot
  memory: string;
  memoryHuman: string; // human-scale translation of the memory size
  tagline: string;
  inheritFrom?: string;
  features: Feature[];
  cta: { label: string; href: string };
  highlighted?: boolean;
  monthlyPrice: { display: string; sub?: string };
  annualPrice: { display: string; sub?: string };
};

const PLANS: Plan[] = [
  {
    name: "Free",
    swatch: "bg-blue-500",
    monthlyPrice: { display: "$0", sub: "forever" },
    annualPrice: { display: "$0", sub: "forever" },
    memory: "200 MB",
    memoryHuman: "A few months worth of your work memory.",
    tagline: "Enough to make one AI tool feel like it knows you.",
    features: [
      { text: "1 connected AI app", included: true },
      { text: "Auto-synthesized profile", included: true },
      { text: "Recall across sessions", included: true },
      { text: "End-to-end encrypted", included: true },
      { text: "30-day active recall", included: true },
    ],
    cta: {
      label: "Get started free",
      href: "https://app.getmin.ai/find",
    },
  },
  {
    name: "Plus",
    swatch: "bg-purple-500",
    monthlyPrice: { display: "$18", sub: "/ mo" },
    annualPrice: { display: "$14", sub: "/ mo · save $48/yr" },
    memory: "5 GB",
    memoryHuman: "About 5 years of your work, recallable in any AI.",
    tagline: "Every meeting, email, and chat, recallable by every AI you use at work.",
    inheritFrom: "Free",
    features: [
      { text: "Unlimited connected AI apps", included: true },
      { text: "Unlimited recall, no query cap", included: true },
      { text: "Full conversation history", included: true },
      { text: "Email + file connectors", included: true },
      { text: "Priority recall, sub-second", included: true },
      { text: "Memory boost packs", included: true },
    ],
    cta: { label: "Start free trial", href: "https://app.getmin.ai/find" },
    highlighted: true,
  },
  {
    name: "Pro",
    swatch: "bg-slate-600",
    monthlyPrice: { display: "$35", sub: "/ user / mo" },
    annualPrice: { display: "$30", sub: "/ user / mo · save $60/yr" },
    memory: "50 GB",
    memoryHuman: "A career's worth of work memory, per teammate.",
    tagline: "Shared memory for teams who think out loud together.",
    inheritFrom: "Plus",
    features: [
      { text: "Shared workspace memory", included: true },
      { text: "Per-teammate visibility controls", included: true },
      { text: "Unlimited conversation retention", included: true },
      { text: "Audit log", included: true },
      { text: "API access", included: true },
      { text: "Priority support", included: true },
    ],
    cta: { label: "Upgrade to Pro", href: "https://app.getmin.ai/find" },
  },
  {
    name: "Business",
    swatch: "bg-amber-500",
    monthlyPrice: { display: "Let's talk", sub: "per user · volume pricing" },
    annualPrice: { display: "Let's talk", sub: "per user · volume pricing" },
    memory: "500 GB+",
    memoryHuman: "Your whole company's memory, every team, every year.",
    tagline: "When your team's collective memory is the moat.",
    inheritFrom: "Pro",
    features: [
      { text: "Unlimited seats", included: true },
      { text: "Custom memory cap", included: true },
      { text: "SSO / SAML / SCIM", included: true },
      { text: "SOC 2 Type II + data residency", included: true },
      { text: "Dedicated onboarding", included: true },
      { text: "99.95% uptime SLA", included: true },
    ],
    cta: {
      label: "Contact sales",
      href: "mailto:hello@getmin.ai?subject=Business%20Plan%20Inquiry",
    },
  },
];

type CompareValue = string | boolean;
type CompareRow = { row: string; values: [CompareValue, CompareValue, CompareValue, CompareValue] };

const COMPARE: CompareRow[] = [
  { row: "Memory", values: ["200 MB", "5 GB", "50 GB / user", "Custom"] },
  { row: "Monthly price", values: ["$0", "$18", "$35 / user", "Custom / user"] },
  { row: "Annual price", values: ["n/a", "$14 / mo", "$30 / user / mo", "n/a"] },
  { row: "Connected AI apps", values: ["1", "Unlimited", "Unlimited", "Unlimited"] },
  { row: "Auto profile", values: [true, true, true, true] },
  { row: "Recall + remember", values: [true, true, true, true] },
  { row: "Conversation retention", values: ["30 days", "Unlimited", "Unlimited", "Unlimited"] },
  { row: "Email + file connectors", values: [false, true, true, true] },
  { row: "Priority recall", values: [false, true, true, true] },
  { row: "Memory boost packs", values: [false, true, true, true] },
  { row: "Shared workspace memory", values: [false, false, true, true] },
  { row: "Visibility controls", values: [false, false, true, true] },
  { row: "Audit log", values: [false, false, true, true] },
  { row: "API access", values: [false, false, true, true] },
  { row: "SSO / SAML / SCIM", values: [false, false, false, true] },
  { row: "SOC 2 Type II", values: [true, true, true, true] },
  { row: "Data residency", values: [false, false, false, true] },
  { row: "Support", values: ["Community", "Email", "Priority", "Dedicated"] },
];

const ADDONS = [
  { name: "Boost +5 GB", memory: "+5 GB", price: "$3 / mo" },
  { name: "Boost +25 GB", memory: "+25 GB", price: "$10 / mo" },
];

const FAQS = [
  {
    q: "What counts toward my memory?",
    a: "Indexed text from your inbox, notes, meeting transcripts, and uploaded files. Raw attachments stored in S3 don't count. Only the extracted, searchable text.",
  },
  {
    q: "Can I downgrade later?",
    a: "Yes. If you're over the lower tier's cap when you downgrade, your memory is soft-frozen. Still readable by your AI, but new writes pause until you delete enough or upgrade again. We never delete your data.",
  },
  {
    q: "Does the AI access my memory in real-time?",
    a: "Yes. Every connected AI app (Claude Desktop, Cursor, ChatGPT via plugin) sees your memory the moment it's added. No re-indexing delay.",
  },
  {
    q: "Can I export my memory?",
    a: "Always. JSON or Markdown, your choice. We're built on open MCP. No lock-in.",
  },
  {
    q: "Is my data used to train AI models?",
    a: "Never. Your memory is yours. We don't train on it, sell it, or share it with the AI providers you connect.",
  },
];

const Pricing = () => {
  const [billing, setBilling] = useState<Billing>("annual");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Pricing | min.</title>
        <meta
          name="description"
          content="Work memory that scales you across every AI tool. Start free. Scale up as your team's memory grows."
        />
        <link rel="canonical" href="https://getmin.ai/pricing" />
      </Helmet>

      <div className="min-h-screen bg-black text-slate-200 font-sans antialiased overflow-x-hidden">
        <PillNav />

        <main className="relative pt-36 md:pt-44 pb-20 md:pb-28 overflow-hidden">
          {/* ambient background */}
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
            <header className="text-center mb-12 md:mb-16">
              <p className="text-[11px] md:text-xs tracking-[0.2em] uppercase text-slate-400 mb-5">
                Pricing
              </p>
              <h1 className="text-white font-semibold tracking-[-0.025em] leading-[1.05] text-4xl md:text-5xl lg:text-6xl max-w-3xl mx-auto">
                Work memory that{" "}
                <span className="text-blue-300">scales you</span> across every AI tool.
              </h1>
              <p className="mt-6 text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Start free. Scale up as your team's memory grows.
              </p>

              <div className="mt-10 flex justify-center">
                <BillingToggle value={billing} onChange={setBilling} />
              </div>
            </header>

            {/* GB ≠ GB explainer */}
            <GbExplainer />

            {/* Plan grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 mb-20 md:mb-28 mt-6">
              {PLANS.map((p) => (
                <PlanCard key={p.name} plan={p} billing={billing} />
              ))}
            </section>

            {/* Compare plans */}
            <section className="mb-20 md:mb-28">
              <SectionTitle>Compare plans</SectionTitle>
              <CompareTable />
            </section>

            {/* Add-ons */}
            <section className="mb-20 md:mb-28">
              <SectionTitle>
                Add-ons{" "}
                <span className="text-slate-500 text-base font-normal">
                  (Plus &amp; Pro)
                </span>
              </SectionTitle>
              <p className="text-slate-400 text-center mb-8 max-w-xl mx-auto">
                For when you're near a cap but not ready to jump tiers:
              </p>
              <AddOnsTable />
            </section>

            {/* FAQ */}
            <section>
              <SectionTitle>Frequently asked questions</SectionTitle>
              <FAQList />
            </section>
          </div>
        </main>

        <MinFooter />
      </div>
    </>
  );
};

/* ─────────── GB ≠ GB explainer ─────────── */

function GbExplainer() {
  return (
    <div className="relative mt-12 mb-10 max-w-4xl mx-auto">
      <div
        className={`${CARD} relative overflow-hidden p-5 md:p-6`}
        style={{
          ...CARD_INNER,
          background:
            "linear-gradient(180deg, rgba(96,140,255,0.10) 0%, rgba(96,140,255,0.02) 100%)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-5">
          <div className="flex items-center gap-3 shrink-0">
            <span
              className="inline-flex items-center gap-1 rounded-full border border-blue-400/30 bg-blue-500/15 px-2.5 py-1 text-[10px] font-mono font-bold tracking-[0.16em] uppercase text-blue-200"
              style={{ boxShadow: "0 0 14px -4px rgba(96,140,255,0.5)" }}
            >
              GB &ne; GB
            </span>
            <span className="text-white text-base md:text-lg font-semibold tracking-[-0.01em] whitespace-nowrap">
              This isn't Dropbox.
            </span>
          </div>
          <p className="text-slate-400 text-[14px] md:text-[15px] leading-snug">
            1 GB of cloud storage is a couple of HD movies. 1 GB of min.
            memory is{" "}
            <span className="text-slate-200">
              a career's worth of indexed, recallable context
            </span>
            . Every email, every meeting, every decision, computed live by
            every AI tool you open.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Billing toggle ─────────── */

function BillingToggle({
  value,
  onChange,
}: {
  value: Billing;
  onChange: (v: Billing) => void;
}) {
  const base =
    "relative rounded-full px-4 md:px-5 py-2 text-sm font-medium transition-colors";
  const active = "bg-slate-50 text-black";
  const inactive = "text-slate-300 hover:text-white";
  return (
    <div
      className="inline-flex items-center gap-1 p-1 rounded-full border border-white/10 bg-white/[0.025]"
      role="group"
      aria-label="Billing cycle"
    >
      <button
        type="button"
        onClick={() => onChange("monthly")}
        className={`${base} ${value === "monthly" ? active : inactive}`}
        aria-pressed={value === "monthly"}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => onChange("annual")}
        className={`${base} inline-flex items-center gap-2 ${
          value === "annual" ? active : inactive
        }`}
        aria-pressed={value === "annual"}
      >
        Annual
        <span
          className={`text-[9px] tracking-[0.18em] uppercase font-mono font-bold rounded-full px-2 py-0.5 ${
            value === "annual"
              ? "bg-emerald-400/15 text-emerald-700 border border-emerald-500/40"
              : "bg-emerald-400/10 text-emerald-300 border border-emerald-400/30"
          }`}
        >
          Save up to 23%
        </span>
      </button>
    </div>
  );
}

/* ─────────── Plan card ─────────── */

function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const price = billing === "annual" ? plan.annualPrice : plan.monthlyPrice;
  const isHl = plan.highlighted;
  return (
    <div
      className={`relative ${CARD} p-6 md:p-7 flex flex-col ${
        isHl
          ? "border-blue-400/40"
          : ""
      }`}
      style={{
        ...CARD_INNER,
        ...(isHl
          ? {
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.06), 0 0 30px -6px rgba(96,140,255,0.35)",
            }
          : {}),
      }}
    >
      {isHl && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] tracking-[0.18em] uppercase font-mono font-bold px-3 py-1 rounded-full whitespace-nowrap"
          style={{ boxShadow: "0 0 18px -4px rgba(96,140,255,0.7)" }}
        >
          Most popular
        </span>
      )}

      {/* Header: swatch + name */}
      <div className="flex items-center gap-2.5 mb-4">
        <span className={`w-3 h-3 rounded-sm ${plan.swatch}`} aria-hidden />
        <h3 className="text-white text-base md:text-lg font-semibold tracking-[-0.01em]">
          {plan.name}
        </h3>
      </div>

      {/* Memory size: the visual focal point */}
      <div className="mb-5">
        <p className="text-white text-3xl md:text-4xl font-semibold tracking-[-0.02em] tabular-nums leading-none">
          {plan.memory}
        </p>
        <p className="text-[12.5px] text-slate-300 mt-2 leading-snug min-h-[34px]">
          {plan.memoryHuman}
        </p>
      </div>

      {/* Price */}
      <div className="mb-2 min-h-[58px]">
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-white text-2xl md:text-3xl font-semibold tracking-[-0.02em] tabular-nums">
            {price.display}
          </span>
          {price.sub && (
            <span className="text-slate-400 text-[12px] font-mono leading-tight">
              {price.sub}
            </span>
          )}
        </div>
      </div>

      {/* Tagline (reserved height so cards align) */}
      <p className="text-slate-400 text-[13px] leading-relaxed mb-5 min-h-[60px]">
        {plan.tagline}
      </p>

      {/* Inherits */}
      {plan.inheritFrom ? (
        <p className="text-[11px] text-slate-500 font-mono mb-3 tracking-wide">
          Everything in {plan.inheritFrom}, plus:
        </p>
      ) : (
        <p className="text-[11px] text-slate-500 font-mono mb-3 tracking-wide invisible">
          &nbsp;
        </p>
      )}

      {/* Features */}
      <ul className="flex-1 space-y-2.5 mb-6">
        {plan.features.map((f) => (
          <li key={f.text} className="flex items-start gap-2 text-[13px]">
            {f.included ? (
              <Check
                className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0"
                strokeWidth={2.5}
              />
            ) : (
              <X
                className="w-4 h-4 text-slate-600 mt-0.5 shrink-0"
                strokeWidth={2.5}
              />
            )}
            <span
              className={
                f.included
                  ? "text-slate-300"
                  : "text-slate-500"
              }
            >
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-auto">
        <a
          href={plan.cta.href}
          className={
            isHl
              ? "inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-50 text-black text-sm font-semibold px-5 py-2.5 hover:bg-slate-200 transition-colors"
              : "inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 text-slate-200 text-sm font-medium px-5 py-2.5 hover:border-white/30 transition-colors"
          }
        >
          {plan.cta.label}
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.25} />
        </a>
      </div>
    </div>
  );
}

/* ─────────── Compare table ─────────── */

function CompareTable() {
  return (
    <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
      <div
        className={`${CARD} overflow-hidden`}
        style={CARD_INNER}
      >
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02]">
              <th className="text-left text-slate-400 font-mono text-[10px] uppercase tracking-[0.18em] py-4 px-4 md:px-5 font-semibold">
                Feature
              </th>
              {PLANS.map((p) => (
                <th
                  key={p.name}
                  className={`text-center font-semibold py-4 px-3 md:px-4 min-w-[120px] ${
                    p.highlighted ? "text-blue-200" : "text-white"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-sm ${p.swatch}`}
                      aria-hidden
                    />
                    {p.name}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE.map((r) => (
              <tr
                key={r.row}
                className="border-b border-white/[0.05] last:border-0 hover:bg-white/[0.015] transition-colors"
              >
                <td className="py-3 px-4 md:px-5 text-slate-300 text-[13px]">
                  {r.row}
                </td>
                {r.values.map((v, ix) => (
                  <td
                    key={ix}
                    className={`py-3 px-3 md:px-4 text-center text-[13px] ${
                      ix === 1 ? "bg-blue-500/[0.04]" : ""
                    }`}
                  >
                    {v === true ? (
                      <Check
                        className="w-4 h-4 text-emerald-400 inline"
                        strokeWidth={2.5}
                      />
                    ) : v === false ? (
                      <span className="text-slate-600">n/a</span>
                    ) : (
                      <span
                        className={
                          ix === 1
                            ? "text-blue-200 font-medium"
                            : "text-slate-300"
                        }
                      >
                        {v}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
            {/* Try free row */}
            <tr className="border-t border-white/10 bg-white/[0.02]">
              <td className="py-4 px-4 md:px-5 font-semibold text-white text-[13px]">
                Try free
              </td>
              {PLANS.map((p, i) => (
                <td
                  key={p.name}
                  className={`py-4 px-3 md:px-4 text-center ${
                    i === 1 ? "bg-blue-500/[0.04]" : ""
                  }`}
                >
                  <a
                    href={p.cta.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 text-slate-200 text-[12px] font-medium px-3 py-1.5 hover:border-white/30 transition-colors"
                  >
                    {i === 0
                      ? "Start"
                      : i === 3
                      ? "Contact"
                      : "14-day trial"}
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─────────── Add-ons table ─────────── */

function AddOnsTable() {
  return (
    <div
      className={`max-w-xl mx-auto ${CARD} overflow-hidden`}
      style={CARD_INNER}
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.02]">
            <th className="text-left text-slate-400 font-mono text-[10px] uppercase tracking-[0.18em] py-3 px-5 font-semibold">
              Pack
            </th>
            <th className="text-left text-slate-400 font-mono text-[10px] uppercase tracking-[0.18em] py-3 px-5 font-semibold">
              Memory
            </th>
            <th className="text-right text-slate-400 font-mono text-[10px] uppercase tracking-[0.18em] py-3 px-5 font-semibold">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {ADDONS.map((a) => (
            <tr
              key={a.name}
              className="border-b border-white/[0.04] last:border-0"
            >
              <td className="py-4 px-5 text-white font-medium">{a.name}</td>
              <td className="py-4 px-5 text-slate-300 font-mono tabular-nums">
                {a.memory}
              </td>
              <td className="py-4 px-5 text-right text-white font-mono font-semibold tabular-nums">
                {a.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[11px] text-slate-500 text-center px-5 py-3 border-t border-white/[0.06] font-mono tracking-wide">
        Annual on the same multiplier.
      </p>
    </div>
  );
}

/* ─────────── FAQ ─────────── */

function FAQList() {
  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {FAQS.map((f) => (
        <div
          key={f.q}
          className={`${CARD} p-5 md:p-6`}
          style={CARD_INNER}
        >
          <h3 className="text-white text-base md:text-lg font-semibold tracking-[-0.01em] mb-2">
            {f.q}
          </h3>
          <p className="text-slate-400 leading-relaxed text-[14px]">{f.a}</p>
        </div>
      ))}
    </div>
  );
}

/* ─────────── Section title ─────────── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-center mb-8 md:mb-10">
      {children}
    </h2>
  );
}

export default Pricing;
