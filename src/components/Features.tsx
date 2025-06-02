
import { MessageCircle, Zap, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-5 h-5 text-blue-600" />,
      title: "AI-Powered",
      description: "Intelligent email agents that handle routine communication tasks automatically."
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-blue-600" />,
      title: "Unified Interface",
      description: "Manage all external communication from one clean, intuitive interface."
    },
    {
      icon: <Users className="w-5 h-5 text-blue-600" />,
      title: "Team Collaboration", 
      description: "Seamlessly collaborate on communication tasks with built-in team features."
    }
  ];

  return (
    <div className="absolute top-8 left-8 right-8 z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-3 mb-2">
              {feature.icon}
              <h3 className="text-sm font-medium text-gray-900">{feature.title}</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
