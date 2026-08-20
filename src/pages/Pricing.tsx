import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Check, ArrowRight } from "lucide-react";
import PillNav from "@/components/PillNav";
import MinFooter from "@/components/MinFooter";
import { getDownloadTarget } from "@/lib/download";

const APP_URL = "https://app.getmin.ai";

const CARD =
  "rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]";

/**
 * The plans are split on who min. is working for, not on how far back it can
 * remember. Recall windows are no longer a thing in the product, and they were
 * a strange thing to sell anyway: nobody wants to buy memory by the month.
 *
 * One person, free, forever. You pay at the point min. starts working across a
 * team, which is also the point it starts saving a team's worth of time.
 */
type Plan = {
  name: string;
  swatch: string;
  who: { label: string; strong: boolean };
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
    who: { label: "For you", strong: false },
    features: [
      "Notes for every meeting you are in",
      "Reminders and follow ups",
      "Scheduling, just put min. on Cc",
      "Ask it anything it was part of",
      "Desktop app for macOS and Windows",
    ],
    cta: { label: getDownloadTarget().label, href: getDownloadTarget().href },
  },
  {
    name: "Pro",
    swatch: "bg-moss",
    price: { display: "$20", sub: "/ active teammate / mo" },
    who: { label: "For your team", strong: true },
    inheritFrom: "Free",
    features: [
      "Shared notes for everyone who was there",
      "Team reminders: what was promised, who owes what",
      "Rituals: daily briefs and weekly summaries",
      "Ask min. in Slack or Teams",
      "Roles and admin",
      "Priority support",
    ],
    cta: { label: "Start with your team", href: APP_URL },
    highlighted: true,
  },
  {
    name: "Business",
    swatch: "bg-gray-900",
    price: { display: "Custom", sub: "let's talk" },
    who: { label: "For your company", strong: true },
    inheritFrom: "Pro",
    features: [
      "SSO, SAML, and SCIM",
      "SOC 2 Type II and data residency",
      "Bring your own database, graph, and vector store",
      "Dedicated onboarding and SLA",
    ],
    cta: {
      label: "Contact us",
      href: "mailto:hello@getmin.ai?subject=min.%20Business%20plan",
    },
  },
];

const FAQS = [
  {
    q: "Is it really free?",
    a: "Yes. Everything min. does for you on your own is free, with no time limit and no card. You pay when you want it working across a team: shared notes, team reminders, and rituals.",
  },
  {
    q: "What is an active teammate?",
    a: "Someone min. actually did something for that month. You can invite the whole company without paying for the whole company, and a teammate who sits out a month is not billed for that month.",
  },
  {
    q: "How do I start using min.?",
    a: "Shoot a hello email to min@getmin.ai and you are started. You can also CC it on a thread that needs scheduling, or add it to a meeting invite. The desktop app for macOS and Windows adds the full experience.",
  },
  {
    q: "Do you store my email?",
    a: "No. min. keeps distilled memory and metadata, never your raw mail. We never train on it, sell it, or share it. Our belief is that your context can become one of your biggest professional assets. It's bad for business for us to not take that seriously.",
  },
];

const Pricing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Pricing | min., the AI teammate that does the little things</title>
        <meta
          name="description"
          content="min., the AI teammate that does the little things, is free for one person, forever. You pay when it starts working across your team."
        />
        <link rel="canonical" href="https://getmin.ai/pricing/" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-gray-900 font-sans antialiased overflow-x-hidden">
        <PillNav />

        <main className="relative pt-28 md:pt-44 pb-24 md:pb-32">
          <div className="relative max-w-5xl mx-auto px-6">
            <header className="text-center mb-14 md:mb-16">
              <h1 className="font-display text-gray-900 font-semibold tracking-[-0.025em] leading-[1.05] text-4xl md:text-6xl">
                Free to <span className="text-moss">use</span>.
              </h1>
              <p className="mt-6 text-gray-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                Free for you, forever. You pay when min. starts working across
                your team.
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
            plan.who.strong
              ? "border border-moss/25 bg-moss-soft text-moss"
              : "border border-gray-200 bg-gray-50 text-gray-600"
          }`}
        >
          {plan.who.label}
        </span>
      </div>

      {plan.inheritFrom && (
        <p className="text-[11.5px] text-gray-400 mb-3">Everything in {plan.inheritFrom}, plus</p>
      )}

      <ul className="flex-1 space-y-2.5 mb-6">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[13.5px]">
            <Check className="w-4 h-4 text-moss mt-0.5 shrink-0" strokeWidth={2.5} />
            <span className="text-gray-600">{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <a
          href={plan.cta.href}
          className={
            isHl
              ? "inline-flex w-full items-center justify-center gap-2 rounded-full bg-black text-white text-sm font-semibold px-5 py-2.5 hover:bg-gray-800 transition-colors"
              : "inline-flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 hover:border-gray-300 hover:text-gray-900 transition-colors"
          }
        >
          <span className="text-center">{plan.cta.label}</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" strokeWidth={2.25} />
        </a>
      </div>
    </div>
  );
}

export default Pricing;
