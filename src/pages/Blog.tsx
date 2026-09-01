import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PillNav from "@/components/PillNav";
import MinFooter from "@/components/MinFooter";
import { sortedPosts, formatDate } from "@/content/posts";

/**
 * The blog index. Deliberately small: a header and a list of posts, in the
 * site's own type scale. Post content lives in src/content/posts.ts so this
 * page, the post page, the landing preview and the prerender step all read the
 * same source.
 */
const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const posts = sortedPosts();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://getmin.ai/blog/#blog",
    name: "min. blog",
    description:
      "Notes on relationship context, AI, and building when shipping a feature costs a day.",
    url: "https://getmin.ai/blog/",
    publisher: { "@type": "Organization", name: "min.", url: "https://getmin.ai" },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      url: `https://getmin.ai/blog/${p.slug}/`,
      datePublished: p.date,
      author: { "@type": "Person", name: "Eric Wang" },
    })),
  };

  return (
    <>
      <Helmet>
        <title>Blog | min.</title>
        <meta
          name="description"
          content="Notes on coding agents, codebase context, and building when shipping a feature costs a day. From the team building min."
        />
        <link rel="canonical" href="https://getmin.ai/blog/" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-paper text-ink font-sans antialiased overflow-x-clip">
        <PillNav />

        <main className="flex-1">
          <section className="pt-28 md:pt-40 pb-12">
            <div className="max-w-3xl mx-auto px-6">
              <p className="text-[11px] tracking-[0.2em] uppercase text-quiet/70 mb-5">
                Blog
              </p>
              <h1 className="font-display text-ink font-semibold tracking-[-0.025em] leading-[1.08] text-4xl md:text-5xl">
                Notes from building min.
              </h1>
              <p className="mt-6 text-quiet text-base md:text-lg leading-relaxed max-w-xl">
                Relationship context, AI, and what is left to compete on when
                shipping a feature costs a day.
              </p>
            </div>
          </section>

          <section className="pb-24">
            <div className="max-w-3xl mx-auto px-6">
              <ul className="divide-y divide-hair border-t border-hair">
                {posts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      to={`/blog/${p.slug}`}
                      className="group block py-8 transition-colors"
                    >
                      <div className="flex items-center gap-3 text-[12.5px] text-quiet/70">
                        <time dateTime={p.date}>{formatDate(p.date)}</time>
                        <span aria-hidden="true">·</span>
                        <span>{p.readTime}</span>
                      </div>
                      <h2 className="mt-2 font-display text-[22px] md:text-[26px] font-semibold tracking-[-0.02em] text-ink group-hover:text-moss transition-colors">
                        {p.title}
                      </h2>
                      <p className="mt-2.5 text-[15px] leading-relaxed text-quiet max-w-2xl">
                        {p.excerpt}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-moss">
                        Read
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                          strokeWidth={2}
                        />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>

        <MinFooter />
      </div>
    </>
  );
};

export default Blog;
