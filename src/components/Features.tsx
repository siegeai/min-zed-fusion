
import { MessageCircle, Zap, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: "AI-Powered",
      description: "Intelligent email agents that handle routine communication tasks automatically, freeing up your team's time."
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-blue-600" />,
      title: "Unified Interface",
      description: "Manage all external communication from one clean, intuitive interface that your team will actually enjoy using."
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Team Collaboration", 
      description: "Seamlessly collaborate on communication tasks with built-in team features and real-time synchronization."
    }
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-xl mb-6 group-hover:bg-blue-100 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
