import { MessageCircle, Zap, Users } from "lucide-react";
const Features = () => {
  const features = [{
    icon: <Zap className="w-5 h-5 text-green-600/80" />,
    title: "AI-Powered",
    description: "Intelligent email agents that handle routine communication tasks automatically."
  }, {
    icon: <MessageCircle className="w-5 h-5 text-green-600/80" />,
    title: "Unified Interface",
    description: "Manage all external communication from one clean, intuitive interface."
  }, {
    icon: <Users className="w-5 h-5 text-green-600/80" />,
    title: "Team Collaboration",
    description: "Seamlessly collaborate on communication tasks with built-in team features."
  }];
  return <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => <div key={index} className="bg-white/80 backdrop-blur-sm p-4 shadow-sm border-2 border-green-100/60 hover:bg-white/90 transition-all duration-300 rounded-sm">
            <div className="flex items-center space-x-3 mb-2">
              {feature.icon}
              <h3 className="text-gray-900 font-medium text-sm">{feature.title}</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed font-normal">{feature.description}</p>
          </div>)}
      </div>
    </div>;
};
export default Features;