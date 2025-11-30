
import React, { useState, useEffect } from 'react';
import * as Icons from '../components/Icons';

const CallSession: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [aiState, setAiState] = useState<'listening' | 'thinking' | 'speaking'>('listening');
  const [transcript, setTranscript] = useState("Hi there! I'm ready to chat. What's on your mind?");
  const [userVolume, setUserVolume] = useState(0);

  // Simulate user speaking volume when listening
  useEffect(() => {
      let interval: any;
      if (aiState === 'listening' && !isMuted) {
          interval = setInterval(() => {
              setUserVolume(Math.random() * 100);
          }, 100);
      } else {
          setUserVolume(0);
      }
      return () => clearInterval(interval);
  }, [aiState, isMuted]);

  // Simulate AI Interaction Cycle
  const handleSimulateInteraction = () => {
    if (aiState === 'listening') {
        setAiState('thinking');
        setUserVolume(0);
        
        setTimeout(() => {
            setAiState('speaking');
            setTranscript("That's an interesting perspective. Tell me more about why you feel that way.");
            
            // Speak for 4 seconds then go back to listening
            setTimeout(() => {
                setAiState('listening');
            }, 4000); 
        }, 1500); 
    }
  };

  return (
    <div className="h-full w-full bg-gray-900 flex flex-col relative overflow-hidden" onClick={handleSimulateInteraction}>
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black z-0"></div>
      
      {/* Header */}
      <div className="relative z-10 px-6 py-4 flex items-center justify-between">
         <button onClick={onBack} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors backdrop-blur-md">
             <Icons.ChevronDown size={24} className="text-white" />
         </button>
         <div className="text-white/80 font-bold text-sm tracking-wide uppercase">Conversation Mode</div>
         <div className="w-10"></div>
      </div>

      {/* Main Visual Area */}
      <div className="flex-1 relative z-10 flex flex-col items-center justify-center w-full">
          
          {/* Avatar Container */}
          <div className="relative mb-12">
             
             {/* Speaking Ring (Outer) */}
             <div className={`absolute -inset-8 rounded-full border border-blue-400/20 transition-all duration-500 ${aiState === 'speaking' ? 'scale-110 opacity-100' : 'scale-100 opacity-0'}`}></div>
             <div className={`absolute -inset-16 rounded-full border border-blue-400/10 transition-all duration-700 ${aiState === 'speaking' ? 'scale-110 opacity-100' : 'scale-100 opacity-0'}`}></div>

             {/* Thinking Spinner */}
             {aiState === 'thinking' && (
                 <div className="absolute -inset-1 rounded-full border-t-2 border-white animate-spin z-20"></div>
             )}

             {/* The Avatar */}
             <div className={`w-48 h-48 rounded-full overflow-hidden shadow-2xl relative z-10 transition-transform duration-500 ${aiState === 'speaking' ? 'scale-105 shadow-blue-500/50' : 'scale-100 shadow-black/50'}`}>
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="AI Tutor" />
                
                {/* Listening Overlay (Darken slightly when user is speaking) */}
                <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${aiState === 'listening' ? 'opacity-0' : 'opacity-0'}`}></div>
             </div>

             {/* Status Badge */}
             <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/90 text-xs font-bold uppercase tracking-widest shadow-lg z-20 flex items-center gap-2 whitespace-nowrap">
                 {aiState === 'listening' && <><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Listening</>}
                 {aiState === 'thinking' && <><div className="w-2 h-2 bg-white rounded-full animate-bounce"></div> Thinking</>}
                 {aiState === 'speaking' && <><div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div> Speaking</>}
             </div>
          </div>

          {/* Dynamic Waveform (Visualizing User Voice) */}
          <div className="h-12 flex items-center justify-center gap-1 mb-8">
              {aiState === 'listening' ? (
                  Array.from({ length: 5 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="w-1.5 bg-white rounded-full transition-all duration-75"
                        style={{ 
                            height: Math.max(8, Math.random() * userVolume) + 'px',
                            opacity: 0.5 + (Math.random() * 0.5) 
                        }}
                      ></div>
                  ))
              ) : (
                  <div className="h-2 w-2 rounded-full bg-white/20"></div> 
              )}
          </div>

          {/* Transcript / Subtitles */}
          <div className="w-full max-w-sm text-center px-6 min-h-[80px]">
                <p className={`text-xl font-medium leading-relaxed transition-all duration-500 ${aiState === 'listening' ? 'text-white/50 blur-[0.5px]' : 'text-white'}`}>
                    "{transcript}"
                </p>
          </div>
      </div>

      {/* Controls */}
      <div className="relative z-20 pb-12 px-8 flex justify-center gap-6">
          
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${isMuted ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md'}`}
          >
              {isMuted ? <Icons.MicOff size={28} /> : <Icons.Mic size={28} />}
          </button>

          <button 
            onClick={onBack}
            className="w-16 h-16 bg-red-500/90 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30 hover:bg-red-600 transition-all hover:scale-105"
          >
              <Icons.X size={32} fill="white" className="text-white" />
          </button>

           <button 
            className="w-16 h-16 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 backdrop-blur-md transition-all"
          >
              <Icons.MessageSquare size={28} />
          </button>

      </div>
    </div>
  );
};

export default CallSession;
