
import React from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';

const Rooms: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  const rooms = [
    { id: 1, name: 'Daily Conversation', level: 'All Levels', members: 12, active: 5, image: 'https://picsum.photos/100/100?random=30' },
    { id: 2, name: 'Business Talk', level: 'Advanced', members: 8, active: 3, image: 'https://picsum.photos/100/100?random=31' },
    { id: 3, name: 'Beginner Friendly', level: 'Beginner', members: 25, active: 10, image: 'https://picsum.photos/100/100?random=32' },
    { id: 4, name: 'Debate Club', level: 'Intermediate', members: 15, active: 6, image: 'https://picsum.photos/100/100?random=33' },
  ];

  return (
    <div className="h-full overflow-y-auto p-5 space-y-6 pb-24 custom-scrollbar">
        <div className="flex justify-between items-end">
          <h2 className="text-xl font-bold text-gray-900">Practice Rooms</h2>
          <button 
            onClick={() => setView(View.CREATE_ROOM)}
            className="w-10 h-10 bg-blue-600 rounded-full text-white flex items-center justify-center shadow-lg shadow-blue-200 hover:scale-105 transition-transform"
          >
             <Icons.Plus size={24} />
          </button>
       </div>

       {/* Quick Start Card */}
       <div 
        onClick={() => setView(View.ACTIVE_ROOM)}
        className="bg-purple-50 rounded-3xl p-5 border border-purple-100 flex items-center gap-4 cursor-pointer hover:bg-purple-100 transition-colors"
       >
           <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-purple-600">
               <Icons.Mic size={24} />
           </div>
           <div className="flex-1">
               <h3 className="font-bold text-gray-900">Start Instant Room</h3>
               <p className="text-xs text-gray-500">Match with a partner for 5 mins</p>
           </div>
           <button className="bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-purple-200">
               Start
           </button>
       </div>

       <h3 className="font-bold text-gray-900">Active Communities</h3>
       <div className="grid grid-cols-1 gap-4">
           {rooms.map(room => (
               <div 
                key={room.id} 
                onClick={() => setView(View.ACTIVE_ROOM)}
                className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all cursor-pointer"
               >
                   <div className="relative">
                       <img src={room.image} className="w-16 h-16 rounded-2xl object-cover" alt={room.name} />
                       <div className="absolute -top-2 -right-2 bg-white px-2 py-0.5 rounded-full border border-gray-100 shadow-sm flex items-center gap-1">
                           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                           <span className="text-[10px] font-bold text-gray-600">{room.active}</span>
                       </div>
                   </div>
                   <div className="flex-1">
                       <h4 className="font-bold text-gray-900">{room.name}</h4>
                       <div className="flex items-center gap-2 mb-1">
                           <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium">{room.level}</span>
                       </div>
                       <div className="text-xs text-gray-400">{room.members} members joined</div>
                   </div>
                   <button className="bg-gray-50 text-gray-400 p-2 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors">
                       <Icons.ChevronRight size={18} /> 
                   </button>
               </div>
           ))}
       </div>
    </div>
  );
};

export default Rooms;
