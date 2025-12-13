
import React, { useState } from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';

// --- Sub-Components ---

// Reusable Coming Soon View for all AI modes and Human Tutors
const ComingSoonView: React.FC<{ onBack: () => void, title: string, icon: any }> = ({ onBack, title, icon: Icon }) => (
    <div className="h-full flex flex-col bg-white animate-in fade-in duration-300">
        <div className="p-6">
            <button onClick={onBack} className="flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-blue-600 transition-colors w-fit">
                <Icons.ArrowLeft size={20} /> Back
            </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center pb-32">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
                <Icon size={48} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-3">{title}</h2>
            <div className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">Coming Soon</div>
            <p className="text-slate-500 max-w-xs mx-auto leading-relaxed text-base font-medium">
                We're working hard to bring you this feature. Stay tuned for updates!
            </p>
        </div>
    </div>
);

// Replaced previous complex setups with ComingSoonView
const ConversationSetup: React.FC<{ setView: (view: View) => void; onBack: () => void }> = ({ setView, onBack }) => (
    <ComingSoonView onBack={onBack} title="Conversation AI" icon={Icons.Headphones} />
);

const StorySetup: React.FC<{ setView: (view: View) => void; onBack: () => void }> = ({ setView, onBack }) => (
    <ComingSoonView onBack={onBack} title="Story Mode" icon={Icons.BookOpen} />
);

const ReadingSetup: React.FC<{ setView: (view: View) => void; onBack: () => void }> = ({ setView, onBack }) => (
    <ComingSoonView onBack={onBack} title="Reading Mode" icon={Icons.Eye} />
);

const PDFSetup: React.FC<{ setView: (view: View) => void; onBack: () => void }> = ({ setView, onBack }) => (
    <ComingSoonView onBack={onBack} title="PDF Practice" icon={Icons.UploadCloud} />
);

const DrillsSetup: React.FC<{ setView: (view: View) => void; onBack: () => void }> = ({ setView, onBack }) => (
    <ComingSoonView onBack={onBack} title="Quick Drills" icon={Icons.Zap} />
);

