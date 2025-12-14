
import React from 'react';
import * as Icons from '../components/Icons';
import { GradientBackground, FloatingShapes, AnimatedCard, MotivationalMessage } from '../components/AnimatedComponents';

const Settings: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="h-full flex flex-col pb-24 relative overflow-hidden">
      <GradientBackground variant="blue" />
      <FloatingShapes />
      
      <div className="bg-white/95 backdrop-blur-md p-4 flex items-center gap-4 shadow-xl sticky top-0 z-10 shrink-0 border-b-2 border-white/50">
          <button onClick={onBack} className="p-2 hover:bg-blue-50 rounded-full transition-all hover-lift">
            <Icons.ChevronRight className="rotate-180 text-gray-700" size={24} strokeWidth={3} />
          </button>
          <h2 className="font-black text-gray-900 text-xl">⚙️ Settings</h2>
      </div>

      <div className="p-6 space-y-6 flex-1 overflow-y-auto custom-scrollbar relative z-10">
          <MotivationalMessage message="Customize your learning experience! 🎨" />
          
          {/* Notifications */}
          <AnimatedCard variant="white" className="p-6">
              <h3 className="font-black text-gray-900 mb-5 flex items-center gap-2 text-lg">
                <Icons.Bell size={22} className="text-blue-600" /> 🔔 Notifications
              </h3>
              <div className="space-y-5">
                  <div className="flex items-center justify-between">
                      <div>
                        <span className="text-base font-bold text-gray-800">Daily Reminders</span>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">Get notified to practice daily</p>
                      </div>
                      <div className="w-14 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full relative cursor-pointer shadow-lg hover-lift">
                        <div className="w-6 h-6 bg-white rounded-full absolute top-1 right-1 shadow-md"></div>
                      </div>
                  </div>
                   <div className="flex items-center justify-between">
                      <div>
                        <span className="text-base font-bold text-gray-800">Tutor Updates</span>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">News about your tutors</p>
                      </div>
                      <div className="w-14 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full relative cursor-pointer shadow-lg hover-lift">
                        <div className="w-6 h-6 bg-white rounded-full absolute top-1 right-1 shadow-md"></div>
                      </div>
                  </div>
                   <div className="flex items-center justify-between">
                      <div>
                        <span className="text-base font-bold text-gray-800">New Challenges</span>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">Weekly challenge alerts</p>
                      </div>
                      <div className="w-14 h-8 bg-gray-200 rounded-full relative cursor-pointer shadow-lg hover-lift">
                        <div className="w-6 h-6 bg-white rounded-full absolute top-1 left-1 shadow-md"></div>
                      </div>
                  </div>
              </div>
          </AnimatedCard>

          {/* App Settings */}
           <AnimatedCard variant="white" className="p-6">
              <h3 className="font-black text-gray-900 mb-5 flex items-center gap-2 text-lg">
                <Icons.Settings size={22} className="text-purple-600" /> 🎯 General
              </h3>
              <div className="space-y-5">
                  <div className="flex items-center justify-between">
                      <div>
                        <span className="text-base font-bold text-gray-800">Language</span>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">App interface language</p>
                      </div>
                      <span className="text-base text-blue-600 font-black px-4 py-2 bg-blue-50 rounded-xl border-2 border-blue-200">English 🇺🇸</span>
                  </div>
                   <div className="flex items-center justify-between">
                      <div>
                        <span className="text-base font-bold text-gray-800">Dark Mode</span>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">Coming soon!</p>
                      </div>
                      <div className="w-14 h-8 bg-gray-200 rounded-full relative cursor-pointer shadow-lg hover-lift">
                        <div className="w-6 h-6 bg-white rounded-full absolute top-1 left-1 shadow-md"></div>
                      </div>
                  </div>
              </div>
          </AnimatedCard>

           {/* Danger Zone */}
           <AnimatedCard variant="white" className="p-6 border-2 border-red-200">
              <h3 className="font-black text-red-600 mb-4 text-lg flex items-center gap-2">
                ⚠️ Account Actions
              </h3>
              <div className="space-y-3">
                <button className="text-sm text-red-600 font-bold w-full text-left py-3 px-4 hover:bg-red-50 rounded-xl transition-all hover-lift flex items-center gap-2">
                  <Icons.Trash2 size={16} /> Delete Account
                </button>
                <button className="text-sm text-gray-600 font-bold w-full text-left py-3 px-4 hover:bg-gray-50 rounded-xl transition-all hover-lift flex items-center gap-2">
                  <Icons.Download size={16} /> Export My Data
                </button>
              </div>
          </AnimatedCard>
      </div>
    </div>
  );
};

export default Settings;
