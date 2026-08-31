/**
 * The blog, as data.
 *
 * One module is the source of truth for the index page, the post page, the
 * landing-page preview, the sitemap and the prerender step. Adding a post here
 * is the whole job.
 *
 * IMPORTANT: scripts/prerender.mjs reads this file to emit a real HTML file per
 * post. Without that, GitHub Pages answers 404 for every post URL and Google
 * will not index any of them. See worker/../scripts/prerender.mjs.
 */

export type Block =
  | { t: "p"; text: string }
  /** A dated editor's note. For a post whose framing the product has moved past. */
  | { t: "note"; text: string }
  | { t: "h2"; text: string }
  | { t: "quote"; text: string }
  | { t: "cta"; text: string; href: string };

export type Post = {
  slug: string;
  title: string;
  /** Meta description and card excerpt. Keep under ~160 characters. */
  excerpt: string;
  /** ISO date, used for article:published_time and sorting. */
  date: string;
  readTime: string;
  /** Sub-headline shown under the title on the post page. */
  standfirst: string;
  body: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "worlds-first-relationship-ai",
    title: "World’s first relationship AI that helps you win.",
    excerpt:
      "Written in August 2026, when min. launched on Product Hunt as relationship AI. Kept as a record of what we thought then, not of what min. is now.",
    date: "2026-08-13",
    readTime: "3 min read",
    standfirst:
      "We launched on Product Hunt today. Big claims deserve a defense, so here is the case for both halves of this one.",
    body: [
      {
        t: "note",
        text:
          "Written in August 2026, when min. was positioned as relationship AI and launching on Product Hunt. min. is now an AI engineer that holds your codebase and turns requests into pull requests your team reviews. This post is kept as a record of what we thought at the time, not as a description of the product.",
      },
      { t: "p", text: "min. is live on Product Hunt today." },
      {
        t: "cta",
        text: "See the launch on Product Hunt",
        href: "https://www.producthunt.com/products/min-4?launch=min-5",
      },
      {
        t: "p",
        text: "The title of this post is a big claim, and I know what comment sections do to big claims. So let me defend it, because the obvious objection is that software about your work relationships already exists. It does. And none of it is this.",
      },

      { t: "h2", text: "What everything before this actually remembers" },
      {
        t: "p",
        text: "Notetakers remember the meeting. One at a time, in isolation. The transcript from Tuesday knows nothing about the promise from March.",
      },
      {
        t: "p",
        text: "CRMs remember what someone typed into them. They are databases of self-reported homework, and they never tell you what to do next.",
      },
      {
        t: "p",
        text: "Personal CRMs came closest, and they stayed small for a decade because the technology could not reach the substance. They knew that you emailed Sarah 47 days ago. They could never know what you promised her. Metadata, not memory.",
      },
      {
        t: "p",
        text: "And the new wave of memory apps remembers you. Your screen, your day, your notes to self. Useful, but the hard part of working with people is not remembering yourself.",
      },

      { t: "h2", text: "The atom is the other person" },
      {
        t: "p",
        text: "Relationship AI organizes around a different unit: the person on the other side of the table. min. reads your meetings and emails with someone and builds a digital version of them. Where you stand, what was promised in both directions, the whole history, distilled into one AI you can ask anything.",
      },
      {
        t: "p",
        text: "Built only from your meetings and emails with them. Nothing scraped, nothing inferred about strangers. If it never passed between you, min. does not know it.",
      },
      {
        t: "p",
        text: "And it compounds. The more you work with someone, the sharper their digital version gets. That is the thing nobody built before, which is why the title says first. Not the first tool near your relationships. The first one whose entire job is the relationship itself.",
      },

      { t: "h2", text: "Why “helps you win”" },
      {
        t: "p",
        text: "Because relationships decide outcomes. The callback, the deal, the promotion, every one of them is decided by people, and the person with the sharpest context wins. Your tools remember meetings and threads. min. remembers the people, then puts what it knows to work: the prep before the call, the follow up that lands on what they actually said, the nudge on what is owed.",
      },
      {
        t: "p",
        text: "It is free, it sets up in two minutes, and no bot ever joins your calls.",
      },
      {
        t: "cta",
        text: "Come say hi on the launch",
        href: "https://www.producthunt.com/products/min-4?launch=min-5",
      },
      {
        t: "p",
        text: "We are answering questions there all day. Come tell us what you think, especially if you think we are wrong. That is the feedback that makes the digital versions sharper. It works on us too.",
      },
    ],
  },
  {
    slug: "building-stopped-being-the-hard-part",
    title: "Building stopped being the hard part",
    excerpt:
      "When anyone can ship a feature in a day, \"can we build it\" stops filtering your roadmap. Customer context is the only asset left that does not transfer.",
    date: "2026-08-13",
    readTime: "3 min read",
    standfirst:
      "Product cycles are collapsing to zero. Context compounds. Only one of those is a moat.",
    body: [
      { t: "p", text: "I built our notetaker in a day." },
      {
        t: "p",
        text: "Not a prototype. The real one, the thing that sits on every call. I did not want to pay for Granola, I did not want to work through the integrations, so I just built it. A day.",
      },
      {
        t: "p",
        text: "That should unsettle you a little. Because if I can do that in a day, so can whoever is building against you. The recipe is not the moat. The roadmap is not the moat. Someone asked me straight once whether we were worried about being copied, and the honest answer is: sure, you can copy it. I ship features in a day. So does everyone else now.",
      },
      {
        t: "p",
        text: "A few weeks ago I was on a call with one of our first real users. She pitched a feature. Good idea, obviously useful. And I caught myself saying out loud:",
      },
      { t: "quote", text: "It's like three prompts, I could build it. But should I?" },
      { t: "p", text: "That's the whole shift, in one sentence." },

      { t: "h2", text: "\"Can we build it\" used to do real work" },
      {
        t: "p",
        text: "It filtered your roadmap for you. Half the ideas died on feasibility and you never had to have the hard conversation. That filter is gone. What is left is should we, and nothing in your codebase answers that question.",
      },
      {
        t: "p",
        text: "Your metrics do not answer it either. Metrics tell you what people did, not what they were trying to do. They are a record of the paths you already built.",
      },
      {
        t: "p",
        text: "The only thing that answers should we is context. Who asked. What they were actually trying to fix. What they said on a call three weeks ago that quietly contradicts what they wrote in the ticket. Whether the person asking is the person who decides.",
      },

      { t: "h2", text: "Context is the one asset that does not transfer" },
      {
        t: "p",
        text: "Someone can clone your product in a weekend. They cannot clone two hundred calls with your customers.",
      },
      {
        t: "p",
        text: "They cannot clone the offhand thing your anchor customer said in month four that reframed the entire roadmap. When I say this product took years, I do not mean the code took years. The code took a day. The judgment took years, and the judgment came out of the conversations.",
      },
      {
        t: "p",
        text: "That is the asymmetry. Build cost is collapsing toward zero for everyone at the same time. Context accumulates for exactly one of you.",
      },

      { t: "h2", text: "So where does yours actually live?" },
      {
        t: "p",
        text: "Mine used to live in five places. Some in email. Some in calls nobody ever rewatched. Some in a doc from last quarter. Most of it in my head, and some in my co-founder's head, and those two copies did not match.",
      },
      {
        t: "p",
        text: "That is not a memory problem. That is a moat problem. You are sitting on the one asset that cannot be copied and storing it in the least durable medium available: busy people.",
      },

      { t: "h2", text: "The part I think most people are missing" },
      {
        t: "p",
        text: "When your context is connected somewhere, you stop switching.",
      },
      {
        t: "p",
        text: "I go where my code is connected to write code. I would go where my customers are connected to ask about customers. Nobody re-onboards their entire working memory every week to try the new thing, no matter how good the demo is. Stickiness stopped coming from features, because features are free now. It comes from where the context sits.",
      },
      {
        t: "p",
        text: "Product cycles are collapsing to zero. Context compounds. Pick the one that compounds.",
      },
    ],
  },
];

export const postBySlug = (slug: string) => POSTS.find((p) => p.slug === slug);

/** Newest first. */
export const sortedPosts = () =>
  [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
