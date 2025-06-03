import { Brain, Shield, Zap, Users2, BarChart3, Globe } from "lucide-react";
const FeatureDeepDive = () => {
  const features = [{
    icon: <Brain className="w-6 h-6 text-green-600" />,
    title: "Own your lane",
    description: "Customizable Lanes that triage emails based on content, sub-lanes for granular control. ",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop"
  }, {
    icon: <Shield className="w-6 h-6 text-green-600" />,
    title: "What's the gist?",
    description: "TLDR for every email, every thread, every lane!",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop"
  }, {
    icon: <Zap className="w-6 h-6 text-green-600" />,
    title: "Search that works!",
    description: "Find any conversation, attachment, or contact in seconds.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop"
  }, {
    icon: <Users2 className="w-6 h-6 text-green-600" />,
    title: "You are as good as your team",
    description: "Built for teamwork, shared inbox, Lane and task assignments, shareable threads and collaborative drafting.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop"
  }, {
    icon: <BarChart3 className="w-6 h-6 text-green-600" />,
    title: "Control your agents",
    description: "External communication is critical—our AI agents are designed with human-in-the-loop by default.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop"
  }, {
    icon: <Globe className="w-6 h-6 text-green-600" />,
    title: "Know your customers",
    description: "No more switching tools or missing context. min brings every customer-facing conversation into one place.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop"
  }];
  return <div id="features" className="py-16 bg-white relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
            Powerful features for AI first teams
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Everything you need to transform your external communication workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => <div key={index} className="">
              {/* Feature Image with green rainbow gradient border */}
              <div className="relative h-48 overflow-hidden bg-gray-50 border-transparent bg-gradient-to-r from-emerald-200 via-green-300 via-lime-400 via-emerald-500 via-green-600 via-teal-500 via-emerald-400 via-lime-300 to-green-200 rounded-sm p-[3px]">
                <div className="w-full h-full bg-gray-50 rounded-sm overflow-hidden">
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
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