
import React, { useState } from 'react';
import * as Icons from '../components/Icons';
import { GradientBackground, FloatingShapes, AnimatedCard, AnimatedBadge } from '../components/AnimatedComponents';

const TutorBooking: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'booking' | 'submissions'>('booking');
  const [selectedDate, setSelectedDate] = useState(5);
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  
  const dates = [
    { day: 'S', date: 4, active: false },
    { day: 'M', date: 5, active: true }, // Aug 5
    { day: 'T', date: 6, active: false },
    { day: 'W', date: 7, active: false },
    { day: 'T', date: 8, active: false },
    { day: 'F', date: 9, active: false },
    { day: 'S', date: 10, active: false },
  ];

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
       <GradientBackground variant="purple" />
       <FloatingShapes />
       
       <div className="relative z-10 bg-white/80 backdrop-blur-md flex items-center gap-2 shadow-sm px-2 py-2 shrink-0">
          <button onClick={onBack} className="p-3"><Icons.ChevronRight className="rotate-180 text-gray-600" size={24} /></button>
          <h2 className="font-bold text-gray-900 text-lg">Human Feedback</h2>
       </div>

       {/* Tabs */}
       <div className="bg-white flex px-4 border-b border-gray-200 shrink-0">
           <button 
            onClick={() => setActiveTab('booking')}
            className={`flex-1 py-3 text-sm font-bold border-b-2 ${activeTab === 'booking' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent'}`}
           >
            Book a Live Session
           </button>
           <button 
            onClick={() => setActiveTab('submissions')}
            className={`flex-1 py-3 text-sm font-bold border-b-2 ${activeTab === 'submissions' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent'}`}
           >
            My Submissions
           </button>
       </div>

       <div className="p-5 space-y-6 pb-24 flex-1 overflow-y-auto custom-scrollbar relative z-10">
          <p className="text-gray-600 text-sm">📅 Choose a tutor and a time that works for you.</p>

          {/* Calendar Strip */}
          <AnimatedCard variant="white">
             <div className="flex justify-between items-center mb-4">
                 <button><Icons.ChevronRight className="rotate-180 text-gray-400" size={20} /></button>
                 <span className="font-bold text-gray-900">August 2024</span>
                 <button><Icons.ChevronRight className="text-gray-400" size={20} /></button>
             </div>
             <div className="flex justify-between">
                 {dates.map((d) => (
                     <div key={d.date} onClick={() => setSelectedDate(d.date)} className={`flex flex-col items-center gap-2 cursor-pointer transition-all`}>
                         <span className="text-xs text-gray-400 font-medium">{d.day}</span>
                         <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${selectedDate === d.date ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'text-gray-700 hover:bg-gray-100'}`}>
                             {d.date}
                         </div>
                     </div>
                 ))}
             </div>
          </AnimatedCard>

          {/* Tutors */}
          <h3 className="font-bold text-gray-900 text-lg">Available Tutors for August 5</h3>
          <div className="space-y-3">
             <div className="bg-white p-4 rounded-3xl border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
                 <div className="relative">
                    <img src="https://picsum.photos/100/100?random=20" className="w-14 h-14 rounded-full object-cover" alt="Sarah" />
                 </div>
                 <div className="flex-1">
                     <h4 className="font-bold text-gray-900">Sarah Ahmed</h4>
                     <div className="text-xs text-gray-500 mb-1">Business English Expert</div>
                     <div className="flex items-center gap-1 text-xs font-bold text-orange-500">
                         <Icons.Star size={14} fill="currentColor" className="text-orange-400" /> 4.9 <span className="text-gray-400 font-normal">(120)</span>
                     </div>
                 </div>
                 <Icons.ChevronRight className="text-gray-300" />
             </div>
              <div className="bg-orange-50 p-4 rounded-3xl border border-orange-100 flex items-center gap-4 shadow-sm cursor-pointer">
                 <div className="relative">
                    <img src="https://picsum.photos/100/100?random=21" className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" alt="Omar" />
                 </div>
                 <div className="flex-1">
                     <h4 className="font-bold text-gray-900">Omar Hassan</h4>
                     <div className="text-xs text-gray-600 mb-1">Pronunciation Specialist</div>
                     <div className="flex items-center gap-1 text-xs font-bold text-orange-500">
                         <Icons.Star size={14} fill="currentColor" className="text-orange-400" /> 4.8 <span className="text-gray-500 font-normal">(95)</span>
                     </div>
                 </div>
                 <Icons.ChevronRight className="text-gray-400" />
             </div>
          </div>

          {/* Time Slots */}
          <h3 className="font-bold text-gray-900 text-lg">Available Time Slots</h3>
          <div className="grid grid-cols-2 gap-3">
              {['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM'].map((time) => (
                  <button 
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 rounded-xl font-bold text-sm border transition-all ${selectedTime === time ? 'bg-blue-800 text-white border-blue-800 shadow-lg shadow-blue-200' : 'bg-white text-blue-600 border-blue-100 hover:border-blue-300'}`}
                  >
                      {time}
                  </button>
              ))}
          </div>
          
          <div className="h-8"></div> {/* Spacing */}

          <div className="sticky bottom-5">
            <button className="w-full bg-amber-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-orange-200 hover:bg-amber-600 transition-colors">
                Confirm Booking for {selectedTime}
            </button>
          </div>
       </div>
    </div>
  );
};

export default TutorBooking;
