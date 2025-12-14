
import React, { useState, useEffect } from 'react';
import * as Icons from '../components/Icons';
import { GradientBackground, FloatingShapes, AnimatedCard } from '../components/AnimatedComponents';

const PracticeSession: React.FC<{ onBack: () => void, onComplete: () => void }> = ({ onBack, onComplete }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<string>('');

  const handleMic = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        // Simulate completion interaction
        // onComplete(); 
      }, 3000);
    }
  };

  return (
    <div className="h-full flex flex-col pb-24 relative overflow-hidden">
      <GradientBackground variant="blue" />
      <FloatingShapes />
      
      {/* Header */}
      <div className="relative z-10 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 shrink-0">
         <button onClick={onBack}><Icons.ChevronRight className="rotate-180 text-gray-600" size={24} /></button>
         <h2 className="font-bold text-gray-900">Job Interview Practice</h2>
         <Icons.Bookmark className="text-gray-400" size={24} />
      </div>

      <div className="p-5 flex-1 flex flex-col overflow-y-auto custom-scrollbar relative z-10">
         <AnimatedCard variant="white" className="mb-6">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">💬 Read the following sentence aloud:</h3>
            <p className="text-xl text-blue-900 font-medium leading-relaxed">
                "Could I please have a large latte with oat milk?"
            </p>
            <button className="mt-4 text-blue-600 text-sm font-bold flex items-center gap-1">
                Switch Prompt <Icons.RefreshCw size={14} />
            </button>
         </AnimatedCard>

         {/* Visualizer Placeholder */}
         <div className="bg-gray-100 rounded-2xl h-32 flex items-center justify-center mb-8 relative overflow-hidden">
             {isListening ? (
                 <div className="flex items-center gap-1 h-full">
                    {[...Array(20)].map((_, i) => (
                        <div 
                            key={i} 
                            className="w-2 bg-blue-600 rounded-full bar"
                            style={{ animationDuration: `${Math.random() * 500 + 200}ms` }}
                        ></div>
                    ))}
                 </div>
             ) : (
                 <div className="text-gray-400 text-sm">Live Waveform Visualizer</div>
             )}
         </div>

         {/* Mic Button */}
         <div className="flex justify-center mb-10">
             <button 
                onClick={handleMic}
                className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl border-4 border-white transition-all ${isListening ? 'bg-red-500 scale-110' : 'bg-blue-600 hover:bg-blue-700'}`}
             >
                 {isListening ? <div className="w-6 h-6 bg-white rounded-md"></div> : <Icons.Mic size={32} color="white" />}
             </button>
         </div>

         {/* Live Feedback Grid */}
         <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                <div className="text-gray-500 text-xs mb-1">Pronunciation</div>
                <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-gray-900">85%</span>
                    <span className="text-xs text-green-500 font-bold mb-1">+3%</span>
                </div>
            </div>
             <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                <div className="text-gray-500 text-xs mb-1">Fluency</div>
                 <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-gray-900">Good</span>
                    <span className="text-xs text-green-500 font-bold mb-1">+5%</span>
                </div>
            </div>
             <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 col-span-2">
                <div className="text-gray-500 text-xs mb-1">Confidence</div>
                 <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-gray-900">High</span>
                    <span className="text-xs text-green-500 font-bold mb-1">+2%</span>
                </div>
            </div>
         </div>

         {/* Tabs */}
         <div className="flex border-b border-gray-200 mb-4">
             <button className="flex-1 pb-2 border-b-2 border-blue-600 font-bold text-blue-900 text-sm">Transcript</button>
             <button className="flex-1 pb-2 font-medium text-gray-500 text-sm hover:text-gray-700">Micro-Skills</button>
         </div>

         <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
             <p className="text-gray-800 text-lg leading-relaxed">
                 "<span className="bg-orange-100 px-1 rounded">Could I</span> please have a large <span className="bg-orange-100 px-1 rounded">latte</span> with oat milk?"
             </p>
         </div>

         {/* Sound Linking Card */}
         <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h4 className="font-bold text-gray-900 text-sm mb-2">Sound Linking</h4>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                The '/d/' sound in 'Could' should smoothly link to the 'I'. Tap to hear the correct way.
            </p>
            <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100">
                    <Icons.Play size={16} fill="currentColor" />
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">
                    <Icons.Mic size={16} />
                </button>
            </div>
         </div>
      </div>

      {/* Footer Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe z-20 flex items-center justify-between gap-4 max-w-md mx-auto">
        <button onClick={() => {setIsListening(false);}} className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-200 hover:bg-blue-700 flex-1 justify-center">
            <Icons.RefreshCw size={18} /> Try Again
        </button>
        <div className="flex items-center gap-2">
             <button onClick={onComplete} className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">
                <Icons.ChevronRight size={20} />
             </button>
             <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">
                <Icons.Menu size={20} />
             </button>
             <button className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 hover:bg-purple-200">
                <Icons.User size={20} />
             </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeSession;
