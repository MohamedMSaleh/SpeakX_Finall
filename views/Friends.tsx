
import React, { useState } from 'react';
import * as Icons from '../components/Icons';
import { GradientBackground, FloatingShapes, AnimatedCard, AnimatedBadge, MotivationalMessage } from '../components/AnimatedComponents';

interface User {
  id: number;
  name: string;
  avatar: string;
  level: string;
  status?: 'online' | 'offline';
  isFriend?: boolean;
}

interface FriendsProps {
  onBack: () => void;
  onProfileClick: (user: User) => void;
}

const Friends: React.FC<FriendsProps> = ({ onBack, onProfileClick }) => {
  const [activeTab, setActiveTab] = useState<'my_friends' | 'find' | 'requests'>('my_friends');
  const [searchQuery, setSearchQuery] = useState('');

  const myFriends: User[] = [
    { id: 1, name: 'Sarah Ahmed', avatar: 'https://picsum.photos/100/100?random=1', level: 'B2', status: 'online' },
    { id: 2, name: 'Omar Hassan', avatar: 'https://picsum.photos/100/100?random=2', level: 'C1', status: 'offline' },
    { id: 3, name: 'John Doe', avatar: 'https://picsum.photos/100/100?random=3', level: 'A2', status: 'online' },
  ];

  const suggestedFriends: User[] = [
    { id: 4, name: 'Emily Chen', avatar: 'https://picsum.photos/100/100?random=4', level: 'B1', isFriend: false },
    { id: 5, name: 'Michael Brown', avatar: 'https://picsum.photos/100/100?random=5', level: 'B2', isFriend: false },
    { id: 6, name: 'Jessica Lee', avatar: 'https://picsum.photos/100/100?random=6', level: 'C1', isFriend: false },
  ];

  const requests: User[] = [
     { id: 7, name: 'David Kim', avatar: 'https://picsum.photos/100/100?random=7', level: 'B1' },
  ];

  return (
    <div className="h-full flex flex-col pb-24 relative overflow-hidden">
      <GradientBackground variant="green" />
      <FloatingShapes />
      
      <div className="bg-white/95 backdrop-blur-md p-4 flex items-center gap-4 shadow-xl sticky top-0 z-10 shrink-0 border-b-2 border-white/50">
          <button onClick={onBack} className="p-2 hover:bg-green-50 rounded-full transition-all hover-lift">
            <Icons.ChevronRight className="rotate-180 text-gray-700" size={24} strokeWidth={3} />
          </button>
          <h2 className="font-black text-gray-900 text-xl">👥 Friends</h2>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
          {/* Tabs */}
          <div className="bg-white/90 backdrop-blur-md px-4 pt-2 pb-0 border-b border-gray-100 flex gap-6">
              <button 
                onClick={() => setActiveTab('my_friends')}
                className={`pb-3 text-sm font-black border-b-4 transition-all ${activeTab === 'my_friends' ? 'text-green-600 border-green-600' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
              >
                  💚 My Friends
              </button>
              <button 
                onClick={() => setActiveTab('find')}
                className={`pb-3 text-sm font-black border-b-4 transition-all ${activeTab === 'find' ? 'text-green-600 border-green-600' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
              >
                  🔍 Find Friends
              </button>
               <button 
                onClick={() => setActiveTab('requests')}
                className={`pb-3 text-sm font-black border-b-4 transition-all relative ${activeTab === 'requests' ? 'text-green-600 border-green-600' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
              >
                  📬 Requests
                  {requests.length > 0 && <AnimatedBadge variant="error" className="absolute -top-1 -right-6 text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse-glow">{requests.length}</AnimatedBadge>}
              </button>
          </div>

          <div className="p-6 space-y-4">
              {activeTab === 'find' && (
                  <>
                    <MotivationalMessage message="Find friends and learn together! 🤝" />
                    <div className="relative mb-4">
                          <Icons.Search className="absolute left-5 top-4 text-gray-400" size={22} />
                          <input 
                              type="text" 
                              placeholder="Search by name or email..." 
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full bg-white/90 backdrop-blur-md border-2 border-gray-200 rounded-2xl pl-14 pr-5 py-4 text-base font-medium outline-none focus:ring-4 focus:ring-green-200 focus:border-green-400 shadow-xl transition-all"
                          />
                    </div>
                  </>
              )}

              {activeTab === 'my_friends' && (
                  <div className="space-y-3">
                      <MotivationalMessage message="Your learning community! 🌟" />
                      {myFriends.map((friend, index) => (
                          <AnimatedCard key={friend.id} variant="white" className="p-5 flex items-center justify-between cursor-pointer hover-lift border-2 border-gray-100 animate-slideUp" style={{ animationDelay: `${index * 0.1}s` }} onClick={() => onProfileClick(friend)}>
                              <div className="flex items-center gap-4">
                                  <div className="relative">
                                      <img src={friend.avatar} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg" alt={friend.name} />
                                      {friend.status === 'online' && <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse-glow"></div>}
                                  </div>
                                  <div>
                                      <h4 className="font-black text-gray-900 text-base">{friend.name}</h4>
                                      <AnimatedBadge variant="primary" className="text-xs px-2 py-1 mt-1">{friend.level}</AnimatedBadge>
                                  </div>
                              </div>
                              <button className="p-2.5 bg-red-50 rounded-full text-red-400 hover:text-red-600 hover:bg-red-100 transition-all hover-lift" onClick={(e) => { e.stopPropagation(); /* Remove logic */ }}>
                                  <Icons.UserMinus size={20} strokeWidth={2.5} />
                              </button>
                          </AnimatedCard>
                      ))}
                  </div>
              )}

               {activeTab === 'find' && (
                  <div className="space-y-3">
                      <h3 className="font-bold text-gray-900 text-sm mb-2">Suggested for you</h3>
                      {suggestedFriends.map(friend => (
                          <div key={friend.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer" onClick={() => onProfileClick(friend)}>
                              <div className="flex items-center gap-3">
                                  <img src={friend.avatar} className="w-12 h-12 rounded-full object-cover" alt={friend.name} />
                                  <div>
                                      <h4 className="font-bold text-gray-900 text-sm">{friend.name}</h4>
                                      <span className="text-xs text-gray-500 font-medium">Level {friend.level}</span>
                                  </div>
                              </div>
                              <button 
                                className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-blue-700 shadow-sm"
                                onClick={(e) => { e.stopPropagation(); /* Add logic */ }}
                              >
                                  <Icons.UserPlus size={16} /> Add
                              </button>
                          </div>
                      ))}
                  </div>
              )}

              {activeTab === 'requests' && (
                  <div className="space-y-3">
                      {requests.length > 0 ? requests.map(user => (
                          <div key={user.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                               <div className="flex items-center gap-3">
                                  <img src={user.avatar} className="w-12 h-12 rounded-full object-cover" alt={user.name} />
                                  <div>
                                      <h4 className="font-bold text-gray-900 text-sm">{user.name}</h4>
                                      <span className="text-xs text-gray-500">Wants to be your friend</span>
                                  </div>
                              </div>
                              <div className="flex gap-2">
                                  <button className="bg-green-500 text-white p-2 rounded-xl shadow-sm hover:bg-green-600">
                                      <Icons.Check size={18} />
                                  </button>
                                   <button className="bg-gray-200 text-gray-500 p-2 rounded-xl hover:bg-gray-300">
                                      <Icons.X size={18} />
                                  </button>
                              </div>
                          </div>
                      )) : (
                          <div className="text-center py-10 text-gray-500 text-sm">No new requests</div>
                      )}
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};

export default Friends;