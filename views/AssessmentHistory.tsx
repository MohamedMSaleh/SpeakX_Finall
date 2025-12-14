
import React from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';
import { GradientBackground, FloatingShapes, AnimatedCard, MotivationalMessage } from '../components/AnimatedComponents';

interface AssessmentHistoryProps {
  onBack: () => void;
  setView: (view: View) => void;
  onViewReport?: () => void;
  onStartAssessment?: () => void;
}

const AssessmentHistory: React.FC<AssessmentHistoryProps> = ({ onBack, setView, onViewReport, onStartAssessment }) => {
  const history = [
    { id: 1, date: 'Oct 24, 2024', level: 'B2 Upper Intermediate', score: 78, type: 'Full Assessment' },
    { id: 2, date: 'Sep 10, 2024', level: 'B1 Intermediate', score: 65, type: 'Full Assessment' },
    { id: 3, date: 'Aug 05, 2024', level: 'B1 Intermediate', score: 62, type: 'Pronunciation Check' },
  ];

  const handleStart = () => {
    if (onStartAssessment) {
      onStartAssessment();
    } else {
      // Fallback
      setView(View.ASSESSMENT);
    }
  };

  const handleViewReport = () => {
    if (onViewReport) {
      onViewReport();
    } else {
      // Fallback
      setView(View.ASSESSMENT);
    }
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
       <GradientBackground variant="purple" />
       <FloatingShapes />
       
       {/* Header */}
       <div className="relative z-10 bg-white/80 backdrop-blur-md p-4 flex items-center gap-4 shadow-sm sticky top-0 shrink-0">
          <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full"><Icons.ChevronRight className="rotate-180 text-gray-600" size={24} /></button>
          <h2 className="font-bold text-gray-900 text-lg">Assessments</h2>
       </div>

       <div className="p-5 flex-1 overflow-y-auto custom-scrollbar relative z-10">
          <MotivationalMessage />
          
          {/* Start New Card */}
          <AnimatedCard variant="gradient" className="text-white mb-8">
              <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-4 shadow-xl">
                      <Icons.Target size={24} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Test Your Level</h3>
                  <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                      Take a comprehensive 10-minute assessment to analyze your grammar, vocabulary, and pronunciation.
                  </p>
                  <button 
                    onClick={handleStart}
                    className="w-full bg-white text-blue-600 font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
                  >
                      Start Assessment <Icons.ArrowRight size={18} />
                  </button>
              </div>
          </AnimatedCard>

          {/* History List */}
          <h3 className="font-bold text-gray-900 text-lg mb-4">📊 Past Assessments</h3>
          <div className="space-y-4">
              {history.map((item, idx) => (
                  <AnimatedCard 
                    key={item.id} 
                    variant="white"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
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
                          <button 
                            onClick={handleViewReport}
                            className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline"
                          >
                              View Report <Icons.ChevronRight size={14} />
                          </button>
                      </div>
                  </AnimatedCard>
              ))}
          </div>
       </div>
    </div>
  );
};

export default AssessmentHistory;
