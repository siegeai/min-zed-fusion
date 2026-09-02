import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  PageFrame,
  PageHero,
  Section,
  Prose,
  CloseBlock,
  PillLink,
  CONTACT_LABEL,
  contactHref,
} from "@/components/page/Kit";

/**
 * About is the founding story, told by the founder, and nothing else.
 *
 * It used to open on category positioning ("an engineer, not an autocomplete")
 * and a beliefs list, which is the marketing site's job and the marketing site
 * does it better. What only THIS page can say is why min. exists: Eric was the
 * only one who could code, so Eric was the queue. The beliefs section went;
 * anything it said that mattered is one clause in the story now.
 *
 * Voice: the rest of the site speaks as min. This page deliberately does not.
 * A founding story told by the product about its own founders would be absurd,
 * so the "I" here is Eric.
 */

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About min.",
    description:
      "Why min. exists: our founder was the only engineer on the team, so every bug and feature waited on him. min. is the AI engineer that lets everyone start the work, while engineers review and merge.",
    url: "https://getmin.ai/about",
    mainEntity: {
      "@type": "Organization",
      name: "min.",
      founder: { "@type": "Person", name: "Eric Wang", jobTitle: "CEO & Co-Founder" },
    },
  };

  return (
    <>
      <Helmet>
        <title>About min. | I was the bottleneck</title>
        <meta
          name="description"
          content="I was the only one who could code, so every bug and feature waited on me. We built min. so anyone on the team can start the work. We ship twice as fast now."
        />
        <link rel="canonical" href="https://getmin.ai/about/" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <PageFrame>
        <PageHero
          title="I was the bottleneck."
          lede="min. exists because of a problem we kept running into building our own products. Here is the whole story."
        />

        <Section title="The story.">
          <Prose>
            <p>
              I was the only one on the team who could code. So every bug,
              every feature request, every "can we just" ended in my queue. My
              teammates could see exactly what needed fixing, and all they
              could do was wait for me.
            </p>
            <p>
              So we built min.: an AI engineer anyone on the team can hand
              work to. Support files the bug, product describes the feature,
              min. writes the code, and I review the PR.
            </p>
            <p>
              The results were immediate. We ship twice as fast, and the
              product is built by the whole team instead of being the burden
              of whoever can code. The technical people became architects
              and conductors. min. does the grunt work of coding things up!
            </p>
          </Prose>
        </Section>

        <CloseBlock title="Stop being the bottleneck.">
          <div className="flex flex-wrap items-center gap-3">
            <PillLink href="https://app.getmin.ai">Put me to work</PillLink>
            <PillLink href={contactHref("Hello")} tone="quiet">
              {CONTACT_LABEL}
            </PillLink>
          </div>
        </CloseBlock>
      </PageFrame>
    </>
  );
}
