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
  | { t: "h2"; text: string }
  | { t: "quote"; text: string };

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
