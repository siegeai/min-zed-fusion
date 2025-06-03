
import { X, CheckCircle, Clock } from "lucide-react";

const SimplicityvsBureaucracy = () => {
  const bureaucracyFields = [
    'Company Size', 'Industry', 'Lead Source', 'Qualification Score', 'Deal Stage',
    'Forecast Category', 'Close Probability', 'Next Action', 'Owner', 'Created Date',
    'Modified Date', 'Campaign', 'Territory', 'Product Interest', 'Budget Range',
    'Decision Timeline', 'Buying Process', 'Competitors', 'Pain Points', 'BANT Score'
  ];

  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-8 border border-red-200/50">
      <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">Simplicity vs. Bureaucracy</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bloated CRM */}
        <div className="relative">
          <div className="bg-white rounded-lg p-4 border border-red-200 relative">
            <div className="flex items-center gap-2 mb-4">
              <X className="w-5 h-5 text-red-500" />
              <h4 className="font-medium text-red-800">Bloated CRM Interface</h4>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {bureaucracyFields.map((field, index) => (
                <div key={index} className="bg-gray-100 p-2 rounded text-gray-600 border">
                  {field}
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-red-500/10 rounded-lg flex items-center justify-center">
              <X className="w-16 h-16 text-red-500 opacity-50" />
            </div>
          </div>
        </div>

        {/* Clean Timeline */}
        <div className="bg-white rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <h4 className="font-medium text-green-800">Clean Contact Timeline</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="text-sm font-medium">Sarah Chen</div>
                <div className="text-xs text-gray-600">Head of Growth @ TechCorp</div>
                <div className="text-xs text-green-600 mt-1">Last reply: 3 days ago</div>
              </div>
            </div>
            
            <div className="ml-5 space-y-2">
              <div className="bg-blue-50 p-2 rounded text-xs">
                "Love the product. Need to see pricing for 100+ seats."
              </div>
              <div className="bg-gray-50 p-2 rounded text-xs">
                <span className="text-gray-500">You:</span> "Sending enterprise pricing now."
              </div>
              <div className="bg-orange-50 p-2 rounded text-xs border border-orange-200">
                <Clock className="w-3 h-3 inline mr-1 text-orange-600" />
                Follow up in 3 days
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimplicityvsBureaucracy;
