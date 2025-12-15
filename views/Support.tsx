
import React from 'react';
import * as Icons from '../components/Icons';

const Support: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="h-full flex flex-col pb-24 relative overflow-hidden">
      {/* Modern gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #F9FAFB 0%, #DBEAFE 50%, #BFDBFE 100%)'
        }}
      />
      
      {/* Decorative floating shapes */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-green-200/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 left-0 w-48 h-48 bg-emerald-200/20 rounded-full blur-2xl" />
      
      {/* Header with gradient */}
      <div 
        className="relative z-10 p-4 flex items-center gap-4 sticky top-0 backdrop-blur-xl border-b border-white/20"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(219,234,254,0.95) 100%)'
        }}
      >
        <button 
          onClick={onBack}
          className="p-2.5 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 border border-green-100/50"
        >
          <Icons.ChevronRight className="rotate-180 text-green-600" />
        </button>
        <h2 className="font-black text-gray-900 text-xl flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <Icons.HelpCircle size={18} className="text-white" />
          </div>
          Help & Support
        </h2>
      </div>

      <div className="relative z-10 p-5 space-y-5 flex-1 overflow-y-auto custom-scrollbar">
          
          {/* Search Help */}
          <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-emerald-100 rounded-3xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-1 border border-green-200 shadow-lg">
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Icons.Search className="text-white" size={20} />
                  </div>
                  <input 
                      type="text" 
                      placeholder="How can we help you today?" 
                      className="w-full bg-white border-2 border-transparent focus:border-green-300 rounded-2xl pl-20 pr-6 py-4 text-sm font-medium outline-none transition-all"
                  />
                </div>
              </div>
          </div>

          {/* FAQ Categories */}
          <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                  <Icons.BookOpen size={20} className="text-white" />
                </div>
                <h3 className="font-black text-gray-900 text-lg">FAQ Categories</h3>
              </div>
              
              <div className="space-y-3">
                  {[
                    { title: 'Account & Profile', icon: Icons.UserCircle, gradient: 'from-blue-500 to-indigo-600' },
                    { title: 'Learning with AI', icon: Icons.Sparkles, gradient: 'from-purple-500 to-pink-600' },
                    { title: 'Human Tutors', icon: Icons.GraduationCap, gradient: 'from-emerald-500 to-green-600' },
                    { title: 'Privacy & Data', icon: Icons.Shield, gradient: 'from-cyan-500 to-blue-600' },
                    { title: 'Technical Issues', icon: Icons.Settings, gradient: 'from-amber-500 to-orange-600' }
                  ].map((cat, i) => (
                      <div key={i} className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group/item relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br opacity-0 group-hover/item:opacity-10 rounded-bl-full transition-opacity" style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />
                          
                          <div className="relative z-10 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 bg-gradient-to-br ${cat.gradient} rounded-xl flex items-center justify-center shadow-md group-hover/item:scale-110 transition-transform`}>
                                <cat.icon size={18} className="text-white" />
                              </div>
                              <span className="text-sm font-bold text-gray-700">{cat.title}</span>
                            </div>
                            <Icons.ChevronRight size={18} className="text-gray-400 group-hover/item:translate-x-1 transition-transform" />
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Contact Support Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-green-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-50 group-hover:opacity-70 transition-opacity" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Icons.MessageCircle size={28} className="text-white" />
                </div>
                
                <h3 className="font-black text-gray-900 mb-2 text-lg">Still need help?</h3>
                <p className="text-sm text-gray-600 mb-5 leading-relaxed">Our support team is available 24/7 to assist you with any questions or concerns.</p>
                
                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-black py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                  <Icons.Mail size={20} />
                  Contact Support
                </button>
              </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-3">
              <button className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 group/link">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md group-hover/link:scale-110 transition-transform">
                    <Icons.Video size={20} className="text-white" />
                  </div>
                  <p className="text-xs font-bold text-gray-700">Video Tutorials</p>
              </button>
              
              <button className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 group/link">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md group-hover/link:scale-110 transition-transform">
                    <Icons.Lightbulb size={20} className="text-white" />
                  </div>
                  <p className="text-xs font-bold text-gray-700">Tips & Tricks</p>
              </button>
          </div>
      </div>
    </div>
  );
};

export default Support;
