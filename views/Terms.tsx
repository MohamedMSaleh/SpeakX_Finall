
import React from 'react';
import * as Icons from '../components/Icons';
import { GradientBackground, FloatingShapes, AnimatedCard } from '../components/AnimatedComponents';

const Terms: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="h-full flex flex-col pb-24 relative overflow-hidden">
      <GradientBackground variant="purple" />
      <FloatingShapes />
      
      <div className="bg-white/95 backdrop-blur-md p-4 flex items-center gap-4 shadow-xl sticky top-0 z-10 shrink-0 border-b-2 border-white/50">
          <button onClick={onBack} className="p-2 hover:bg-purple-50 rounded-full transition-all hover-lift">
            <Icons.ChevronRight className="rotate-180 text-gray-700" size={24} strokeWidth={3} />
          </button>
          <h2 className="font-black text-gray-900 text-xl">📜 Terms & Privacy</h2>
      </div>

      <div className="p-6 space-y-6 flex-1 overflow-y-auto leading-relaxed custom-scrollbar relative z-10">
          <AnimatedCard variant="white" className="p-6">
            <h3 className="font-black text-gray-900 text-xl mb-3 flex items-center gap-2">
              <span className="text-2xl">📝</span> 1. Introduction
            </h3>
            <p className="text-gray-700 font-medium text-base">Welcome to SpeakX! By using our app, you agree to these Terms of Service. Please read them carefully to understand your rights and obligations.</p>
          </AnimatedCard>
          
          <AnimatedCard variant="white" className="p-6">
            <h3 className="font-black text-gray-900 text-xl mb-3 flex items-center gap-2">
              <span className="text-2xl">🔒</span> 2. Data Privacy
            </h3>
            <p className="text-gray-700 font-medium text-base">Your privacy is our top priority. We collect voice data solely to provide personalized feedback and improve our AI models. All data is encrypted end-to-end and stored securely. We do not share your personal data with third parties without your explicit consent.</p>
          </AnimatedCard>

          <AnimatedCard variant="white" className="p-6">
            <h3 className="font-black text-gray-900 text-xl mb-3 flex items-center gap-2">
              <span className="text-2xl">🤖</span> 3. AI Usage
            </h3>
            <p className="text-gray-700 font-medium text-base">Our AI tutor uses advanced language models to simulate natural conversation. While we strive for accuracy and helpfulness, AI responses may occasionally be incorrect or inappropriate. Please use your best judgment when interacting with AI features.</p>
          </AnimatedCard>

          <AnimatedCard variant="white" className="p-6">
            <h3 className="font-black text-gray-900 text-xl mb-3 flex items-center gap-2">
              <span className="text-2xl">💳</span> 4. Subscription
            </h3>
            <p className="text-gray-700 font-medium text-base">Premium features require an active subscription. You can cancel your subscription at any time via your account settings. Cancellations take effect at the end of the current billing period.</p>
          </AnimatedCard>

          <AnimatedCard variant="gradient" className="p-6 text-center border-2 border-white/30">
            <p className="text-sm font-bold text-white/90 drop-shadow">📅 Last updated: August 1, 2024</p>
            <p className="text-xs font-semibold text-white/70 mt-2 drop-shadow">Version 2.0</p>
          </AnimatedCard>
      </div>
    </div>
  );
};

export default Terms;
