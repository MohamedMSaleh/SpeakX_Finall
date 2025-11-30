
import React, { useState } from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';

// --- Sub-Components ---

const ConversationSetup: React.FC<{ setView: (view: View) => void; onBack: () => void }> = ({ setView, onBack }) => {
  const [topic, setTopic] = useState('Free Talk');

  const topics = [
      { id: 'Free Talk', icon: Icons.MessageCircle, color: 'text-blue-500 bg-blue-50' },
      { id: 'Travel', icon: Icons.Globe, color: 'text-green-500 bg-green-50' },
      { id: 'Business', icon: Icons.Briefcase, color: 'text-purple-500 bg-purple-50' },
      { id: 'Food', icon: Icons.Heart, color: 'text-orange-500 bg-orange-50' },
  ];

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-bottom duration-500">
        <div className="flex items-center mb-6">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                <Icons.ArrowLeft size={24} />
            </button>
            <h2 className="text-lg font-bold text-gray-900 ml-2">Conversation AI</h2>
        </div>

        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="relative mb-8">
                 <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                 <div className="w-40 h-40 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center relative shadow-xl z-10">
                     <Icons.Headphones size={64} className="text-white" />
                 </div>
                 <div className="absolute bottom-2 right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white z-20 flex items-center justify-center">
                    <Icons.Mic size={14} className="text-white" />
                 </div>
            </div>

            <h3 className="text-2xl font-black text-gray-900 mb-2">Voice Conversation</h3>
            <p className="text-gray-500 text-sm max-w-xs mb-8 leading-relaxed">
                Speak naturally with our AI Avatar. It listens, thinks, and responds just like a real person. Perfect for improving fluency.
            </p>

            {/* Topic Selector */}
            <div className="w-full mb-8">
                <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Topic</span>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
                    {topics.map((t) => (
                        <button 
                            key={t.id}
                            onClick={() => setTopic(t.id)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-2xl border transition-all whitespace-nowrap ${topic === t.id ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${t.color}`}>
                                <t.icon size={16} />
                            </div>
                            <span className={`text-sm font-bold ${topic === t.id ? 'text-blue-900' : 'text-gray-600'}`}>{t.id}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="w-full space-y-4">
                 <button 
                    onClick={() => setView(View.CALL_SESSION)}
                    className="w-full bg-blue-600 text-white font-bold py-4 rounded-3xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-transform hover:scale-[1.02] flex items-center justify-center gap-3"
                 >
                     <Icons.Mic size={24} /> Start Voice Conversation
                 </button>
                 
                 <button 
                    onClick={() => setView(View.CHAT_SESSION)}
                    className="text-gray-500 text-sm font-bold hover:text-blue-600 transition-colors"
                 >
                    Prefer typing? Switch to Text Chat
                 </button>
            </div>
        </div>
    </div>
  );
};

const StorySetup: React.FC<{ setView: (view: View) => void; onBack: () => void }> = ({ setView, onBack }) => (
    <div className="animate-in slide-in-from-right duration-300">
         <button onClick={onBack} className="mb-4 flex items-center gap-2 text-gray-500 font-bold text-sm hover:text-blue-600">
            <Icons.ArrowLeft size={18} /> Back to Hub
        </button>
         
         {/* Updated Banner Colors to Blue/Indigo */}
         <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 text-white mb-6 shadow-lg shadow-blue-200">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/20 rounded-xl"><Icons.BookOpen size={24} /></div>
                <h2 className="text-2xl font-bold">Story Mode</h2>
            </div>
            <p className="text-blue-100 text-sm">Immerse yourself in English stories designed for your level.</p>
        </div>

        <h3 className="font-bold text-gray-900 mb-4">Library</h3>
        <div className="grid grid-cols-1 gap-4">
            {[
                { title: "The Lost Tourist", level: "A2", genre: "Adventure", time: "5 min", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=200" },
                { title: "A Day in the Life", level: "B1", genre: "Lifestyle", time: "7 min", image: "https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&q=80&w=200" },
                { title: "The Job Offer", level: "B2", genre: "Business", time: "10 min", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200" }
            ].map((story, idx) => (
                <div 
                    key={idx} 
                    className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition-all group" 
                    onClick={() => setView(View.STORY_SESSION)}
                >
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative">
                         <img src={story.image} alt={story.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                         <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded">{story.level}</span>
                            <span className="text-[10px] text-gray-400 font-medium">• {story.time}</span>
                        </div>
                        <h4 className="font-bold text-gray-900 text-lg leading-tight truncate">{story.title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{story.genre}</p>
                    </div>
                    
                    <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Icons.ChevronRight size={20} />
                    </button>
                </div>
            ))}
        </div>
    </div>
);

const ReadingSetup: React.FC<{ setView: (view: View) => void; onBack: () => void }> = ({ setView, onBack }) => (
    <div className="animate-in slide-in-from-right duration-300">
        <button onClick={onBack} className="mb-4 flex items-center gap-2 text-gray-500 font-bold text-sm hover:text-teal-600">
            <Icons.ArrowLeft size={18} /> Back to Hub
        </button>
        <div className="bg-teal-600 rounded-3xl p-6 text-white mb-6 shadow-lg shadow-teal-200">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/20 rounded-xl"><Icons.Eye size={24} /></div>
                <h2 className="text-2xl font-bold">Reading Mode</h2>
            </div>
            <p className="text-teal-100 text-sm">Read passages aloud and get instant analysis on intonation and pacing.</p>
        </div>

        <h3 className="font-bold text-gray-900 mb-4">Choose a Passage</h3>
        <div className="grid grid-cols-1 gap-4">
            {[
                { title: "Ordering Coffee", desc: "Common phrases for cafes.", diff: "Easy" },
                { title: "Business Email", desc: "Formal professional tone.", diff: "Medium" },
                { title: "News Headline", desc: "Complex sentence structures.", diff: "Hard" },
            ].map((item, i) => (
                <button 
                  key={i}
                  onClick={() => setView(View.PRACTICE_SESSION)}
                  className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-left hover:border-teal-300 transition-all group"
                >
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded ${item.diff === 'Easy' ? 'bg-green-100 text-green-700' : item.diff === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{item.diff}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{item.desc}</p>
                    <div className="flex items-center gap-2 text-teal-600 font-bold text-xs group-hover:underline">
                        Start Reading <Icons.ArrowRight size={14} />
                    </div>
                </button>
            ))}
        </div>
    </div>
);

const PDFSetup: React.FC<{ setView: (view: View) => void; onBack: () => void }> = ({ setView, onBack }) => (
    <div className="animate-in slide-in-from-right duration-300">
        <button onClick={onBack} className="mb-4 flex items-center gap-2 text-gray-500 font-bold text-sm hover:text-orange-600">
            <Icons.ArrowLeft size={18} /> Back to Hub
        </button>
        <div className="bg-orange-600 rounded-3xl p-6 text-white mb-6 shadow-lg shadow-orange-200">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/20 rounded-xl"><Icons.UploadCloud size={24} /></div>
                <h2 className="text-2xl font-bold">PDF Practice</h2>
            </div>
            <p className="text-orange-100 text-sm">Upload your own documents, books, or articles. AI will generate exercises from them.</p>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-3xl p-10 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-white hover:border-orange-400 transition-colors cursor-pointer" onClick={() => setView(View.PRACTICE_SESSION)}>
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-orange-500">
                <Icons.FileText size={32} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Tap to Upload PDF</h3>
            <p className="text-xs text-gray-500 max-w-[200px]">Supported files: PDF, DOCX, TXT up to 10MB.</p>
        </div>
        
        <div className="mt-8">
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Recent Uploads</h3>
            <div className="space-y-3">
                <div className="bg-white p-3 rounded-2xl border border-gray-100 flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600"><Icons.FileText size={20} /></div>
                    <div className="flex-1">
                        <h4 className="font-bold text-sm text-gray-900">English_101_Syllabus.pdf</h4>
                        <p className="text-xs text-gray-400">2 days ago</p>
                    </div>
                    <button className="text-blue-600 font-bold text-xs bg-blue-50 px-3 py-1.5 rounded-lg" onClick={() => setView(View.PRACTICE_SESSION)}>Open</button>
                </div>
            </div>
        </div>
    </div>
);

const DrillsSetup: React.FC<{ setView: (view: View) => void; onBack: () => void }> = ({ setView, onBack }) => {
  const [drillType, setDrillType] = useState('Pronunciation');

  return (
      <div className="animate-in slide-in-from-right duration-300">
           <button onClick={onBack} className="mb-4 flex items-center gap-2 text-gray-500 font-bold text-sm hover:text-yellow-600">
              <Icons.ArrowLeft size={18} /> Back to Hub
          </button>
          <div className="bg-yellow-500 rounded-3xl p-6 text-white mb-6 shadow-lg shadow-yellow-200">
              <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/20 rounded-xl"><Icons.Zap size={24} /></div>
                  <h2 className="text-2xl font-bold">Quick Drills</h2>
              </div>
              <p className="text-yellow-50 text-sm">Short, focused exercises to target specific skills in under 5 minutes.</p>
          </div>

          <h3 className="font-bold text-gray-900 mb-4">Select Drill Type</h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                  { id: 'Pronunciation', icon: Icons.Mic, color: 'text-purple-600 bg-purple-50' },
                  { id: 'Vocabulary', icon: Icons.BookOpen, color: 'text-blue-600 bg-blue-50' },
                  { id: 'Grammar', icon: Icons.CheckSquare, color: 'text-green-600 bg-green-50' },
                  { id: 'Fluency', icon: Icons.Clock, color: 'text-orange-600 bg-orange-50' },
              ].map((drill) => (
                  <button 
                    key={drill.id}
                    onClick={() => setDrillType(drill.id)}
                    className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${drillType === drill.id ? 'border-yellow-500 bg-yellow-50 shadow-sm' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                  >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${drill.color}`}>
                          <drill.icon size={20} />
                      </div>
                      <span className={`font-bold text-sm ${drillType === drill.id ? 'text-gray-900' : 'text-gray-500'}`}>{drill.id}</span>
                  </button>
              ))}
          </div>

          <button 
            onClick={() => {
                if (drillType === 'Vocabulary') setView(View.VOCAB_PRACTICE);
                else if (drillType === 'Grammar') setView(View.GRAMMAR_PRACTICE);
                else if (drillType === 'Pronunciation') setView(View.PRONUNCIATION_PRACTICE);
                else setView(View.FLUENCY_PRACTICE);
            }}
            className="w-full bg-yellow-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-yellow-200 hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
          >
              <Icons.Play size={20} fill="currentColor" /> Start {drillType} Drill
          </button>
      </div>
  );
};

