
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
  levels: LevelNode[];
}

const LearningMap: React.FC<{ onBack: () => void, setView: (view: View) => void }> = ({ onBack, setView }) => {
  // --- Data Definition ---
  const units: Unit[] = [
    {
      id: 3,
      title: "Unit 3: Daily Conversations",
      description: "Order food, ask for directions, and chat.",
      color: "bg-teal-500",
      levels: [
        { id: 301, type: 'lesson', status: 'active', xOffset: 0 },
        { id: 302, type: 'book', status: 'locked', xOffset: -1 },
        { id: 303, type: 'lesson', status: 'locked', xOffset: -1 },
        { id: 304, type: 'chest', status: 'locked', xOffset: 0 },
        { id: 305, type: 'lesson', status: 'locked', xOffset: 1 },
        { id: 306, type: 'trophy', status: 'locked', xOffset: 0 },
      ]
    },
    {
      id: 2,
      title: "Unit 2: Basics & Phrases",
      description: "Introduce yourself and use common phrases.",
      color: "bg-green-500",
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
      id: 1,
      title: "Unit 1: Foundations",
      description: "Learn the alphabet and basic sounds.",
      color: "bg-purple-500",
      levels: [
        { id: 101, type: 'lesson', status: 'completed', xOffset: 0 },
        { id: 102, type: 'lesson', status: 'completed', xOffset: -1 },
        { id: 103, type: 'chest', status: 'completed', xOffset: 0 },
        { id: 104, type: 'lesson', status: 'completed', xOffset: 1 },
        { id: 105, type: 'trophy', status: 'completed', xOffset: 0 },
      ]
    },
  ];

  // --- Helpers for Styling ---
  const getNodeColor = (status: NodeStatus, unitColor: string) => {
    if (status === 'locked') return 'bg-gray-200 border-gray-300 text-gray-400';
    if (status === 'completed') return 'bg-yellow-400 border-yellow-600 text-white';
    // Active uses unit color
    return `${unitColor} border-black/20 text-white`; 
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
  // We need to calculate the SVG path that connects these nodes.
  // We'll treat the container as a fixed width grid.
  const ROW_HEIGHT = 100;
  const CENTER_X = 50; // Percent
  const OFFSET_STEP = 25; // Percent deviation from center

  const renderPath = (levels: LevelNode[]) => {
    let pathD = "";
    
    levels.forEach((level, index) => {
      const isLast = index === levels.length - 1;
      if (isLast) return;

      const currentX = CENTER_X + (level.xOffset * OFFSET_STEP);
      const currentY = (index * ROW_HEIGHT) + 50; // +50 to center in the row
      
      const nextLevel = levels[index + 1];
      const nextX = CENTER_X + (nextLevel.xOffset * OFFSET_STEP);
      const nextY = ((index + 1) * ROW_HEIGHT) + 50;

      // Calculate control points for a smooth Bezier S-curve
      const cp1X = currentX; 
      const cp1Y = currentY + 50;
      const cp2X = nextX;
      const cp2Y = nextY - 50;

      if (index === 0) {
        pathD += `M ${currentX} ${currentY} `;
      }
      pathD += `C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${nextX} ${nextY} `;
    });

    return (
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" style={{ height: levels.length * ROW_HEIGHT }}>
        <path d={pathD} stroke="#e5e7eb" strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d={pathD} stroke="#d1d5db" strokeWidth="12" fill="none" strokeDasharray="12 12" strokeLinecap="round" className="opacity-50" />
      </svg>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 1. Sticky Top Bar */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200 p-3 z-40 sticky top-0 flex justify-between items-center shadow-sm">
         <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-md bg-flag-us bg-cover border border-gray-200 overflow-hidden relative">
                {/* Simplified US Flag representation for icon */}
                <div className="absolute inset-0 bg-blue-900"></div>
                <div className="absolute top-0 right-0 bottom-0 left-3 bg-red-600"></div>
                <div className="absolute top-1 right-0 bottom-1 left-3 bg-white"></div>
                <div className="absolute top-2 right-0 bottom-2 left-3 bg-red-600"></div>
             </div>
             <span className="font-bold text-gray-600 text-sm">English Course</span>
         </div>
         
         <div className="flex gap-3">
             <div className="flex items-center gap-1">
                 <Icons.Flame className="text-orange-500 fill-orange-500" size={20} />
                 <span className="font-bold text-orange-500 text-sm">12</span>
             </div>
             <div className="flex items-center gap-1">
                 <Icons.Gem className="text-blue-400 fill-blue-400" size={20} />
                 <span className="font-bold text-blue-400 text-sm">1250</span>
             </div>
         </div>
      </div>

      {/* 2. Scrollable Map Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pb-24 relative bg-gray-50">
          
          {units.map((unit) => (
            <div key={unit.id} className="relative mb-6">
                
                {/* Unit Header */}
                <div className={`${unit.color} text-white p-4 mb-8 sticky top-14 z-30 shadow-md`}>
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="font-bold text-lg leading-tight">{unit.title}</h2>
                            <p className="text-white/80 text-xs mt-1">{unit.description}</p>
                        </div>
                        <button className="bg-white/20 p-2 rounded-xl hover:bg-white/30 transition-colors">
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
                            ? `${unit.color} border-black/20 text-white`
                            : getNodeColor(level.status, unit.color);

                        return (
                            <div 
                                key={level.id} 
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
                                style={{ left: `${leftPos}%`, top: `${topPos}px` }}
                            >
                                {/* Floating Avatar for Active Level */}
                                {isNodeActive && (
                                    <div className="absolute -top-16 z-20 animate-bounce">
                                        <div className="bg-white px-3 py-1 rounded-xl shadow-md border border-gray-100 mb-1 whitespace-nowrap">
                                            <span className="text-xs font-bold text-blue-600">START!</span>
                                            <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-gray-100 transform rotate-45"></div>
                                        </div>
                                        <Icons.Cat size={48} className="text-orange-500 fill-current drop-shadow-lg" />
                                    </div>
                                )}

                                {/* The Button Node */}
                                <button 
                                    onClick={() => isNodeActive ? setView(View.PRACTICE_SESSION) : null}
                                    className={`
                                        w-20 h-20 rounded-full flex items-center justify-center 
                                        border-b-[6px] active:border-b-0 active:translate-y-[6px] transition-all
                                        shadow-lg relative group
                                        ${buttonColorClass}
                                    `}
                                >
                                    {/* Inner ring highlight */}
                                    <div className="absolute inset-0 rounded-full border-[3px] border-white/20"></div>
                                    
                                    {/* Icon */}
                                    <div className="relative z-10">
                                        {getNodeIcon(level.type, level.type === 'trophy' ? 32 : 28)}
                                    </div>

                                    {/* Completion Checkmark Overlay */}
                                    {level.status === 'completed' && (
                                        <div className="absolute -bottom-1 -right-1 bg-white text-yellow-500 rounded-full p-1 shadow-sm border border-gray-100">
                                            <div className="bg-yellow-400 rounded-full w-5 h-5 flex items-center justify-center">
                                                <Icons.Check size={14} className="text-white stroke-[3]" />
                                            </div>
                                        </div>
                                    )}

                                    {/* Stars for completed lessons */}
                                    {level.status === 'completed' && level.type !== 'chest' && (
                                        <div className="absolute -top-8 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Icons.Star size={12} className="text-yellow-400 fill-current" />
                                            <Icons.Star size={16} className="text-yellow-400 fill-current -mt-2" />
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

      {/* 3. Floating Action Button (Review) */}
      <div className="fixed bottom-24 right-4 z-40">
          <button className="bg-white p-3 rounded-2xl shadow-xl border-2 border-gray-100 hover:scale-105 transition-transform group">
              <Icons.Dumbbell size={24} className="text-blue-600 group-hover:rotate-12 transition-transform" />
          </button>
      </div>
    </div>
  );
};

export default LearningMap;
