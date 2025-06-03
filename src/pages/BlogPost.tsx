
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, ArrowRight, Mail, Inbox, Users, Zap, Search, Tag, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const BlogPost = () => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Animation sequence for the kitchen drawer illustration
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const EmailChaosAnimation = () => {
    const emails = [
      { type: 'customer', icon: Users, color: 'text-blue-500', label: 'Customer Issue' },
      { type: 'sales', icon: Target, color: 'text-green-500', label: 'Sales Lead' },
      { type: 'bug', icon: Zap, color: 'text-red-500', label: 'Bug Report' },
      { type: 'spam', icon: Mail, color: 'text-gray-400', label: 'Spam' },
      { type: 'investor', icon: Mail, color: 'text-purple-500', label: 'Investor Email' },
      { type: 'applicant', icon: Users, color: 'text-orange-500', label: 'Job Application' }
    ];

    return (
      <div className="relative bg-gray-50/50 rounded-xl p-8 border border-gray-200/50">
        <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">The Kitchen Drawer Problem</h3>
        
        {/* Inbox representation */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Inbox className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">Inbox</span>
            <span className="text-sm text-red-500 ml-auto">{emails.length} unread</span>
          </div>
          
          {/* Animated email stack */}
          <div className="space-y-2">
            {emails.map((email, index) => {
              const Icon = email.icon;
              const delay = index * 0.5;
              return (
                <div 
                  key={index}
                  className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg transition-all duration-500 ${
                    animationStep >= 1 ? 'animate-pulse' : ''
                  }`}
                  style={{ animationDelay: `${delay}s` }}
                >
                  <Icon className={`w-4 h-4 ${email.color}`} />
                  <span className="text-sm text-gray-700">{email.label}</span>
                  <div className="ml-auto w-2 h-2 bg-red-400 rounded-full"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transformation arrow */}
        <div className="text-center mb-6">
          <ArrowRight className={`w-8 h-8 text-green-600 mx-auto transition-transform duration-1000 ${
            animationStep >= 2 ? 'scale-110 rotate-90' : ''
          }`} />
          <p className="text-sm text-gray-600 mt-2">What if every email came labeled?</p>
        </div>

        {/* Organized emails */}
        <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 ${
          animationStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'
        }`}>
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Support</span>
            </div>
            <div className="text-xs text-blue-700">Automatically categorized</div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-900">Sales</span>
            </div>
            <div className="text-xs text-green-700">Lead scored & tracked</div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">Investors</span>
            </div>
            <div className="text-xs text-purple-700">Priority flagged</div>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-900">Recruiting</span>
            </div>
            <div className="text-xs text-orange-700">Auto-scheduled</div>
          </div>
        </div>
      </div>
    );
  };

  const ScaleVisualization = () => {
    return (
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-8 border border-red-200/50">
        <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">The Founder's Dilemma</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Big Company */}
          <div className="text-center">
            <h4 className="font-medium text-gray-800 mb-4">Big Companies</h4>
            <div className="space-y-3">
              {[1,2,3,4,5].map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-600" />
                  <div className="flex-1 h-2 bg-gray-200 rounded"></div>
                  <span className="text-xs text-gray-500">Specialist</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-4">Hide chaos with headcount</p>
          </div>

          {/* Founder */}
          <div className="text-center">
            <h4 className="font-medium text-gray-800 mb-4">Founders</h4>
            <div className="relative">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <div className="space-y-2">
                {['Customer', 'Sales', 'Bug', 'Investor', 'PR', 'Legal'].map((type, index) => (
                  <div key={index} className="text-xs bg-white/60 rounded px-2 py-1 border border-red-200">
                    {type}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm text-red-600 mt-4 font-medium">Every email = opportunity or fire</p>
          </div>
        </div>
      </div>
    );
  };

  const post = {
    title: "Why Email Still Runs the World",
    excerpt: "People love saying email is broken. But if email is broken, why does every serious conversation still start there? It's not broken. It's overloaded.",
    date: "2024-06-03",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop",
    content: `People love saying email is broken.

Too many threads. Too much spam. Too hard to keep track of anything. But here's the thing: if email is broken, why does every serious conversation still start there?

It's not broken. It's overloaded.

Email is the most resilient, open communication protocol on the internet. No logins. No invites. No onboarding flows. Just someone typing your address and hitting send. That's magic.

The problem isn't email.
It's what happens after it lands.`
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
                    <p>Email is the most resilient, open communication protocol on the internet. No logins. No invites. No onboarding flows. Just someone typing your address and hitting send. That's magic.</p>
                    
                    <div className="bg-green-50/50 rounded-xl p-6 border border-green-100">
                      <p className="text-lg font-medium text-green-900 mb-2">The problem isn't email.</p>
                      <p className="text-green-800">It's what happens after it lands.</p>
                    </div>

                    <h3 className="text-2xl font-medium text-gray-900 mt-12 mb-6">The Kitchen Drawer Problem</h3>
                    
                    <p>Every early team runs into this. You launch something. A few people try it. Suddenly, your inbox turns into a kitchen drawer—investors, customers, bugs, applicants, ideas, spam, all dumped in the same place.</p>
                    
                    <EmailChaosAnimation />
                    
                    <p>And like a kitchen drawer, you know the good stuff is in there. Somewhere. But you have to dig through it to find what matters.</p>

                    <p>So you start duct-taping a system together:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Customer issues go to a helpdesk.</li>
                      <li>Sales stuff into a CRM.</li>
                      <li>Everything else? Forward to Slack and hope someone picks it up.</li>
                    </ul>

                    <div className="bg-orange-50/50 rounded-xl p-6 border border-orange-100">
                      <p className="font-medium text-orange-900">That might organize things. But it doesn't make it easier.</p>
                      <p className="text-orange-800 mt-2">You're still stuck reading every email, figuring out what it is, who should handle it, what it's about, and whether it's done. That doesn't scale.</p>
                    </div>

                    <h3 className="text-2xl font-medium text-gray-900 mt-12 mb-6">Not a Volume Problem — a Structure Problem</h3>
                    
                    <p>Most tools try to help by adding structure outside the inbox. But the chaos starts inside it.</p>
                    
                    <p>Here's a simple test: imagine every email came in labeled, summarized, and tracked like a task. Support? Labeled. Sales lead? Labeled. Scheduling request? Pick a time. Reminder needed? Nudge sent.</p>
                    
                    <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                      <p className="text-xl font-medium text-blue-900">That would change everything.</p>
                      <p className="text-blue-800 mt-2">It's not about having fewer emails. It's about making them legible.</p>
                    </div>

                    <h3 className="text-2xl font-medium text-gray-900 mt-12 mb-6">Why Founders Feel It First</h3>
                    
                    <ScaleVisualization />
                    
                    <p>So you reply at midnight. Or flag it "to deal with later." Or copy it to a doc you'll forget to check.</p>
                    
                    <div className="bg-red-50/50 rounded-xl p-6 border border-red-100">
                      <p className="font-medium text-red-900">Founders don't stop replying because they don't care.</p>
                      <p className="text-red-800 mt-2">They stop because it's not sustainable.</p>
                    </div>

                    <h3 className="text-2xl font-medium text-gray-900 mt-12 mb-6">Email Isn't Broken. It Just Needs Help.</h3>
                    
                    <p>The truth is, email is still the front door to your company. Not Intercom. Not Slack. Not some dashboard.</p>
                    
                    <p>If you want to build strong relationships with users, customers, partners—email is still where that happens.</p>
                    
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200/50 text-center">
                      <Zap className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <p className="text-xl font-medium text-gray-900">And the first team that figures out how to keep up without falling behind wins.</p>
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

export default BlogPost;
