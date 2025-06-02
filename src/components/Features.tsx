
import { MessageCircle, Zap, Users, Shield, Globe, Bot } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-green-600/80" />,
      title: "AI-Powered Automation",
      description: "Intelligent email agents that handle routine communication tasks automatically, learning from your patterns and preferences."
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-green-600/80" />,
      title: "Unified Interface",
      description: "Manage all external communication from one clean, intuitive interface that brings together email, messaging, and collaboration tools."
    },
    {
      icon: <Users className="w-8 h-8 text-green-600/80" />,
      title: "Team Collaboration",
      description: "Seamlessly collaborate on communication tasks with built-in team features, shared templates, and workflow management."
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600/80" />,
      title: "Enterprise Security",
      description: "Bank-level encryption and enterprise-grade security features to keep your communications safe and compliant."
    },
    {
      icon: <Globe className="w-8 h-8 text-green-600/80" />,
      title: "Global Integration",
      description: "Connect with 50+ popular tools and services, from CRM systems to project management platforms and everything in between."
    },
    {
      icon: <Bot className="w-8 h-8 text-green-600/80" />,
      title: "Smart Analytics",
      description: "Get insights into communication patterns, response times, and team performance with advanced analytics and reporting."
    }
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-sm border border-green-100/40 hover:bg-white/90 transition-all duration-300 hover:shadow-md group"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-green-50/50 rounded-full group-hover:bg-green-100/50 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
