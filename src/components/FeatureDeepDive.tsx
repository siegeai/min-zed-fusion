
import { Brain, Shield, Zap, Users2, BarChart3, Globe } from "lucide-react";

const FeatureDeepDive = () => {
  const features = [{
    icon: <Brain className="w-6 h-6 text-green-600" />,
    title: "Step 1: Tame the inbox chaos",
    description: "Every email auto-sorts into lanes: Front Office, Back Office, Mailroom, Noise, Human Conversations. No more drowning in unread messages.",
    image: "/lovable-uploads/dec4c33c-a690-4dbe-b040-e8d6be577a55.png"
  }, {
    icon: <Globe className="w-6 h-6 text-green-600" />,
    title: "Step 2: See the full picture",
    description: "All your inboxes—hello@, support@, sales@—in one view. Full context, full history, zero tab-switching. Finally, you can breathe.",
    image: "/lovable-uploads/debcfb52-42ee-41fe-8354-2a291966e328.png"
  }, {
    icon: <Shield className="w-6 h-6 text-green-600" />,
    title: "Step 3: Cut through the noise",
    description: "Get a TLDR for every email, thread, and contact. See what matters in seconds, not minutes of reading.",
    image: "/lovable-uploads/4ee3511b-2ec3-4b04-9af6-d47b9af52e0d.png"
  }, {
    icon: <Zap className="w-6 h-6 text-green-600" />,
    title: "Step 4: Never miss a beat",
    description: "Smart reminders flag what needs attention. Auto-follow-ups catch dropped threads. You respond—we just make sure nothing slips through.",
    image: "/lovable-uploads/bdf48a53-b3d6-4682-9628-ae6c3a3e1510.png"
  }, {
    icon: <Users2 className="w-6 h-6 text-green-600" />,
    title: "Step 5: Scale with your team",
    description: "Shared workspace. Clear ownership. Internal notes. Collaborative drafts. Everyone stays aligned as you grow.",
    image: "/lovable-uploads/07aeba38-e4c8-4895-ba26-b6850659d2fd.png"
  }, {
    icon: <BarChart3 className="w-6 h-6 text-green-600" />,
    title: "Step 6: Turn emails into fans",
    description: "Fast, personal replies. No more \"who's handling this?\" Your customers feel heard, and you move faster than ever.",
    image: "/lovable-uploads/2c0bb6a8-a034-4446-aaeb-7d19620af60a.png"
  }];

  return <div id="features" className="py-16 bg-white relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
            Your journey from chaos to clarity
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Watch how min. transforms the way your team handles every email
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
