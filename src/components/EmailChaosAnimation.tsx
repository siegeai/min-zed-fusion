
import { useState, useEffect } from "react";
import { Inbox, Users, Target, Zap, Mail, Tag, ArrowRight } from "lucide-react";

const EmailChaosAnimation = () => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const emails = [
    { type: 'customer', icon: Users, color: 'text-blue-500', label: 'Customer Issue' },
    { type: 'sales', icon: Target, color: 'text-green-500', label: 'Sales Lead' },
    { type: 'bug', icon: Zap, color: 'text-red-500', label: 'Bug Report' },
    { type: 'spam', icon: Mail, color: 'text-gray-400', label: 'Spam' },
    { type: 'investor', icon: Mail, color: 'text-purple-500', label: 'Investor Email' },
    { type: 'applicant', icon: Users, color: 'text-orange-500', label: 'Job Application' }
  ];

  return (
    <div className="relative bg-gray-50/50 rounded-xl p-8 border border-gray-200/50">
      <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">The Kitchen Drawer Problem</h3>
      
      {/* Inbox representation */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Inbox className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-900">Inbox</span>
          <span className="text-sm text-red-500 ml-auto">{emails.length} unread</span>
        </div>
        
        {/* Animated email stack */}
        <div className="space-y-2">
          {emails.map((email, index) => {
            const Icon = email.icon;
            const delay = index * 0.5;
            return (
              <div 
                key={index}
                className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg transition-all duration-500 ${
                  animationStep >= 1 ? 'animate-pulse' : ''
                }`}
                style={{ animationDelay: `${delay}s` }}
              >
                <Icon className={`w-4 h-4 ${email.color}`} />
                <span className="text-sm text-gray-700">{email.label}</span>
                <div className="ml-auto w-2 h-2 bg-red-400 rounded-full"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transformation arrow */}
      <div className="text-center mb-6">
        <ArrowRight className={`w-8 h-8 text-green-600 mx-auto transition-transform duration-1000 ${
          animationStep >= 2 ? 'scale-110 rotate-90' : ''
        }`} />
        <p className="text-sm text-gray-600 mt-2">What if every email came labeled?</p>
      </div>

      {/* Organized emails */}
      <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 ${
        animationStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'
      }`}>
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Support</span>
          </div>
          <div className="text-xs text-blue-700">Automatically categorized</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-900">Sales</span>
          </div>
          <div className="text-xs text-green-700">Lead scored & tracked</div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-900">Investors</span>
          </div>
          <div className="text-xs text-purple-700">Priority flagged</div>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-900">Recruiting</span>
          </div>
          <div className="text-xs text-orange-700">Auto-scheduled</div>
        </div>
      </div>
    </div>
  );
};

export default EmailChaosAnimation;
