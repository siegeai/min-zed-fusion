
import { MessageCircle, Zap, Users, Shield, Globe, Bot } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-green-600/80" />,
      title: "10x Faster",
      description: "Email processing speed"
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-green-600/80" />,
      title: "Unified Interface",
      description: "One platform for all communication"
    },
    {
      icon: <Users className="w-6 h-6 text-green-600/80" />,
      title: "Team Ready",
      description: "Built for collaboration"
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600/80" />,
      title: "Enterprise Security",
      description: "Bank-level encryption"
    },
    {
      icon: <Globe className="w-6 h-6 text-green-600/80" />,
      title: "50+ Integrations",
      description: "Connect your existing tools"
    },
    {
      icon: <Bot className="w-6 h-6 text-green-600/80" />,
      title: "95% Accuracy",
      description: "AI agent performance"
    }
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-green-100/30 hover:bg-white/70 transition-all duration-300"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-50/50 rounded-lg">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">{feature.title}</h3>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
