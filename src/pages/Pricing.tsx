import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Check, X, ArrowRight, Users } from "lucide-react";
import PillNav from "@/components/PillNav";
import MinFooter from "@/components/MinFooter";

const CARD =
  "rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]";

type Feature = { text: string; included: boolean };

type Plan = {
  name: string;
  swatch: string; // tailwind bg class for the colored dot
  lookback: string; // recall window, the focal number
  lookbackHuman: string; // human translation of the recall window
  tagline: string;
  inheritFrom?: string;
  features: Feature[];
  cta: { label: string; href: string };
  highlighted?: boolean;
  price: { display: string; sub?: string };
};

const PLANS: Plan[] = [
  {
    name: "Free",
    swatch: "bg-blue-500",
    price: { display: "$0", sub: "forever" },
    lookback: "3 months",
    lookbackHuman: "min recalls everything from your last 3 months of work.",
    tagline: "For one person. Make a single AI feel like it knows your work.",
    features: [
      { text: "Just you (invite a teammate → Plus)", included: true },
      { text: "3-month recall window", included: true },
      { text: "Unified knowledge base", included: true },
      { text: "Ask anything across your sources", included: true },
      { text: "Use in Slack, Teams, or any LLM", included: true },
      { text: "End-to-end encrypted", included: true },
    ],
    cta: {
      label: "Get started free",
      href: "https://app.getmin.ai/find",
    },
  },
  {
    name: "Plus",
    swatch: "bg-purple-500",
    price: { display: "$20", sub: "/ user / mo" },
    lookback: "2 years",
    lookbackHuman: "Two years of company context, recalled in an instant.",
    tagline: "Where each team and project gets its own shared memory.",
    inheritFrom: "Free",
    features: [
      { text: "Invite your whole team", included: true },
      { text: "Shared team memory", included: true },
      { text: "2-year recall window", included: true },
      { text: "All connectors: email, docs, CRM & ERP", included: true },
      { text: "Priority, sub-second recall", included: true },
    ],
    cta: { label: "Get started", href: "https://app.getmin.ai/find" },
    highlighted: true,
  },
  {
    name: "Pro",
    swatch: "bg-slate-600",
    price: { display: "$50", sub: "/ user / mo" },
    lookback: "10 years",
    lookbackHuman: "A full decade of institutional memory, always on tap.",
    tagline: "For teams who need control, depth, and a long memory.",
    inheritFrom: "Plus",
    features: [
      { text: "10-year recall window", included: true },
      { text: "Granular control over what's shared", included: true },
      { text: "Admin roles & audit log", included: true },
      { text: "API access", included: true },
      { text: "Priority support", included: true },
    ],
    cta: { label: "Upgrade to Pro", href: "https://app.getmin.ai/find" },
  },
  {
    name: "Business",
    swatch: "bg-amber-500",
    price: { display: "Custom", sub: "volume pricing" },
    lookback: "Custom",
    lookbackHuman: "Set your own recall window, up to your entire history.",
    tagline: "When your company's memory is your moat.",
    inheritFrom: "Pro",
    features: [
      { text: "Custom recall window", included: true },
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
  { row: "Recall window", values: ["3 months", "2 years", "10 years", "Custom"] },
  { row: "Price", values: ["$0", "$20 / user / mo", "$50 / user / mo", "Custom"] },
  { row: "Users", values: ["Just you", "Your team", "Your team", "Unlimited"] },
  { row: "Shared team memory", values: [false, true, true, true] },
  { row: "Unified knowledge base", values: [true, true, true, true] },
  { row: "Ask anything across sources", values: [true, true, true, true] },
  { row: "Use in Slack, Teams & any LLM", values: [true, true, true, true] },
  { row: "Connectors (email, docs, CRM, ERP)", values: ["Core", "All", "All", "All"] },
  { row: "Priority recall", values: [false, true, true, true] },
  { row: "Control over what's shared", values: [false, false, true, true] },
  { row: "Admin roles & audit log", values: [false, false, true, true] },
  { row: "API access", values: [false, false, true, true] },
  { row: "SSO / SAML / SCIM", values: [false, false, false, true] },
  { row: "SOC 2 Type II", values: [true, true, true, true] },
  { row: "Data residency", values: [false, false, false, true] },
  { row: "Support", values: ["Community", "Email", "Priority", "Dedicated"] },
];

const FAQS = [
  {
    q: "What does the recall window mean?",
    a: "It's how far back min can recall context for you. On Free, that's your last 3 months; Plus reaches 2 years, Pro a full decade. Older context is still safely stored, it just becomes recallable again the moment you extend your window.",
  },
  {
    q: "What happens when I invite a teammate?",
    a: "Free is built for one person. The moment you invite a second user, your workspace moves to Plus, where your memory becomes a shared team memory everyone can ask, chat with, and build on, alongside separate memories for each project.",
  },
  {
    q: "Why is it priced per user?",
    a: "Above Free, min is built for teams. Plus and Pro are billed per user per month, so everyone gets their own access to your shared team and project memories, with controls over exactly what each person can see.",
  },
  {
    q: "Can I control exactly what data gets shared?",
    a: "Yes. You decide which sources feed each team and project memory and which teammates can see what. Granular controls (on Pro and Business) let you keep sensitive data out of shared recall entirely.",
  },
  {
    q: "Where can my team ask questions?",
    a: "Anywhere your team already works. Ask the right team or project memory inside Slack, Teams, or the LLM of your choice, the moment a source is connected. No re-indexing delay.",
  },
  {
    q: "Is my data used to train AI models?",
    a: "Never. Your company's memory is yours. We don't train on it, sell it, or share it with the AI providers you connect.",
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
          content="A memory for every team and project: slices of context that together become your company's. Start free for yourself, bring your team when you're ready, and choose how far back each memory reaches: 3 months, 2 years, or a full decade."
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
                A memory for every{" "}
                <span className="text-blue-600">team and project</span>.
              </h1>
              <p className="mt-6 text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Slices of context that together become your company's. Start free
                for yourself, add your team when you're ready, and choose how far
                back each memory reaches.
              </p>
            </header>

            {/* Recall window explainer */}
            <RecallExplainer />

            {/* Plan grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 mb-8 md:mb-10 mt-6">
              {PLANS.map((p) => (
                <PlanCard key={p.name} plan={p} />
              ))}
            </section>

            {/* Teams note */}
            <TeamsNote />

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

/* ─────────── Recall window explainer ─────────── */

function RecallExplainer() {
  return (
    <div className="relative mt-12 mb-2 max-w-4xl mx-auto">
      <div className={`${CARD} relative overflow-hidden p-5 md:p-6`}>
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-5">
          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-mono font-bold tracking-[0.16em] uppercase text-blue-600">
              Recall &ne; Storage
            </span>
            <span className="text-gray-900 text-base md:text-lg font-semibold tracking-[-0.01em] whitespace-nowrap">
              It's about how far back.
            </span>
          </div>
          <p className="text-gray-600 text-[14px] md:text-[15px] leading-snug">
            min doesn't bill for gigabytes. Your plan sets{" "}
            <span className="text-gray-900">
              how far back each team and project memory reaches
            </span>
            , from your last 3 months to a full decade of context, recalled live
            by every AI tool your team opens.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Teams note ─────────── */

function TeamsNote() {
  return (
    <div className="max-w-3xl mx-auto mb-20 md:mb-28">
      <div className="flex items-start gap-3 justify-center text-center md:text-left">
        <span className="hidden md:inline-flex shrink-0 mt-0.5">
          <Users className="w-4 h-4 text-gray-400" strokeWidth={2} />
        </span>
        <p className="text-gray-500 text-[13.5px] leading-relaxed">
          <span className="text-gray-900 font-medium">
            Free is built for one person.
          </span>{" "}
          The moment you invite a teammate, you move to Plus, and your memory
          becomes a shared team memory everyone can ask and build on.
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
        isHl ? "ring-2 ring-black border-transparent" : ""
      }`}
    >
      {isHl && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] tracking-[0.18em] uppercase font-mono font-bold px-3 py-1 rounded-full whitespace-nowrap">
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

      {/* Recall window: the visual focal point */}
      <div className="mb-5">
        <p className="text-[11px] text-gray-400 font-mono uppercase tracking-[0.16em] mb-1.5">
          Recall window
        </p>
        <p className="text-gray-900 text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-none">
          {plan.lookback}
        </p>
        <p className="text-[12.5px] text-gray-600 mt-2 leading-snug min-h-[34px]">
          {plan.lookbackHuman}
        </p>
      </div>

      {/* Price */}
      <div className="mb-2 min-h-[44px]">
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-gray-900 text-2xl md:text-3xl font-semibold tracking-[-0.02em] tabular-nums">
            {plan.price.display}
          </span>
          {plan.price.sub && (
            <span className="text-gray-500 text-[12px] font-mono leading-tight">
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
        <p className="text-[11px] text-gray-500 font-mono mb-3 tracking-wide invisible">
          &nbsp;
        </p>
      )}

      {/* Features */}
      <ul className="flex-1 space-y-2.5 mb-6">
        {plan.features.map((f) => (
          <li key={f.text} className="flex items-start gap-2 text-[13px]">
            {f.included ? (
              <Check
                className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"
                strokeWidth={2.5}
              />
            ) : (
              <X
                className="w-4 h-4 text-gray-400 mt-0.5 shrink-0"
                strokeWidth={2.5}
              />
            )}
            <span className={f.included ? "text-gray-600" : "text-gray-500"}>
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
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-[#FAFAF9]">
              <th className="text-left text-gray-400 font-mono text-[10px] uppercase tracking-[0.18em] py-4 px-4 md:px-5 font-semibold">
                Feature
              </th>
              {PLANS.map((p) => (
                <th
                  key={p.name}
                  className={`text-center font-semibold py-4 px-3 md:px-4 min-w-[120px] ${
                    p.highlighted ? "text-blue-600" : "text-gray-900"
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
                      ix === 1 ? "bg-blue-50/60" : ""
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
                            ? "text-blue-600 font-medium"
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
                    i === 1 ? "bg-blue-50/60" : ""
                  }`}
                >
                  <a
                    href={p.cta.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 text-gray-700 text-[12px] font-medium px-3 py-1.5 hover:border-gray-300 hover:text-gray-900 transition-colors"
                  >
                    {i === 3 ? "Contact" : i === 0 ? "Start free" : "Start"}
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
