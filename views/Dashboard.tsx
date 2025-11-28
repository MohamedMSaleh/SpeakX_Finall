
import React from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';
import { PieChart, Pie, Cell } from 'recharts';

const Dashboard: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  const fluencyData = [
    { name: 'Completed', value: 75 },
    { name: 'Remaining', value: 25 },
  ];
  const COLORS = ['#2563EB', '#E5E7EB'];

  return (
    <div className="h-full overflow-y-auto p-5 space-y-6 pb-24 custom-scrollbar">
      {/* Overall Fluency Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-gray-500 font-medium text-sm mb-1">Overall Fluency</h3>
          <div className="text-3xl font-bold text-gray-900">Excellent</div>
        </div>
        <div className="relative w-20 h-20 flex items-center justify-center">
          <PieChart width={80} height={80}>
            <Pie
              data={fluencyData}
              innerRadius={32}
              outerRadius={40}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
            >
              {fluencyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
          <span className="absolute text-sm font-bold text-blue-600">75%</span>
        </div>
      </div>

      {/* Weekly Change Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-gray-500 font-medium text-sm mb-1">Weekly Change</h3>
        <div className="flex items-center gap-2">
          <div className="bg-green-100 p-1 rounded-full">
             <Icons.ArrowUp size={16} className="text-green-600" />
          </div>
          <span className="text-3xl font-bold text-gray-900">+2%</span>
        </div>
      </div>

      {/* Practice Grid */}
      <h2 className="text-lg font-bold text-gray-900">Practice</h2>
      <div className="grid grid-cols-2 gap-4">
        {[
          { title: 'Vocabulary', sub: 'Expand your word bank', icon: Icons.BookOpen, color: 'bg-blue-100 text-blue-600', action: () => setView(View.VOCAB_PRACTICE) },
          { title: 'Grammar', sub: 'Master language rules', icon: Icons.CheckCircle, color: 'bg-green-100 text-green-600', action: () => setView(View.GRAMMAR_PRACTICE) },
          { title: 'Pronunciation', sub: 'Perfect your accent', icon: Icons.Mic, color: 'bg-purple-100 text-purple-600', action: () => setView(View.PRONUNCIATION_PRACTICE) },
          { title: 'Fluency', sub: 'Speak with confidence', icon: Icons.MessageSquare, color: 'bg-orange-100 text-orange-600', action: () => setView(View.FLUENCY_PRACTICE) },
        ].map((item, idx) => (
          <button 
            key={idx} 
            onClick={item.action}
            className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm text-left hover:shadow-md transition-shadow group"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${item.color} group-hover:scale-110 transition-transform`}>
              <item.icon size={20} />
            </div>
            <div className="font-bold text-gray-900 mb-1">{item.title}</div>
            <div className="text-xs text-gray-500 leading-tight">{item.sub}</div>
          </button>
        ))}
      </div>

      {/* Continue Learning */}
      <div className="flex justify-between items-end">
          <h2 className="text-lg font-bold text-gray-900">Continue Learning</h2>
          <button className="text-sm text-blue-600 font-semibold" onClick={() => setView(View.ROADMAP)}>View All</button>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          <div className="min-w-[240px] bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
              <div className="text-xs text-blue-600 font-bold mb-1">LESSON 3</div>
              <div className="font-bold text-gray-900 mb-3">Phrasal Verbs</div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 w-1/2 rounded-full"></div>
              </div>
          </div>
          <div className="min-w-[240px] bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
              <div className="text-xs text-green-600 font-bold mb-1">QUIZ</div>
              <div className="font-bold text-gray-900 mb-3">Past Tense</div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-600 w-3/4 rounded-full"></div>
              </div>
          </div>
      </div>

      {/* Assessment Entry (Previously Weekly Challenge) */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-5 flex items-center justify-between shadow-lg shadow-indigo-200 mb-6">
        <div className="flex items-center gap-4 text-white">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Icons.Target className="text-white" size={20} />
          </div>
          <div>
            <div className="font-bold text-lg">Skill Assessment</div>
            <div className="text-xs text-indigo-100">Test your level & get a plan</div>
          </div>
        </div>
        <button className="bg-white text-indigo-600 px-5 py-2 rounded-full text-sm font-bold shadow-md" onClick={() => setView(View.ASSESSMENT_HISTORY)}>
          Start
        </button>
      </div>

      <div className="bg-blue-50 rounded-2xl p-4 relative overflow-hidden border border-blue-100">
          <button className="absolute top-2 right-2 text-gray-400"><Icons.X size={16} /></button>
          <div className="flex items-start gap-3">
            <Icons.Settings className="text-green-600 mt-1" size={20} />
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Your Privacy Matters</h4>
              <p className="text-xs text-gray-600 mt-1">We've updated our policy to be even more transparent. Take a moment to read it.</p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
