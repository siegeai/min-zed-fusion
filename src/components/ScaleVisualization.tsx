
import { Users } from "lucide-react";

const ScaleVisualization = () => {
  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-8 border border-red-200/50">
      <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">The Founder's Dilemma</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Big Company */}
        <div className="text-center">
          <h4 className="font-medium text-gray-800 mb-4">Big Companies</h4>
          <div className="space-y-3">
            {[1,2,3,4,5].map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-600" />
                <div className="flex-1 h-2 bg-gray-200 rounded"></div>
                <span className="text-xs text-gray-500">Specialist</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-4">Hide chaos with headcount</p>
        </div>

        {/* Founder */}
        <div className="text-center">
          <h4 className="font-medium text-gray-800 mb-4">Founders</h4>
          <div className="relative">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Users className="w-8 h-8 text-red-600" />
            </div>
            <div className="space-y-2">
              {['Customer', 'Sales', 'Bug', 'Investor', 'PR', 'Legal'].map((type, index) => (
                <div key={index} className="text-xs bg-white/60 rounded px-2 py-1 border border-red-200">
                  {type}
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-red-600 mt-4 font-medium">Every email = opportunity or fire</p>
        </div>
      </div>
    </div>
  );
};

export default ScaleVisualization;
