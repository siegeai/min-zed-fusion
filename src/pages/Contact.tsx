import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  PageFrame,
  PageHero,
  Section,
  LeadList,
  CloseBlock,
  PillLink,
  CONTACT_EMAIL,
  CONTACT_LABEL,
  contactHref,
} from "@/components/page/Kit";

/**
 * Contact, rebuilt in the home page's language.
 *
 * The four inquiry types were icon cards in a 2x2; they are four sentences
 * now, which is all they ever said. The reply-time badge stays because it is
 * the one piece of information on the page a visitor actually weighs before
 * writing, but it is a line of text rather than a pill with a status dot.
 */

const INQUIRIES: [string, string][] = [
  ["Sales.", "Ready to bring min. to your team, or you want to see what min. does with your own repos."],
  ["Support.", "Something is not working, or you want more out of min. across your team."],
  ["Partnerships.", "Integrations, agencies, and co-marketing."],
  ["Investors and press.", "Media inquiries and investment conversations."],
];

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact min.</title>
        <meta
          name="description"
          content="min. is an AI engineer on your team. Get in touch for sales, support, partnerships, investors, press. Email hello@getmin.ai, average reply under 2 hours."
        />
        <link rel="canonical" href="https://getmin.ai/contact/" />
      </Helmet>

      <PageFrame>
        <PageHero
          title="Talk to a human."
          lede="Sales, support, partnerships, investors, press. One address, fast replies, no chatbots."
        >
          <div className="flex flex-wrap items-center gap-3">
            <PillLink href={contactHref()}>{CONTACT_LABEL}</PillLink>
            <span className="font-mono text-[13.5px] text-quiet">{CONTACT_EMAIL}</span>
          </div>
          <p className="mt-4 text-[14.5px] leading-[1.7] text-quiet">
            Average reply under <span className="text-ink">2 hours</span>.
          </p>
        </PageHero>

        <Section title="What to reach out about.">
          <LeadList items={INQUIRIES} />
        </Section>

        <CloseBlock title="One address reaches all of it.">
          <PillLink href={contactHref()}>{CONTACT_LABEL}</PillLink>
        </CloseBlock>
      </PageFrame>
    </>
  );
}
