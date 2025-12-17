import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../core/providers/navigation_provider.dart';
import '../shared/widgets/app_bar.dart';
import '../shared/widgets/bottom_navigation.dart';
import '../shared/widgets/side_drawer.dart';
import '../features/dashboard/presentation/pages/dashboard_page.dart';
import '../features/roadmap/presentation/pages/roadmap_page.dart';
import '../features/challenges/presentation/pages/challenges_page.dart';
import '../features/tutors/presentation/pages/tutors_page.dart';
import '../features/rooms/presentation/pages/rooms_page.dart';

/// Main app shell with bottom navigation and drawer
class AppShell extends StatefulWidget {
  const AppShell({Key? key}) : super(key: key);

  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> {
  int _currentIndex = 0;
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  final List<Widget> _pages = const [
    DashboardPage(),
    RoadmapPage(),
    ChallengesPage(),
    TutorsPage(),
    RoomsPage(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      appBar: SpeakXAppBar(
        onMenuPressed: () {
          _scaffoldKey.currentState?.openDrawer();
        },
        onNotificationPressed: () {
          // TODO: Show notifications panel
        },
        onChatPressed: () {
          context.read<NavigationProvider>().navigateTo('/conversations');
        },
      ),
      drawer: const SpeakXDrawer(),
      body: IndexedStack(
        index: _currentIndex,
        children: _pages,
      ),
      bottomNavigationBar: SpeakXBottomNavigation(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() => _currentIndex = index);
        },
      ),
    );
  }
}
