
import React from 'react';
import * as Icons from '../components/Icons';

const Subscription: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="h-full bg-gray-50 flex flex-col pb-24">
      <div className="bg-white p-4 flex items-center gap-4 shadow-sm sticky top-0 z-10 shrink-0">
          <button onClick={onBack}><Icons.ChevronRight className="rotate-180 text-gray-600" /></button>
          <h2 className="font-bold text-gray-900">Subscription</h2>
      </div>

      <div className="p-5 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
          <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Upgrade to Premium</h3>
              <p className="text-gray-500 text-sm mt-2">Unlock unlimited practice and human tutor validation.</p>
          </div>

          {/* Premium Card */}
          <div className="bg-blue-900 rounded-3xl p-6 text-white shadow-xl shadow-blue-200 relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-bl-xl">Best Value</div>
               <h4 className="text-lg font-bold mb-1">Annual Plan</h4>
               <div className="flex items-baseline gap-1 mb-4">
                   <span className="text-3xl font-bold">$15.99</span>
                   <span className="text-blue-200 text-sm">/year</span>
               </div>
               <ul className="space-y-3 text-sm mb-6">
                   <li className="flex items-center gap-2"><Icons.CheckCircle size={16} className="text-green-400" /> Unlimited AI Practice</li>
                   <li className="flex items-center gap-2"><Icons.CheckCircle size={16} className="text-green-400" /> Human Tutor Validation</li>
                   <li className="flex items-center gap-2"><Icons.CheckCircle size={16} className="text-green-400" /> Advanced Analytics</li>
                   <li className="flex items-center gap-2"><Icons.CheckCircle size={16} className="text-green-400" /> No Ads</li>
               </ul>
               <button className="w-full bg-white text-blue-900 font-bold py-3 rounded-xl">Upgrade Now</button>
          </div>

          {/* Basic Card */}
          <div className="bg-white rounded-3xl p-6 text-gray-900 border border-gray-200 shadow-sm">
               <h4 className="text-lg font-bold mb-1">Monthly Plan</h4>
               <div className="flex items-baseline gap-1 mb-4">
                   <span className="text-3xl font-bold">$2.99</span>
                   <span className="text-gray-500 text-sm">/month</span>
               </div>
               <ul className="space-y-3 text-sm mb-6 text-gray-600">
                   <li className="flex items-center gap-2"><Icons.CheckCircle size={16} className="text-blue-600" /> Unlimited AI Practice</li>
                   <li className="flex items-center gap-2"><Icons.X size={16} className="text-gray-400" /> Human Tutor Validation</li>
                   <li className="flex items-center gap-2"><Icons.CheckCircle size={16} className="text-blue-600" /> Basic Analytics</li>
               </ul>
               <button className="w-full bg-gray-100 text-gray-900 font-bold py-3 rounded-xl hover:bg-gray-200">Select Monthly</button>
          </div>
      </div>
    </div>
  );
};

export default Subscription;
