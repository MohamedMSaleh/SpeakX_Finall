import React, { useState } from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';
import { GradientBackground, GlowingOrb } from '../components/DecorativeElements';
import { RewardBadge, AchievementCard, XPCounter, ProgressRing } from '../components/RewardElements';
import { ProgressBar, PopIn, Confetti } from '../components/MicroInteractions';
import { colors, gradients } from '../styles/designSystem';

const Challenges: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'quests' | 'badges'>('leaderboard');
  const [showConfetti, setShowConfetti] = useState(false);
  
  const [dailyQuests, setDailyQuests] = useState([
      { id: 101, title: 'Speak for 5 minutes', progress: 3, total: 5, reward: 20, completed: false, claimed: false, icon: Icons.Mic },
      { id: 102, title: 'Complete 1 Practice Session', progress: 0, total: 1, reward: 15, completed: false, claimed: false, icon: Icons.PlayCircle },
      { id: 103, title: 'Score 90% in Pronunciation', progress: 1, total: 1, reward: 50, completed: true, claimed: false, icon: Icons.Star },
      { id: 104, title: 'Learn 10 New Words', progress: 4, total: 10, reward: 30, completed: false, claimed: false, icon: Icons.BookOpen },
  ]);

  const leaderboardData = [
    { rank: 1, name: 'Sarah Ahmed', xp: 2450, avatar: 'https://picsum.photos/100/100?random=20', status: 'up' },
    { rank: 2, name: 'Omar Hassan', xp: 2320, avatar: 'https://picsum.photos/100/100?random=21', status: 'up' },
    { rank: 3, name: 'John Doe', xp: 2100, avatar: 'https://picsum.photos/100/100?random=40', status: 'same' },
    { rank: 4, name: 'Jane Smith', xp: 1950, avatar: 'https://picsum.photos/100/100?random=41', status: 'down' },
    { rank: 5, name: 'You', xp: 1840, avatar: 'https://picsum.photos/100/100?random=8', status: 'up', isMe: true },
    { rank: 6, name: 'Fatima Ali', xp: 1750, avatar: 'https://picsum.photos/100/100?random=42', status: 'down' },
    { rank: 7, name: 'Mike Ross', xp: 1600, avatar: 'https://picsum.photos/100/100?random=43', status: 'same' },
  ];

  const achievements = [
    { title: 'Super Star', description: 'Reach a 7-day streak', icon: 'star', unlocked: true, progress: 100 },
    { title: 'Champion', description: 'Win a league', icon: 'trophy', unlocked: true, progress: 100 },
    { title: 'Scholar', description: 'Learn 100 words', icon: 'star', unlocked: false, progress: 67 },
    { title: 'Night Owl', description: 'Practice at night', icon: 'gem', unlocked: false, progress: 30 },
  ];

  const handleClaimQuest = (id: number) => {
      setDailyQuests(prev => prev.map(q => q.id === id ? { ...q, claimed: true } : q));
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
  };

  const renderLeaderboard = () => (
    <div className="space-y-5">
        <Confetti active={showConfetti} />
        
        {/* League Header */}
        <PopIn delay={0}>
          <div 
            className="rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden text-white"
            style={{ background: gradients.cardPurple }}
          >
            <GlowingOrb color={colors.primary.white} size={200} className="-right-20 -top-20" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-4">
                <RewardBadge type="trophy" size={80} glow />
              </div>
              <h3 className="font-black text-3xl tracking-wide mb-2">Diamond League 💎</h3>
              <p className="text-purple-100 text-sm mb-4 font-bold">Top 5 promote to Obsidian League</p>
              <div className="text-sm font-black text-white bg-white/20 px-5 py-2 rounded-full border-2 border-white/30 flex items-center gap-2 backdrop-blur-sm">
                <Icons.Clock size={16} /> Ends in 3d 14h
              </div>
            </div>
          </div>
        </PopIn>

        {/* The List */}
        <PopIn delay={100}>
          <div className="bg-white rounded-3xl border-2 border-blue-100 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b-2 border-blue-100 text-sm font-black text-gray-700 uppercase tracking-wider flex justify-between">
              <span>Rank</span>
              <span>XP</span>
            </div>
            
            {/* Promotion Zone */}
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 text-xs font-black text-green-700 text-center border-b-2 border-green-200 flex items-center justify-center gap-2">
              <Icons.ArrowUp size={14} className="animate-bounce" /> PROMOTION ZONE
            </div>

            {leaderboardData.map((user, index) => (
              <div key={user.rank} className={`
                flex items-center gap-4 p-5 border-b border-gray-100 last:border-0 transition-all duration-300
                ${user.isMe ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-blue-600 shadow-inner' : 'hover:bg-gray-50'}
                ${index < 5 ? 'bg-green-50/30' : ''}
              `}>
                <div className="w-10 text-center">
                  {user.rank <= 3 ? (
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-base font-black shadow-lg"
                      style={{ 
                        background: user.rank === 1 ? gradients.cardYellow : 
                                  user.rank === 2 ? 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)' : 
                                  gradients.cardPink 
                      }}
                    >
                      {user.rank}
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-gray-500">{user.rank}</span>
                  )}
                </div>
                
                <div className="relative">
                  <img 
                    src={user.avatar} 
                    className={`w-14 h-14 rounded-full object-cover border-2 ${user.isMe ? 'border-blue-600 shadow-lg' : 'border-white shadow-md'}`} 
                    alt={user.name} 
                  />
                  {user.rank === 1 && (
                    <div className="absolute -top-2 -right-1 animate-bounce">
                      <Icons.Crown size={20} className="text-yellow-400 fill-current drop-shadow-md" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className={`text-base truncate ${user.isMe ? 'font-black text-blue-700' : 'font-bold text-gray-900'}`}>
                    {user.name}
                  </h4>
                  {user.status === 'up' && <div className="text-green-600 text-xs font-bold flex items-center gap-1"><Icons.TrendingUp size={12} /> Rising</div>}
                </div>

                <div className="text-lg font-black text-gray-700">
                  {user.xp.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </PopIn>
    </div>
  );

  const renderQuests = () => (
    <div className="space-y-6 pb-20">
        <PopIn delay={0}>
          <div>
            <h3 className="font-black text-gray-900 mb-4 flex items-center gap-3 text-xl">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: gradients.cardBlue }}>
                <Icons.Calendar size={24} className="text-white" />
              </div>
              Daily Quests
            </h3>
            <div className="space-y-3">
              {dailyQuests.map((quest, idx) => {
                const IconComponent = quest.icon;
                return (
                  <div 
                    key={quest.id} 
                    className={`p-6 rounded-3xl border-2 shadow-lg transition-all duration-300 hover:shadow-xl relative overflow-hidden ${
                      quest.completed ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 
                      'bg-white border-blue-100'
                    }`}
                  >
                    {quest.completed && <GlowingOrb color={colors.secondary.success} size={150} className="-right-12 -top-12" />}
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div 
                            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                            style={{ background: quest.completed ? gradients.cardGreen : gradients.cardBlue }}
                          >
                            <IconComponent size={28} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-black text-gray-900 text-base mb-1">{quest.title}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-gray-600">{quest.progress}/{quest.total}</span>
                              <div className="flex-1">
                                <ProgressBar progress={(quest.progress / quest.total) * 100} height={6} gradient={quest.completed ? gradients.cardGreen : gradients.cardBlue} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <XPCounter xp={quest.reward} />
                      </div>

                      {quest.completed && !quest.claimed && (
                        <button 
                          onClick={() => handleClaimQuest(quest.id)}
                          className="w-full py-4 rounded-2xl font-black text-white shadow-lg hover:scale-105 transition-all active:scale-95 flex items-center justify-center gap-2"
                          style={{ background: gradients.cardGreen }}
                        >
                          🎉 Claim Reward
                        </button>
                      )}
                      
                      {quest.claimed && (
                        <div className="text-center py-3 bg-green-100 rounded-2xl font-black text-green-700 flex items-center justify-center gap-2">
                          <Icons.Check size={20} /> Claimed!
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </PopIn>
    </div>
  );

  const renderBadges = () => (
    <div className="space-y-4 pb-20">
      <PopIn delay={0}>
        <h3 className="font-black text-gray-900 mb-5 flex items-center gap-3 text-xl">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: gradients.cardPurple }}>
            <Icons.Award size={24} className="text-white" />
          </div>
          Your Achievements
        </h3>
      </PopIn>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement, idx) => (
          <PopIn key={idx} delay={idx * 50}>
            <AchievementCard
              title={achievement.title}
              description={achievement.description}
              icon={achievement.icon as any}
              unlocked={achievement.unlocked}
              progress={achievement.progress}
            />
          </PopIn>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-hidden">
      <GradientBackground variant="primary" className="h-full">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b-2 border-blue-100 shadow-sm">
            <div className="p-4">
              <h1 className="text-2xl font-black text-gray-900 mb-4 text-center">Challenges & Rewards 🏆</h1>
              
              {/* Tabs */}
              <div className="flex gap-2">
                {(['leaderboard', 'quests', 'badges'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 px-4 rounded-2xl font-black text-sm uppercase tracking-wide transition-all duration-300 ${
                      activeTab === tab
                        ? 'text-white shadow-lg scale-105'
                        : 'text-gray-600 bg-white border-2 border-gray-200 hover:border-gray-300'
                    }`}
                    style={activeTab === tab ? { background: gradients.cardBlue } : {}}
                  >
                    {tab === 'leaderboard' && '🏆 League'}
                    {tab === 'quests' && '⚡ Quests'}
                    {tab === 'badges' && '🎖️ Badges'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'leaderboard' && renderLeaderboard()}
            {activeTab === 'quests' && renderQuests()}
            {activeTab === 'badges' && renderBadges()}
          </div>
        </div>
      </GradientBackground>
    </div>
  );
};

export default Challenges;
