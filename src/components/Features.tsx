import { MessageCircle, Zap, Users } from "lucide-react";
const Features = () => {
  const features = [{
    icon: <Zap className="w-5 h-5 text-green-600/80" />,
    title: "One inbox. All your emails.",
    description: "hello@, support@, sales@ in one place. Clear ownership. Zero chaos."
  }, {
    icon: <MessageCircle className="w-5 h-5 text-green-600/80" />,
    title: "Cut noise. Catch signal.",
    description: "Spotlight human conversations, filter out noise. AI reminders and follow ups."
  }, {
    icon: <Users className="w-5 h-5 text-green-600/80" />,
    title: "No tickets. Just chats.",
    description: "Turn everyday inbox moments into superfans."
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