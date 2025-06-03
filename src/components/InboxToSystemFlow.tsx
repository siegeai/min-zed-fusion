
import { Mail, ArrowRight, CheckCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const InboxToSystemFlow = () => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-8 border border-green-200/50">
      <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">Don't Move Conversations Into a System</h3>
      <p className="text-center text-gray-600 mb-8">Make the system wrap around the conversation</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Email Thread */}
        <div className={`bg-white rounded-lg p-4 border border-gray-200 transition-all duration-1000 ${
          animationStep >= 1 ? 'transform scale-105' : ''
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <Mail className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium">Raw Email Thread</span>
          </div>
          <div className="space-y-2">
            <div className="text-xs bg-blue-50 p-2 rounded">
              <div className="font-medium">Re: Partnership Discussion</div>
              <div className="text-gray-600 mt-1">
                "Thanks for the demo. <span className="bg-yellow-200">Our budget opens in Q2</span>. 
                <span className="bg-yellow-200">Would love to revisit then</span>."
              </div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center">
          <ArrowRight className={`w-8 h-8 text-green-600 transition-transform duration-1000 ${
            animationStep >= 2 ? 'scale-110' : ''
          }`} />
        </div>

        {/* Structured Data */}
        <div className={`bg-white rounded-lg p-4 border border-green-200 transition-all duration-1000 ${
          animationStep >= 3 ? 'transform scale-105 shadow-lg' : ''
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium">Smart Context</span>
          </div>
          <div className="space-y-3">
            <div className="text-xs">
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full inline-block mb-2">Partnership Lead</div>
              <div className="text-gray-700">Summary: Interested but waiting for Q2 budget</div>
            </div>
            <div className="text-xs">
              <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full inline-block mb-1">Follow-up: March 1st</div>
            </div>
            <div className="text-xs bg-gray-50 p-2 rounded">
              <div className="text-gray-600">Draft: "Hi [Name], Q2 is here! Ready to explore that partnership?"</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxToSystemFlow;
