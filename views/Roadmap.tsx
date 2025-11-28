
import React, { useState } from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';

const Roadmap: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<'plan' | 'career'>('plan');

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
      
      {/* Daily Greeting & Streak */}
      <div className="flex justify-between items-center px-1">
          <div>
              <h2 className="text-2xl font-bold text-gray-900">My Plan</h2>
              <p className="text-gray-500 text-sm">Keep up the momentum!</p>
          </div>
          <div className="flex items-center gap-2 bg-orange-100 px-3 py-1.5 rounded-full shadow-sm">
              <Icons.Flame className="text-orange-500 fill-orange-500" size={18} />
              <span className="font-bold text-orange-700 text-sm">12 Day Streak</span>
          </div>
      </div>

      {/* Weekly Stats Overview (Moved Up) */}
      <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-3xl border border-green-100 flex items-center gap-4">
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm shrink-0">
                   <Icons.CheckCircle size={22} />
               </div>
               <div>
                   <div className="text-2xl font-bold text-gray-900">12</div>
                   <div className="text-xs text-green-700 font-bold">Lessons Done</div>
               </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-3xl border border-purple-100 flex items-center gap-4">
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-purple-600 shadow-sm shrink-0">
                   <Icons.Clock size={22} />
               </div>
               <div>
                   <div className="text-2xl font-bold text-gray-900">4.5h</div>
                   <div className="text-xs text-purple-700 font-bold">Practice Time</div>
               </div>
          </div>
      </div>

      {/* Current Unit / Main Call to Action */}
      <div 
        onClick={() => setView(View.LEARNING_MAP)}
        className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 relative overflow-hidden group cursor-pointer hover:shadow-md transition-all"
      >
          {/* Decorative Circle */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
          
          <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                      <Icons.Map size={24} />
                  </div>
                  <div className="bg-blue-50 text-blue-700 font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-blue-100">
                      Current Unit
                  </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-1">Unit 3: Daily Conversations</h3>
              <p className="text-gray-500 text-sm mb-6">Master common phrases for everyday interactions and ordering food.</p>
              
              {/* Progress Bar */}
              <div className="mb-6">
                  <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-gray-400">Unit Progress</span>
                      <span className="text-blue-600">45%</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full w-[45%] bg-blue-600 rounded-full"></div>
                  </div>
              </div>

              <button className="w-full py-3.5 bg-gray-900 text-white rounded-2xl font-bold text-sm shadow-lg hover:bg-black transition-colors flex items-center justify-center gap-2">
                  Continue Path <Icons.ArrowRight size={18} />
              </button>
          </div>
      </div>

      {/* Task List - Preserved as requested */}
      <div>
        <div className="flex items-center justify-between mb-4 mt-2">
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
        </div>
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
