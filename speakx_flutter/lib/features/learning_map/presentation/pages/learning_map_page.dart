import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/app_bar.dart';
import '../../../../shared/widgets/animated_components.dart';

class LearningMapPage extends StatelessWidget {
  const LearningMapPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.neutralGray50,
      body: SafeArea(
        child: Column(
          children: [
            CustomAppBar(
              title: 'Learning Map',
              showBackButton: true,
            ),
            Expanded(
              child: SingleChildScrollView(
                child: Padding(
                  padding: EdgeInsets.all(20.w),
                  child: Column(
                    children: [
                      // Hero Section
                      PopInAnimation(
                        child: Container(
                          padding: EdgeInsets.all(24.w),
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              colors: AppColors.cardPurpleGradient,
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                            ),
                            borderRadius: BorderRadius.circular(28.r),
                            boxShadow: [
                              BoxShadow(
                                color: AppColors.secondaryEnergy.withOpacity(0.3),
                                blurRadius: 30.r,
                                offset: Offset(0, 15.h),
                              ),
                            ],
                          ),
                          child: Row(
                            children: [
                              Container(
                                width: 80.w,
                                height: 80.w,
                                decoration: BoxDecoration(
                                  color: Colors.white.withOpacity(0.2),
                                  shape: BoxShape.circle,
                                ),
                                child: Icon(LucideIcons.map, color: Colors.white, size: 40.sp),
                              ),
                              SizedBox(width: 16.w),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'Your Skills Tree',
                                      style: TextStyle(
                                        color: Colors.white,
                                        fontSize: 20.sp,
                                        fontWeight: FontWeight.w900,
                                      ),
                                    ),
                                    SizedBox(height: 4.h),
                                    Text(
                                      'Master all skills to level up!',
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
                      ),
                      SizedBox(height: 32.h),
                      
                      // Skills Grid
                      _buildSkillCard(
                        title: 'Pronunciation',
                        icon: LucideIcons.mic,
                        progress: 0.75,
                        level: 15,
                        gradient: AppColors.cardBlueGradient,
                        delay: 0,
                      ),
                      _buildSkillCard(
                        title: 'Vocabulary',
                        icon: LucideIcons.bookOpen,
                        progress: 0.60,
                        level: 12,
                        gradient: AppColors.cardGreenGradient,
                        delay: 100,
                      ),
                      _buildSkillCard(
                        title: 'Grammar',
                        icon: LucideIcons.code,
                        progress: 0.45,
                        level: 9,
                        gradient: AppColors.cardYellowGradient,
                        delay: 200,
                      ),
                      _buildSkillCard(
                        title: 'Fluency',
                        icon: LucideIcons.messageCircle,
                        progress: 0.85,
                        level: 17,
                        gradient: AppColors.cardPurpleGradient,
                        delay: 300,
                      ),
                      _buildSkillCard(
                        title: 'Listening',
                        icon: LucideIcons.headphones,
                        progress: 0.55,
                        level: 11,
                        gradient: AppColors.cardPinkGradient,
                        delay: 400,
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSkillCard({
    required String title,
    required IconData icon,
    required double progress,
    required int level,
    required List<Color> gradient,
    required int delay,
  }) {
    return PopInAnimation(
      delay: delay,
      child: Container(
        margin: EdgeInsets.only(bottom: 16.h),
        padding: EdgeInsets.all(20.w),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(24.r),
          border: Border.all(color: AppColors.neutralGray200, width: 2.w),
          boxShadow: [
            BoxShadow(
              color: AppColors.neutralGray300.withOpacity(0.2),
              blurRadius: 15.r,
              offset: Offset(0, 5.h),
            ),
          ],
        ),
        child: Column(
          children: [
            Row(
              children: [
                Container(
                  width: 64.w,
                  height: 64.w,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(colors: gradient),
                    borderRadius: BorderRadius.circular(18.r),
                  ),
                  child: Icon(icon, color: Colors.white, size: 32.sp),
                ),
                SizedBox(width: 16.w),
                Expanded(
                  child: Column(
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
                      SizedBox(height: 4.h),
                      Text(
                        'Level $level',
                        style: TextStyle(
                          fontSize: 13.sp,
                          color: AppColors.neutralGray600,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 8.h),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(colors: gradient),
                    borderRadius: BorderRadius.circular(12.r),
                  ),
                  child: Text(
                    '${(progress * 100).round()}%',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 13.sp,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: 16.h),
            AnimatedProgressBar(
              progress: progress,
              gradient: LinearGradient(colors: gradient),
              height: 10.h,
            ),
            SizedBox(height: 16.h),
            AnimatedButton(
              onPressed: () {},
              child: Container(
                width: double.infinity,
                padding: EdgeInsets.symmetric(vertical: 12.h),
                decoration: BoxDecoration(
                  gradient: LinearGradient(colors: gradient),
                  borderRadius: BorderRadius.circular(16.r),
                ),
                child: Text(
                  'Practice Now',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w900,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
