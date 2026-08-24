import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PillNav from "@/components/PillNav";
import MinFooter from "@/components/MinFooter";
import { postBySlug, formatDate } from "@/content/posts";


/**
 * One post. Content comes from src/content/posts.ts as typed blocks rather than
 * raw HTML, so nothing in a post can break the page layout and every post gets
 * the same type scale for free.
 */
const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? postBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // An unknown slug is a real 404, not an empty article page.
  if (!post) return <Navigate to="/blog" replace />;

  const url = `https://getmin.ai/blog/${post.slug}/`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    headline: post.title,
    description: post.excerpt,
    url,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: "Eric Wang", url: "https://getmin.ai/about/" },
    publisher: {
      "@type": "Organization",
      name: "min.",
      url: "https://getmin.ai",
      logo: { "@type": "ImageObject", url: "https://getmin.ai/favicon.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: "https://getmin.ai/og-cover.png",
  };

  

  return (
    <>
      <Helmet>
        <title>{`${post.title} | min.`}</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={url} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="Eric Wang" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-paper text-ink font-sans antialiased overflow-x-hidden">
        <PillNav />

        <main className="flex-1">
          <article className="pt-28 md:pt-40 pb-20">
            <div className="max-w-2xl mx-auto px-6">
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-quiet/70 hover:text-ink transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
                All posts
              </Link>

              <header className="mt-7">
                <div className="flex items-center gap-3 text-[12.5px] text-quiet/70">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>
                <h1 className="mt-3 font-display text-ink font-semibold tracking-[-0.025em] leading-[1.1] text-[34px] md:text-[44px]">
                  {post.title}
                </h1>
                <p className="mt-5 text-quiet text-lg leading-relaxed">
                  {post.standfirst}
                </p>
              </header>

              <div className="mt-10 border-t border-hair pt-10">
                {post.body.map((b, i) => {
                  if (b.t === "h2") {
                    return (
                      <h2
                        key={i}
                        className="font-display text-ink text-[24px] md:text-[26px] font-semibold tracking-[-0.02em] mt-12 mb-4"
                      >
                        {b.text}
                      </h2>
                    );
                  }
                  if (b.t === "cta") {
                    return (
                      <a
                        key={i}
                        href={b.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="my-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-onink transition-colors hover:bg-ink/85"
                      >
                        {b.text}
                        <span aria-hidden="true">&rarr;</span>
                      </a>
                    );
                  }
                  if (b.t === "quote") {
                    return (
                      <blockquote
                        key={i}
                        className="my-7 border-l-2 border-moss/25 pl-5 font-display text-[20px] md:text-[22px] leading-snug tracking-[-0.01em] text-ink"
                      >
                        {b.text}
                      </blockquote>
                    );
                  }
                  return (
                    <p key={i} className="text-[17px] leading-[1.75] text-ink/75 mb-5">
                      {b.text}
                    </p>
                  );
                })}
              </div>

              <div className="mt-14 rounded-2xl border border-hair bg-surface px-6 py-6">
                <p className="font-display text-[19px] font-semibold tracking-[-0.01em] text-ink">
                  This is what min. is for.
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-quiet">
                  Every team gets a minion. They sit in your meetings, hold
                    what the team knows, and answer when you ask. Nothing to
                    install, no account.
                </p>
                <Link
                    to="/#name"
                    className="mt-5 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-onink transition-colors hover:bg-ink/85"
                  >
                    Get your minion
                  </Link>
              </div>
            </div>
          </article>
        </main>

        <MinFooter />
      </div>
    </>
  );
};

export default BlogPost;
