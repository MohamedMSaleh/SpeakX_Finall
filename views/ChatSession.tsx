
import React, { useState, useRef, useEffect } from 'react';
import * as Icons from '../components/Icons';
import { sendMessage } from '../services/geminiService';
import { ChatMessage } from '../types';
import { GradientBackground, FloatingShapes } from '../components/AnimatedComponents';

const ChatSession: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      type: 'text',
      text: "Welcome to SpeakX! I'm here to help you practice your English. To start, please tell me about your day.",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  // Attachments State
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  // Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordedAudio, setRecordedAudio] = useState<boolean>(false); // Simulating an audio blob presence
  const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const emojis = ['😀', '😂', '😍', '🥺', '😎', '😭', '😡', '👍', '👎', '🔥', '✨', '❤️', '🤔', '🎉', '👋', '🙏', '👀', '💯'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Handle Recording Timer
  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    }
    return () => {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    };
  }, [isRecording]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      type: 'text',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setShowEmojiPicker(false);
    setShowAttachMenu(false);
    setIsLoading(true);

    try {
      const responseText = await sendMessage(inputText);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        type: 'text',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      // Error handling
    } finally {
      setIsLoading(false);
    }
  };

  // --- Audio Recording Handlers ---
  const startRecording = () => {
    setIsRecording(true);
    setRecordedAudio(false);
    setRecordingDuration(0);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordedAudio(true);
  };

  const cancelRecording = () => {
    setIsRecording(false);
    setRecordedAudio(false);
    setRecordingDuration(0);
  };

  const sendRecording = () => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      type: 'audio',
      text: 'Audio Message',
      audioUrl: 'simulated_audio_url', // In a real app, this would be a blob URL
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setRecordedAudio(false);
    setRecordingDuration(0);

    // Simulate AI Response to Audio
    setIsLoading(true);
    setTimeout(() => {
        const aiMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            type: 'text',
            text: "That sounded great! Your intonation is improving.",
            timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMsg]);
        setIsLoading(false);
    }, 2000);
  };

  // --- Attachment Handlers ---
  const handleAttachment = (type: 'image' | 'file') => {
      setShowAttachMenu(false);
      const id = Date.now().toString();
      
      if (type === 'image') {
          const msg: ChatMessage = {
              id,
              role: 'user',
              type: 'image',
              text: 'Photo',
              imageUrl: 'https://picsum.photos/400/300?random=' + id,
              timestamp: new Date()
          };
          setMessages(prev => [...prev, msg]);
      } else {
          const msg: ChatMessage = {
              id,
              role: 'user',
              type: 'file',
              text: 'Homework_Assignment.pdf',
              fileUrl: '#',
              timestamp: new Date()
          };
          setMessages(prev => [...prev, msg]);
      }

      // Simulate AI processing attachment
      setIsLoading(true);
      setTimeout(() => {
        const aiMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            type: 'text',
            text: type === 'image' ? "I see you shared a photo! It looks like a nice park." : "I've received your document. I'll review it shortly.",
            timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMsg]);
        setIsLoading(false);
    }, 1500);
  };

  const addEmoji = (emoji: string) => {
    setInputText(prev => prev + emoji);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-gray-200 sticky top-0 z-10 shadow-sm shrink-0">
        <button onClick={onBack} className="text-gray-600">
          <Icons.ChevronRight size={24} className="rotate-180" />
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
           <img src="https://picsum.photos/100/100?random=10" alt="AI Avatar" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-sm">Alex - AI Coach</h3>
          <div className="text-xs text-green-600 font-medium">Online</div>
        </div>
        <div className="ml-auto">
          <Icons.MoreVertical className="text-gray-500" size={20} />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-32 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                 <img src="https://picsum.photos/100/100?random=10" alt="AI" />
              </div>
            )}
            
            <div className={`max-w-[80%] rounded-2xl shadow-sm overflow-hidden ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-gray-200 text-gray-800 rounded-bl-none'
            }`}>
              
              {/* Text Message */}
              {(!msg.type || msg.type === 'text') && (
                  <div className="p-4 text-sm leading-relaxed">{msg.text}</div>
              )}

              {/* Audio Message */}
              {msg.type === 'audio' && (
                  <div className="p-3 flex items-center gap-3 min-w-[200px]">
                      <button className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-white text-blue-600' : 'bg-gray-700 text-white'}`}>
                          <Icons.Play size={14} fill="currentColor" />
                      </button>
                      <div className="flex-1">
                          <div className={`h-1 rounded-full overflow-hidden ${msg.role === 'user' ? 'bg-blue-400' : 'bg-gray-400'}`}>
                               <div className={`h-full w-1/2 ${msg.role === 'user' ? 'bg-white' : 'bg-gray-600'}`}></div>
                          </div>
                          <div className={`text-[10px] mt-1 font-medium ${msg.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>0:05</div>
                      </div>
                  </div>
              )}

              {/* Image Message */}
              {msg.type === 'image' && (
                  <div className="p-1">
                      <img src={msg.imageUrl} alt="Shared" className="rounded-xl w-full h-auto max-h-60 object-cover" />
                  </div>
              )}

              {/* File Message */}
              {msg.type === 'file' && (
                  <div className="p-3 flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${msg.role === 'user' ? 'bg-blue-500' : 'bg-gray-300'}`}>
                          <Icons.FileText size={20} className={msg.role === 'user' ? 'text-white' : 'text-gray-600'} />
                      </div>
                      <div>
                          <div className="text-xs font-bold truncate max-w-[150px]">{msg.text}</div>
                          <div className={`text-[10px] ${msg.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>PDF Document</div>
                      </div>
                  </div>
              )}

            </div>

             {msg.role === 'user' && (
               <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Icons.User size={16} />
               </div>
             )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 bg-gray-100"></div>
             <div className="bg-gray-200 p-3 rounded-2xl rounded-bl-none flex gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
             </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 border-t border-gray-100 fixed bottom-0 left-0 right-0 max-w-md mx-auto shrink-0 z-20">
        
        {/* Emoji Picker */}
        {showEmojiPicker && (
            <div className="absolute bottom-full left-4 mb-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 w-64 animate-in fade-in zoom-in-95 duration-200 z-30">
                <div className="grid grid-cols-6 gap-2">
                    {emojis.map((emoji) => (
                        <button 
                            key={emoji} 
                            onClick={() => addEmoji(emoji)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg text-lg transition-colors"
                        >
                            {emoji}
                        </button>
                    ))}
                </div>
            </div>
        )}

        {/* Attachment Menu */}
        {showAttachMenu && (
             <div className="absolute bottom-20 left-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 flex flex-col gap-1 w-48 animate-in slide-in-from-bottom-5 duration-200 z-30">
                 <button 
                    onClick={() => handleAttachment('image')}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-xl transition-colors text-gray-700 text-sm font-medium"
                 >
                     <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center"><Icons.Image size={16} /></div>
                     Image
                 </button>
                 <button 
                    onClick={() => handleAttachment('file')}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-xl transition-colors text-gray-700 text-sm font-medium"
                 >
                     <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><Icons.FileText size={16} /></div>
                     Document
                 </button>
                 <button 
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-xl transition-colors text-gray-700 text-sm font-medium"
                 >
                     <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><Icons.MapPin size={16} /></div>
                     Location
                 </button>
             </div>
        )}

        {/* Input Controls */}
        <div className="flex items-center gap-3">
          
          {/* Recording Mode UI */}
          {isRecording ? (
             <div className="flex-1 bg-red-50 rounded-full px-4 py-3 flex items-center justify-between border border-red-100 animate-pulse">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce"></div>
                   <span className="text-red-600 font-mono font-bold text-sm">{formatDuration(recordingDuration)}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-red-400 font-medium">Recording...</span>
                </div>
             </div>
          ) : recordedAudio ? (
             <div className="flex-1 bg-gray-100 rounded-full px-4 py-3 flex items-center gap-3 border border-gray-200">
                 <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                     <Icons.Play size={14} fill="currentColor" />
                 </button>
                 <div className="flex-1 h-1 bg-gray-300 rounded-full overflow-hidden">
                     <div className="w-1/3 h-full bg-blue-600"></div>
                 </div>
                 <span className="text-xs font-mono text-gray-500">{formatDuration(recordingDuration)}</span>
                 <button onClick={cancelRecording} className="text-gray-400 hover:text-red-500">
                     <Icons.Trash2 size={18} />
                 </button>
             </div>
          ) : (
             <>
                 <button 
                    onClick={() => setShowAttachMenu(!showAttachMenu)}
                    className={`transition-colors ${showAttachMenu ? 'text-blue-600 rotate-45' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <Icons.Plus size={24} />
                 </button>
                 
                 <div className="flex-1 bg-gray-100 rounded-full px-4 py-3 flex items-center gap-2 border border-transparent focus-within:border-blue-200 focus-within:bg-white transition-all">
                    <input 
                        type="text" 
                        className="bg-transparent flex-1 outline-none text-sm text-gray-900" 
                        placeholder="Type a message..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button 
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)} 
                        className={`transition-colors ${showEmojiPicker ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <Icons.Smile size={20} />
                    </button>
                 </div>
             </>
          )}

          {/* Action Button (Mic/Stop/Send) */}
          <button 
            onClick={() => {
                if (isRecording) {
                    stopRecording();
                } else if (recordedAudio) {
                    sendRecording();
                } else if (inputText) {
                    handleSend();
                } else {
                    startRecording();
                }
            }}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform ${
                isRecording 
                ? 'bg-red-500 text-white scale-110' 
                : recordedAudio
                    ? 'bg-blue-600 text-white hover:scale-105'
                    : inputText 
                        ? 'bg-blue-600 text-white hover:scale-105' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
             {isRecording ? (
                 <Icons.Square size={16} fill="currentColor" />
             ) : recordedAudio ? (
                 <Icons.Send size={20} className="ml-0.5" />
             ) : inputText ? (
                 <Icons.Send size={20} className="ml-0.5" />
             ) : (
                 <Icons.Mic size={24} />
             )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSession;