const AITutorHub: React.FC<{ onSelectMode: (mode: string) => void }> = ({ onSelectMode }) => {
  return (
      <div className="space-y-8 animate-in slide-in-from-right duration-300">
          {/* Modes Grid */}
          <div>
              <div className="flex justify-between items-center mb-6 px-1">
                 <h3 className="font-bold text-slate-900 text-xl flex items-center gap-2"><Icons.Sparkles className="text-blue-600" /> AI Practice Modes</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                      { id: 'conversation', name: 'Conversation AI', desc: 'Real-time voice practice with an AI Avatar.', icon: Icons.Headphones, bg: 'bg-white', accent: 'bg-indigo-50 text-indigo-600' },
                      { id: 'story', name: 'Story Mode', desc: 'Listen, retell, and answer guided questions.', icon: Icons.BookOpen, bg: 'bg-white', accent: 'bg-violet-50 text-violet-600' },
                      { id: 'reading', name: 'Reading Mode', desc: 'Improve comprehension & pronunciation.', icon: Icons.Eye, bg: 'bg-white', accent: 'bg-teal-50 text-teal-600' },
                      { id: 'pdf', name: 'PDF Upload Practice', desc: 'Practice with your own documents.', icon: Icons.UploadCloud, bg: 'bg-white', accent: 'bg-orange-50 text-orange-600' },
                      { id: 'drills', name: 'Quick Drills', desc: '2-5 min fast exercises for vocabulary.', icon: Icons.Zap, bg: 'bg-white', accent: 'bg-yellow-50 text-yellow-600' },
                  ].map((mode) => (
                      <div key={mode.id} className={`${mode.bg} p-6 rounded-[28px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-4 hover:translate-y-[-4px] transition-all group cursor-pointer h-full relative overflow-hidden`} onClick={() => onSelectMode(mode.id)}>
                          <div className={`absolute top-0 right-0 w-24 h-24 rounded-full -mr-8 -mt-8 opacity-20 ${mode.accent}`}></div>
                          
                          <div className="flex justify-between items-start relative z-10">
                              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${mode.accent} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                  <mode.icon size={26} />
                              </div>
                              <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-slate-100 text-slate-400`}>
                                  <Icons.ArrowRight size={20} />
                              </button>
                          </div>
                          <div className="relative z-10">
                              <h4 className="font-bold text-slate-900 text-lg mb-2">{mode.name}</h4>
                              <p className="text-sm text-slate-500 leading-relaxed font-medium">{mode.desc}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
  );
};

const HumanTutorsList: React.FC<{ onSelect: () => void }> = ({ onSelect }) => {
  const humanTutors = [
    { id: 1, name: 'Sarah Ahmed', role: 'Business English', rating: 4.9, reviews: 120, image: 'https://picsum.photos/100/100?random=20', status: 'online' },
    { id: 2, name: 'Omar Hassan', role: 'Pronunciation', rating: 4.8, reviews: 95, image: 'https://picsum.photos/100/100?random=21', status: 'offline' },
    { id: 3, name: 'Fatima Al-Sayed', role: 'IELTS Prep', rating: 5.0, reviews: 80, image: 'https://picsum.photos/100/100?random=22', status: 'busy' },
    { id: 4, name: 'John Smith', role: 'Conversation', rating: 4.7, reviews: 210, image: 'https://picsum.photos/100/100?random=23', status: 'online' },
    { id: 5, name: 'Emma Watson', role: 'Beginner Friendly', rating: 4.9, reviews: 150, image: 'https://picsum.photos/100/100?random=24', status: 'online' },
    { id: 6, name: 'Liam Neeson', role: 'Advanced Grammar', rating: 4.6, reviews: 60, image: 'https://picsum.photos/100/100?random=25', status: 'offline' },
  ];

  return (
      <div className="space-y-8 animate-in slide-in-from-left duration-300">
           {/* Filters Removed */}
           <div className="relative mb-6">
                <Icons.Search className="absolute left-5 top-4 text-slate-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Search by name or specialty" 
                    className="w-full bg-white border border-slate-200 rounded-[20px] pl-14 pr-6 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all shadow-sm text-slate-900"
                />
           </div>

           {/* Tutor List */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {humanTutors.map((tutor) => (
                <div key={tutor.id} className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center gap-5 cursor-pointer hover:shadow-lg hover:border-blue-100 transition-all group" onClick={onSelect}>
                     <div className="relative shrink-0">
                        <img src={tutor.image} className="w-16 h-16 rounded-[20px] object-cover shadow-sm group-hover:scale-105 transition-transform" alt={tutor.name} />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${tutor.status === 'online' ? 'bg-green-500' : tutor.status === 'busy' ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                     </div>
                     <div className="flex-1 min-w-0">
                         <h4 className="font-bold text-slate-900 text-lg truncate">{tutor.name}</h4>
                         <div className="text-sm text-slate-500 mb-1.5 font-medium">{tutor.role}</div>
                         <div className="flex items-center gap-3">
                             <div className="flex items-center gap-1 text-xs font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-md">
                                 <Icons.Star size={12} fill="currentColor" /> {tutor.rating}
                             </div>
                             <span className="text-xs text-slate-400 font-medium">{tutor.reviews} reviews</span>
                         </div>
                     </div>
                     <button className="bg-slate-50 text-slate-400 p-2.5 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Icons.ChevronRight size={20} />
                     </button>
                </div>
              ))}
           </div>
           
           {/* CTA Removed */}
      </div>
  );
};

// --- Main Component ---

const Tutors: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<'ai' | 'human'>('ai');
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [showHumanComingSoon, setShowHumanComingSoon] = useState(false);

  return (
    <div className="h-full overflow-y-auto flex flex-col pb-24 md:pb-6 custom-scrollbar bg-slate-50">
       
       {/* Sticky Header with Tabs */}
       <div className="sticky top-0 z-20 bg-slate-50/95 backdrop-blur-md pt-6 px-4 md:px-8 pb-4 border-b border-transparent">
           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 max-w-7xl mx-auto">
              <h2 className="text-2xl font-black text-slate-900">Tutor Hub</h2>
              <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex self-start sm:self-auto">
                  <button 
                    onClick={() => { setActiveTab('ai'); setSelectedMode(null); }}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'ai' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
                  >
                      <Icons.Sparkles size={16} /> AI Tutor
                  </button>
                  <button 
                    onClick={() => { setActiveTab('human'); setShowHumanComingSoon(false); }}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'human' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
                  >
                      <Icons.Users size={16} /> Human
                  </button>
              </div>
           </div>
       </div>

       <div className="px-4 md:px-8 py-6 flex-1 max-w-7xl mx-auto w-full">
           {activeTab === 'human' ? (
               showHumanComingSoon ? (
                   <ComingSoonView onBack={() => setShowHumanComingSoon(false)} title="Human Tutors" icon={Icons.Calendar} />
               ) : (
                   <HumanTutorsList onSelect={() => setShowHumanComingSoon(true)} />
               )
           ) : (
               <>
                   {selectedMode === null && <AITutorHub onSelectMode={setSelectedMode} />}
                   {selectedMode === 'conversation' && <ConversationSetup setView={setView} onBack={() => setSelectedMode(null)} />}
                   {selectedMode === 'story' && <StorySetup setView={setView} onBack={() => setSelectedMode(null)} />}
                   {selectedMode === 'reading' && <ReadingSetup setView={setView} onBack={() => setSelectedMode(null)} />}
                   {selectedMode === 'pdf' && <PDFSetup setView={setView} onBack={() => setSelectedMode(null)} />}
                   {selectedMode === 'drills' && <DrillsSetup setView={setView} onBack={() => setSelectedMode(null)} />}
               </>
           )}
       </div>
    </div>
  );
};

export default Tutors;
