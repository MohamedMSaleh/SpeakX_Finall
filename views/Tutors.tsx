
import React, { useState } from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';
import { GradientBackground, FloatingShapes, AnimatedCard, MotivationalMessage } from '../components/AnimatedComponents';

// --- Sub-Components ---

// Reusable Coming Soon View for all AI modes and Human Tutors
const ComingSoonView: React.FC<{ onBack: () => void, title: string, icon: any }> = ({ onBack, title, icon: Icon }) => (
    <GradientBackground variant="blue" className="h-full flex flex-col animate-fadeIn">
        <FloatingShapes />
        <div className="relative z-10 p-6">
            <button onClick={onBack} className="flex items-center gap-2 text-gray-600 font-bold text-sm hover:text-blue-600 transition-colors hover-scale">
                <Icons.ArrowLeft size={20} /> Back
            </button>
        </div>
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-8 text-center pb-32">
            <div className="w-28 h-28 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center mb-6 text-blue-500 shadow-xl animate-float">
                <Icon size={56} strokeWidth={2} />
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">{title}</h2>
            <div className="text-xs font-bold text-blue-600 bg-gradient-to-r from-blue-100 to-purple-100 px-5 py-2 rounded-full uppercase tracking-widest mb-6 animate-pulse">
                Coming Soon ✨
            </div>
            <p className="text-gray-600 max-w-md mx-auto leading-relaxed text-base font-medium">
                We're crafting something amazing! This feature will revolutionize your learning experience.
            </p>
        </div>
    </GradientBackground>
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
      <div className="space-y-8 animate-slideUp">
          {/* Motivational Message */}
          <MotivationalMessage 
            message="Practice with AI tutors anytime, anywhere! 🤖✨" 
            variant="celebrating"
          />
          
          {/* Modes Grid */}
          <div>
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-black text-gray-900 text-2xl flex items-center gap-2">
                    <Icons.Sparkles className="text-blue-600" size={28} /> 
                    AI Practice Modes
                 </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                      { id: 'conversation', name: 'Conversation AI', desc: 'Real-time voice practice with an AI Avatar.', icon: Icons.Headphones, gradient: 'from-indigo-500 to-indigo-600', bgGradient: 'from-indigo-50 to-indigo-100', emoji: '🎧' },
                      { id: 'story', name: 'Story Mode', desc: 'Listen, retell, and answer guided questions.', icon: Icons.BookOpen, gradient: 'from-violet-500 to-violet-600', bgGradient: 'from-violet-50 to-violet-100', emoji: '📖' },
                      { id: 'reading', name: 'Reading Mode', desc: 'Improve comprehension & pronunciation.', icon: Icons.Eye, gradient: 'from-teal-500 to-teal-600', bgGradient: 'from-teal-50 to-teal-100', emoji: '👁️' },
                      { id: 'pdf', name: 'PDF Practice', desc: 'Practice with your own documents.', icon: Icons.UploadCloud, gradient: 'from-orange-500 to-orange-600', bgGradient: 'from-orange-50 to-orange-100', emoji: '📄' },
                      { id: 'drills', name: 'Quick Drills', desc: '2-5 min fast exercises for vocabulary.', icon: Icons.Zap, gradient: 'from-amber-500 to-amber-600', bgGradient: 'from-amber-50 to-amber-100', emoji: '⚡' },
                  ].map((mode) => (
                      <AnimatedCard 
                        key={mode.id} 
                        onClick={() => onSelectMode(mode.id)}
                        variant="gradient"
                        className="p-6 flex flex-col gap-4 cursor-pointer relative overflow-hidden group"
                      >
                          <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${mode.bgGradient} rounded-full -mr-14 -mt-14 opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>
                          
                          <div className="relative z-10">
                              <div className="flex justify-between items-start mb-4">
                                  <div className={`w-16 h-16 bg-gradient-to-br ${mode.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                      <mode.icon size={28} strokeWidth={2.5} />
                                  </div>
                                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                                      <Icons.ArrowRight size={20} className="text-gray-600 group-hover:text-white transition-colors" />
                                  </div>
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                  <span className="text-2xl">{mode.emoji}</span>
                                  <h4 className="font-black text-gray-900 text-lg">{mode.name}</h4>
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed font-medium">{mode.desc}</p>
                          </div>
                      </AnimatedCard>
                  ))}
              </div>
          </div>
      </div>
  );
};

const HumanTutorsList: React.FC<{ onSelect: () => void }> = ({ onSelect }) => {
  const humanTutors = [
    { id: 1, name: 'Sarah Ahmed', role: 'Business English', rating: 4.9, reviews: 120, image: 'https://picsum.photos/100/100?random=20', status: 'online', emoji: '💼' },
    { id: 2, name: 'Omar Hassan', role: 'Pronunciation', rating: 4.8, reviews: 95, image: 'https://picsum.photos/100/100?random=21', status: 'offline', emoji: '🎭' },
    { id: 3, name: 'Fatima Al-Sayed', role: 'IELTS Prep', rating: 5.0, reviews: 80, image: 'https://picsum.photos/100/100?random=22', status: 'busy', emoji: '🎓' },
    { id: 4, name: 'John Smith', role: 'Conversation', rating: 4.7, reviews: 210, image: 'https://picsum.photos/100/100?random=23', status: 'online', emoji: '🗣️' },
    { id: 5, name: 'Emma Watson', role: 'Beginner Friendly', rating: 4.9, reviews: 150, image: 'https://picsum.photos/100/100?random=24', status: 'online', emoji: '🌱' },
    { id: 6, name: 'Liam Neeson', role: 'Advanced Grammar', rating: 4.6, reviews: 60, image: 'https://picsum.photos/100/100?random=25', status: 'offline', emoji: '✅' },
  ];

  return (
      <div className="space-y-8 animate-slideUp">
           {/* Search Bar */}
           <div className="relative">
                <Icons.Search className="absolute left-5 top-4 text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Search by name or specialty" 
                    className="w-full bg-white border-2 border-gray-200 rounded-2xl pl-14 pr-6 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all shadow-sm text-gray-900 font-medium hover:border-gray-300"
                />
           </div>

           {/* Motivational Message */}
           <MotivationalMessage 
             message="Connect with expert tutors for personalized learning! 👩‍🏫✨" 
             variant="supportive"
           />

           {/* Tutor Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {humanTutors.map((tutor) => (
                <AnimatedCard 
                  key={tutor.id} 
                  variant="gradient"
                  onClick={onSelect}
                  className="p-5 cursor-pointer relative overflow-hidden group"
                >
                     <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500"></div>
                     
                     <div className="relative z-10 flex items-start gap-4">
                        <div className="relative shrink-0">
                           <img src={tutor.image} className="w-16 h-16 rounded-2xl object-cover shadow-lg group-hover:scale-110 transition-transform" alt={tutor.name} />
                           <div className={`absolute -bottom-1 -right-1 w-5 h-5 border-2 border-white rounded-full shadow-md ${
                             tutor.status === 'online' ? 'bg-gradient-to-br from-green-400 to-green-600' : 
                             tutor.status === 'busy' ? 'bg-gradient-to-br from-orange-400 to-orange-600' : 
                             'bg-gray-300'
                           } ${tutor.status === 'online' ? 'animate-pulse' : ''}`}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-lg">{tutor.emoji}</span>
                                <h4 className="font-black text-gray-900 text-base truncate">{tutor.name}</h4>
                            </div>
                            <div className="text-sm text-gray-600 mb-2 font-semibold">{tutor.role}</div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 text-xs font-bold text-white bg-gradient-to-r from-amber-400 to-amber-600 px-2 py-1 rounded-lg shadow-gold">
                                    <Icons.Star size={12} fill="currentColor" /> {tutor.rating}
                                </div>
                                <span className="text-xs text-gray-500 font-semibold">{tutor.reviews} reviews</span>
                            </div>
                        </div>
                     </div>
                     <button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover-lift active-press flex items-center justify-center gap-2">
                        <span>Book Session</span>
                        <Icons.Calendar size={16} />
                     </button>
                </AnimatedCard>
              ))}
           </div>
      </div>
  );
};

// --- Main Component ---

const Tutors: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<'ai' | 'human'>('ai');
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [showHumanComingSoon, setShowHumanComingSoon] = useState(false);

  return (
    <GradientBackground variant="multicolor" className="h-full overflow-y-auto flex flex-col pb-24 md:pb-6 custom-scrollbar">
       <FloatingShapes />
       
       {/* Sticky Header with Tabs */}
       <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md pt-6 px-4 md:px-8 pb-4 border-b border-gray-100 shadow-sm animate-slideDown">
           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 max-w-7xl mx-auto">
              <div>
                <h2 className="text-3xl font-black text-gray-900 flex items-center gap-2">
                  🎓 Tutor Hub
                </h2>
                <p className="text-gray-600 font-medium text-sm mt-1">Choose your learning companion</p>
              </div>
              <div className="bg-white p-1.5 rounded-2xl border-2 border-gray-200 shadow-md flex self-start sm:self-auto">
                  <button 
                    onClick={() => { setActiveTab('ai'); setSelectedMode(null); }}
                    className={`px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                      activeTab === 'ai' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                      <Icons.Sparkles size={16} /> AI Tutor
                  </button>
                  <button 
                    onClick={() => { setActiveTab('human'); setShowHumanComingSoon(false); }}
                    className={`px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                      activeTab === 'human' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                      <Icons.Users size={16} /> Human
                  </button>
              </div>
           </div>
       </div>

       <div className="relative z-10 px-4 md:px-8 py-6 flex-1 max-w-7xl mx-auto w-full">
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
    </GradientBackground>
  );
};

export default Tutors;
