import React, { useState, useRef, useEffect } from 'react';
import * as Icons from '../components/Icons';
import { sendMessage } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatSession: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "Welcome to SpeakX! I'm here to help you practice your English. To start, please tell me about your day.",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const responseText = await sendMessage(inputText);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
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

  const handleMicClick = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate recording start
      setTimeout(() => {
        setIsRecording(false);
        setInputText("Hello! My day has been pretty good. I went to work and then had lunch with a friend.");
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-gray-200 sticky top-0 z-10 shadow-sm">
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
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-32">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                 <img src="https://picsum.photos/100/100?random=10" alt="AI" />
              </div>
            )}
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-blue-700 text-white rounded-br-none' 
                : 'bg-gray-200 text-gray-800 rounded-bl-none'
            }`}>
              {msg.text}
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

        {/* Simulated Audio Recording Message (Static for demo visual) */}
         <div className="flex justify-end items-end gap-2">
             <div className="bg-blue-200 p-3 rounded-2xl rounded-br-none w-64 flex items-center gap-3">
                <button className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <Icons.Play size={16} fill="white" />
                </button>
                <div className="flex-1">
                    <div className="font-bold text-blue-900 text-xs mb-1">My Recording</div>
                    <div className="text-xs text-blue-800">0:07</div>
                </div>
             </div>
             <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Icons.User size={16} />
             </div>
         </div>

         {/* Pronunciation Tip Card within Chat */}
         <div className="bg-red-50 border border-red-100 rounded-xl p-3 max-w-[85%] ml-10 shadow-sm">
            <h4 className="text-red-600 font-bold text-xs mb-1">Pronunciation Tip:</h4>
            <p className="text-gray-700 text-xs">You pronounced "friend" a bit like "frand". Try to emphasize the "e" sound more.</p>
         </div>

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 border-t border-gray-100 fixed bottom-0 left-0 right-0 max-w-md mx-auto">
        {/* Suggestion Chips */}
        <div className="flex gap-2 mb-3 overflow-x-auto hide-scrollbar">
            <button onClick={() => setInputText("Tell me another sentence")} className="whitespace-nowrap bg-blue-50 text-blue-600 text-xs font-bold px-3 py-2 rounded-lg">Tell me another sentence</button>
            <button onClick={() => setInputText("Can you explain?")} className="whitespace-nowrap bg-blue-50 text-blue-600 text-xs font-bold px-3 py-2 rounded-lg">Can you explain?</button>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-gray-400"><Icons.Plus size={24} /></button>
          <div className="flex-1 bg-gray-100 rounded-full px-4 py-3 flex items-center gap-2">
            <input 
                type="text" 
                className="bg-transparent flex-1 outline-none text-sm" 
                placeholder="Type your reply..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <Icons.Smile className="text-gray-400" size={20} />
          </div>
          <button 
            onClick={isRecording ? handleMicClick : (inputText ? handleSend : handleMicClick)}
            className={`${isRecording ? 'bg-red-500 animate-pulse' : 'bg-blue-600'} text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg`}
          >
             {inputText ? <Icons.ChevronRight size={24} /> : <Icons.Mic size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSession;