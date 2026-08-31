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
      "Connect your repos",
      "Ask it anything about your code",
      "Hand it an issue and get a plan, with the files it would touch",
      "Runs in the cloud, so you can close the laptop",
    ],
    cta: { label: "Connect your repos", href: "https://app.getmin.ai" },
  },
  {
    name: "Pro",
    who: "For your team",
    price: { display: "$20", sub: "/ active teammate / mo" },
    inheritFrom: "Free",
    features: [
      "It writes the code and opens the pull request",
      "One engineer across every repo in a project",
      "Guests: contractors and partners propose changes as PRs",
      "Customers: ask-only, without revealing how the code works",
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
    "Yes. Connecting your repos and asking min. about your code is free, with no card and no time limit. You pay when you want it doing the work: writing the code and opening pull requests across a team.",
  ],
  [
    "What is an active teammate?",
    "Someone min. actually did something for that month. You can invite the whole company without paying for the whole company, and a teammate who sits out a month is not billed for that month.",
  ],
  [
    "How do I start using min.?",
    "Connect your repos, then hand it an issue. It reads the issue, tells you how it lands in your code, and proposes a plan before it writes anything.",
  ],
  [
    "Can it merge its own pull requests?",
    "No. It works in its own sandbox and opens a pull request for review. Nothing reaches your main branch that a person did not merge, and write access stays with membership.",
  ],
  [
    "Do you train on my code?",
    "No. We never train on your data, and neither do our model providers. It is never shared, licensed, or sold.",
  ],
];

const Pricing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Pricing | min., the AI engineer on your team</title>
        <meta
          name="description"
          content="Connect a repo and ask min. anything about your code for free, forever. You pay when it starts opening pull requests for your team."
        />
        <link rel="canonical" href="https://getmin.ai/pricing/" />
      </Helmet>

      <PageFrame>
        <PageHero
          title="Free to use."
          lede="Ask it about your code for free, forever. You pay when it starts opening pull requests for your team."
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

        <CloseBlock title="Hand it the issue.">
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
