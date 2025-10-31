
import { Brain, Shield, Zap, Users2, BarChart3, Globe } from "lucide-react";

const FeatureDeepDive = () => {
  const features = [{
    icon: <Brain className="w-6 h-6 text-green-600" />,
    title: "Own your lane",
    description: "Customizable Lanes that auto-triage emails based on content and context, sub-lanes for granular control.",
    image: "/lovable-uploads/dec4c33c-a690-4dbe-b040-e8d6be577a55.png"
  }, {
    icon: <Shield className="w-6 h-6 text-green-600" />,
    title: "What's the gist?",
    description: "TLDR for every email, every thread, every person, every lane!",
    image: "/lovable-uploads/4ee3511b-2ec3-4b04-9af6-d47b9af52e0d.png"
  }, {
    icon: <Zap className="w-6 h-6 text-green-600" />,
    title: "Search that works!",
    description: "Find any conversation, attachment, or contact in seconds.",
    image: "/lovable-uploads/bdf48a53-b3d6-4682-9628-ae6c3a3e1510.png"
  }, {
    icon: <Users2 className="w-6 h-6 text-green-600" />,
    title: "You are as good as your team",
    description: "Built for teamwork, shared inbox, Lane and task assignments, shareable threads and collaborative drafting.",
    image: "/lovable-uploads/07aeba38-e4c8-4895-ba26-b6850659d2fd.png"
  }, {
    icon: <BarChart3 className="w-6 h-6 text-green-600" />,
    title: "Control your agents",
    description: "External communication is too critical to outsource 100%—our AI agents are designed with human-in-the-loop by default.",
    image: "/lovable-uploads/2c0bb6a8-a034-4446-aaeb-7d19620af60a.png"
  }, {
    icon: <Globe className="w-6 h-6 text-green-600" />,
    title: "Know your customers",
    description: "No more switching tools or missing context. min. brings every customer-facing conversation into one place.",
    image: "/lovable-uploads/debcfb52-42ee-41fe-8354-2a291966e328.png"
  }];

  return <div id="features" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            Powerful features for AI first teams
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
            Everything you need to transform your external communication workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => <div key={index} className="group">
              {/* Feature Image with subtle border */}
              <div className="relative h-56 overflow-hidden bg-gray-50 rounded-2xl border border-gray-100 mb-6">
                <img src={feature.image} alt={feature.title} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
              </div>

              {/* Feature Content */}
              <div className="px-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-gray-900 font-light text-xl">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};

export default FeatureDeepDive;
