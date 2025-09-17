
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPostHeader from "@/components/BlogPostHeader";
import BlogPostContent from "@/components/BlogPostContent";
import { useEffect } from "react";

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
  );
};

export default BlogPost;
