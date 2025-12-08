
import React from 'react';
import * as Icons from '../components/Icons';

const Profile: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="h-full bg-gray-50 flex flex-col pb-24">
      {/* Custom Header */}
      <div className="bg-white p-4 flex items-center justify-between shadow-sm sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors"><Icons.ChevronRight className="rotate-180 text-gray-600" size={24} /></button>
            <h2 className="font-bold text-gray-900 text-lg">My Profile</h2>
          </div>
          <button className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:bg-blue-50 px-3 py-1.5 rounded-full transition-colors">
              <Icons.Share2 size={16} /> Share
          </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Hero Section */}
          <div className="bg-white pb-8 pt-6 px-6 border-b border-gray-100 flex flex-col items-center relative">
              <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-purple-500 mb-4 relative group">
                  <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-gray-200">
                     <img src="https://picsum.photos/200/200?random=8" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  {/* Removed Settings Icon and Level Badge as requested */}
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Amira Mahmoud</h1>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                  <Icons.MapPin size={14} /> Cairo, Egypt
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>Joined Oct 2023</span>
              </div>

              {/* Follow Stats */}
              <div className="flex items-center gap-8 mb-2">
                  <div className="text-center">
                      <div className="font-bold text-gray-900 text-lg">142</div>
                      <div className="text-xs text-gray-400 font-medium">Following</div>
                  </div>
                  <div className="w-px h-8 bg-gray-100"></div>
                  <div className="text-center">
                      <div className="font-bold text-gray-900 text-lg">3.5k</div>
                      <div className="text-xs text-gray-400 font-medium">Followers</div>
                  </div>
                  <div className="w-px h-8 bg-gray-100"></div>
                  <div className="text-center">
                      <div className="font-bold text-gray-900 text-lg">Top 5%</div>
                      <div className="text-xs text-gray-400 font-medium">Ranking</div>
                  </div>
              </div>
          </div>

          <div className="p-5 space-y-6">
              {/* Main Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-3 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-3 opacity-10">
                          <Icons.Flame size={48} className="text-orange-500" />
                      </div>
                      <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500">
                          <Icons.Flame size={20} fill="currentColor" />
                      </div>
                      <div>
                          <div className="text-2xl font-bold text-gray-900">12</div>
                          <div className="text-xs text-gray-500 font-bold uppercase tracking-wide">Day Streak</div>
                      </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-3 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-3 opacity-10">
                          <Icons.Zap size={48} className="text-yellow-500" />
                      </div>
                      <div className="w-10 h-10 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600">
                          <Icons.Zap size={20} fill="currentColor" />
                      </div>
                      <div>
                          <div className="text-2xl font-bold text-gray-900">1.2k</div>
                          <div className="text-xs text-gray-500 font-bold uppercase tracking-wide">Total XP</div>
                      </div>
                  </div>
              </div>

              {/* Statistics Grid */}
              <div>
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Statistics</h3>
                  <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
                      <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                           <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                   <Icons.Target size={18} />
                               </div>
                               <div>
                                   <div className="font-bold text-gray-900 text-lg">B2</div>
                                   <div className="text-xs text-gray-500">Current Level</div>
                               </div>
                           </div>
                           <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                                   <Icons.Clock size={18} />
                               </div>
                               <div>
                                   <div className="font-bold text-gray-900 text-lg">42h</div>
                                   <div className="text-xs text-gray-500">Practice Time</div>
                               </div>
                           </div>
                           <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                   <Icons.BookOpen size={18} />
                               </div>
                               <div>
                                   <div className="font-bold text-gray-900 text-lg">350</div>
                                   <div className="text-xs text-gray-500">Words Learned</div>
                               </div>
                           </div>
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-600">
                                   <Icons.Layers size={18} />
                               </div>
                               <div>
                                   <div className="font-bold text-gray-900 text-lg">12</div>
                                   <div className="text-xs text-gray-500">Levels Done</div>
                               </div>
                           </div>
                      </div>
                  </div>
              </div>

              {/* Recent Achievements */}
              <div>
                   <div className="flex justify-between items-center mb-4">
                       <h3 className="font-bold text-gray-900 text-lg">Recent Badges</h3>
                       <button className="text-blue-600 text-sm font-bold">View All</button>
                   </div>
                   <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                       {[
                           { name: 'Early Bird', icon: '☀️', color: 'bg-orange-100' },
                           { name: 'Scholar', icon: '🎓', color: 'bg-blue-100' },
                           { name: 'Friendly', icon: '🤝', color: 'bg-green-100' },
                           { name: 'Sharpshooter', icon: '🎯', color: 'bg-red-100' }
                       ].map((badge, i) => (
                           <div key={i} className="min-w-[100px] bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center gap-2">
                               <div className={`w-14 h-14 ${badge.color} rounded-full flex items-center justify-center text-2xl`}>
                                   {badge.icon}
                               </div>
                               <span className="text-xs font-bold text-gray-700 text-center">{badge.name}</span>
                           </div>
                       ))}
                   </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Profile;
