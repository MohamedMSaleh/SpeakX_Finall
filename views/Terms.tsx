
import React from 'react';
import * as Icons from '../components/Icons';

const Terms: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      <div className="bg-white p-4 flex items-center gap-4 shadow-sm sticky top-0 z-10">
          <button onClick={onBack}><Icons.ChevronRight className="rotate-180 text-gray-600" /></button>
          <h2 className="font-bold text-gray-900">Terms & Privacy</h2>
      </div>

      <div className="p-6 space-y-6 overflow-y-auto text-sm text-gray-700 leading-relaxed">
          <h3 className="font-bold text-gray-900 text-lg">1. Introduction</h3>
          <p>Welcome to SpeakX. By using our app, you agree to these Terms of Service. Please read them carefully.</p>
          
          <h3 className="font-bold text-gray-900 text-lg">2. Data Privacy</h3>
          <p>Your privacy is our priority. We collect voice data solely to provide feedback and improve our AI models. All data is encrypted and stored securely. We do not share your personal data with third parties without your consent.</p>

          <h3 className="font-bold text-gray-900 text-lg">3. AI Usage</h3>
          <p>Our AI tutor uses advanced language models to simulate conversation. While we strive for accuracy, AI responses may occasionally be incorrect or inappropriate. Please use discretion.</p>

          <h3 className="font-bold text-gray-900 text-lg">4. Subscription</h3>
          <p>Premium features require a subscription. You can cancel at any time via your account settings.</p>

           <div className="pt-4">
              <p className="text-xs text-gray-500">Last updated: August 1, 2024</p>
           </div>
      </div>
    </div>
  );
};

export default Terms;
