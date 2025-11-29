
import React, { useRef, useEffect, useState } from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';

// --- Types for our Map Data ---
type NodeType = 'lesson' | 'book' | 'chest' | 'trophy' | 'dumbell';
type NodeStatus = 'completed' | 'active' | 'locked';

interface LevelNode {
  id: number;
  type: NodeType;
  status: NodeStatus;
  xOffset: number; // -1 (Left), 0 (Center), 1 (Right) for zigzag
}

interface Unit {
  id: number;
  title: string;
  description: string;
  color: string; // Header color
  theme: 'forest' | 'desert' | 'snow';
  levels: LevelNode[];
}

const Roadmap: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  const [selectedLevel, setSelectedLevel] = useState<LevelNode | null>(null); // For Completed Results
  const [startNode, setStartNode] = useState<LevelNode | null>(null); // For Starting Active Level

  // --- Data Definition ---
  const units: Unit[] = [
    {
      id: 1,
      title: "Unit 1: Foundations",
      description: "Learn the alphabet and basic sounds.",
      color: "bg-blue-600", // Unified Blue
      theme: 'forest',
      levels: [
        { id: 101, type: 'lesson', status: 'completed', xOffset: 0 },
        { id: 102, type: 'lesson', status: 'completed', xOffset: -1 },
        { id: 103, type: 'chest', status: 'completed', xOffset: 0 },
        { id: 104, type: 'lesson', status: 'completed', xOffset: 1 },
        { id: 105, type: 'trophy', status: 'completed', xOffset: 0 },
      ]
    },
    {
      id: 2,
      title: "Unit 2: Basics & Phrases",
      description: "Introduce yourself and use common phrases.",
      color: "bg-blue-500", // Unified Blue
      theme: 'snow',
      levels: [
        { id: 201, type: 'lesson', status: 'completed', xOffset: 0 },
        { id: 202, type: 'lesson', status: 'completed', xOffset: 1 },
        { id: 203, type: 'chest', status: 'completed', xOffset: 1 },
        { id: 204, type: 'dumbell', status: 'completed', xOffset: 0 },
        { id: 205, type: 'lesson', status: 'completed', xOffset: -1 },
        { id: 206, type: 'book', status: 'completed', xOffset: -1 },
        { id: 207, type: 'trophy', status: 'completed', xOffset: 0 },
      ]
    },
    {
      id: 3,
      title: "Unit 3: Daily Conversations",
      description: "Order food, ask for directions, and chat.",
      color: "bg-blue-700", // Unified Blue
      theme: 'desert',
      levels: [
        { id: 301, type: 'lesson', status: 'active', xOffset: 0 },
        { id: 302, type: 'book', status: 'locked', xOffset: -1 },
        { id: 303, type: 'lesson', status: 'locked', xOffset: -1 },
        { id: 304, type: 'chest', status: 'locked', xOffset: 0 },
        { id: 305, type: 'lesson', status: 'locked', xOffset: 1 },
        { id: 306, type: 'trophy', status: 'locked', xOffset: 0 },
      ]
    },
  ];

  // Helper to scroll to active unit on mount
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if(scrollRef.current) {
        // Find element with active status
        setTimeout(() => {
            const activeEl = document.getElementById('active-level-node');
            if (activeEl) {
                activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    }
  }, []);


  // --- Helpers for Styling ---
  const getNodeColor = (status: NodeStatus, unitColor: string) => {
    if (status === 'locked') return 'bg-gray-200 border-gray-300 text-gray-400';
    if (status === 'completed') return 'bg-yellow-400 border-yellow-600 text-white';
    // Active uses unit color
    return `${unitColor} border-white text-white`; 
  };

  const getNodeIcon = (type: NodeType, size: number = 24) => {
    switch (type) {
      case 'lesson': return <Icons.Star size={size} fill="currentColor" />;
      case 'book': return <Icons.BookOpen size={size} />;
      case 'chest': return <Icons.Gift size={size} />;
      case 'trophy': return <Icons.Trophy size={size} fill="currentColor" />;
      case 'dumbell': return <Icons.Dumbbell size={size} />;
      default: return <Icons.Star size={size} />;
    }
  };

  // --- Dynamic Path Rendering ---
  const ROW_HEIGHT = 100;
  
  const renderPath = (levels: LevelNode[]) => {
    return (
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" style={{ height: levels.length * ROW_HEIGHT }}>
        {levels.map((level, index) => {
           if (index === levels.length - 1) return null;
           
           const currentX = 50 + (level.xOffset * 25);
           const currentY = index * ROW_HEIGHT + 50;
           
           const nextLevel = levels[index + 1];
           const nextX = 50 + (nextLevel.xOffset * 25);
           const nextY = (index + 1) * ROW_HEIGHT + 50;

           return (
             <line 
                key={`line-${index}`}
                x1={`${currentX}%`} 
                y1={currentY} 
                x2={`${nextX}%`} 
                y2={nextY} 
                stroke="#cbd5e1" 
                strokeWidth="8" 
                strokeDasharray="0"
                strokeLinecap="round"
                className="drop-shadow-sm opacity-50"
             />
           );
        })}
      </svg>
    );
  };

  const handleNodeClick = (level: LevelNode) => {
    if (level.status === 'active') {
        setStartNode(level);
    } else if (level.status === 'completed') {
        setSelectedLevel(level);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#F0F9FF] relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-gradient-to-b from-blue-50 to-white">
          <Icons.Cloud className="absolute top-20 left-10 text-white w-24 h-24 drop-shadow-sm opacity-80" />
          <Icons.Cloud className="absolute top-40 right-20 text-white w-16 h-16 drop-shadow-sm opacity-60" />
          <Icons.Cloud className="absolute top-[600px] left-1/2 text-white w-32 h-32 drop-shadow-sm opacity-70" />
      </div>

      {/* 1. Transparent Top Bar (Stats) */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center pointer-events-none mt-14 max-w-md mx-auto">
         <div className="flex gap-4 pointer-events-auto ml-auto">
            <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border-b-4 border-gray-200 shadow-sm active:translate-y-0.5 active:border-b-2 transition-all">
                <Icons.Heart className="text-red-500 fill-red-500" size={20} />
                <span className="font-black text-red-500 text-sm">5</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border-b-4 border-gray-200 shadow-sm active:translate-y-0.5 active:border-b-2 transition-all">
                <Icons.Zap className="text-yellow-500 fill-yellow-500" size={20} />
                <span className="font-black text-yellow-500 text-sm">1250</span>
            </div>
         </div>
      </div>

      {/* 2. Scrollable Map Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar pb-32 pt-24 relative z-10">
          
          {units.map((unit) => (
            <div key={unit.id} className="relative mb-6">
                
                {/* Unit Header Frame - BLUE THEME */}
                <div className="px-4 mb-4 sticky top-4 z-20">
                    <div className={`${unit.color} text-white p-4 rounded-3xl shadow-lg border-b-4 border-black/10 flex justify-between items-center`}>
                        <div>
                            <h2 className="font-black text-lg tracking-wide uppercase">{unit.title}</h2>
                            <p className="text-white/80 text-xs font-bold mt-0.5">{unit.description}</p>
                        </div>
                        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                            <Icons.BookOpen size={24} className="text-white" />
                        </div>
                    </div>
                </div>

                {/* Nodes Container */}
                <div className="relative py-4" style={{ height: unit.levels.length * 100 }}> {/* 100px per row */}
                    
                    {/* The Connecting Path */}
                    {renderPath(unit.levels)}

                    {/* The Nodes */}
                    {unit.levels.map((level, index) => {
                        const leftPos = 50 + (level.xOffset * 25); // 25, 50, 75 percent
                        const topPos = index * 100 + 50;
                        const isNodeActive = level.status === 'active';
                        
                        // Active node gets the unit color, others use helper
                        const buttonColorClass = level.status === 'active' 
                            ? `${unit.color} ring-[6px] ring-white shadow-xl`
                            : getNodeColor(level.status, unit.color);

                        return (
                            <div 
                                id={isNodeActive ? 'active-level-node' : undefined}
                                key={level.id} 
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
                                style={{ left: `${leftPos}%`, top: `${topPos}px` }}
                            >
                                {/* Floating Avatar for Active Level */}
                                {isNodeActive && (
                                    <div className="absolute -top-20 z-20 animate-bounce">
                                        <div className="bg-white px-3 py-2 rounded-xl shadow-md border-2 border-gray-100 mb-1 whitespace-nowrap">
                                            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wide">START!</span>
                                            <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-gray-100 transform rotate-45"></div>
                                        </div>
                                        <div className="relative">
                                           <Icons.Cat size={64} className="text-orange-500 fill-current drop-shadow-md relative z-10" />
                                        </div>
                                    </div>
                                )}

                                {/* The Button Node */}
                                <button 
                                    onClick={() => handleNodeClick(level)}
                                    className={`
                                        w-20 h-20 rounded-full flex items-center justify-center 
                                        border-b-[8px] active:border-b-0 active:translate-y-[8px] transition-all
                                        shadow-lg relative group
                                        ${buttonColorClass}
                                    `}
                                >
                                    {/* Glossy Reflection */}
                                    <div className="absolute top-2 left-3 w-6 h-3 bg-white/30 rounded-full -rotate-45"></div>
                                    
                                    {/* Icon */}
                                    <div className="relative z-10 drop-shadow-sm transform group-active:scale-95 transition-transform">
                                        {getNodeIcon(level.type, level.type === 'trophy' ? 32 : 28)}
                                    </div>

                                    {/* Completion Checkmark Overlay */}
                                    {level.status === 'completed' && (
                                        <div className="absolute -bottom-1 -right-1 bg-white text-yellow-500 rounded-full p-1.5 shadow-md border-2 border-gray-100">
                                            <div className="bg-yellow-400 rounded-full w-4 h-4 flex items-center justify-center">
                                                <Icons.Check size={12} className="text-white stroke-[3]" />
                                            </div>
                                        </div>
                                    )}

                                    {/* Stars for completed lessons */}
                                    {level.status === 'completed' && level.type !== 'chest' && (
                                        <div className="absolute -top-8 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-2 py-1 rounded-full shadow-sm border border-gray-100">
                                            <Icons.Star size={12} className="text-yellow-400 fill-current" />
                                            <Icons.Star size={16} className="text-yellow-400 fill-current -mt-1" />
                                            <Icons.Star size={12} className="text-yellow-400 fill-current" />
                                        </div>
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
          ))}
      </div>

      {/* 3. Level Start Modal (Bottom Sheet Style) */}
      {startNode && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                onClick={() => setStartNode(null)}
            />
            
            {/* Card */}
            <div className="bg-white w-full max-w-md p-6 rounded-t-[32px] sm:rounded-[32px] shadow-2xl transform transition-transform animate-in slide-in-from-bottom duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gray-100"></div>
                
                {/* Header */}
                <div className="flex justify-between items-start mb-6 pt-2">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                        {getNodeIcon(startNode.type, 32)}
                    </div>
                    <button 
                        onClick={() => setStartNode(null)} 
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        <Icons.X size={24} className="text-gray-500" />
                    </button>
                </div>
                
                <h3 className="text-2xl font-black text-gray-900 mb-2">Level {startNode.id % 100}</h3>
                <p className="text-gray-500 font-medium text-lg leading-relaxed mb-8">
                    In this lesson, you will practice <span className="text-blue-600 font-bold">introducing yourself</span> and mastering basic greetings.
                </p>
                
                <div className="flex items-center justify-between mb-8 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <span className="text-blue-900 font-bold text-sm uppercase tracking-wide">Reward</span>
                    <div className="flex items-center gap-1.5">
                        <Icons.Zap size={20} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-yellow-600 font-black text-lg">+10 XP</span>
                    </div>
                </div>

                <button 
                    onClick={() => { setStartNode(null); setView(View.PRACTICE_SESSION); }}
                    className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-[0_6px_0_#1e40af] hover:bg-blue-500 hover:shadow-[0_6px_0_#2563eb] active:shadow-none active:translate-y-[6px] transition-all text-lg tracking-wide uppercase"
                >
                    Start Lesson
                </button>
            </div>
        </div>
      )}

      {/* 4. Completed Level Modal */}
      {selectedLevel && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-white rounded-[32px] p-8 w-full max-w-sm shadow-2xl animate-in zoom-in-95 relative border-4 border-white/50 bg-clip-padding">
                <button 
                    onClick={() => setSelectedLevel(null)} 
                    className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
                >
                    <Icons.X size={20} />
                </button>
                
                <div className="text-center pt-2">
                    <div className="flex justify-center gap-2 mb-6">
                        <Icons.Star size={40} className="text-yellow-400 fill-current animate-bounce drop-shadow-md" style={{ animationDelay: '0ms' }} />
                        <Icons.Star size={56} className="text-yellow-400 fill-current animate-bounce drop-shadow-lg" style={{ animationDelay: '100ms' }} />
                        <Icons.Star size={40} className="text-yellow-400 fill-current animate-bounce drop-shadow-md" style={{ animationDelay: '200ms' }} />
                    </div>
                    
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Level Completed!</h3>
                    <p className="text-gray-500 mb-8 font-medium">You scored <span className="text-green-600 font-extrabold">95%</span> on this lesson.</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-blue-50 p-4 rounded-2xl border-2 border-blue-100">
                            <div className="text-xs text-blue-600 font-extrabold uppercase tracking-wide">Accuracy</div>
                            <div className="text-2xl font-extrabold text-gray-900">95%</div>
                        </div>
                         <div className="bg-purple-50 p-4 rounded-2xl border-2 border-purple-100">
                            <div className="text-xs text-purple-600 font-extrabold uppercase tracking-wide">XP Earned</div>
                            <div className="text-2xl font-extrabold text-gray-900">+40</div>
                        </div>
                    </div>

                    <button 
                        onClick={() => { setSelectedLevel(null); setView(View.PRACTICE_SESSION); }}
                        className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-[0_4px_0_#1e40af] hover:bg-blue-500 active:shadow-none active:translate-y-1 transition-all flex items-center justify-center gap-2"
                    >
                        <Icons.RotateCcw size={20} /> Practice Again
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Roadmap;
