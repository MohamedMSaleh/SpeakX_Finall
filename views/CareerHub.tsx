
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

      {/* Coming Soon Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center pb-32">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 text-blue-600 shadow-sm border border-gray-100">
                <Icons.Briefcase size={48} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-3">Career Hub</h2>
            <div className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">Coming Soon</div>
            <p className="text-gray-500 max-w-xs mx-auto leading-relaxed text-base font-medium">
                We're building a space to help you advance your career with English. Stay tuned!
            </p>
      </div>
    </div>
  );
};

export default CareerHub;
