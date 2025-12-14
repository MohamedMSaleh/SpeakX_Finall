
import React, { useState, useEffect } from 'react';
import * as Icons from '../components/Icons';
import { GradientBackground, FloatingShapes, AnimatedCard } from '../components/AnimatedComponents';

const FluencyPractice: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [phase, setPhase] = useState<'prep' | 'speaking' | 'review'>('prep');
  const [timeLeft, setTimeLeft] = useState(45); // 45s speaking time
  const [topicIndex, setTopicIndex] = useState(0);
  
  const topics = [
      {
          title: "Describe your favorite childhood memory.",
          bullets: ["Who was there?", "What happened?", "Why is it special?"]
      },
      {
          title: "Talk about a challenge you overcame.",
          bullets: ["What was the problem?", "How did you solve it?", "What did you learn?"]
      },
      {
          title: "Describe your dream job.",
          bullets: ["What would you do?", "Where would you work?", "Why does it appeal to you?"]
      },
      {
          title: "Explain your favorite hobby.",
          bullets: ["How did you start?", "What do you need for it?", "Why do you enjoy it?"]
      }
  ];

  const currentTopic = topics[topicIndex];

  useEffect(() => {
      let interval: any;
      if (phase === 'speaking' && timeLeft > 0) {
          interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      } else if (timeLeft === 0 && phase === 'speaking') {
          setPhase('review');
      }
      return () => clearInterval(interval);
  }, [phase, timeLeft]);

  const handleStart = () => {
      setPhase('speaking');
  };

  const handleFinishEarly = () => {
      setPhase('review');
  };

  const handleShuffle = () => {
      setTopicIndex((prev) => (prev + 1) % topics.length);
  };

  return (
    <div className="h-full flex flex-col pb-safe relative overflow-hidden">
      <GradientBackground variant="multicolor" />
      <FloatingShapes />
      
      <div className="relative z-10 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 shrink-0">
         <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full"><Icons.ChevronRight className="rotate-180 text-gray-600" size={24} /></button>
         <h2 className="font-bold text-gray-900 text-sm">Fluency Drill</h2>
         <div className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-bold">Timed</div>
      </div>

      <div className="flex-1 p-6 flex flex-col overflow-y-auto custom-scrollbar">
          
          {/* Prompt Card */}
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-orange-100 mb-8 shrink-0">
              <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-wider">
                      <Icons.MessageCircle size={16} /> Topic
                  </div>
                  {phase === 'prep' && (
                      <button onClick={handleShuffle} className="text-gray-400 hover:text-orange-500 transition-colors">
                          <Icons.RefreshCw size={16} />
                      </button>
                  )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                  {currentTopic.title}
              </h3>
              <ul className="text-gray-500 text-sm space-y-2 list-disc list-inside">
                  {currentTopic.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                  ))}
              </ul>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
              {phase === 'prep' && (
                  <div className="text-center animate-in zoom-in duration-300 w-full">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 mx-auto text-orange-500">
                          <Icons.Clock size={40} />
                      </div>
                      <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">Take a moment to think. You will have 45 seconds to speak.</p>
                      <button 
                        onClick={handleStart}
                        className="w-full bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-orange-200 hover:bg-orange-700 transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                          <Icons.Mic size={20} /> Start Speaking
                      </button>
                  </div>
              )}

              {phase === 'speaking' && (
                  <div className="text-center w-full">
                      <div className="text-6xl font-black text-gray-900 mb-4 font-mono tabular-nums">
                          00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-12 overflow-hidden">
                          <div 
                            className="bg-orange-500 h-full transition-all duration-1000 ease-linear" 
                            style={{ width: `${(timeLeft / 45) * 100}%` }}
                          ></div>
                      </div>
                      
                      <div className="flex items-center justify-center gap-2 mb-8">
                          {[1,2,3,4,5].map(i => (
                              <div key={i} className="w-2 bg-orange-400 rounded-full animate-pulse" style={{ height: Math.random() * 40 + 10 + 'px', animationDuration: '0.5s' }}></div>
                          ))}
                      </div>

                      <button 
                        onClick={handleFinishEarly}
                        className="bg-white text-gray-700 font-bold py-3 px-8 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50"
                      >
                          I'm Finished
                      </button>
                  </div>
              )}

              {phase === 'review' && (
                  <div className="text-center w-full animate-in slide-in-from-bottom duration-500 pb-10">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center shadow-sm mb-4 mx-auto text-green-600">
                          <Icons.CheckCircle size={32} />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Analysis Complete</h2>
                      
                      {/* Detailed Feedback Cards */}
                      <div className="space-y-4 text-left w-full mb-8">
                          {/* Metrics Row */}
                          <div className="flex gap-3">
                              <div className="flex-1 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                                  <div className="text-xs text-gray-500 font-bold uppercase mb-1">Pacing</div>
                                  <div className="text-xl font-black text-blue-600">110 <span className="text-xs font-medium text-gray-400">wpm</span></div>
                              </div>
                              <div className="flex-1 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                                  <div className="text-xs text-gray-500 font-bold uppercase mb-1">Fillers</div>
                                  <div className="text-xl font-black text-orange-500">3 <span className="text-xs font-medium text-gray-400">found</span></div>
                              </div>
                          </div>

                          {/* Improvements */}
                          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                              <div className="flex items-center gap-2 mb-3 font-bold text-gray-900 text-sm">
                                  <Icons.AlertCircle size={16} className="text-orange-500" /> Areas to Improve
                              </div>
                              <ul className="space-y-3">
                                  <li className="text-sm text-gray-600 flex gap-2">
                                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 shrink-0"></span>
                                      <span>Long pause detected between "uh" and "then". Try to use transition words like <b>"furthermore"</b>.</span>
                                  </li>
                                  <li className="text-sm text-gray-600 flex gap-2">
                                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 shrink-0"></span>
                                      <span>Repetition of the word "happy". Consider synonyms like <b>"joyful"</b> or <b>"elated"</b>.</span>
                                  </li>
                              </ul>
                          </div>

                          {/* Strengths */}
                          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                              <div className="flex items-center gap-2 mb-3 font-bold text-gray-900 text-sm">
                                  <Icons.Star size={16} className="text-green-500" /> Strengths
                              </div>
                              <p className="text-sm text-gray-600">
                                  Great use of past tense verbs! Your volume was consistent and clear throughout the session.
                              </p>
                          </div>
                      </div>

                      <button 
                        onClick={onBack}
                        className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-black transition-colors"
                      >
                          Back to Dashboard
                      </button>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};

export default FluencyPractice;
