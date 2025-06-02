import { Brain, Shield, Zap, Users2, BarChart3, Globe } from "lucide-react";
const FeatureDeepDive = () => {
  const features = [{
    icon: <Brain className="w-6 h-6 text-green-600" />,
    title: "Smart Email Routing",
    description: "AI automatically categorizes and routes emails to the right team members.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop"
  }, {
    icon: <Shield className="w-6 h-6 text-green-600" />,
    title: "Enterprise Security",
    description: "Bank-grade encryption and compliance with SOC 2, GDPR, and HIPAA.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop"
  }, {
    icon: <Zap className="w-6 h-6 text-green-600" />,
    title: "Lightning Fast Search",
    description: "Find any conversation, attachment, or contact in milliseconds.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop"
  }, {
    icon: <Users2 className="w-6 h-6 text-green-600" />,
    title: "Team Workspaces",
    description: "Collaborative spaces for departments with shared templates and workflows.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop"
  }, {
    icon: <BarChart3 className="w-6 h-6 text-green-600" />,
    title: "Analytics Dashboard",
    description: "Deep insights into response times, team performance, and communication trends.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop"
  }, {
    icon: <Globe className="w-6 h-6 text-green-600" />,
    title: "Multi-language Support",
    description: "AI translates and responds in 50+ languages automatically.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop"
  }];
  return <div id="features" className="py-16 bg-white relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
            Powerful features for modern teams
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Everything you need to transform your external communication workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => <div key={index} className="">
              {/* Feature Image with border */}
              <div className="relative h-48 overflow-hidden bg-gray-50 border-[6px] border-green-200/35 rounded-sm">
                <img src={feature.image} alt={feature.title} className="w-full h-full object-cover rounded-sm" />
              </div>

              {/* Feature Content */}
              <div className="p-6 px-0 mr-[30px]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-transparent">
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