
import React, { useState, useEffect, useRef } from 'react';
import * as Icons from '../components/Icons';

interface Message {
  id: number;
  user: string;
  text: string;
  avatar: string;
}

const ActiveRoom: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [userRole, setUserRole] = useState<'audience' | 'speaker'>('audience');
  const [isMuted, setIsMuted] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, user: 'Sarah', text: 'Great point about the phrasal verbs!', avatar: 'https://picsum.photos/100/100?random=1' },
    { id: 2, user: 'Omar', text: 'Can someone explain the difference again?', avatar: 'https://picsum.photos/100/100?random=2' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [reactions, setReactions] = useState<{id: number, icon: string, x: number}[]>([]);

  // Base data
  const baseSpeakers = [
    { id: 1, name: 'Moderator', role: 'Host', isSpeaking: false, isMuted: false, avatar: 'https://picsum.photos/100/100?random=50', isMe: false },
    { id: 3, name: 'John D.', role: 'Speaker', isSpeaking: true, isMuted: false, avatar: 'https://picsum.photos/100/100?random=52', isMe: false },
    { id: 4, name: 'Emily', role: 'Speaker', isSpeaking: false, isMuted: true, avatar: 'https://picsum.photos/100/100?random=55', isMe: false },
    { id: 5, name: 'Michael', role: 'Speaker', isSpeaking: false, isMuted: true, avatar: 'https://picsum.photos/100/100?random=56', isMe: false },
  ];

  const baseListeners = Array.from({ length: 18 }).map((_, i) => ({
    id: i + 10,
    name: `User ${i}`,
    avatar: `https://picsum.photos/100/100?random=${60 + i}`,
    isMe: false
  }));

  // Current User Data
  const currentUser = { id: 999, name: 'You', role: 'Speaker', isSpeaking: false, isMuted: isMuted, avatar: 'https://picsum.photos/100/100?random=8', isMe: true };

  // Derived Lists based on Role
  const displaySpeakers = userRole === 'speaker' ? [...baseSpeakers, currentUser] : baseSpeakers;
  const displayListeners = userRole === 'audience' ? [currentUser, ...baseListeners] : baseListeners;

  useEffect(() => {
    if (showChat) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showChat, messages]);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages([...messages, {
      id: Date.now(),
      user: 'You',
      text: chatInput,
      avatar: 'https://picsum.photos/100/100?random=8'
    }]);
    setChatInput('');
  };

  const triggerReaction = (icon: string) => {
      const id = Date.now();
      const x = Math.random() * 80 + 10; // random position
      setReactions(prev => [...prev, { id, icon, x }]);
      setTimeout(() => {
          setReactions(prev => prev.filter(r => r.id !== id));
      }, 2000);
  };

  const handleHandRaise = () => {
    if (userRole === 'speaker') {
        setIsHandRaised(!isHandRaised);
    } else {
        // Request to speak logic
        setIsHandRaised(true);
        // Simulate moderator accepting request
        setTimeout(() => {
            setUserRole('speaker');
            setIsHandRaised(false);
            setIsMuted(true);
        }, 2000);
    }
  };

  return (
    // Added 'fixed inset-0' and 'overscroll-none' to prevent white background bleed on swipe
    <div className="fixed inset-0 flex flex-col bg-[#0F172A] text-white overflow-hidden font-sans overscroll-none touch-none">
      
      {/* Floating Reactions */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
          {reactions.map(r => (
              <div key={r.id} className="absolute bottom-20 text-4xl animate-[floatUp_2s_ease-out_forwards]" style={{ left: `${r.x}%` }}>
                  {r.icon}
              </div>
          ))}
      </div>

      <style>{`
        @keyframes floatUp {
            0% { transform: translateY(0) scale(0.5); opacity: 1; }
            100% { transform: translateY(-300px) scale(1.5); opacity: 0; }
        }
        @keyframes sound {
            0% { height: 4px; }
            50% { height: 12px; }
            100% { height: 4px; }
        }
      `}</style>

      {/* Top Navigation */}
      <div className="flex items-center justify-between px-4 py-4 z-10 bg-gradient-to-b from-[#0F172A] to-transparent shrink-0">
        <button onClick={onBack} className="p-2 bg-white/5 rounded-full backdrop-blur-md border border-white/10">
            <Icons.ChevronRight className="rotate-180" size={20} />
        </button>
        <div className="flex gap-4">
             <button className="p-2 bg-white/5 rounded-full backdrop-blur-md border border-white/10">
                <Icons.Share2 size={20} />
            </button>
             <button className="p-2 bg-white/5 rounded-full backdrop-blur-md border border-white/10">
                <Icons.MoreVertical size={20} />
            </button>
        </div>
      </div>

      {/* Main Scrollable Area */}
      <div className="flex-1 overflow-y-auto pb-40 px-4 custom-scrollbar overscroll-contain">
        
        {/* Room Info */}
        <div className="mb-6 mt-2">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-green-400 uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Live
                </span>
                <span className="text-xs text-slate-400">• English Practice</span>
            </div>
            <h1 className="text-xl font-bold text-white leading-tight mb-2">Daily Conversation: "Travel & Culture"</h1>
            <p className="text-slate-400 text-sm line-clamp-2">Join us to discuss your favorite travel destinations and cultural experiences. Everyone is welcome to speak!</p>
        </div>

        {/* Stage Grid */}
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Speakers ({displaySpeakers.length})</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
                {displaySpeakers.map(speaker => (
                    <div key={speaker.id} className="flex flex-col items-center">
                        <div className="relative group">
                             {/* Speaking Ring */}
                             {speaker.isSpeaking && (
                                <span className="absolute -inset-1 rounded-[24px] border-2 border-blue-500 animate-pulse"></span>
                             )}
                             
                             <div className={`w-20 h-20 rounded-[20px] overflow-hidden bg-slate-800 relative z-10 ${speaker.isMe ? 'ring-2 ring-blue-500' : ''}`}>
                                <img src={speaker.avatar} alt={speaker.name} className="w-full h-full object-cover" />
                                
                                {/* Mute Badge */}
                                <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-sm p-1 rounded-full">
                                    {speaker.isSpeaking ? (
                                        <div className="flex gap-0.5 items-end h-3 px-1">
                                            <div className="w-0.5 bg-green-400 h-2 animate-[sound_0.5s_ease-in-out_infinite]"></div>
                                            <div className="w-0.5 bg-green-400 h-3 animate-[sound_0.5s_ease-in-out_infinite_0.1s]"></div>
                                            <div className="w-0.5 bg-green-400 h-1.5 animate-[sound_0.5s_ease-in-out_infinite_0.2s]"></div>
                                        </div>
                                    ) : (
                                         <Icons.MicOff size={12} className="text-slate-400" />
                                    )}
                                </div>
                             </div>
                        </div>
                        <span className={`text-xs font-medium mt-2 truncate max-w-[80px] ${speaker.isMe ? 'text-blue-400 font-bold' : 'text-slate-200'}`}>
                            {speaker.name}
                        </span>
                        <span className="text-[10px] text-slate-500">{speaker.role}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Audience Grid */}
        <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Audience ({displayListeners.length})</h3>
            </div>
            <div className="grid grid-cols-5 gap-4">
                {displayListeners.map(listener => (
                    <div key={listener.id} className="flex flex-col items-center">
                         <div className={`w-12 h-12 rounded-[16px] overflow-hidden bg-slate-800 ${listener.isMe ? 'ring-2 ring-blue-500' : ''}`}>
                            <img src={listener.avatar} alt={listener.name} className="w-full h-full object-cover opacity-70" />
                         </div>
                         <span className={`text-[10px] mt-1 truncate w-12 text-center ${listener.isMe ? 'text-blue-400 font-bold' : 'text-slate-400'}`}>
                             {listener.name}
                         </span>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Bottom Controls Dock */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-30 bg-gradient-to-t from-[#0F172A] via-[#0F172A] to-transparent pb-safe">
        
        {/* Reaction Bar */}
        <div className="flex justify-center gap-4 mb-4">
            {['❤️', '👏', '🔥', '😂'].map(emoji => (
                <button 
                    key={emoji}
                    onClick={() => triggerReaction(emoji)}
                    className="w-10 h-10 bg-slate-800/80 backdrop-blur-md rounded-full flex items-center justify-center text-xl hover:scale-110 hover:bg-slate-700 transition-all border border-white/5"
                >
                    {emoji}
                </button>
            ))}
        </div>

        {/* Main Controls */}
        <div className="bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-[32px] p-2 flex items-center justify-between shadow-2xl">
             <button 
                onClick={onBack}
                className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500/20 transition-colors"
            >
                <Icons.LogOut size={20} className="ml-1" />
            </button>

            <div className="flex gap-2">
                 {userRole === 'speaker' ? (
                     <button 
                        onClick={() => setIsMuted(!isMuted)}
                        className={`h-12 px-6 rounded-full flex items-center gap-2 font-bold text-sm transition-all ${
                            !isMuted 
                            ? 'bg-white text-slate-900 shadow-lg shadow-white/10' 
                            : 'bg-slate-700 text-white hover:bg-slate-600'
                        }`}
                    >
                        {isMuted ? <Icons.MicOff size={18} /> : <Icons.Mic size={18} />}
                        {isMuted ? 'Muted' : 'Speaking'}
                    </button>
                 ) : (
                     <button 
                        disabled
                        className="h-12 px-6 rounded-full flex items-center gap-2 font-bold text-sm bg-slate-700/50 text-slate-400 cursor-not-allowed border border-white/5"
                    >
                        <Icons.MicOff size={18} />
                        Listener
                    </button>
                 )}

                <button 
                    onClick={handleHandRaise}
                    className={`h-12 rounded-full flex items-center gap-2 px-4 transition-colors font-bold text-sm ${
                        isHandRaised 
                        ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/20' 
                        : userRole === 'audience' 
                            ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20' // Join Stage Call to Action
                            : 'bg-slate-700 text-slate-300'
                    }`}
                >
                    <Icons.Hand size={20} />
                    {userRole === 'audience' && !isHandRaised && <span>Join Stage</span>}
                    {userRole === 'audience' && isHandRaised && <span>Requested</span>}
                </button>
            </div>

            <button 
                onClick={() => setShowChat(!showChat)}
                className="w-12 h-12 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center hover:bg-slate-600 relative"
            >
                <Icons.MessageSquare size={20} />
                <span className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full border border-slate-700"></span>
            </button>
        </div>
      </div>

       {/* Chat Drawer */}
      <div 
        className={`fixed inset-x-0 bottom-0 bg-white rounded-t-[32px] z-40 transition-transform duration-300 ease-out shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col h-[70vh] ${showChat ? 'translate-y-0' : 'translate-y-full'}`}
      >
          {/* Handle */}
          <div className="w-full flex justify-center pt-3 pb-1" onClick={() => setShowChat(false)}>
              <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
          </div>

          <div className="px-6 py-2 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-gray-900 font-bold text-lg">Live Chat</h3>
              <button onClick={() => setShowChat(false)} className="bg-gray-100 p-2 rounded-full">
                  <Icons.X size={20} className="text-gray-500" />
              </button>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 ${msg.user === 'You' ? 'flex-row-reverse' : ''}`}>
                      <img src={msg.avatar} alt={msg.user} className="w-8 h-8 rounded-full object-cover" />
                      <div className={`flex flex-col ${msg.user === 'You' ? 'items-end' : 'items-start'}`}>
                          <span className="text-[10px] text-gray-500 mb-1 px-1">{msg.user}</span>
                          <div className={`px-4 py-2.5 rounded-2xl text-sm max-w-[260px] shadow-sm ${msg.user === 'You' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'}`}>
                              {msg.text}
                          </div>
                      </div>
                  </div>
              ))}
              <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100 pb-safe">
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-2 pr-2 pl-4 border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                  <input 
                    type="text" 
                    placeholder="Join the conversation..." 
                    className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder-gray-500"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <button 
                    onClick={sendMessage}
                    className={`p-2 rounded-full transition-all duration-200 ${chatInput.trim() ? 'bg-blue-600 text-white scale-100' : 'bg-gray-200 text-gray-400 scale-90'}`}
                  >
                      <Icons.Send size={16} />
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ActiveRoom;
