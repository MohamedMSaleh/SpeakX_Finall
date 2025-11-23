
import React from 'react';
import * as Icons from './Icons';
import { View } from '../types';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  setView: (view: View) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, setView }) => {
  const handleNav = (view: View) => {
    setView(view);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 transition-opacity backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 left-0 bottom-0 w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Profile Header */}
        <div className="bg-blue-900 p-6 text-white pt-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full border-2 border-white/30 overflow-hidden relative">
               <img src="https://picsum.photos/200/200?random=8" alt="Profile" className="w-full h-full object-cover" />
               <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-blue-900 rounded-full"></div>
            </div>
            <div>
              <h3 className="font-bold text-lg">Amira Mahmoud</h3>
              <p className="text-blue-200 text-sm">amira@example.com</p>
            </div>
          </div>
          <div className="flex gap-4 text-sm">
             <div className="bg-blue-800/50 px-3 py-1 rounded-lg flex items-center gap-2">
                <Icons.Zap size={14} className="text-yellow-400 fill-current" />
                <span className="font-bold">1,250</span>
             </div>
             <div className="bg-blue-800/50 px-3 py-1 rounded-lg flex items-center gap-2">
                <Icons.Shield size={14} className="text-blue-300" />
                <span className="font-bold">Premium</span>
             </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
          {/* Removed Home, Plan, Challenges as they are in Bottom Nav */}

          <button onClick={() => handleNav(View.PROFILE)} className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl text-gray-700 transition-colors">
            <Icons.UserCircle size={20} className="text-gray-500" />
            <span className="font-medium">Profile</span>
          </button>
          <button onClick={() => handleNav(View.SUBSCRIPTION)} className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl text-gray-700 transition-colors">
            <Icons.CreditCard size={20} className="text-gray-500" />
            <span className="font-medium">Subscription</span>
          </button>
          <button onClick={() => handleNav(View.SETTINGS)} className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl text-gray-700 transition-colors">
            <Icons.Settings size={20} className="text-gray-500" />
            <span className="font-medium">Settings</span>
          </button>
          <button onClick={() => handleNav(View.TERMS)} className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl text-gray-700 transition-colors">
            <Icons.FileText size={20} className="text-gray-500" />
            <span className="font-medium">Terms & Privacy</span>
          </button>
          <button onClick={() => handleNav(View.SUPPORT)} className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl text-gray-700 transition-colors">
            <Icons.HelpCircle size={20} className="text-gray-500" />
            <span className="font-medium">Help & Support</span>
          </button>

          <div className="h-px bg-gray-100 my-2 mx-3"></div>

          <button className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-xl text-red-600 transition-colors">
            <Icons.LogOut size={20} />
            <span className="font-medium">Log Out</span>
          </button>
        </div>

        <div className="absolute bottom-6 left-0 right-0 text-center">
           <p className="text-xs text-gray-400">SpeakX v2.4.0</p>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
