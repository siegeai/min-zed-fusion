import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Check } from "lucide-react";

import {
  PageFrame,
  PageHero,
  Section,
  CloseBlock,
  PillLink,
  CONTACT_LABEL,
  contactHref,
} from "@/components/page/Kit";

const APP_URL = "https://app.getmin.ai";

/**
 * Pricing, rebuilt in the home page's language.
 *
 * The plan cards stay. This is the one page where a card earns itself: three
 * plans read side by side is a genuine comparison, and elevation is doing real
 * work rather than decorating a paragraph. What changed is that they are built
 * from the site's own palette and shapes instead of a separate card system,
 * and the hero rags left like every other page now.
 *
 * The FAQ was four more cards. It is a definition list now, hairline separated,
 * because a question and its answer are not objects that need containers.
 *
 * Plans split on who min. is working for, not on how far back it remembers.
 */
type Plan = {
  name: string;
  who: string;
  price: { display: string; sub?: string };
  inheritFrom?: string;
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Free",
    who: "For you",
    price: { display: "$0", sub: "forever" },
    features: [
      "Notes for every meeting you are in",
      "Reminders and follow ups",
      "Scheduling, just put min. on Cc",
      "Ask it anything it was part of",
      "Desktop app for private recording, once you are in",
    ],
    cta: { label: "Connect your repos", href: "https://app.getmin.ai" },
  },
  {
    name: "Pro",
    who: "For your team",
    price: { display: "$20", sub: "/ active teammate / mo" },
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
    who: "For your company",
    price: { display: "Custom", sub: "let's talk" },
    inheritFrom: "Pro",
    features: [
      "SSO, SAML, and SCIM",
      "SOC 2 Type II and data residency",
      "Bring your own database, graph, and vector store",
      "Dedicated onboarding and SLA",
    ],
    cta: { label: CONTACT_LABEL, href: contactHref("min. Business plan") },
  },
];

const FAQS: [string, string][] = [
  [
    "Is it really free?",
    "Yes. Everything min. does for you on your own is free, with no sign up, no card, and no time limit. You pay when you want it working across a team: shared notes, team reminders, and rituals.",
  ],
  [
    "What is an active teammate?",
    "Someone min. actually did something for that month. You can invite the whole company without paying for the whole company, and a teammate who sits out a month is not billed for that month.",
  ],
  [
    "How do I start using min.?",
    "Pick a name on the homepage and put that address on your next team meeting invite. There is no sign up and no account to make first: the first mail creates your team and the name becomes yours. You can also share a Google Doc with it, message it in Slack, or just email it. The desktop app for macOS and Windows adds the full experience.",
  ],
  [
    "Do you store my email?",
    "No. min. keeps distilled memory and metadata, never your raw mail. We never train on it, sell it, or share it. Our belief is that your context can become one of your biggest professional assets, and it is bad for business for us to not take that seriously.",
  ],
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

      <PageFrame>
        <PageHero
          title="Free to use."
          lede="Free for you, forever. You pay when min. starts working across your team."
        />

        <Section wide>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {PLANS.map((p) => (
              <PlanCard key={p.name} plan={p} />
            ))}
          </div>
        </Section>

        <Section title="Questions.">
          <dl className="flex flex-col">
            {FAQS.map(([q, a]) => (
              <div key={q} className="border-b border-hair py-5 first:border-t">
                <dt className="text-[15.5px] font-semibold tracking-[-0.01em] text-ink">
                  {q}
                </dt>
                <dd className="mt-1.5 text-[15px] leading-[1.7] text-quiet [text-wrap:pretty]">
                  {a}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <CloseBlock title="Give yours a name.">
          <PillLink href="https://app.getmin.ai">Connect your repos</PillLink>
        </CloseBlock>
      </PageFrame>
    </>
  );
};

function PlanCard({ plan }: { plan: Plan }) {
  const hl = plan.highlighted;
  return (
    <div
      className={`flex flex-col rounded-xl border bg-surface p-6 ${
        hl
          ? "border-ink/80 shadow-[0_1px_2px_rgba(12,18,17,0.04),0_16px_40px_-28px_rgba(12,18,17,0.22)]"
          : "border-hair"
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[15.5px] font-semibold tracking-[-0.01em] text-ink">
          {plan.name}
        </h3>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-quiet">
          {plan.who}
        </span>
      </div>

      <div className="mt-5 flex items-baseline gap-1.5">
        <span className="font-display text-[2.4rem] font-semibold leading-none tracking-[-0.03em] tabular-nums text-ink">
          {plan.price.display}
        </span>
        {plan.price.sub && (
          <span className="text-[12.5px] leading-tight text-quiet">
            {plan.price.sub}
          </span>
        )}
      </div>

      {plan.inheritFrom && (
        <p className="mt-5 text-[12.5px] text-quiet">
          Everything in {plan.inheritFrom}, plus
        </p>
      )}

      <ul className={`flex-1 space-y-2.5 ${plan.inheritFrom ? "mt-3" : "mt-6"}`}>
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[13.5px]">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-moss" strokeWidth={2.5} />
            <span className="leading-[1.5] text-quiet">{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7">
        <a
          href={plan.cta.href}
          className={`inline-flex w-full items-center justify-center rounded-full px-5 py-2.5 text-[14px] font-medium transition-colors active:scale-[0.98] ${
            hl
              ? "bg-ink text-onink hover:bg-ink/90"
              : "border border-hair text-ink hover:border-quiet/40"
          }`}
        >
          {plan.cta.label}
        </a>
      </div>
    </div>
  );
}

export default Pricing;
