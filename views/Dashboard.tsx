
import React, { useState, useEffect } from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';

const Dashboard: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  const [xpCount, setXpCount] = useState(0);
  const targetXP = 1840;

  // Animate XP counter on load
  useEffect(() => {
    const duration = 1500;
    const increment = targetXP / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetXP) {
        setXpCount(targetXP);
        clearInterval(timer);
      } else {
        setXpCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6 pb-24 md:pb-6 custom-scrollbar bg-gradient-to-br from-blue-50 via-white to-purple-50 relative">
      
      {/* Floating Background Shapes */}
      <div className="floating-shapes">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      {/* Welcome Section with Streak */}
      <div className="relative z-10 scale-in">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900">Welcome back! 👋</h1>
            <p className="text-gray-600 font-medium mt-1">Keep up the amazing work!</p>
          </div>
          {/* Streak Indicator */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-2 rounded-2xl shadow-lg">
            <span className="text-2xl streak-flame">🔥</span>
            <div className="text-left">
              <div className="text-xs font-bold opacity-90">Streak</div>
              <div className="text-xl font-black">12</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 1. Top Stats Row (Overall & Growth) - Enhanced */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 slide-up">
          {/* Overall Score */}
          <div className="card-modern bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-5 flex flex-col justify-between h-36 border-0 hover:scale-105 transition-transform">
            <div>
              <h3 className="text-white/80 font-bold text-xs mb-1 uppercase tracking-wider">Overall</h3>
              <div className="text-3xl font-black">Excellent</div>
            </div>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Icons.Award size={18} className="text-white" />
            </div>
          </div>

          {/* Weekly Change */}
          <div className="card-modern h-36 bg-white hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                 <Icons.TrendingUp size={20} className="text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-gray-500 font-bold text-xs uppercase tracking-wider">Growth</h3>
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">+2%</span>
            <p className="text-xs text-gray-500 font-medium mt-1">This week</p>
          </div>

          {/* Lessons Done */}
          <div className="card-modern h-36 bg-white hover:scale-105 transition-transform">
               <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-3 shadow-lg">
                   <Icons.CheckCircle size={24} strokeWidth={2.5} />
               </div>
               <div>
                   <div className="text-3xl font-black text-gray-900">12</div>
                   <div className="text-xs text-gray-500 font-bold uppercase tracking-wide mt-1">Lessons Done</div>
               </div>
          </div>

          {/* Practice Time */}
          <div className="card-modern h-36 bg-white hover:scale-105 transition-transform">
               <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-600 rounded-2xl flex items-center justify-center text-white mb-3 shadow-lg">
                   <Icons.Clock size={24} strokeWidth={2.5} />
               </div>
               <div>
                   <div className="text-3xl font-black text-gray-900">4.5h</div>
                   <div className="text-xs text-gray-500 font-bold uppercase tracking-wide mt-1">Practice Time</div>
               </div>
          </div>
      </div>

      {/* XP Progress Card - NEW */}
      <div className="card-modern bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 text-white p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-20">
          <Icons.Zap size={120} className="text-white" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white/90 text-sm font-bold uppercase tracking-wide">Your XP</p>
              <p className="text-4xl font-black xp-counter">{xpCount}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
              <p className="text-xs font-bold opacity-90">Rank #5</p>
              <p className="text-sm font-black">Diamond</p>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="progress-bar-modern">
            <div className="progress-bar-fill" style={{ width: '68%' }}></div>
          </div>
          <p className="text-xs text-white/80 font-medium mt-2">610 XP to next rank 🏆</p>
        </div>
      </div>

      {/* 2. Assessment Banner - Enhanced */}
      <div className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between shadow-2xl shadow-blue-300 relative overflow-hidden gap-4 bounce-in">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>
        
        {/* Floating Sparkles */}
        <div className="absolute top-4 right-4 text-3xl sparkle">✨</div>
        
        <div className="flex items-center gap-5 text-white relative z-10">
          <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-md border-2 border-white/30 shrink-0 shadow-xl">
            <Icons.Target className="text-white" size={32} strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-black text-2xl md:text-3xl leading-tight">Take Your Test! 🎯</div>
            <div className="text-sm text-white/90 mt-1 font-medium">Unlock a personalized learning roadmap</div>
          </div>
        </div>
        <button 
            className="relative z-10 bg-white text-blue-700 px-8 py-4 rounded-2xl text-sm font-black shadow-2xl hover:bg-blue-50 hover:scale-105 transition-all whitespace-nowrap w-full sm:w-auto group" 
            onClick={() => setView(View.ASSESSMENT_HISTORY)}
        >
          <span className="flex items-center gap-2">
            Start Now
            <Icons.ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>

      {/* 3. Practice Areas - Enhanced */}
      <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-gray-900">Practice Areas</h2>
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wide">Choose your skill</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { 
                title: 'Vocabulary', 
                sub: 'Expand words', 
                icon: Icons.BookOpen, 
                gradient: 'from-blue-400 to-blue-600',
                bgColor: 'bg-blue-50',
                hoverColor: 'hover:bg-blue-100',
                emoji: '📚',
                action: () => setView(View.VOCAB_PRACTICE) 
              },
              { 
                title: 'Grammar', 
                sub: 'Master rules', 
                icon: Icons.CheckCircle, 
                gradient: 'from-green-400 to-emerald-600',
                bgColor: 'bg-green-50',
                hoverColor: 'hover:bg-green-100',
                emoji: '✏️',
                action: () => setView(View.GRAMMAR_PRACTICE) 
              },
              { 
                title: 'Pronunciation', 
                sub: 'Perfect accent', 
                icon: Icons.Mic, 
                gradient: 'from-purple-400 to-purple-600',
                bgColor: 'bg-purple-50',
                hoverColor: 'hover:bg-purple-100',
                emoji: '🎤',
                action: () => setView(View.PRONUNCIATION_PRACTICE) 
              },
              { 
                title: 'Fluency', 
                sub: 'Speak smoothly', 
                icon: Icons.MessageSquare, 
                gradient: 'from-orange-400 to-red-500',
                bgColor: 'bg-orange-50',
                hoverColor: 'hover:bg-orange-100',
                emoji: '💬',
                action: () => setView(View.FLUENCY_PRACTICE) 
              },
            ].map((item, idx) => (
              <button 
                key={idx} 
                onClick={item.action}
                className={`card-modern ${item.bgColor} ${item.hoverColor} p-6 text-left group flex flex-col justify-between h-44 border-2 border-transparent hover:border-opacity-20`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-14 h-14 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                     <item.icon size={26} className="text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-3xl group-hover:scale-125 transition-transform">{item.emoji}</span>
                </div>
                <div>
                  <div className="font-black text-gray-900 text-base mb-1">{item.title}</div>
                  <div className="text-xs text-gray-600 font-bold">{item.sub}</div>
                </div>
              </button>
            ))}
          </div>
      </div>

      {/* Motivational Message - NEW */}
      <div className="card-modern bg-gradient-to-r from-pink-100 to-purple-100 p-6 border-2 border-purple-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">💪</div>
          <div>
            <p className="font-black text-gray-900 text-lg">You're on fire!</p>
            <p className="text-sm text-gray-700 font-medium mt-1">Complete 3 more lessons today to maintain your streak!</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
