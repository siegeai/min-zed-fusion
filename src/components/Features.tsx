import { MessageCircle, Zap, Users } from "lucide-react";
const Features = () => {
  const features = [{
    icon: <Zap className="w-5 h-5 text-green-600/80" />,
    title: "One inbox. One owner in 30s",
    description: "Detects category, intent and sets status on every thread. No more “who's on this?”"
  }, {
    icon: <MessageCircle className="w-5 h-5 text-green-600/80" />,
    title: "Watchtower never sleeps",
    description: "SMS alerts for those important emails, auto follow-ups before any thread goes quiet."
  }, {
    icon: <Users className="w-5 h-5 text-green-600/80" />,
    title: "Surface what customers want",
    description: "Auto-sort customer emails into: Buy, Help, Explore; clear intent, clear owners."
  }];
  return <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => <div key={index} className="bg-white/80 backdrop-blur-sm p-4 shadow-sm border-2 border-green-100/60 hover:bg-white/90 transition-all duration-300 rounded-sm">
            <div className="flex items-center space-x-3 mb-2">
              {feature.icon}
              <h3 className="text-gray-900 font-normal text-base">{feature.title}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-light text-sm">{feature.description}</p>
          </div>)}
      </div>
    </div>;
};
export default Features;