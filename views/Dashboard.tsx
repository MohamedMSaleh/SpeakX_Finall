
import React from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';

const Dashboard: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  return (
    <div className="h-full overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6 pb-24 md:pb-6 custom-scrollbar">
      
      {/* 1. Top Stats Row (Overall & Growth) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Overall Score */}
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden h-32">
            <div>
              <h3 className="text-gray-500 font-bold text-xs mb-1 uppercase tracking-wider">Overall</h3>
              <div className="text-2xl font-black text-gray-900">Excellent</div>
            </div>
          </div>

          {/* Weekly Change */}
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between h-32">
            <h3 className="text-gray-500 font-bold text-xs mb-1 uppercase tracking-wider">Growth</h3>
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-1.5 rounded-full">
                 <Icons.TrendingUp size={16} className="text-green-600" />
              </div>
              <span className="text-2xl font-black text-gray-900">+2%</span>
            </div>
          </div>

          {/* Lessons Done */}
          <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-32">
               <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-2">
                   <Icons.CheckCircle size={20} />
               </div>
               <div>
                   <div className="text-xl font-bold text-gray-900">12</div>
                   <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Lessons Done</div>
               </div>
          </div>

          {/* Practice Time */}
          <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-32">
               <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-2">
                   <Icons.Clock size={20} />
               </div>
               <div>
                   <div className="text-xl font-bold text-gray-900">4.5h</div>
                   <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Practice Time</div>
               </div>
          </div>
      </div>

      {/* 2. Assessment Banner */}
      <div className="w-full bg-gradient-to-r from-blue-700 to-indigo-600 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between shadow-xl shadow-blue-200 relative overflow-hidden gap-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
        
        <div className="flex items-center gap-5 text-white relative z-10">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 shrink-0">
            <Icons.Target className="text-white" size={28} />
          </div>
          <div>
            <div className="font-bold text-xl md:text-2xl leading-tight">Assess your level</div>
            <div className="text-sm text-blue-100 mt-1 font-medium">Get a personalized plan based on your skills.</div>
          </div>
        </div>
        <button 
            className="relative z-10 bg-white text-blue-700 px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:bg-blue-50 transition-colors whitespace-nowrap w-full sm:w-auto" 
            onClick={() => setView(View.ASSESSMENT_HISTORY)}
        >
          Start Assessment
        </button>
      </div>

      {/* 3. Practice Areas */}
      <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Practice Areas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Vocabulary', sub: 'Expand words', icon: Icons.BookOpen, color: 'bg-blue-50 text-blue-600', action: () => setView(View.VOCAB_PRACTICE) },
              { title: 'Grammar', sub: 'Master rules', icon: Icons.CheckCircle, color: 'bg-green-50 text-green-600', action: () => setView(View.GRAMMAR_PRACTICE) },
              { title: 'Pronunciation', sub: 'Perfect accent', icon: Icons.Mic, color: 'bg-purple-50 text-purple-600', action: () => setView(View.PRONUNCIATION_PRACTICE) },
              { title: 'Fluency', sub: 'Speak visually', icon: Icons.MessageSquare, color: 'bg-orange-50 text-orange-600', action: () => setView(View.FLUENCY_PRACTICE) },
            ].map((item, idx) => (
              <button 
                key={idx} 
                onClick={item.action}
                className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm text-left hover:shadow-md transition-all active:scale-95 group flex flex-col justify-between h-40"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon size={24} />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm md:text-base mb-0.5">{item.title}</div>
                  <div className="text-xs text-gray-500 font-medium">{item.sub}</div>
                </div>
              </button>
            ))}
          </div>
      </div>

    </div>
  );
};

export default Dashboard;
