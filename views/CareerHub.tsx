
import React from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';
import { GradientBackground, FloatingShapes, AnimatedCard } from '../components/AnimatedComponents';

const CareerHub: React.FC<{ onBack: () => void, setView: (view: View) => void }> = ({ onBack, setView }) => {
  return (
    <div className="h-full flex flex-col pb-safe relative overflow-hidden">
      <GradientBackground variant="purple" />
      <FloatingShapes />
      
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md p-4 flex items-center gap-4 shadow-xl sticky top-0 z-10 shrink-0 border-b-2 border-white/50">
          <button onClick={onBack} className="p-2 hover:bg-purple-50 rounded-full transition-all hover-lift">
            <Icons.ChevronRight className="rotate-180 text-gray-700" size={24} strokeWidth={3} />
          </button>
          <h2 className="font-black text-gray-900 text-xl">💼 Career Hub</h2>
      </div>

      {/* Coming Soon Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center pb-32 relative z-10">
            <AnimatedCard variant="gradient" className="p-10 max-w-md">
              <div className="w-32 h-32 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6 text-white shadow-2xl mx-auto border-4 border-white/30 animate-bounce-in">
                  <Icons.Briefcase size={64} strokeWidth={2} />
              </div>
              <h2 className="text-4xl font-black text-white mb-4 drop-shadow-2xl">Career Hub</h2>
              <div className="text-sm font-black text-white bg-white/20 backdrop-blur-md px-6 py-2 rounded-full uppercase tracking-widest mb-6 inline-block border-2 border-white/30">✨ Coming Soon</div>
              <p className="text-white/90 max-w-xs mx-auto leading-relaxed text-lg font-bold drop-shadow">
                  We're building a space to help you advance your career with English. Stay tuned for exciting features!
              </p>
            </AnimatedCard>
      </div>
    </div>
  );
};

export default CareerHub;
