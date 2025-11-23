
import React from 'react';
import * as Icons from '../components/Icons';

const Profile: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="h-full bg-gray-50 flex flex-col pb-24">
      <div className="bg-white p-4 flex items-center gap-4 shadow-sm sticky top-0 z-10 shrink-0">
          <button onClick={onBack}><Icons.ChevronRight className="rotate-180 text-gray-600" /></button>
          <h2 className="font-bold text-gray-900">My Profile</h2>
      </div>

      <div className="p-5 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden relative mb-4">
                 <img src="https://picsum.photos/200/200?random=8" alt="Profile" className="w-full h-full object-cover" />
                 <button className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white border-2 border-white">
                     <Icons.Settings size={14} />
                 </button>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Amira Mahmoud</h2>
              <p className="text-gray-500 text-sm">Cairo, Egypt</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded-2xl border border-gray-100 text-center shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold">Streak</div>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-gray-100 text-center shadow-sm">
                  <div className="text-2xl font-bold text-yellow-500">1.2k</div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold">Points</div>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-gray-100 text-center shadow-sm">
                  <div className="text-2xl font-bold text-green-500">B2</div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold">Level</div>
              </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <span className="text-sm text-gray-500">Full Name</span>
                  <span className="text-sm font-bold text-gray-900">Amira Mahmoud</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <span className="text-sm text-gray-500">Email</span>
                  <span className="text-sm font-bold text-gray-900">amira@example.com</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <span className="text-sm text-gray-500">Native Language</span>
                  <span className="text-sm font-bold text-gray-900">Arabic</span>
              </div>
               <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Learning Goal</span>
                  <span className="text-sm font-bold text-gray-900">Career Advancement</span>
              </div>
          </div>
          
           <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
               <h3 className="font-bold text-gray-900 mb-4">Badges</h3>
               <div className="flex gap-4 overflow-x-auto hide-scrollbar">
                   {[1,2,3].map(i => (
                       <div key={i} className="flex flex-col items-center min-w-[80px]">
                           <div className="w-16 h-16 bg-gray-100 rounded-full mb-2 flex items-center justify-center text-2xl">🏅</div>
                           <span className="text-xs font-medium text-gray-600">Early Bird</span>
                       </div>
                   ))}
               </div>
           </div>
      </div>
    </div>
  );
};

export default Profile;
