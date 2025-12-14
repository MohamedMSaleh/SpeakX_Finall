
import React from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';
import { GradientBackground, FloatingShapes, AnimatedCard, MotivationalMessage } from '../components/AnimatedComponents';

const Rooms: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  const rooms = [
    { id: 1, name: 'Daily Conversation', level: 'All Levels', members: 12, active: 5, image: 'https://picsum.photos/100/100?random=30', emoji: '💬' },
    { id: 2, name: 'Business Talk', level: 'Advanced', members: 8, active: 3, image: 'https://picsum.photos/100/100?random=31', emoji: '💼' },
    { id: 3, name: 'Beginner Friendly', level: 'Beginner', members: 25, active: 10, image: 'https://picsum.photos/100/100?random=32', emoji: '🌱' },
    { id: 4, name: 'Debate Club', level: 'Intermediate', members: 15, active: 6, image: 'https://picsum.photos/100/100?random=33', emoji: '🎤' },
    { id: 5, name: 'IELTS Prep', level: 'Advanced', members: 30, active: 12, image: 'https://picsum.photos/100/100?random=34', emoji: '🎓' },
    { id: 6, name: 'Casual Friday', level: 'Intermediate', members: 20, active: 8, image: 'https://picsum.photos/100/100?random=35', emoji: '🎉' },
  ];

  return (
    <GradientBackground variant="multicolor" className="h-full overflow-y-auto pb-24 md:pb-6 custom-scrollbar">
      <FloatingShapes />
      <div className="relative z-10 p-4 md:p-8 space-y-6">
        <div className="flex justify-between items-end max-w-7xl mx-auto w-full animate-slideDown">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-2 flex items-center gap-2">
              🗣️ Practice Rooms
            </h2>
            <p className="text-gray-600 font-medium">Connect & speak with learners worldwide</p>
          </div>
          <button 
            onClick={() => setView(View.CREATE_ROOM)}
            className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white flex items-center justify-center shadow-xl shadow-blue-200 hover-lift active-press"
          >
             <Icons.Plus size={26} strokeWidth={3} />
          </button>
       </div>

       <div className="max-w-7xl mx-auto w-full space-y-8">
           {/* Motivational Message */}
           <div className="animate-slideUp">
             <MotivationalMessage 
               message="Practice makes perfect! Join a room and boost your confidence 🚀" 
               variant="encouraging"
             />
           </div>

           {/* Quick Start Card */}
           <AnimatedCard 
            onClick={() => setView(View.ACTIVE_ROOM)}
            variant="glow"
            className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 p-6 md:p-8 cursor-pointer relative overflow-hidden animate-slideUp"
           >
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 animate-float"></div>
               <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl -ml-20 -mb-20 animate-floatSlow"></div>
               
               <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                   <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border-2 border-white/30 text-white shrink-0 shadow-2xl animate-float">
                       <Icons.Mic size={36} strokeWidth={2.5} />
                   </div>
                   <div className="flex-1 text-center sm:text-left text-white">
                       <h3 className="text-2xl md:text-3xl font-black mb-2">🎯 Start Instant Room</h3>
                       <p className="text-purple-100 font-medium">Match with a partner for 5 mins of focused speaking!</p>
                   </div>
                   <button className="bg-white text-purple-700 px-8 py-4 rounded-2xl font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto">
                       Start Now ✨
                   </button>
               </div>
           </AnimatedCard>

           <div className="animate-slideUp">
               <div className="flex items-center justify-between mb-5">
                   <h3 className="font-black text-gray-900 text-xl">Active Communities</h3>
                   <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                       {rooms.length} rooms available
                   </span>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                   {rooms.map(room => (
                       <AnimatedCard 
                        key={room.id} 
                        onClick={() => setView(View.ACTIVE_ROOM)}
                        variant="gradient"
                        className="p-5 flex flex-col gap-4 cursor-pointer relative overflow-hidden"
                       >
                           <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 animate-float"></div>
                           
                           <div className="relative z-10 flex items-start gap-4">
                               <div className="relative shrink-0">
                                   <img src={room.image} className="w-16 h-16 rounded-2xl object-cover shadow-lg" alt={room.name} />
                                   <div className="absolute -top-2 -right-2 bg-gradient-to-br from-green-400 to-green-600 px-2 py-1 rounded-xl shadow-lg flex items-center gap-1 animate-bounce">
                                       <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                       <span className="text-[10px] font-black text-white">{room.active}</span>
                                   </div>
                               </div>
                               <div className="flex-1 min-w-0">
                                   <div className="flex items-center gap-2 mb-1">
                                       <span className="text-lg">{room.emoji}</span>
                                       <h4 className="font-black text-gray-900 text-base truncate">{room.name}</h4>
                                   </div>
                                   <span className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-2 py-1 rounded-lg font-bold inline-block mb-2">
                                       {room.level}
                                   </span>
                                   <div className="flex items-center gap-1 text-xs text-gray-600 font-semibold">
                                       <Icons.Users size={14} />
                                       <span>{room.members} members</span>
                                   </div>
                               </div>
                           </div>
                           <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover-lift active-press flex items-center justify-center gap-2">
                               <span>Join Room</span>
                               <Icons.ArrowRight size={16} />
                           </button>
                       </AnimatedCard>
                   ))}
               </div>
           </div>
       </div>
      </div>
    </GradientBackground>
  );
};

export default Rooms;
