
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPostHeader from "@/components/BlogPostHeader";
import BlogPostContent from "@/components/BlogPostContent";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const BlogPost = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const post = {
    title: "Why Email Still Runs the World",
    excerpt: "People love saying email is broken. But if email is broken, why does every serious conversation still start there? It's not broken. It's overloaded.",
    date: "2025-03-28",
    readTime: "5 min read",
    image: "/lovable-uploads/b024d1aa-d530-4714-848b-ec33ce842c25.png"
  };

  return (
    <>
      <Helmet>
        <title>Why Email Still Runs the World | min. Blog</title>
        <meta name="description" content="People love saying email is broken. But if email is broken, why does every serious conversation still start there? It's not broken. It's overloaded. Learn why email remains essential for team communication." />
        <meta name="keywords" content="email management, team communication, shared inbox, collaborative inbox, email automation, business email, external communication, team inbox" />
        <link rel="canonical" href="https://getmin.ai/blog/why-email-still-runs-the-world" />
        
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Why Email Still Runs the World" />
        <meta property="og:description" content="People love saying email is broken. But if email is broken, why does every serious conversation still start there? It's not broken. It's overloaded." />
        <meta property="og:url" content="https://getmin.ai/blog/why-email-still-runs-the-world" />
        <meta property="og:image" content="https://getmin.ai/lovable-uploads/b024d1aa-d530-4714-848b-ec33ce842c25.png" />
        <meta property="article:published_time" content="2025-03-28" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Why Email Still Runs the World" />
        <meta name="twitter:description" content="People love saying email is broken. But if email is broken, why does every serious conversation still start there?" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Why Email Still Runs the World",
            "description": "People love saying email is broken. But if email is broken, why does every serious conversation still start there? It's not broken. It's overloaded.",
            "image": "https://getmin.ai/lovable-uploads/b024d1aa-d530-4714-848b-ec33ce842c25.png",
            "datePublished": "2025-03-28",
            "author": {
              "@type": "Organization",
              "name": "min.",
              "url": "https://getmin.ai"
            },
            "publisher": {
              "@type": "Organization",
              "name": "min.",
              "logo": {
                "@type": "ImageObject",
                "url": "https://app.getmin.ai/lovable-uploads/7a37e7bc-ff2e-4686-ab5e-b539c538ad30.png"
              }
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-white to-green-50/20"></div>
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
        </div>

        <div className="relative z-10">
        <Header />
        
        <main className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-6">
            <BlogPostHeader
              title={post.title}
              date={post.date}
              readTime={post.readTime}
              image={post.image}
            />

            <article className="bg-white/80 backdrop-blur-sm rounded-lg border border-green-100/60 shadow-lg overflow-hidden mb-12">
              <div className="p-8">
                <BlogPostContent excerpt={post.excerpt} />
              </div>
            </article>
          </div>
        </main>

        <Footer />
        </div>
      </div>
    </>
  );
};

export default BlogPost;
