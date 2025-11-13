
import { Brain, Shield, Zap, Users2, BarChart3, Globe } from "lucide-react";

const FeatureDeepDive = () => {
  const features = [{
    icon: <Brain className="w-6 h-6 text-green-600" />,
    title: "Tame the inbox chaos",
    description: "Every email lands in a Lane: Front Office, Back Office, Mailroom, Noise, Human Conversations. Signal on top, noise out of the way.",
    image: "/lovable-uploads/lanes.gif"
  }, {
    icon: <Globe className="w-6 h-6 text-green-600" />,
    title: "See everything at once",
    description: "All customer convos in one view. Instant TL;DR and full history—no tab-hopping, no digging.",
    image: "/lovable-uploads/people.gif"
  }, {
    icon: <Shield className="w-6 h-6 text-green-600" />,
    title: "Clear intent and ownership",
    description: "Intent, status set automatically. “Who's on this?” answered by default.",
    image: "/lovable-uploads/assignee.gif"
  }, {
    icon: <Zap className="w-6 h-6 text-green-600" />,
    title: "Never miss a beat",
    description: "Set a team nudge, and auto follow up quiet threads.",
    image: "/lovable-uploads/nudge.gif"
  }, {
    icon: <Users2 className="w-6 h-6 text-green-600" />,
    title: "Reply as a team",
    description: "Internal messages and shared drafts keep handoffs clean.",
    image: "/lovable-uploads/collab.gif"
  }, {
    icon: <BarChart3 className="w-6 h-6 text-green-600" />,
    title: "Never miss important threads",
    description: "Watchtower watches your inboxes and sends SMS or Slack alerts for those important “can't miss“ threads.",
    image: "/lovable-uploads/watchtower.gif"
  }];

  return <div id="features" className="py-16 bg-white relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
            Your journey from chaos to clarity
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
          Watch how min turns hello@ into fast, reliable replies-without living in the inbox.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => <div key={index} className="">
              {/* Feature Image with green rainbow gradient border */}
              <div className="relative h-48 overflow-hidden bg-gray-50 border-transparent bg-gradient-to-r from-emerald-200 via-green-300 via-lime-400 via-emerald-500 via-green-600 via-teal-500 via-emerald-400 via-lime-300 to-green-200 rounded-sm p-[3px]">
                <div className="w-full h-full bg-gray-50 rounded-sm overflow-hidden">
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover object-top" />
                </div>
              </div>

              {/* Feature Content */}
              <div className="p-6 px-0 mr-[30px]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-transparent px-0">
                    {feature.icon}
                  </div>
                  <h3 className="text-gray-900 font-normal text-lg">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed font-extralight">
                  {feature.description}
                </p>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};

export default FeatureDeepDive;
