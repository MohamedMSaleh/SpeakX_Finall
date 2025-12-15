
import React from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';
import { GradientBackground, FloatingShapes, WaveDecoration, GlowingOrb } from '../components/DecorativeElements';
import { RewardBadge, StreakDisplay, ProgressRing, LevelBadge } from '../components/RewardElements';
import { PopIn } from '../components/MicroInteractions';
import { colors, gradients } from '../styles/designSystem';
import { useIsMobile, useDeviceType, responsivePadding, responsiveGap } from '../utils/responsive';

const Dashboard: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  const isMobile = useIsMobile();
  const deviceType = useDeviceType();

  return (
    <div className="h-full overflow-y-auto relative">
      {/* Gradient Background with Floating Shapes */}
      <GradientBackground variant="primary" className="min-h-full">
        <div className={`relative z-10 ${responsivePadding.md} space-y-4 md:space-y-6 pb-24 md:pb-8`}>
          
          {/* Top Cards - 2x2 Grid Layout */}
          <PopIn delay={0}>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {/* Motivation Statement - Redesigned to match practice areas */}
              <button
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-white shadow-lg text-left hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95 group flex flex-col justify-between h-36 md:h-44 relative overflow-hidden min-h-[120px]"
              >
                {/* Subtle glow effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' }}
                />
                
                <div className="relative z-10">
                  <div 
                    className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' }}
                  >
                    <Icons.Sparkles size={isMobile ? 20 : 28} />
                  </div>
                  <div>
                    <div className="font-black text-gray-900 text-sm md:text-base lg:text-lg mb-0.5 md:mb-1">Every step forward is progress!</div>
                  </div>
                </div>
                
                {/* Corner accent */}
                <div className="absolute top-2 md:top-3 right-2 md:right-3 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/50 group-hover:scale-150 transition-transform" />
              </button>

              {/* Your Progress - Clickable */}
              <button
                onClick={() => setView(View.PROGRESS_TRACKER)}
                className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-white shadow-lg text-left hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95 group flex flex-col justify-between h-36 md:h-44 relative overflow-hidden min-h-[120px]"
              >
                {/* Subtle glow effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ background: gradients.cardGreen }}
                />
                
                <div className="relative z-10">
                  <div 
                    className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                    style={{ background: gradients.cardGreen }}
                  >
                    <Icons.TrendingUp size={isMobile ? 20 : 28} />
                  </div>
                  <div>
                    <div className="font-black text-gray-900 text-sm md:text-base lg:text-lg mb-0.5 md:mb-1">Your Progress</div>
                    <div className="text-xs md:text-sm text-gray-600 font-semibold">Track Goals</div>
                  </div>
                </div>
                
                {/* Corner accent */}
                <div className="absolute top-2 md:top-3 right-2 md:right-3 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/50 group-hover:scale-150 transition-transform" />
              </button>

              {/* Roadmap Thumbnail - Clickable */}
              <button
                onClick={() => setView(View.ROADMAP)}
                className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-white shadow-lg text-left hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95 group flex flex-col justify-between h-36 md:h-44 relative overflow-hidden min-h-[120px]"
              >
                {/* Subtle glow effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ background: gradients.cardBlue }}
                />
                
                <div className="relative z-10">
                  <div 
                    className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                    style={{ background: gradients.cardBlue }}
                  >
                    <Icons.Map size={isMobile ? 20 : 28} />
                  </div>
                  <div>
                    <div className="font-black text-gray-900 text-sm md:text-base lg:text-lg mb-0.5 md:mb-1">Learning</div>
                    <div className="text-xs md:text-sm text-gray-600 font-semibold">Roadmap</div>
                  </div>
                </div>
                
                {/* Corner accent */}
                <div className="absolute top-2 md:top-3 right-2 md:right-3 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/50 group-hover:scale-150 transition-transform" />
              </button>

              {/* Quick Quiz - Clickable */}
              <button
                onClick={() => setView(View.QUICK_QUIZ)}
                className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-white shadow-lg text-left hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95 group flex flex-col justify-between h-36 md:h-44 relative overflow-hidden min-h-[120px]"
              >
                {/* Subtle glow effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ background: gradients.cardYellow }}
                />
                
                <div className="relative z-10">
                  <div 
                    className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                    style={{ background: gradients.cardYellow }}
                  >
                    <Icons.Zap size={isMobile ? 20 : 28} />
                  </div>
                  <div>
                    <div className="font-black text-gray-900 text-sm md:text-base lg:text-lg mb-0.5 md:mb-1">Daily</div>
                    <div className="text-xs md:text-sm text-gray-600 font-semibold">Quick Quiz</div>
                  </div>
                </div>
                
                {/* Corner accent */}
                <div className="absolute top-2 md:top-3 right-2 md:right-3 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/50 group-hover:scale-150 transition-transform" />
              </button>
            </div>
          </PopIn>

          {/* 2. Assessment Banner - More Engaging & Responsive */}
          <PopIn delay={200}>
            <div 
              className="w-full rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between shadow-2xl relative overflow-hidden gap-4 md:gap-6 border-2 border-blue-200"
              style={{ background: gradients.cardBlue }}
            >
              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 w-32 md:w-48 h-32 md:h-48 bg-white rounded-full blur-2xl animate-float" />
              </div>
              
              <div className="flex items-center gap-3 md:gap-5 text-white relative z-10">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-sm border-2 border-white/30 shrink-0 hover:scale-110 transition-transform">
                  <Icons.Target className="text-white" size={isMobile ? 24 : 32} />
                </div>
                <div>
                  <div className="font-black text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight mb-0.5 md:mb-1">Assess Me 🚀</div>
                  <div className="text-xs md:text-sm text-blue-100 font-medium">Get a personalized plan based on your skills</div>
                </div>
              </div>
              <button 
                className="relative z-10 bg-white text-blue-700 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl text-sm md:text-base font-black shadow-xl hover:bg-blue-50 hover:scale-105 transition-all whitespace-nowrap w-full sm:w-auto active:scale-95 min-h-[44px]" 
                onClick={() => setView(View.ASSESSMENT_HISTORY)}
              >
                Start Assessment ✨
              </button>
            </div>
          </PopIn>

          {/* 3. Practice Areas - Enhanced with gradients & Responsive */}
          <PopIn delay={300}>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-4 md:mb-5 flex items-center gap-2">
                <Icons.Zap size={isMobile ? 22 : 28} className="text-blue-600" />
                Practice Areas
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {[
                  { 
                    title: 'Vocabulary', 
                    sub: 'Expand words', 
                    icon: Icons.BookOpen, 
                    gradient: gradients.cardBlue,
                    bgColor: 'from-blue-50 to-blue-100',
                    action: () => setView(View.VOCAB_PRACTICE) 
                  },
                  { 
                    title: 'Grammar', 
                    sub: 'Master rules', 
                    icon: Icons.CheckCircle, 
                    gradient: gradients.cardGreen,
                    bgColor: 'from-green-50 to-green-100',
                    action: () => setView(View.GRAMMAR_PRACTICE) 
                  },
                  { 
                    title: 'Pronunciation', 
                    sub: 'Perfect accent', 
                    icon: Icons.Mic, 
                    gradient: gradients.cardPurple,
                    bgColor: 'from-purple-50 to-purple-100',
                    action: () => setView(View.PRONUNCIATION_PRACTICE) 
                  },
                  { 
                    title: 'Fluency', 
                    sub: 'Speak naturally', 
                    icon: Icons.MessageSquare, 
                    gradient: gradients.cardYellow,
                    bgColor: 'from-orange-50 to-orange-100',
                    action: () => setView(View.FLUENCY_PRACTICE) 
                  },
                ].map((item, idx) => (
                  <button 
                    key={idx} 
                    onClick={item.action}
                    className={`bg-gradient-to-br ${item.bgColor} p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-white shadow-lg text-left hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95 group flex flex-col justify-between h-36 md:h-44 relative overflow-hidden min-h-[120px]`}
                  >
                    {/* Subtle glow effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{ background: item.gradient }}
                    />
                    
                    <div className="relative z-10">
                      <div 
                        className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                        style={{ background: item.gradient }}
                      >
                        <item.icon size={isMobile ? 20 : 28} />
                      </div>
                      <div>
                        <div className="font-black text-gray-900 text-sm md:text-base lg:text-lg mb-0.5 md:mb-1">{item.title}</div>
                        <div className="text-xs md:text-sm text-gray-600 font-semibold">{item.sub}</div>
                      </div>
                    </div>
                    
                    {/* Corner accent */}
                    <div className="absolute top-2 md:top-3 right-2 md:right-3 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/50 group-hover:scale-150 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          </PopIn>

        </div>
      </GradientBackground>
    </div>
  );
};

export default Dashboard;
