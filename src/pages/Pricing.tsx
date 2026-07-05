import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Check, ArrowRight, User } from "lucide-react";
import PillNav from "@/components/PillNav";
import MinFooter from "@/components/MinFooter";

const APP_URL = "https://app.getmin.ai";

const CARD =
  "rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]";

type Plan = {
  name: string;
  swatch: string; // tailwind bg class for the colored dot
  audience: string; // who it's for, the small label above price
  tagline: string;
  inheritFrom?: string;
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
  price: { display: string; sub?: string };
};

const PLANS: Plan[] = [
  {
    name: "Free",
    swatch: "bg-gray-400",
    audience: "For one person",
    price: { display: "$0", sub: "forever" },
    tagline:
      "Turn your email and meetings into a living capsule for every relationship. Yours alone.",
    features: [
      "A living capsule for every relationship",
      "Built automatically from Gmail or Outlook, plus meetings",
      "Your feed, constellation, and prep",
      "Insights, your eyes only",
      "Share any capsule with the other side, free",
    ],
    cta: { label: "Connect your inbox", href: APP_URL },
  },
  {
    name: "Team",
    swatch: "bg-emerald-500",
    audience: "For your team",
    price: { display: "$20", sub: "/ user / mo" },
    tagline:
      "For teams who work the same relationships. One shared memory that outlasts anyone leaving.",
    inheritFrom: "Free",
    features: [
      "Invite your whole team",
      "Merge capsules to see the whole relationship",
      "One shared memory across everyone",
      "When someone leaves, the relationships stay",
      "Roles and admin controls",
    ],
    cta: { label: "Start with your team", href: APP_URL },
    highlighted: true,
  },
  {
    name: "Business",
    swatch: "bg-gray-900",
    audience: "For your whole company",
    price: { display: "Custom", sub: "let's talk" },
    tagline:
      "When your team's memory is the thing you cannot afford to lose.",
    inheritFrom: "Team",
    features: [
      "SSO, SAML, and SCIM",
      "SOC 2 Type II and data residency",
      "Audit log and retention controls",
      "Dedicated onboarding",
      "99.9% uptime SLA",
    ],
    cta: {
      label: "Contact us",
      href: "mailto:hello@getmin.ai?subject=min.%20Business%20plan",
    },
  },
];

type CompareValue = string | boolean;
type CompareRow = { row: string; values: [CompareValue, CompareValue, CompareValue] };

const COMPARE: CompareRow[] = [
  { row: "Price", values: ["$0 forever", "$20 / user / mo", "Custom"] },
  { row: "Who it's for", values: ["One person", "Your team", "Your company"] },
  { row: "A capsule for every relationship", values: [true, true, true] },
  { row: "Built from email and meetings", values: [true, true, true] },
  { row: "Feed, constellation, and prep", values: [true, true, true] },
  { row: "Insights, your eyes only", values: [true, true, true] },
  { row: "Share a capsule with the other side", values: [true, true, true] },
  { row: "Merge capsules with teammates", values: [false, true, true] },
  { row: "One shared team memory", values: [false, true, true] },
  { row: "Roles and admin", values: [false, true, true] },
  { row: "SSO, SAML, SCIM", values: [false, false, true] },
  { row: "SOC 2 Type II", values: [true, true, true] },
  { row: "Data residency", values: [false, false, true] },
  { row: "Audit log", values: [false, false, true] },
  { row: "Support", values: ["Community", "Email", "Dedicated"] },
];

