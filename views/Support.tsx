
import React from 'react';
import * as Icons from '../components/Icons';
import { GradientBackground, FloatingShapes, AnimatedCard, MotivationalMessage } from '../components/AnimatedComponents';

const Support: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="h-full flex flex-col pb-24 relative overflow-hidden">
      <GradientBackground variant="green" />
      <FloatingShapes />
      
      <div className="bg-white/95 backdrop-blur-md p-4 flex items-center gap-4 shadow-xl sticky top-0 z-10 shrink-0 border-b-2 border-white/50">
          <button onClick={onBack} className="p-2 hover:bg-green-50 rounded-full transition-all hover-lift">
            <Icons.ChevronRight className="rotate-180 text-gray-700" size={24} strokeWidth={3} />
          </button>
          <h2 className="font-black text-gray-900 text-xl">👫 Help & Support</h2>
      </div>

      <div className="p-6 space-y-6 flex-1 overflow-y-auto custom-scrollbar relative z-10">
          <MotivationalMessage message="We're here to help you succeed! 🚀" />
          
          {/* Search Help */}
          <div className="relative">
              <Icons.Search className="absolute left-5 top-4 text-gray-400" size={22} />
              <input 
                  type="text" 
                  placeholder="How can we help you today?" 
                  className="w-full bg-white/90 backdrop-blur-md border-2 border-gray-200 rounded-2xl pl-14 pr-5 py-4 text-base font-medium outline-none focus:ring-4 focus:ring-green-200 focus:border-green-400 shadow-lg transition-all"
              />
          </div>

          {/* FAQ Categories */}
          <div>
              <h3 className="font-black text-white text-xl mb-4 drop-shadow-lg">📚 FAQ Categories</h3>
              <div className="space-y-3">
                  {[
                    { title: 'Account & Profile', icon: Icons.User, color: 'from-blue-400 to-indigo-500' },
                    { title: 'Learning with AI', icon: Icons.MessageSquare, color: 'from-purple-400 to-pink-500' },
                    { title: 'Human Tutors', icon: Icons.Users, color: 'from-green-400 to-emerald-500' },
                    { title: 'Privacy & Data', icon: Icons.Shield, color: 'from-orange-400 to-red-500' },
                    { title: 'Technical Issues', icon: Icons.AlertCircle, color: 'from-gray-400 to-slate-500' }
                  ].map((cat, i) => (
                      <AnimatedCard key={i} variant="white" className="p-5 flex justify-between items-center cursor-pointer hover-lift group border-2 border-gray-100">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                              <cat.icon size={24} className="text-white" strokeWidth={2.5} />
                            </div>
                            <span className="text-base font-bold text-gray-800">{cat.title}</span>
                          </div>
                          <Icons.ChevronRight size={20} className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" strokeWidth={3} />
                      </AnimatedCard>
                  ))}
              </div>
          </div>

          {/* Contact */}
          <AnimatedCard variant="gradient" className="p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/30 shadow-2xl">
                  <Icons.MessageCircle size={36} className="text-white" strokeWidth={2.5} />
                </div>
                <h3 className="font-black text-white text-2xl mb-3 drop-shadow-lg">Still need help?</h3>
                <p className="text-white/90 text-base font-semibold mb-6 drop-shadow">Our support team is available 24/7 to assist you!</p>
                <button className="w-full bg-white text-green-600 font-black py-4 rounded-2xl shadow-xl hover-lift border-2 border-white/50 text-lg">
                  💬 Contact Support
                </button>
              </div>
          </AnimatedCard>
      </div>
    </div>
  );
};

export default Support;
