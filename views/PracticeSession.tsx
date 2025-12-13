
import React, { useState, useEffect } from 'react';
import * as Icons from '../components/Icons';
import { GradientBackground, GlowingOrb } from '../components/DecorativeElements';
import { ProgressBar, Confetti, Sparkles, SuccessAnimation, XPCounter } from '../components/MicroInteractions';
import { RewardBadge, ProgressRing } from '../components/RewardElements';
import { colors, gradients } from '../styles/designSystem';

const PracticeSession: React.FC<{ onBack: () => void, onComplete: () => void }> = ({ onBack, onComplete }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [score, setScore] = useState(0);

  const handleMic = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setScore(85);
      }, 3000);
    }
  };

  const handleComplete = () => {
    setShowConfetti(true);
    setShowSuccess(true);
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <Confetti active={showConfetti} duration={3000} />
      <Sparkles active={showSuccess} count={15} />
      
      <GradientBackground variant="primary" className="h-full">
        {/* Header with Progress */}
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b-2 border-blue-100 shadow-sm">
          <div className="px-4 py-4 flex items-center justify-between">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition-all active:scale-95">
              <Icons.ChevronRight className="rotate-180 text-gray-700" size={24} />
            </button>
            <div className="flex-1 mx-4">
              <h2 className="font-black text-gray-900 text-center mb-2">Job Interview Practice</h2>
              <ProgressBar progress={65} height={8} gradient={gradients.cardBlue} animated />
            </div>
            <div className="flex items-center gap-2">
              <RewardBadge type="star" size={36} count={3} />
            </div>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col overflow-y-auto pb-32">
          {/* Practice Prompt Card */}
          <div 
            className="bg-white rounded-3xl p-6 shadow-lg border-2 border-blue-100 mb-6 relative overflow-hidden hover:shadow-xl transition-all"
          >
            <GlowingOrb color={colors.primary.blue} size={150} className="-right-12 -top-12" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: gradients.cardBlue }}>
                  <Icons.MessageSquare size={20} className="text-white" />
                </div>
                <h3 className="font-black text-gray-900 text-lg">Read aloud:</h3>
              </div>
              <p className="text-2xl text-blue-900 font-bold leading-relaxed mb-4">
                "Could I please have a large latte with oat milk?"
              </p>
              <button className="text-blue-600 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Switch Prompt <Icons.RefreshCw size={16} />
              </button>
            </div>
          </div>

          {/* Visualizer */}
          <div 
            className="rounded-3xl h-40 flex items-center justify-center mb-8 relative overflow-hidden shadow-lg border-2 border-white"
            style={{ background: gradients.backgroundPrimary }}
          >
            {isListening ? (
              <div className="flex items-end gap-1.5 h-20">
                {[...Array(25)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-2 rounded-full transition-all"
                    style={{ 
                      background: gradients.cardBlue,
                      height: `${Math.random() * 100}%`,
                      animation: `pulse ${Math.random() * 500 + 300}ms infinite alternate`
                    }}
                  ></div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 font-bold flex flex-col items-center gap-2">
                <Icons.Mic size={32} className="text-blue-400" />
                <span>Tap microphone to start</span>
              </div>
            )}
          </div>

          {/* Mic Button - Enhanced */}
          <div className="flex justify-center mb-8">
            <button 
              onClick={handleMic}
              className={`relative w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
                isListening ? 'scale-110' : 'hover:scale-105 active:scale-95'
              }`}
              style={{ background: isListening ? gradients.cardPink : gradients.cardBlue }}
            >
              {isListening && (
                <>
                  <div className="absolute inset-0 rounded-full border-4 border-pink-400 animate-ping opacity-75" />
                  <div className="absolute inset-0 rounded-full border-4 border-pink-300 animate-pulse" />
                </>
              )}
              {isListening ? (
                <div className="w-8 h-8 bg-white rounded-lg"></div>
              ) : (
                <Icons.Mic size={40} color="white" />
              )}
            </button>
          </div>

          {/* Live Feedback Grid - Enhanced */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div 
              className="bg-white p-5 rounded-2xl shadow-lg border-2 border-green-100 hover:shadow-xl transition-all relative overflow-hidden"
            >
              <GlowingOrb color={colors.secondary.success} size={100} className="-right-8 -top-8" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Icons.Volume2 size={16} className="text-green-600" />
                  <div className="text-gray-500 text-xs font-bold uppercase">Pronunciation</div>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black text-green-600">{score || '--'}%</span>
                  {score > 0 && <span className="text-xs text-green-500 font-bold mb-2">+3%</span>}
                </div>
              </div>
            </div>
            
            <div 
              className="bg-white p-5 rounded-2xl shadow-lg border-2 border-blue-100 hover:shadow-xl transition-all relative overflow-hidden"
            >
              <GlowingOrb color={colors.primary.blue} size={100} className="-right-8 -top-8" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Icons.Zap size={16} className="text-blue-600" />
                  <div className="text-gray-500 text-xs font-bold uppercase">Fluency</div>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black text-blue-600">Good</span>
                  {score > 0 && <span className="text-xs text-blue-500 font-bold mb-2">+5%</span>}
                </div>
              </div>
            </div>
            
            <div 
              className="bg-white p-5 rounded-2xl shadow-lg border-2 border-purple-100 col-span-2 hover:shadow-xl transition-all relative overflow-hidden"
            >
              <GlowingOrb color={colors.secondary.energy} size={120} className="-right-10 -top-10" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Icons.TrendingUp size={16} className="text-purple-600" />
                  <div className="text-gray-500 text-xs font-bold uppercase">Confidence</div>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black text-purple-600">High</span>
                  {score > 0 && <span className="text-xs text-purple-500 font-bold mb-2">+2%</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            <button className="flex-1 py-3 px-4 rounded-2xl font-bold text-white shadow-lg" style={{ background: gradients.cardBlue }}>
              Transcript
            </button>
            <button className="flex-1 py-3 px-4 rounded-2xl font-bold text-gray-600 bg-white border-2 border-gray-200 hover:border-gray-300 transition-all">
              Micro-Skills
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100 mb-4">
            <p className="text-gray-800 text-lg leading-relaxed font-medium">
              "<span className="bg-orange-200 px-2 py-1 rounded-lg font-bold">Could I</span> please have a large <span className="bg-orange-200 px-2 py-1 rounded-lg font-bold">latte</span> with oat milk?"
            </p>
          </div>

          {/* Sound Linking Card - Enhanced */}
          <div 
            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 shadow-lg border-2 border-blue-100"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: gradients.cardPurple }}>
                <Icons.Lightbulb size={20} className="text-white" />
              </div>
              <div>
                <h4 className="font-black text-gray-900 text-base mb-2">💡 Sound Linking Tip</h4>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">
                  The '/d/' sound in 'Could' should smoothly link to the 'I'. Tap to hear the correct way.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 py-3 rounded-xl font-bold text-white shadow-md hover:scale-105 transition-all active:scale-95 flex items-center justify-center gap-2" style={{ background: gradients.cardBlue }}>
                <Icons.Play size={18} fill="currentColor" /> Play
              </button>
              <button className="flex-1 py-3 rounded-xl font-bold bg-white border-2 border-blue-200 text-blue-700 hover:border-blue-300 hover:scale-105 transition-all active:scale-95 flex items-center justify-center gap-2">
                <Icons.Mic size={18} /> Practice
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bar - Enhanced */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t-2 border-blue-100 p-4 pb-safe z-20 shadow-2xl">
          <div className="flex items-center gap-3 max-w-2xl mx-auto">
            <button 
              onClick={() => setIsListening(false)} 
              className="text-white px-6 py-4 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg hover:scale-105 transition-all active:scale-95 flex-1 justify-center"
              style={{ background: gradients.cardPurple }}
            >
              <Icons.RefreshCw size={20} /> Try Again
            </button>
            <button 
              onClick={handleComplete}
              disabled={score === 0}
              className={`text-white px-6 py-4 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg flex-1 justify-center transition-all ${
                score > 0 ? 'hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'
              }`}
              style={{ background: score > 0 ? gradients.cardGreen : colors.neutral.gray300 }}
            >
              Continue <Icons.ChevronRight size={20} />
            </button>
          </div>
        </div>

        <SuccessAnimation show={showSuccess} message="Amazing work! 🎉" onComplete={() => setShowSuccess(false)} />
      </GradientBackground>
    </div>
  );
};

export default PracticeSession;
