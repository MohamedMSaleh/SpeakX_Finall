import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/app_bar.dart';
import '../../../../shared/widgets/decorative_elements.dart';
import '../../../../shared/widgets/animated_components.dart';

class RoadmapPage extends StatefulWidget {
  const RoadmapPage({super.key});

  @override
  State<RoadmapPage> createState() => _RoadmapPageState();
}

class _RoadmapPageState extends State<RoadmapPage> with TickerProviderStateMixin {
  LevelNode? selectedLevel;
  LevelNode? activeNode;
  bool showSparkles = false;

  final List<Unit> units = [
    Unit(
      id: 1,
      title: 'Level 1: Foundations',
      description: 'Learn the alphabet and basic sounds.',
      color: AppColors.secondarySuccess,
      gradient: AppColors.cardGreenGradient,
      theme: 'forest',
      levels: [
        LevelNode(id: 101, type: NodeType.lesson, status: NodeStatus.completed, xOffset: 0),
        LevelNode(id: 102, type: NodeType.lesson, status: NodeStatus.completed, xOffset: -1),
        LevelNode(id: 103, type: NodeType.chest, status: NodeStatus.completed, xOffset: 0),
        LevelNode(id: 104, type: NodeType.lesson, status: NodeStatus.completed, xOffset: 1),
        LevelNode(id: 105, type: NodeType.trophy, status: NodeStatus.completed, xOffset: 0),
      ],
    ),
    Unit(
      id: 2,
      title: 'Level 2: Basics & Phrases',
      description: 'Introduce yourself and use common phrases.',
      color: AppColors.primaryBlue,
      gradient: AppColors.cardBlueGradient,
      theme: 'snow',
      levels: [
        LevelNode(id: 201, type: NodeType.lesson, status: NodeStatus.completed, xOffset: 0),
        LevelNode(id: 202, type: NodeType.lesson, status: NodeStatus.completed, xOffset: 1),
        LevelNode(id: 203, type: NodeType.chest, status: NodeStatus.completed, xOffset: 1),
        LevelNode(id: 204, type: NodeType.dumbell, status: NodeStatus.completed, xOffset: 0),
        LevelNode(id: 205, type: NodeType.lesson, status: NodeStatus.completed, xOffset: -1),
        LevelNode(id: 206, type: NodeType.book, status: NodeStatus.completed, xOffset: -1),
        LevelNode(id: 207, type: NodeType.trophy, status: NodeStatus.completed, xOffset: 0),
      ],
    ),
    Unit(
      id: 3,
      title: 'Level 3: Conversations',
      description: 'Engage in basic dialogues.',
      color: AppColors.secondaryEnergy,
      gradient: AppColors.cardPurpleGradient,
      theme: 'desert',
      levels: [
        LevelNode(id: 301, type: NodeType.lesson, status: NodeStatus.active, xOffset: 0),
        LevelNode(id: 302, type: NodeType.lesson, status: NodeStatus.locked, xOffset: -1),
        LevelNode(id: 303, type: NodeType.chest, status: NodeStatus.locked, xOffset: 0),
        LevelNode(id: 304, type: NodeType.lesson, status: NodeStatus.locked, xOffset: 1),
        LevelNode(id: 305, type: NodeType.dumbell, status: NodeStatus.locked, xOffset: 1),
        LevelNode(id: 306, type: NodeType.lesson, status: NodeStatus.locked, xOffset: 0),
        LevelNode(id: 307, type: NodeType.trophy, status: NodeStatus.locked, xOffset: 0),
      ],
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.neutralGray50,
      body: Stack(
        children: [
          // Background decorations
          const WaveDecoration(color: AppColors.primaryBlueLight, opacity: 0.05),
          const GlowingOrb(color: AppColors.secondarySuccess, size: 300, top: 100, right: -100),
          
          // Main content
          SafeArea(
            child: Column(
              children: [
                // Custom App Bar
                CustomAppBar(
                  title: 'Your Learning Path',
                  showBackButton: true,
                  actions: [
                    IconButton(
                      icon: const Icon(LucideIcons.settings, color: AppColors.neutralGray600),
                      onPressed: () {},
                    ),
                  ],
                ),
                
                // Scrollable content
                Expanded(
                  child: SingleChildScrollView(
                    child: Padding(
                      padding: EdgeInsets.all(20.w),
                      child: Column(
                        children: [
                          // Units
                          ...units.map((unit) => _buildUnit(unit)),
                          SizedBox(height: 40.h),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          
          // Lesson Detail Modal
          if (selectedLevel != null) _buildLessonDetailModal(),
        ],
      ),
    );
  }

  Widget _buildUnit(Unit unit) {
    return PopInAnimation(
      delay: 100 * unit.id,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Unit Header
          Container(
            margin: EdgeInsets.only(bottom: 24.h),
            padding: EdgeInsets.all(20.w),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: unit.gradient.map((c) => c).toList(),
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(24.r),
              boxShadow: [
                BoxShadow(
                  color: unit.color.withOpacity(0.3),
                  blurRadius: 20.r,
                  offset: Offset(0, 10.h),
                ),
              ],
            ),
            child: Row(
              children: [
                Container(
                  width: 56.w,
                  height: 56.w,
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(16.r),
                  ),
                  child: Icon(
                    _getUnitIcon(unit.theme),
                    color: Colors.white,
                    size: 28.sp,
                  ),
                ),
                SizedBox(width: 16.w),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        unit.title,
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 18.sp,
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                      SizedBox(height: 4.h),
                      Text(
                        unit.description,
                        style: TextStyle(
                          color: Colors.white.withOpacity(0.9),
                          fontSize: 13.sp,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          
          // Level Nodes in zigzag path
          _buildZigzagPath(unit.levels, unit.color),
          
          SizedBox(height: 40.h),
        ],
      ),
    );
  }

  Widget _buildZigzagPath(List<LevelNode> levels, Color color) {
    return SizedBox(
      width: double.infinity,
      child: Column(
        children: [
          for (int i = 0; i < levels.length; i++) ...[
            _buildNodeRow(levels[i], color),
            if (i < levels.length - 1) _buildPathLine(color),
          ],
        ],
      ),
    );
  }

  Widget _buildNodeRow(LevelNode node, Color color) {
    final alignment = node.xOffset == -1
        ? MainAxisAlignment.start
        : node.xOffset == 1
            ? MainAxisAlignment.end
            : MainAxisAlignment.center;

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 40.w),
      child: Row(
        mainAxisAlignment: alignment,
        children: [_buildNode(node, color)],
      ),
    );
  }

  Widget _buildNode(LevelNode node, Color color) {
    final isLocked = node.status == NodeStatus.locked;
    final isActive = node.status == NodeStatus.active;
    final isCompleted = node.status == NodeStatus.completed;

    return GestureDetector(
      onTap: () {
        if (!isLocked) {
          setState(() {
            selectedLevel = node;
          });
        }
      },
      child: AnimatedButton(
        child: Container(
          width: 80.w,
          height: 80.w,
          decoration: BoxDecoration(
            gradient: isLocked
                ? LinearGradient(
                    colors: [AppColors.neutralGray300, AppColors.neutralGray400],
                  )
                : isCompleted
                    ? LinearGradient(colors: [AppColors.secondarySuccess, AppColors.secondarySuccessLight])
                    : LinearGradient(colors: [color, color.withOpacity(0.8)]),
            borderRadius: BorderRadius.circular(20.r),
            border: isActive
                ? Border.all(color: Colors.white, width: 4.w)
                : null,
            boxShadow: [
              if (!isLocked)
                BoxShadow(
                  color: color.withOpacity(0.4),
                  blurRadius: 20.r,
                  offset: Offset(0, 8.h),
                ),
            ],
          ),
          child: Stack(
            children: [
              Center(
                child: Icon(
                  _getNodeIcon(node.type),
                  color: Colors.white,
                  size: 36.sp,
                ),
              ),
              if (isCompleted)
                Positioned(
                  top: 4.h,
                  right: 4.w,
                  child: Container(
                    width: 24.w,
                    height: 24.w,
                    decoration: const BoxDecoration(
                      color: Colors.white,
                      shape: BoxShape.circle,
                    ),
                    child: Icon(
                      LucideIcons.check,
                      color: AppColors.secondarySuccess,
                      size: 16.sp,
                    ),
                  ),
                ),
              if (isLocked)
                Positioned.fill(
                  child: Container(
                    decoration: BoxDecoration(
                      color: Colors.black.withOpacity(0.3),
                      borderRadius: BorderRadius.circular(20.r),
                    ),
                    child: Center(
                      child: Icon(
                        LucideIcons.lock,
                        color: Colors.white,
                        size: 28.sp,
                      ),
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPathLine(Color color) {
    return Container(
      height: 40.h,
      width: 4.w,
      margin: EdgeInsets.symmetric(vertical: 8.h),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [color.withOpacity(0.3), color.withOpacity(0.1)],
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ),
        borderRadius: BorderRadius.circular(2.r),
      ),
    );
  }

  Widget _buildLessonDetailModal() {
    final details = _getNodeDetails(selectedLevel!.id);
    
    return GestureDetector(
      onTap: () => setState(() => selectedLevel = null),
      child: Container(
        color: Colors.black54,
        child: Center(
          child: GestureDetector(
            onTap: () {},
            child: Container(
              margin: EdgeInsets.all(32.w),
              padding: EdgeInsets.all(24.w),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(32.r),
                boxShadow: [
                  BoxShadow(
                    color: AppColors.primaryBlue.withOpacity(0.3),
                    blurRadius: 40.r,
                    offset: Offset(0, 20.h),
                  ),
                ],
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Icon
                  Container(
                    width: 80.w,
                    height: 80.w,
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: AppColors.cardBlueGradient,
                      ),
                      borderRadius: BorderRadius.circular(24.r),
                    ),
                    child: Icon(
                      _getNodeIcon(selectedLevel!.type),
                      color: Colors.white,
                      size: 40.sp,
                    ),
                  ),
                  SizedBox(height: 20.h),
                  
                  // Title
                  Text(
                    details['title']!,
                    style: TextStyle(
                      fontSize: 24.sp,
                      fontWeight: FontWeight.w900,
                      color: AppColors.neutralGray900,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: 8.h),
                  
                  // Unit Label
                  Container(
                    padding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 6.h),
                    decoration: BoxDecoration(
                      color: AppColors.neutralGray100,
                      borderRadius: BorderRadius.circular(20.r),
                    ),
                    child: Text(
                      details['unitLabel']!,
                      style: TextStyle(
                        fontSize: 12.sp,
                        fontWeight: FontWeight.w700,
                        color: AppColors.neutralGray600,
                      ),
                    ),
                  ),
                  SizedBox(height: 16.h),
                  
                  // Description
                  Text(
                    details['description']!,
                    style: TextStyle(
                      fontSize: 14.sp,
                      color: AppColors.neutralGray600,
                      height: 1.5,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: 24.h),
                  
                  // Stats Row
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      _buildStat(LucideIcons.clock, details['time']!),
                      _buildStat(LucideIcons.target, details['difficulty']!),
                      _buildStat(LucideIcons.award, '${details['xp']} XP'),
                    ],
                  ),
                  SizedBox(height: 24.h),
                  
                  // Start Button
                  AnimatedButton(
                    onPressed: () {
                      setState(() => selectedLevel = null);
                      // Navigate to lesson
                    },
                    child: Container(
                      width: double.infinity,
                      padding: EdgeInsets.symmetric(vertical: 16.h),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(colors: AppColors.cardBlueGradient),
                        borderRadius: BorderRadius.circular(20.r),
                      ),
                      child: Text(
                        'Start Lesson',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 16.sp,
                          fontWeight: FontWeight.w900,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildStat(IconData icon, String text) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, size: 16.sp, color: AppColors.primaryBlue),
        SizedBox(width: 4.w),
        Text(
          text,
          style: TextStyle(
            fontSize: 13.sp,
            fontWeight: FontWeight.w700,
            color: AppColors.neutralGray700,
          ),
        ),
      ],
    );
  }

  IconData _getUnitIcon(String theme) {
    switch (theme) {
      case 'forest':
        return LucideIcons.trees;
      case 'desert':
        return LucideIcons.sun;
      case 'snow':
        return LucideIcons.snowflake;
      default:
        return LucideIcons.map;
    }
  }

  IconData _getNodeIcon(NodeType type) {
    switch (type) {
      case NodeType.lesson:
        return LucideIcons.bookOpen;
      case NodeType.chest:
        return LucideIcons.gift;
      case NodeType.trophy:
        return LucideIcons.trophy;
      case NodeType.dumbell:
        return LucideIcons.dumbbell;
      case NodeType.book:
        return LucideIcons.book;
    }
  }

  Map<String, String> _getNodeDetails(int id) {
    // Simplified node details
    return {
      'title': 'Introduction & Greetings',
      'unitLabel': 'Unit ${id ~/ 100} • Step ${id % 100}',
      'description': 'Learn to introduce yourself confidently and ask simple questions.',
      'time': '5 min',
      'difficulty': 'Beginner',
      'xp': '15',
    };
  }
}

// Models
enum NodeType { lesson, book, chest, trophy, dumbell }
enum NodeStatus { completed, active, locked }

class LevelNode {
  final int id;
  final NodeType type;
  final NodeStatus status;
  final int xOffset;

  LevelNode({
    required this.id,
    required this.type,
    required this.status,
    required this.xOffset,
  });
}

class Unit {
  final int id;
  final String title;
  final String description;
  final Color color;
  final List<Color> gradient;
  final String theme;
  final List<LevelNode> levels;

  Unit({
    required this.id,
    required this.title,
    required this.description,
    required this.color,
    required this.gradient,
    required this.theme,
    required this.levels,
  });
}
