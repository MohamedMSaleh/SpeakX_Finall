import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:go_router/go_router.dart';

import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/decorative_elements.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/animated_components.dart';

/// Dashboard Page - Main home screen matching React Dashboard.tsx
/// This is a template showing the pattern - implement full 4-card layout and practice areas
class DashboardPage extends StatefulWidget {
  const DashboardPage({super.key});

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GradientBackground(
        gradientColors: const [
          Color(0xFFEEF2FF), // Blue-50
          Color(0xFFEDE9FE), // Purple-50
          Color(0xFFFCE7F3), // Pink-50
        ],
        child: SafeArea(
          child: SingleChildScrollView(
            padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 16.h)
                .copyWith(bottom: 100.h), // Space for bottom nav
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Top 4 Cards Grid
                PopIn(
                  child: _buildTopCardsGrid(),
                ),
                
                SizedBox(height: 24.h),
                
                // Assessment Banner
                PopIn(
                  delay: const Duration(milliseconds: 200),
                  child: _buildAssessmentBanner(),
                ),
                
                SizedBox(height: 24.h),
                
                // Practice Areas Section
                PopIn(
                  delay: const Duration(milliseconds: 300),
                  child: _buildPracticeAreas(),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTopCardsGrid() {
    return GridView.count(
      crossAxisCount: 2,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      crossAxisSpacing: 12.w,
      mainAxisSpacing: 12.h,
      childAspectRatio: 0.95,
      children: [
        _buildFeatureCard(
          title: 'Every step forward is progress!',
          icon: LucideIcons.sparkles,
          gradientColors: const [Color(0xFFE0F2FE), Color(0xFFBAE6FD)], // Sky
          iconGradient: const [Color(0xFF0EA5E9), Color(0xFF3B82F6)],
          accentColor: const Color(0xFF0EA5E9),
        ),
        _buildFeatureCard(
          title: 'Your Progress',
          subtitle: 'Track Goals',
          icon: LucideIcons.trendingUp,
          gradientColors: const [Color(0xFFD1FAE5), Color(0xFFA7F3D0)], // Emerald
          iconGradient: const [Color(0xFF10B981), Color(0xFF14B8A6)],
          accentColor: const Color(0xFF10B981),
          onTap: () => context.push('/progress'),
        ),
        _buildFeatureCard(
          title: 'Roadmap',
          icon: LucideIcons.map,
          gradientColors: const [Color(0xFFEDE9FE), Color(0xFFDDD6FE)], // Violet
          iconGradient: const [Color(0xFF6366F1), Color(0xFF8B5CF6)],
          accentColor: const Color(0xFF6366F1),
          onTap: () => context.push('/roadmap'),
        ),
        _buildFeatureCard(
          title: 'Quick Quiz',
          icon: LucideIcons.zap,
          gradientColors: const [Color(0xFFFEF3C7), Color(0xFFFDE68A)], // Amber
          iconGradient: const [Color(0xFFF59E0B), Color(0xFFFBBF24)],
          accentColor: const Color(0xFFF59E0B),
          onTap: () => context.push('/quickquiz'),
        ),
      ],
    );
  }

  Widget _buildFeatureCard({
    required String title,
    String? subtitle,
    required IconData icon,
    required List<Color> gradientColors,
    required List<Color> iconGradient,
    required Color accentColor,
    VoidCallback? onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: gradientColors,
          ),
          borderRadius: BorderRadius.circular(20.r),
          border: Border.all(color: Colors.white.withOpacity(0.6), width: 2),
          boxShadow: [
            BoxShadow(
              color: accentColor.withOpacity(0.2),
              blurRadius: 12,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        padding: EdgeInsets.all(16.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Icon
            Container(
              width: 48.w,
              height: 48.w,
              decoration: BoxDecoration(
                gradient: LinearGradient(colors: iconGradient),
                borderRadius: BorderRadius.circular(14.r),
                boxShadow: [
                  BoxShadow(
                    color: accentColor.withOpacity(0.3),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: Icon(icon, color: Colors.white, size: 24.sp),
            ),
            
            const Spacer(),
            
            // Title
            Text(
              title,
              style: TextStyle(
                fontSize: 15.sp,
                fontWeight: FontWeight.w900,
                color: AppColors.neutralGray900,
              ),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
            
            if (subtitle != null) ...[
              SizedBox(height: 4.h),
              Text(
                subtitle,
                style: TextStyle(
                  fontSize: 12.sp,
                  fontWeight: FontWeight.w700,
                  color: AppColors.neutralGray700,
                ),
              ),
            ],
            
            // Accent dot
            Positioned(
              top: 8.w,
              right: 8.w,
              child: Container(
                width: 6.w,
                height: 6.w,
                decoration: BoxDecoration(
                  color: accentColor,
                  shape: BoxShape.circle,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAssessmentBanner() {
    return Container(
      padding: EdgeInsets.all(20.w),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: AppColors.cardBlueGradient,
        ),
        borderRadius: BorderRadius.circular(24.r),
        boxShadow: AppShadows.large,
      ),
      child: Row(
        children: [
          Container(
            width: 56.w,
            height: 56.w,
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.2),
              borderRadius: BorderRadius.circular(16.r),
              border: Border.all(color: Colors.white.withOpacity(0.3), width: 2),
            ),
            child: Icon(
              LucideIcons.target,
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
                  'Assess Me 🚀',
                  style: TextStyle(
                    fontSize: 22.sp,
                    fontWeight: FontWeight.w900,
                    color: Colors.white,
                  ),
                ),
                SizedBox(height: 4.h),
                Text(
                  'Get a personalized plan based on your skills',
                  style: TextStyle(
                    fontSize: 12.sp,
                    fontWeight: FontWeight.w500,
                    color: Colors.white.withOpacity(0.9),
                  ),
                ),
              ],
            ),
          ),
          
          SizedBox(width: 12.w),
          
          Container(
            padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 12.h),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(14.r),
            ),
            child: Text(
              'Start ✨',
              style: TextStyle(
                fontSize: 14.sp,
                fontWeight: FontWeight.w900,
                color: AppColors.primaryBlue,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPracticeAreas() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Icon(LucideIcons.zap, color: AppColors.primaryBlue, size: 24.sp),
            SizedBox(width: 8.w),
            Text(
              'Practice Areas',
              style: TextStyle(
                fontSize: 22.sp,
                fontWeight: FontWeight.w900,
                color: AppColors.neutralGray900,
              ),
            ),
          ],
        ),
        
        SizedBox(height: 16.h),
        
        GridView.count(
          crossAxisCount: 2,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          crossAxisSpacing: 12.w,
          mainAxisSpacing: 12.h,
          childAspectRatio: 1.1,
          children: [
            _buildPracticeCard(
              title: 'Vocabulary',
              subtitle: 'Expand words',
              icon: LucideIcons.bookOpen,
              gradientColors: const [Color(0xFFE0F2FE), Color(0xFFBAE6FD)],
            ),
            _buildPracticeCard(
              title: 'Grammar',
              subtitle: 'Master rules',
              icon: LucideIcons.bookOpenCheck,
              gradientColors: const [Color(0xFFD1FAE5), Color(0xFFA7F3D0)],
            ),
            _buildPracticeCard(
              title: 'Speaking',
              subtitle: 'Practice fluency',
              icon: LucideIcons.mic,
              gradientColors: const [Color(0xFFFCE7F3), Color(0xFFFBCFE8)],
            ),
            _buildPracticeCard(
              title: 'Listening',
              subtitle: 'Improve comprehension',
              icon: LucideIcons.headphones,
              gradientColors: const [Color(0xFFFEF3C7), Color(0xFFFDE68A)],
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildPracticeCard({
    required String title,
    required String subtitle,
    required IconData icon,
    required List<Color> gradientColors,
  }) {
    return Container(
      padding: EdgeInsets.all(16.w),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: gradientColors,
        ),
        borderRadius: BorderRadius.circular(20.r),
        border: Border.all(color: Colors.white.withOpacity(0.6), width: 2),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Icon(icon, size: 32.sp, color: AppColors.neutralGray700),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: TextStyle(
                  fontSize: 16.sp,
                  fontWeight: FontWeight.w900,
                  color: AppColors.neutralGray900,
                ),
              ),
              SizedBox(height: 2.h),
              Text(
                subtitle,
                style: TextStyle(
                  fontSize: 12.sp,
                  fontWeight: FontWeight.w600,
                  color: AppColors.neutralGray700,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
