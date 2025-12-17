import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/app_bar.dart';
import '../../../../shared/widgets/animated_components.dart';

class AnalysisPage extends StatelessWidget {
  const AnalysisPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.neutralGray50,
      body: SafeArea(
        child: Column(
          children: [
            CustomAppBar(
              title: 'Performance Analysis',
              showBackButton: true,
            ),
            Expanded(
              child: SingleChildScrollView(
                child: Padding(
                  padding: EdgeInsets.all(20.w),
                  child: Column(
                    children: [
                      // Overall Score Card
                      PopInAnimation(
                        child: Container(
                          padding: EdgeInsets.all(32.w),
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              colors: AppColors.cardBlueGradient,
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                            ),
                            borderRadius: BorderRadius.circular(28.r),
                            boxShadow: [
                              BoxShadow(
                                color: AppColors.primaryBlue.withOpacity(0.3),
                                blurRadius: 30.r,
                                offset: Offset(0, 15.h),
                              ),
                            ],
                          ),
                          child: Column(
                            children: [
                              Text(
                                'Overall Performance',
                                style: TextStyle(
                                  color: Colors.white.withOpacity(0.9),
                                  fontSize: 14.sp,
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                              SizedBox(height: 16.h),
                              Text(
                                '85%',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 56.sp,
                                  fontWeight: FontWeight.w900,
                                ),
                              ),
                              SizedBox(height: 8.h),
                              Container(
                                padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 8.h),
                                decoration: BoxDecoration(
                                  color: Colors.white.withOpacity(0.2),
                                  borderRadius: BorderRadius.circular(20.r),
                                ),
                                child: Text(
                                  'Excellent Progress!',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 13.sp,
                                    fontWeight: FontWeight.w700,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      SizedBox(height: 24.h),
                      
                      // Skill Breakdown
                      _buildSkillBar('Pronunciation', 0.90, AppColors.cardGreenGradient),
                      _buildSkillBar('Fluency', 0.85, AppColors.cardBlueGradient),
                      _buildSkillBar('Vocabulary', 0.78, AppColors.cardYellowGradient),
                      _buildSkillBar('Grammar', 0.82, AppColors.cardPurpleGradient),
                      _buildSkillBar('Listening', 0.88, AppColors.cardPinkGradient),
                      SizedBox(height: 24.h),
                      
                      // Stats Grid
                      Row(
                        children: [
                          _buildStatCard('156', 'Hours Practiced', LucideIcons.clock, AppColors.cardBlueGradient),
                          SizedBox(width: 12.w),
                          _buildStatCard('342', 'Lessons Completed', LucideIcons.checkCircle, AppColors.cardGreenGradient),
                        ],
                      ),
                      SizedBox(height: 12.h),
                      Row(
                        children: [
                          _buildStatCard('45', 'Day Streak', LucideIcons.flame, AppColors.cardYellowGradient),
                          SizedBox(width: 12.w),
                          _buildStatCard('12,450', 'Total XP', LucideIcons.award, AppColors.cardPurpleGradient),
                        ],
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

  Widget _buildSkillBar(String skill, double progress, List<Color> gradient) {
    return PopInAnimation(
      child: Container(
        margin: EdgeInsets.only(bottom: 16.h),
        padding: EdgeInsets.all(20.w),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20.r),
          border: Border.all(color: AppColors.neutralGray200, width: 2.w),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  skill,
                  style: TextStyle(
                    fontSize: 15.sp,
                    fontWeight: FontWeight.w900,
                    color: AppColors.neutralGray900,
                  ),
                ),
                Text(
                  '${(progress * 100).round()}%',
                  style: TextStyle(
                    fontSize: 15.sp,
                    fontWeight: FontWeight.w900,
                    color: gradient[0],
                  ),
                ),
              ],
            ),
            SizedBox(height: 12.h),
            AnimatedProgressBar(
              progress: progress,
              gradient: LinearGradient(colors: gradient),
              height: 12.h,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatCard(String value, String label, IconData icon, List<Color> gradient) {
    return Expanded(
      child: Container(
        padding: EdgeInsets.all(20.w),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20.r),
          border: Border.all(color: AppColors.neutralGray200, width: 2.w),
        ),
        child: Column(
          children: [
            Container(
              padding: EdgeInsets.all(12.w),
              decoration: BoxDecoration(
                gradient: LinearGradient(colors: gradient),
                borderRadius: BorderRadius.circular(14.r),
              ),
              child: Icon(icon, color: Colors.white, size: 24.sp),
            ),
            SizedBox(height: 12.h),
            Text(
              value,
              style: TextStyle(
                fontSize: 20.sp,
                fontWeight: FontWeight.w900,
                color: AppColors.neutralGray900,
              ),
            ),
            SizedBox(height: 4.h),
            Text(
              label,
              style: TextStyle(
                fontSize: 12.sp,
                color: AppColors.neutralGray600,
                fontWeight: FontWeight.w600,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
