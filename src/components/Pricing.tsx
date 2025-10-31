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
  return <div id="pricing" className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
            Choose the plan that's right for your team. Start with a 7-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => <div key={index} className={`relative bg-white rounded-3xl border ${plan.popular ? 'border-gray-900 shadow-xl' : 'border-gray-200'} p-10 transition-all duration-300 hover:shadow-lg ${plan.popular ? 'scale-105' : ''}`}>
              {plan.popular && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gray-900 text-white px-5 py-1.5 rounded-full text-xs font-light tracking-wide">
                    Most Popular
                  </span>
                </div>}
              
              <div className="text-center mb-10">
                <h3 className="text-2xl font-light text-gray-900 mb-3">{plan.name}</h3>
                <div className="mb-3">
                  <span className="text-5xl font-light text-gray-900">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-gray-500 ml-2 text-lg font-light">/{plan.period}</span>}
                  {plan.price === "Custom" && <span className="text-gray-500 ml-2 text-lg font-light">{plan.period}</span>}
                </div>
                <p className="text-gray-500 text-sm font-light">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm font-light">{feature}</span>
                  </li>)}
              </ul>

              {plan.name === "Starter" ? (
                <StripeBuyButton
                  buyButtonId="buy_btn_1SECoRDQyHvuvnbroSoSoY1Y"
                  publishableKey="pk_live_51NIHjUDQyHvuvnbrWg0Zl0bPtGYJM304NbQSROQJf41ytXH2Io2pCXAX7dVNXygsy2RCTs06CSnjnankR6dWoYG900OyqZq4hH"
                  plan="Starter"
                  variant="grey"
                />
              ) : plan.name === "Professional" ? (
                <StripeBuyButton
                  buyButtonId="buy_btn_1SECpiDQyHvuvnbrcDj5OThL"
                  publishableKey="pk_live_51NIHjUDQyHvuvnbrWg0Zl0bPtGYJM304NbQSROQJf41ytXH2Io2pCXAX7dVNXygsy2RCTs06CSnjnankR6dWoYG900OyqZq4hH"
                  plan="Professional"
                />
              ) : (
                <Button className={`w-full ${plan.popular ? 'bg-gray-900 hover:bg-black text-white font-light rounded-full py-6' : 'bg-gray-100 hover:bg-gray-200 text-gray-900 font-light rounded-full py-6'} transition-all duration-300`} size="lg" asChild>
                  <a href={plan.cta === "Contact us" ? "mailto:hello@getmin.ai" : "https://app.getmin.ai"}>
                    {plan.cta}
                  </a>
                </Button>
              )}
            </div>)}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-500 text-sm font-light">
            All plans include a 7-day free trial. No setup fees. Cancel anytime.
          </p>
        </div>
      </div>
    </div>;
};
export default Pricing;