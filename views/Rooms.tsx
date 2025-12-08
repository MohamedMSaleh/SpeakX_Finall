
import React from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';

const Rooms: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  const rooms = [
    { id: 1, name: 'Daily Conversation', level: 'All Levels', members: 12, active: 5, image: 'https://picsum.photos/100/100?random=30' },
    { id: 2, name: 'Business Talk', level: 'Advanced', members: 8, active: 3, image: 'https://picsum.photos/100/100?random=31' },
    { id: 3, name: 'Beginner Friendly', level: 'Beginner', members: 25, active: 10, image: 'https://picsum.photos/100/100?random=32' },
    { id: 4, name: 'Debate Club', level: 'Intermediate', members: 15, active: 6, image: 'https://picsum.photos/100/100?random=33' },
    { id: 5, name: 'IELTS Prep', level: 'Advanced', members: 30, active: 12, image: 'https://picsum.photos/100/100?random=34' },
    { id: 6, name: 'Casual Friday', level: 'Intermediate', members: 20, active: 8, image: 'https://picsum.photos/100/100?random=35' },
  ];

  return (
    <div className="h-full overflow-y-auto p-4 md:p-8 space-y-6 pb-24 md:pb-6 custom-scrollbar">
        <div className="flex justify-between items-end max-w-7xl mx-auto w-full">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Practice Rooms</h2>
            <p className="text-gray-500 text-sm mt-1">Join a community to practice with real people</p>
          </div>
          <button 
            onClick={() => setView(View.CREATE_ROOM)}
            className="w-12 h-12 bg-blue-600 rounded-full text-white flex items-center justify-center shadow-lg shadow-blue-200 hover:scale-105 transition-transform hover:bg-blue-700"
          >
             <Icons.Plus size={24} />
          </button>
       </div>

       <div className="max-w-7xl mx-auto w-full space-y-8">
           {/* Quick Start Card */}
           <div 
            onClick={() => setView(View.ACTIVE_ROOM)}
            className="bg-purple-50 rounded-3xl p-6 md:p-8 border border-purple-100 flex flex-col sm:flex-row items-center gap-6 cursor-pointer hover:bg-purple-100 transition-colors"
           >
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-purple-600 shrink-0">
                   <Icons.Mic size={32} />
               </div>
               <div className="flex-1 text-center sm:text-left">
                   <h3 className="text-xl font-bold text-gray-900">Start Instant Room</h3>
                   <p className="text-gray-500 text-sm mt-1">Match with a partner for 5 mins of focused speaking practice.</p>
               </div>
               <button className="bg-purple-600 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg shadow-purple-200 hover:bg-purple-700 transition-colors w-full sm:w-auto">
                   Start Now
               </button>
           </div>

           <div>
               <h3 className="font-bold text-gray-900 text-lg mb-4">Active Communities</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                   {rooms.map(room => (
                       <div 
                        key={room.id} 
                        onClick={() => setView(View.ACTIVE_ROOM)}
                        className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all cursor-pointer h-full"
                       >
                           <div className="relative shrink-0">
                               <img src={room.image} className="w-16 h-16 rounded-2xl object-cover" alt={room.name} />
                               <div className="absolute -top-2 -right-2 bg-white px-2 py-0.5 rounded-full border border-gray-100 shadow-sm flex items-center gap-1">
                                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                   <span className="text-[10px] font-bold text-gray-600">{room.active}</span>
                               </div>
                           </div>
                           <div className="flex-1 min-w-0">
                               <h4 className="font-bold text-gray-900 text-lg truncate">{room.name}</h4>
                               <div className="flex items-center gap-2 mb-1">
                                   <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium">{room.level}</span>
                               </div>
                               <div className="text-xs text-gray-400">{room.members} members joined</div>
                           </div>
                           <button className="bg-gray-50 text-gray-400 p-2 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors">
                               <Icons.ChevronRight size={20} /> 
                           </button>
                       </div>
                   ))}
               </div>
           </div>
       </div>
    </div>
  );
};

export default Rooms;
