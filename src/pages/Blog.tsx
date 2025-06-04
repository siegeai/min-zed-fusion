import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogPosts = [
    {
      id: "the-anti-crm-why-founders-hate-tools-that-scale",
      title: "The Anti-CRM: Why Founders Hate Tools That \"Scale\"",
      excerpt: "CRMs turn people into numbers. The anti-CRM does the opposite: It turns noise into context, threads into stories, and strangers into advocates.",
      date: "2024-05-04",
      readTime: "7 min read",
      image: "/lovable-uploads/42c901df-63ae-4a1a-8932-f1a19e666918.png"
    },
    {
      id: "the-unscalable-secret-of-fan-level-communication",
      title: "The Unscalable Secret of Fan-Level Communication",
      excerpt: "Some startups scale through brute force. Others win because people genuinely like talking to them.",
      date: "2025-04-15",
      readTime: "6 min read",
      image: "/lovable-uploads/689c31a2-2be9-46c2-8737-5a263b5b9ef4.png"
    },
    {
      id: "why-email-still-runs-the-world",
      title: "Why Email Still Runs the World",
      excerpt: "People love saying email is broken. But if email is broken, why does every serious conversation still start there? It's not broken. It's overloaded.",
      date: "2025-03-28",
      readTime: "8 min read",
      image: "/lovable-uploads/b024d1aa-d530-4714-848b-ec33ce842c25.png"
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "min. Blog - Insights on AI, Startups, and Team Collaboration",
    "description": "Insights on AI, startups, and the future of lean team collaboration from the min. team.",
    "url": "https://getmin.ai/blog",
    "publisher": {
      "@type": "Organization",
      "name": "min.",
      "url": "https://getmin.ai"
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "url": `https://getmin.ai/blog/${post.id}`,
      "datePublished": post.date,
      "author": {
        "@type": "Organization",
        "name": "min."
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>min. Blog | Insights on AI, Startups, and Team Collaboration</title>
        <meta name="description" content="Insights on AI, startups, and the future of lean team collaboration from the min. team. Learn about email automation, external communication, and building better teams." />
        <meta name="keywords" content="AI insights, startup blog, team collaboration, email automation, external communication, min blog" />
        <link rel="canonical" href="https://getmin.ai/blog" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* ... keep existing code (background layers) */}
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
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6 leading-tight">
                  The min. <span className="text-green-600/90">Blog</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
                  Insights on AI, startups, and the future of lean team collaboration.
                </p>
              </div>

              {/* Blog posts */}
              <div className="grid gap-8 mb-12">
                {blogPosts.map((post) => (
                  <article key={post.id}>
                    <Card className="bg-white/80 backdrop-blur-sm border-green-100/60 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="h-64 md:h-80 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <Calendar className="w-4 h-4" />
                          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        
                        <CardTitle className="text-2xl md:text-3xl font-medium text-gray-900 leading-tight">
                          <h2>{post.title}</h2>
                        </CardTitle>
                        
                        <CardDescription className="text-lg text-gray-600 leading-relaxed">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent>
                        <Link to={`/blog/${post.id}`}>
                          <Button className="bg-green-600 hover:bg-green-700 text-white font-normal">
                            Read Article
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </article>
                ))}
              </div>

              <div className="text-center">
                <Button variant="outline" className="border-green-200/50 hover:bg-green-50/50 font-normal">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Read more posts
                </Button>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Blog;
