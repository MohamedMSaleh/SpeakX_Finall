import React, { useState, useEffect, useRef } from 'react';
import * as Icons from '../components/Icons';

interface AssessmentTask {
    id: number;
    type: 'introduction' | 'hobby' | 'reading';
    title: string;
    prompt: string;
    content?: string; // For reading task
    duration: number; // seconds limit
}

interface AssessmentProps {
    onBack: () => void;
    onFinish: () => void;
    initialMode?: 'intro' | 'active' | 'report';
}

const Assessment: React.FC<AssessmentProps> = ({ onBack, onFinish, initialMode = 'active' }) => {
  const [mode, setMode] = useState<'intro' | 'active' | 'report'>(initialMode === 'intro' ? 'active' : initialMode);
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);
  
  // Recording State
  const [recordingState, setRecordingState] = useState<'idle' | 'recording' | 'review'>('idle');
  const [timeLeft, setTimeLeft] = useState(0);
  const [activeError, setActiveError] = useState<string | null>(null);
  
  // Mic Permission State
  const [micPermission, setMicPermission] = useState<'unknown' | 'granted'>('unknown');

  // Sync state if prop changes, enforcing 'active' if 'intro' is passed
  useEffect(() => {
    setMode(initialMode === 'intro' ? 'active' : initialMode);
  }, [initialMode]);

  // Defined Tasks
  const tasks: AssessmentTask[] = [
      { 
          id: 1, 
          type: 'introduction', 
          title: 'Introduction', 
          prompt: 'Hi! I\'m SpeakX. Please introduce yourself, tell me about your background, and why you want to learn English.', 
          duration: 60 
      },
      { 
          id: 2, 
          type: 'hobby', 
          title: 'Favorite Hobby', 
          prompt: 'That\'s great! Now, could you tell me about your favorite hobby? Why do you enjoy it?', 
          duration: 90 
      },
      { 
          id: 3, 
          type: 'reading', 
          title: 'Read a Paragraph', 
          prompt: 'Finally, please read the text below aloud, clearly and naturally.', 
          content: "Technology has transformed the way we communicate, breaking down barriers and connecting people across the globe instantly. While it brings many benefits, it also challenges us to maintain authentic human connections in an increasingly digital world.",
          duration: 60 
      },
  ];

  // Reset recording state when task changes
  useEffect(() => {
      setRecordingState('idle');
      setTimeLeft(tasks[activeTaskIndex].duration);
  }, [activeTaskIndex]);

  // Timer Logic
  useEffect(() => {
    let interval: any;
    if (recordingState === 'recording' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && recordingState === 'recording') {
      handleStopRecording();
    }
    return () => clearInterval(interval);
  }, [recordingState, timeLeft]);

  const handleMicAccess = () => {
      // Simulate checking permission
      setTimeout(() => {
          setMicPermission('granted');
      }, 800);
  };

  const handleStartRecording = () => {
      setRecordingState('recording');
  };

  const handleStopRecording = () => {
      setRecordingState('review');
  };

  const handleDeleteRecording = () => {
      setRecordingState('idle');
      setTimeLeft(tasks[activeTaskIndex].duration);
  };

  const handleNextTask = () => {
      if (activeTaskIndex < tasks.length - 1) {
          setActiveTaskIndex(prev => prev + 1);
      } else {
          setMode('report');
      }
  };

  const RenderActiveTask = () => {
      const task = tasks[activeTaskIndex];
      const progress = ((activeTaskIndex + 1) / tasks.length) * 100;

      // Special Mic Check Screen for first task if permission not granted
      if (activeTaskIndex === 0 && micPermission === 'unknown') {
          return (
              <div className="flex flex-col h-full bg-white items-center justify-center p-8 text-center">
                  <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-8 relative">
                      <Icons.Mic size={48} className="text-blue-600" />
                      <div className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full border-4 border-white animate-pulse"></div>
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 mb-3">Let's check your mic</h2>
                  <p className="text-gray-500 mb-10 max-w-xs leading-relaxed">
                      We need access to your microphone to evaluate your speaking skills. Please tap 'Allow' when prompted.
                  </p>
                  <button 
                      onClick={handleMicAccess}
                      className="w-full max-w-sm bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-transform active:scale-95"
                  >
                      Enable Microphone
                  </button>
                  <button onClick={onBack} className="mt-6 text-gray-400 font-bold text-sm">Cancel</button>
              </div>
          );
      }

      return (
          <div className="flex flex-col h-full bg-white">
              {/* Header with Progress */}
              <div className="px-5 py-4 border-b border-gray-100 shrink-0">
                  <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Question {activeTaskIndex + 1} of {tasks.length}</span>
                      <button onClick={onBack} className="text-gray-400 hover:text-gray-600"><Icons.X size={20} /></button>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${progress}%` }}></div>
                  </div>
              </div>

              {/* Task Content */}
              <div className="flex-1 overflow-y-auto p-6 pb-40 custom-scrollbar flex flex-col items-center text-center">
                  
                  {/* Avatar & Question Design for Task 1 & 2 */}
                  {(task.type === 'introduction' || task.type === 'hobby') && (
                      <div className="flex flex-col items-center w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500 mt-10">
                          {/* Avatar removed as requested */}

                          {/* Question Speech Bubble */}
                          <div className="bg-gray-50 p-8 rounded-[32px] rounded-t-xl shadow-sm border border-gray-100 relative w-full transform transition-all">
                              <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                                  "{task.prompt}"
                              </h2>
                          </div>
                      </div>
                  )}

                  {/* Design for Reading Task (Question 3) */}
                  {task.type === 'reading' && (
                      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
                          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 mx-auto shadow-sm">
                              <Icons.BookOpen size={32} />
                          </div>
                          <h2 className="text-xl font-black text-gray-900 mb-2">{task.title}</h2>
                          <p className="text-gray-500 mb-6 text-sm">{task.prompt}</p>
                          
                          {task.content && (
                              <div className="bg-white p-6 rounded-3xl border-2 border-blue-100 text-left shadow-lg shadow-blue-50 relative overflow-hidden">
                                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                                  <p className="text-lg text-gray-800 leading-loose font-medium font-serif">
                                      {task.content}
                                  </p>
                              </div>
                          )}
                      </div>
                  )}

                  {/* Recording Visualizer State */}
                  {recordingState === 'recording' && (
                      <div className="my-8 flex items-center justify-center gap-1 h-12">
                          {[...Array(10)].map((_, i) => (
                              <div 
                                  key={i} 
                                  className="w-2 bg-red-500 rounded-full animate-[sound_1s_ease-in-out_infinite]"
                                  style={{ animationDuration: `${0.4 + Math.random() * 0.5}s` }}
                              ></div>
                          ))}
                      </div>
                  )}

                  {/* Review State */}
                  {recordingState === 'review' && (
                      <div className="mt-8 bg-green-50 px-6 py-4 rounded-2xl flex items-center gap-3 border border-green-100 w-full max-w-xs mx-auto animate-in zoom-in duration-300">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm shrink-0">
                              <Icons.Check size={20} />
                          </div>
                          <div className="text-left flex-1 min-w-0">
                              <div className="font-bold text-green-800 text-sm truncate">Recording Saved</div>
                              <div className="text-xs text-green-600">Ready to submit</div>
                          </div>
                          <button className="text-green-700 hover:text-green-900 p-2">
                              <Icons.PlayCircle size={24} />
                          </button>
                      </div>
                  )}
              </div>

              {/* Footer Controls */}
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-5 pb-safe z-20 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                  <div className="max-w-md mx-auto w-full">
                      
                      {recordingState === 'idle' && (
                          <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4">
                              <button 
                                  onClick={handleStartRecording}
                                  className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-transform active:scale-95 flex items-center justify-center gap-2 group"
                              >
                                  <div className="p-1 bg-blue-500 rounded-full group-hover:bg-blue-400 transition-colors">
                                    <Icons.Mic size={20} /> 
                                  </div>
                                  Tap to Answer
                              </button>
                          </div>
                      )}

                      {recordingState === 'recording' && (
                          <div className="flex flex-col items-center gap-4">
                              <div className="text-3xl font-mono font-black text-red-500 tabular-nums">
                                  00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                              </div>
                              <button 
                                onClick={handleStopRecording}
                                className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-200 hover:bg-red-600 transition-transform hover:scale-105 active:scale-95 ring-4 ring-red-100"
                              >
                                  <div className="w-8 h-8 bg-white rounded-lg"></div>
                              </button>
                              <span className="text-xs font-bold text-red-400 uppercase tracking-widest animate-pulse">Recording...</span>
                          </div>
                      )}

                      {recordingState === 'review' && (
                          <div className="flex gap-3">
                              <button 
                                  onClick={handleDeleteRecording}
                                  className="flex-1 bg-red-50 text-red-600 font-bold py-4 rounded-2xl border border-red-100 hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                              >
                                  <Icons.Trash2 size={20} /> Retake
                              </button>
                              <button 
                                  onClick={handleNextTask}
                                  className="flex-[2] bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                              >
                                  {activeTaskIndex < tasks.length - 1 ? 'Next Question' : 'Finish Assessment'} <Icons.ArrowRight size={20} />
                              </button>
                          </div>
                      )}
                  </div>
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
          { skill: 'Speak Relevance', score: 85, level: 'B2' },
      ];

      // Question Specific Data
      const questionReports = [
          {
              id: 1,
              title: "Introduction",
              transcript: "Hi, I am... um... very happy to be here. I'm a student at university.",
              original_snippet: "I am very happy",
              improved_snippet: "I'm delighted",
              tip: "Use stronger adjectives to show range. 'Delighted' or 'Thrilled' sounds more advanced."
          },
          {
              id: 2,
              title: "Favorite Hobby",
              transcript: "My favorite hobby is playing football. I play it with my friends every weekend.",
              original_snippet: "I play it with my friends",
              improved_snippet: "I play alongside my friends",
              tip: "Vary your prepositions. 'Alongside' adds a bit more sophistication."
          },
          {
              id: 3,
              title: "Reading",
              transcript: "Technology has transformed the way we communicate... breaking down barriers.",
              original_snippet: "breaking down barriers",
              improved_snippet: "breaking down barriers",
              tip: "Great pronunciation here! You handled the linking 'r' perfectly."
          }
      ];

      const [selectedQuestionIdx, setSelectedQuestionIdx] = useState(0);
      const currentReport = questionReports[selectedQuestionIdx];

      return (
          <div className="h-full bg-gray-50 flex flex-col pb-safe">
              {/* Header Nav */}
              <div className="bg-white p-4 flex items-center justify-between shadow-sm sticky top-0 z-20 shrink-0">
                  <button onClick={onBack} className="p-1"><Icons.ChevronRight className="rotate-180 text-gray-600" size={24} /></button>
                  <h2 className="font-bold text-gray-900">Assessment Report</h2>
                  <div className="w-8"></div>
              </div>

              <div className="p-5 space-y-8 flex-1 overflow-y-auto pb-8 custom-scrollbar">
                  
                  {/* 1. Skill Summary Grid */}
                  <div className="grid grid-cols-2 gap-3">
                      {scores.map((s, i) => (
                          <div key={i} className={`bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-1 ${s.skill === 'Speak Relevance' ? 'col-span-2' : ''}`}>
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

                  {/* 2. Your Level Box */}
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

                  {/* 3. Question Selector Tabs - Renamed to Q1, Q2, Q3 */}
                  <div>
                      <h3 className="font-bold text-gray-900 mb-3 text-lg">Question Analysis</h3>
                      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                          {questionReports.map((q, index) => (
                              <button 
                                key={q.id}
                                onClick={() => setSelectedQuestionIdx(index)}
                                className={`px-6 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                                    selectedQuestionIdx === index 
                                    ? 'bg-blue-600 text-white shadow-md' 
                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                              >
                                  Q{q.id}
                              </button>
                          ))}
                      </div>
                  </div>

                  {/* 4. Transcript & Audio (Dynamic) */}
                  <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 animate-in fade-in duration-300">
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

                      <div className="text-gray-700 leading-relaxed text-sm p-3 bg-gray-50 rounded-xl border border-gray-100 italic">
                          "{currentReport.transcript}"
                      </div>
                  </div>

                  {/* 5. Rephrasing Recommendations (Dynamic) */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-5 border border-green-100 animate-in fade-in duration-300">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Icons.CheckSquare size={20} className="text-green-600" /> AI Recommendations
                      </h3>
                      
                      <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100 mb-3">
                          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Original</div>
                          <p className="text-red-500 text-sm line-through decoration-red-300 opacity-70 mb-3">"{currentReport.original_snippet}"</p>
                          
                          <div className="h-px bg-gray-100 w-full mb-3"></div>

                          <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Improved</div>
                          <p className="text-gray-900 text-sm font-medium">"{currentReport.improved_snippet}"</p>
                          <p className="text-gray-500 text-xs mt-2 italic">Tip: {currentReport.tip}</p>
                      </div>
                  </div>

              </div>
          </div>
      );
  };

  return (
    <>
        {mode === 'active' && <RenderActiveTask />}
        {mode === 'report' && <RenderReport />}
    </>
  );
};

export default Assessment;