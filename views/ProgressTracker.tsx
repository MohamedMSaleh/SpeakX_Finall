import React, { useState } from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';
import { GradientBackground, GlowingOrb } from '../components/DecorativeElements';
import { PopIn } from '../components/MicroInteractions';
import { colors, gradients } from '../styles/designSystem';
import { useIsMobile } from '../utils/responsive';

const ProgressTracker: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  const isMobile = useIsMobile();
  
  // User's goal settings - Daily practice minutes
  const [selectedGoal, setSelectedGoal] = useState<15 | 30 | 45 | 60>(30);
  
  // Calculate time to reach goal based on daily minutes
  const goalSettings = {
    15: { dailyMinutes: 15, label: '15 Min', icon: '⏱️' },
    30: { dailyMinutes: 30, label: '30 Min', icon: '🎯' },
    45: { dailyMinutes: 45, label: '45 Min', icon: '⭐' },
    60: { dailyMinutes: 60, label: '60 Min', icon: '🚀' }
  };
  
  const currentGoal = goalSettings[selectedGoal];
  
  // Calculate time to reach fluency (assuming 120 hours total needed for basic fluency)
  const totalHoursNeeded = 120;
  const hoursPerDay = currentGoal.dailyMinutes / 60;
  const daysNeeded = Math.ceil(totalHoursNeeded / hoursPerDay);
  const weeksNeeded = Math.ceil(daysNeeded / 7);
  const monthsNeeded = Math.ceil(daysNeeded / 30);
  
  // Format the time to reach goal
  let timeToGoal = '';
  if (monthsNeeded >= 12) {
    const years = Math.ceil(monthsNeeded / 12);
    timeToGoal = `${years} ${years === 1 ? 'year' : 'years'}`;
  } else if (monthsNeeded > 1) {
    timeToGoal = `${monthsNeeded} months`;
  } else if (weeksNeeded > 1) {
    timeToGoal = `${weeksNeeded} weeks`;
  } else {
    timeToGoal = `${daysNeeded} days`;
  }
  
  // Mock progress data
  const progressPercentage = 15;

  return (
    <div className="h-full overflow-y-auto relative">
      <GradientBackground variant="primary" className="min-h-full">
        <div className="relative z-10 p-6 md:p-8 pb-24 md:pb-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => setView(View.DASHBOARD)}
              className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              <Icons.ArrowLeft size={isMobile ? 20 : 24} className="text-gray-700" />
            </button>
            <h1 className="text-xl md:text-2xl font-black text-gray-900">Your Progress 📊</h1>
            <div className="w-10 h-10 md:w-12 md:h-12" />
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Goal Selection */}
            <PopIn delay={0}>
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-blue-100 relative overflow-hidden">
                <GlowingOrb color={colors.primary.blue} size={200} className="-right-20 -top-20" />
                
                <div className="relative z-10">
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6">Choose Your Goal</h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {([15, 30, 45, 60] as const).map((minutes) => {
                      const goal = goalSettings[minutes];
                      const isSelected = selectedGoal === minutes;
                      
                      return (
                        <button
                          key={minutes}
                          onClick={() => setSelectedGoal(minutes)}
                          className={`p-4 md:p-5 rounded-2xl border-2 transition-all duration-300 min-h-[100px] flex flex-col items-center justify-center ${
                            isSelected
                              ? 'bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-600 text-white shadow-xl scale-105'
                              : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-blue-300 hover:shadow-lg active:scale-95'
                          }`}
                        >
                          <div className="text-3xl md:text-4xl mb-2">{goal.icon}</div>
                          <div className={`text-sm md:text-base font-black ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                            {goal.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </PopIn>

            {/* Daily Requirement - Big Display */}
            <PopIn delay={100}>
              <div 
                className="rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-purple-100 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
              >
                <GlowingOrb color="#a78bfa" size={150} className="-left-16 -top-16" />
                <GlowingOrb color="#c084fc" size={120} className="-right-12 -bottom-12" />
                
                <div className="relative z-10 text-center text-white">
                  <div className="mb-6">
                    <Icons.Target size={isMobile ? 48 : 64} className="inline text-yellow-300" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-purple-100 mb-4">Your Learning Goal</h3>
                  <div className="text-5xl md:text-7xl font-black mb-4">
                    {timeToGoal}
                  </div>
                  <p className="text-lg md:text-xl text-purple-100 font-semibold">
                    to reach fluency {currentGoal.icon}
                  </p>
                  <p className="text-sm md:text-base text-purple-200 font-medium mt-3">
                    with {currentGoal.dailyMinutes} minutes daily practice
                  </p>
                </div>
              </div>
            </PopIn>

            {/* Progress Bar */}
            <PopIn delay={200}>
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg md:text-xl font-black text-gray-900">Overall Progress</h3>
                  <span className="text-2xl md:text-3xl font-black text-blue-600">{progressPercentage}%</span>
                </div>
                
                <div className="h-6 bg-gray-100 rounded-full overflow-hidden mb-4">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-1000 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </PopIn>

            {/* Motivational Message */}
            <PopIn delay={300}>
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-6 md:p-8 shadow-xl text-center">
                <div className="text-4xl mb-3">💪</div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-2">
                  You're on the right track!
                </h3>
                <p className="text-base md:text-lg text-pink-100 font-semibold">
                  Keep practicing {currentGoal.dailyMinutes} minutes daily to reach fluency. You've got this!
                </p>
              </div>
            </PopIn>


          </div>
        </div>
      </GradientBackground>
    </div>
  );
};

export default ProgressTracker;
