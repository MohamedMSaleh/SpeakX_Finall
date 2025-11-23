
import React from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';

const AssessmentHistory: React.FC<{ onBack: () => void, setView: (view: View) => void }> = ({ onBack, setView }) => {
  const history = [
    { id: 1, date: 'Oct 24, 2024', level: 'B2 Upper Intermediate', score: 78, type: 'Full Assessment' },
    { id: 2, date: 'Sep 10, 2024', level: 'B1 Intermediate', score: 65, type: 'Full Assessment' },
    { id: 3, date: 'Aug 05, 2024', level: 'B1 Intermediate', score: 62, type: 'Pronunciation Check' },
  ];

  return (
    <div className="h-full bg-gray-50 flex flex-col">
       {/* Header */}
       <div className="bg-white p-4 flex items-center gap-4 shadow-sm sticky top-0 z-10 shrink-0">
          <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full"><Icons.ChevronRight className="rotate-180 text-gray-600" size={24} /></button>
          <h2 className="font-bold text-gray-900 text-lg">Assessments</h2>
       </div>

       <div className="p-5 flex-1 overflow-y-auto custom-scrollbar">
          {/* Start New Card */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-200 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
              
              <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4">
                      <Icons.Target size={24} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Test Your Level</h3>
                  <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                      Take a comprehensive 10-minute assessment to analyze your grammar, vocabulary, and pronunciation.
                  </p>
                  <button 
                    onClick={() => setView(View.ASSESSMENT)}
                    className="w-full bg-white text-blue-600 font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
                  >
                      Start Assessment <Icons.ArrowRight size={18} />
                  </button>
              </div>
          </div>

          {/* History List */}
          <h3 className="font-bold text-gray-900 text-lg mb-4">Past Assessments</h3>
          <div className="space-y-4">
              {history.map(item => (
                  <div key={item.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                          <div>
                              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{item.type}</div>
                              <h4 className="font-bold text-gray-900 text-lg">{item.level}</h4>
                          </div>
                          <div className="bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-lg text-sm">
                              {item.score}%
                          </div>
                      </div>
                      <div className="flex justify-between items-center border-t border-gray-50 pt-3 mt-1">
                          <span className="text-sm text-gray-500 flex items-center gap-2">
                              <Icons.Calendar size={14} /> {item.date}
                          </span>
                          <button className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline">
                              View Report <Icons.ChevronRight size={14} />
                          </button>
                      </div>
                  </div>
              ))}
          </div>
       </div>
    </div>
  );
};

export default AssessmentHistory;
