
import React, { useState } from 'react';
import * as Icons from '../components/Icons';

const CreateRoom: React.FC<{ onBack: () => void, onStart: () => void }> = ({ onBack, onStart }) => {
  const [topic, setTopic] = useState('Business');
  const [isPrivate, setIsPrivate] = useState(false);
  const [skillFocus, setSkillFocus] = useState('Speaking');

  const topics = ['Business', 'Travel', 'Daily Life', 'Technology', 'Arts'];
  const skills = ['Speaking', 'Listening', 'Pronunciation', 'Debate'];

  return (
    <div className="h-full bg-gray-50 flex flex-col pb-safe">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-4 shadow-sm sticky top-0 z-10 shrink-0">
          <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full"><Icons.ChevronRight className="rotate-180 text-gray-600" size={24} /></button>
          <h2 className="font-bold text-gray-900 text-lg">Create Practice Room</h2>
      </div>

      <div className="p-5 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
          {/* Basics */}
          <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Basics</h3>
              <div className="space-y-4">
                  <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Room Title</label>
                      <div className="relative">
                          <input 
                            type="text" 
                            placeholder="e.g., Business English Practice" 
                            className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 shadow-sm"
                          />
                      </div>
                  </div>

                   <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Description</label>
                      <textarea 
                        placeholder="Describe what this room is about" 
                        className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 shadow-sm h-24 resize-none"
                      />
                  </div>
              </div>
          </div>

          {/* Configuration */}
          <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Configuration</h3>
              
              <div className="mb-6">
                   <label className="text-sm font-bold text-gray-700 mb-3 block flex items-center gap-2">
                       <Icons.Hash size={16} className="text-blue-500" /> Topic
                   </label>
                   <div className="flex flex-wrap gap-2">
                       {topics.map(t => (
                           <button 
                             key={t}
                             onClick={() => setTopic(t)}
                             className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${topic === t ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                           >
                               {t}
                           </button>
                       ))}
                   </div>
              </div>

               <div className="mb-6">
                   <label className="text-sm font-bold text-gray-700 mb-3 block flex items-center gap-2">
                       <Icons.Zap size={16} className="text-yellow-500" /> Skill Focus
                   </label>
                   <div className="flex flex-wrap gap-2">
                       {skills.map(s => (
                           <button 
                             key={s}
                             onClick={() => setSkillFocus(s)}
                             className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${skillFocus === s ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                           >
                               {s}
                           </button>
                       ))}
                   </div>
              </div>
          </div>

          {/* Privacy */}
          <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isPrivate ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                      {isPrivate ? <Icons.Lock size={20} /> : <Icons.Globe size={20} />}
                  </div>
                  <div>
                      <h4 className="font-bold text-gray-900 text-sm">{isPrivate ? 'Private Room' : 'Public Room'}</h4>
                      <p className="text-xs text-gray-500">{isPrivate ? 'Invite only' : 'Anyone can join'}</p>
                  </div>
              </div>
              <div 
                className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors ${isPrivate ? 'bg-blue-600' : 'bg-gray-200'}`}
                onClick={() => setIsPrivate(!isPrivate)}
              >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${isPrivate ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </div>
          </div>
      </div>

      <div className="p-4 border-t border-gray-100 bg-white sticky bottom-0 z-10 shrink-0">
          <button 
            onClick={onStart}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
              <Icons.Mic size={20} /> Create Room
          </button>
      </div>
    </div>
  );
};

export default CreateRoom;
