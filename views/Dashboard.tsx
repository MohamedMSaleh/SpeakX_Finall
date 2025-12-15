
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
    <div className="h-full overflow-y-auto relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Gradient Background with Floating Shapes */}
      <GradientBackground variant="primary" className="min-h-full">
        <div className={`relative z-10 ${responsivePadding.md} space-y-4 md:space-y-6 pb-24 md:pb-8`}>
          
          {/* Top Cards - 4 columns on desktop, 2 on mobile */}
          <PopIn delay={0}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {/* Motivation Statement - Enhanced with modern gradients */}
              <button
                className="bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-white/60 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 active:scale-95 group flex flex-col justify-between h-36 md:h-44 relative overflow-hidden min-h-[120px]"
              >
                {/* Decorative background shapes */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-sky-200/40 to-blue-200/40 rounded-full blur-xl" />
                
                {/* Subtle glow effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, #0EA5E9 0%, #3B82F6 100%)' }}
                />
                
                <div className="relative z-10">
                  <div 
                    className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 text-white shadow-xl group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, #0EA5E9 0%, #3B82F6 100%)' }}
                  >
                    <Icons.Sparkles size={isMobile ? 20 : 28} />
                  </div>
                  <div>
                    <div className="font-black text-gray-900 text-sm md:text-base lg:text-lg mb-0.5 md:mb-1 drop-shadow-sm">Every step forward is progress!</div>
                  </div>
                </div>
                
                {/* Enhanced corner accents */}
                <div className="absolute top-2 md:top-3 right-2 md:right-3 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 group-hover:scale-150 transition-transform shadow-lg" />
                <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/70 group-hover:scale-125 transition-transform" />
              </button>

              {/* Your Progress - Clickable with mint accents */}
              <button
                onClick={() => setView(View.PROGRESS_TRACKER)}
                className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-white/60 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 active:scale-95 group flex flex-col justify-between h-36 md:h-44 relative overflow-hidden min-h-[120px]"
              >
                {/* Decorative background shapes */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-cyan-200/40 to-emerald-200/40 rounded-full blur-xl" />
                
                {/* Subtle glow effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)' }}
                />
                
                <div className="relative z-10">
                  <div 
                    className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 text-white shadow-xl group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)' }}
                  >
                    <Icons.TrendingUp size={isMobile ? 20 : 28} />
                  </div>
                  <div>
                    <div className="font-black text-gray-900 text-sm md:text-base lg:text-lg mb-0.5 md:mb-1 drop-shadow-sm">Your Progress</div>
                    <div className="text-xs md:text-sm text-gray-700 font-bold">Track Goals</div>
                  </div>
                </div>
                
                {/* Enhanced corner accents */}
                <div className="absolute top-2 md:top-3 right-2 md:right-3 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 group-hover:scale-150 transition-transform shadow-lg" />
                <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/70 group-hover:scale-125 transition-transform" />
              </button>

              {/* Roadmap - Clickable with lavender accents */}
              <button
                onClick={() => setView(View.ROADMAP)}
                className="bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50 p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-white/60 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 active:scale-95 group flex flex-col justify-between h-36 md:h-44 relative overflow-hidden min-h-[120px]"
              >
                {/* Decorative background shapes */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-indigo-200/30 to-violet-200/30 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-200/40 to-indigo-200/40 rounded-full blur-xl" />
                
                {/* Subtle glow effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' }}
                />
                
                <div className="relative z-10">
                  <div 
                    className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 text-white shadow-xl group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)' }}
                  >
                    <Icons.Map size={isMobile ? 20 : 28} />
                  </div>
                  <div>
                    <div className="font-black text-gray-900 text-sm md:text-base lg:text-lg mb-0.5 md:mb-1 drop-shadow-sm">Roadmap</div>
                  </div>
                </div>
                
                {/* Enhanced corner accents */}
                <div className="absolute top-2 md:top-3 right-2 md:right-3 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 group-hover:scale-150 transition-transform shadow-lg" />
                <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/70 group-hover:scale-125 transition-transform" />
              </button>

              {/* Quick Quiz - Clickable with soft gold accents */}
              <button
                onClick={() => setView(View.QUICK_QUIZ)}
                className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-white/60 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 active:scale-95 group flex flex-col justify-between h-36 md:h-44 relative overflow-hidden min-h-[120px]"
              >
                {/* Decorative background shapes */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-amber-200/30 to-yellow-200/30 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-orange-200/40 to-amber-200/40 rounded-full blur-xl" />
                
                {/* Subtle glow effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)' }}
                />
                
                <div className="relative z-10">
                  <div 
                    className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 text-white shadow-xl group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)' }}
                  >
                    <Icons.Zap size={isMobile ? 20 : 28} />
                  </div>
                  <div>
                    <div className="font-black text-gray-900 text-sm md:text-base lg:text-lg mb-0.5 md:mb-1 drop-shadow-sm">Quick Quiz</div>
                  </div>
                </div>
                
                {/* Enhanced corner accents */}
                <div className="absolute top-2 md:top-3 right-2 md:right-3 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gradient-to-br from-amber-400 to-yellow-400 group-hover:scale-150 transition-transform shadow-lg" />
                <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/70 group-hover:scale-125 transition-transform" />
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
                    gradient: 'linear-gradient(135deg, #0EA5E9 0%, #3B82F6 100%)',
                    bgColor: 'from-blue-50 via-sky-50 to-cyan-50',
                    accentFrom: 'from-blue-400',
                    accentTo: 'to-cyan-400',
                    shapeColor: 'from-blue-200/30 to-cyan-200/30',
                    action: () => setView(View.VOCAB_PRACTICE) 
                  },
                  { 
                    title: 'Grammar', 
                    sub: 'Master rules', 
                    icon: Icons.CheckCircle, 
                    gradient: 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)',
                    bgColor: 'from-emerald-50 via-teal-50 to-green-50',
                    accentFrom: 'from-emerald-400',
                    accentTo: 'to-teal-400',
                    shapeColor: 'from-emerald-200/30 to-teal-200/30',
                    action: () => setView(View.GRAMMAR_PRACTICE) 
                  },
                  { 
                    title: 'Pronunciation', 
                    sub: 'Perfect accent', 
                    icon: Icons.Mic, 
                    gradient: 'linear-gradient(135deg, #EC4899 0%, #A855F7 100%)',
                    bgColor: 'from-pink-50 via-fuchsia-50 to-purple-50',
                    accentFrom: 'from-pink-400',
                    accentTo: 'to-purple-400',
                    shapeColor: 'from-pink-200/30 to-purple-200/30',
                    action: () => setView(View.PRONUNCIATION_PRACTICE) 
                  },
                  { 
                    title: 'Fluency', 
                    sub: 'Speak naturally', 
                    icon: Icons.MessageSquare, 
                    gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
                    bgColor: 'from-amber-50 via-yellow-50 to-orange-50',
                    accentFrom: 'from-amber-400',
                    accentTo: 'to-orange-400',
                    shapeColor: 'from-amber-200/30 to-orange-200/30',
                    action: () => setView(View.FLUENCY_PRACTICE) 
                  },
                ].map((item, idx) => (
                  <button 
                    key={idx} 
                    onClick={item.action}
                    className={`bg-gradient-to-br ${item.bgColor} p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-white/60 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 active:scale-95 group flex flex-col justify-between h-36 md:h-44 relative overflow-hidden min-h-[120px]`}
                  >
                    {/* Decorative background shapes */}
                    <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${item.shapeColor} rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500`} />
                    <div className={`absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr ${item.shapeColor} rounded-full blur-xl`} />
                    
                    {/* Subtle glow effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                      style={{ background: item.gradient }}
                    />
                    
                    <div className="relative z-10">
                      <div 
                        className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 text-white shadow-xl group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                        style={{ background: item.gradient }}
                      >
                        <item.icon size={isMobile ? 20 : 28} />
                      </div>
                      <div>
                        <div className="font-black text-gray-900 text-sm md:text-base lg:text-lg mb-0.5 md:mb-1 drop-shadow-sm">{item.title}</div>
                        <div className="text-xs md:text-sm text-gray-700 font-bold">{item.sub}</div>
                      </div>
                    </div>
                    
                    {/* Enhanced corner accents */}
                    <div className={`absolute top-2 md:top-3 right-2 md:right-3 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gradient-to-br ${item.accentFrom} ${item.accentTo} group-hover:scale-150 transition-transform shadow-lg`} />
                    <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/70 group-hover:scale-125 transition-transform" />
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
