
import React, { useState } from 'react';
import * as Icons from '../components/Icons';

const PronunciationPractice: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const practiceItems = [
    {
        word: "Through",
        phonetic: "/θruː/",
        tip: "Place your tongue between your teeth and blow air for the 'th' sound."
    },
    {
        word: "Colonel",
        phonetic: "/ˈkɝː.nəl/",
        tip: "Pronounced exactly like 'kernel'. The 'l' is silent and the 'o' sounds like 'er'."
    },
    {
        word: "Schedule",
        phonetic: "/ˈskedʒ.uːl/",
        tip: "Start with a hard 'sk' sound, not 'sh' (in American English)."
    },
    {
        word: "Phenomenon",
        phonetic: "/fəˈnɑː.mə.nɑːn/",
        tip: "Stress the second syllable 'no'. Watch out for the 'm' and 'n' sounds."
    },
    {
        word: "Squirrel",
        phonetic: "/ˈskwɝː.əl/",
        tip: "One syllable. Rhymes with 'girl' or 'whirl'."
    }
  ];

  const currentItem = practiceItems[currentIndex];

  const handleMic = () => {
    if (isRecording) {
        setIsRecording(false);
        // Simulate checking logic
        setTimeout(() => {
            setScore(Math.floor(Math.random() * 20) + 80); // Random score between 80-99
        }, 500);
    } else {
        setIsRecording(true);
        setScore(null);
    }
  };

  const handleNext = () => {
      if (currentIndex < practiceItems.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setScore(null);
      } else {
          onBack(); // Finish
      }
  };

  return (
    <div className="h-full bg-gray-900 flex flex-col pb-safe text-white">
      {/* Dark Header */}
      <div className="p-4 flex items-center justify-between z-10 sticky top-0 shrink-0">
         <button onClick={onBack} className="p-2 bg-white/10 rounded-full hover:bg-white/20"><Icons.ChevronRight className="rotate-180 text-white" size={24} /></button>
         <div className="flex flex-col items-center">
             <h2 className="font-bold text-gray-200 text-sm uppercase tracking-widest">Phoneme Drill</h2>
             <div className="flex gap-1 mt-1">
                 {practiceItems.map((_, idx) => (
                     <div key={idx} className={`w-1.5 h-1.5 rounded-full ${idx === currentIndex ? 'bg-blue-500' : 'bg-gray-700'}`}></div>
                 ))}
             </div>
         </div>
         <div className="w-10"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center overflow-y-auto custom-scrollbar">
          
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-500 to-blue-600 p-1 mb-8 shadow-[0_0_40px_rgba(79,70,229,0.4)] relative group">
              <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center border-4 border-gray-800 relative z-10">
                  <Icons.Headphones size={48} className="text-white" />
              </div>
              {/* Pulse ring */}
              <div className="absolute inset-0 bg-purple-500 rounded-full opacity-20 group-hover:animate-ping"></div>
          </div>

          <h1 className="text-4xl font-black mb-2 tracking-tight">{currentItem.word}</h1>
          <p className="text-2xl text-purple-400 font-serif italic mb-6">{currentItem.phonetic}</p>
          
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl mb-8 max-w-xs">
              <div className="flex items-center justify-center gap-2 text-yellow-400 text-xs font-bold uppercase mb-1">
                  <Icons.Lightbulb size={12} /> Pro Tip
              </div>
              <p className="text-sm text-gray-300 leading-snug">
                  {currentItem.tip}
              </p>
          </div>

          <div className="flex gap-4 mb-10">
              <button className="flex items-center gap-2 bg-white/10 px-5 py-2.5 rounded-full hover:bg-white/20 transition-colors font-bold text-sm">
                  <Icons.Volume2 size={18} /> Listen
              </button>
              <button className="flex items-center gap-2 bg-white/10 px-5 py-2.5 rounded-full hover:bg-white/20 transition-colors font-bold text-sm">
                  <Icons.PlayCircle size={18} /> Slow
              </button>
          </div>

          {/* Mic Area */}
          <div className="relative mb-8">
              {/* Ripple Effect when recording */}
              {isRecording && (
                  <>
                    <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
                    <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20 delay-150"></div>
                  </>
              )}
              
              <button 
                onClick={handleMic}
                className={`w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all relative z-10 ${isRecording ? 'bg-red-500 scale-110' : 'bg-blue-600 hover:bg-blue-500'}`}
              >
                  {isRecording ? (
                      <div className="w-8 h-8 bg-white rounded-md animate-pulse"></div>
                  ) : (
                      <Icons.Mic size={40} className="text-white" />
                  )}
              </button>
          </div>
          
          <p className="text-gray-400 font-medium text-sm min-h-[20px]">
              {isRecording ? "Listening..." : score === null ? "Tap to record" : " "}
          </p>

          {/* Feedback Overlay / Next Button */}
          {score !== null && (
              <div className="w-full max-w-xs animate-in slide-in-from-bottom duration-300">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-bold text-gray-200">Accuracy</span>
                          <span className={`text-xl font-black ${score > 80 ? 'text-green-400' : 'text-orange-400'}`}>{score}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${score > 80 ? 'bg-green-500' : 'bg-orange-500'}`} style={{ width: `${score}%` }}></div>
                      </div>
                  </div>
                  
                  <button 
                    onClick={handleNext}
                    className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
                  >
                      {currentIndex < practiceItems.length - 1 ? 'Next Word' : 'Finish Practice'} <Icons.ArrowRight size={18} />
                  </button>
              </div>
          )}
      </div>
    </div>
  );
};

export default PronunciationPractice;
