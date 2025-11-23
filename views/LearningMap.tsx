
import React, { useEffect, useRef } from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';

const LearningMap: React.FC<{ onBack: () => void, setView: (view: View) => void }> = ({ onBack, setView }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom (current level) on mount
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  const levels = [
    { id: 10, type: 'boss', status: 'locked', pos: 'center', title: 'Unit 2 Review' },
    { id: 9, type: 'lesson', status: 'locked', pos: 'right', icon: <Icons.MessageSquare size={20} /> },
    { id: 8, type: 'lesson', status: 'locked', pos: 'left', icon: <Icons.BookOpen size={20} /> },
    { id: 7, type: 'lesson', status: 'locked', pos: 'center', icon: <Icons.Mic size={20} /> },
    { id: 6, type: 'chest', status: 'locked', pos: 'right', icon: <Icons.Award size={20} /> },
    
    // Section Header
    { id: 'section-2', type: 'section', title: 'Unit 2: Travel & Directions', desc: 'Learn to navigate new places' },

    { id: 5, type: 'boss', status: 'current', pos: 'center', title: 'Unit 1 Review', stars: 0 },
    { id: 4, type: 'lesson', status: 'completed', pos: 'left', icon: <Icons.Mic size={20} />, stars: 3 },
    { id: 3, type: 'lesson', status: 'completed', pos: 'right', icon: <Icons.BookOpen size={20} />, stars: 2 },
    { id: 2, type: 'chest', status: 'opened', pos: 'center', icon: <Icons.Award size={20} /> },
    { id: 1, type: 'lesson', status: 'completed', pos: 'center', icon: <Icons.Flag size={20} />, stars: 3 },
    
    // Section Header
    { id: 'section-1', type: 'section', title: 'Unit 1: Foundations', desc: 'Basics of conversation' },
  ];

  const getPositionClass = (pos: string) => {
    if (pos === 'left') return 'mr-auto ml-16';
    if (pos === 'right') return 'ml-auto mr-16';
    return 'mx-auto';
  };

  return (
    <div className="flex flex-col h-full bg-[#87CEEB] relative overflow-hidden">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-50">
            <button onClick={onBack} className="p-2 hover:bg-white rounded-full transition-colors">
                <Icons.ChevronRight className="rotate-180 text-gray-700" size={24} />
            </button>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                    <Icons.Zap size={16} className="text-yellow-500 fill-current" />
                    <span className="text-sm font-bold text-gray-700">1250</span>
                </div>
                 <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white">❤️</div>
                    <span className="text-sm font-bold text-gray-700">5</span>
                </div>
            </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 overflow-y-auto relative pb-24 custom-scrollbar bg-[#6ec5e9]" ref={scrollRef}>
            
            {/* Background Landscape Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Clouds */}
                <div className="absolute top-20 left-10 w-24 h-8 bg-white/40 rounded-full blur-xl"></div>
                <div className="absolute top-60 right-20 w-32 h-10 bg-white/30 rounded-full blur-xl"></div>
                
                {/* Green Hills (SVG Waves) */}
                <svg className="absolute bottom-0 w-full h-full opacity-30 text-green-500" preserveAspectRatio="none" viewBox="0 0 400 800">
                     <path fill="currentColor" d="M0,800 L400,800 L400,0 C350,100 300,150 200,150 C100,150 50,100 0,0 Z" />
                </svg>
                
                 {/* Dotted Path SVG */}
                 <div className="absolute inset-0 flex justify-center">
                    <svg className="h-full w-full max-w-md" viewBox="0 0 400 1200" preserveAspectRatio="none">
                         <path 
                            d="M200,1100 C200,1000 100,950 100,900 C100,850 300,800 300,750 C300,700 200,650 200,600 C200,550 100,500 100,450" 
                            stroke="white" 
                            strokeWidth="8" 
                            strokeDasharray="15,15" 
                            fill="none" 
                            strokeOpacity="0.6"
                            className="drop-shadow-sm"
                         />
                    </svg>
                 </div>
            </div>

            <div className="p-6 space-y-12 flex flex-col-reverse min-h-full justify-end relative z-10 max-w-md mx-auto">
                
                {levels.map((level, index) => {
                    if (level.type === 'section') {
                        return (
                            <div key={level.id} className="bg-white/90 backdrop-blur rounded-2xl p-4 shadow-lg border-b-4 border-gray-200 text-center mb-4 mx-4">
                                <h3 className="font-bold text-blue-600 text-lg tracking-tight">{level.title}</h3>
                                <p className="text-gray-500 text-xs font-medium">{level.desc}</p>
                            </div>
                        );
                    }

                    const isLocked = level.status === 'locked';
                    const isCurrent = level.status === 'current';
                    const isBoss = level.type === 'boss';
                    
                    return (
                        <div key={level.id} className={`relative ${getPositionClass(level.pos || '')} flex flex-col items-center group`}>
                            
                             {/* Floating Label for Current */}
                             {isCurrent && (
                                <div className="absolute -top-14 bg-white px-4 py-2 rounded-2xl shadow-xl animate-bounce mb-2 z-20 border-2 border-blue-100">
                                    <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Start</span>
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-4 h-4 bg-white border-b-2 border-r-2 border-blue-100"></div>
                                </div>
                            )}

                            {/* Node Button */}
                            <button 
                                onClick={() => !isLocked && setView(View.PRACTICE_SESSION)}
                                className={`
                                    relative flex items-center justify-center transition-all duration-300
                                    ${isBoss ? 'w-24 h-24 rounded-[2rem]' : 'w-20 h-20 rounded-full'}
                                    ${isLocked 
                                        ? 'bg-gray-200 border-b-8 border-gray-300 text-gray-400 grayscale' 
                                        : isCurrent
                                            ? 'bg-blue-500 border-b-8 border-blue-700 text-white shadow-[0_10px_30px_rgba(59,130,246,0.5)] scale-110'
                                            : level.type === 'chest' 
                                                ? 'bg-amber-400 border-b-8 border-amber-600 text-white shadow-lg'
                                                : 'bg-green-500 border-b-8 border-green-700 text-white shadow-lg'
                                    }
                                    active:border-b-0 active:translate-y-2
                                `}
                            >
                                <div className="relative z-10 drop-shadow-md">
                                     {level.icon || (isBoss ? <Icons.Target size={40} strokeWidth={2.5} /> : <Icons.Star size={32} fill="currentColor" />)}
                                </div>
                                
                                {/* Shine Effect */}
                                {!isLocked && (
                                    <div className="absolute top-2 left-2 w-4 h-2 bg-white/30 rounded-full blur-sm"></div>
                                )}

                                {/* Stars for completed levels */}
                                {level.stars !== undefined && level.stars > 0 && (
                                    <div className="absolute -bottom-6 flex gap-1 bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm">
                                        {[...Array(3)].map((_, i) => (
                                            <Icons.Star 
                                                key={i} 
                                                size={12} 
                                                className={`${i < level.stars ? 'text-yellow-400 fill-current' : 'text-gray-400/50 fill-gray-400/50'}`} 
                                            />
                                        ))}
                                    </div>
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
  );
};

export default LearningMap;
