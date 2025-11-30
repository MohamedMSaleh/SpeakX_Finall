
import React, { useState } from 'react';
import * as Icons from '../components/Icons';

const StorySession: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [fontSize, setFontSize] = useState(16);

  const story = {
    title: "The Lost Tourist",
    level: "A2",
    time: "5 min",
    content: `It was a sunny morning in Paris. James, a tourist from London, was excited to visit the Louvre Museum. He grabbed his map, put on his comfortable shoes, and left his hotel.

However, Paris is a big city. James walked for twenty minutes but didn't see the famous glass pyramid. He stopped at a small bakery. "Excuse me," he asked a woman buying bread. "Do you know where the Louvre is?"

The woman smiled. "You are walking in the wrong direction! You need to take the metro."

James laughed. "Thank you!" he said. He bought a croissant and headed to the metro station. Even though he was lost, he was enjoying the adventure.`
  };

  return (
    <div className="h-full bg-white flex flex-col pb-safe relative">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm z-10 sticky top-0 shrink-0">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full"><Icons.ChevronRight className="rotate-180 text-gray-600" size={24} /></button>
          <div className="flex gap-2">
             <button onClick={() => setFontSize(Math.max(14, fontSize - 2))} className="p-2 text-gray-400 hover:text-gray-800"><span className="text-xs font-bold">A-</span></button>
             <button onClick={() => setFontSize(Math.min(24, fontSize + 2))} className="p-2 text-gray-400 hover:text-gray-800"><span className="text-lg font-bold">A+</span></button>
          </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Cover Image */}
          <div className="h-48 w-full relative">
              <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Paris" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
          </div>

          <div className="px-6 -mt-10 relative z-10">
              <div className="bg-blue-600 text-white inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 shadow-md">
                  Level {story.level}
              </div>
              <h1 className="text-3xl font-black text-gray-900 mb-2 leading-tight">{story.title}</h1>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-8">
                  <Icons.Clock size={16} /> {story.time} read
              </div>

              {/* Story Text */}
              <div className="space-y-6 mb-12">
                  {story.content.split('\n\n').map((paragraph, idx) => (
                      <p 
                        key={idx} 
                        className="text-gray-800 leading-loose" 
                        style={{ fontSize: `${fontSize}px` }}
                      >
                          {paragraph}
                      </p>
                  ))}
              </div>
          </div>
      </div>

      {/* Footer Controls */}
      <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
          <button 
            onClick={onBack}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
              <Icons.CheckCircle size={20} /> Finish Reading
          </button>
      </div>
    </div>
  );
};

export default StorySession;