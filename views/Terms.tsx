
import React from 'react';
import * as Icons from '../components/Icons';

const Terms: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Modern gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #F9FAFB 0%, #EEF2FF 50%, #E0E7FF 100%)'
        }}
      />
      
      {/* Decorative floating shapes */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-0 w-48 h-48 bg-blue-200/20 rounded-full blur-2xl" />
      
      {/* Header with gradient */}
      <div 
        className="relative z-10 p-4 flex items-center gap-4 sticky top-0 backdrop-blur-xl border-b border-white/20"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(238,242,255,0.95) 100%)'
        }}
      >
        <button 
          onClick={onBack}
          className="p-2.5 bg-gradient-to-br from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 border border-indigo-100/50"
        >
          <Icons.ChevronRight className="rotate-180 text-indigo-600" />
        </button>
        <h2 className="font-black text-gray-900 text-xl flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Icons.FileText size={18} className="text-white" />
          </div>
          Terms & Privacy
        </h2>
      </div>

      <div className="relative z-10 p-5 space-y-5 flex-1 overflow-y-auto custom-scrollbar">
          
          {/* Introduction Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-bl-full opacity-50 group-hover:opacity-70 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-md">
                    <Icons.Sparkles size={20} className="text-white" />
                  </div>
                  <h3 className="font-black text-gray-900 text-lg">1. Introduction</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">Welcome to SpeakX. By using our app, you agree to these Terms of Service. Please read them carefully.</p>
              </div>
          </div>
          
          {/* Data Privacy Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-bl-full opacity-50 group-hover:opacity-70 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-md">
                    <Icons.Shield size={20} className="text-white" />
                  </div>
                  <h3 className="font-black text-gray-900 text-lg">2. Data Privacy</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">Your privacy is our priority. We collect voice data solely to provide feedback and improve our AI models.</p>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100">
                  <p className="text-sm text-gray-700 leading-relaxed flex items-start gap-2">
                    <Icons.Lock size={16} className="text-blue-600 mt-0.5 shrink-0" />
                    <span>All data is encrypted and stored securely. We do not share your personal data with third parties without your consent.</span>
                  </p>
                </div>
              </div>
          </div>

          {/* AI Usage Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-bl-full opacity-50 group-hover:opacity-70 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-md">
                    <Icons.Sparkles size={20} className="text-white" />
                  </div>
                  <h3 className="font-black text-gray-900 text-lg">3. AI Usage</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">Our AI tutor uses advanced language models to simulate conversation. While we strive for accuracy, AI responses may occasionally be incorrect or inappropriate. Please use discretion.</p>
              </div>
          </div>

          {/* Subscription Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-amber-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-bl-full opacity-50 group-hover:opacity-70 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-md">
                    <Icons.Crown size={20} className="text-white" />
                  </div>
                  <h3 className="font-black text-gray-900 text-lg">4. Subscription</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">Premium features require a subscription. You can cancel at any time via your account settings.</p>
              </div>
          </div>

          {/* Last Updated */}
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-4 border border-gray-200 text-center">
              <p className="text-xs text-gray-500 font-medium flex items-center justify-center gap-2">
                <Icons.Calendar size={14} className="text-gray-400" />
                Last updated: August 1, 2024
              </p>
          </div>
      </div>
    </div>
  );
};

export default Terms;
