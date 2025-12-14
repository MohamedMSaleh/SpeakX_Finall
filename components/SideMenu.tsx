
import React, { useState } from 'react';
import * as Icons from './Icons';
import { View } from '../types';
import { AnimatedBadge } from './AnimatedComponents';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  setView: (view: View) => void;
  isDesktop?: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, setView, isDesktop = false }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleNav = (view: View) => {
    setView(view);
    if (!isDesktop) onClose();
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    setView(View.SIGN_IN);
    if (!isDesktop) onClose();
  };

  // Content for the menu to reuse in both modes
  const MenuContent = () => (
    <div className="flex flex-col h-full bg-white">
        {/* Profile Header */}
        <div className={`bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 p-6 text-white ${isDesktop ? 'pt-8' : 'pt-12'} relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-400/20 rounded-full -ml-8 -mb-8 blur-2xl"></div>
          
          <div className="relative z-10 flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full border-4 border-white/40 shadow-2xl overflow-hidden relative shrink-0 bg-gradient-to-br from-white/20 to-transparent">
               <img src="https://picsum.photos/200/200?random=8" alt="Profile" className="w-full h-full object-cover" />
               <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-400 border-4 border-blue-900 rounded-full animate-pulse"></div>
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-xl truncate mb-1">Amira M.</h3>
              <p className="text-blue-100 text-sm truncate">amira@example.com</p>
            </div>
          </div>
          <div className="relative z-10 flex flex-wrap gap-2 text-sm">
             <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-lg border border-white/10">
                <Icons.Zap size={14} className="text-yellow-400 fill-current" />
                <span className="font-bold text-xs">1,250</span>
             </div>
             <div className="bg-blue-800/50 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                <Icons.Flame size={14} className="text-orange-500 fill-current" />
                <span className="font-bold text-xs">12</span>
             </div>
             <div className="bg-blue-800/50 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                <Icons.Shield size={14} className="text-blue-300" />
                <span className="font-bold text-xs">Pro</span>
             </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          
          {/* Desktop Only: Main Nav Items usually found in bottom bar on mobile */}
          {isDesktop && (
            <>
               <button onClick={() => handleNav(View.DASHBOARD)} className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl text-gray-700 transition-colors">
                <Icons.Home size={20} className="text-gray-500" />
                <span className="font-medium">Home</span>
              </button>
              <button onClick={() => handleNav(View.ROADMAP)} className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl text-gray-700 transition-colors">
                <Icons.Map size={20} className="text-gray-500" />
                <span className="font-medium">Plan</span>
              </button>
              <button onClick={() => handleNav(View.CHALLENGES)} className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl text-gray-700 transition-colors">
                <Icons.Zap size={20} className="text-gray-500" />
                <span className="font-medium">Challenges</span>
              </button>
              <button onClick={() => handleNav(View.TUTORS)} className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl text-gray-700 transition-colors">
                <Icons.GraduationCap size={20} className="text-gray-500" />
                <span className="font-medium">Tutor</span>
              </button>
              <button onClick={() => handleNav(View.ROOMS)} className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl text-gray-700 transition-colors">
                <Icons.Users size={20} className="text-gray-500" />
                <span className="font-medium">Rooms</span>
              </button>
              <div className="h-px bg-gray-100 my-2 mx-3"></div>
            </>
          )}

          <button onClick={() => handleNav(View.PROFILE)} className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl text-gray-700 transition-colors">
            <Icons.UserCircle size={20} className="text-gray-500" />
            <span className="font-medium">Profile</span>
          </button>
          
          <button onClick={() => handleNav(View.CAREER_HUB)} className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl text-gray-700 transition-colors">
            <Icons.Briefcase size={20} className="text-gray-500" />
            <span className="font-medium">Career Hub</span>
          </button>

          <button onClick={() => handleNav(View.FRIENDS)} className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl text-gray-700 transition-colors">
            <Icons.Users size={20} className="text-gray-500" />
            <span className="font-medium">Friends</span>
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

          <button onClick={handleLogoutClick} className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-xl text-red-600 transition-colors">
            <Icons.LogOut size={20} />
            <span className="font-medium">Log Out</span>
          </button>
        </div>

        <div className="p-4 text-center border-t border-gray-100">
           <p className="text-xs text-gray-400">SpeakX v2.4.0</p>
        </div>
    </div>
  );

  // Desktop Static Sidebar
  if (isDesktop) {
    return (
      <div className="h-full w-full">
        <MenuContent />
        {showLogoutConfirm && <LogoutModal onClose={() => setShowLogoutConfirm(false)} onLogout={confirmLogout} />}
      </div>
    );
  }

  // Mobile Drawer (Fixed overlay)
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 transition-opacity backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 left-0 bottom-0 w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <MenuContent />
        {showLogoutConfirm && <LogoutModal onClose={() => setShowLogoutConfirm(false)} onLogout={confirmLogout} />}
      </div>
    </>
  );
};

// Separated Modal Component
const LogoutModal = ({ onClose, onLogout }: { onClose: () => void, onLogout: () => void }) => (
    <div className="absolute inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl p-6 w-full max-w-[280px] shadow-2xl transform scale-100 animate-in zoom-in-95 duration-200 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                <Icons.LogOut size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Log Out?</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">Are you sure you want to sign out?</p>
            <div className="flex gap-3">
                <button 
                    onClick={onClose} 
                    className="flex-1 py-3 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
                >
                    Cancel
                </button>
                <button 
                    onClick={onLogout} 
                    className="flex-1 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200 transition-colors text-sm"
                >
                    Yes, Logout
                </button>
            </div>
        </div>
    </div>
);

export default SideMenu;
