
import React, { useState } from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';

const Challenges: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'quests' | 'badges'>('leaderboard');
  const [claimedBadges, setClaimedBadges] = useState<number[]>([]);
  const [dailyQuests, setDailyQuests] = useState([
      { id: 101, title: 'Speak for 5 minutes', progress: 3, total: 5, reward: 20, completed: false, claimed: false, icon: <Icons.Mic size={20} /> },
      { id: 102, title: 'Complete 1 Practice Session', progress: 0, total: 1, reward: 15, completed: false, claimed: false, icon: <Icons.PlayCircle size={20} /> },
      { id: 103, title: 'Score 90% in Pronunciation', progress: 1, total: 1, reward: 50, completed: true, claimed: false, icon: <Icons.Star size={20} /> },
      { id: 104, title: 'Learn 10 New Words', progress: 4, total: 10, reward: 30, completed: false, claimed: false, icon: <Icons.BookOpen size={20} /> },
      { id: 105, title: 'Start a Conversation', progress: 0, total: 1, reward: 25, completed: false, claimed: false, icon: <Icons.MessageSquare size={20} /> },
      { id: 106, title: 'Complete a Daily Challenge', progress: 0, total: 1, reward: 40, completed: false, claimed: false, icon: <Icons.Zap size={20} /> },
      { id: 107, title: 'Listen to a Story', progress: 0, total: 1, reward: 10, completed: false, claimed: false, icon: <Icons.Headphones size={20} /> },
  ]);

  // Mock Data for Leaderboard
  const leaderboardData = [
    { rank: 1, name: 'Sarah Ahmed', xp: 2450, avatar: 'https://picsum.photos/100/100?random=20', status: 'up' },
    { rank: 2, name: 'Omar Hassan', xp: 2320, avatar: 'https://picsum.photos/100/100?random=21', status: 'up' },
    { rank: 3, name: 'John Doe', xp: 2100, avatar: 'https://picsum.photos/100/100?random=40', status: 'same' },
    { rank: 4, name: 'Jane Smith', xp: 1950, avatar: 'https://picsum.photos/100/100?random=41', status: 'down' },
    { rank: 5, name: 'You', xp: 1840, avatar: 'https://picsum.photos/100/100?random=8', status: 'up', isMe: true },
    { rank: 6, name: 'Fatima Ali', xp: 1750, avatar: 'https://picsum.photos/100/100?random=42', status: 'down' },
    { rank: 7, name: 'Mike Ross', xp: 1600, avatar: 'https://picsum.photos/100/100?random=43', status: 'same' },
    { rank: 8, name: 'Layla Ibrahim', xp: 1550, avatar: 'https://picsum.photos/100/100?random=44', status: 'down' },
    { rank: 9, name: 'Kareem Tarek', xp: 1400, avatar: 'https://picsum.photos/100/100?random=45', status: 'up' },
    { rank: 10, name: 'Nadia Youssef', xp: 1350, avatar: 'https://picsum.photos/100/100?random=46', status: 'down' },
  ];

  // Mock Data for Achievements (Badges)
  const achievements = [
    { id: 1, title: 'Super Star', desc: 'Reach a 7-day streak', level: 1, maxLevel: 3, progress: 7, total: 7, reward: 50, icon: Icons.Star, color: 'from-fuchsia-500 to-purple-600', completed: true },
    { id: 2, title: 'Champion', desc: 'Win a league', level: 2, maxLevel: 5, progress: 1, total: 1, reward: 20, icon: Icons.Trophy, color: 'from-blue-400 to-blue-600', completed: true },
    { id: 3, title: 'Friendly', desc: 'Add 3 friends', level: 1, maxLevel: 3, progress: 32, total: 50, reward: 20, icon: Icons.Heart, color: 'from-teal-400 to-emerald-500', completed: true },
    { id: 4, title: 'Royalty', desc: 'Earn a Crown', level: 1, maxLevel: 3, progress: 2, total: 5, reward: 20, icon: Icons.Crown, color: 'from-rose-400 to-red-500', completed: true },
    { id: 5, title: 'High Roller', desc: 'Earn 1000 Gems', level: 1, maxLevel: 1, progress: 3, total: 3, reward: 100, icon: Icons.Trophy, color: 'from-purple-500 to-indigo-600', completed: true }, 
    { id: 6, title: 'Diamond', desc: 'Reach Diamond League', level: 0, maxLevel: 1, progress: 1, total: 1, reward: 10, icon: Icons.Gem, color: 'from-sky-400 to-blue-500', completed: true },
    { id: 7, title: 'Lucky', desc: '7 days perfect', level: 0, maxLevel: 1, progress: 0, total: 1, reward: 10, icon: Icons.Clover, color: 'from-green-400 to-emerald-500', completed: true },
    { id: 8, title: 'Scholar', desc: 'Learn 100 words', level: 0, maxLevel: 1, progress: 0, total: 1, reward: 100, icon: Icons.BookOpen, color: 'gray', completed: false },
    { id: 9, title: 'Polyglot', desc: 'Learn a 2nd language', level: 0, maxLevel: 1, progress: 0, total: 1, reward: 500, icon: Icons.Globe, color: 'gray', completed: false },
    { id: 10, title: 'Night Owl', desc: 'Practice at night', level: 0, maxLevel: 1, progress: 0, total: 1, reward: 500, icon: Icons.Moon, color: 'gray', completed: false },
    { id: 11, title: 'Early Bird', desc: 'Practice in morning', level: 0, maxLevel: 1, progress: 0, total: 1, reward: 500, icon: Icons.Sun, color: 'gray', completed: false },
    { id: 12, title: 'Listener', desc: 'Listen 1 hour', level: 0, maxLevel: 1, progress: 0, total: 1, reward: 500, icon: Icons.Headphones, color: 'gray', completed: false },
  ];

  const handleClaimQuest = (id: number) => {
      setDailyQuests(prev => prev.map(q => q.id === id ? { ...q, claimed: true } : q));
  };

  const renderLeaderboard = () => (
    <div className="space-y-4 animate-in slide-in-from-right duration-300">
        
        {/* League Header */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-3xl p-6 text-center shadow-lg relative overflow-hidden text-white">
            <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 10%, transparent 10%)', backgroundSize: '20px 20px' }}></div>
            
            <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md mb-2 border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    <Icons.Crown size={32} className="text-yellow-300 fill-current" />
                </div>
                <h3 className="font-bold text-xl tracking-wide">Diamond League</h3>
                <p className="text-indigo-100 text-xs mb-3 font-medium">Top 5 promote to Obsidian League</p>
                <div className="text-xs font-bold text-white bg-black/20 px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
                    <Icons.Clock size={12} /> Ends in 3d 14h
                </div>
            </div>
        </div>

        {/* The List */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider flex justify-between">
                <span>Rank</span>
                <span>XP</span>
            </div>
            
            {/* Promotion Zone Marker */}
            <div className="bg-green-50 px-4 py-1.5 text-[10px] font-bold text-green-600 text-center border-b border-green-100 flex items-center justify-center gap-1">
                <Icons.ArrowUp size={10} /> Promotion Zone
            </div>

            {leaderboardData.map((user, index) => {
                const isPromoted = index < 5;
                const isDemoted = index > 20; // Example threshold
                
                return (
                    <div key={user.rank} className={`
                        flex items-center gap-4 p-4 border-b border-gray-50 last:border-0 transition-colors
                        ${user.isMe ? 'bg-blue-50/80 border-l-4 border-l-blue-600' : 'hover:bg-gray-50'}
                    `}>
                        <div className="w-6 text-center font-bold text-gray-400">
                            {user.rank <= 3 ? (
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                                    user.rank === 1 ? 'bg-yellow-400' : 
                                    user.rank === 2 ? 'bg-gray-400' : 'bg-orange-400'
                                }`}>
                                    {user.rank}
                                </div>
                            ) : user.rank}
                        </div>
                        
                        <div className="relative">
                            <img src={user.avatar} className={`w-10 h-10 rounded-full object-cover ${user.isMe ? 'ring-2 ring-blue-600 ring-offset-2' : ''}`} alt={user.name} />
                            {user.rank === 1 && <div className="absolute -top-2 -right-1"><Icons.Crown size={14} className="text-yellow-400 fill-current" /></div>}
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className={`text-sm truncate ${user.isMe ? 'font-bold text-blue-700' : 'font-semibold text-gray-900'}`}>
                                {user.name}
                            </h4>
                        </div>

                        <div className="text-sm font-bold text-gray-600 w-16 text-right">
                            {user.xp}
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
  );

  const renderQuests = () => (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Icons.Calendar size={20} className="text-blue-600" /> Daily Quests
        </h3>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            {dailyQuests.map((quest) => (
                <div key={quest.id} className="p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${quest.completed ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                                {quest.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm">{quest.title}</h4>
                                <p className="text-xs text-gray-500 font-medium mt-0.5">Reward: <span className="text-yellow-600 font-bold">{quest.reward} XP</span></p>
                            </div>
                        </div>
                        
                        {/* Action Button */}
                        {quest.completed && !quest.claimed ? (
                            <button 
                                onClick={() => handleClaimQuest(quest.id)}
                                className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-xl text-xs font-bold animate-pulse shadow-sm hover:bg-yellow-500 transition-colors"
                            >
                                Claim
                            </button>
                        ) : quest.claimed ? (
                            <div className="bg-green-100 p-1.5 rounded-full">
                                <Icons.CheckCircle size={18} className="text-green-600" />
                            </div>
                        ) : (
                            <div className="px-3 py-1 bg-gray-100 rounded-lg">
                                <span className="text-xs font-bold text-gray-400">{quest.progress}/{quest.total}</span>
                            </div>
                        )}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full transition-all duration-500 ${quest.completed ? 'bg-green-500' : 'bg-blue-500'}`}
                            style={{ width: `${Math.min((quest.progress / quest.total) * 100, 100)}%` }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
        
        {/* Weekly Challenge Banner - CHANGED TO BLUE */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden mt-6">
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <div className="relative z-10 flex justify-between items-center">
                <div>
                    <h4 className="font-bold text-lg mb-1">Weekly Challenge</h4>
                    <p className="text-blue-100 text-xs">Complete 20 quests this week</p>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold">12/20</div>
                    <div className="text-xs text-blue-200">Completed</div>
                </div>
            </div>
            <div className="mt-4 w-full h-2 bg-black/20 rounded-full overflow-hidden">
                <div className="h-full bg-white/90 rounded-full w-[60%]"></div>
            </div>
        </div>
    </div>
  );

  const renderBadges = () => {
    // Helper to generate clip-path for hexagon
    const hexClipStyle = { clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' };

    return (
        <div className="animate-in slide-in-from-right duration-300 pb-20">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h3 className="font-bold text-gray-900 text-xl">Lifetime Badges</h3>
                    <p className="text-gray-500 text-xs mt-1">Collect them all to prove your mastery</p>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-bold text-blue-600">{achievements.filter(a => a.completed).length}</span>
                    <span className="text-gray-400 text-sm font-medium">/{achievements.length}</span>
                </div>
            </div>

            {/* Container resembling the provided image card style */}
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
                <div className="grid grid-cols-3 gap-y-8 gap-x-2">
                    {achievements.map((badge) => (
                        <div key={badge.id} className="flex flex-col items-center">
                            {/* Hexagon Badge */}
                            <div className="relative w-24 h-28 flex items-center justify-center group cursor-pointer hover:scale-105 transition-transform duration-200">
                                
                                {/* Outer Background */}
                                <div 
                                    className={`absolute inset-0 ${badge.completed ? `bg-gradient-to-b ${badge.color}` : 'bg-slate-100'}`}
                                    style={hexClipStyle}
                                ></div>
                                
                                {/* Inner White Gap */}
                                <div 
                                    className="absolute inset-[4px] bg-white"
                                    style={hexClipStyle}
                                ></div>

                                {/* Inner Fill */}
                                <div 
                                    className={`absolute inset-[8px] flex items-center justify-center ${badge.completed ? `bg-gradient-to-br ${badge.color}` : 'bg-slate-200'}`}
                                    style={hexClipStyle}
                                >
                                    {badge.completed ? (
                                        <div className="relative z-10">
                                            <badge.icon className="text-white drop-shadow-md" size={32} strokeWidth={2.5} />
                                        </div>
                                    ) : (
                                        <Icons.Lock className="text-slate-300" size={28} />
                                    )}

                                    {/* Glass Shine Effect for Unlocked */}
                                    {badge.completed && (
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Locked Badges Hint */}
            <div className="mt-6 flex justify-center">
                <div className="flex gap-2 items-center">
                    {Array.from({length: 3}).map((_, i) => (
                        <div key={i} className="w-16 h-20 bg-slate-100 relative opacity-50" style={hexClipStyle}>
                            <div className="absolute inset-[4px] bg-slate-50" style={hexClipStyle}></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Icons.Lock size={16} className="text-slate-300" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-2 font-medium">Keep practicing to unlock more tiers</p>
        </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto p-5 space-y-6 pb-24 bg-gray-50 custom-scrollbar">
      
      {/* Page Header */}
      <div className="flex items-center justify-between sticky top-0 bg-gray-50/90 backdrop-blur-sm z-10 py-2">
          <h2 className="text-2xl font-bold text-gray-900">Challenges</h2>
          <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
             <Icons.Zap size={16} className="text-yellow-500 fill-current" />
             <span className="text-sm font-bold text-gray-800">1,250</span>
          </div>
      </div>

      {/* Tabs */}
      <div className="bg-white p-1 rounded-2xl border border-gray-200 flex shadow-sm">
          <button 
            onClick={() => setActiveTab('leaderboard')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'leaderboard' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            Leaderboard
          </button>
          <button 
             onClick={() => setActiveTab('quests')}
             className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'quests' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            Quests
          </button>
          <button 
             onClick={() => setActiveTab('badges')}
             className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'badges' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            Badges
          </button>
      </div>

      {activeTab === 'leaderboard' && renderLeaderboard()}
      {activeTab === 'quests' && renderQuests()}
      {activeTab === 'badges' && renderBadges()}

    </div>
  );
};

export default Challenges;