const AITutorHub: React.FC<{ onSelectMode: (mode: string) => void }> = ({ onSelectMode }) => {
  const [language, setLanguage] = useState<'EN' | 'AR'>('EN');

  return (
      <div className="space-y-6 animate-in slide-in-from-right duration-300">
          {/* Modes Grid */}
          <div>
              <div className="flex justify-between items-center mb-3 px-1">
                 <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Practice Modes</h3>
                 <div className="flex gap-2">
                     <button 
                        onClick={() => setLanguage(prev => prev === 'EN' ? 'AR' : 'EN')}
                        className="flex items-center gap-1 bg-white border border-gray-200 px-2 py-1 rounded-full shadow-sm"
                     >
                        <span className="text-xs font-bold text-gray-600">{language === 'EN' ? '🇬🇧 EN' : '🇸🇦 AR'}</span>
                     </button>
                 </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                  {[
                      { id: 'conversation', name: 'Conversation AI', desc: 'Real-time voice practice with an AI Avatar.', icon: Icons.Headphones, color: 'bg-green-500', light: 'bg-green-50', text: 'text-green-600' },
                      { id: 'story', name: 'Story Mode', desc: 'Listen, retell, and answer guided questions.', icon: Icons.BookOpen, color: 'bg-blue-600', light: 'bg-blue-50', text: 'text-blue-600' },
                      { id: 'reading', name: 'Reading Mode', desc: 'Improve comprehension & pronunciation.', icon: Icons.Eye, color: 'bg-teal-600', light: 'bg-teal-50', text: 'text-teal-600' },
                      { id: 'pdf', name: 'PDF Upload Practice', desc: 'Practice with your own documents.', icon: Icons.UploadCloud, color: 'bg-orange-600', light: 'bg-orange-50', text: 'text-orange-600' },
                      { id: 'drills', name: 'Quick Drills', desc: '2-5 min fast exercises for vocabulary.', icon: Icons.Zap, color: 'bg-yellow-500', light: 'bg-yellow-50', text: 'text-yellow-600' },
                  ].map((mode) => (
                      <div key={mode.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all group cursor-pointer" onClick={() => onSelectMode(mode.id)}>
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${mode.light} ${mode.text} group-hover:scale-110 transition-transform`}>
                              <mode.icon size={28} />
                          </div>
                          <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-gray-900 text-lg mb-1">{mode.name}</h4>
                              <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{mode.desc}</p>
                          </div>
                          <button className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${mode.light} ${mode.text} hover:bg-gray-100`}>
                              Setup
                          </button>
                      </div>
                  ))}
              </div>
          </div>
      </div>
  );
};

