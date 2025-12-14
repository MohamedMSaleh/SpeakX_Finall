
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

const Roadmap: React.FC<{ onBack: () => void, setView: (view: View) => void }> = ({ onBack, setView }) => {
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
    <div className="h-full flex flex-col relative overflow-hidden">
      <GradientBackground variant="blue" />
      <FloatingShapes />
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
          <Icons.Cloud className="absolute top-20 left-10 text-white/80 w-20 h-20 animate-float" />
          <Icons.Cloud className="absolute top-40 right-20 text-white/60 w-16 h-16 animate-floatSlow" style={{ animationDelay: '1s' }} />
          <Icons.Cloud className="absolute top-[600px] left-1/2 text-white/70 w-28 h-28 animate-float" style={{ animationDelay: '2s' }} />
          
          <Icons.Trees className="absolute top-[300px] left-5 text-green-200/60 w-20 h-20 animate-floatSlow" />
          <Icons.Trees className="absolute top-[700px] right-5 text-green-200/70 w-24 h-24 animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* 1. Transparent Top Bar (Stats) */}
      <div className="fixed top-0 left-0 right-0 md:left-72 z-50 p-4 flex justify-between items-center pointer-events-none">
         <button onClick={onBack} className="p-2.5 bg-white/90 backdrop-blur-md rounded-2xl text-gray-600 shadow-xl pointer-events-auto hover:bg-white transition-all hover-lift border-2 border-white/50">
            <Icons.ChevronRight className="rotate-180" size={24} strokeWidth={3} />
         </button>
         
         <div className="flex gap-3 pointer-events-auto">
            <AnimatedBadge variant="error" className="flex items-center gap-2 px-4 py-2.5 shadow-xl border-2 border-red-200">
                <Icons.Heart className="fill-current animate-pulse-glow" size={20} />
                <span className="font-black text-base">5</span>
            </AnimatedBadge>
            <AnimatedBadge variant="premium" className="flex items-center gap-2 px-4 py-2.5 shadow-xl border-2 border-yellow-200 bg-gradient-to-r from-yellow-400 to-amber-500">
                <Icons.Zap className="fill-current text-amber-900 animate-pulse-glow" size={20} />
                <span className="font-black text-amber-900 text-base">1250</span>
            </AnimatedBadge>
         </div>
      </div>

      {/* 2. Scrollable Map Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar pb-24 pt-20 relative z-10 w-full">
          <div className="max-w-xl mx-auto w-full px-4">
            <MotivationalMessage message="Every step brings you closer to fluency! 🚀" className="mb-6" />
            
            {units.map((unit) => (
                <div key={unit.id} className="relative mb-10 pt-4 animate-fadeIn">
                    
                    {/* Unit Header Frame */}
                    <div className="mb-10">
                        <AnimatedCard variant="gradient" className={`p-6 ${unit.color} border-4 border-white/30 shadow-2xl flex justify-between items-center hover-lift group`}>
                            <div>
                                <h2 className="font-black text-xl tracking-wide uppercase text-white drop-shadow-xl">🎯 {unit.title}</h2>
                                <p className="text-white/95 text-sm font-bold mt-1.5 drop-shadow">{unit.description}</p>
                            </div>
                            <button className="bg-white/30 hover:bg-white/40 p-3 rounded-2xl transition-all backdrop-blur-md border-2 border-white/40 group-hover:scale-110 shadow-lg">
                                <Icons.BookOpen size={24} className="text-white drop-shadow" strokeWidth={2.5} />
                            </button>
                        </AnimatedCard>
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
                                        <div className="absolute -top-20 z-20 animate-bounce-in">
                                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-2xl shadow-2xl border-2 border-white/50 mb-3 whitespace-nowrap backdrop-blur-md">
                                                <span className="text-sm font-black text-white uppercase tracking-wide drop-shadow">Start! ⚡</span>
                                                <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-600 border-b-2 border-r-2 border-white/50 transform rotate-45"></div>
                                            </div>
                                            <div className="relative flex justify-center">
                                                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full blur-xl opacity-60 animate-pulse-glow"></div>
                                                <Icons.Cat size={64} className="text-orange-500 fill-current drop-shadow-2xl relative z-10 animate-bounce-subtle" />
                                            </div>
                                        </div>
                                    )}

                                    {/* The Button Node */}
                                    <button 
                                        onClick={() => handleNodeClick(level)}
                                        className={`
                                            w-24 h-24 rounded-full flex items-center justify-center 
                                            border-b-[6px] active:border-b-0 active:translate-y-[6px] transition-all
                                            shadow-2xl relative group hover-lift
                                            ${buttonColorClass}
                                            ${isNodeActive ? 'animate-pulse-glow scale-110' : ''}
                                        `}
                                    >
                                        {/* Glossy Reflection */}
                                        <div className="absolute top-0 left-0 right-0 h-12 bg-white/30 rounded-t-full"></div>
                                        
                                        {/* Icon */}
                                        <div className="relative z-10 drop-shadow-lg">
                                            {getNodeIcon(level.type, level.type === 'trophy' ? 36 : 32)}
                                        </div>

                                        {/* Locked Icon Overlay */}
                                        {level.status === 'locked' && (
                                            <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                                <Icons.Lock size={28} className="text-gray-500 opacity-80 drop-shadow-lg" />
                                            </div>
                                        )}

                                        {/* Completion Checkmark Overlay */}
                                        {level.status === 'completed' && (
                                            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-xl border-4 border-white animate-bounce-in">
                                                <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full w-6 h-6 flex items-center justify-center shadow-inner">
                                                    <Icons.Check size={16} className="text-white stroke-[4]" />
                                                </div>
                                            </div>
                                        )}

                                        {/* Stars for completed lessons */}
                                        {level.status === 'completed' && level.type !== 'chest' && (
                                            <div className="absolute -top-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-yellow-400 to-amber-500 px-3 py-2 rounded-full shadow-2xl backdrop-blur-md border-2 border-yellow-200">
                                                <Icons.Star size={14} className="text-amber-900 fill-current animate-sparkle" />
                                                <Icons.Star size={18} className="text-amber-900 fill-current -mt-1 animate-sparkle" style={{ animationDelay: '0.1s' }} />
                                                <Icons.Star size={14} className="text-amber-900 fill-current animate-sparkle" style={{ animationDelay: '0.2s' }} />
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
      </div>

      {/* 3. Lesson Preview Bottom Sheet */}
      {activeNode && details && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setActiveNode(null)} />
            <AnimatedCard variant="white" className="w-full max-w-md rounded-t-[32px] p-8 shadow-2xl relative animate-slideUp border-t-4 border-blue-500">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl ${
                            activeNode.status === 'completed' ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white' : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                        }`}>
                            {getNodeIcon(activeNode.type, 36)}
                        </div>
                        <div>
                            <AnimatedBadge variant="secondary" className="text-xs font-black mb-2">{details.unitLabel}</AnimatedBadge>
                            <h2 className="text-2xl font-black text-gray-900 leading-tight">{details.title}</h2>
                        </div>
                    </div>
                    <button onClick={() => setActiveNode(null)} className="p-2.5 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full text-gray-600 hover:bg-gray-300 shadow-lg hover-lift">
                        <Icons.X size={22} strokeWidth={3} />
                    </button>
                </div>

                {/* What you'll learn */}
                <div className="space-y-5 mb-8">
                    <div className="flex flex-wrap gap-2">
                        {details.skills.map(skill => (
                            <AnimatedBadge key={skill} variant="primary" className="px-4 py-2 text-xs font-black uppercase tracking-wider">
                                {skill}
                            </AnimatedBadge>
                        ))}
                        <AnimatedBadge variant="secondary" className="px-4 py-2 text-xs font-bold flex items-center gap-1.5">
                            <Icons.Clock size={14} /> {details.time}
                        </AnimatedBadge>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-3xl border-2 border-blue-100 shadow-inner">
                        <h4 className="font-black text-gray-900 text-base mb-3 flex items-center gap-2">
                            <Icons.Target size={18} className="text-blue-600" /> 🎯 Lesson Focus
                        </h4>
                        <ul className="space-y-2.5">
                            <li className="text-sm text-gray-700 font-medium flex gap-2 items-start">
                                <span className="w-2 h-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mt-1.5 shrink-0 shadow-sm"></span>
                                {details.description}
                            </li>
                            <li className="text-sm text-gray-700 font-medium flex gap-2 items-start">
                                <span className="w-2 h-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mt-1.5 shrink-0 shadow-sm"></span>
                                Practice pronunciation of core vocabulary.
                            </li>
                        </ul>
                    </div>

                    {/* Rewards */}
                    <div className="flex items-center justify-between px-3 py-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border-2 border-yellow-200">
                        <span className="text-sm font-black text-gray-700">🎁 Rewards:</span>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1.5 text-yellow-700 font-black text-base">
                                <Icons.Zap size={18} className="fill-yellow-600 text-yellow-600 animate-pulse-glow" /> +{details.xp}
                            </div>
                            <div className="flex items-center gap-1.5 text-orange-700 font-black text-base">
                                <Icons.Gem size={18} className="text-orange-600" /> +{details.coins}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <button 
                    onClick={() => { setActiveNode(null); setView(View.LESSON_PLAYER); }}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black py-5 rounded-2xl shadow-[0_8px_0_#1e40af] hover:shadow-[0_6px_0_#1e40af] hover:translate-y-[2px] active:shadow-none active:translate-y-[8px] transition-all text-lg uppercase tracking-wide flex items-center justify-center gap-3 border-2 border-blue-500"
                >
                    {activeNode.status === 'completed' ? '🔁 Practice Again' : '🚀 Start Lesson'}
                </button>
            </AnimatedCard>
        </div>
      )}

      {/* 4. Locked Modal */}
      {lockedNode && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setLockedNode(null)} />
              <AnimatedCard variant="white" className="w-full max-w-sm p-8 text-center animate-shake border-4 border-red-200">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-5 text-gray-400 shadow-xl border-4 border-gray-300">
                      <Icons.Lock size={44} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">\ud83d\udd12 Level Locked</h3>
                  <p className="text-gray-600 text-sm font-semibold mb-8 leading-relaxed">
                      Complete the previous lessons to unlock this level. You need to master the basics first!
                  </p>
                  <button 
                    onClick={() => setLockedNode(null)}
                    className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white font-black py-4 rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all shadow-xl hover-lift border-2 border-gray-500"
                  >
                      \u2705 Okay, I understand
                  </button>
              </AnimatedCard>
          </div>
      )}
    </div>
  );
};

export default Roadmap;
