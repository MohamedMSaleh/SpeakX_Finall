
import React, { useState, useEffect } from 'react';
import * as Icons from '../components/Icons';

interface LessonPlayerProps {
  onBack: () => void;
  onComplete: () => void;
}

type Stage = 'concept' | 'warmup' | 'core' | 'summary';

const LessonPlayer: React.FC<LessonPlayerProps> = ({ onBack, onComplete }) => {
  const [stage, setStage] = useState<Stage>('concept');
  const [progress, setProgress] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'success' | 'warning'>('success');

  // --- Concept Intro Stage ---
  const renderConcept = () => (
    <div className="flex-1 flex flex-col p-6 items-center text-center animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600 animate-bounce">
            <Icons.Lightbulb size={40} />
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-4">Present Simple Tense</h1>
        <div className="bg-blue-50 p-6 rounded-3xl border-2 border-blue-100 w-full mb-8 text-left">
            <p className="text-gray-700 font-medium mb-4">We use this for habits and facts.</p>
            <div className="flex items-center gap-3 mb-2">
                <Icons.CheckCircle size={20} className="text-green-500" />
                <span className="text-gray-800 font-bold">I play tennis every Sunday.</span>
            </div>
            <div className="flex items-center gap-3">
                <Icons.CheckCircle size={20} className="text-green-500" />
                <span className="text-gray-800 font-bold">The sun rises in the east.</span>
            </div>
        </div>
        <div className="mt-auto w-full">
            <button 
                onClick={() => { setStage('warmup'); setProgress(25); }}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors uppercase tracking-wide"
            >
                Got it!
            </button>
        </div>
    </div>
  );

  // --- Warm Up Stage ---
  const renderWarmup = () => (
    <div className="flex-1 flex flex-col p-6 items-center text-center animate-in slide-in-from-right duration-500">
        <div className="flex-1 flex flex-col justify-center items-center w-full">
            <span className="text-blue-500 font-bold text-sm uppercase tracking-widest mb-4">Warm Up</span>
            <h1 className="text-3xl font-black text-gray-900 mb-8 leading-tight">Listen and repeat</h1>
            
            <div className="bg-white p-6 rounded-3xl border-2 border-gray-100 shadow-sm mb-8 w-full max-w-sm">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <button className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                        <Icons.Volume2 size={24} />
                    </button>
                    <span className="text-gray-400 text-sm font-medium">Slow</span>
                </div>
                <p className="text-2xl font-medium text-gray-800">"I usually wake up at 7 AM."</p>
            </div>

            {/* Mic Interaction */}
            <div className="relative">
                {isRecording && <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>}
                <button 
                    onClick={() => {
                        setIsRecording(!isRecording);
                        if(!isRecording) {
                            setTimeout(() => {
                                setIsRecording(false);
                                setFeedbackType('success');
                                setShowFeedback(true);
                            }, 2000);
                        }
                    }}
                    className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all relative z-10 ${isRecording ? 'bg-red-500 text-white scale-110' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                    {isRecording ? <div className="w-6 h-6 bg-white rounded-md"></div> : <Icons.Mic size={32} />}
                </button>
            </div>
            <p className="text-gray-400 text-sm mt-4 font-medium h-6">{isRecording ? "Listening..." : "Tap to speak"}</p>
        </div>

        {/* Feedback Sheet */}
        <div className={`fixed bottom-0 left-0 right-0 p-6 bg-white rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-transform duration-300 ${showFeedback ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="max-w-md mx-auto">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                        <Icons.Check size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-green-700">Excellent!</h3>
                </div>
                <p className="text-gray-600 mb-6 pl-11">Your rhythm was perfect.</p>
                <button 
                    onClick={() => { setShowFeedback(false); setStage('core'); setProgress(60); }}
                    className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-200 hover:bg-green-700 transition-colors uppercase tracking-wide"
                >
                    Continue
                </button>
            </div>
        </div>
    </div>
  );

  // --- Core Activity Stage ---
  const renderCore = () => (
    <div className="flex-1 flex flex-col p-6 items-center text-center animate-in slide-in-from-right duration-500">
        <div className="w-full max-w-md">
            <span className="text-purple-500 font-bold text-sm uppercase tracking-widest block mb-4">Speaking Challenge</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What do you do every morning?</h2>
            
            <div className="bg-gray-100 rounded-3xl overflow-hidden shadow-inner mb-6 aspect-video relative">
                <img src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Morning Routine" />
                <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-medium">
                    Hint: "Brush teeth", "Breakfast", "Coffee"
                </div>
            </div>

            {/* Mic / Waveform Area */}
            <div className="bg-white border-2 border-purple-100 rounded-3xl p-6 shadow-sm flex items-center justify-between">
                <div className="flex-1 flex items-center gap-1 h-8">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className={`w-1.5 bg-purple-500 rounded-full transition-all duration-300 ${isRecording ? 'animate-pulse' : 'h-2'}`} style={{ height: isRecording ? Math.random() * 24 + 8 + 'px' : '8px' }}></div>
                    ))}
                </div>
                <button 
                    onClick={() => {
                        setIsRecording(!isRecording);
                        if(!isRecording) {
                            setTimeout(() => {
                                setIsRecording(false);
                                setShowFeedback(true);
                            }, 3000);
                        }
                    }}
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md transition-all ml-4 ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
                >
                    {isRecording ? <Icons.Square size={18} fill="currentColor" /> : <Icons.Mic size={24} />}
                </button>
            </div>
        </div>

        {/* Feedback Sheet */}
        <div className={`fixed bottom-0 left-0 right-0 p-6 bg-white rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-transform duration-300 ${showFeedback ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="max-w-md mx-auto">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                        <Icons.Check size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-green-700">Great Description!</h3>
                </div>
                <p className="text-gray-600 mb-6 pl-11 text-sm">You correctly used "brush my teeth". Next time, mention "eat breakfast".</p>
                <button 
                    onClick={() => { setShowFeedback(false); setStage('summary'); setProgress(100); }}
                    className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-200 hover:bg-green-700 transition-colors uppercase tracking-wide"
                >
                    Finish Lesson
                </button>
            </div>
        </div>
    </div>
  );

  // --- Summary Stage ---
  const renderSummary = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-500">
        <div className="relative mb-8">
            <div className="absolute inset-0 bg-yellow-400 blur-3xl opacity-20 rounded-full"></div>
            <div className="flex gap-2 relative z-10">
                <Icons.Star size={48} className="text-yellow-400 fill-current animate-bounce" style={{ animationDelay: '0ms' }} />
                <Icons.Star size={64} className="text-yellow-400 fill-current animate-bounce" style={{ animationDelay: '100ms' }} />
                <Icons.Star size={48} className="text-yellow-400 fill-current animate-bounce" style={{ animationDelay: '200ms' }} />
            </div>
        </div>

        <h2 className="text-3xl font-black text-gray-900 mb-2">Lesson Complete!</h2>
        <p className="text-gray-500 font-medium mb-10">You've mastered the morning routine vocabulary.</p>

        <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-8">
            <div className="bg-white border-2 border-gray-100 p-4 rounded-2xl flex flex-col items-center gap-2 shadow-sm">
                <span className="text-xs font-bold text-gray-400 uppercase">XP Earned</span>
                <div className="flex items-center gap-1 text-yellow-500 font-black text-2xl">
                    <Icons.Zap size={20} fill="currentColor" /> +15
                </div>
            </div>
            <div className="bg-white border-2 border-gray-100 p-4 rounded-2xl flex flex-col items-center gap-2 shadow-sm">
                <span className="text-xs font-bold text-gray-400 uppercase">Accuracy</span>
                <div className="flex items-center gap-1 text-green-500 font-black text-2xl">
                    <Icons.Target size={20} /> 94%
                </div>
            </div>
        </div>

        <div className="w-full max-w-xs space-y-3">
            <button 
                onClick={onComplete}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-[0_6px_0_#1d4ed8] hover:bg-blue-500 active:shadow-none active:translate-y-[6px] transition-all uppercase tracking-wide"
            >
                Continue
            </button>
            <button 
                onClick={() => { setStage('concept'); setProgress(0); }}
                className="text-gray-400 font-bold text-sm hover:text-gray-600"
            >
                Practice Again
            </button>
        </div>
    </div>
  );

  return (
    <div className="h-full bg-white flex flex-col pb-safe relative overflow-hidden">
      {/* Top Bar */}
      <div className="px-4 py-4 flex items-center gap-4 z-10">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
              <Icons.X size={24} />
          </button>
          <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="w-8"></div> {/* Spacer for balance */}
      </div>

      {stage === 'concept' && renderConcept()}
      {stage === 'warmup' && renderWarmup()}
      {stage === 'core' && renderCore()}
      {stage === 'summary' && renderSummary()}
    </div>
  );
};

export default LessonPlayer;
