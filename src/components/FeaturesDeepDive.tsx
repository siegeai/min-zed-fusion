
import { MessageCircle, Zap, Users, Shield, Globe, Bot, Mail, Clock, BarChart3, Settings, Lock, Workflow } from "lucide-react";

const FeaturesDeepDive = () => {
  const features = [
    {
      icon: <MessageCircle className="w-8 h-8 text-green-600/80" />,
      title: "Unified Communication Hub",
      description: "Centralize all your external communications in one powerful interface. No more switching between email clients, chat apps, and collaboration tools.",
      highlights: ["Email integration", "Multi-channel support", "Real-time sync"]
    },
    {
      icon: <Bot className="w-8 h-8 text-green-600/80" />,
      title: "Intelligent AI Agents",
      description: "Deploy smart AI agents that handle routine communications, draft responses, and escalate important messages with 95% accuracy.",
      highlights: ["Smart routing", "Auto-responses", "Context awareness"]
    },
    {
      icon: <Zap className="w-8 h-8 text-green-600/80" />,
      title: "Lightning-Fast Processing",
      description: "Process emails and messages 10x faster with our optimized infrastructure and intelligent prioritization algorithms.",
      highlights: ["Instant processing", "Smart prioritization", "Bulk operations"]
    },
    {
      icon: <Users className="w-8 h-8 text-green-600/80" />,
      title: "Team Collaboration",
      description: "Enable seamless team collaboration with shared inboxes, assignment features, and real-time collaboration tools.",
      highlights: ["Shared workspaces", "Task assignment", "Team analytics"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-green-600/80" />,
      title: "Advanced Analytics",
      description: "Get deep insights into your communication patterns, response times, and team performance with comprehensive analytics.",
      highlights: ["Performance metrics", "Custom reports", "Trend analysis"]
    },
    {
      icon: <Globe className="w-8 h-8 text-green-600/80" />,
      title: "50+ Integrations",
      description: "Connect with your favorite tools and platforms. From CRM systems to project management tools, we've got you covered.",
      highlights: ["CRM integration", "API access", "Custom webhooks"]
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600/80" />,
      title: "Enterprise Security",
      description: "Bank-level encryption, SOC 2 compliance, and advanced security features to keep your communications safe and secure.",
      highlights: ["End-to-end encryption", "SOC 2 compliant", "Advanced permissions"]
    },
    {
      icon: <Workflow className="w-8 h-8 text-green-600/80" />,
      title: "Smart Automation",
      description: "Create powerful workflows and automations that handle repetitive tasks, route messages, and trigger actions based on your rules.",
      highlights: ["Custom workflows", "Rule-based routing", "Trigger actions"]
    }
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-white via-green-50/30 to-white relative">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-green-100/10 rounded-full blur-3xl transform -translate-x-36"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-green-200/8 rounded-full blur-3xl transform translate-x-40"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6">
            Everything you need to transform{" "}
            <span className="text-green-600/90">communication</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Discover the comprehensive suite of features that make min the most powerful 
            external communication platform for modern teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group hover:scale-[1.02] transition-all duration-300"
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-green-100/40 hover:shadow-lg hover:bg-white/80 transition-all duration-300 h-full">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="p-3 bg-green-50/50 rounded-xl group-hover:bg-green-100/50 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-light mb-4">
                      {feature.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {feature.highlights.map((highlight, highlightIndex) => (
                        <span 
                          key={highlightIndex}
                          className="px-3 py-1 bg-green-50/60 text-green-700/80 rounded-full text-xs font-medium border border-green-100/50"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6 font-light">
            Ready to see these features in action?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-green-600/90 hover:bg-green-700/90 text-white rounded-lg font-normal transition-colors">
              Start free trial
            </button>
            <button className="px-8 py-3 border border-green-200/50 hover:bg-green-50/50 text-gray-700 rounded-lg font-normal transition-colors">
              Schedule demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesDeepDive;
