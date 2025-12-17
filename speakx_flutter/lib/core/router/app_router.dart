import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../features/auth/presentation/pages/sign_in_page.dart';
import '../../features/auth/presentation/pages/sign_up_page.dart';
import '../../features/dashboard/presentation/pages/dashboard_page.dart';
import '../../features/roadmap/presentation/pages/roadmap_page.dart';
import '../../features/challenges/presentation/pages/challenges_page.dart';
import '../../features/tutors/presentation/pages/tutors_page.dart';
import '../../features/rooms/presentation/pages/rooms_page.dart';
import '../../features/profile/presentation/pages/profile_page.dart';
import '../../features/settings/presentation/pages/settings_page.dart';

/// App navigation router using GoRouter for clean navigation
class AppRouter {
  AppRouter._();

  static final GoRouter router = GoRouter(
    initialLocation: '/signin',
    debugLogDiagnostics: true,
    
    routes: [
      // Auth Routes
      GoRoute(
        path: '/signin',
        name: 'signin',
        pageBuilder: (context, state) => _buildPageWithSlideTransition(
          context,
          state,
          const SignInPage(),
        ),
      ),
      
      GoRoute(
        path: '/signup',
        name: 'signup',
        pageBuilder: (context, state) => _buildPageWithSlideTransition(
          context,
          state,
          const SignUpPage(),
        ),
      ),
      
      // Main Routes
      GoRoute(
        path: '/dashboard',
        name: 'dashboard',
        pageBuilder: (context, state) => _buildPageWithFadeTransition(
          context,
          state,
          const DashboardPage(),
        ),
      ),
      
      GoRoute(
        path: '/roadmap',
        name: 'roadmap',
        pageBuilder: (context, state) => _buildPageWithSlideTransition(
          context,
          state,
          const RoadmapPage(),
        ),
      ),
      
      GoRoute(
        path: '/challenges',
        name: 'challenges',
        pageBuilder: (context, state) => _buildPageWithSlideTransition(
          context,
          state,
          const ChallengesPage(),
        ),
      ),
      
      GoRoute(
        path: '/tutors',
        name: 'tutors',
        pageBuilder: (context, state) => _buildPageWithSlideTransition(
          context,
          state,
          const TutorsPage(),
        ),
      ),
      
      GoRoute(
        path: '/rooms',
        name: 'rooms',
        pageBuilder: (context, state) => _buildPageWithSlideTransition(
          context,
          state,
          const RoomsPage(),
        ),
      ),
      
      GoRoute(
        path: '/profile',
        name: 'profile',
        pageBuilder: (context, state) => _buildPageWithSlideTransition(
          context,
          state,
          const ProfilePage(),
        ),
      ),
      
      GoRoute(
        path: '/settings',
        name: 'settings',
        pageBuilder: (context, state) => _buildPageWithSlideTransition(
          context,
          state,
          const SettingsPage(),
        ),
      ),
    ],
    
    errorPageBuilder: (context, state) => MaterialPage(
      key: state.pageKey,
      child: Scaffold(
        body: Center(
          child: Text('Page not found: ${state.uri}'),
        ),
      ),
    ),
  );

  /// Build page with slide transition (from right)
  static Page _buildPageWithSlideTransition(
    BuildContext context,
    GoRouterState state,
    Widget child,
  ) {
    return CustomTransitionPage(
      key: state.pageKey,
      child: child,
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        const begin = Offset(1.0, 0.0);
        const end = Offset.zero;
        const curve = Curves.easeInOutCubic;
        
        var tween = Tween(begin: begin, end: end).chain(
          CurveTween(curve: curve),
        );
        
        var offsetAnimation = animation.drive(tween);
        
        return SlideTransition(
          position: offsetAnimation,
          child: child,
        );
      },
    );
  }

  /// Build page with fade transition
  static Page _buildPageWithFadeTransition(
    BuildContext context,
    GoRouterState state,
    Widget child,
  ) {
    return CustomTransitionPage(
      key: state.pageKey,
      child: child,
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        return FadeTransition(
          opacity: animation,
          child: child,
        );
      },
    );
  }

  /// Build page with scale transition
  static Page _buildPageWithScaleTransition(
    BuildContext context,
    GoRouterState state,
    Widget child,
  ) {
    return CustomTransitionPage(
      key: state.pageKey,
      child: child,
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        const begin = 0.8;
        const end = 1.0;
        const curve = Curves.easeOutCubic;
        
        var tween = Tween(begin: begin, end: end).chain(
          CurveTween(curve: curve),
        );
        
        return ScaleTransition(
          scale: animation.drive(tween),
          child: FadeTransition(
            opacity: animation,
            child: child,
          ),
        );
      },
    );
  }
}
