import React, { useState } from 'react';
import { FloatingShapes, GradientBackground, WaveDecoration, GlowingOrb, BlobShape } from './components/DecorativeElements';
import { RewardBadge, StreakDisplay, ProgressRing, LevelBadge, XPCounter, AchievementCard } from './components/RewardElements';
import { Confetti, Sparkles, ProgressBar, PopIn, SuccessAnimation } from './components/MicroInteractions';
import { gradients, colors } from './styles/designSystem';
import * as Icons from './components/Icons';

/**
 * Component Showcase - Demo all new design components
 * This file is for demonstration purposes
 */
const ComponentShowcase: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <GradientBackground variant="primary" className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black gradient-text mb-4">SpeakX Design System</h1>
          <p className="text-gray-600 text-lg font-medium">
            A fun, engaging, and motivating visual experience
          </p>
        </div>

        {/* Reward Badges */}
        <section className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Reward Badges</h2>
          <div className="flex flex-wrap gap-6 items-center justify-center">
            <RewardBadge type="streak" size={64} glow animated />
            <RewardBadge type="level" size={64} glow />
            <RewardBadge type="achievement" size={64} glow />
            <RewardBadge type="star" size={64} count={3} />
            <RewardBadge type="trophy" size={64} glow animated />
            <RewardBadge type="gem" size={64} />
          </div>
        </section>

        {/* User Stats */}
        <section className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-black text-gray-900 mb-6">User Stats Display</h2>
          <div className="flex flex-wrap gap-8 items-center justify-center">
            <StreakDisplay days={12} size="large" />
            <LevelBadge level={5} size={80} />
            <XPCounter xp={50} animated />
            <ProgressRing progress={75} size={120} color={colors.primary.blue} />
          </div>
        </section>

        {/* Progress Bars */}
        <section className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Progress Bars</h2>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold text-gray-600 mb-2">Blue Gradient</p>
              <ProgressBar progress={65} gradient={gradients.cardBlue} height={12} showLabel />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-600 mb-2">Green Gradient</p>
              <ProgressBar progress={85} gradient={gradients.cardGreen} height={12} showLabel />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-600 mb-2">Purple Gradient</p>
              <ProgressBar progress={45} gradient={gradients.cardPurple} height={12} showLabel />
            </div>
          </div>
        </section>

        {/* Achievement Cards */}
        <section className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Achievement Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AchievementCard
              title="Super Star"
              description="Complete a 7-day streak"
              icon="star"
              unlocked={true}
            />
            <AchievementCard
              title="Scholar"
              description="Learn 100 new words"
              icon="star"
              unlocked={false}
              progress={67}
            />
          </div>
        </section>

        {/* Animations */}
        <section className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Animations & Effects</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowConfetti(!showConfetti)}
              className="px-6 py-3 rounded-2xl font-bold text-white shadow-lg hover:scale-105 transition-all"
              style={{ background: gradients.cardBlue }}
            >
              🎊 Trigger Confetti
            </button>
            <button
              onClick={() => setShowSparkles(!showSparkles)}
              className="px-6 py-3 rounded-2xl font-bold text-white shadow-lg hover:scale-105 transition-all"
              style={{ background: gradients.cardPurple }}
            >
              ✨ Trigger Sparkles
            </button>
            <button
              onClick={() => setShowSuccess(true)}
              className="px-6 py-3 rounded-2xl font-bold text-white shadow-lg hover:scale-105 transition-all"
              style={{ background: gradients.cardGreen }}
            >
              🎉 Success Animation
            </button>
          </div>
          <Confetti active={showConfetti} duration={3000} />
          <Sparkles active={showSparkles} />
          <SuccessAnimation show={showSuccess} onComplete={() => setShowSuccess(false)} />
        </section>

        {/* Gradient Buttons */}
        <section className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Gradient Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <button
              className="px-8 py-4 rounded-2xl font-black text-white shadow-lg hover:scale-105 transition-all"
              style={{ background: gradients.cardBlue }}
            >
              Primary Button
            </button>
            <button
              className="px-8 py-4 rounded-2xl font-black text-white shadow-lg hover:scale-105 transition-all"
              style={{ background: gradients.cardGreen }}
            >
              Success Button
            </button>
            <button
              className="px-8 py-4 rounded-2xl font-black text-white shadow-lg hover:scale-105 transition-all"
              style={{ background: gradients.cardYellow }}
            >
              Warning Button
            </button>
            <button
              className="px-8 py-4 rounded-2xl font-black text-white shadow-lg hover:scale-105 transition-all"
              style={{ background: gradients.cardPurple }}
            >
              Energy Button
            </button>
            <button
              className="px-8 py-4 rounded-2xl font-black text-white shadow-lg hover:scale-105 transition-all"
              style={{ background: gradients.cardPink }}
            >
              Special Button
            </button>
          </div>
        </section>

        {/* Decorative Elements */}
        <section className="bg-white rounded-3xl p-8 shadow-lg relative overflow-hidden min-h-[300px]">
          <GlowingOrb color={colors.primary.blue} size={200} className="top-0 right-0" />
          <div className="relative z-10">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Decorative Elements</h2>
            <p className="text-gray-600 font-medium mb-4">
              This section demonstrates glowing orbs and floating shapes in the background
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
                <p className="font-bold text-gray-700">Soft Gradients</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                <p className="font-bold text-gray-700">Subtle Colors</p>
              </div>
            </div>
          </div>
        </section>

        {/* Color Palette */}
        <section className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="w-full h-24 rounded-2xl mb-2" style={{ background: colors.primary.blue }} />
              <p className="text-sm font-bold text-gray-700">Primary Blue</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 rounded-2xl mb-2" style={{ background: colors.secondary.success }} />
              <p className="text-sm font-bold text-gray-700">Success Green</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 rounded-2xl mb-2" style={{ background: colors.secondary.warning }} />
              <p className="text-sm font-bold text-gray-700">Warning Yellow</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 rounded-2xl mb-2" style={{ background: colors.secondary.energy }} />
              <p className="text-sm font-bold text-gray-700">Energy Purple</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 rounded-2xl mb-2" style={{ background: colors.secondary.pink }} />
              <p className="text-sm font-bold text-gray-700">Special Pink</p>
            </div>
          </div>
        </section>

      </div>
    </GradientBackground>
  );
};

export default ComponentShowcase;
