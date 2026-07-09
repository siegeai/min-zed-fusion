import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Check, ArrowRight } from "lucide-react";
import PillNav from "@/components/PillNav";
import MinFooter from "@/components/MinFooter";

const APP_URL = "https://app.getmin.ai";

const CARD =
  "rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]";

type Plan = {
  name: string;
  swatch: string;
  recall: { label: string; strong: boolean };
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
    price: { display: "$0", sub: "forever" },
    recall: { label: "Last 3 months", strong: false },
    features: [
      "Unlimited teammates",
      "A living capsule for every relationship",
      "Merge and share across your team",
      "Built from email and meetings",
    ],
    cta: { label: "Connect your inbox", href: APP_URL },
  },
  {
    name: "Pro",
    swatch: "bg-emerald-500",
    price: { display: "$20", sub: "/ active teammate / mo" },
    recall: { label: "All-time", strong: true },
    inheritFrom: "Free",
    features: ["Full history, all-time recall", "Roles and admin", "Priority support"],
    cta: { label: "Start with your team", href: APP_URL },
    highlighted: true,
  },
  {
    name: "Business",
    swatch: "bg-gray-900",
    price: { display: "Custom", sub: "let's talk" },
    recall: { label: "All-time", strong: true },
    inheritFrom: "Pro",
    features: ["SSO, SAML, and SCIM", "SOC 2 Type II and data residency", "Dedicated onboarding and SLA"],
    cta: {
      label: "Contact us",
      href: "mailto:hello@getmin.ai?subject=min.%20Business%20plan",
    },
  },
];

const FAQS = [
  {
    q: "Is it really free for my whole team?",
    a: "Yes. Invite everyone at no cost. Free recalls the last 3 months of every relationship; upgrade only to reach further back.",
  },
  {
    q: "What does \"per active teammate\" mean?",
    a: "You're billed only for teammates who actually used min. that month. Inviting is always free.",
  },
  {
    q: "Can I share a capsule for free?",
    a: "Yes, on every plan. The other side signs in and sees only what is between the two of you. Revocable any time.",
  },
  {
    q: "Do you store my email?",
    a: "No. min. keeps distilled memory, not your raw mail. We never train on it, sell it, or share it.",
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
          content="min. is free for your whole team. Invite everyone at no cost. You pay only to recall the full history, and only for teammates who are active."
        />
        <link rel="canonical" href="https://getmin.ai/pricing" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-gray-900 font-sans antialiased overflow-x-hidden">
        <PillNav />

        <main className="relative pt-36 md:pt-44 pb-24 md:pb-32">
          <div className="relative max-w-5xl mx-auto px-6">
            <header className="text-center mb-14 md:mb-16">
              <h1 className="font-display text-gray-900 font-semibold tracking-[-0.025em] leading-[1.05] text-4xl md:text-6xl">
                Free for your whole <span className="text-emerald-600">team</span>.
              </h1>
              <p className="mt-6 text-gray-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                Invite everyone free. You pay only to recall the full history, and
                only for teammates who are active.
              </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-24 md:mb-28">
              {PLANS.map((p) => (
                <PlanCard key={p.name} plan={p} />
              ))}
            </section>

            <section className="max-w-2xl mx-auto">
              <h2 className="font-display text-gray-900 text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-center mb-8">
                Questions.
              </h2>
              <div className="space-y-3">
                {FAQS.map((f) => (
                  <div key={f.q} className={`${CARD} p-5 md:p-6`}>
                    <h3 className="text-gray-900 text-[15px] font-semibold tracking-[-0.01em] mb-1.5">
                      {f.q}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-[14px]">{f.a}</p>
                  </div>
                ))}
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
  const isHl = plan.highlighted;
  return (
    <div
      className={`relative ${CARD} p-6 md:p-7 flex flex-col ${
        isHl ? "ring-2 ring-gray-900 border-transparent" : ""
      }`}
    >
      {isHl && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] tracking-[0.16em] uppercase font-medium px-3 py-1 rounded-full whitespace-nowrap">
          Most popular
        </span>
      )}

      <div className="flex items-center gap-2.5 mb-4">
        <span className={`w-2.5 h-2.5 rounded-sm ${plan.swatch}`} aria-hidden />
        <h3 className="text-gray-900 text-base md:text-lg font-semibold tracking-[-0.01em]">
          {plan.name}
        </h3>
      </div>

      <div className="mb-4 flex items-baseline gap-1.5 flex-wrap">
        <span className="text-gray-900 text-4xl md:text-5xl font-semibold tracking-[-0.02em] tabular-nums leading-none">
          {plan.price.display}
        </span>
        {plan.price.sub && (
          <span className="text-gray-500 text-[12.5px] leading-tight">{plan.price.sub}</span>
        )}
      </div>

      <div className="mb-5">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-medium ${
            plan.recall.strong
              ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border border-gray-200 bg-gray-50 text-gray-600"
          }`}
        >
          Recall: {plan.recall.label}
        </span>
      </div>

      {plan.inheritFrom && (
        <p className="text-[11.5px] text-gray-400 mb-3">Everything in {plan.inheritFrom}, plus</p>
      )}

      <ul className="flex-1 space-y-2.5 mb-6">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[13.5px]">
            <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" strokeWidth={2.5} />
            <span className="text-gray-600">{f}</span>
          </li>
        ))}
      </ul>

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

export default Pricing;
