import React from 'react';
import * as Icons from './Icons';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      title: "Your tutor, Ahmed, has replied",
      desc: "Tap to view the feedback",
      time: "5m ago",
      icon: <img src="https://picsum.photos/100/100?random=5" className="w-full h-full object-cover" alt="Ahmed" />,
      type: 'tutor'
    },
    {
      id: 2,
      title: "New Pronunciation Practice",
      desc: "'Common Workplace Phrases' is available.",
      time: "2h ago",
      icon: <Icons.Mic size={20} className="text-green-600" />,
      type: 'system',
      color: 'bg-green-100'
    },
    {
      id: 3,
      title: "Challenge Unlocked!",
      desc: "You've unlocked the 'Tongue Twister' challenge.",
      time: "Start",
      action: true,
      icon: <Icons.Zap size={20} className="text-yellow-600" />,
      type: 'system',
      color: 'bg-yellow-100'
    },
    {
      id: 4,
      title: "Weekly fluency assessment is ready",
      desc: "Check out your latest progress.",
      time: "View",
      action: true,
      icon: <Icons.BarChart2 size={20} className="text-blue-600" />,
      type: 'system',
      color: 'bg-blue-100'
    }
  ];

  return (
    <>
      <div 
        className="fixed inset-0 z-[60] bg-black/10 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="fixed top-20 right-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[70] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gradient-to-br from-blue-50 to-indigo-50">
            <h3 className="font-bold text-gray-900 text-base">Notifications</h3>
            <button onClick={onClose} className="text-blue-600 text-xs font-bold hover:text-blue-700 transition-colors">Mark all as read</button>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
            {notifications.map((notif) => (
                <div key={notif.id} className="p-4 border-b border-gray-50 hover:bg-blue-50/50 transition-colors cursor-pointer flex gap-3">
                    <div className={`w-12 h-12 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center ${notif.color || 'bg-gray-100'}`}>
                        {notif.icon}
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900 leading-tight mb-1">{notif.title}</h4>
                        <p className="text-xs text-gray-500 leading-snug">{notif.desc}</p>
                    </div>
                    <div className="flex flex-col justify-center">
                        {notif.action ? (
                            <button className="text-blue-600 text-xs font-bold hover:text-blue-700 transition-colors">{notif.time}</button>
                        ) : (
                            <span className="text-xs text-gray-400 whitespace-nowrap">{notif.time}</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
        
        <div className="p-3 bg-gradient-to-br from-gray-50 to-blue-50 text-center border-t border-gray-100">
            <button className="text-gray-600 text-xs font-semibold hover:text-blue-600 transition-colors">View All Notifications</button>
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;