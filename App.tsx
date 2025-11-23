
import React, { useState, useEffect } from 'react';
import { View } from './types';
import * as Icons from './components/Icons';
import { initializeGemini } from './services/geminiService';

// Components
import SideMenu from './components/SideMenu';
import NotificationPanel from './components/NotificationPanel';

// Views
import Dashboard from './views/Dashboard';
import Roadmap from './views/Roadmap';
import Challenges from './views/Challenges';
import Tutors from './views/Tutors';
import Rooms from './views/Rooms';
import ActiveRoom from './views/ActiveRoom';
import CreateRoom from './views/CreateRoom';
import ChatSession from './views/ChatSession';
import PracticeSession from './views/PracticeSession';
import Analysis from './views/Analysis';
import TutorBooking from './views/TutorBooking';
import Profile from './views/Profile';
import Subscription from './views/Subscription';
import Settings from './views/Settings';
import Support from './views/Support';
import Terms from './views/Terms';
import LearningMap from './views/LearningMap';
import Conversations from './views/Conversations';
import Assessment from './views/Assessment';
import AssessmentHistory from './views/AssessmentHistory';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    initializeGemini();
  }, []);

  // New Bottom Navigation Bar
  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-3 px-4 flex justify-between items-center z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <button 
        onClick={() => setCurrentView(View.DASHBOARD)} 
        className={`flex flex-col items-center w-16 transition-colors ${currentView === View.DASHBOARD ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <Icons.Home size={24} strokeWidth={currentView === View.DASHBOARD ? 2.5 : 2} />
        <span className="text-[10px] mt-1 font-medium">Home</span>
      </button>
      
      <button 
        onClick={() => setCurrentView(View.ROADMAP)} 
        className={`flex flex-col items-center w-16 transition-colors ${
            (currentView === View.ROADMAP || currentView === View.PRACTICE_SESSION || currentView === View.ANALYSIS || currentView === View.LEARNING_MAP) 
            ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <Icons.Map size={24} strokeWidth={(currentView === View.ROADMAP || currentView === View.PRACTICE_SESSION || currentView === View.ANALYSIS || currentView === View.LEARNING_MAP) ? 2.5 : 2} />
        <span className="text-[10px] mt-1 font-medium">Plan</span>
      </button>

      <button 
        onClick={() => setCurrentView(View.CHALLENGES)} 
        className={`flex flex-col items-center w-16 transition-colors ${currentView === View.CHALLENGES ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <Icons.Zap size={24} strokeWidth={currentView === View.CHALLENGES ? 2.5 : 2} />
        <span className="text-[10px] mt-1 font-medium">Challenges</span>
      </button>

      <button 
        onClick={() => setCurrentView(View.TUTORS)} 
        className={`flex flex-col items-center w-16 transition-colors ${(currentView === View.TUTORS || currentView === View.TUTOR_BOOKING) ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <Icons.GraduationCap size={24} strokeWidth={(currentView === View.TUTORS || currentView === View.TUTOR_BOOKING) ? 2.5 : 2} />
        <span className="text-[10px] mt-1 font-medium">Tutor</span>
      </button>
      
      <button 
        onClick={() => setCurrentView(View.ROOMS)} 
        className={`flex flex-col items-center w-16 transition-colors ${currentView === View.ROOMS ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <Icons.Users size={24} strokeWidth={currentView === View.ROOMS ? 2.5 : 2} />
        <span className="text-[10px] mt-1 font-medium">Rooms</span>
      </button>
    </div>
  );

  // Common Header
  const Header = () => (
    <div className="sticky top-0 bg-white/80 backdrop-blur-md z-40 px-4 py-3 flex justify-between items-center border-b border-gray-50 relative">
      <button onClick={() => setIsMenuOpen(true)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
        <Icons.Menu className="text-gray-700" />
      </button>
      
      <h1 className="text-xl font-bold text-blue-600 tracking-tight">SpeakX</h1>
      
      <div className="flex gap-3 items-center">
        {/* Notification Bell */}
        <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="relative p-1 hover:bg-gray-100 rounded-full transition-colors">
            <Icons.Bell className="text-gray-700" size={22} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full border border-white"></span>
        </button>

        {/* Chat Icon - Updated to MessageCircle */}
        <button onClick={() => setCurrentView(View.CONVERSATIONS)} className="relative p-1 hover:bg-gray-100 rounded-full transition-colors">
            <Icons.MessageCircle className="text-gray-700" size={22} />
        </button>
      </div>
      
      <NotificationPanel isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
    </div>
  );

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard setView={setCurrentView} />;
      case View.ROADMAP:
        return <Roadmap setView={setCurrentView} />;
      case View.CHALLENGES:
        return <Challenges setView={setCurrentView} />;
      case View.TUTORS:
        return <Tutors setView={setCurrentView} />;
      case View.ROOMS:
        return <Rooms setView={setCurrentView} />;
      case View.ACTIVE_ROOM:
        return <ActiveRoom onBack={() => setCurrentView(View.ROOMS)} />;
      case View.CREATE_ROOM:
        return <CreateRoom onBack={() => setCurrentView(View.ROOMS)} onStart={() => setCurrentView(View.ACTIVE_ROOM)} />;
      case View.PROFILE:
        return <Profile onBack={() => setCurrentView(View.DASHBOARD)} />;
      case View.SUBSCRIPTION:
        return <Subscription onBack={() => setCurrentView(View.DASHBOARD)} />;
      case View.SETTINGS:
        return <Settings onBack={() => setCurrentView(View.DASHBOARD)} />;
      case View.SUPPORT:
        return <Support onBack={() => setCurrentView(View.DASHBOARD)} />;
      case View.TERMS:
        return <Terms onBack={() => setCurrentView(View.DASHBOARD)} />;
      case View.LEARNING_MAP:
        return <LearningMap onBack={() => setCurrentView(View.ROADMAP)} setView={setCurrentView} />;
      case View.CONVERSATIONS:
        return <Conversations setView={setCurrentView} onBack={() => setCurrentView(View.DASHBOARD)} />;
      case View.ASSESSMENT:
        return <Assessment onBack={() => setCurrentView(View.ASSESSMENT_HISTORY)} onFinish={() => setCurrentView(View.ROADMAP)} />;
      case View.ASSESSMENT_HISTORY:
        return <AssessmentHistory onBack={() => setCurrentView(View.DASHBOARD)} setView={setCurrentView} />;
      
      // Functional Views
      case View.CHAT_SESSION:
        return <ChatSession onBack={() => setCurrentView(View.DASHBOARD)} />;
      case View.PRACTICE_SESSION:
        return <PracticeSession onBack={() => setCurrentView(View.ROADMAP)} onComplete={() => setCurrentView(View.ANALYSIS)} />;
      case View.ANALYSIS:
        return <Analysis onBack={() => setCurrentView(View.ROADMAP)} />;
      case View.TUTOR_BOOKING:
        return <TutorBooking onBack={() => setCurrentView(View.TUTORS)} />;
      default:
        return <Dashboard setView={setCurrentView} />;
    }
  };

  // Modified logic: Hide bottom nav in deep practice sessions to focus user
  const shouldShowBottomNav = [
    View.DASHBOARD, 
    View.ROADMAP, 
    View.CHALLENGES, 
    View.TUTORS, 
    View.ROOMS,
    View.LEARNING_MAP,
  ].includes(currentView);

  // Views that show the main header
  const showHeader = [
    View.DASHBOARD, 
    View.ROADMAP, 
    View.CHALLENGES, 
    View.TUTORS, 
    View.ROOMS
  ].includes(currentView);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-24">
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} setView={setCurrentView} />

      {showHeader && <Header />}
      
      <main className="max-w-md mx-auto w-full bg-white min-h-screen shadow-2xl shadow-gray-200 overflow-hidden">
        {renderView()}
      </main>

      {shouldShowBottomNav && <BottomNav />}
    </div>
  );
};

export default App;