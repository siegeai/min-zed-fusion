
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogPost = {
    id: "why-email-still-runs-the-world",
    title: "Why Email Still Runs the World",
    excerpt: "People love saying email is broken. But if email is broken, why does every serious conversation still start there? It's not broken. It's overloaded.",
    date: "2024-06-03",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop"
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
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6 leading-tight">
                The min. <span className="text-green-600/90">Blog</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
                Insights on AI, communication, and the future of lean team collaboration.
              </p>
            </div>

            {/* Blog post card */}
            <div className="grid gap-8 mb-12">
              <Card className="bg-white/80 backdrop-blur-sm border-green-100/60 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-64 md:h-80 overflow-hidden">
                  <img 
                    src={blogPost.image} 
                    alt={blogPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(blogPost.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{blogPost.readTime}</span>
                  </div>
                  
                  <CardTitle className="text-2xl md:text-3xl font-medium text-gray-900 leading-tight">
                    {blogPost.title}
                  </CardTitle>
                  
                  <CardDescription className="text-lg text-gray-600 leading-relaxed">
                    {blogPost.excerpt}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Link to={`/blog/${blogPost.id}`}>
                    <Button className="bg-green-600 hover:bg-green-700 text-white font-normal">
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
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
  );
};

export default Blog;
