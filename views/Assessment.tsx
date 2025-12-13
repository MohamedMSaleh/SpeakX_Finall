import React, { useState, useEffect } from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';

interface AssessmentTask {
    id: number;
    type: 'image' | 'story' | 'situation' | 'vocabulary' | 'grammar' | 'intonation';
    title: string;
    prompt: string;
    image?: string;
    duration: number; // seconds
}

interface AssessmentProps {
    onBack: () => void;
    onFinish: () => void;
    initialMode?: 'intro' | 'active' | 'report';
}

const Assessment: React.FC<AssessmentProps> = ({ onBack, onFinish, initialMode = 'intro' }) => {
  const [mode, setMode] = useState<'intro' | 'active' | 'report'>(initialMode);
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [activeError, setActiveError] = useState<string | null>(null);

  // Sync state if prop changes
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  // Mock Tasks
  const tasks: AssessmentTask[] = [
      { id: 1, type: 'image', title: 'Image Description', prompt: 'Describe what is happening in these images in detail.', duration: 60 },
      { id: 2, type: 'story', title: 'Story Retelling', prompt: 'Read the short story below, then retell it in your own words.', duration: 90 },
      { id: 3, type: 'intonation', title: 'Intonation Mimic', prompt: 'Listen to the audio and repeat exactly matching the tone.', duration: 30 },
  ];

  // Timer Logic
  useEffect(() => {
    let interval: any;
    if (isRecording && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRecording) {
      handleStop();
    }
    return () => clearInterval(interval);
  }, [isRecording, timeLeft]);

  const handleStart = () => {
      setIsRecording(true);
      setTimeLeft(tasks[activeTaskIndex].duration);
  };

  const handleStop = () => {
      setIsRecording(false);
      // Logic to move to next or finish
      if (activeTaskIndex < tasks.length - 1) {
          setActiveTaskIndex(prev => prev + 1);
          setTimeLeft(0); // Reset for next
      } else {
          setMode('report');
      }
  };

  const RenderActiveTask = () => {
      const task = tasks[activeTaskIndex];
      const progress = ((activeTaskIndex + 1) / tasks.length) * 100;

      return (
          <div className="flex flex-col h-full bg-white">
              {/* Header with Progress */}
              <div className="px-5 py-4 border-b border-gray-100 shrink-0">
                  <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Task {activeTaskIndex + 1} of {tasks.length}</span>
                      {/* X Button returns to start of assessment (intro) */}
                      <button onClick={() => setMode('intro')} className="text-gray-400 hover:text-gray-600"><Icons.X size={20} /></button>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${progress}%` }}></div>
                  </div>
              </div>

              {/* Task Content */}
              <div className="flex-1 overflow-y-auto p-5 pb-32 custom-scrollbar">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{task.title}</h2>
                  <p className="text-gray-600 mb-6">{task.prompt}</p>

                  {task.type === 'image' && (
                      <div className="grid grid-cols-2 gap-3 mb-6">
                          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 aspect-square">
                              <img src="https://picsum.photos/400/400?random=101" alt="Task 1" className="w-full h-full object-cover" />
                          </div>
                          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 aspect-square">
                              <img src="https://picsum.photos/400/400?random=102" alt="Task 2" className="w-full h-full object-cover" />
                          </div>
                          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 aspect-square">
                              <img src="https://picsum.photos/400/400?random=103" alt="Task 3" className="w-full h-full object-cover" />
                          </div>
                          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 aspect-square">
                              <img src="https://picsum.photos/400/400?random=104" alt="Task 4" className="w-full h-full object-cover" />
                          </div>
                      </div>
                  )}

                  {task.type === 'story' && (
                      <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 text-blue-900 leading-relaxed mb-6">
                          "Last summer, Sarah decided to plant a garden. She bought seeds for tomatoes, peppers, and basil. Every morning, she watered them carefully..."
                      </div>
                  )}

                  {task.type === 'intonation' && (
                      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex flex-col items-center gap-4 mb-6">
                           <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                               <Icons.Volume2 size={32} />
                           </div>
                           <button className="text-blue-600 font-bold text-sm bg-white px-4 py-2 rounded-full shadow-sm border border-blue-100">Play Reference Audio</button>
                      </div>
                  )}
              </div>

              {/* Footer Controls */}
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-5 pb-safe z-20 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                  {isRecording ? (
                      <div className="flex flex-col items-center gap-4">
                          <div className="text-2xl font-mono font-bold text-red-500 animate-pulse">
                              00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                          </div>
                          <button 
                            onClick={handleStop}
                            className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-200 hover:bg-red-600 transition-colors"
                          >
                              <div className="w-6 h-6 bg-white rounded-md"></div>
                          </button>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recording...</span>
                      </div>
                  ) : (
                      <div className="flex flex-col gap-3">
                        <button 
                            onClick={handleStart}
                            className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                        >
                             <Icons.Mic size={24} /> Start Recording
                        </button>
                      </div>
                  )}
              </div>
          </div>
      );
  };

  const RenderReport = () => {
      // Mock Data
      const scores = [
          { skill: 'Pronunciation', score: 72, level: 'B1' },
          { skill: 'Fluency', score: 80, level: 'B2' },
          { skill: 'Grammar', score: 68, level: 'B1' },
          { skill: 'Vocabulary', score: 75, level: 'B2' },
      ];

      return (
          <div className="h-full bg-gray-50 flex flex-col pb-safe">
              {/* Header Nav */}
              <div className="bg-white p-4 flex items-center justify-between shadow-sm sticky top-0 z-20 shrink-0">
                  <button onClick={onBack} className="p-1"><Icons.ChevronRight className="rotate-180 text-gray-600" size={24} /></button>
                  <h2 className="font-bold text-gray-900">Assessment Report</h2>
                  <div className="w-8"></div>
              </div>

              <div className="p-5 space-y-8 flex-1 overflow-y-auto pb-32 custom-scrollbar">
                  
                  {/* 1. Skill Summary Grid */}
                  <div className="grid grid-cols-2 gap-3">
                      {scores.map((s, i) => (
                          <div key={i} className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-1">
                              <span className="text-xs text-gray-500 font-medium">{s.skill}</span>
                              <div className="flex items-baseline gap-1">
                                  <span className="text-xl font-bold text-gray-900">{s.score}%</span>
                                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{s.level}</span>
                              </div>
                              <div className="h-1.5 w-full bg-gray-100 rounded-full mt-1 overflow-hidden">
                                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${s.score}%` }}></div>
                              </div>
                          </div>
                      ))}
                  </div>

                  {/* 2. Your Level + Top Errors */}
                  <div className="space-y-4">
                      {/* Level Box */}
                      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 z-0"></div>
                          <div className="relative z-10">
                              <div className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Overall Level</div>
                              <div className="text-5xl font-bold text-blue-600 mb-1">B2</div>
                              <div className="text-gray-900 font-bold text-lg">Upper Intermediate</div>
                              <div className="inline-block mt-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                                  Top 25%
                              </div>
                          </div>
                      </div>

                      {/* Top Errors Dropdown */}
                      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                          <div className="p-5 border-b border-gray-50 bg-red-50/50">
                              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                  <Icons.AlertCircle className="text-red-500" size={20} /> Top Errors
                              </h3>
                          </div>
                          <div className="divide-y divide-gray-50">
                              {[
                                  { type: 'Verbs', desc: 'Incorrect past tense usage', count: 4 },
                                  { type: 'Articles', desc: 'Missing "the" or "a"', count: 3 },
                                  { type: '/th/ Sound', desc: 'Pronounced as /z/', count: 5 }
                              ].map((err, i) => (
                                  <div key={i} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors group" onClick={() => setActiveError(activeError === i.toString() ? null : i.toString())}>
                                      <div className="flex justify-between items-center">
                                          <div>
                                              <span className="font-bold text-gray-800 block text-sm">{err.type}</span>
                                              <span className="text-xs text-gray-500">{err.desc}</span>
                                          </div>
                                          <div className="flex items-center gap-3">
                                              <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">{err.count}</span>
                                              <Icons.ChevronDown size={16} className={`text-gray-400 transition-transform ${activeError === i.toString() ? 'rotate-180' : ''}`} />
                                          </div>
                                      </div>
                                      {activeError === i.toString() && (
                                          <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600 bg-gray-50/50 -mx-4 -mb-4 p-4">
                                              <p className="mb-2 font-medium">Suggestion:</p>
                                              <p>Practice differentiating between voiced and unvoiced 'th'. Use the mirror technique to check tongue placement.</p>
                                              <button className="mt-3 text-blue-600 text-xs font-bold uppercase tracking-wide">Practice This Skill</button>
                                          </div>
                                      )}
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>

                  {/* 3. Assessment Tasks Summary */}
                   <div>
                      <h3 className="font-bold text-gray-900 mb-3 text-lg">Task Breakdown</h3>
                      <div className="space-y-3">
                          {tasks.map((task, i) => (
                              <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
                                          {task.type === 'image' ? <Icons.MessageSquare size={20} /> : <Icons.Mic size={20} />}
                                      </div>
                                      <div>
                                          <h4 className="font-bold text-gray-900 text-sm">{task.title}</h4>
                                          <span className="text-xs text-gray-500">Completed</span>
                                      </div>
                                  </div>
                                  <button className="text-blue-600 bg-blue-50 p-2 rounded-lg hover:bg-blue-100">
                                      <Icons.PlayCircle size={20} />
                                  </button>
                              </div>
                          ))}
                      </div>
                   </div>

                  {/* 4. Transcript & Audio */}
                  <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Icons.FileText size={20} className="text-blue-600" /> Transcript
                      </h3>
                      
                      {/* Player */}
                      <div className="bg-gray-900 rounded-2xl p-4 mb-4 text-white">
                          <div className="flex items-center gap-4 mb-2">
                              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900">
                                  <Icons.Play size={18} fill="currentColor" className="ml-0.5" />
                              </button>
                              <div className="flex-1">
                                  <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                                      <div className="h-full bg-blue-500 w-1/3"></div>
                                  </div>
                              </div>
                              <span className="text-xs font-mono">00:14 / 00:45</span>
                          </div>
                      </div>

                      <div className="text-gray-700 leading-relaxed text-sm p-2 bg-gray-50 rounded-xl border border-gray-100">
                          <span className="text-gray-400 text-xs font-mono block mb-1">00:00</span>
                          "In the image, I can see a group of people... um... <span className="bg-red-100 text-red-600 px-1 rounded decoration-wavy underline">standing</span> at the bus stop. They are waiting for the bus. The weather is <span className="bg-yellow-100 text-yellow-700 px-1 rounded">very rain</span>."
                      </div>
                  </div>

                  {/* 5. Rephrasing Recommendations */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-5 border border-green-100">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Icons.CheckSquare size={20} className="text-green-600" /> AI Recommendations
                      </h3>
                      
                      <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100 mb-3">
                          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Original</div>
                          <p className="text-red-500 text-sm line-through decoration-red-300 opacity-70 mb-3">"The weather is very rain."</p>
                          
                          <div className="h-px bg-gray-100 w-full mb-3"></div>

                          <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Improved</div>
                          <p className="text-gray-900 text-sm font-medium">"The weather is <span className="text-green-600 font-bold">rainy</span>."</p>
                          <p className="text-gray-500 text-xs mt-2 italic">Tip: Use the adjective 'rainy' to describe the weather, not the noun 'rain'.</p>
                      </div>
                  </div>

              </div>

              {/* 6. Footer Actions */}
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe z-30 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                  <button 
                    onClick={onFinish}
                    className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors mb-3"
                  >
                      Start Practice Plan
                  </button>
                  <div className="flex gap-3">
                      <button onClick={() => setMode('intro')} className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2">
                          <Icons.RotateCcw size={16} /> Reattempt
                      </button>
                  </div>
              </div>
          </div>
      );
  };

  const RenderIntro = () => (
      <div className="h-full bg-white p-6 flex flex-col items-center justify-center text-center overflow-y-auto custom-scrollbar">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-600 animate-pulse">
              <Icons.Target size={48} />
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">Full Skills Assessment</h1>
          <p className="text-gray-500 mb-10 max-w-xs text-sm leading-relaxed">We will evaluate your pronunciation, grammar, vocabulary, and fluency through 3 quick tasks.</p>
          
          <div className="w-full max-w-sm mb-10">
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4 text-center">Tasks Included</h3>
              <div className="space-y-4">
                  <div className="flex items-center gap-4 px-2 select-none cursor-default">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                          <Icons.MessageSquare size={22} />
                      </div>
                      <div className="text-left">
                          <div className="font-bold text-gray-900 text-sm">Image Description</div>
                          <div className="text-xs text-gray-500 font-medium">Describe details in a picture</div>
                      </div>
                  </div>
                  <div className="flex items-center gap-4 px-2 select-none cursor-default">
                      <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center shrink-0">
                          <Icons.BookOpen size={22} />
                      </div>
                      <div className="text-left">
                          <div className="font-bold text-gray-900 text-sm">Story Retelling</div>
                          <div className="text-xs text-gray-500 font-medium">Read and summarize a story</div>
                      </div>
                  </div>
                  <div className="flex items-center gap-4 px-2 select-none cursor-default">
                      <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
                          <Icons.Volume2 size={22} />
                      </div>
                      <div className="text-left">
                          <div className="font-bold text-gray-900 text-sm">Intonation Mimic</div>
                          <div className="text-xs text-gray-500 font-medium">Repeat sentences with emotion</div>
                      </div>
                  </div>
              </div>
          </div>

          <div className="w-full max-w-sm space-y-3 mt-auto">
            <button 
                onClick={() => setMode('active')}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-transform active:scale-95"
            >
                Start Assessment
            </button>
            <button onClick={onBack} className="text-gray-400 text-sm font-bold py-2 hover:text-gray-600 transition-colors">Cancel</button>
          </div>
      </div>
  );

  return (
    <>
        {mode === 'intro' && <RenderIntro />}
        {mode === 'active' && <RenderActiveTask />}
        {mode === 'report' && <RenderReport />}
    </>
  );
};

export default Assessment;