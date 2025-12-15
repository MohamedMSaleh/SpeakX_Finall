
import React from 'react';
import * as Icons from '../components/Icons';

const Settings: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="h-full flex flex-col pb-24 relative overflow-hidden">
      {/* Modern gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #F9FAFB 0%, #EEF2FF 50%, #E0E7FF 100%)'
        }}
      />
      
      {/* Decorative floating shapes */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-48 h-48 bg-purple-200/20 rounded-full blur-2xl" />
      
      {/* Header with gradient */}
      <div 
        className="relative z-10 p-4 flex items-center gap-4 sticky top-0 backdrop-blur-xl border-b border-white/20"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(238,242,255,0.95) 100%)'
        }}
      >
        <button 
          onClick={onBack}
          className="p-2.5 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 border border-blue-100/50"
        >
          <Icons.ChevronRight className="rotate-180 text-blue-600" />
        </button>
        <h2 className="font-black text-gray-900 text-xl flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Icons.Settings size={18} className="text-white" />
          </div>
          Settings
        </h2>
      </div>

      <div className="relative z-10 p-5 space-y-5 flex-1 overflow-y-auto custom-scrollbar">
          
          {/* Notifications Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-bl-full opacity-50 group-hover:opacity-70 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-md">
                    <Icons.Bell size={20} className="text-white" />
                  </div>
                  <h3 className="font-black text-gray-900 text-lg">Notifications</h3>
                </div>
                
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <Icons.Calendar size={18} className="text-blue-600" />
                          </div>
                          <span className="text-sm font-bold text-gray-700">Daily Reminders</span>
                        </div>
                        <div className="w-12 h-7 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full relative cursor-pointer shadow-md">
                          <div className="w-6 h-6 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <Icons.GraduationCap size={18} className="text-emerald-600" />
                          </div>
                          <span className="text-sm font-bold text-gray-700">Tutor Updates</span>
                        </div>
                        <div className="w-12 h-7 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full relative cursor-pointer shadow-md">
                          <div className="w-6 h-6 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <Icons.Zap size={18} className="text-gray-400" />
                          </div>
                          <span className="text-sm font-bold text-gray-700">New Challenges</span>
                        </div>
                        <div className="w-12 h-7 bg-gray-200 rounded-full relative cursor-pointer">
                          <div className="w-6 h-6 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                        </div>
                    </div>
                </div>
              </div>
          </div>

          {/* General Settings */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-bl-full opacity-50 group-hover:opacity-70 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-md">
                    <Icons.Settings size={20} className="text-white" />
                  </div>
                  <h3 className="font-black text-gray-900 text-lg">General</h3>
                </div>
                
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <Icons.Globe size={18} className="text-purple-600" />
                          </div>
                          <span className="text-sm font-bold text-gray-700">Language</span>
                        </div>
                        <span className="text-sm font-black text-purple-600 bg-white px-3 py-1.5 rounded-xl shadow-sm">English</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <Icons.Moon size={18} className="text-indigo-600" />
                          </div>
                          <span className="text-sm font-bold text-gray-700">Dark Mode</span>
                        </div>
                        <div className="w-12 h-7 bg-gray-200 rounded-full relative cursor-pointer">
                          <div className="w-6 h-6 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                        </div>
                    </div>
                </div>
              </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-red-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-100 to-rose-100 rounded-bl-full opacity-50 group-hover:opacity-70 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-md">
                    <Icons.AlertCircle size={20} className="text-white" />
                  </div>
                  <h3 className="font-black text-red-600 text-lg">Account Actions</h3>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full text-left p-3 bg-gradient-to-r from-red-50 to-rose-50 hover:from-red-100 hover:to-rose-100 rounded-2xl transition-all duration-300 group/btn flex items-center gap-3 border border-red-100">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover/btn:scale-110 transition-transform">
                      <Icons.Download size={18} className="text-red-600" />
                    </div>
                    <span className="text-sm font-bold text-red-600">Export My Data</span>
                  </button>
                  
                  <button className="w-full text-left p-3 bg-gradient-to-r from-red-50 to-rose-50 hover:from-red-100 hover:to-rose-100 rounded-2xl transition-all duration-300 group/btn flex items-center gap-3 border border-red-100">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover/btn:scale-110 transition-transform">
                      <Icons.X size={18} className="text-red-600" />
                    </div>
                    <span className="text-sm font-bold text-red-600">Delete Account</span>
                  </button>
                </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Settings;
