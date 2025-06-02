
import { MessageCircle, Bot, Zap, BarChart3, Shield, Workflow } from "lucide-react";

const FeaturesInDepth = () => {
  const features = [
    {
      icon: <MessageCircle className="w-8 h-8 text-green-600" />,
      title: "Unified Communication Hub",
      description: "Centralize all your external communications in one powerful interface. Manage emails, messages, and team collaboration without switching between tools.",
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop&crop=center"
    },
    {
      icon: <Bot className="w-8 h-8 text-green-600" />,
      title: "Intelligent AI Agents",
      description: "Deploy smart AI agents that handle routine communications, draft responses, and escalate important messages with industry-leading accuracy.",
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop&crop=center"
    },
    {
      icon: <Zap className="w-8 h-8 text-green-600" />,
      title: "Lightning-Fast Processing",
      description: "Process emails and messages 10x faster with our optimized infrastructure and intelligent prioritization algorithms that understand context.",
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&crop=center"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-green-600" />,
      title: "Advanced Analytics",
      description: "Get deep insights into your communication patterns, response times, and team performance with comprehensive analytics and reporting.",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop&crop=center"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Enterprise Security",
      description: "Bank-level encryption, SOC 2 compliance, and advanced security features ensure your communications remain safe and secure at all times.",
      imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop&crop=center"
    },
    {
      icon: <Workflow className="w-8 h-8 text-green-600" />,
      title: "Smart Automation",
      description: "Create powerful workflows and automations that handle repetitive tasks, route messages intelligently, and trigger actions based on your custom rules.",
      imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=400&fit=crop&crop=center"
    }
  ];

  return (
    <div className="py-20 bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
            Powerful features for modern teams
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Discover how min transforms the way your team handles external communication with these key capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                {/* Image/Screenshot placeholder */}
                <div className="aspect-video bg-gradient-to-br from-green-50 to-green-100/50 relative overflow-hidden">
                  <img 
                    src={feature.imageUrl} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-green-600/10"></div>
                </div>
                
                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-green-50 rounded-lg mr-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-medium text-gray-900">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesInDepth;
