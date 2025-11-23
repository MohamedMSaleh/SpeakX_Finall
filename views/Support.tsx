
import React from 'react';
import * as Icons from '../components/Icons';

const Support: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      <div className="bg-white p-4 flex items-center gap-4 shadow-sm sticky top-0 z-10">
          <button onClick={onBack}><Icons.ChevronRight className="rotate-180 text-gray-600" /></button>
          <h2 className="font-bold text-gray-900">Help & Support</h2>
      </div>

      <div className="p-5 space-y-6 overflow-y-auto">
          {/* Search Help */}
          <div className="relative">
              <Icons.Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input 
                  type="text" 
                  placeholder="How can we help?" 
                  className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
              />
          </div>

          {/* FAQ Categories */}
          <div>
              <h3 className="font-bold text-gray-900 mb-3">FAQ Categories</h3>
              <div className="space-y-2">
                  {['Account & Profile', 'Learning with AI', 'Human Tutors', 'Privacy & Data', 'Technical Issues'].map((cat, i) => (
                      <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 flex justify-between items-center cursor-pointer">
                          <span className="text-sm font-medium text-gray-700">{cat}</span>
                          <Icons.ChevronRight size={16} className="text-gray-400" />
                      </div>
                  ))}
              </div>
          </div>

          {/* Contact */}
           <div className="bg-blue-50 rounded-3xl p-5 border border-blue-100 text-center mt-4">
              <h3 className="font-bold text-gray-900 mb-2">Still need help?</h3>
              <p className="text-sm text-gray-600 mb-4">Our support team is available 24/7 to assist you.</p>
              <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl">Contact Support</button>
          </div>
      </div>
    </div>
  );
};

export default Support;
