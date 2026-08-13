import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { sortedPosts, formatDate } from "@/content/posts";
import { FadeIn } from "@/components/vision/FadeIn";

/**
 * The newest post, previewed on the landing page.
 *
 * Deliberately one card rather than a grid: with a handful of posts a grid
 * looks empty, and the point here is to give the strongest piece a door rather
 * than to render an archive. The index at /blog is the archive.
 */
export default function LatestWriting() {
  const [post] = sortedPosts();
  if (!post) return null;

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <div className="flex items-end justify-between gap-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
              From the blog
            </p>
            <Link
              to="/blog"
              className="text-[13.5px] font-medium text-gray-400 transition-colors hover:text-gray-900"
            >
              All posts
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <Link
            to={`/blog/${post.slug}`}
            className="group mt-5 block rounded-[22px] border border-gray-200/80 bg-white p-7 shadow-[0_16px_60px_-24px_rgba(0,0,0,0.16)] transition-all hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-[0_22px_70px_-24px_rgba(16,185,129,0.24)] sm:p-9"
          >
            <div className="flex items-center gap-3 text-[12.5px] text-gray-400">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
            </div>

            <h3 className="mt-2.5 font-display text-[26px] font-semibold leading-tight tracking-[-0.02em] text-gray-900 sm:text-[30px]">
              {post.title}
            </h3>

            <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-gray-600">
              {post.standfirst}
            </p>

            <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-emerald-700">
              Read it
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </span>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
