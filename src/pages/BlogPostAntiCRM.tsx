
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, ArrowRight, Users, Target, BarChart3, MessageSquare, Clock, Mail, CheckCircle, X, ArrowLeft, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BlogPostAntiCRM = () => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Animation sequence for the comparisons
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const CRMvsFounderTracker = () => {
    const crmItems = [
      { label: 'Deal Stage', icon: Target, progress: 'Stage 3 of 7' },
      { label: 'Forecast', icon: BarChart3, progress: '$50k ARR' },
      { label: 'Close %', icon: Target, progress: '23%' },
      { label: 'Revenue', icon: BarChart3, progress: '$125k' }
    ];

    const founderItems = [
      { label: 'Relationship History', icon: Heart, progress: '8 months, great feedback' },
      { label: 'Who Ghosted Me', icon: MessageSquare, progress: 'Sarah from Acme Co.' },
      { label: 'Who Needs a Nudge', icon: Clock, progress: 'Follow up on pricing' },
      { label: 'Is This Person a Fan', icon: Users, progress: 'Shared our post 3x' }
    ];

    return (
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 border border-purple-200/50">
        <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">What Founders Track vs. What CRMs Track</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* CRM Side */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <h4 className="font-medium text-gray-800">Traditional CRM</h4>
            </div>
            <div className="space-y-4">
              {crmItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index} 
                    className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg transition-all duration-500 ${
                      animationStep >= 1 ? 'opacity-50' : 'opacity-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-gray-600" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-700">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.progress}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Founder Side */}
          <div className="bg-white rounded-lg p-6 border border-green-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h4 className="font-medium text-gray-800">What Founders Actually Need</h4>
            </div>
            <div className="space-y-4">
              {founderItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index} 
                    className={`flex items-center gap-3 p-3 bg-green-50 rounded-lg transition-all duration-500 ${
                      animationStep >= 2 ? 'scale-105 shadow-lg' : 'scale-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-green-600" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-green-800">{item.label}</div>
                      <div className="text-xs text-green-600">{item.progress}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const InboxToSystemFlow = () => {
    return (
      <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-8 border border-green-200/50">
        <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">Don't Move Conversations Into a System</h3>
        <p className="text-center text-gray-600 mb-8">Make the system wrap around the conversation</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Email Thread */}
          <div className={`bg-white rounded-lg p-4 border border-gray-200 transition-all duration-1000 ${
            animationStep >= 1 ? 'transform scale-105' : ''
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Raw Email Thread</span>
            </div>
            <div className="space-y-2">
              <div className="text-xs bg-blue-50 p-2 rounded">
                <div className="font-medium">Re: Partnership Discussion</div>
                <div className="text-gray-600 mt-1">
                  "Thanks for the demo. <span className="bg-yellow-200">Our budget opens in Q2</span>. 
                  <span className="bg-yellow-200">Would love to revisit then</span>."
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center">
            <ArrowRight className={`w-8 h-8 text-green-600 transition-transform duration-1000 ${
              animationStep >= 2 ? 'scale-110' : ''
            }`} />
          </div>

          {/* Structured Data */}
          <div className={`bg-white rounded-lg p-4 border border-green-200 transition-all duration-1000 ${
            animationStep >= 3 ? 'transform scale-105 shadow-lg' : ''
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Smart Context</span>
            </div>
            <div className="space-y-3">
              <div className="text-xs">
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full inline-block mb-2">Partnership Lead</div>
                <div className="text-gray-700">Summary: Interested but waiting for Q2 budget</div>
              </div>
              <div className="text-xs">
                <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full inline-block mb-1">Follow-up: March 1st</div>
              </div>
              <div className="text-xs bg-gray-50 p-2 rounded">
                <div className="text-gray-600">Draft: "Hi [Name], Q2 is here! Ready to explore that partnership?"</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SimplicityvsBureaucracy = () => {
    const bureaucracyFields = [
      'Company Size', 'Industry', 'Lead Source', 'Qualification Score', 'Deal Stage',
      'Forecast Category', 'Close Probability', 'Next Action', 'Owner', 'Created Date',
      'Modified Date', 'Campaign', 'Territory', 'Product Interest', 'Budget Range',
      'Decision Timeline', 'Buying Process', 'Competitors', 'Pain Points', 'BANT Score'
    ];

    return (
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-8 border border-red-200/50">
        <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">Simplicity vs. Bureaucracy</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bloated CRM */}
          <div className="relative">
            <div className="bg-white rounded-lg p-4 border border-red-200 relative">
              <div className="flex items-center gap-2 mb-4">
                <X className="w-5 h-5 text-red-500" />
                <h4 className="font-medium text-red-800">Bloated CRM Interface</h4>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {bureaucracyFields.map((field, index) => (
                  <div key={index} className="bg-gray-100 p-2 rounded text-gray-600 border">
                    {field}
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-red-500/10 rounded-lg flex items-center justify-center">
                <X className="w-16 h-16 text-red-500 opacity-50" />
              </div>
            </div>
          </div>

          {/* Clean Timeline */}
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h4 className="font-medium text-green-800">Clean Contact Timeline</h4>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Sarah Chen</div>
                  <div className="text-xs text-gray-600">Head of Growth @ TechCorp</div>
                  <div className="text-xs text-green-600 mt-1">Last reply: 3 days ago</div>
                </div>
              </div>
              
              <div className="ml-5 space-y-2">
                <div className="bg-blue-50 p-2 rounded text-xs">
                  "Love the product. Need to see pricing for 100+ seats."
                </div>
                <div className="bg-gray-50 p-2 rounded text-xs">
                  <span className="text-gray-500">You:</span> "Sending enterprise pricing now."
                </div>
                <div className="bg-orange-50 p-2 rounded text-xs border border-orange-200">
                  <Clock className="w-3 h-3 inline mr-1 text-orange-600" />
                  Follow up in 3 days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const post = {
    title: "The Anti-CRM: Why Founders Hate Tools That \"Scale\"",
    excerpt: "CRMs turn people into numbers. The anti-CRM does the opposite: It turns noise into context, threads into stories, and strangers into advocates.",
    date: "2024-06-04",
    readTime: "7 min read",
    image: "/lovable-uploads/9ac9a885-47ba-4ab6-b63c-85ac1a7d443b.png"
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
            {/* Back button */}
            <div className="mb-8">
              <Link to="/blog">
                <Button variant="outline" className="border-purple-200/50 hover:bg-purple-50/50 font-normal">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
            </div>

            {/* Featured blog post */}
            <article className="bg-white/80 backdrop-blur-sm rounded-lg border border-purple-100/60 shadow-lg overflow-hidden mb-12">
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
                    
                    <p>We don't need another CRM. We need a <strong>Contact OS</strong> — something that does less, but does it better.</p>
                    
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