const HumanTutorsList: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  const humanTutors = [
    { id: 1, name: 'Sarah Ahmed', role: 'Business English', rating: 4.9, reviews: 120, image: 'https://picsum.photos/100/100?random=20', status: 'online' },
    { id: 2, name: 'Omar Hassan', role: 'Pronunciation', rating: 4.8, reviews: 95, image: 'https://picsum.photos/100/100?random=21', status: 'offline' },
    { id: 3, name: 'Fatima Al-Sayed', role: 'IELTS Prep', rating: 5.0, reviews: 80, image: 'https://picsum.photos/100/100?random=22', status: 'busy' },
    { id: 4, name: 'John Smith', role: 'Conversation', rating: 4.7, reviews: 210, image: 'https://picsum.photos/100/100?random=23', status: 'online' },
  ];

  return (
      <div className="space-y-6 animate-in slide-in-from-left duration-300">
           {/* Filters */}
           <div className="relative">
                <Icons.Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Search by name or specialty" 
                    className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 transition-all shadow-sm"
                />
           </div>

           <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {['All', 'Business', 'Pronunciation', 'Exam Prep'].map((filter, i) => (
                  <button key={i} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${i === 0 ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
                      {filter}
                  </button>
              ))}
           </div>

           {/* Tutor List */}
           <div className="space-y-4">
              {humanTutors.map((tutor) => (
                <div key={tutor.id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition-all" onClick={() => setView(View.TUTOR_BOOKING)}>
                     <div className="relative">
                        <img src={tutor.image} className="w-16 h-16 rounded-2xl object-cover" alt={tutor.name} />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${tutor.status === 'online' ? 'bg-green-500' : tutor.status === 'busy' ? 'bg-orange-500' : 'bg-gray-400'}`}></div>
                     </div>
                     <div className="flex-1">
                         <h4 className="font-bold text-gray-900 text-lg">{tutor.name}</h4>
                         <div className="text-sm text-gray-500 mb-1">{tutor.role}</div>
                         <div className="flex items-center gap-3">
                             <div className="flex items-center gap-1 text-xs font-bold text-orange-500">
                                 <Icons.Star size={14} fill="currentColor" className="text-orange-400" /> {tutor.rating}
                             </div>
                             <span className="text-xs text-gray-400">({tutor.reviews} reviews)</span>
                         </div>
                     </div>
                     <button className="bg-blue-50 text-blue-600 p-2 rounded-full hover:bg-blue-100">
                        <Icons.ChevronRight size={20} />
                     </button>
                </div>
              ))}
           </div>

           {/* Become a Tutor CTA */}
           <div className="bg-blue-900 rounded-3xl p-6 mt-4 text-center relative overflow-hidden text-white">
              <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                     <Icons.Users size={24} />
                  </div>
                  <h3 className="font-bold mb-2">Expert Teacher?</h3>
                  <p className="text-sm text-blue-200 mb-4">Join our community and earn by helping others.</p>
                  <button className="text-white bg-blue-600 px-6 py-2 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors">Apply Now</button>
              </div>
           </div>
      </div>
  );
};

// --- Main Component ---

const Tutors: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<'ai' | 'human'>('ai');
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  return (
    <div className="h-full overflow-y-auto bg-gray-50 flex flex-col pb-24 custom-scrollbar">
       
       {/* Sticky Header with Tabs */}
       <div className="sticky top-0 z-20 bg-gray-50 pt-5 px-5 pb-2">
           <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Tutor Hub</h2>
              <div className="bg-white p-1 rounded-xl border border-gray-200 shadow-sm flex">
                  <button 
                    onClick={() => { setActiveTab('ai'); setSelectedMode(null); }}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'ai' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                      <Icons.Sparkles size={14} /> AI Tutor
                  </button>
                  <button 
                    onClick={() => { setActiveTab('human'); setSelectedMode(null); }}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'human' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                      <Icons.Users size={14} /> Human
                  </button>
              </div>
           </div>
       </div>

       <div className="px-5 pb-5 flex-1">
           {activeTab === 'human' ? <HumanTutorsList setView={setView} /> : (
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
