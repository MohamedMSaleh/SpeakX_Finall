
import React, { useState } from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';

const Roadmap: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<'plan' | 'career'>('plan');
  const [selectedWeek, setSelectedWeek] = useState(1);
  
  const weeks = [
    { id: 1, title: 'Foundation', status: 'current', progress: 65 },
    { id: 2, title: 'Conversation', status: 'locked', progress: 0 },
    { id: 3, title: 'Confidence', status: 'locked', progress: 0 },
    { id: 4, title: 'Fluency', status: 'locked', progress: 0 },
  ];

  const tasks = [
    { 
      id: 1, 
      title: 'Ordering Coffee', 
      subtitle: 'Interactive Roleplay',
      time: '5 min', 
      type: 'speaking', 
      status: 'completed', 
      xp: 50,
      skill: 'Fluency',
      action: () => setView(View.PRACTICE_SESSION) 
    },
    { 
      id: 2, 
      title: 'The Future of AI', 
      subtitle: 'Reading Comprehension',
      time: '10 min', 
      type: 'reading', 
      status: 'pending', 
      xp: 100,
      skill: 'Vocabulary',
      action: () => {} 
    },
    { 
      id: 3, 
      title: 'Past Tense Verbs', 
      subtitle: 'Grammar Quiz',
      time: '15 Qs', 
      type: 'quiz', 
      status: 'pending', 
      xp: 75,
      skill: 'Grammar',
      action: () => {} 
    },
    { 
      id: 4, 
      title: 'Job Interview', 
      subtitle: 'AI Simulation',
      time: '15 min', 
      type: 'ai', 
      status: 'pending', 
      xp: 200,
      skill: 'Confidence',
      action: () => setView(View.CHAT_SESSION) 
    },
  ];

  const renderPlan = () => (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      
      {/* Enhanced Map Thumbnail */}
      <div 
        onClick={() => setView(View.LEARNING_MAP)}
        className="group relative h-40 w-full rounded-[32px] overflow-hidden shadow-lg cursor-pointer transition-transform hover:scale-[1.02]"
      >
         {/* Rich Gradient Background */}
         <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-800"></div>
         
         {/* Decorative SVG Patterns */}
         <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
         <svg className="absolute bottom-0 left-0 w-full h-24 text-white/10" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
         </svg>

         {/* Content Container */}
         <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
             <div className="flex justify-between items-start">
                 <div>
                     <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/20 mb-2">
                        CURRENT LEVEL
                     </span>
                     <h3 className="text-2xl font-bold text-white tracking-tight">Unit 1: Foundations</h3>
                 </div>
                 
                 {/* Progress Ring */}
                 <div className="w-12 h-12 rounded-full border-4 border-white/30 flex items-center justify-center text-white font-bold text-sm bg-white/10 backdrop-blur-md">
                    75%
                 </div>
             </div>

             <div className="flex items-center justify-between">
                 <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-indigo-600 bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                            <Icons.CheckCircle size={16} />
                        </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-indigo-600 bg-yellow-400 flex items-center justify-center text-indigo-900 shadow-sm z-10">
                        <Icons.MapPin size={16} fill="currentColor" />
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-full font-bold text-xs shadow-lg shadow-indigo-900/20 group-hover:bg-indigo-50 transition-colors">
                     Continue Journey <Icons.ArrowRight size={14} />
                 </div>
             </div>
         </div>
      </div>

      {/* Week Timeline */}
      <div className="flex items-center justify-between bg-white p-4 rounded-3xl border border-gray-100 shadow-sm overflow-x-auto hide-scrollbar gap-4">
        {weeks.map((w) => (
          <button
            key={w.id}
            onClick={() => setSelectedWeek(w.id)}
            className={`flex flex-col items-center min-w-[80px] transition-all ${
              selectedWeek === w.id ? 'opacity-100 scale-105' : 'opacity-50 hover:opacity-80'
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold mb-2 border-4 transition-colors ${
              selectedWeek === w.id 
                ? 'border-blue-100 bg-blue-600 text-white shadow-lg shadow-blue-200' 
                : 'border-gray-50 bg-gray-100 text-gray-500'
            }`}>
              W{w.id}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wide ${selectedWeek === w.id ? 'text-blue-600' : 'text-gray-400'}`}>
              {w.title}
            </span>
          </button>
        ))}
      </div>

      {/* Progress Hero */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 text-white shadow-xl shadow-blue-200 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
         <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-10 -mb-10 blur-xl"></div>
         
         <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-1">Career Readiness</div>
                  <h3 className="text-xl font-bold">Customer Service Agent</h3>
                </div>
                <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                   <span className="text-xs font-bold">Week {selectedWeek}</span>
                </div>
            </div>

            <div className="space-y-2">
               <div className="flex justify-between text-xs font-medium text-blue-100">
                  <span>Score</span>
                  <span>65%</span>
               </div>
               <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                  <div className="h-full w-[65%] bg-yellow-400 rounded-full shadow-sm"></div>
               </div>
            </div>
         </div>
      </div>

      {/* Task List */}
      <div>
        <div className="flex items-center justify-between mb-4">
           <h3 className="font-bold text-gray-900 text-lg">Today's Agenda</h3>
           <span className="text-xs text-gray-500 font-medium">Oct 26</span>
        </div>
        
        <div className="space-y-3">
          {tasks.map((task) => (
            <div 
              key={task.id}
              onClick={task.action}
              className={`group relative bg-white p-4 rounded-3xl border transition-all hover:shadow-md cursor-pointer ${
                task.status === 'completed' ? 'border-gray-100 opacity-80' : 'border-gray-200'
              }`}
            >
               {/* Left Accent Bar */}
               <div className={`absolute left-0 top-6 bottom-6 w-1 rounded-r-full transition-colors ${
                  task.type === 'speaking' ? 'bg-blue-500' : 
                  task.type === 'reading' ? 'bg-teal-500' : 
                  task.type === 'ai' ? 'bg-purple-500' : 'bg-orange-500'
               }`}></div>

               <div className="flex items-center gap-4 pl-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                      task.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-gray-50 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600'
                  }`}>
                      {task.status === 'completed' ? <Icons.CheckCircle size={24} className="fill-current" /> : (
                        <>
                          {task.type === 'speaking' && <Icons.Mic size={20}/>}
                          {task.type === 'reading' && <Icons.BookOpen size={20}/>}
                          {task.type === 'quiz' && <Icons.HelpCircle size={20}/>}
                          {task.type === 'ai' && <Icons.MessageSquare size={20}/>}
                        </>
                      )}
                  </div>

                  <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                         <h4 className={`font-bold text-sm ${task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>{task.title}</h4>
                         {task.status !== 'completed' && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded border border-gray-200 font-medium">{task.skill}</span>
                         )}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                         <span>{task.subtitle}</span>
                         <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                         <span>{task.time}</span>
                      </div>
                  </div>

                  {task.status !== 'completed' ? (
                    <button className="bg-gray-900 text-white p-2.5 rounded-xl shadow-lg shadow-gray-200 group-hover:scale-105 transition-transform">
                       <Icons.Play size={16} fill="white" />
                    </button>
                  ) : (
                    <div className="text-xs font-bold text-yellow-500 flex items-center gap-1">
                       <Icons.Zap size={12} className="fill-current" /> +{task.xp}
                    </div>
                  )}
               </div>
            </div>
          ))}

          {/* Tutor Checkin Card */}
          <div onClick={() => setView(View.TUTOR_BOOKING)} className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-3xl border border-purple-100 flex items-center justify-between cursor-pointer hover:shadow-md transition-all">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-purple-600 shadow-sm">
                   <Icons.Calendar size={20} />
                </div>
                <div>
                   <h4 className="font-bold text-gray-900 text-sm">Weekly Tutor Check-in</h4>
                   <p className="text-xs text-purple-600 font-medium">Validate your progress</p>
                </div>
             </div>
             <Icons.ChevronRight className="text-purple-300" />
          </div>
        </div>
      </div>
      
      {/* Adaptive Tip */}
      <div className="bg-yellow-50 border border-yellow-100 p-5 rounded-3xl flex gap-4 items-start">
          <div className="mt-1">
             <Icons.Zap size={20} className="text-yellow-500 fill-current" />
          </div>
          <div>
             <h4 className="font-bold text-gray-900 text-sm mb-1">Adaptive Tip</h4>
             <p className="text-xs text-gray-700 leading-relaxed">
                 You've been struggling with <strong>Past Tense</strong> verbs. We've added a quick quiz to your plan today to help you practice.
             </p>
          </div>
          <button className="text-gray-400 hover:text-gray-600"><Icons.X size={16}/></button>
      </div>
    </div>
  );

  const renderCareer = () => (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
        {/* Career Header */}
        <div className="bg-gray-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                        <Icons.Briefcase size={20} className="text-blue-400" />
                    </div>
                    <span className="font-bold tracking-wide text-sm text-gray-300">TARGET ROLE</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">Customer Service Agent</h2>
                <p className="text-gray-400 text-sm mb-6">Tech Solutions Inc.</p>

                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Role Match</span>
                        <span className="font-bold text-green-400">85% Ready</span>
                    </div>
                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full w-[85%] bg-gradient-to-r from-green-500 to-green-400 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Incoming Offers */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Icons.Award className="text-yellow-500" size={20} /> 
                Incoming Offers
            </h3>
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h4 className="font-bold text-gray-900">Innovate Corp.</h4>
                        <p className="text-xs text-gray-500">Account Manager</p>
                    </div>
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full">New</span>
                </div>
                <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-green-600 text-white py-2 rounded-xl text-xs font-bold shadow-lg shadow-green-200">Accept</button>
                    <button className="flex-1 bg-white border border-gray-200 text-gray-600 py-2 rounded-xl text-xs font-bold">Decline</button>
                </div>
            </div>
        </div>

        {/* Skill Gaps */}
        <div>
            <h3 className="font-bold text-gray-900 mb-4">Skill Readiness</h3>
            <div className="space-y-4">
                <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-gray-700">Pronunciation</span>
                        <span className="text-xs font-bold text-blue-600">High</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-blue-500 rounded-full"></div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-gray-700">Negotiation</span>
                        <span className="text-xs font-bold text-yellow-600">Needs Work</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-yellow-500 rounded-full"></div>
                    </div>
                    <button 
                        onClick={() => setView(View.PRACTICE_SESSION)}
                        className="w-full mt-3 py-2 text-xs font-bold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100"
                    >
                        Practice Negotiation →
                    </button>
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto p-5 space-y-6 pb-24 bg-gray-50 custom-scrollbar">
      {/* Top Navigation */}
      <div className="flex items-center gap-2 mb-2">
          <button 
            onClick={() => setActiveTab('plan')}
            className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeTab === 'plan' 
                ? 'bg-white text-gray-900 shadow-sm border border-gray-100' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-white/50'
            }`}
          >
            My Plan
          </button>
          <button 
            onClick={() => setActiveTab('career')}
            className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeTab === 'career' 
                ? 'bg-white text-gray-900 shadow-sm border border-gray-100' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-white/50'
            }`}
          >
            Career Hub
          </button>
      </div>

      {activeTab === 'plan' ? renderPlan() : renderCareer()}
    </div>
  );
};

export default Roadmap;
