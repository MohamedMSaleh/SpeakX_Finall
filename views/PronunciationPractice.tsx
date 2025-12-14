
import React, { useState, useEffect } from 'react';
import * as Icons from '../components/Icons';
import { GradientBackground, FloatingShapes, AnimatedCard, AnimatedProgressBar } from '../components/AnimatedComponents';

const PronunciationPractice: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'recording' | 'analyzing' | 'result'>('idle');
  const [score, setScore] = useState<number>(0);
  
  // Track cumulative scores and words
  const [sessionResults, setSessionResults] = useState<{word: string, phonetic: string, score: number}[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const practiceItems = [
    {
        word: "Squirrel",
        phonetic: "/ˈskwɝː.əl/",
        image: "https://images.unsplash.com/photo-1504006833117-8886a36f587c?auto=format&fit=crop&q=80&w=400",
        syllables: ["Squir", "rel"],
        tip: "Round your lips for the 'w' sound. It rhymes with 'girl'.",
        difficulty: "Hard"
    },
    {
        word: "Throughout",
        phonetic: "/θruːˈaʊt/",
        image: "https://images.unsplash.com/photo-1453791052107-5c843da62d97?auto=format&fit=crop&q=80&w=400",
        syllables: ["Through", "out"],
        tip: "Place your tongue between your teeth for the 'th' sound, then move to a loud 'out'.",
        difficulty: "Medium"
    },
    {
        word: "Entrepreneur",
        phonetic: "/ˌɑːn.trə.prəˈnɝː/",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
        syllables: ["En", "tre", "pre", "neur"],
        tip: "The stress is on the last syllable 'neur'.",
        difficulty: "Hard"
    },
    {
        word: "Schedule",
        phonetic: "/ˈskedʒ.uːl/",
        image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=400",
        syllables: ["Sched", "ule"],
        tip: "Start with a hard 'sk' sound (American English).",
        difficulty: "Medium"
    }
  ];

  const currentItem = practiceItems[currentIndex];

  const handleMicPress = () => {
    if (feedbackState === 'idle' || feedbackState === 'result') {
        setFeedbackState('recording');
        setIsRecording(true);
        
        // Simulate recording duration
        setTimeout(() => {
            setIsRecording(false);
            setFeedbackState('analyzing');
            
            // Simulate Analysis
            setTimeout(() => {
                const newScore = Math.floor(Math.random() * 25) + 75; // Random score 75-100
                setScore(newScore);
                setFeedbackState('result');
            }, 1500);
        }, 3000);
    }
  };

  const handleNext = () => {
      // Save score details
      const newResult = {
          word: currentItem.word,
          phonetic: currentItem.phonetic,
          score: score
      };
      setSessionResults(prev => [...prev, newResult]);

      if (currentIndex < practiceItems.length - 1) {
          setFeedbackState('idle');
          setScore(0);
          setCurrentIndex(prev => prev + 1);
      } else {
          // Show Summary
          setShowSummary(true);
      }
  };

  const playReference = () => {
      // Logic to play audio would go here
  };

  if (showSummary) {
      const averageScore = Math.round(sessionResults.reduce((a, b) => a + b.score, 0) / sessionResults.length);
      
      return (
        <div className="h-full bg-white flex flex-col pb-safe">
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
              <div className="flex flex-col items-center text-center mb-8 pt-4">
                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                    <Icons.CheckCircle size={32} />
                 </div>
                 <h2 className="text-2xl font-black text-gray-900 mb-1">Session Complete</h2>
                 <p className="text-gray-500 text-sm">Great job practicing today!</p>
              </div>

              {/* Score Card */}
              <div className="bg-white rounded-[32px] p-6 shadow-xl shadow-blue-100 border border-gray-100 mb-8 flex flex-col items-center">
                  <div className="relative w-32 h-32 flex items-center justify-center mb-2">
                      <svg className="w-full h-full transform -rotate-90">
                          <circle cx="64" cy="64" r="56" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                          <circle cx="64" cy="64" r="56" stroke="#3b82f6" strokeWidth="8" fill="none" strokeDasharray="351.86" strokeDashoffset={351.86 - (351.86 * averageScore) / 100} strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-4xl font-black text-gray-900">{averageScore}</span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase">Score</span>
                      </div>
                  </div>
                  <div className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      Advanced Level
                  </div>
              </div>

              {/* Word Breakdown List */}
              <h3 className="font-bold text-gray-900 mb-4 px-1">Word Breakdown</h3>
              <div className="space-y-3 mb-8">
                  {sessionResults.map((result, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between border border-gray-100">
                          <div className="flex items-center gap-3">
                              <div className={`w-2 h-10 rounded-full ${result.score >= 90 ? 'bg-green-500' : result.score >= 75 ? 'bg-orange-400' : 'bg-red-500'}`}></div>
                              <div>
                                  <h4 className="font-bold text-gray-900">{result.word}</h4>
                                  <p className="text-xs text-gray-500 font-serif italic">{result.phonetic}</p>
                              </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                               <div className="flex flex-col items-end">
                                   <span className={`font-black text-lg ${result.score >= 90 ? 'text-green-600' : result.score >= 75 ? 'text-orange-500' : 'text-red-500'}`}>{result.score}%</span>
                               </div>
                               <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 border border-gray-200 shadow-sm hover:text-blue-600">
                                   <Icons.Volume2 size={14} />
                               </button>
                               <button className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                                   <Icons.Play size={10} fill="currentColor" />
                               </button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
          
          <div className="p-4 bg-white border-t border-gray-100 flex gap-3 z-10">
              <button 
                onClick={onBack}
                className="flex-1 bg-gray-100 text-gray-700 font-bold py-4 rounded-2xl hover:bg-gray-200 transition-colors"
              >
                  Done
              </button>
              <button 
                onClick={() => {
                    setSessionResults([]);
                    setCurrentIndex(0);
                    setShowSummary(false);
                    setScore(0);
                    setFeedbackState('idle');
                }}
                className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors"
              >
                  Practice Again
              </button>
          </div>
        </div>
      );
  }

  return (
    <div className="h-full bg-gray-50 flex flex-col pb-safe relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-blue-600 rounded-b-[40px] z-0"></div>

      {/* Header */}
      <div className="p-4 flex items-center justify-between z-10 sticky top-0 shrink-0 text-white">
         <button onClick={onBack} className="p-2 bg-white/20 rounded-full hover:bg-white/30 backdrop-blur-md transition-colors">
            <Icons.X size={24} />
         </button>
         <div className="flex flex-col items-center">
             <span className="text-xs font-bold opacity-80 uppercase tracking-widest">Pronunciation</span>
         </div>
         <div className="w-10"></div>
      </div>

      {/* Main Card Area */}
      <div className="flex-1 flex flex-col items-center relative z-10 px-6 pt-2 pb-6 overflow-y-auto custom-scrollbar">
          
          {/* Progress Dots */}
          <div className="flex gap-1.5 mb-6">
             {practiceItems.map((_, idx) => (
                 <div 
                    key={idx} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}
                 ></div>
             ))}
          </div>

          {/* Word Card */}
          <div className="w-full bg-white rounded-[32px] shadow-xl p-6 mb-6 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                  {currentItem.difficulty}
              </div>

              {/* Image Circle */}
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-blue-500 to-purple-500 mb-4 shadow-lg">
                  <img src={currentItem.image} alt={currentItem.word} className="w-full h-full object-cover rounded-full border-4 border-white" />
              </div>

              <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">{currentItem.word}</h1>
              
              {/* Interactive Phonetics */}
              <button onClick={playReference} className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl text-blue-600 font-serif italic text-lg mb-6 hover:bg-blue-100 transition-colors">
                  <Icons.Volume2 size={20} />
                  {currentItem.phonetic}
              </button>

              {/* Syllable Breakdown (Visual Guide) */}
              <div className="flex gap-1 mb-8">
                  {currentItem.syllables.map((syl, i) => (
                      <div key={i} className={`px-3 py-1.5 rounded-lg border-b-4 font-bold text-lg ${
                          feedbackState === 'result' 
                            ? (Math.random() > 0.3 ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-400 text-red-700') // Mocking result
                            : 'bg-gray-100 border-gray-300 text-gray-600'
                      }`}>
                          {syl}
                      </div>
                  ))}
              </div>

              {/* Tip Section */}
              <div className="bg-gray-50 rounded-2xl p-4 w-full text-left flex gap-3 border border-gray-100">
                  <div className="shrink-0 w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center">
                      <Icons.Lightbulb size={18} />
                  </div>
                  <div>
                      <span className="text-xs font-bold text-gray-400 uppercase">Mouth Shape</span>
                      <p className="text-sm text-gray-800 font-medium leading-snug">{currentItem.tip}</p>
                  </div>
              </div>
          </div>

          {/* Feedback / Result View */}
          {feedbackState === 'analyzing' && (
              <div className="flex flex-col items-center animate-in fade-in zoom-in">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-500 font-bold text-sm">Analyzing intonation...</p>
              </div>
          )}

          {feedbackState === 'result' && (
              <div className="w-full animate-in slide-in-from-bottom duration-500">
                  <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-4">
                      <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${score > 85 ? 'bg-green-500' : 'bg-orange-500'}`}>
                              {score}
                          </div>
                          <div>
                              <div className="text-sm font-bold text-gray-900">{score > 85 ? 'Excellent!' : 'Good Effort'}</div>
                              <div className="text-xs text-gray-500">Accuracy Score</div>
                          </div>
                      </div>
                      <button onClick={playReference} className="text-blue-600 text-xs font-bold hover:underline">Compare</button>
                  </div>
                  
                  {score < 90 && (
                       <div className="bg-orange-50 text-orange-800 text-xs p-3 rounded-xl mb-4 font-medium flex gap-2">
                           <Icons.AlertCircle size={16} className="shrink-0" />
                           Try to emphasize the first syllable more.
                       </div>
                  )}

                  <div className="flex gap-3">
                    <button 
                        onClick={() => setFeedbackState('idle')}
                        className="flex-1 bg-gray-200 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-300 transition-colors"
                    >
                        Retry
                    </button>
                    <button 
                        onClick={handleNext}
                        className="flex-[2] bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                        {currentIndex < practiceItems.length - 1 ? 'Next Word' : 'Finish'} <Icons.ArrowRight size={18} />
                    </button>
                  </div>
              </div>
          )}
      </div>

      {/* Floating Mic Control (Only visible when not showing results) */}
      {(feedbackState === 'idle' || feedbackState === 'recording') && (
          <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
              <div className="relative">
                  {feedbackState === 'recording' && (
                       <>
                         <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
                         <div className="absolute -inset-4 border border-red-500 rounded-full opacity-40 animate-pulse"></div>
                       </>
                  )}
                  <button 
                    onClick={handleMicPress}
                    className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
                        feedbackState === 'recording' 
                        ? 'bg-red-500 text-white scale-110' 
                        : 'bg-blue-600 text-white hover:scale-105 hover:bg-blue-500'
                    }`}
                  >
                      {feedbackState === 'recording' ? (
                          <div className="flex gap-1 h-6 items-end">
                              <div className="w-1 bg-white rounded-full animate-[sound_0.5s_ease-in-out_infinite]"></div>
                              <div className="w-1 bg-white rounded-full animate-[sound_0.5s_ease-in-out_infinite_0.1s] h-4"></div>
                              <div className="w-1 bg-white rounded-full animate-[sound_0.5s_ease-in-out_infinite_0.2s]"></div>
                          </div>
                      ) : (
                          <Icons.Mic size={32} />
                      )}
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};

export default PronunciationPractice;
