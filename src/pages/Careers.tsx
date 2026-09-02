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
  CONTACT_EMAIL,
  CONTACT_LABEL,
  contactHref,
} from "@/components/page/Kit";

/**
 * Careers, rebuilt in the home page's language.
 *
 * Gone: the centred column, the "CAREERS" and "WHO WE'RE LOOKING FOR"
 * eyebrows, the four icon cards in a 2x2, and the boxed email panel. Also
 * gone is the second CTA: the page ended with "Start the conversation" after
 * opening with "Email us", which is two labels for one action.
 */

const TRAITS: [string, string][] = [
  ["Builders.", "You would rather ship a prototype than write a doc about it."],
  ["Thinkers.", "You see the shape in a pile of scattered threads, calls, and half-kept promises."],
  ["Operators.", "You have felt the dropped follow up, and the meeting you walked into cold."],
  ["Collaborators.", "You give honest feedback and take it the same way."],
];

const BENEFITS = [
  "Competitive salary and meaningful equity",
  "Health, dental, and vision",
  "Flexible PTO and parental leave",
  "Remote first, optional LA office",
  "Annual learning budget",
  "Whatever hardware you need",
];

export default function Careers() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Careers at min. | Build the AI engineer in your repos</title>
        <meta
          name="description"
          content="Help us build the AI engineer that knows a team's codebase, plans a change, and opens the pull request. Email hello@getmin.ai with what you've built. No traditional postings."
        />
        <link rel="canonical" href="https://getmin.ai/careers/" />
      </Helmet>

      <PageFrame>
        <PageHero
          title="Build the engineer who lives in every repo."
          lede="No job postings. No five round interviews. Email us what you have built and what you want to build next."
        >
          <div className="flex flex-wrap items-center gap-3">
            <PillLink href={contactHref("Careers")}>{CONTACT_LABEL}</PillLink>
            <span className="font-mono text-[13.5px] text-quiet">{CONTACT_EMAIL}</span>
          </div>
        </PageHero>

        <Section title="Email is the application.">
          <Prose>
            <p>
              Send a resume or a link to something you are proud of, and tell us
              why you want to build the teammate that takes the small work off
              everyone's plate. We write back.
            </p>
          </Prose>
        </Section>

        <Section title="Who we are looking for.">
          <LeadList items={TRAITS} />
        </Section>

        <Section title="How we work.">
          <Prose>
            <p>
              We ship fast, talk to teams every week, and use min. on our own
              calendars and email every day. Small team, big surface area, real
              problems.
            </p>
          </Prose>
          <div className="mt-8">
            <Rows items={BENEFITS} />
          </div>
        </Section>

        <CloseBlock title="Do not overthink it.">
          <PillLink href={contactHref("Careers")}>{CONTACT_LABEL}</PillLink>
        </CloseBlock>
      </PageFrame>
    </>
  );
}
