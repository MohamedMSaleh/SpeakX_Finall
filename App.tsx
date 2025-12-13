
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
import CallSession from './views/CallSession';
import PracticeSession from './views/PracticeSession';
import StorySession from './views/StorySession';
import VocabPractice from './views/VocabPractice';
import GrammarPractice from './views/GrammarPractice';
import PronunciationPractice from './views/PronunciationPractice';
import FluencyPractice from './views/FluencyPractice';
import Analysis from './views/Analysis';
import TutorBooking from './views/TutorBooking';
import Profile from './views/Profile';
import Subscription from './views/Subscription';
import Settings from './views/Settings';
import Support from './views/Support';
import Terms from './views/Terms';
import LearningMap from './views/LearningMap';
import CareerHub from './views/CareerHub';
import Conversations from './views/Conversations';
import Assessment from './views/Assessment';
import AssessmentHistory from './views/AssessmentHistory';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Friends from './views/Friends';
import UserProfile from './views/UserProfile';
import LessonPlayer from './views/LessonPlayer';

const App: React.FC = () => {
  // Start at SIGN_IN for the authentic flow
  const [currentView, setCurrentView] = useState<View>(View.SIGN_IN);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  // State to control which mode the Assessment view opens in (intro vs report)
  // Changed default to 'active' since intro page is removed
  const [assessmentMode, setAssessmentMode] = useState<'intro' | 'active' | 'report'>('active');

  // State for Friends/User Profile navigation
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    initializeGemini();
  }, []);

  // Mock Calendar Data for Modal
  const todayDate = 24;
  const streakLength = 12;
  const calendarDays = Array.from({ length: 30 }, (_, i) => {
      const day = i + 1;
      const isPracticeDay = day > (todayDate - streakLength) && day <= todayDate;
      const isFuture = day > todayDate;
      return { day, isPracticeDay, isFuture };
  });

  // New Bottom Navigation Bar (Mobile Only)
  const BottomNav = () => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-2 px-4 flex justify-between items-center z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
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
    <div className="sticky top-0 bg-white/80 backdrop-blur-md z-40 px-4 md:px-8 py-3 flex justify-between items-center border-b border-gray-50 relative w-full">
      {/* Mobile Hamburger - Hidden on Desktop */}
      <button onClick={() => setIsMenuOpen(true)} className="md:hidden p-1 hover:bg-gray-100 rounded-full transition-colors">
        <Icons.Menu className="text-gray-700" />
      </button>
      
      <h1 className="text-xl md:text-2xl font-bold text-blue-600 tracking-tight">SpeakX</h1>
      
      <div className="flex gap-3 items-center">
        {/* Streak Fire Icon - Opens Calendar */}
        <button onClick={() => setIsCalendarOpen(true)} className="flex items-center gap-1 px-2 py-1 hover:bg-orange-50 rounded-full transition-colors border border-transparent hover:border-orange-100">
            <Icons.Flame className="text-orange-500 fill-orange-500" size={20} />
            <span className="font-extrabold text-orange-500 text-sm">{streakLength}</span>
        </button>

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
      case View.SIGN_IN:
        return <SignIn setView={setCurrentView} />;
      case View.SIGN_UP:
        return <SignUp setView={setCurrentView} />;
      case View.DASHBOARD:
        return <Dashboard setView={setCurrentView} />;
      case View.ROADMAP:
        return <Roadmap setView={setCurrentView} onBack={() => setCurrentView(View.DASHBOARD)} />;
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
      case View.CAREER_HUB:
        return <CareerHub onBack={() => setCurrentView(View.DASHBOARD)} setView={setCurrentView} />;
      case View.LEARNING_MAP:
        return <LearningMap onBack={() => setCurrentView(View.ROADMAP)} setView={setCurrentView} />;
      case View.CONVERSATIONS:
        return <Conversations setView={setCurrentView} onBack={() => setCurrentView(View.DASHBOARD)} />;
      case View.FRIENDS:
        return (
          <Friends 
            onBack={() => setCurrentView(View.DASHBOARD)} 
            onProfileClick={(user) => {
              setSelectedUser(user);
              setCurrentView(View.USER_PROFILE);
            }} 
          />
        );
      case View.USER_PROFILE:
        return (
          <UserProfile 
            user={selectedUser} 
            onBack={() => setCurrentView(View.FRIENDS)} 
          />
        );
      case View.ASSESSMENT:
        return (
          <Assessment 
            initialMode={assessmentMode} 
            onBack={() => setCurrentView(View.ASSESSMENT_HISTORY)} 
            onFinish={() => setCurrentView(View.ROADMAP)} 
          />
        );
      case View.ASSESSMENT_HISTORY:
        return (
          <AssessmentHistory 
            onBack={() => setCurrentView(View.DASHBOARD)} 
            setView={setCurrentView}
            onViewReport={() => {
              setAssessmentMode('report');
              setCurrentView(View.ASSESSMENT);
            }}
            onStartAssessment={() => {
              setAssessmentMode('active'); // Directly go to active mode
              setCurrentView(View.ASSESSMENT);
            }}
          />
        );
      
      // Functional Views
      case View.CHAT_SESSION:
        return <ChatSession onBack={() => setCurrentView(View.DASHBOARD)} />;
      case View.CALL_SESSION:
        return <CallSession onBack={() => setCurrentView(View.TUTORS)} />;
      case View.PRACTICE_SESSION:
        return <PracticeSession onBack={() => setCurrentView(View.ROADMAP)} onComplete={() => setCurrentView(View.ANALYSIS)} />;
      case View.STORY_SESSION:
        return <StorySession onBack={() => setCurrentView(View.TUTORS)} />;
      
      // Specific Practice Modes
      case View.VOCAB_PRACTICE:
        return <VocabPractice onBack={() => setCurrentView(View.DASHBOARD)} />;
      case View.GRAMMAR_PRACTICE:
        return <GrammarPractice onBack={() => setCurrentView(View.DASHBOARD)} />;
      case View.PRONUNCIATION_PRACTICE:
        return <PronunciationPractice onBack={() => setCurrentView(View.DASHBOARD)} />;
      case View.FLUENCY_PRACTICE:
        return <FluencyPractice onBack={() => setCurrentView(View.DASHBOARD)} />;
      case View.LESSON_PLAYER:
        return <LessonPlayer onBack={() => setCurrentView(View.ROADMAP)} onComplete={() => setCurrentView(View.ROADMAP)} />;

      case View.ANALYSIS:
        return <Analysis onBack={() => setCurrentView(View.ROADMAP)} />;
      case View.TUTOR_BOOKING:
        return <TutorBooking onBack={() => setCurrentView(View.TUTORS)} />;
      default:
        return <Dashboard setView={setCurrentView} />;
    }
  };

  // Modified logic: Hide bottom nav when Menu is open OR in deep practice sessions
  const shouldShowBottomNav = !isMenuOpen && [
    View.DASHBOARD, 
    View.CHALLENGES, 
    View.TUTORS, 
    View.ROOMS,
  ].includes(currentView);

  // Views that show the main header
  const showHeader = [
    View.DASHBOARD, 
    View.CHALLENGES, 
    View.TUTORS, 
    View.ROOMS
  ].includes(currentView);

  // Authentication check to hide sidebar/header on auth screens
  const isAuthScreen = currentView === View.SIGN_IN || currentView === View.SIGN_UP;

  return (
    <div className="h-[100dvh] w-full bg-gray-50 text-gray-900 font-sans flex overflow-hidden">
      
      {/* Desktop Sidebar - Hidden on Mobile, Visible on Desktop (except auth screens) */}
      {!isAuthScreen && (
        <div className="hidden md:flex w-72 flex-col h-full border-r border-gray-200 bg-white shrink-0 z-30">
          <SideMenu isOpen={true} onClose={() => {}} setView={setCurrentView} isDesktop={true} />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative min-w-0">
        
        {/* Mobile Sidebar (Drawer) */}
        <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} setView={setCurrentView} isDesktop={false} />

        {showHeader && !isAuthScreen && <Header />}
        
        <main className="flex-1 overflow-hidden relative w-full">
          {renderView()}
        </main>

        {shouldShowBottomNav && !isAuthScreen && <BottomNav />}

        {/* Streak Calendar Modal (Global) */}
        {isCalendarOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white rounded-[32px] p-6 w-full max-w-sm shadow-2xl relative animate-in zoom-in-95">
                  <button onClick={() => setIsCalendarOpen(false)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200">
                      <Icons.X size={20} />
                  </button>
                  
                  <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 text-orange-500 animate-bounce">
                          <Icons.Flame size={32} fill="currentColor" />
                      </div>
                      <h3 className="text-2xl font-black text-gray-900">12 Day Streak</h3>
                      <p className="text-gray-500 text-sm">You're on fire! Keep it up.</p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                      <div className="flex justify-between items-center mb-4">
                          <span className="font-bold text-gray-900">October 2024</span>
                          <div className="flex gap-2">
                              <button className="p-1 bg-white rounded hover:bg-gray-100"><Icons.ChevronRight className="rotate-180 text-gray-400" size={16} /></button>
                              <button className="p-1 bg-white rounded hover:bg-gray-100"><Icons.ChevronRight className="text-gray-400" size={16} /></button>
                          </div>
                      </div>
                      <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium">
                          {['S','M','T','W','T','F','S'].map(d => <span key={d} className="text-gray-400 mb-2">{d}</span>)}
                          
                          {/* Calendar Grid */}
                          {calendarDays.map((day) => (
                              <div 
                                key={day.day} 
                                className={`aspect-square flex items-center justify-center rounded-full relative ${
                                    day.isPracticeDay 
                                    ? 'bg-orange-500 text-white shadow-sm ring-2 ring-orange-200' 
                                    : 'text-gray-400'
                                }`}
                              >
                                  {/* If streak day, show Flame, else show Number */}
                                  {day.isPracticeDay ? (
                                      <Icons.Flame size={14} fill="white" />
                                  ) : (
                                      day.day
                                  )}
                              </div>
                          ))}
                      </div>
                  </div>

                  <button 
                    onClick={() => setIsCalendarOpen(false)}
                    className="w-full bg-orange-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-orange-200 hover:bg-orange-700 transition-colors"
                  >
                      Keep Going
                  </button>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
