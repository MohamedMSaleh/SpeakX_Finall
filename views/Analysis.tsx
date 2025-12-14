
import React from 'react';
import * as Icons from '../components/Icons';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { GradientBackground, FloatingShapes, AnimatedCard, MotivationalMessage } from '../components/AnimatedComponents';

const Analysis: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const data = [
    { subject: 'Pronunciation', A: 120, fullMark: 150 },
    { subject: 'Fluency', A: 98, fullMark: 150 },
    { subject: 'Grammar', A: 86, fullMark: 150 },
    { subject: 'Vocab', A: 99, fullMark: 150 },
    { subject: 'Confidence', A: 85, fullMark: 150 },
  ];

  return (
    <div className="h-full flex flex-col pb-24 relative overflow-hidden">
      <GradientBackground variant="green" />
      <FloatingShapes />
      
      <div className="relative z-10 bg-white/80 backdrop-blur-md p-4 flex items-center gap-4 shadow-sm shrink-0 sticky top-0">
          <button onClick={onBack}><Icons.ChevronRight className="rotate-180 text-gray-600" /></button>
          <h2 className="font-bold text-gray-900">Practice Analysis</h2>
      </div>

      <div className="p-5 space-y-5 flex-1 overflow-y-auto custom-scrollbar relative z-10">
          <MotivationalMessage />
          
          {/* Scores */}
          <div className="grid grid-cols-2 gap-4">
              <AnimatedCard variant="white" className="text-center">
                  <div className="text-gray-500 text-sm mb-1">🎯 Overall Score</div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">85<span className="text-base text-gray-400 font-normal">/100</span></div>
              </AnimatedCard>
              <AnimatedCard variant="white" className="text-center">
                  <div className="text-gray-500 text-sm mb-1">🚀 Confidence</div>
                  <div className="text-xl font-bold text-gray-900">Great Progress!</div>
              </AnimatedCard>
          </div>

          {/* Chart */}
          <AnimatedCard variant="white">
              <h3 className="font-bold text-gray-900 mb-4">📊 Your Skill Breakdown</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 10 }} />
                    <Radar
                        name="Mike"
                        dataKey="A"
                        stroke="#0d9488"
                        fill="#2dd4bf"
                        fillOpacity={0.6}
                    />
                    </RadarChart>
                </ResponsiveContainer>
              </div>
          </AnimatedCard>

          {/* Areas to Improve */}
          <div className="space-y-3">
              <h3 className="font-bold text-gray-900">💡 Areas to Improve</h3>
              <AnimatedCard variant="white">
                  <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50">
                      <span className="font-bold text-gray-700 text-sm">Grammar</span>
                      <Icons.ChevronRight className="-rotate-90 text-gray-400" size={16} />
                  </div>
                  <div className="p-4 text-sm">
                      <p className="text-gray-500 mb-2">You said: "I am <span className="text-red-500 underline decoration-wavy">go</span> to the store."</p>
                      <p className="text-gray-700">A better way: "I am <span className="text-green-600 font-bold">going</span> to the store."</p>
                  </div>
              </AnimatedCard>
              
              <AnimatedCard variant="white">
                  <div className="p-4 flex justify-between items-center">
                      <span className="font-bold text-gray-700 text-sm">Pronunciation</span>
                      <Icons.ChevronRight className="rotate-90 text-gray-400" size={16} />
                  </div>
              </AnimatedCard>
              <AnimatedCard variant="white">
                  <div className="p-4 flex justify-between items-center">
                      <span className="font-bold text-gray-700 text-sm">Vocabulary Choice</span>
                      <Icons.ChevronRight className="rotate-90 text-gray-400" size={16} />
                  </div>
              </AnimatedCard>
          </div>

          {/* Recording Review */}
          <AnimatedCard variant="white">
              <h3 className="font-bold text-gray-900 mb-4">🎙️ Review Your Recording</h3>
              <div className="flex items-center gap-3 mb-4">
                  <button className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white hover:bg-teal-700">
                      <Icons.Play size={18} fill="white" />
                  </button>
                  <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full w-1/3 bg-teal-600"></div>
                  </div>
                  <div className="text-xs text-gray-500 font-mono">1:32 / 3:05</div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                  Hello, how are you today? I am fine, thank you. I am <span className="bg-red-100 text-red-600 px-1 rounded">go</span> to the store to buy some food. The weather is very <span className="bg-yellow-100 text-yellow-700 px-1 rounded">good</span>, it's sunny.
              </p>
          </AnimatedCard>

          {/* Footer Actions */}
          <div className="pt-4 space-y-3">
              <button className="w-full bg-teal-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-teal-200">Start Recommended Practice</button>
              <div className="flex gap-3">
                  <button className="flex-1 bg-teal-100 text-teal-800 font-bold py-3 rounded-xl text-sm">Share Analysis</button>
                  <button className="flex-1 bg-teal-100 text-teal-800 font-bold py-3 rounded-xl text-sm">Export as PDF</button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Analysis;
