import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Check, ArrowRight, Users } from "lucide-react";
import PillNav from "@/components/PillNav";
import MinFooter from "@/components/MinFooter";

const APP_URL = "https://app.getmin.ai";

const CARD =
  "rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]";

type Plan = {
  name: string;
  swatch: string; // tailwind bg class for the colored dot
  audience: string; // who it's for, the small label above price
  recall: { label: string; strong: boolean }; // the paid lever, shown as a chip
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
    audience: "For your whole team",
    price: { display: "$0", sub: "forever" },
    recall: { label: "Recalls the last 3 months", strong: false },
    tagline:
      "Invite everyone, free. Living capsules, merged and shared across the whole team.",
    features: [
      "Unlimited teammates, free",
      "A living capsule for every relationship",
      "Merge, share, and one shared team memory",
      "Built automatically from email and meetings",
      "Feed, constellation, prep, and your-eyes-only insights",
    ],
    cta: { label: "Connect your inbox", href: APP_URL },
  },
  {
    name: "Pro",
    swatch: "bg-emerald-500",
    audience: "For teams who rely on it",
    price: { display: "$20", sub: "/ active teammate / mo" },
    recall: { label: "Recalls the full history, all-time", strong: true },
    tagline:
      "Recall the whole history of every relationship. Billed only for teammates who are active.",
    inheritFrom: "Free",
    features: [
      "Full history, all-time recall",
      "Invite everyone free, pay only for active teammates",
      "Roles and admin controls",
      "Priority support",
    ],
    cta: { label: "Start with your team", href: APP_URL },
    highlighted: true,
  },
  {
    name: "Business",
    swatch: "bg-gray-900",
    audience: "For your whole company",
    price: { display: "Custom", sub: "let's talk" },
    recall: { label: "Recalls the full history, all-time", strong: true },
    tagline:
      "When your team's memory is the thing you cannot afford to lose.",
    inheritFrom: "Pro",
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
  { row: "Price", values: ["$0 forever", "$20 / active teammate / mo", "Custom"] },
  { row: "Teammates", values: ["Unlimited, free", "Unlimited, invite free", "Unlimited"] },
  { row: "Recall window", values: ["Last 3 months", "All-time", "All-time"] },
  { row: "A capsule for every relationship", values: [true, true, true] },
  { row: "Built from email and meetings", values: [true, true, true] },
  { row: "Merge capsules with teammates", values: [true, true, true] },
  { row: "One shared team memory", values: [true, true, true] },
  { row: "Share a capsule with the other side", values: [true, true, true] },
  { row: "Feed, constellation, and prep", values: [true, true, true] },
  { row: "Insights, your eyes only", values: [true, true, true] },
  { row: "Roles and admin", values: [false, true, true] },
  { row: "SSO, SAML, SCIM", values: [false, false, true] },
  { row: "SOC 2 Type II", values: [true, true, true] },
  { row: "Data residency", values: [false, false, true] },
  { row: "Audit log", values: [false, false, true] },
  { row: "Support", values: ["Community", "Priority", "Dedicated"] },
];

const FAQS = [
  {
    q: "Is min. really free for my whole team?",
    a: "Yes. Invite everyone at no cost. You all get living capsules, merge and share, and one shared team memory. Free recalls the last 3 months of every relationship. You upgrade only to reach further back.",
  },
  {
    q: "What does Pro add?",
    a: "The full memory. Free recalls the last 3 months; Pro recalls the entire history of every relationship, all-time, plus roles and admin. Older context is always captured, it just becomes recallable the moment you upgrade.",
  },
  {
    q: "What does \"per active teammate\" mean?",
    a: "You invite as many people as you like for free. Each month you're billed only for the teammates who actually used min. Inactive teammates cost nothing, so growing your team is never taxed.",
  },
  {
    q: "So inviting teammates is always free?",
    a: "Always. Spreading min. across your team should never cost you. You pay for how far back the memory reaches, not for headcount, and only for people who are active.",
  },
  {
    q: "Can I share a capsule for free?",
    a: "Yes, on every plan. Sharing a capsule with the person on the other side is free. They sign in as themselves and see only the emails and meetings between the two of you. A grant, not an export, revocable any time.",
  },
  {
    q: "Do you store my email, and is my data used to train AI?",
    a: "No and never. min. keeps distilled memory, not your raw email, and message bodies are not stored. Your memory is yours. We don't train on it, sell it, or share it unless you share a capsule.",
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
          content="min. is relationship memory that is free for your whole team. Invite everyone at no cost to merge and share living capsules. You pay to recall the full history, billed only for teammates who are active."
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
                Free for your whole{" "}
                <span className="text-emerald-600">team</span>.
              </h1>
              <p className="mt-6 text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Every relationship becomes a living capsule, built automatically
                from your email and meetings. Invite everyone at no cost. You pay
                only to recall the full history, and only for teammates who are
                active.
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

            {/* Invite-free note */}
            <InviteNote />

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
              Seats are free
            </span>
            <span className="text-gray-900 text-base md:text-lg font-semibold tracking-[-0.01em] whitespace-nowrap">
              Pay for memory, not seats.
            </span>
          </div>
          <p className="text-gray-600 text-[14px] md:text-[15px] leading-snug">
            Invite your whole team at no cost and start merging and sharing right
            away. min. recalls{" "}
            <span className="text-gray-900">the last 3 months for free</span>. Pro
            reaches back through the full history of every relationship, billed
            only for the teammates who are active.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Invite-free note ─────────── */

function InviteNote() {
  return (
    <div className="max-w-3xl mx-auto mb-20 md:mb-28">
      <div className="flex items-start gap-3 justify-center text-center md:text-left">
        <span className="hidden md:inline-flex shrink-0 mt-0.5">
          <Users className="w-4 h-4 text-gray-400" strokeWidth={2} />
        </span>
        <p className="text-gray-500 text-[13.5px] leading-relaxed">
          <span className="text-gray-900 font-medium">
            Inviting teammates is always free.
          </span>{" "}
          You're billed only for the people who are active each month, and only
          to recall the full history. Growth inside your team is never taxed.
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
      <div className="mb-3 min-h-[52px]">
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

      {/* Recall lever chip */}
      <div className="mb-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-medium ${
            plan.recall.strong
              ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border border-gray-200 bg-gray-50 text-gray-600"
          }`}
        >
          {plan.recall.label}
        </span>
      </div>

      {/* Tagline (reserved height so cards align) */}
      <p className="text-gray-600 text-[13px] leading-relaxed mb-5 min-h-[54px]">
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
