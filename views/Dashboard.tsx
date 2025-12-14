
import React from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';
import { AnimatedCard, GradientBackground, FloatingShapes, XPCounter, StreakIndicator, MotivationalMessage, AnimatedProgressBar } from '../components/AnimatedComponents';

const Dashboard: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  return (
    <GradientBackground variant="multicolor" className="h-full overflow-y-auto pb-24 md:pb-6 custom-scrollbar">
      <FloatingShapes />
      
      <div className="relative z-10 p-4 md:p-6 lg:p-8 space-y-6">
        {/* Welcome Header with XP & Streak */}
        <div className="animate-slideDown">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">
                Hey Amira! 👋
              </h1>
              <p className="text-gray-600 font-medium">Keep up the amazing work!</p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <XPCounter xp={1250} />
              <StreakIndicator streak={12} />
            </div>
          </div>
          
          {/* Mobile XP & Streak */}
          <div className="md:hidden flex items-center gap-3 mb-4">
            <XPCounter xp={1250} />
            <StreakIndicator streak={12} />
          </div>
        </div>

        {/* Top Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slideUp">
          {/* Overall Score */}
          <AnimatedCard variant="gradient" hover className="relative overflow-hidden h-36">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 animate-float"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                <h3 className="text-gray-500 font-bold text-xs uppercase tracking-wider">Overall</h3>
              </div>
              <div className="text-3xl font-black gradient-text mb-1">Excellent</div>
              <div className="text-xs text-gray-500 font-semibold">Outstanding progress! 🌟</div>
            </div>
          </AnimatedCard>

          {/* Weekly Growth */}
          <AnimatedCard variant="gradient" hover className="relative overflow-hidden h-36">
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-10 animate-float"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <h3 className="text-gray-500 font-bold text-xs uppercase tracking-wider">Growth</h3>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="bg-gradient-to-br from-green-400 to-green-600 p-2 rounded-xl shadow-green animate-float">
                  <Icons.TrendingUp size={18} className="text-white" strokeWidth={3} />
                </div>
                <span className="text-3xl font-black gradient-text-green">+2%</span>
              </div>
              <div className="text-xs text-gray-500 font-semibold">This week 📈</div>
            </div>
          </AnimatedCard>

          {/* Lessons Done */}
          <AnimatedCard variant="gradient" hover className="relative overflow-hidden h-36">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-10 animate-float"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-3 shadow-blue animate-float">
                <Icons.CheckCircle size={24} strokeWidth={2.5} />
              </div>
              <div className="text-2xl font-black text-gray-900">12</div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wide mt-1">Lessons Done</div>
            </div>
          </AnimatedCard>

          {/* Practice Time */}
          <AnimatedCard variant="gradient" hover className="relative overflow-hidden h-36">
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-10 animate-float"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-3 shadow-purple animate-float">
                <Icons.Clock size={24} strokeWidth={2.5} />
              </div>
              <div className="text-2xl font-black text-gray-900">4.5h</div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wide mt-1">Practice Time</div>
            </div>
          </AnimatedCard>
        </div>

        {/* Motivational Message */}
        <div className="animate-slideUp">
          <MotivationalMessage 
            message="You're on fire! Keep learning to maintain your streak 🔥" 
            variant="celebrating"
          />
        </div>

        {/* Assessment Banner */}
        <AnimatedCard variant="glow" className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-6 md:p-8 relative overflow-hidden animate-slideUp">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10 animate-pulse" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 animate-float"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl -ml-20 -mb-20 animate-floatSlow"></div>
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-5 text-white">
              <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border-2 border-white/30 shrink-0 shadow-xl animate-float">
                <Icons.Target className="text-white" size={32} strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-black text-2xl md:text-3xl leading-tight mb-2">Assess Me! 🎯</div>
                <div className="text-sm text-blue-100 font-medium">Get a personalized learning path</div>
              </div>
            </div>
            <button 
              className="bg-white text-blue-700 px-8 py-4 rounded-2xl text-sm font-bold shadow-2xl hover:shadow-xl hover:scale-105 active:scale-95 transition-all whitespace-nowrap w-full sm:w-auto hover-lift" 
              onClick={() => setView(View.ASSESSMENT_HISTORY)}
            >
              Start Assessment ✨
            </button>
          </div>
        </AnimatedCard>

        {/* Quick Actions */}
        <div className="animate-slideUp">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-gray-900">Practice Areas</h2>
            <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Choose your skill
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { 
                title: 'Vocabulary', 
                sub: 'Expand your words', 
                icon: Icons.BookOpen, 
                gradient: 'from-blue-500 to-blue-600',
                bgGradient: 'from-blue-50 to-blue-100',
                emoji: '📚',
                action: () => setView(View.VOCAB_PRACTICE) 
              },
              { 
                title: 'Grammar', 
                sub: 'Master the rules', 
                icon: Icons.CheckCircle, 
                gradient: 'from-green-500 to-green-600',
                bgGradient: 'from-green-50 to-green-100',
                emoji: '✅',
                action: () => setView(View.GRAMMAR_PRACTICE) 
              },
              { 
                title: 'Pronunciation', 
                sub: 'Perfect accent', 
                icon: Icons.Mic, 
                gradient: 'from-purple-500 to-purple-600',
                bgGradient: 'from-purple-50 to-purple-100',
                emoji: '🎙️',
                action: () => setView(View.PRONUNCIATION_PRACTICE) 
              },
              { 
                title: 'Fluency', 
                sub: 'Speak smoothly', 
                icon: Icons.MessageSquare, 
                gradient: 'from-orange-500 to-orange-600',
                bgGradient: 'from-orange-50 to-orange-100',
                emoji: '💬',
                action: () => setView(View.FLUENCY_PRACTICE) 
              },
            ].map((item, idx) => (
              <button 
                key={idx} 
                onClick={item.action}
                className="group relative bg-white rounded-3xl p-5 shadow-md hover:shadow-2xl transition-all duration-300 hover-lift active-press border-2 border-gray-100 hover:border-gray-200 h-44"
              >
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300`}></div>
                
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <item.icon size={26} strokeWidth={2.5} />
                  </div>
                  
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{item.emoji}</span>
                      <div className="font-black text-gray-900 text-base">{item.title}</div>
                    </div>
                    <div className="text-xs text-gray-600 font-semibold">{item.sub}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Daily Progress */}
        <AnimatedCard variant="gradient" className="animate-slideUp">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-black text-gray-900 mb-1">Today's Progress</h3>
              <p className="text-sm text-gray-600 font-medium">You're 65% to your daily goal!</p>
            </div>
            <div className="text-3xl animate-bounce">🎯</div>
          </div>
          <AnimatedProgressBar progress={65} variant="blue" height="lg" />
        </AnimatedCard>
      </div>
    </GradientBackground>
  );
};

export default Dashboard;
