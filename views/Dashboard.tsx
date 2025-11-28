
import React, { useState } from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';
import { PieChart, Pie, Cell } from 'recharts';

const Dashboard: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const fluencyData = [
    { name: 'Completed', value: 75 },
    { name: 'Remaining', value: 25 },
  ];
  const COLORS = ['#2563EB', '#E5E7EB'];

  // Mock Calendar Data
  const calendarDays = Array.from({ length: 30 }, (_, i) => {
      const day = i + 1;
      const isPracticeDay = [1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 17, 20, 22].includes(day);
      return { day, isPracticeDay };
  });

  return (
    <div className="h-full overflow-y-auto p-5 space-y-6 pb-24 custom-scrollbar">
      
      {/* 1. Top Stats Row (Fluency & Growth) */}
      <div className="flex gap-3">
          {/* Overall Fluency */}
          <div className="flex-1 bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden">
            <div>
              <h3 className="text-gray-500 font-bold text-xs mb-1 uppercase tracking-wider">Fluency</h3>
              <div className="text-2xl font-black text-gray-900">Excellent</div>
            </div>
            <div className="absolute -bottom-4 -right-4">
               <div className="relative w-20 h-20 flex items-center justify-center opacity-20">
                  <PieChart width={80} height={80}>
                    <Pie data={fluencyData} innerRadius={30} outerRadius={40} startAngle={90} endAngle={-270} dataKey="value" stroke="none">
                      {fluencyData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                  </PieChart>
               </div>
            </div>
          </div>

          {/* Weekly Change */}
          <div className="flex-1 bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between">
            <h3 className="text-gray-500 font-bold text-xs mb-1 uppercase tracking-wider">Growth</h3>
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-1.5 rounded-full">
                 <Icons.TrendingUp size={16} className="text-green-600" />
              </div>
              <span className="text-2xl font-black text-gray-900">+2%</span>
            </div>
          </div>
      </div>

      {/* 2. Skill Assessment (Reordered) */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-600 rounded-3xl p-5 flex items-center justify-between shadow-xl shadow-blue-200 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
        
        <div className="flex items-center gap-4 text-white relative z-10">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
            <Icons.Target className="text-white" size={24} />
          </div>
          <div>
            <div className="font-bold text-lg leading-tight">Skill Assessment</div>
            <div className="text-xs text-blue-100 mt-1 font-medium">Test your level & get a plan</div>
          </div>
        </div>
        <button 
            className="relative z-10 bg-white text-blue-700 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-blue-50 transition-colors" 
            onClick={() => setView(View.ASSESSMENT_HISTORY)}
        >
          Start
        </button>
      </div>

      {/* 3. Stats Overview (Replaces Daily Goal) */}
      <div className="grid grid-cols-2 gap-3">
          {/* Streak Card - Clickable */}
          <div 
            onClick={() => setShowCalendar(true)}
            className="col-span-2 bg-orange-50 p-4 rounded-3xl border border-orange-100 flex items-center justify-between cursor-pointer hover:bg-orange-100 transition-colors"
          >
               <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm shrink-0">
                       <Icons.Flame size={24} fill="currentColor" />
                   </div>
                   <div>
                       <div className="text-2xl font-black text-gray-900">12</div>
                       <div className="text-xs text-orange-700 font-bold uppercase tracking-wide">Day Streak</div>
                   </div>
               </div>
               <Icons.ChevronRight className="text-orange-300" size={20} />
          </div>

          <div className="bg-green-50 p-4 rounded-3xl border border-green-100 flex flex-col justify-between">
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm mb-2">
                   <Icons.CheckCircle size={20} />
               </div>
               <div>
                   <div className="text-xl font-bold text-gray-900">12</div>
                   <div className="text-[10px] text-green-700 font-bold uppercase tracking-wide">Lessons Done</div>
               </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-3xl border border-purple-100 flex flex-col justify-between">
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-purple-600 shadow-sm mb-2">
                   <Icons.Clock size={20} />
               </div>
               <div>
                   <div className="text-xl font-bold text-gray-900">4.5h</div>
                   <div className="text-[10px] text-purple-700 font-bold uppercase tracking-wide">Practice Time</div>
               </div>
          </div>
      </div>

      {/* 4. Practice Grid */}
      <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Practice Areas</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: 'Vocabulary', sub: 'Expand words', icon: Icons.BookOpen, color: 'bg-blue-50 text-blue-600', action: () => setView(View.VOCAB_PRACTICE) },
              { title: 'Grammar', sub: 'Master rules', icon: Icons.CheckCircle, color: 'bg-green-50 text-green-600', action: () => setView(View.GRAMMAR_PRACTICE) },
              { title: 'Pronunciation', sub: 'Perfect accent', icon: Icons.Mic, color: 'bg-purple-50 text-purple-600', action: () => setView(View.PRONUNCIATION_PRACTICE) },
              { title: 'Fluency', sub: 'Speak visually', icon: Icons.MessageSquare, color: 'bg-orange-50 text-orange-600', action: () => setView(View.FLUENCY_PRACTICE) },
            ].map((item, idx) => (
              <button 
                key={idx} 
                onClick={item.action}
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-left hover:shadow-md transition-all active:scale-95 group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon size={20} />
                </div>
                <div className="font-bold text-gray-900 text-sm mb-0.5">{item.title}</div>
                <div className="text-[10px] text-gray-500 font-medium">{item.sub}</div>
              </button>
            ))}
          </div>
      </div>

      {/* 5. Word of the Day */}
      <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Daily Boost</h2>
          <div className="bg-teal-50 rounded-3xl p-5 border border-teal-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-sm shrink-0">
                  <Icons.Lightbulb size={24} />
              </div>
              <div>
                  <div className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">Word of the Day</div>
                  <h3 className="text-xl font-black text-gray-900 mb-1">Ephemeral</h3>
                  <p className="text-sm text-gray-600 leading-snug">Lasting for a very short time; short-lived.</p>
                  <button className="mt-3 text-xs font-bold text-teal-700 flex items-center gap-1 hover:underline">
                      See Examples <Icons.ArrowRight size={12} />
                  </button>
              </div>
          </div>
      </div>

      {/* Streak Calendar Modal */}
      {showCalendar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white rounded-[32px] p-6 w-full max-w-sm shadow-2xl relative animate-in zoom-in-95">
                  <button onClick={() => setShowCalendar(false)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200">
                      <Icons.X size={20} />
                  </button>
                  
                  <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 text-orange-500 animate-bounce">
                          <Icons.Flame size={32} fill="currentColor" />
                      </div>
                      <h3 className="text-2xl font-black text-gray-900">12 Day Streak</h3>
                      <p className="text-gray-500 text-sm">You're on fire! Keep it up.</p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                      <div className="flex justify-between items-center mb-4">
                          <span className="font-bold text-gray-900">October 2024</span>
                          <div className="flex gap-2">
                              <button className="p-1 bg-white rounded hover:bg-gray-100"><Icons.ChevronRight className="rotate-180 text-gray-400" size={16} /></button>
                              <button className="p-1 bg-white rounded hover:bg-gray-100"><Icons.ChevronRight className="text-gray-400" size={16} /></button>
                          </div>
                      </div>
                      <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium">
                          {['S','M','T','W','T','F','S'].map(d => <span key={d} className="text-gray-400 mb-2">{d}</span>)}
                          
                          {/* Calendar Grid */}
                          {calendarDays.map((day) => (
                              <div key={day.day} className={`aspect-square flex items-center justify-center rounded-full relative ${day.isPracticeDay ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-600'}`}>
                                  {day.day}
                                  {day.isPracticeDay && (
                                      <Icons.Flame size={12} fill="white" className="absolute -top-1 -right-1 text-orange-200" />
                                  )}
                              </div>
                          ))}
                      </div>
                  </div>

                  <button 
                    onClick={() => setShowCalendar(false)}
                    className="w-full bg-orange-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-orange-200 hover:bg-orange-700 transition-colors"
                  >
                      Keep Going
                  </button>
              </div>
          </div>
      )}

    </div>
  );
};

export default Dashboard;
