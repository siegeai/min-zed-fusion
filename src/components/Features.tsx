import { MessageCircle, Zap, Users } from "lucide-react";
const Features = () => {
  const features = [{
    icon: <Zap className="w-5 h-5 text-green-600" />,
    title: "Built for Agents",
    description: "No more copy-paste - AI agents that complete tasks directly in your inbox."
  }, {
    icon: <MessageCircle className="w-5 h-5 text-green-600" />,
    title: "Easy as Spreadsheets",
    description: "Manage all external communications in one place. Zero context switches."
  }, {
    icon: <Users className="w-5 h-5 text-green-600" />,
    title: "Team Collaboration",
    description: "Seamlessly collaborate on email tasks with built-in team features."
  }];
  return <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => <div key={index} className="bg-white/80 backdrop-blur-sm p-8 border border-gray-100 hover:border-gray-200 hover:bg-white transition-all duration-300 rounded-2xl group">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-gray-900 font-light text-lg">{feature.title}</h3>
            </div>
            <p className="text-gray-500 leading-relaxed font-light text-sm">{feature.description}</p>
          </div>)}
      </div>
    </div>;
};
export default Features;