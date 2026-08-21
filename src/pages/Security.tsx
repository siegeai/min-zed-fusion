import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  PageFrame,
  PageHero,
  Section,
  LeadList,
  Prose,
  Rows,
  CloseBlock,
  PillLink,
  CONTACT_LABEL,
  contactHref,
} from "@/components/page/Kit";

/**
 * Security, rebuilt in the home page's language.
 *
 * Every factual claim on this page is carried over verbatim. Only the
 * presentation changed, deliberately: compliance copy is the one place where
 * rewording is a liability, because a reviewer will hold the company to the
 * exact wording.
 *
 * What did change is how the ESOF rating was shown. It used to be a card with
 * a five star row and a "TOP 1%" tag, which is consumer-review furniture on a
 * page read by people doing procurement. The number is the evidence; stars
 * make it look like an app store listing.
 *
 * The six eyebrows are gone, the three up icon card grids are gone, and the
 * fourteen centred blocks now rag left like the rest of the site.
 */

const FOUNDATIONS: [string, string][] = [
  ["TLS 1.3 in transit.", "Industry standard encryption on every byte that moves."],
  ["SOC 2 Type II hosting.", "All infrastructure providers maintain SOC 2 Type II compliance."],
  ["Privacy first architecture.", "Built to align with GDPR, CCPA, and modern privacy regulations."],
  ["Zero training, ever.", "Your data is yours. We never train models on it, and neither do our providers."],
  ["Enterprise infrastructure.", "99.9% uptime SLA, multi region redundancy, automated failover."],
  ["Access controls.", "MFA, role based permissions, and least privilege everywhere."],
];

const PLEDGES: [string, string][] = [
  ["Never sold.", "Not to advertisers, not to data brokers, not to anyone."],
  ["Never brokered.", "We do not share, license, or expose your data to third parties."],
  ["Never trained on.", "Your data never enters a model's training set, ours or any provider's."],
];

const CERTS = [
  "SOC 2 Type II",
  "Google CASA Tier 2",
  "GDPR compliant",
  "CCPA compliant",
  "ISO 27001",
  "PCI DSS Level 1",
  "HIPAA ready",
];

const PARTNERS: [string, string][] = [
  ["Microsoft Partner.", "Verified Microsoft Partner. Secure integration with Microsoft 365 and Azure."],
  ["Google CASA Tier 2.", "Assessed against Google's Cloud Application Security Assessment."],
];

export default function Security() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Security at min. | Your context, protected</title>
        <meta
          name="description"
          content="9.7 ESOF score, SOC 2 Type II infrastructure, zero training on your data. min. keeps a distilled memory of your meetings and mail, never a copy of your mailbox, and guards it as the foundation, not the afterthought."
        />
        <link rel="canonical" href="https://getmin.ai/security/" />
      </Helmet>

      <PageFrame>
        <PageHero
          title="Your context, protected."
          lede="min. keeps a distilled memory of your meetings and mail, never a copy of your mailbox. Built by engineers who shipped infrastructure at DoorDash, Coursera, and Sunnybrook Research Hospital, and guarded from the foundation up."
        >
          {/* The rating as evidence, not as an app-store badge. */}
          <div className="flex items-baseline gap-3">
            <span className="font-display text-[2.4rem] font-semibold leading-none tracking-[-0.03em] tabular-nums text-ink">
              9.7
            </span>
            <span className="text-[14.5px] leading-[1.5] text-quiet">
              ESOF score, the Enterprise Security
              <br className="hidden sm:block" /> Operations Framework rating.
            </span>
          </div>
        </PageHero>

        <Section title="What we actually keep.">
          <Prose>
            <p>
              min. keeps distilled memory and metadata, never your raw mail.
              Message bodies are not stored. What survives is the shape of the
              work: who you met, what was decided, what was promised, and when
              it is due.
            </p>
          </Prose>
        </Section>

        <Section title="Our data pledge.">
          <LeadList items={PLEDGES} />
        </Section>

        <Section title="Foundations.">
          <LeadList items={FOUNDATIONS} />
        </Section>

        <Section title="Compliance and partners.">
          <LeadList items={PARTNERS} />
          <div className="mt-8">
            <Rows items={CERTS} />
          </div>
          <p className="mt-6 text-[14.5px] leading-[1.7] text-quiet [text-wrap:pretty]">
            Running a vendor review and need something specific in writing?{" "}
            <a
              href={contactHref("Security review")}
              className="text-ink underline decoration-hair decoration-1 underline-offset-[5px] transition-colors hover:decoration-moss"
            >
              Ask us
            </a>{" "}
            and a person will answer.
          </p>
        </Section>

        <CloseBlock title="Questions a doc cannot answer.">
          <PillLink href={contactHref("Security review")}>{CONTACT_LABEL}</PillLink>
        </CloseBlock>
      </PageFrame>
    </>
  );
}