const FAQS = [
  {
    q: "Is min. really free for one person?",
    a: "Yes, solo and forever. Every relationship you have becomes a capsule, built automatically from the email and meetings you already have. You only pay when you bring teammates in to merge and share.",
  },
  {
    q: "What am I paying for on Team?",
    a: "Teammates. Team is billed per user per month, for when two of you work the same relationships. You merge capsules into one view, your memory becomes shared, and when someone leaves the relationships stay.",
  },
  {
    q: "What happens when I invite a teammate?",
    a: "Your workspace becomes a Team workspace. Each person gets a seat, your capsules can merge, and the memory is shared across everyone you invite.",
  },
  {
    q: "Can I share a capsule for free?",
    a: "Yes. Sharing a capsule with the person on the other side is free on every plan. They sign in as themselves and see only the emails and meetings between the two of you. A grant, not an export, revocable any time.",
  },
  {
    q: "Do you store my email?",
    a: "No. min. keeps distilled memory, not your raw email. Message bodies are not stored, and your insights are your eyes only.",
  },
  {
    q: "Is my data used to train AI models?",
    a: "Never. Your memory is yours. We don't train on it, sell it, or share it with anyone unless you choose to share a capsule.",
  },
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
          content="min. is relationship memory that is free for one person, forever. Every relationship becomes a living capsule, built from your email and meetings. You pay per teammate, only when your team merges and shares the memory."
        />
        <link rel="canonical" href="https://getmin.ai/pricing" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-gray-900 font-sans antialiased overflow-x-hidden">
        <PillNav />

        <main className="relative pt-36 md:pt-44 pb-20 md:pb-28 overflow-hidden">
          <div className="relative max-w-6xl mx-auto px-6">
            {/* Header */}
            <header className="text-center mb-12 md:mb-16">
              <p className="text-[11px] md:text-xs tracking-[0.2em] uppercase text-gray-400 mb-5">
                Pricing
              </p>
              <h1 className="font-display text-gray-900 font-semibold tracking-[-0.025em] leading-[1.05] text-4xl md:text-5xl lg:text-6xl max-w-3xl mx-auto">
                Start free. Grow with your{" "}
                <span className="text-emerald-600">team</span>.
              </h1>
              <p className="mt-6 text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Every relationship you have becomes a living capsule, built
                automatically from your email and meetings. Free for one person,
                forever. You pay only when your team merges and shares the memory.
              </p>
            </header>

            {/* Growth model explainer */}
            <GrowthExplainer />

            {/* Plan grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 mb-8 md:mb-10 mt-6">
              {PLANS.map((p) => (
                <PlanCard key={p.name} plan={p} />
              ))}
            </section>

            {/* Solo note */}
            <SoloNote />

            {/* Compare plans */}
            <section className="mb-20 md:mb-28">
              <SectionTitle>Compare plans</SectionTitle>
              <CompareTable />
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

/* ─────────── Growth model explainer ─────────── */

function GrowthExplainer() {
  return (
    <div className="relative mt-12 mb-2 max-w-4xl mx-auto">
      <div className={`${CARD} relative overflow-hidden p-5 md:p-6`}>
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-5">
          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-mono font-bold tracking-[0.16em] uppercase text-emerald-700">
              Pay for teammates
            </span>
            <span className="text-gray-900 text-base md:text-lg font-semibold tracking-[-0.01em] whitespace-nowrap">
              Not for memory.
            </span>
          </div>
          <p className="text-gray-600 text-[14px] md:text-[15px] leading-snug">
            min. builds a capsule for every relationship you have at no cost, for
            as long as you like, and{" "}
            <span className="text-gray-900">
              sharing one with the other side is always free
            </span>
            . You pay per teammate, only when your team works the same
            relationships together.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Solo note ─────────── */

function SoloNote() {
  return (
    <div className="max-w-3xl mx-auto mb-20 md:mb-28">
      <div className="flex items-start gap-3 justify-center text-center md:text-left">
        <span className="hidden md:inline-flex shrink-0 mt-0.5">
          <User className="w-4 h-4 text-gray-400" strokeWidth={2} />
        </span>
        <p className="text-gray-500 text-[13.5px] leading-relaxed">
          <span className="text-gray-900 font-medium">
            Free is built for one person.
          </span>{" "}
          The moment you invite a teammate to merge and share, you move to Team,
          and your capsules become one memory everyone can build on.
        </p>
      </div>
    </div>
  );
}

/* ─────────── Plan card ─────────── */

function PlanCard({ plan }: { plan: Plan }) {
  const isHl = plan.highlighted;
  return (
    <div
      className={`relative ${CARD} p-6 md:p-7 flex flex-col ${
        isHl ? "ring-2 ring-gray-900 border-transparent" : ""
      }`}
    >
      {isHl && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] tracking-[0.18em] uppercase font-mono font-bold px-3 py-1 rounded-full whitespace-nowrap">
          Most popular
        </span>
      )}

      {/* Header: swatch + name */}
      <div className="flex items-center gap-2.5 mb-4">
        <span className={`w-3 h-3 rounded-sm ${plan.swatch}`} aria-hidden />
        <h3 className="text-gray-900 text-base md:text-lg font-semibold tracking-[-0.01em]">
          {plan.name}
        </h3>
      </div>

      {/* Audience label */}
      <p className="text-[11px] text-gray-400 font-mono uppercase tracking-[0.16em] mb-2">
        {plan.audience}
      </p>

      {/* Price: the focal point */}
      <div className="mb-4 min-h-[52px]">
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-gray-900 text-4xl md:text-5xl font-semibold tracking-[-0.02em] tabular-nums leading-none">
            {plan.price.display}
          </span>
          {plan.price.sub && (
            <span className="text-gray-500 text-[12.5px] font-mono leading-tight">
              {plan.price.sub}
            </span>
          )}
        </div>
      </div>

      {/* Tagline (reserved height so cards align) */}
      <p className="text-gray-600 text-[13px] leading-relaxed mb-5 min-h-[60px]">
        {plan.tagline}
      </p>

      {/* Inherits */}
      {plan.inheritFrom ? (
        <p className="text-[11px] text-gray-500 font-mono mb-3 tracking-wide">
          Everything in {plan.inheritFrom}, plus:
        </p>
      ) : (
        <p className="text-[11px] text-gray-500 font-mono mb-3 tracking-wide">
          Free, forever:
        </p>
      )}

      {/* Features */}
      <ul className="flex-1 space-y-2.5 mb-6">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[13px]">
            <Check
              className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"
              strokeWidth={2.5}
            />
            <span className="text-gray-600">{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-auto">
        <a
          href={plan.cta.href}
          className={
            isHl
              ? "inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-black text-white text-sm font-semibold px-5 py-2.5 hover:bg-gray-800 transition-colors"
              : "inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 hover:border-gray-300 hover:text-gray-900 transition-colors"
          }
        >
          {plan.cta.label}
          <ArrowRight className="w-3.5 h-3.5 shrink-0" strokeWidth={2.25} />
        </a>
      </div>
    </div>
  );
}

/* ─────────── Compare table ─────────── */

function CompareTable() {
  return (
    <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
      <div className={`${CARD} overflow-hidden`}>
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-[#FAFAF9]">
              <th className="text-left text-gray-400 font-mono text-[10px] uppercase tracking-[0.18em] py-4 px-4 md:px-5 font-semibold">
                Feature
              </th>
              {PLANS.map((p) => (
                <th
                  key={p.name}
                  className={`text-center font-semibold py-4 px-3 md:px-4 min-w-[130px] ${
                    p.highlighted ? "text-emerald-700" : "text-gray-900"
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
                className="border-b border-gray-100 last:border-0 hover:bg-[#FAFAF9] transition-colors"
              >
                <td className="py-3 px-4 md:px-5 text-gray-600 text-[13px]">
                  {r.row}
                </td>
                {r.values.map((v, ix) => (
                  <td
                    key={ix}
                    className={`py-3 px-3 md:px-4 text-center text-[13px] ${
                      ix === 1 ? "bg-emerald-50/60" : ""
                    }`}
                  >
                    {v === true ? (
                      <Check
                        className="w-4 h-4 text-emerald-500 inline"
                        strokeWidth={2.5}
                      />
                    ) : v === false ? (
                      <span className="text-gray-400">n/a</span>
                    ) : (
                      <span
                        className={
                          ix === 1
                            ? "text-emerald-700 font-medium"
                            : "text-gray-600"
                        }
                      >
                        {v}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
            {/* Get started row */}
            <tr className="border-t border-gray-200 bg-[#FAFAF9]">
              <td className="py-4 px-4 md:px-5 font-semibold text-gray-900 text-[13px]">
                Get started
              </td>
              {PLANS.map((p, i) => (
                <td
                  key={p.name}
                  className={`py-4 px-3 md:px-4 text-center ${
                    i === 1 ? "bg-emerald-50/60" : ""
                  }`}
                >
                  <a
                    href={p.cta.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 text-gray-700 text-[12px] font-medium px-3 py-1.5 hover:border-gray-300 hover:text-gray-900 transition-colors"
                  >
                    {i === 0 ? "Start free" : i === 2 ? "Contact" : "Start"}
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

/* ─────────── FAQ ─────────── */

function FAQList() {
  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {FAQS.map((f) => (
        <div key={f.q} className={`${CARD} p-5 md:p-6`}>
          <h3 className="text-gray-900 text-base md:text-lg font-semibold tracking-[-0.01em] mb-2">
            {f.q}
          </h3>
          <p className="text-gray-600 leading-relaxed text-[14px]">{f.a}</p>
        </div>
      ))}
    </div>
  );
}

/* ─────────── Section title ─────────── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-gray-900 text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-center mb-8 md:mb-10">
      {children}
    </h2>
  );
}

export default Pricing;
