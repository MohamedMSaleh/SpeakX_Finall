import 'package:flutter/material.dart';

class UserData {
  final String name;
  final String email;
  final String avatarUrl;
  final int points;
  final int streak;
  final String level;
  final int completedLessons;
  final int totalLessons;
  final double progressPercentage;

  UserData({
    required this.name,
    required this.email,
    required this.avatarUrl,
    required this.points,
    required this.streak,
    required this.level,
    required this.completedLessons,
    required this.totalLessons,
    required this.progressPercentage,
  });
}

class UserProvider extends ChangeNotifier {
  UserData _userData = UserData(
    name: 'Amira M.',
    email: 'amira@example.com',
    avatarUrl: 'https://picsum.photos/200/200?random=8',
    points: 1250,
    streak: 12,
    level: 'Pro',
    completedLessons: 24,
    totalLessons: 100,
    progressPercentage: 24.0,
  );

  UserData get userData => _userData;

  void updateUserData(UserData newData) {
    _userData = newData;
    notifyListeners();
  }

  void addPoints(int points) {
    _userData = UserData(
      name: _userData.name,
      email: _userData.email,
      avatarUrl: _userData.avatarUrl,
      points: _userData.points + points,
      streak: _userData.streak,
      level: _userData.level,
      completedLessons: _userData.completedLessons,
      totalLessons: _userData.totalLessons,
      progressPercentage: _userData.progressPercentage,
    );
    notifyListeners();
  }

  void incrementStreak() {
    _userData = UserData(
      name: _userData.name,
      email: _userData.email,
      avatarUrl: _userData.avatarUrl,
      points: _userData.points,
      streak: _userData.streak + 1,
      level: _userData.level,
      completedLessons: _userData.completedLessons,
      totalLessons: _userData.totalLessons,
      progressPercentage: _userData.progressPercentage,
    );
    notifyListeners();
  }

  void completeLesson() {
    final completed = _userData.completedLessons + 1;
    final progress = (completed / _userData.totalLessons) * 100;
    
    _userData = UserData(
      name: _userData.name,
      email: _userData.email,
      avatarUrl: _userData.avatarUrl,
      points: _userData.points,
      streak: _userData.streak,
      level: _userData.level,
      completedLessons: completed,
      totalLessons: _userData.totalLessons,
      progressPercentage: progress,
    );
    notifyListeners();
  }
}
