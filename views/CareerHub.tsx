
import React from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';

const CareerHub: React.FC<{ onBack: () => void, setView: (view: View) => void }> = ({ onBack, setView }) => {
  return (
    <div className="h-full bg-gray-50 flex flex-col pb-safe">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-4 shadow-sm sticky top-0 z-10 shrink-0">
          <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full"><Icons.ChevronRight className="rotate-180 text-gray-600" size={24} /></button>
          <h2 className="font-bold text-gray-900 text-lg">Career Hub</h2>
      </div>

      <div className="p-5 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
        {/* Career Header */}
        <div className="bg-gray-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                        <Icons.Briefcase size={20} className="text-blue-400" />
                    </div>
                    <span className="font-bold tracking-wide text-sm text-gray-300">TARGET ROLE</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">Customer Service Agent</h2>
                <p className="text-gray-400 text-sm mb-6">Tech Solutions Inc.</p>

                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Role Match</span>
                        <span className="font-bold text-green-400">85% Ready</span>
                    </div>
                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full w-[85%] bg-gradient-to-r from-green-500 to-green-400 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Incoming Offers */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Icons.Award className="text-yellow-500" size={20} /> 
                Incoming Offers
            </h3>
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h4 className="font-bold text-gray-900">Innovate Corp.</h4>
                        <p className="text-xs text-gray-500">Account Manager</p>
                    </div>
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full">New</span>
                </div>
                <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-green-600 text-white py-2 rounded-xl text-xs font-bold shadow-lg shadow-green-200">Accept</button>
                    <button className="flex-1 bg-white border border-gray-200 text-gray-600 py-2 rounded-xl text-xs font-bold">Decline</button>
                </div>
            </div>
        </div>

        {/* Skill Gaps */}
        <div>
            <h3 className="font-bold text-gray-900 mb-4">Skill Readiness</h3>
            <div className="space-y-4">
                <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-gray-700">Pronunciation</span>
                        <span className="text-xs font-bold text-blue-600">High</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-blue-500 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CareerHub;
