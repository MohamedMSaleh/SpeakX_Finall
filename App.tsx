
import React, { useState, useEffect } from 'react';
import { View } from './types';
import * as Icons from './components/Icons';
import { initializeGemini } from './services/geminiService';
import { useIsMobile, useDeviceType } from './utils/responsive';

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
import QuickQuiz from './views/QuickQuiz';
import ProgressTracker from './views/ProgressTracker';

const App: React.FC = () => {
  // Responsive hooks
  const isMobile = useIsMobile();
  const deviceType = useDeviceType();

  // Start at SIGN_IN for the authentic flow
  const [currentView, setCurrentView] = useState<View>(View.SIGN_IN);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  // State to control which mode the Assessment view opens in (intro vs report)
  const [assessmentMode, setAssessmentMode] = useState<'intro' | 'active' | 'report'>('intro');

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

  // New Bottom Navigation Bar (Mobile Only) - Fully Redesigned with Modern Visual Identity
  const BottomNav = () => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe">
      {/* Glassy gradient background with blur */}
      <div 
        className="absolute inset-0 backdrop-blur-xl border-t border-white/20"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.95) 100%)'
        }}
      />
      
      {/* Subtle top glow */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.3) 50%, transparent 100%)'
        }}
      />
      
      <div className="relative py-2 px-2 flex justify-between items-center shadow-2xl">
        {/* Home Button */}
        <button 
          onClick={() => setCurrentView(View.DASHBOARD)} 
          className={`flex flex-col items-center w-16 transition-all duration-500 ease-out min-h-[60px] justify-center active:scale-90 group ${
            currentView === View.DASHBOARD ? 'scale-110' : ''
          }`}
        >
          <div className={`p-2.5 rounded-2xl transition-all duration-500 ${
            currentView === View.DASHBOARD 
              ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-300 scale-110' 
              : 'bg-transparent group-hover:bg-blue-50'
          }`}>
            <Icons.Home 
              size={22} 
              strokeWidth={2.5} 
              className={currentView === View.DASHBOARD ? 'text-white' : 'text-gray-400 group-hover:text-blue-500'}
            />
          </div>
          <span className={`text-[10px] mt-1 font-bold transition-all duration-300 ${
            currentView === View.DASHBOARD ? 'text-blue-600' : 'text-gray-400'
          }`}>Home</span>
          {currentView === View.DASHBOARD && (
            <div className="absolute -bottom-1 w-1 h-1 bg-blue-600 rounded-full animate-pulse" />
          )}
        </button>
        
        {/* Plan Button */}
        <button 
          onClick={() => setCurrentView(View.ROADMAP)} 
          className={`flex flex-col items-center w-16 transition-all duration-500 ease-out min-h-[60px] justify-center active:scale-90 group ${
            (currentView === View.ROADMAP || currentView === View.PRACTICE_SESSION || currentView === View.ANALYSIS || currentView === View.LEARNING_MAP) 
              ? 'scale-110' : ''
          }`}
        >
          <div className={`p-2.5 rounded-2xl transition-all duration-500 ${
            (currentView === View.ROADMAP || currentView === View.PRACTICE_SESSION || currentView === View.ANALYSIS || currentView === View.LEARNING_MAP)
              ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-300 scale-110' 
              : 'bg-transparent group-hover:bg-indigo-50'
          }`}>
            <Icons.Map 
              size={22} 
              strokeWidth={2.5} 
              className={(currentView === View.ROADMAP || currentView === View.PRACTICE_SESSION || currentView === View.ANALYSIS || currentView === View.LEARNING_MAP) ? 'text-white' : 'text-gray-400 group-hover:text-indigo-500'}
            />
          </div>
          <span className={`text-[10px] mt-1 font-bold transition-all duration-300 ${
            (currentView === View.ROADMAP || currentView === View.PRACTICE_SESSION || currentView === View.ANALYSIS || currentView === View.LEARNING_MAP) ? 'text-indigo-600' : 'text-gray-400'
          }`}>Plan</span>
          {(currentView === View.ROADMAP || currentView === View.PRACTICE_SESSION || currentView === View.ANALYSIS || currentView === View.LEARNING_MAP) && (
            <div className="absolute -bottom-1 w-1 h-1 bg-indigo-600 rounded-full animate-pulse" />
          )}
        </button>

        {/* Quest Button */}
        <button 
          onClick={() => setCurrentView(View.CHALLENGES)} 
          className={`flex flex-col items-center w-16 transition-all duration-500 ease-out min-h-[60px] justify-center active:scale-90 group ${
            currentView === View.CHALLENGES ? 'scale-110' : ''
          }`}
        >
          <div className={`p-2.5 rounded-2xl transition-all duration-500 ${
            currentView === View.CHALLENGES 
              ? 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-300 scale-110' 
              : 'bg-transparent group-hover:bg-amber-50'
          }`}>
            <Icons.Zap 
              size={22} 
              strokeWidth={2.5} 
              className={currentView === View.CHALLENGES ? 'text-white' : 'text-gray-400 group-hover:text-amber-500'}
            />
          </div>
          <span className={`text-[10px] mt-1 font-bold transition-all duration-300 ${
            currentView === View.CHALLENGES ? 'text-amber-600' : 'text-gray-400'
          }`}>Challenges</span>
          {currentView === View.CHALLENGES && (
            <div className="absolute -bottom-1 w-1 h-1 bg-amber-600 rounded-full animate-pulse" />
          )}
        </button>

        {/* Tutor Button */}
        <button 
          onClick={() => setCurrentView(View.TUTORS)} 
          className={`flex flex-col items-center w-16 transition-all duration-500 ease-out min-h-[60px] justify-center active:scale-90 group ${
            (currentView === View.TUTORS || currentView === View.TUTOR_BOOKING) ? 'scale-110' : ''
          }`}
        >
          <div className={`p-2.5 rounded-2xl transition-all duration-500 ${
            (currentView === View.TUTORS || currentView === View.TUTOR_BOOKING)
              ? 'bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-300 scale-110' 
              : 'bg-transparent group-hover:bg-emerald-50'
          }`}>
            <Icons.GraduationCap 
              size={22} 
              strokeWidth={2.5} 
              className={(currentView === View.TUTORS || currentView === View.TUTOR_BOOKING) ? 'text-white' : 'text-gray-400 group-hover:text-emerald-500'}
            />
          </div>
          <span className={`text-[10px] mt-1 font-bold transition-all duration-300 ${
            (currentView === View.TUTORS || currentView === View.TUTOR_BOOKING) ? 'text-emerald-600' : 'text-gray-400'
          }`}>Tutor</span>
          {(currentView === View.TUTORS || currentView === View.TUTOR_BOOKING) && (
            <div className="absolute -bottom-1 w-1 h-1 bg-emerald-600 rounded-full animate-pulse" />
          )}
        </button>
        
        {/* Rooms Button (replaced Social) */}
        <button 
          onClick={() => setCurrentView(View.ROOMS)} 
          className={`flex flex-col items-center w-16 transition-all duration-500 ease-out min-h-[60px] justify-center active:scale-90 group ${
            currentView === View.ROOMS ? 'scale-110' : ''
          }`}
        >
          <div className={`p-2.5 rounded-2xl transition-all duration-500 ${
            currentView === View.ROOMS 
              ? 'bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg shadow-pink-300 scale-110' 
              : 'bg-transparent group-hover:bg-pink-50'
          }`}>
            <Icons.Users 
              size={22} 
              strokeWidth={2.5} 
              className={currentView === View.ROOMS ? 'text-white' : 'text-gray-400 group-hover:text-pink-500'}
            />
          </div>
          <span className={`text-[10px] mt-1 font-bold transition-all duration-300 ${
            currentView === View.ROOMS ? 'text-pink-600' : 'text-gray-400'
          }`}>Rooms</span>
          {currentView === View.ROOMS && (
            <div className="absolute -bottom-1 w-1 h-1 bg-pink-600 rounded-full animate-pulse" />
          )}
        </button>
      </div>
    </div>
  );

  // Common Header - Redesigned with Creative Visual Identity
  const Header = () => (
    <div className="sticky top-0 z-40 w-full overflow-hidden">
      {/* Gradient background with abstract shapes */}
      <div 
        className="absolute inset-0 backdrop-blur-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(238,242,255,0.95) 50%, rgba(224,231,255,0.95) 100%)'
        }}
      />
      
      {/* Decorative floating orbs */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-200/20 rounded-full blur-2xl" />
      
      {/* Border with gradient */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.2) 20%, rgba(139,92,246,0.2) 80%, transparent 100%)'
        }}
      />
      
      <div className="relative px-3 sm:px-4 md:px-8 py-3 md:py-4 flex justify-between items-center">
        {/* Mobile Hamburger - Hidden on Desktop */}
        <button 
          onClick={() => setIsMenuOpen(true)} 
          className="md:hidden p-2.5 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-2xl transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 active:scale-95 border border-blue-100/50"
        >
          <Icons.Menu className="text-blue-600" size={isMobile ? 20 : 24} />
        </button>
        
        {/* Logo with gradient text */}
        <h1 
          className="text-lg sm:text-xl md:text-2xl font-black tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          SpeakX
        </h1>
        
        <div className="flex gap-1 sm:gap-2 items-center">
          {/* Streak Fire Icon - Opens Calendar */}
          <button 
            onClick={() => setIsCalendarOpen(true)} 
            className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-br from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 rounded-2xl transition-all duration-300 border border-orange-200/50 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 min-w-[44px] min-h-[44px] group"
          >
            <Icons.Flame className="text-orange-500 fill-orange-500 group-hover:scale-110 transition-transform" size={isMobile ? 18 : 20} />
            <span className="font-black text-orange-600 text-xs sm:text-sm">{streakLength}</span>
          </button>

          {/* Notification Bell */}
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} 
            className="relative p-2.5 bg-gradient-to-br from-yellow-50 to-amber-50 hover:from-yellow-100 hover:to-amber-100 rounded-2xl transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 active:scale-95 border border-yellow-200/50 group"
          >
            <Icons.Bell className="text-amber-600 group-hover:rotate-12 transition-transform" size={isMobile ? 20 : 22} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white shadow-lg animate-pulse">3</span>
          </button>

          {/* Chat Icon - Updated to MessageCircle */}
          <button 
            onClick={() => setCurrentView(View.CONVERSATIONS)} 
            className="relative p-2.5 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-2xl transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 active:scale-95 border border-blue-200/50 group"
          >
            <Icons.MessageCircle className="text-blue-600 group-hover:scale-110 transition-transform" size={isMobile ? 20 : 22} />
          </button>
        </div>
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
              setAssessmentMode('intro');
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
      case View.QUICK_QUIZ:
        return <QuickQuiz setView={setCurrentView} />;
      case View.PROGRESS_TRACKER:
        return <ProgressTracker setView={setCurrentView} />;

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
