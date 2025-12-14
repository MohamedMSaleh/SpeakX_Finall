
import React, { useRef, useEffect, useState } from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';
import { GradientBackground, WaveDecoration, GlowingOrb, BlobShape } from '../components/DecorativeElements';
import { RewardBadge, ProgressRing, StreakDisplay, XPCounter } from '../components/RewardElements';
import { PopIn, Sparkles, ProgressBar } from '../components/MicroInteractions';
import { colors, gradients } from '../styles/designSystem';

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
  gradient: string;
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
  const [selectedLevel, setSelectedLevel] = useState<LevelNode | null>(null);
  const [activeNode, setActiveNode] = useState<LevelNode | null>(null);
  const [lockedNode, setLockedNode] = useState<LevelNode | null>(null);
  const [showSparkles, setShowSparkles] = useState(false);

  const units: Unit[] = [
    {
      id: 1,
      title: "Level 1: Foundations",
      description: "Learn the alphabet and basic sounds.",
      color: "bg-green-500",
      gradient: gradients.cardGreen,
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
      gradient: gradients.cardBlue,
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
      gradient: gradients.cardYellow,
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

  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to active node on mount
    const timer = setTimeout(() => {
      if(scrollRef.current) {
        const activeEl = document.getElementById('active-level-node');
        if (activeEl) {
          activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }, 300); // Small delay to ensure DOM is ready
    
    return () => clearTimeout(timer);
  }, []);

  const getNodeColor = (status: NodeStatus, unitGradient: string) => {
    if (status === 'locked') return { bg: 'bg-gray-300', border: 'border-gray-400', text: 'text-gray-500', shadow: '' };
    if (status === 'completed') return { bg: '', border: 'border-yellow-500', text: 'text-white', shadow: 'shadow-lg shadow-yellow-300/50', gradient: gradients.cardYellow };
    return { bg: '', border: 'border-blue-500', text: 'text-white', shadow: 'shadow-lg shadow-blue-400/50', gradient: unitGradient };
  };

  const getNodeIcon = (type: NodeType, size: number = 28) => {
    switch (type) {
      case 'lesson': return <Icons.Star size={size} fill="currentColor" />;
      case 'book': return <Icons.BookOpen size={size} />;
      case 'chest': return <Icons.Gift size={size} />;
      case 'trophy': return <Icons.Trophy size={size} fill="currentColor" />;
      case 'dumbell': return <Icons.Dumbbell size={size} />;
      default: return <Icons.Star size={size} />;
    }
  };

  const ROW_HEIGHT = 110;
  
  const renderPath = (levels: LevelNode[], unitGradient: string) => {
    const paths: React.ReactElement[] = [];
    for (let i = 0; i < levels.length - 1; i++) {
      const current = levels[i];
      const next = levels[i + 1];
      const x1 = 150 + current.xOffset * 60;
      const y1 = i * ROW_HEIGHT + 35;
      const x2 = 150 + next.xOffset * 60;
      const y2 = (i + 1) * ROW_HEIGHT + 35;

      const isCompleted = current.status === 'completed' && next.status === 'completed';
      const isActive = current.status === 'completed' && next.status === 'active';
      
      const strokeColor = isCompleted ? colors.secondary.warning : isActive ? colors.primary.blue : colors.neutral.gray300;
      const strokeWidth = isCompleted || isActive ? 6 : 4;

      paths.push(
        <line
          key={`path-${i}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="transition-all duration-500"
          style={{
            filter: (isCompleted || isActive) ? `drop-shadow(0 2px 4px ${strokeColor}40)` : 'none'
          }}
        />
      );
    }
    return paths;
  };

  const details = activeNode ? (nodeDetails[activeNode.id] || nodeDetails.default) : null;

  return (
    <div className="h-full overflow-hidden relative">
      <GradientBackground variant="primary" className="h-full">
        {/* Header with Progress */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="p-4 flex items-center justify-between">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition-colors active:scale-95">
              <Icons.ChevronRight size={24} className="text-gray-700 rotate-180" />
            </button>
            <div className="flex-1 mx-4">
              <h1 className="text-lg font-black text-gray-900 mb-1">Learning Path</h1>
              <ProgressBar progress={65} height={8} gradient={gradients.cardBlue} animated />
            </div>
            <StreakDisplay days={12} size="small" />
          </div>
        </div>

        {/* Main Roadmap */}
        <div ref={scrollRef} className="h-[calc(100%-80px)] overflow-y-auto pb-24 relative">
          <div className="py-8 relative">
            {units.map((unit, unitIdx) => (
              <PopIn key={unit.id} delay={unitIdx * 100}>
                <div className="mb-16 relative">
                  {/* Unit Header */}
                  <div className="mb-8 px-6">
                    <div 
                      className="relative rounded-3xl p-6 shadow-xl overflow-hidden"
                      style={{ background: unit.gradient }}
                    >
                      <GlowingOrb color={colors.primary.white} size={200} className="-right-20 -top-20" />
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                          <h2 className="text-2xl font-black text-white">{unit.title}</h2>
                          <RewardBadge type={unitIdx === 0 ? 'trophy' : unitIdx === 1 ? 'star' : 'gem'} size={48} glow />
                        </div>
                        <p className="text-white/90 font-medium">{unit.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Levels Path */}
                  <div className="relative mx-auto" style={{ width: '300px', height: unit.levels.length * ROW_HEIGHT }}>
                    {/* SVG Path */}
                    <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
                      {renderPath(unit.levels, unit.gradient)}
                    </svg>

                    {/* Nodes */}
                    <div className="relative">
                      {unit.levels.map((level, idx) => {
                        const styling = getNodeColor(level.status, unit.gradient);
                        const isActiveLevel = level.status === 'active';
                        
                        return (
                          <div
                            key={level.id}
                            id={isActiveLevel ? 'active-level-node' : `level-${level.id}`}
                            className="absolute transition-all duration-300"
                            style={{
                              left: `calc(50% + ${level.xOffset * 60}px)`,
                              top: `${idx * ROW_HEIGHT}px`,
                              transform: 'translate(-50%, 0)',
                            }}
                          >
                            <button
                              onClick={() => {
                                if (level.status === 'locked') {
                                  setLockedNode(level);
                                } else {
                                  setActiveNode(level);
                                  setShowSparkles(level.status === 'completed');
                                }
                              }}
                              disabled={level.status === 'locked'}
                              className={`relative group ${level.status !== 'locked' ? 'hover:scale-110' : ''} transition-all duration-300`}
                            >
                              {/* Node Circle */}
                              <div
                                className={`w-20 h-20 rounded-full flex items-center justify-center border-4 ${styling.border} ${styling.text} ${styling.shadow} transition-all duration-300 group-hover:shadow-2xl`}
                                style={{ 
                                  background: styling.gradient || styling.bg,
                                }}
                              >
                                {getNodeIcon(level.type, 36)}
                                {level.status === 'active' && (
                                  <div className="absolute inset-0 rounded-full border-4 border-blue-400 animate-ping opacity-75" />
                                )}
                              </div>

                              {/* Locked Overlay */}
                              {level.status === 'locked' && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                                    <Icons.Lock size={16} className="text-gray-500" />
                                  </div>
                                </div>
                              )}

                              {/* Completion Check */}
                              {level.status === 'completed' && (
                                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-lg">
                                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: gradients.cardGreen }}>
                                    <Icons.Check size={14} className="text-white stroke-[3]" />
                                  </div>
                                </div>
                              )}

                              {/* Stars for completed */}
                              {level.status === 'completed' && level.type !== 'chest' && (
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {[0, 1, 2].map((i) => (
                                    <Icons.Star key={i} size={i === 1 ? 20 : 14} className="text-yellow-400 fill-current drop-shadow-md" />
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
              </PopIn>
            ))}
          </div>
        </div>

        {/* Lesson Preview Bottom Sheet */}
        {activeNode && details && (
          <>
            <Sparkles active={showSparkles} count={20} />
            <div className="fixed inset-0 z-[60] flex items-end justify-center">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setActiveNode(null); setShowSparkles(false); }} />
              <div className="bg-white w-full max-w-md rounded-t-[32px] p-6 shadow-2xl relative animate-slideUp">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ background: activeNode.status === 'completed' ? gradients.cardYellow : gradients.cardBlue }}
                    >
                      {getNodeIcon(activeNode.type, 40)}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{details.unitLabel}</span>
                      <h2 className="text-2xl font-black text-gray-900 leading-tight">{details.title}</h2>
                    </div>
                  </div>
                  <button onClick={() => { setActiveNode(null); setShowSparkles(false); }} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                    <Icons.X size={20} />
                  </button>
                </div>

                {/* Skills & Time */}
                <div className="space-y-4 mb-6">
                  <div className="flex flex-wrap gap-2">
                    {details.skills.map(skill => (
                      <span key={skill} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide border-2 border-blue-100">
                        {skill}
                      </span>
                    ))}
                    <span className="bg-purple-50 text-purple-700 border-2 border-purple-100 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1">
                      <Icons.Clock size={14} /> {details.time}
                    </span>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-5 rounded-2xl border-2 border-blue-100 shadow-sm">
                    <h4 className="font-black text-gray-900 text-base mb-3 flex items-center gap-2">
                      <Icons.Target size={20} className="text-blue-600" /> What You'll Learn
                    </h4>
                    <ul className="space-y-2">
                      <li className="text-sm text-gray-700 flex gap-3 items-start font-medium">
                        <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: gradients.cardBlue }} />
                        {details.description}
                      </li>
                      <li className="text-sm text-gray-700 flex gap-3 items-start font-medium">
                        <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: gradients.cardBlue }} />
                        Practice pronunciation and fluency with interactive exercises
                      </li>
                    </ul>
                  </div>

                  {/* Rewards */}
                  <div className="flex items-center justify-between p-4 rounded-2xl" style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #DBEAFE 100%)' }}>
                    <span className="text-sm font-black text-gray-700">Rewards:</span>
                    <div className="flex gap-4">
                      <XPCounter xp={details.xp} />
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-white shadow-md" style={{ background: gradients.cardPink }}>
                        <Icons.Gem size={18} fill="white" /> +{details.coins}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  onClick={() => { setActiveNode(null); setShowSparkles(false); setView(View.LESSON_PLAYER); }}
                  className="w-full text-white font-black py-5 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all text-lg uppercase tracking-wide flex items-center justify-center gap-3"
                  style={{ background: gradients.cardBlue }}
                >
                  {activeNode.status === 'completed' ? '🔄 Practice Again' : '🚀 Start Lesson'}
                </button>
              </div>
            </div>
          </>
        )}

        {/* Locked Modal */}
        {lockedNode && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setLockedNode(null)} />
            <div className="bg-white w-full max-w-sm p-8 rounded-3xl shadow-2xl relative animate-popIn text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.Lock size={40} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3">🔒 Level Locked</h3>
              <p className="text-gray-600 font-medium mb-6 leading-relaxed">
                Complete the previous lessons to unlock this level. Master the basics first to continue your journey! 💪
              </p>
              <button 
                onClick={() => setLockedNode(null)}
                className="w-full font-bold py-4 rounded-2xl transition-all hover:scale-105 active:scale-95 text-white shadow-lg"
                style={{ background: gradients.cardBlue }}
              >
                Got it! Let's go back
              </button>
            </div>
          </div>
        )}
      </GradientBackground>
    </div>
  );
};

export default Roadmap;
