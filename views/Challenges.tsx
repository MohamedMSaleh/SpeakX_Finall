
import React, { useState } from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';

const Challenges: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'quests'>('leaderboard');
  const [claimedBadges, setClaimedBadges] = useState<number[]>([]);
  const [dailyQuests, setDailyQuests] = useState([
      { id: 101, title: 'Speak for 5 minutes', progress: 3, total: 5, reward: 20, completed: false, claimed: false },
      { id: 102, title: 'Complete 1 Practice Session', progress: 0, total: 1, reward: 15, completed: false, claimed: false },
      { id: 103, title: 'Score 90% in Pronunciation', progress: 1, total: 1, reward: 50, completed: true, claimed: false },
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

  // Mock Data for Achievements
  const achievements = [
    { id: 1, title: 'Wildfire', desc: 'Reach a 7-day streak', level: 1, maxLevel: 3, progress: 7, total: 7, reward: 50, icon: <Icons.Zap size={24} className="text-orange-500" />, color: 'bg-orange-100', completed: true },
    { id: 2, title: 'Sage', desc: 'Earn 1,000 XP', level: 2, maxLevel: 5, progress: 1250, total: 2000, reward: 20, icon: <Icons.TrendingUp size={24} className="text-green-500" />, color: 'bg-green-100', completed: false },
    { id: 3, title: 'Scholar', desc: 'Learn 50 new words', level: 1, maxLevel: 3, progress: 32, total: 50, reward: 20, icon: <Icons.BookOpen size={24} className="text-blue-500" />, color: 'bg-blue-100', completed: false },
    { id: 4, title: 'Sharpshooter', desc: 'Complete 5 perfect lessons', level: 1, maxLevel: 3, progress: 2, total: 5, reward: 20, icon: <Icons.Target size={24} className="text-red-500" />, color: 'bg-red-100', completed: false },
    { id: 5, title: 'Friendly', desc: 'Follow 3 friends', level: 1, maxLevel: 1, progress: 3, total: 3, reward: 100, icon: <Icons.Users size={24} className="text-purple-500" />, color: 'bg-purple-100', completed: true },
    { id: 6, title: 'Nocturnal', desc: 'Practice after 10 PM', level: 0, maxLevel: 1, progress: 0, total: 1, reward: 10, icon: <Icons.Clock size={24} className="text-indigo-500" />, color: 'bg-indigo-100', completed: false },
  ];

  const handleClaimBadge = (id: number) => {
    if (!claimedBadges.includes(id)) {
      setClaimedBadges([...claimedBadges, id]);
    }
  };

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
    <div className="space-y-6 animate-in slide-in-from-left duration-300">
        
        {/* Daily Quests Section */}
        <div>
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Icons.Calendar size={20} className="text-blue-600" /> Daily Quests
            </h3>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                {dailyQuests.map((quest) => (
                    <div key={quest.id} className="p-4 border-b border-gray-50 last:border-0">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${quest.completed ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                                    {quest.reward >= 50 ? <Icons.Award size={20} /> : <Icons.Zap size={20} />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">{quest.title}</h4>
                                    <p className="text-xs text-gray-500 font-medium">Reward: {quest.reward} XP</p>
                                </div>
                            </div>
                            
                            {/* Action Button */}
                            {quest.completed && !quest.claimed ? (
                                <button 
                                    onClick={() => handleClaimQuest(quest.id)}
                                    className="bg-yellow-400 text-yellow-900 px-3 py-1.5 rounded-lg text-xs font-bold animate-pulse shadow-sm"
                                >
                                    Claim
                                </button>
                            ) : quest.claimed ? (
                                <Icons.CheckCircle size={20} className="text-green-500" />
                            ) : (
                                <span className="text-xs font-bold text-gray-400">{quest.progress}/{quest.total}</span>
                            )}
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-500 ${quest.completed ? 'bg-green-500' : 'bg-blue-500'}`}
                                style={{ width: `${Math.min((quest.progress / quest.total) * 100, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Lifetime Achievements Section */}
        <div>
             <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Icons.Medal size={20} className="text-yellow-500" /> Lifetime Badges
            </h3>
            <div className="space-y-4">
                {achievements.map((badge) => {
                    const isClaimed = claimedBadges.includes(badge.id);
                    const canClaim = badge.completed && !isClaimed;

                    return (
                        <div key={badge.id} className={`bg-white p-4 rounded-3xl border shadow-sm transition-all ${canClaim ? 'border-yellow-200 shadow-md shadow-yellow-50' : 'border-gray-100'}`}>
                            <div className="flex gap-4">
                                {/* Icon */}
                                <div className={`w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl relative ${badge.color}`}>
                                    {badge.icon}
                                    {badge.completed && (
                                        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm border border-gray-50">
                                            <div className="bg-green-500 rounded-full w-4 h-4 flex items-center justify-center">
                                                <Icons.CheckCircle size={10} className="text-white" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-gray-900">{badge.title}</h4>
                                        <span className="text-xs font-bold text-gray-400">Lvl {badge.level}/{badge.maxLevel}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-3">{badge.desc}</p>
                                    
                                    {/* Progress Bar */}
                                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-1">
                                        <div 
                                            className={`h-full rounded-full transition-all duration-500 ${badge.completed ? 'bg-green-500' : 'bg-blue-500'}`} 
                                            style={{ width: `${Math.min((badge.progress / badge.total) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                                        <span>{badge.progress} / {badge.total}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Footer */}
                            {canClaim && (
                                <div className="mt-4 pt-3 border-t border-gray-50 flex justify-end">
                                    <button 
                                        onClick={() => handleClaimBadge(badge.id)}
                                        className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-yellow-500 transition-colors flex items-center gap-1 animate-pulse"
                                    >
                                        <Icons.Zap size={14} fill="currentColor" /> Claim {badge.reward} XP
                                    </button>
                                </div>
                            )}
                            {isClaimed && (
                                <div className="mt-4 pt-3 border-t border-gray-50 flex justify-end">
                                    <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                                        <Icons.CheckCircle size={14} /> Claimed
                                    </span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
  );

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
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'leaderboard' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            Leaderboard
          </button>
          <button 
             onClick={() => setActiveTab('quests')}
             className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'quests' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            Quests & Badges
          </button>
      </div>

      {activeTab === 'leaderboard' ? renderLeaderboard() : renderQuests()}

    </div>
  );
};

export default Challenges;
