import React from 'react';
import { View } from '../types';
import * as Icons from '../components/Icons';

const PracticeModes: React.FC<{ setView: (view: View) => void }> = ({ setView }) => {
  return (
    <div className="p-5 space-y-6">
      <h2 className="text-xl font-bold text-gray-900">AI Practice Modes</h2>

      {/* Modes */}
      <div className="space-y-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group cursor-pointer hover:shadow-md transition-all" onClick={() => setView(View.CHAT_SESSION)}>
            <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                    <Icons.User size={24} />
                </div>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">Conversation Practice</h3>
            <p className="text-sm text-gray-500 mb-4">Engage in open-ended chats with an AI partner.</p>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                     <div className="w-5 h-5 rounded-full border border-gray-300"></div>
                     <span className="text-xs text-gray-600">Enable AI Avatar</span>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-200">Start</button>
            </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
             <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center">
                    <Icons.BookOpen size={24} />
                </div>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">Story Mode</h3>
            <p className="text-sm text-gray-500 mb-4">Read and narrate interactive stories to improve flow.</p>
            <div className="flex justify-end">
                 <button className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-200">Begin</button>
            </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
             <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
                    <Icons.Download size={24} />
                </div>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">PDF Practice</h3>
            <p className="text-sm text-gray-500 mb-4">Upload and practice speaking from your own documents.</p>
            <div className="flex justify-end">
                 <button className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-200">Upload</button>
            </div>
        </div>
      </div>

      {/* Recent Sessions */}
      <div>
          <h3 className="font-bold text-gray-900 text-lg mb-3">Recent Sessions</h3>
          <div className="space-y-3">
              <div className="bg-white p-3 rounded-2xl border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <Icons.Mic size={18} />
                      </div>
                      <div>
                          <div className="font-bold text-sm text-gray-900">AI Conversation</div>
                          <div className="text-xs text-gray-500">15 Nov - 12 min</div>
                      </div>
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">Completed</span>
              </div>
               <div className="bg-white p-3 rounded-2xl border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                          <Icons.User size={18} />
                      </div>
                      <div>
                          <div className="font-bold text-sm text-gray-900">Tutor Session</div>
                          <div className="text-xs text-gray-500">12 Nov - 30 min</div>
                      </div>
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">Completed</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                          <Icons.Clock size={18} />
                      </div>
                      <div>
                          <div className="font-bold text-sm text-gray-900">Task Queue Review</div>
                          <div className="text-xs text-gray-500">10 Nov - 5 tasks</div>
                      </div>
                  </div>
                  <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-lg">Pending</span>
              </div>
          </div>
      </div>
    </div>
  );
};

export default PracticeModes;