
import React, { useState } from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';

interface Conversation {
    id: number;
    name: string;
    message: string;
    time: string;
    unread: number;
    type: 'ai' | 'human' | 'room' | 'support';
    avatar: string | React.ReactNode;
    isOnline?: boolean;
}

const Conversations: React.FC<{ setView: (view: View) => void, onBack?: () => void }> = ({ setView, onBack }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'AI Tutor' | 'Human' | 'Rooms' | 'Support'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const conversations: Conversation[] = [
      { 
          id: 1, 
          name: 'AI Pronunciation Coach', 
          message: 'Great! Let\'s practice that phrasal verb again.', 
          time: '5m ago', 
          unread: 3, 
          type: 'ai', 
          avatar: (
            <div className="w-full h-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <Icons.User size={24} />
            </div>
          ),
          isOnline: true
      },
      { 
          id: 2, 
          name: 'Tutor: Ahmed', 
          message: 'Your session is confirmed for tomorrow at 10 AM.', 
          time: '1h ago', 
          unread: 1, 
          type: 'human', 
          avatar: 'https://picsum.photos/100/100?random=5' 
      },
      { 
          id: 3, 
          name: 'Practice Room - Level B2', 
          message: 'Mohamed: Who wants to start the debate?', 
          time: 'Yesterday', 
          unread: 0, 
          type: 'room', 
          avatar: (
            <div className="w-full h-full bg-purple-100 text-purple-600 flex items-center justify-center">
                <Icons.Users size={24} />
            </div>
          ) 
      },
      { 
          id: 4, 
          name: 'SpeakX Support', 
          message: 'We\'ve received your inquiry and will respond shortly.', 
          time: '2d ago', 
          unread: 0, 
          type: 'support', 
          avatar: (
            <div className="w-full h-full bg-green-100 text-green-600 flex items-center justify-center">
                <Icons.MessageSquare size={24} />
            </div>
          ) 
      },
      { 
          id: 5, 
          name: 'Tutor: Fatima', 
          message: 'See you next week!', 
          time: '4d ago', 
          unread: 0, 
          type: 'human', 
          avatar: 'https://picsum.photos/100/100?random=6' 
      }
  ];

  // Filtering Logic
  const filteredConversations = conversations.filter(conv => {
      const matchesTab = 
          activeTab === 'All' ? true :
          activeTab === 'AI Tutor' ? conv.type === 'ai' :
          activeTab === 'Human' ? conv.type === 'human' :
          activeTab === 'Rooms' ? conv.type === 'room' :
          activeTab === 'Support' ? conv.type === 'support' : true;

      const matchesSearch = 
          conv.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          conv.message.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
  });

  const handleChatClick = (type: string) => {
      if (type === 'room') {
          setView(View.ACTIVE_ROOM);
      } else {
          setView(View.CHAT_SESSION);
      }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-safe">
        {/* Header (Back button since it's a full page now) */}
        <div className="bg-white p-4 flex items-center gap-4 shadow-sm z-10 sticky top-0">
            {onBack && (
                <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
                    <Icons.ChevronRight className="rotate-180 text-gray-600" size={24} />
                </button>
            )}
            <h2 className="font-bold text-gray-900 text-lg">Chats</h2>
            <div className="ml-auto">
                 <button className="p-2 hover:bg-gray-100 rounded-full text-blue-600">
                     <Icons.Plus size={24} />
                 </button>
            </div>
        </div>

        <div className="p-4 space-y-4 flex-1 overflow-y-auto">
            {/* Search */}
            <div className="relative">
                <Icons.Search className="absolute left-4 top-3 text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Search by name or message" 
                    className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 transition-all shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
                {['All', 'AI Tutor', 'Human', 'Rooms', 'Support'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                            activeTab === tab 
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="space-y-2 pb-20">
                {filteredConversations.length > 0 ? (
                    filteredConversations.map(conv => (
                        <div 
                            key={conv.id}
                            onClick={() => handleChatClick(conv.type)}
                            className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-all cursor-pointer group"
                        >
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                                    {typeof conv.avatar === 'string' ? (
                                        <img src={conv.avatar} alt={conv.name} className="w-full h-full object-cover" />
                                    ) : (
                                        conv.avatar
                                    )}
                                </div>
                                {conv.isOnline && (
                                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                                )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-bold text-gray-900 text-sm truncate">{conv.name}</h4>
                                    <span className={`text-xs ${conv.unread > 0 ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>{conv.time}</span>
                                </div>
                                <p className={`text-xs truncate ${conv.unread > 0 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                                    {conv.message}
                                </p>
                            </div>

                            {conv.unread > 0 && (
                                <div className="flex flex-col items-end justify-center h-12">
                                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold shadow-sm">
                                        {conv.unread}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                            <Icons.MessageSquare size={32} />
                        </div>
                        <p className="text-gray-500 text-sm">No conversations found.</p>
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="mt-2 text-blue-600 text-xs font-bold"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>

        {/* Floating Action Button for New Chat */}
        <button 
            onClick={() => setView(View.CHAT_SESSION)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full shadow-xl shadow-blue-600/40 text-white flex items-center justify-center hover:scale-105 transition-transform z-40"
        >
            <Icons.Plus size={28} />
        </button>
    </div>
  );
};

export default Conversations;
