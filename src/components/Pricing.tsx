import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import StripeBuyButton from "./StripeBuyButton";
const Pricing = () => {
  const sharedFeatures = [
    "All team inboxes in one view",
    "Gist for every thread",
    "Daily digests",
    "Address book (AI enrichment)",
    "Watchtower (AI-powered email tracking)",
    "AI reminders and follow-ups",
    "Auto-sort and triage with lanes",
    "Conversation history for every contact",
    "Small-task Agents",
    "Conversational Agents",
    "Team collaboration with internal notes",
  ];

  const plans = [{
    name: "Solo",
    price: "$0",
    period: "forever",
    description: "No card required",
    features: sharedFeatures,
    cta: "Go live in 36 seconds",
    popular: false
  }, {
    name: "Teams",
    price: "$15.95",
    period: "user/month",
    description: "For growing teams that ship fast",
    features: sharedFeatures,
    cta: "Get started - free",
    popular: true
  }, {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For 25+ team members",
    features: sharedFeatures,
    cta: "Contact us",
    popular: false
  }];
  return <div id="pricing" className="bg-gray-50 py-[30px]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6">
            Start free. Scale when ready.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Same powerful features. Pay only when your team grows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => <div key={index} className={`relative bg-white rounded-2xl shadow-lg p-8 ${plan.popular ? 'ring-2 ring-green-500 scale-105' : ''}`}>
              {plan.popular && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>}
              
              <div className="text-center mb-8">
                <h3 className="text-xl font-medium text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-medium text-gray-900">{plan.price}</span>
                  {plan.price === "Free" && <span className="text-gray-600 ml-1">{plan.period}</span>}
                  {plan.price !== "Free" && plan.price !== "Custom" && <span className="text-gray-600 ml-1">/{plan.period}</span>}
                  {plan.price === "Custom" && <span className="text-gray-600 ml-1">{plan.period}</span>}
                </div>
                <p className="text-gray-600 text-sm font-light">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>)}
              </ul>

              <Button 
                className={`w-full ${plan.popular ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`} 
                size="lg" 
                asChild
              >
                <a href={plan.cta === "Contact us" ? "mailto:hello@getmin.ai" : "https://app.getmin.ai"}>
                  {plan.cta}
                </a>
              </Button>
            </div>)}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm font-light">
            Solo is free forever. Teams includes 7-day trial. No setup fees. Cancel anytime.
          </p>
        </div>
      </div>
    </div>;
};
export default Pricing;