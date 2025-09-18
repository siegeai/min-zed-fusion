import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPostHeader from "@/components/BlogPostHeader";
import CRMvsFounderTracker from "@/components/CRMvsFounderTracker";
import InboxToSystemFlow from "@/components/InboxToSystemFlow";
import SimplicityvsBureaucracy from "@/components/SimplicityvsBureaucracy";
import { Heart } from "lucide-react";
import { useEffect } from "react";

const BlogPostAntiCRM = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const post = {
    title: "The Anti-CRM: Why Founders Hate Tools That \"Scale\"",
    excerpt: "CRMs turn people into numbers. The anti-CRM does the opposite: It turns noise into context, threads into stories, and strangers into advocates.",
    date: "2025-05-04",
    readTime: "7 min read",
    image: "/lovable-uploads/42c901df-63ae-4a1a-8932-f1a19e666918.png"
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-white to-blue-50/20"></div>
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)
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

            <article className="bg-white/80 backdrop-blur-sm rounded-lg border border-purple-100/60 shadow-lg overflow-hidden mb-12">
              <div className="p-8">
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8">
                  <p className="text-xl font-light mb-6">{post.excerpt}</p>
                  
                  <div className="space-y-6">
                    <p>There's a moment every founder hits.</p>
                    <p>You open your inbox and think: <em>"We need a system."</em></p>
                    
                    <p>So you go looking. People recommend CRMs. You try one. Maybe two. You add your contacts, deals, notes. It feels like progress.</p>
                    
                    <div className="bg-red-50/50 rounded-xl p-6 border border-red-100">
                      <p className="text-red-900 font-medium">But a week later, you're back in Gmail.</p>
                      <p className="text-red-800 mt-2">Because that's where the actual conversations are.</p>
                    </div>

                    <h3 className="text-2xl font-medium text-gray-900 mt-12 mb-6">What CRMs Promise vs. What Founders Need</h3>
                    
                    <p>CRMs were designed for sales teams. Pipeline-first. Deal-first. Everything revolves around closing.</p>
                    
                    <p>But most early-stage teams aren't deal-driven. <strong>They're relationship-driven.</strong></p>
                    
                    <p>You're not juggling 50 leads. You're juggling 12 people who matter:</p>
                    
                    <ul className="list-disc pl-6 space-y-2">
                      <li>That early customer giving you honest feedback</li>
                      <li>The investor you met at a dinner</li>
                      <li>A prospect who didn't convert but said "circle back next quarter"</li>
                      <li>Someone applying for a role you're not hiring for — yet</li>
                    </ul>
                    
                    <div className="bg-purple-50/50 rounded-xl p-6 border border-purple-100">
                      <p className="text-purple-900 font-medium">These people don't belong in a sales funnel.</p>
                      <p className="text-purple-800 mt-2">They belong in your head. But your head can't hold all that past the first 50 threads.</p>
                    </div>

                    <CRMvsFounderTracker />

                    <h3 className="text-2xl font-medium text-gray-900 mt-12 mb-6">Why CRMs Feel So Wrong</h3>
                    
                    <p>Here's what actually happens when founders try to use a CRM:</p>
                    
                    <ul className="list-disc pl-6 space-y-2">
                      <li>You log a conversation <em>after</em> it happened</li>
                      <li>You forget to update the deal stage</li>
                      <li>You stop adding new people because it's annoying</li>
                      <li>Notes go stale</li>
                      <li>You spend more time managing the system than managing the relationship</li>
                    </ul>
                    
                    <div className="bg-orange-50/50 rounded-xl p-6 border border-orange-100">
                      <p className="text-orange-900 font-medium">And deep down, you feel it: <em>This isn't for me.</em></p>
                      <p className="text-orange-800 mt-2">You're not trying to forecast pipeline. You're trying to keep up with people who matter.</p>
                    </div>

                    <h3 className="text-2xl font-medium text-gray-900 mt-12 mb-6">Why Founders Go Back to Email</h3>
                    
                    <p>You fall back to Gmail or Superhuman or Hey — not because they're better, but because they're closer to the truth.</p>
                    
                    <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                      <p className="text-blue-900 text-lg font-medium">The truth is: Relationships don't live in CRMs. They live in inboxes.</p>
                    </div>
                    
                    <p>That's where trust is built. Where people reply. Where things get said that don't fit in a dropdown menu.</p>
                    
                    <p>So the real question isn't "How do we use a CRM?" It's <strong>"How do we scale relationships without losing the plot?"</strong></p>

                    <InboxToSystemFlow />

                    <h3 className="text-2xl font-medium text-gray-900 mt-12 mb-6">What the Anti-CRM Looks Like</h3>
                    
                    <p>We don’t need a new CRM. We need a system that turns email into <strong>action</strong> — without making you leave the inbox.</p>
                                        
                    <p>It should:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Live in your inbox</li>
                      <li>Group emails by person, not thread</li>
                      <li>Track open loops and replies</li>
                      <li>Give you a summary at a glance</li>
                      <li>Let you delegate and follow up</li>
                      <li>Draft replies that sound like you</li>
                      <li>Remember the story, not just the stats</li>
                    </ul>
                    
                    <div className="bg-green-50/50 rounded-xl p-6 border border-green-100">
                      <p className="text-green-900 font-medium">In short: it should help you care — not just close.</p>
                    </div>

                    <SimplicityvsBureaucracy />

                    <h3 className="text-2xl font-medium text-gray-900 mt-12 mb-6">Why This Matters Now</h3>
                    
                    <p>Founders aren't managing sales. They're managing relationships: Customers. Candidates. Investors. Advisors. Vendors. Press. Fans.</p>
                    
                    <div className="bg-teal-50/50 rounded-xl p-6 border border-teal-100">
                      <p className="text-teal-900 font-medium">And relationships don't scale through "tools."</p>
                      <p className="text-teal-800 mt-2">They scale through clarity.</p>
                    </div>
                    
                    <p>A system that actually helps you follow through. That's what lets you grow without growing cold.</p>

                    <h3 className="text-2xl font-medium text-gray-900 mt-12 mb-6">Final Thought</h3>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 border border-purple-200/50 text-center">
                      <Heart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                      <p className="text-xl font-medium text-gray-900 mb-4">CRMs turn people into numbers.</p>
                      <p className="text-lg text-gray-700 mb-4">The anti-CRM does the opposite:</p>
                      <div className="space-y-2 text-gray-700">
                        <p>It turns noise into context.</p>
                        <p>Threads into stories.</p>
                        <p>And strangers into advocates.</p>
                      </div>
                      <p className="text-lg font-medium text-purple-900 mt-6">It's not about scale. It's about keeping the part that made you great in the first place.</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default BlogPostAntiCRM;
