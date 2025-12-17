import 'package:flutter/material.dart';

enum AppView {
  dashboard,
  roadmap,
  challenges,
  tutors,
  rooms,
  activeRoom,
  createRoom,
  conversations,
  chatSession,
  callSession,
  practiceModes,
  practiceSession,
  storySession,
  vocabPractice,
  grammarPractice,
  pronunciationPractice,
  fluencyPractice,
  analysis,
  tutorBooking,
  profile,
  subscription,
  settings,
  support,
  terms,
  learningMap,
  careerHub,
  assessment,
  assessmentHistory,
  signIn,
  signUp,
  friends,
  userProfile,
  lessonPlayer,
  quickQuiz,
  progressTracker,
}

class NavigationProvider extends ChangeNotifier {
  AppView _currentView = AppView.signIn;
  int _currentBottomNavIndex = 0;
  final List<AppView> _navigationHistory = [];

  AppView get currentView => _currentView;
  int get currentBottomNavIndex => _currentBottomNavIndex;
  List<AppView> get navigationHistory => List.unmodifiable(_navigationHistory);

  void navigateTo(AppView view) {
    if (_currentView != view) {
      _navigationHistory.add(_currentView);
      _currentView = view;
      
      // Update bottom nav index based on view
      _updateBottomNavIndex();
      
      notifyListeners();
    }
  }

  void navigateBack() {
    if (_navigationHistory.isNotEmpty) {
      _currentView = _navigationHistory.removeLast();
      _updateBottomNavIndex();
      notifyListeners();
    }
  }

  void setBottomNavIndex(int index) {
    _currentBottomNavIndex = index;
    
    // Map bottom nav index to view
    switch (index) {
      case 0:
        navigateTo(AppView.dashboard);
        break;
      case 1:
        navigateTo(AppView.roadmap);
        break;
      case 2:
        navigateTo(AppView.challenges);
        break;
      case 3:
        navigateTo(AppView.tutors);
        break;
      case 4:
        navigateTo(AppView.rooms);
        break;
    }
  }

  void _updateBottomNavIndex() {
    switch (_currentView) {
      case AppView.dashboard:
        _currentBottomNavIndex = 0;
        break;
      case AppView.roadmap:
      case AppView.practiceSession:
      case AppView.analysis:
      case AppView.learningMap:
        _currentBottomNavIndex = 1;
        break;
      case AppView.challenges:
        _currentBottomNavIndex = 2;
        break;
      case AppView.tutors:
        _currentBottomNavIndex = 3;
        break;
      case AppView.rooms:
        _currentBottomNavIndex = 4;
        break;
      default:
        // Keep current index for other views
        break;
    }
  }

  void clearHistory() {
    _navigationHistory.clear();
    notifyListeners();
  }
}
