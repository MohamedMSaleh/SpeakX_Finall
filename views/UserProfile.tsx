
import React, { useState } from 'react';
import * as Icons from '../components/Icons';

interface UserProfileProps {
  user: any;
  onBack: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onBack }) => {
  // Mock data fallback if user is minimal
  const profileData = {
    name: user?.name || 'Unknown User',
    avatar: user?.avatar || 'https://picsum.photos/200/200',
    level: user?.level || 'B1',
    joined: 'Sep 2023',
    location: 'Madrid, Spain',
    isFriend: false, // In real app, check against friends list
    stats: {
        streak: 5,
        xp: 850,
        followers: 120,
        following: 45
    }
  };

  const [isFriend, setIsFriend] = useState(profileData.isFriend);

  const toggleFriend = () => {
      setIsFriend(!isFriend);
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col pb-24">
      <div className="bg-white p-4 flex items-center justify-between shadow-sm sticky top-0 z-10 shrink-0">
          <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors"><Icons.ChevronRight className="rotate-180 text-gray-600" size={24} /></button>
          <h2 className="font-bold text-gray-900 text-lg">Profile</h2>
          <button className="p-1 hover:bg-gray-100 rounded-full text-gray-600">
              <Icons.MoreVertical size={24} />
          </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Hero Section */}
          <div className="bg-white pb-8 pt-6 px-6 border-b border-gray-100 flex flex-col items-center">
              <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-gray-200 to-gray-400 mb-4">
                  <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-gray-200">
                     <img src={profileData.avatar} alt="Profile" className="w-full h-full object-cover" />
                  </div>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{profileData.name}</h1>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                  <Icons.MapPin size={14} /> {profileData.location}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 w-full max-w-xs mb-6">
                  <button 
                    onClick={toggleFriend}
                    className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                        isFriend 
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
                    }`}
                  >
                      {isFriend ? <><Icons.UserCheck size={18} /> Friends</> : <><Icons.UserPlus size={18} /> Add Friend</>}
                  </button>
                  <button className="flex-1 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">
                      Message
                  </button>
              </div>

              {/* Follow Stats */}
              <div className="flex items-center gap-8 w-full justify-center">
                  <div className="text-center">
                      <div className="font-bold text-gray-900 text-lg">{profileData.stats.following}</div>
                      <div className="text-xs text-gray-400 font-medium">Following</div>
                  </div>
                  <div className="w-px h-8 bg-gray-100"></div>
                  <div className="text-center">
                      <div className="font-bold text-gray-900 text-lg">{profileData.stats.followers}</div>
                      <div className="text-xs text-gray-400 font-medium">Followers</div>
                  </div>
              </div>
          </div>

          <div className="p-5 space-y-6">
               <h3 className="font-bold text-gray-900 text-lg">Stats</h3>
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500">
                          <Icons.Flame size={24} fill="currentColor" />
                      </div>
                      <div>
                          <div className="text-xl font-bold text-gray-900">{profileData.stats.streak}</div>
                          <div className="text-xs text-gray-500 font-medium">Day Streak</div>
                      </div>
                  </div>
                  <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600">
                          <Icons.Zap size={24} fill="currentColor" />
                      </div>
                      <div>
                          <div className="text-xl font-bold text-gray-900">{profileData.stats.xp}</div>
                          <div className="text-xs text-gray-500 font-medium">Total XP</div>
                      </div>
                  </div>
               </div>

               <h3 className="font-bold text-gray-900 text-lg">Badges</h3>
               <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
                   <div className="flex gap-4 overflow-x-auto hide-scrollbar">
                       {[1,2,3].map(i => (
                           <div key={i} className="flex flex-col items-center min-w-[80px]">
                               <div className="w-16 h-16 bg-gray-100 rounded-full mb-2 flex items-center justify-center text-2xl grayscale opacity-70">🏆</div>
                               <span className="text-xs font-medium text-gray-400">Locked</span>
                           </div>
                       ))}
                   </div>
               </div>
          </div>
      </div>
    </div>
  );
};

export default UserProfile;