
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
      const x = Math.random() * 80 + 10;
      setReactions(prev => [...prev, { id, icon, x }]);
      setTimeout(() => {
          setReactions(prev => prev.filter(r => r.id !== id));
      }, 2000);
  };

  const handleHandRaise = () => {
    if (userRole === 'speaker') {
        setIsHandRaised(!isHandRaised);
    } else {
        setIsHandRaised(true);
        setTimeout(() => {
            setUserRole('speaker');
            setIsHandRaised(false);
            setIsMuted(true);
        }, 2000);
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      
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

      {/* Header */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md p-4 flex items-center justify-between shadow-lg shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-purple-50 rounded-xl transition-all active:scale-95">
          <Icons.ChevronRight className="rotate-180 text-gray-700" size={24} strokeWidth={3} />
        </button>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-purple-50 rounded-xl transition-all active:scale-95">
            <Icons.Share2 size={20} className="text-gray-700" strokeWidth={2.5} />
          </button>
          <button className="p-2 hover:bg-purple-50 rounded-xl transition-all active:scale-95">
            <Icons.MoreVertical size={20} className="text-gray-700" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pb-40">
        <div className="p-6 space-y-6">
          
          {/* Room Info Card */}
          <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-600 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg"></span>
                <span className="text-xs font-bold text-white">LIVE</span>
              </span>
              <span className="text-xs font-semibold text-white/90">English Practice</span>
            </div>
            <h1 className="text-2xl font-black text-white mb-2 drop-shadow-lg">Daily Conversation: "Travel & Culture"</h1>
            <p className="text-white/90 text-sm font-medium">Join us to discuss your favorite travel destinations and cultural experiences!</p>
          </div>

          {/* Speakers Section */}
          <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-gray-900">🎤 Speakers ({displaySpeakers.length})</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {displaySpeakers.map(speaker => (
                  <div key={speaker.id} className="bg-white/95 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center shadow-lg border border-purple-100">
                    <div className="relative mb-3">
                      {speaker.isSpeaking && (
                        <span className="absolute -inset-1 rounded-full border-2 border-green-500 animate-pulse"></span>
                      )}
                      <div className={`w-16 h-16 rounded-full overflow-hidden bg-gray-200 relative z-10 ${speaker.isMe ? 'ring-2 ring-purple-500' : ''}`}>
                        <img src={speaker.avatar} alt={speaker.name} className="w-full h-full object-cover" />
                        
                        {/* Status Badge */}
                        <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-lg">
                          {speaker.isSpeaking ? (
                            <div className="flex gap-0.5 items-end h-3 px-1">
                              <div className="w-0.5 bg-green-500 h-2 animate-[sound_0.5s_ease-in-out_infinite]"></div>
                              <div className="w-0.5 bg-green-500 h-3 animate-[sound_0.5s_ease-in-out_infinite_0.1s]"></div>
                              <div className="w-0.5 bg-green-500 h-1.5 animate-[sound_0.5s_ease-in-out_infinite_0.2s]"></div>
                            </div>
                          ) : (
                            <Icons.MicOff size={12} className="text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs font-bold truncate max-w-full text-center ${speaker.isMe ? 'text-purple-600' : 'text-gray-900'}`}>
                      {speaker.name}
                    </span>
                    <span className="text-[10px] text-gray-500 font-semibold">{speaker.role}</span>
                  </div>
                ))}
              </div>
            </div>

          {/* Audience Section */}
          <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-gray-900">👥 Audience ({displayListeners.length})</h3>
              </div>
              
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-blue-100">
                <div className="grid grid-cols-5 gap-3">
                  {displayListeners.slice(0, 10).map(listener => (
                    <div key={listener.id} className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full overflow-hidden bg-gray-200 ${listener.isMe ? 'ring-2 ring-purple-500' : ''}`}>
                        <img src={listener.avatar} alt={listener.name} className="w-full h-full object-cover" />
                      </div>
                      <span className={`text-[9px] mt-1 truncate w-12 text-center font-semibold ${listener.isMe ? 'text-purple-600' : 'text-gray-500'}`}>
                        {listener.name}
                      </span>
                    </div>
                  ))}
                </div>
                {displayListeners.length > 10 && (
                  <div className="mt-3 text-center text-sm text-gray-500 font-semibold">
                    +{displayListeners.length - 10} more listening
                  </div>
                )}
              </div>
            </div>

        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-30 bg-gradient-to-t from-white via-white to-transparent">
        
        {/* Reaction Bar */}
        <div className="flex justify-center gap-3 mb-4">
          {['❤️', '👏', '🔥', '😂'].map(emoji => (
            <button 
              key={emoji}
              onClick={() => triggerReaction(emoji)}
              className="w-12 h-12 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center text-xl hover:scale-110 transition-all shadow-lg border border-purple-100 active:scale-95"
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Main Controls */}
        <div className="bg-white/95 backdrop-blur-md border-2 border-purple-200 rounded-3xl p-3 flex items-center justify-between shadow-2xl">
          <button 
            onClick={onBack}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 text-white flex items-center justify-center hover:scale-110 transition-all shadow-lg active:scale-95"
          >
            <Icons.LogOut size={20} strokeWidth={2.5} />
          </button>

          <div className="flex gap-2">
            {userRole === 'speaker' ? (
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`h-12 px-6 rounded-full flex items-center gap-2 font-bold text-sm transition-all shadow-lg active:scale-95 ${
                  !isMuted 
                    ? 'bg-gradient-to-br from-green-400 to-green-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isMuted ? <Icons.MicOff size={18} strokeWidth={2.5} /> : <Icons.Mic size={18} strokeWidth={2.5} />}
                {isMuted ? 'Muted' : 'Speaking'}
              </button>
            ) : (
              <button 
                disabled
                className="h-12 px-6 rounded-full flex items-center gap-2 font-bold text-sm bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
              >
                <Icons.MicOff size={18} strokeWidth={2.5} />
                Listener
              </button>
            )}

            <button 
              onClick={handleHandRaise}
              className={`h-12 rounded-full flex items-center gap-2 px-5 transition-all font-bold text-sm shadow-lg active:scale-95 ${
                isHandRaised 
                  ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' 
                  : userRole === 'audience' 
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:scale-105' 
                    : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Icons.Hand size={20} strokeWidth={2.5} />
              {userRole === 'audience' && !isHandRaised && <span>Join Stage</span>}
              {userRole === 'audience' && isHandRaised && <span>Requested</span>}
            </button>
          </div>

          <button 
            onClick={() => setShowChat(!showChat)}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center hover:scale-110 transition-all shadow-lg relative active:scale-95"
          >
            <Icons.MessageCircle size={20} strokeWidth={2.5} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>

      {/* Chat Drawer */}
      <div 
        className={`fixed inset-x-0 bottom-0 bg-white rounded-t-3xl z-40 transition-transform duration-300 ease-out shadow-2xl flex flex-col h-[70vh] ${showChat ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {/* Handle */}
        <div className="w-full flex justify-center pt-3 pb-1 cursor-pointer" onClick={() => setShowChat(false)}>
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-gray-900 font-black text-lg">💬 Live Chat</h3>
          <button onClick={() => setShowChat(false)} className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors active:scale-95">
            <Icons.X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 custom-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.user === 'You' ? 'flex-row-reverse' : ''}`}>
              <img src={msg.avatar} alt={msg.user} className="w-8 h-8 rounded-full object-cover" />
              <div className={`flex flex-col ${msg.user === 'You' ? 'items-end' : 'items-start'}`}>
                <span className="text-[10px] text-gray-500 mb-1 px-1 font-semibold">{msg.user}</span>
                <div className={`px-4 py-2.5 rounded-2xl text-sm max-w-[260px] shadow-sm ${msg.user === 'You' ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'}`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-2 pr-2 pl-4 border border-gray-200 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
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
              className={`p-2.5 rounded-full transition-all duration-200 ${chatInput.trim() ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white scale-100 shadow-lg' : 'bg-gray-200 text-gray-400 scale-90'}`}
            >
              <Icons.Send size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveRoom;
