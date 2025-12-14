
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
          
          {/* Motivation Statement - Thin and Small */}
          <PopIn delay={0}>
            <div 
              className="rounded-2xl p-4 md:p-5 shadow-lg border border-purple-100 flex items-center justify-center relative overflow-hidden h-20 md:h-24 hover:shadow-xl transition-all duration-300 group"
              style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #c084fc 50%, #e879f9 100%)' }}
            >
              <GlowingOrb color="#d8b4fe" size={isMobile ? 100 : 140} className="-right-10 md:-right-14 -top-8 md:-top-10" />
              <GlowingOrb color="#f0abfc" size={isMobile ? 80 : 110} className="-left-8 md:-left-10 -bottom-6 md:-bottom-8" />
              <div className="relative z-10 text-center px-2">
                <div className="text-base sm:text-lg md:text-xl font-black text-white leading-tight">
                  Every step forward is progress! 🚀
                </div>
                <p className="text-xs md:text-sm text-purple-100 font-semibold mt-0.5">Keep learning, keep growing!</p>
              </div>
            </div>
          </PopIn>

          {/* Top Stats Row - 3 Cards in a Row */}
          <PopIn delay={100}>
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {/* Your Progress - Clickable */}
              <button
                onClick={() => setView(View.PROGRESS_TRACKER)}
                className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-lg border-2 border-emerald-100 flex flex-col justify-between h-28 sm:h-32 md:h-36 hover:shadow-xl transition-all duration-300 group active:scale-95"
                style={{ background: 'linear-gradient(135deg, #ffffff 0%, #D1FAE5 100%)' }}
              >
                <GlowingOrb color={colors.secondary.success} size={isMobile ? 100 : 150} className="-right-8 md:-right-12 -top-8 md:-top-12" />
                <div className="relative z-10">
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-emerald-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Icons.TrendingUp size={isMobile ? 14 : 18} className="text-white" />
                    </div>
                    <h3 className="text-gray-500 font-bold text-[9px] md:text-[10px] uppercase tracking-wider">Your Progress</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm sm:text-base md:text-lg font-black text-emerald-600">Track Goals</div>
                    <Icons.ArrowRight size={isMobile ? 14 : 18} className="text-emerald-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>

              {/* Roadmap Thumbnail - Clickable */}
              <button
                onClick={() => setView(View.ROADMAP)}
                className="bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl border-2 border-indigo-100 shadow-lg flex flex-col justify-center h-28 sm:h-32 md:h-36 hover:shadow-xl transition-all duration-300 group active:scale-95 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #ffffff 0%, #E0E7FF 100%)' }}
              >
                <GlowingOrb color={colors.primary.blue} size={isMobile ? 100 : 150} className="-right-8 md:-right-12 -top-8 md:-top-12" />
                {/* Mini Roadmap Preview */}
                <div className="absolute inset-0 opacity-20 flex items-center justify-center">
                  <div className="flex flex-col gap-1.5 scale-75">
                    <div className="w-6 h-6 rounded-full bg-indigo-500"></div>
                    <div className="w-1 h-4 bg-indigo-400 mx-auto"></div>
                    <div className="w-6 h-6 rounded-full bg-indigo-400"></div>
                    <div className="w-1 h-4 bg-indigo-300 mx-auto"></div>
                    <div className="w-6 h-6 rounded-full bg-indigo-300"></div>
                  </div>
                </div>
                <div className="relative z-10 text-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl mx-auto mb-2 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <Icons.Map size={isMobile ? 16 : 20} className="text-white" />
                  </div>
                  <div className="text-[10px] md:text-xs font-black text-indigo-600 uppercase tracking-wide">Learning</div>
                  <div className="text-sm sm:text-base md:text-lg font-black text-indigo-700">Roadmap</div>
                </div>
              </button>

              {/* Quick Quiz - Clickable */}
              <button
                onClick={() => setView(View.QUICK_QUIZ)}
                className="bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl border-2 border-amber-100 shadow-lg flex flex-col justify-center h-28 sm:h-32 md:h-36 hover:shadow-xl transition-all duration-300 group active:scale-95"
                style={{ background: 'linear-gradient(135deg, #ffffff 0%, #FEF3C7 100%)' }}
              >
                <GlowingOrb color={colors.secondary.warning} size={isMobile ? 100 : 150} className="-right-8 md:-right-12 -top-8 md:-top-12" />
                <div className="relative z-10 text-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl mx-auto mb-2 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-12 transition-all">
                    <Icons.Zap size={isMobile ? 16 : 20} className="text-white" />
                  </div>
                  <div className="text-[10px] md:text-xs font-black text-amber-600 uppercase tracking-wide">Daily</div>
                  <div className="text-sm sm:text-base md:text-lg font-black text-amber-700">Quick Quiz</div>
                </div>
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
                  <div className="font-black text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight mb-0.5 md:mb-1">Ready to Level Up? 🚀</div>
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
