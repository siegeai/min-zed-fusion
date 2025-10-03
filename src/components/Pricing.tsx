import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import StripeBuyButton from "./StripeBuyButton";
const Pricing = () => {
  const plans = [{
    name: "Starter",
    price: "$7.99",
    period: "per user/month",
    description: "Perfect for small teams getting started",
    features: ["Up to 5 team members", "5,000 AI-processed emails/month", "Small task agents", "Basic integrations", "Email support", "Standard security"],
    cta: "Start free trial",
    popular: false
  }, {
    name: "Professional",
    price: "$12.99",
    period: "per user/month",
    description: "For growing teams that need more power",
    features: ["Up to 25 team members", "50,000 AI-processed emails/month", "Conversational agents", "Semantic Email Search", "Advanced integrations", "Priority support", "Enhanced security", "Custom workflows", "Analytics dashboard"],
    cta: "Start free trial",
    popular: true
  }, {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For large organizations with specific needs",
    features: ["Unlimited team members", "Unlimited AI processing", "Self host", "All integrations", "24/7 dedicated support", "Enterprise security", "Custom AI training", "Advanced analytics", "SLA guarantees"],
    cta: "Contact us",
    popular: false
  }];
  return <div id="pricing" className="bg-gray-50 py-[30px]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Choose the plan that's right for your team. Start with a 7-day free trial.
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
                  {plan.price !== "Custom" && <span className="text-gray-600 ml-1">/{plan.period}</span>}
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

              {plan.name === "Starter" ? (
                <StripeBuyButton
                  buyButtonId="buy_btn_1SECoRDQyHvuvnbroSoSoY1Y"
                  publishableKey="pk_live_51NIHjUDQyHvuvnbrWg0Zl0bPtGYJM304NbQSROQJf41ytXH2Io2pCXAX7dVNXygsy2RCTs06CSnjnankR6dWoYG900OyqZq4hH"
                />
              ) : plan.name === "Professional" ? (
                <StripeBuyButton
                  buyButtonId="buy_btn_1SECpiDQyHvuvnbrcDj5OThL"
                  publishableKey="pk_live_51NIHjUDQyHvuvnbrWg0Zl0bPtGYJM304NbQSROQJf41ytXH2Io2pCXAX7dVNXygsy2RCTs06CSnjnankR6dWoYG900OyqZq4hH"
                />
              ) : (
                <Button className={`w-full ${plan.popular ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`} size="lg" asChild>
                  <a href={plan.cta === "Contact us" ? "mailto:hello@getmin.ai" : "https://app.getmin.ai"}>
                    {plan.cta}
                  </a>
                </Button>
              )}
            </div>)}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm font-light">
            All plans include a 14-day free trial. No setup fees. Cancel anytime.
          </p>
        </div>
      </div>
    </div>;
};
export default Pricing;