import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, ArrowRight, Mail, Users, TrendingUp, Clock, MessageSquare, ArrowLeft, BarChart3, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const BlogPostFanLevel = () => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Animation sequence for the growth chart
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 3);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const GrowthChart = () => {
    const emailData = [
      { day: 1, emails: 5, responseTime: 1, headcount: 1 },
      { day: 30, emails: 25, responseTime: 2, headcount: 1 },
      { day: 60, emails: 75, responseTime: 8, headcount: 2 },
      { day: 90, emails: 150, responseTime: 24, headcount: 3 },
      { day: 120, emails: 300, responseTime: 48, headcount: 5 }
    ];

    return (
      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 border border-orange-200/50">
        <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">What Happens When Inbound Spikes</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Emails Chart */}
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">Emails</span>
            </div>
            <div className="space-y-2">
              {emailData.map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-8">D{point.day}</span>
                  <div 
                    className="h-2 bg-blue-500 rounded transition-all duration-1000"
                    style={{ 
                      width: `${(point.emails / 300) * 100}%`,
                      opacity: animationStep >= 1 ? 1 : 0.3
                    }}
                  ></div>
                  <span className="text-xs text-gray-700">{point.emails}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Response Time Chart */}
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-gray-900">Response Time</span>
            </div>
            <div className="space-y-2">
              {emailData.map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-8">D{point.day}</span>
                  <div 
                    className="h-2 bg-orange-500 rounded transition-all duration-1000"
                    style={{ 
                      width: `${(point.responseTime / 48) * 100}%`,
                      opacity: animationStep >= 1 ? 1 : 0.3
                    }}
                  ></div>
                  <span className="text-xs text-gray-700">{point.responseTime}h</span>
                </div>
              ))}
            </div>
          </div>

          {/* Headcount Chart */}
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-900">Headcount</span>
            </div>
            <div className="space-y-2">
              {emailData.map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-8">D{point.day}</span>
                  <div 
                    className="h-2 bg-green-500 rounded transition-all duration-1000"
                    style={{ 
                      width: `${(point.headcount / 5) * 100}%`,
                      opacity: animationStep >= 1 ? 1 : 0.3
                    }}
                  ></div>
                  <span className="text-xs text-gray-700">{point.headcount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-orange-700 text-center font-medium">
          Most teams hire to keep up. Few fix the system.
        </p>
      </div>
    );
  };

  const InboxBeforeAfter = () => {
    return (
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 border border-green-200/50">
        <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">Inbox Before and After</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Before */}
          <div className="bg-white rounded-lg p-6 border border-red-200">
            <h4 className="font-medium text-red-800 mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Before: Chaos
            </h4>
            
            <div className="space-y-3">
              {[
                { subject: "Urgent: Payment issue", time: "3 days ago", unread: true },
                { subject: "Re: Feature request follow-up", time: "1 week ago", unread: true },
                { subject: "Bug report - login broken", time: "2 days ago", unread: true },
                { subject: "Investment opportunity", time: "5 days ago", unread: true },
                { subject: "Customer feedback", time: "1 day ago", unread: true }
              ].map((email, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-red-50 rounded border border-red-100">
                  {email.unread && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-900 truncate">{email.subject}</div>
                    <div className="text-xs text-gray-500">{email.time}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <span className="text-sm text-red-600 font-medium">147 unread • No structure • Lost context</span>
            </div>
          </div>

          {/* After */}
          <div className="bg-white rounded-lg p-6 border border-green-200">
            <h4 className="font-medium text-green-800 mb-4 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              After: Organized
            </h4>
            
            <div className="space-y-3">
              {[
                { label: "Support", owner: "Sarah", status: "Draft ready", color: "blue" },
                { label: "Sales", owner: "Mike", status: "Follow-up sent", color: "green" },
                { label: "Bug", owner: "Dev team", status: "In progress", color: "purple" },
                { label: "Partnership", owner: "You", status: "Needs reply", color: "orange" },
                { label: "Feedback", owner: "Product", status: "Categorized", color: "pink" }
              ].map((task, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded border">
                  <div className={`w-3 h-3 rounded-full bg-${task.color}-500`}></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{task.label}</span>
                      <span className="text-xs text-gray-500">→ {task.owner}</span>
                    </div>
                    <div className="text-xs text-gray-600">{task.status}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <span className="text-sm text-green-600 font-medium">All organized • AI-drafted • Full context</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const post = {
    title: "The Unscalable Secret of Fan-Level Communication",
    excerpt: "Some startups scale through brute force. Others win because people genuinely like talking to them.",
    date: "2025-04-15", 
    readTime: "6 min read",
    image: "/lovable-uploads/689c31a2-2be9-46c2-8737-5a263b5b9ef4.png"
  };

  return (
    <>
      <Helmet>
        <title>The Unscalable Secret of Fan-Level Communication | min. Blog</title>
        <meta name="description" content="Some startups scale through brute force. Others win because people genuinely like talking to them. Learn how to maintain fan-level communication with shared inbox tools and team collaboration." />
        <meta name="keywords" content="customer communication, team collaboration, shared inbox, collaborative inbox, startup communication, customer service, email management, fan-level communication, team inbox" />
        <link rel="canonical" href="https://getmin.ai/blog/the-unscalable-secret-of-fan-level-communication" />
        
        <meta property="og:type" content="article" />
        <meta property="og:title" content="The Unscalable Secret of Fan-Level Communication" />
        <meta property="og:description" content="Some startups scale through brute force. Others win because people genuinely like talking to them." />
        <meta property="og:url" content="https://getmin.ai/blog/the-unscalable-secret-of-fan-level-communication" />
        <meta property="og:image" content="https://getmin.ai/lovable-uploads/689c31a2-2be9-46c2-8737-5a263b5b9ef4.png" />
        <meta property="article:published_time" content="2025-04-15" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Unscalable Secret of Fan-Level Communication" />
        <meta name="twitter:description" content="Some startups scale through brute force. Others win because people genuinely like talking to them." />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "The Unscalable Secret of Fan-Level Communication",
            "description": "Some startups scale through brute force. Others win because people genuinely like talking to them.",
            "image": "https://getmin.ai/lovable-uploads/689c31a2-2be9-46c2-8737-5a263b5b9ef4.png",
            "datePublished": "2025-04-15",
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
            {/* Back button */}
            <div className="mb-8">
              <Link to="/blog">
                <Button variant="outline" className="border-green-200/50 hover:bg-green-50/50 font-normal">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
            </div>

            {/* Featured blog post */}
            <article className="bg-white/80 backdrop-blur-sm rounded-lg border border-green-100/60 shadow-lg overflow-hidden mb-12">
              <div className="h-64 md:h-80 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h2>
                
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8">
                  <p className="text-xl font-light mb-6">{post.excerpt}</p>
                  
                  <div className="space-y-6">
                    <p>We've all felt it — the magic of hearing back from a founder. Fast. Clear. Like they're writing just to you. That kind of response makes you a fan, not just a user. And the crazy part is, it works. It builds trust. Loyalty. Word of mouth.</p>
                    
                    <div className="bg-red-50/50 rounded-xl p-6 border border-red-100">
                      <p className="text-lg font-medium text-red-900 mb-2">But here's the kicker:</p>
                      <p className="text-red-800">Fan-level communication doesn't scale.</p>
                    </div>

                    <p>And yet, it's the reason many great startups take off in the first place.</p>

                    <h3 className="text-2xl font-medium text-gray-900 mt-12 mb-6">What Fan-Level Communication Looks Like</h3>
                    
                    <p>You've seen it.</p>

                    <ul className="list-disc pl-6 space-y-2">
                      <li>Every email gets a thoughtful reply</li>
                      <li>The tone is personal, not templated</li>
                      <li>Follow-ups actually happen</li>
                      <li>No ticket numbers, no bots pretending to be human</li>
                      <li>It feels like someone cares — because someone actually does.</li>
                    </ul>

                    <div className="bg-orange-50/50 rounded-xl p-6 border border-orange-100">
                      <p className="font-medium text-orange-900">But behind the curtain?</p>
                      <p className="text-orange-800 mt-2">It's often a small team, running on fumes, trying to stay human while drowning in email.</p>
                    </div>

                    <h3 className="text-2xl font-medium text-gray-900 mt-12 mb-6">Why It Breaks So Fast</h3>
                    
                    <p>The second you get traction, your inbox turns into a minefield.</p>
                    
                    <p>Support requests. Sales leads. Bugs. Feedback. Press. Investors. Spam. It all hits the same place: your inbox.</p>

                    <p>And because you're small, every message matters.</p>

                    <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                      <p className="text-xl font-medium text-blue-900">But there's no triage. No structure. No system.</p>
                      <p className="text-blue-800 mt-2">Just a stream of unread threads — and a growing fear you're going to miss something important.</p>
                    </div>

                    <p>So you patch it:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Forward support to a helpdesk</li>
                      <li>Pipe leads into a CRM</li>
                      <li>DM teammates in Slack with random links</li>
                      <li>Start a spreadsheet to track open conversations</li>
                    </ul>

                    <p>It helps… for a week. Then it's chaos again.</p>

                    <GrowthChart />

                    <h3 className="text-2xl font-medium text-gray-900 mt-12 mb-6">You Don't Just Lose Speed. You Lose the Personal Touch.</h3>
                    
                    <p>Once you spread email across five tools, everything's "organized" — but colder.</p>
                    
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Helpdesks feel like black holes</li>
                      <li>CRMs don't care about real conversations</li>
                      <li>You forget who someone is and why they matter</li>
                      <li>Threads die in inboxes no one checks</li>
                    </ul>

                    <div className="bg-red-50/50 rounded-xl p-6 border border-red-100">
                      <p className="font-medium text-red-900">Now the next time that person writes in — you don't have context.</p>
                      <p className="text-red-800 mt-2">You don't remember the last bug they filed. The feedback they gave. That they're a paying customer. That they matter.</p>
                      <p className="text-red-800 mt-2 font-medium">And just like that, the magic is gone.</p>
                    </div>

                    <h3 className="text-2xl font-medium text-gray-900 mt-12 mb-6">Scaling the Magic, Without the Mayhem</h3>
                    
                    <p>You can't scale yourself. But you can scale the feeling.</p>
                    
                    <p>What if:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Every email became a task</li>
                      <li>Every task had a quick "gist" summary</li>
                      <li>You could see the whole relationship history in one place</li>
                      <li>AI merely assists you in pulling in the key information about the who/what/why, never writing for you.</li>
                      <li>Follow-ups happened automatically</li>
                      <li>You didn't need to CC, forward, or ping in Slack</li>
                    </ul>

                    <div className="bg-green-50/50 rounded-xl p-6 border border-green-100">
                      <p className="text-xl font-medium text-green-900">That's not a tool. That's an operating system for relationships.</p>
                      <p className="text-green-800 mt-2">One that lives where the conversations start: your inbox.</p>
                    </div>

                    <InboxBeforeAfter />

                    <h3 className="text-2xl font-medium text-gray-900 mt-12 mb-6">The "Unscalable" Thing You Can Now Actually Scale</h3>
                    
                    <p>Fan-level communication used to be a phase.</p>
                    <p>A beautiful, painful, short-lived phase before you outgrew it.</p>

                    <p>But that's changing.</p>

                    <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                      <p className="font-medium text-blue-900">You don't need 10 people to keep being great at email.</p>
                      <p className="text-blue-800 mt-2">You just need one system that helps you stay personal, responsive, and consistent — even as volume grows.</p>
                    </div>

                    <p>If you can keep the feeling of being small while actually scaling?</p>
                    <p><strong>You win.</strong></p>

                    <h3 className="text-2xl font-medium text-gray-900 mt-12 mb-6">Final Thought</h3>
                    
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200/50 text-center">
                      <MessageSquare className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <p className="text-lg text-gray-900 mb-4">No one ever said, "I love this company because they closed my support ticket."</p>
                      <p className="text-lg text-gray-900 mb-4">They remember how fast you replied. How thoughtful the answer was. That it felt like a person, not a system.</p>
                      <p className="text-xl font-medium text-gray-900">I encourage you to keep that magic alive. Scale it on your terms.</p>
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
    </>
  );
};

export default BlogPostFanLevel;
