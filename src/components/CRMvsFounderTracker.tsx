
import { Target, BarChart3, Heart, MessageSquare, Clock, Users } from "lucide-react";
import { useState, useEffect } from "react";

const CRMvsFounderTracker = () => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const crmItems = [
    { label: 'Deal Stage', icon: Target, progress: 'Stage 3 of 7' },
    { label: 'Forecast', icon: BarChart3, progress: '$50k ARR' },
    { label: 'Close %', icon: Target, progress: '23%' },
    { label: 'Revenue', icon: BarChart3, progress: '$125k' }
  ];

  const founderItems = [
    { label: 'Relationship History', icon: Heart, progress: '8 months, great feedback' },
    { label: 'Who Ghosted Me', icon: MessageSquare, progress: 'Sarah from Acme Co.' },
    { label: 'Who Needs a Nudge', icon: Clock, progress: 'Follow up on pricing' },
    { label: 'Is This Person a Fan', icon: Users, progress: 'Shared our post 3x' }
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 border border-purple-200/50">
      <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">What Founders Track vs. What CRMs Track</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* CRM Side */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <h4 className="font-medium text-gray-800">Traditional CRM</h4>
          </div>
          <div className="space-y-4">
            {crmItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg transition-all duration-500 ${
                    animationStep >= 1 ? 'opacity-50' : 'opacity-100'
                  }`}
                >
                  <Icon className="w-4 h-4 text-gray-600" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-700">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.progress}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Founder Side */}
        <div className="bg-white rounded-lg p-6 border border-green-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <h4 className="font-medium text-gray-800">What Founders Actually Need</h4>
          </div>
          <div className="space-y-4">
            {founderItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 p-3 bg-green-50 rounded-lg transition-all duration-500 ${
                    animationStep >= 2 ? 'scale-105 shadow-lg' : 'scale-100'
                  }`}
                >
                  <Icon className="w-4 h-4 text-green-600" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-green-800">{item.label}</div>
                    <div className="text-xs text-green-600">{item.progress}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMvsFounderTracker;
