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
    price: { display: "$0", sub: "no card" },
    features: [
      "The best coding models, not a cut-down one",
      "The whole loop: min. plans, writes the code, and opens the PR",
      "Generous monthly limits",
      "Every repo you connect",
    ],
    cta: { label: "Start free", href: "https://app.getmin.ai" },
  },
  {
    name: "Pro",
    who: "For one engineer",
    price: { display: "$20", sub: "/ month" },
    inheritFrom: "Free",
    features: [
      "Much higher limits",
      "$20 of model usage included each month",
      "Pick the model yourself, or let min. choose",
      "Priority queue when it is busy",
    ],
    cta: { label: "Start free", href: APP_URL },
    highlighted: true,
  },
  {
    name: "Teams",
    who: "For your engineers",
    price: { display: "$40", sub: "/ engineer / mo" },
    inheritFrom: "Pro",
    features: [
      "Product, sales and support seats are free",
      "Shared context across every repo in a project",
      "Guests: propose changes as PRs without write access",
      "Roles, admin, and centralised billing",
    ],
    cta: { label: "Start free", href: APP_URL },
  },
  {
    name: "Enterprise",
    who: "For your company",
    price: { display: "Custom", sub: "let's talk" },
    inheritFrom: "Teams",
    features: [
      "SSO, SAML, and SCIM",
      "SOC 2 Type II and data residency",
      "Bring your own database, graph, and vector store",
      "Dedicated onboarding and SLA",
    ],
    cta: { label: CONTACT_LABEL, href: contactHref("min. Enterprise plan") },
  },
];

const FAQS: [string, string][] = [
  [
    "Do I have to pay to try it?",
    "No. You can try min. with the best coding models on the free plan, and the limits are generous. You do need an account, but not a card.",
  ],
  [
    "What happens when I hit the limit?",
    "min. stops and tells you. Nothing is deleted and no card is charged. You can wait for the month to roll over or move to Pro.",
  ],
  [
    "Why are product, sales and support seats free?",
    "Because they are the point. min. is worth having when anyone can hand it a problem, and charging a full engineering seat for someone who files two bugs a month would stop that happening. You pay for the engineers.",
  ],
  [
    "Can it merge its own pull requests?",
    "No. min. works in its own sandbox and opens a pull request for review. Nothing reaches your main branch that a person did not merge, and write access stays with membership.",
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
          content="min. is free to start, with the best coding models and generous limits. Pro is $20 a month, Teams is $40 per engineer, and product, sales and support seats are free."
        />
        <link rel="canonical" href="https://getmin.ai/pricing/" />
      </Helmet>

      <PageFrame>
        <PageHero
          title="Start free."
          lede="The best coding models and the whole loop on the free plan, with generous limits. You pay when you outgrow them."
        />

        <Section wide>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 min-[1400px]:grid-cols-4">
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
          <PillLink href="https://app.getmin.ai">Start free</PillLink>
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
      <div>
          <h3 className="text-[15.5px] font-semibold tracking-[-0.01em] text-ink">
            {plan.name}
          </h3>
          <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-quiet">
            {plan.who}
          </p>
        </div>

      <div className="mt-5">
          <span
            className={`block font-display font-semibold leading-none tracking-[-0.03em] tabular-nums text-ink ${
              plan.price.display.startsWith("$") ? "text-[2.4rem]" : "text-[1.9rem]"
            }`}
          >
            {plan.price.display}
          </span>
          {plan.price.sub && (
            <span className="mt-1.5 block text-[12.5px] leading-tight text-quiet">
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
