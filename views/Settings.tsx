
import React from 'react';
import * as Icons from '../components/Icons';

const Settings: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="h-full bg-gray-50 flex flex-col pb-24">
      <div className="bg-white p-4 flex items-center gap-4 shadow-sm sticky top-0 z-10 shrink-0">
          <button onClick={onBack}><Icons.ChevronRight className="rotate-180 text-gray-600" /></button>
          <h2 className="font-bold text-gray-900">Settings</h2>
      </div>

      <div className="p-5 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
          
          {/* Notifications */}
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Icons.Bell size={18} /> Notifications</h3>
              <div className="space-y-4">
                  <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Daily Reminders</span>
                      <div className="w-11 h-6 bg-blue-600 rounded-full relative cursor-pointer"><div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div></div>
                  </div>
                   <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Tutor Updates</span>
                      <div className="w-11 h-6 bg-blue-600 rounded-full relative cursor-pointer"><div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div></div>
                  </div>
                   <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">New Challenges</span>
                      <div className="w-11 h-6 bg-gray-200 rounded-full relative cursor-pointer"><div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div></div>
                  </div>
              </div>
          </div>

          {/* App Settings */}
           <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Icons.Settings size={18} /> General</h3>
              <div className="space-y-4">
                  <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Language</span>
                      <span className="text-sm text-blue-600 font-medium">English</span>
                  </div>
                   <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Dark Mode</span>
                      <div className="w-11 h-6 bg-gray-200 rounded-full relative cursor-pointer"><div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div></div>
                  </div>
              </div>
          </div>

           {/* Danger Zone */}
           <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-red-600 mb-4">Account Actions</h3>
              <button className="text-sm text-red-500 font-medium w-full text-left py-2">Delete Account</button>
              <button className="text-sm text-gray-500 font-medium w-full text-left py-2">Export My Data</button>
          </div>
      </div>
    </div>
  );
};

export default Settings;
