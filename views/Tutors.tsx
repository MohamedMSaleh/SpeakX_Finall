
import React from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';

const Tutors: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  const tutors = [
    { id: 1, name: 'Sarah Ahmed', role: 'Business English', rating: 4.9, reviews: 120, image: 'https://picsum.photos/100/100?random=20' },
    { id: 2, name: 'Omar Hassan', role: 'Pronunciation', rating: 4.8, reviews: 95, image: 'https://picsum.photos/100/100?random=21' },
    { id: 3, name: 'Fatima Al-Sayed', role: 'IELTS Prep', rating: 5.0, reviews: 80, image: 'https://picsum.photos/100/100?random=22' },
    { id: 4, name: 'John Smith', role: 'Conversation', rating: 4.7, reviews: 210, image: 'https://picsum.photos/100/100?random=23' },
  ];

  return (
    <div className="h-full overflow-y-auto p-5 space-y-6 pb-24 custom-scrollbar">
       <div className="flex justify-between items-end">
          <h2 className="text-xl font-bold text-gray-900">Find a Tutor</h2>
          <button className="text-blue-600 text-sm font-bold">Filter</button>
       </div>

       {/* Search */}
       <div className="relative">
            <Icons.Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input 
                type="text" 
                placeholder="Search by name or specialty" 
                className="w-full bg-gray-100 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 transition-all"
            />
       </div>

       <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium whitespace-nowrap">All</button>
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium whitespace-nowrap">Business</button>
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium whitespace-nowrap">Pronunciation</button>
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium whitespace-nowrap">Exam Prep</button>
       </div>

       <div className="space-y-4">
          {tutors.map((tutor) => (
            <div key={tutor.id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition-all" onClick={() => setView(View.TUTOR_BOOKING)}>
                 <div className="relative">
                    <img src={tutor.image} className="w-16 h-16 rounded-full object-cover" alt={tutor.name} />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                 </div>
                 <div className="flex-1">
                     <h4 className="font-bold text-gray-900 text-lg">{tutor.name}</h4>
                     <div className="text-sm text-gray-500 mb-1">{tutor.role}</div>
                     <div className="flex items-center gap-3">
                         <div className="flex items-center gap-1 text-xs font-bold text-orange-500">
                             <Icons.Star size={14} fill="currentColor" className="text-orange-400" /> {tutor.rating}
                         </div>
                         <span className="text-xs text-gray-400">({tutor.reviews} reviews)</span>
                     </div>
                 </div>
                 <button className="bg-blue-50 text-blue-600 p-2 rounded-full hover:bg-blue-100">
                    <Icons.ChevronRight size={20} />
                 </button>
            </div>
          ))}
       </div>

       <div className="bg-blue-50 rounded-3xl p-6 mt-4 border border-blue-100 text-center">
          <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-700">
             <Icons.Users size={24} />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Want to become a tutor?</h3>
          <p className="text-sm text-gray-600 mb-4">Join our community of experts and help others learn.</p>
          <button className="text-blue-600 font-bold text-sm">Apply Now</button>
       </div>
    </div>
  );
};

export default Tutors;
