
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Blog post data (in a real app, this would come from an API or CMS)
  const blogPosts = {
    "why-email-still-runs-the-world": {
      title: "Why Email Still Runs the World",
      content: `
        <p>People love saying email is broken. But if email is broken, why does every serious conversation still start there? It's not broken. It's overloaded.</p>
        
        <p>Think about your inbox right now. Customer complaints mixed with sales leads. Bug reports next to investor updates. Job applications buried under spam. It's like that kitchen drawer where you throw everything - batteries, rubber bands, takeout menus, mystery keys. You know exactly what I'm talking about.</p>

        <h2>The Kitchen Drawer Problem</h2>
        <p>Every startup founder knows this pain. You're wearing 47 different hats, and every email could be the difference between success and failure. But here's the thing - you can't tell which is which until you open it.</p>

        <p>Big companies solve this with people. They hire specialists to sort through everything. Customer success teams for support emails. Sales teams for leads. HR for applications. But when you're bootstrapping? That person is you.</p>

        <h2>What If Every Email Came Pre-Labeled?</h2>
        <p>Imagine if every email that hit your inbox already knew what it was. Customer issues automatically categorized by urgency. Sales leads scored and tracked. Bug reports routed to the right person. Investor emails flagged for priority.</p>

        <p>That's not magic. That's just AI doing what it does best - pattern recognition at scale.</p>

        <h2>The Future Is Already Here</h2>
        <p>We're building tools that don't replace email - they make it work the way it should have from the beginning. Smart, organized, and focused on what matters most to your business.</p>

        <p>Because the problem was never email itself. The problem was trying to drink from a fire hose without knowing what's water and what's gasoline.</p>
      `,
      date: "2024-06-03",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop"
    }
  };

  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-medium text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-lg text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link to="/blog">
              <Button variant="outline" className="border-green-200/50 hover:bg-green-50/50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
            {/* Back button */}
            <div className="mb-8">
              <Link to="/blog">
                <Button variant="ghost" className="hover:bg-green-50/50">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
            </div>

            {/* Hero image */}
            <div className="h-64 md:h-96 overflow-hidden rounded-xl mb-8">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article header */}
            <header className="mb-12">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span>•</span>
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-medium text-gray-900 leading-tight">
                {post.title}
              </h1>
            </header>

            {/* Article content */}
            <article className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>

            {/* Back to blog CTA */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <Link to="/blog">
                <Button variant="outline" className="border-green-200/50 hover:bg-green-50/50">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  More Articles
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default BlogPost;
