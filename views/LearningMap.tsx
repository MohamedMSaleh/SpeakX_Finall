
import React, { useRef, useEffect, useState } from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';
import { GradientBackground, FloatingShapes, AnimatedCard, AnimatedBadge, MotivationalMessage } from '../components/AnimatedComponents';

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

// --- Rich Metadata for Lessons ---
const nodeDetails: Record<string | number, { 
    title: string; 
    unitLabel: string;
    description: string; 
    skills: string[]; 
    time: string; 
    difficulty: string;
    xp: number;
    coins: number;
}> = {
    301: {
        title: "Introduction & Greetings",
        unitLabel: "Unit 3 • Step 1",
        description: "Learn to introduce yourself confidently and ask simple questions.",
        skills: ["Pronunciation", "Fluency"],
        time: "5 min",
        difficulty: "Beginner",
        xp: 15,
        coins: 10
    },
    // Fallback for others
    default: {
        title: "General Practice",
        unitLabel: "Practice",
        description: "Review your skills with a quick mixed exercise.",
        skills: ["Vocabulary", "Grammar"],
        time: "7 min",
        difficulty: "Intermediate",
        xp: 20,
        coins: 15
    }
};

const LearningMap: React.FC<{ onBack: () => void, setView: (view: View) => void }> = ({ onBack, setView }) => {
  const [selectedLevel, setSelectedLevel] = useState<LevelNode | null>(null); // For Completed Results
  const [activeNode, setActiveNode] = useState<LevelNode | null>(null); // For Preview Panel
  const [lockedNode, setLockedNode] = useState<LevelNode | null>(null); // For Locked Alert

  // --- Data Definition ---
  const units: Unit[] = [
    {
      id: 1,
      title: "Level 1: Foundations",
      description: "Learn the alphabet and basic sounds.",
      color: "bg-green-500",
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
      title: "Level 2: Basics & Phrases",
      description: "Introduce yourself and use common phrases.",
      color: "bg-blue-500",
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
      title: "Level 3: Daily Conversations",
      description: "Order food, ask for directions, and chat.",
      color: "bg-orange-500",
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
        const activeEl = document.getElementById('active-level-node');
        if (activeEl) {
            activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
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
                strokeWidth="4" 
                strokeDasharray="8 8"
                strokeLinecap="round"
             />
           );
        })}
      </svg>
    );
  };

  const handleNodeClick = (level: LevelNode) => {
    if (level.status === 'locked') {
        setLockedNode(level);
    } else if (level.status === 'active' || level.status === 'completed') {
        setActiveNode(level);
    }
  };

  const details = activeNode ? (nodeDetails[activeNode.id] || nodeDetails['default']) : null;

  return (
    <div className="h-full flex flex-col bg-[#F0F9FF] relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Icons.Cloud className="absolute top-20 left-10 text-white/60 w-16 h-16" />
          <Icons.Cloud className="absolute top-40 right-20 text-white/40 w-12 h-12" />
          <Icons.Cloud className="absolute top-[600px] left-1/2 text-white/50 w-24 h-24" />
          
          <Icons.Trees className="absolute top-[300px] left-5 text-green-200/50 w-16 h-16" />
          <Icons.Trees className="absolute top-[700px] right-5 text-green-200/50 w-20 h-20" />
      </div>

      {/* 1. Transparent Top Bar (Stats) */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center pointer-events-none">
         <button onClick={onBack} className="p-2 bg-white/80 backdrop-blur-md rounded-xl text-gray-500 shadow-sm pointer-events-auto hover:bg-white transition-colors">
            <Icons.ChevronRight className="rotate-180" size={24} />
         </button>
         
         <div className="flex gap-4 pointer-events-auto">
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                <Icons.Heart className="text-red-500 fill-red-500" size={18} />
                <span className="font-extrabold text-red-500 text-sm">5</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                <Icons.Zap className="text-yellow-500 fill-yellow-500" size={18} />
                <span className="font-extrabold text-yellow-600 text-sm">1250 XP</span>
            </div>
         </div>
      </div>

      {/* 2. Scrollable Map Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar pb-24 pt-20 relative z-10">
          
          {units.map((unit) => (
            <div key={unit.id} className="relative mb-8 pt-4">
                
                {/* Unit Header Frame */}
                <div className="px-4 mb-8">
                    <div className={`${unit.color} text-white p-4 rounded-2xl shadow-xl shadow-gray-200/50 border-b-4 border-black/10 flex justify-between items-center transform transition-transform`}>
                        <div>
                            <h2 className="font-extrabold text-lg tracking-wide uppercase">{unit.title}</h2>
                            <p className="text-white/90 text-xs font-medium mt-0.5">{unit.description}</p>
                        </div>
                        <button className="bg-white/20 p-2.5 rounded-xl hover:bg-white/30 transition-colors backdrop-blur-sm">
                            <Icons.BookOpen size={20} />
                        </button>
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
                            ? `${unit.color} ring-4 ring-white shadow-xl`
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
                                    <div className="absolute -top-16 z-20 animate-bounce">
                                        <div className="bg-white px-3 py-1.5 rounded-xl shadow-lg border-2 border-blue-50 mb-2 whitespace-nowrap">
                                            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wide">Start!</span>
                                            <div className="absolute -bottom-[8px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-blue-50 transform rotate-45"></div>
                                        </div>
                                        <div className="relative">
                                           <Icons.Cat size={56} className="text-orange-500 fill-current drop-shadow-md relative z-10" />
                                        </div>
                                    </div>
                                )}

                                {/* The Button Node */}
                                <button 
                                    onClick={() => handleNodeClick(level)}
                                    className={`
                                        w-20 h-20 rounded-full flex items-center justify-center 
                                        border-b-[6px] active:border-b-0 active:translate-y-[6px] transition-all
                                        shadow-lg relative group
                                        ${buttonColorClass}
                                    `}
                                >
                                    {/* Glossy Reflection */}
                                    <div className="absolute top-0 left-0 right-0 h-10 bg-white/20 rounded-t-full"></div>
                                    
                                    {/* Icon */}
                                    <div className="relative z-10 drop-shadow-sm">
                                        {getNodeIcon(level.type, level.type === 'trophy' ? 32 : 28)}
                                    </div>

                                    {/* Locked Icon Overlay */}
                                    {level.status === 'locked' && (
                                        <div className="absolute inset-0 bg-black/10 rounded-full flex items-center justify-center">
                                            <Icons.Lock size={24} className="text-gray-500 opacity-60" />
                                        </div>
                                    )}

                                    {/* Completion Checkmark Overlay */}
                                    {level.status === 'completed' && (
                                        <div className="absolute -bottom-1 -right-1 bg-white text-yellow-500 rounded-full p-1.5 shadow-md border-2 border-gray-100">
                                            <div className="bg-yellow-400 rounded-full w-4 h-4 flex items-center justify-center">
                                                <Icons.Check size={12} className="text-white stroke-[4]" />
                                            </div>
                                        </div>
                                    )}

                                    {/* Stars for completed lessons */}
                                    {level.status === 'completed' && level.type !== 'chest' && (
                                        <div className="absolute -top-8 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 px-2 py-1 rounded-full shadow-sm backdrop-blur-sm">
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

      {/* 3. Lesson Preview Bottom Sheet */}
      {activeNode && details && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveNode(null)} />
            <div className="bg-white w-full max-w-md rounded-t-[32px] p-6 shadow-2xl relative animate-in slide-in-from-bottom duration-300">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${activeNode.status === 'completed' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}`}>
                            {getNodeIcon(activeNode.type, 32)}
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{details.unitLabel}</span>
                            <h2 className="text-2xl font-black text-gray-900 leading-tight">{details.title}</h2>
                        </div>
                    </div>
                    <button onClick={() => setActiveNode(null)} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200">
                        <Icons.X size={20} />
                    </button>
                </div>

                {/* What you'll learn */}
                <div className="space-y-4 mb-8">
                    <div className="flex gap-2">
                        {details.skills.map(skill => (
                            <span key={skill} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide border border-blue-100">
                                {skill}
                            </span>
                        ))}
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                            <Icons.Clock size={12} /> {details.time}
                        </span>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                            <Icons.Target size={16} className="text-blue-500" /> Lesson Focus
                        </h4>
                        <ul className="space-y-2">
                            <li className="text-sm text-gray-600 flex gap-2 items-start">
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 shrink-0"></span>
                                {details.description}
                            </li>
                            <li className="text-sm text-gray-600 flex gap-2 items-start">
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 shrink-0"></span>
                                Practice pronunciation of core vocabulary.
                            </li>
                        </ul>
                    </div>

                    {/* Rewards */}
                    <div className="flex items-center justify-between px-2">
                        <span className="text-sm font-bold text-gray-500">Completion Rewards:</span>
                        <div className="flex gap-3">
                            <div className="flex items-center gap-1 text-yellow-600 font-black text-sm">
                                <Icons.Zap size={16} className="fill-yellow-500 text-yellow-500" /> +{details.xp} XP
                            </div>
                            <div className="flex items-center gap-1 text-orange-600 font-black text-sm">
                                <Icons.Gem size={16} className="text-orange-500" /> +{details.coins} Coins
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <button 
                    onClick={() => { setActiveNode(null); setView(View.LESSON_PLAYER); }}
                    className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-[0_6px_0_#1d4ed8] hover:bg-blue-500 active:shadow-none active:translate-y-[6px] transition-all text-lg uppercase tracking-wide flex items-center justify-center gap-2"
                >
                    {activeNode.status === 'completed' ? 'Practice Again' : 'Start Lesson'}
                </button>
            </div>
        </div>
      )}

      {/* 4. Locked Modal */}
      {lockedNode && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setLockedNode(null)} />
              <div className="bg-white w-full max-w-sm p-6 rounded-3xl shadow-2xl relative animate-in zoom-in-95 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                      <Icons.Lock size={32} />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Level Locked</h3>
                  <p className="text-gray-500 text-sm mb-6">
                      Complete the previous lessons to unlock this level. You need to master the basics first!
                  </p>
                  <button 
                    onClick={() => setLockedNode(null)}
                    className="w-full bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300 transition-colors"
                  >
                      Okay, I understand
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};

export default LearningMap;
