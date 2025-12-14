
import React, { useState } from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';
import { GradientBackground, FloatingShapes, AnimatedCard, MotivationalMessage, AnimatedBadge, AnimatedProgressBar } from '../components/AnimatedComponents';

const Challenges: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'quests' | 'badges'>('leaderboard');
  const [claimedBadges, setClaimedBadges] = useState<number[]>([]);
  
  const [dailyQuests, setDailyQuests] = useState([
      { id: 101, title: 'Speak for 5 minutes', progress: 3, total: 5, reward: 20, completed: false, claimed: false, icon: <Icons.Mic size={20} /> },
      { id: 102, title: 'Complete 1 Practice Session', progress: 0, total: 1, reward: 15, completed: false, claimed: false, icon: <Icons.PlayCircle size={20} /> },
      { id: 103, title: 'Score 90% in Pronunciation', progress: 1, total: 1, reward: 50, completed: true, claimed: false, icon: <Icons.Star size={20} /> },
      { id: 104, title: 'Learn 10 New Words', progress: 4, total: 10, reward: 30, completed: false, claimed: false, icon: <Icons.BookOpen size={20} /> },
  ]);

  const [weeklyQuests, setWeeklyQuests] = useState([
      { id: 201, title: 'Complete 30 Lessons', progress: 12, total: 30, reward: 150, completed: false, claimed: false, icon: <Icons.Layers size={20} /> },
      { id: 202, title: 'Earn 1000 XP', progress: 850, total: 1000, reward: 200, completed: false, claimed: false, icon: <Icons.Zap size={20} /> },
      { id: 203, title: 'Finish 1st in League', progress: 0, total: 1, reward: 500, completed: false, claimed: false, icon: <Icons.Trophy size={20} /> },
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

  const handleClaimWeeklyQuest = (id: number) => {
      setWeeklyQuests(prev => prev.map(q => q.id === id ? { ...q, claimed: true } : q));
  };

  const renderLeaderboard = () => (
    <div className="space-y-4 animate-fadeIn">
        
        {/* League Header */}
        <AnimatedCard variant="gradient" className="p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 animate-float" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 15%, transparent 15%)', backgroundSize: '30px 30px' }}></div>
            
            <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-200 to-amber-400 rounded-3xl flex items-center justify-center mb-3 border-4 border-white/40 shadow-2xl animate-bounce-subtle">
                    <Icons.Crown size={40} className="text-amber-900 fill-current animate-pulse-glow" />
                </div>
                <h3 className="font-black text-2xl tracking-wide text-white drop-shadow-lg">💎 Diamond League</h3>
                <p className="text-white/90 text-sm mb-4 font-semibold">Top 5 promote to Obsidian League ⚡</p>
                <AnimatedBadge variant="premium" className="text-sm font-black px-4 py-2 flex items-center gap-2 bg-black/30 border-2 border-white/30 backdrop-blur-md">
                    <Icons.Clock size={14} /> Ends in 3d 14h
                </AnimatedBadge>
            </div>
        </AnimatedCard>

        {/* The List */}
        <AnimatedCard variant="white" className="overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200 text-xs font-black text-slate-600 uppercase tracking-wider flex justify-between">
                <span>\ud83c\udfaf Rank</span>
                <span>\u26a1 XP</span>
            </div>
            
            {/* Promotion Zone Marker */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 text-xs font-black text-green-700 text-center border-b border-green-200 flex items-center justify-center gap-2 shadow-sm">
                <Icons.ArrowUp size={14} className="animate-bounce-subtle" /> Promotion Zone \ud83d\ude80
            </div>

            {leaderboardData.map((user, index) => {
                const isPromoted = index < 5;
                
                return (
                    <div key={user.rank} className={`
                        flex items-center gap-4 p-5 border-b border-slate-50 last:border-0 transition-all hover-lift
                        ${user.isMe ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-l-blue-600 shadow-inner' : 'hover:bg-slate-50'}
                        ${isPromoted ? 'bg-green-50/30' : ''}
                    `}>
                        <div className="w-10 text-center font-black">
                            {user.rank <= 3 ? (
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-base font-black shadow-lg animate-bounce-in ${
                                    user.rank === 1 ? 'bg-gradient-to-br from-yellow-300 to-amber-500' : 
                                    user.rank === 2 ? 'bg-gradient-to-br from-slate-300 to-slate-500' : 'bg-gradient-to-br from-orange-300 to-orange-500'
                                }`}>
                                    {user.rank}
                                </div>
                            ) : (
                                <span className={user.isMe ? 'text-blue-700 font-black text-lg' : 'text-slate-400 text-base'}>{user.rank}</span>
                            )}
                        </div>
                        
                        <div className="relative">
                            <img src={user.avatar} className={`w-14 h-14 rounded-full object-cover border-2 ${user.isMe ? 'border-blue-600 ring-4 ring-blue-100 shadow-xl' : 'border-white shadow-md'}`} alt={user.name} />
                            {user.rank === 1 && (
                                <div className="absolute -top-2 -right-2 animate-bounce-subtle">
                                    <Icons.Crown size={20} className="text-yellow-500 fill-current drop-shadow-lg" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className={`text-base truncate ${user.isMe ? 'font-black text-blue-800' : 'font-bold text-slate-900'}`}>
                                {user.name} {user.isMe && '\ud83d\udc4b'}
                            </h4>
                            {user.status === 'up' && <span className="text-xs text-green-600 font-bold flex items-center gap-1"><Icons.TrendingUp size={12} /> Rising</span>}
                            {user.status === 'down' && <span className="text-xs text-red-500 font-bold flex items-center gap-1"><Icons.TrendingUp size={12} className="rotate-180" /> Falling</span>}
                        </div>

                        <div className="text-right">
                            <div className={`text-lg font-black ${user.isMe ? 'text-blue-700' : 'text-slate-700'}`}>
                                {user.xp.toLocaleString()}
                            </div>
                        </div>
                    </div>
                );
            })}
        </AnimatedCard>
    </div>
  );

  const renderQuests = () => (
    <div className="space-y-6 animate-fadeIn pb-20">
        
        {/* Daily Quests Section */}
        <div>
            <h3 className="font-black text-white text-xl mb-4 flex items-center gap-2 drop-shadow-lg">
                <Icons.Calendar size={24} className="text-blue-200" /> \u2600\ufe0f Daily Quests
            </h3>
            <AnimatedCard variant="white" className="overflow-hidden">
                {dailyQuests.map((quest, index) => (
                    <div key={quest.id} className="p-5 border-b border-slate-50 last:border-0 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all animate-slideUp" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-4">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg transform hover:scale-110 transition-transform ${
                                    quest.completed ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white animate-bounce-in' : 'bg-gradient-to-br from-blue-400 to-indigo-500 text-white'
                                }`}>
                                    {quest.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-base">{quest.title}</h4>
                                    <p className="text-sm text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                                        Reward: <span className="text-yellow-600 font-black flex items-center gap-1"><Icons.Zap size={14} className="fill-current" />{quest.reward} XP</span>
                                    </p>
                                </div>
                            </div>
                            
                            {/* Action Button */}
                            {quest.completed && !quest.claimed ? (
                                <button 
                                    onClick={() => handleClaimQuest(quest.id)}
                                    className="bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900 px-6 py-2.5 rounded-xl text-sm font-black animate-pulse-glow shadow-xl hover-lift border-2 border-yellow-300"
                                >
                                    🎁 Claim
                                </button>
                            ) : quest.claimed ? (
                                <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-2.5 rounded-full shadow-lg">
                                    <Icons.CheckCircle size={22} className="text-white" strokeWidth={3} />
                                </div>
                            ) : (
                                <AnimatedBadge variant="secondary" className="px-4 py-2">
                                    <span className="text-sm font-bold">{quest.progress}/{quest.total}</span>
                                </AnimatedBadge>
                            )}
                        </div>

                        {/* Progress Bar */}
                        <AnimatedProgressBar 
                            progress={(quest.progress / quest.total) * 100} 
                            color={quest.completed ? 'green' : 'blue'} 
                            height="h-3"
                        />
                    </div>
                ))}
            </AnimatedCard>
        </div>
        
        {/* Weekly Challenge Banner */}
        <AnimatedCard variant="gradient" className="p-8 relative overflow-hidden group hover-lift">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                    <h4 className="font-black text-2xl mb-2 text-white drop-shadow-lg flex items-center gap-2">
                        💪 Weekly Challenge
                    </h4>
                    <p className="text-white/90 text-sm font-semibold">Complete 20 quests this week to unlock bonus rewards!</p>
                </div>
                <div className="text-center md:text-right bg-white/20 backdrop-blur-md rounded-2xl p-4 border-2 border-white/30">
                    <div className="text-4xl font-black text-white drop-shadow-lg">12<span className="text-white/70">/20</span></div>
                    <div className="text-sm text-white/80 font-bold">Completed</div>
                </div>
            </div>
            <div className="mt-6 relative z-10">
                <AnimatedProgressBar progress={60} color="white" height="h-4" />
            </div>
        </AnimatedCard>

        {/* Weekly Quests Section */}
        <div className="mt-6">
            <h3 className="font-black text-white text-xl mb-4 flex items-center gap-2 drop-shadow-lg">
                <Icons.Target size={24} className="text-purple-200" /> Weekly Quests
            </h3>
            <AnimatedCard variant="white" className="overflow-hidden">
                {weeklyQuests.map((quest, index) => (
                    <div key={quest.id} className="p-5 border-b border-slate-50 last:border-0 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all animate-slideUp" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-4">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg transform hover:scale-110 transition-transform ${
                                    quest.completed ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white animate-bounce-in' : 'bg-gradient-to-br from-indigo-400 to-purple-500 text-white'
                                }`}>
                                    {quest.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-base">{quest.title}</h4>
                                    <p className="text-sm text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                                        Reward: <span className="text-yellow-600 font-black flex items-center gap-1"><Icons.Zap size={14} className="fill-current" />{quest.reward} XP</span>
                                    </p>
                                </div>
                            </div>
                            
                             {quest.completed && !quest.claimed ? (
                                <button 
                                    onClick={() => handleClaimWeeklyQuest(quest.id)}
                                    className="bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900 px-6 py-2.5 rounded-xl text-sm font-black animate-pulse-glow shadow-xl hover-lift border-2 border-yellow-300"
                                >
                                    🎁 Claim
                                </button>
                            ) : quest.claimed ? (
                                <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-2.5 rounded-full shadow-lg">
                                    <Icons.CheckCircle size={22} className="text-white" strokeWidth={3} />
                                </div>
                            ) : (
                                <AnimatedBadge variant="secondary" className="px-4 py-2">
                                    <span className="text-sm font-bold">{Math.floor((quest.progress / quest.total) * 100)}%</span>
                                </AnimatedBadge>
                            )}
                        </div>

                        {/* Progress Bar */}
                        <AnimatedProgressBar 
                            progress={(quest.progress / quest.total) * 100} 
                            color={quest.completed ? 'green' : 'purple'} 
                            height="h-3"
                        />
                        <div className="mt-2 text-xs text-slate-400 text-right font-medium">
                           {quest.progress} / {quest.total}
                        </div>
                    </div>
                ))}
            </AnimatedCard>
        </div>
    </div>
  );

  const renderBadges = () => {
    // Helper to generate clip-path for hexagon
    const hexClipStyle = { clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' };

    return (
        <div className="animate-fadeIn pb-20">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h3 className="font-black text-white text-2xl drop-shadow-lg">\u2b50 Lifetime Badges</h3>
                    <p className="text-white/80 text-sm mt-2 font-semibold drop-shadow">Collect them all to prove your mastery!</p>
                </div>
                <div className="text-right bg-white/20 backdrop-blur-md px-4 py-3 rounded-2xl border-2 border-white/30">
                    <span className="text-3xl font-black text-white drop-shadow-lg">{achievements.filter(a => a.completed).length}</span>
                    <span className="text-white/70 text-lg font-bold">/{achievements.length}</span>
                </div>
            </div>

            <MotivationalMessage message="Every badge tells a story of dedication! \ud83c\udf96\ufe0f" />

            {/* Container */}
            <AnimatedCard variant="white" className="p-8 mt-4">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-y-10 gap-x-6">
                    {achievements.map((badge, index) => (
                        <div key={badge.id} className="flex flex-col items-center animate-slideUp" style={{ animationDelay: `${index * 0.05}s` }}>
                            {/* Hexagon Badge */}
                            <div className="relative w-24 h-28 sm:w-28 sm:h-32 flex items-center justify-center group cursor-pointer hover:scale-110 transition-all duration-300 hover-lift">
                                
                                {/* Outer Background */}
                                <div 
                                    className={`absolute inset-0 ${badge.completed ? `bg-gradient-to-b ${badge.color} shadow-2xl` : 'bg-slate-200'}`}
                                    style={hexClipStyle}
                                ></div>
                                
                                {/* Inner White Gap */}
                                <div 
                                    className="absolute inset-[4px] bg-white"
                                    style={hexClipStyle}
                                ></div>

                                {/* Inner Fill */}
                                <div 
                                    className={`absolute inset-[8px] flex items-center justify-center ${badge.completed ? `bg-gradient-to-br ${badge.color}` : 'bg-slate-100'}`}
                                    style={hexClipStyle}
                                >
                                    {badge.completed ? (
                                        <div className="relative z-10 animate-bounce-in">
                                            <badge.icon className="text-white drop-shadow-xl" size={36} strokeWidth={2.5} />
                                        </div>
                                    ) : (
                                        <Icons.Lock className="text-slate-300" size={30} />
                                    )}

                                    {/* Glass Shine Effect for Unlocked */}
                                    {badge.completed && (
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none animate-pulse-subtle"></div>
                                    )}
                                </div>

                                {/* Hover tooltip */}
                                {badge.completed && (
                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold pointer-events-none z-20 shadow-xl">
                                        {badge.title}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </AnimatedCard>
        </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar relative">
      <GradientBackground variant="purple" />
      <FloatingShapes />
      
      {/* Page Header */}
      <div className="flex items-center justify-between p-6 pb-4 max-w-4xl mx-auto w-full relative z-10">
          <h2 className="text-3xl font-black text-white drop-shadow-lg">🏆 Challenges</h2>
          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 px-5 py-2.5 rounded-full shadow-xl animate-pulse-glow">
             <Icons.Zap size={22} className="text-amber-900 fill-current animate-bounce-subtle" />
             <span className="text-lg font-black text-amber-900">1,250</span>
          </div>
      </div>

      <div className="max-w-4xl mx-auto w-full space-y-6 p-6 pt-2 pb-24 relative z-10">
        <MotivationalMessage message="Push your limits, climb the ranks! 💪" />
        
        {/* Tabs */}
        <div className="bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border-2 border-white/50 flex shadow-2xl">
            <button 
                onClick={() => setActiveTab('leaderboard')}
                className={`flex-1 py-3.5 rounded-xl text-sm font-bold transition-all hover-lift ${
                    activeTab === 'leaderboard' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105' : 'text-slate-600 hover:bg-white/60'
                }`}
            >
                🥇 Leaderboard
            </button>
            <button 
                onClick={() => setActiveTab('quests')}
                className={`flex-1 py-3.5 rounded-xl text-sm font-bold transition-all hover-lift ${
                    activeTab === 'quests' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105' : 'text-slate-600 hover:bg-white/60'
                }`}
            >
                🎯 Quests
            </button>
            <button 
                onClick={() => setActiveTab('badges')}
                className={`flex-1 py-3.5 rounded-xl text-sm font-bold transition-all hover-lift ${
                    activeTab === 'badges' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105' : 'text-slate-600 hover:bg-white/60'
                }`}
            >
                ⭐ Badges
            </button>
        </div>

        {activeTab === 'leaderboard' && renderLeaderboard()}
        {activeTab === 'quests' && renderQuests()}
        {activeTab === 'badges' && renderBadges()}
      </div>

    </div>
  );
};

export default Challenges;
