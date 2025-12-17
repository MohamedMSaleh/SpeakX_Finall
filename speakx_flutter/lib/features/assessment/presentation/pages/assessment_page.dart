import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/app_bar.dart';
import '../../../../shared/widgets/animated_components.dart';

class AssessmentPage extends StatelessWidget {
  const AssessmentPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.neutralGray50,
      body: SafeArea(
        child: Column(
          children: [
            CustomAppBar(
              title: 'Assessment',
              showBackButton: true,
              actions: [
                IconButton(
                  icon: const Icon(LucideIcons.history, color: AppColors.neutralGray600),
                  onPressed: () {
                    // Navigate to history
                  },
                ),
              ],
            ),
            Expanded(
              child: SingleChildScrollView(
                child: Padding(
                  padding: EdgeInsets.all(20.w),
                  child: Column(
                    children: [
                      // Hero Card
                      PopInAnimation(
                        child: Container(
                          padding: EdgeInsets.all(32.w),
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              colors: AppColors.cardPurpleGradient,
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                            ),
                            borderRadius: BorderRadius.circular(32.r),
                            boxShadow: [
                              BoxShadow(
                                color: AppColors.secondaryEnergy.withOpacity(0.3),
                                blurRadius: 30.r,
                                offset: Offset(0, 15.h),
                              ),
                            ],
                          ),
                          child: Column(
                            children: [
                              Container(
                                width: 100.w,
                                height: 100.w,
                                decoration: BoxDecoration(
                                  color: Colors.white.withOpacity(0.2),
                                  shape: BoxShape.circle,
                                ),
                                child: Icon(
                                  LucideIcons.clipboardCheck,
                                  color: Colors.white,
                                  size: 50.sp,
                                ),
                              ),
                              SizedBox(height: 24.h),
                              Text(
                                'English Proficiency Test',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 24.sp,
                                  fontWeight: FontWeight.w900,
                                ),
                                textAlign: TextAlign.center,
                              ),
                              SizedBox(height: 12.h),
                              Text(
                                'Test your speaking, listening, reading, and grammar skills',
                                style: TextStyle(
                                  color: Colors.white.withOpacity(0.9),
                                  fontSize: 14.sp,
                                  fontWeight: FontWeight.w600,
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ],
                          ),
                        ),
                      ),
                      SizedBox(height: 32.h),
                      
                      // Test Details
                      _buildDetailCard(
                        icon: LucideIcons.clock,
                        title: 'Duration',
                        value: '15-20 minutes',
                        color: AppColors.primaryBlue,
                      ),
                      SizedBox(height: 16.h),
                      _buildDetailCard(
                        icon: LucideIcons.target,
                        title: 'Questions',
                        value: '20 Questions',
                        color: AppColors.secondarySuccess,
                      ),
                      SizedBox(height: 16.h),
                      _buildDetailCard(
                        icon: LucideIcons.trophy,
                        title: 'Reward',
                        value: '100 XP',
                        color: AppColors.secondaryWarning,
                      ),
                      SizedBox(height: 32.h),
                      
                      // What's Included
                      Container(
                        padding: EdgeInsets.all(20.w),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(24.r),
                          border: Border.all(color: AppColors.neutralGray200, width: 2.w),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'What\'s Included',
                              style: TextStyle(
                                fontSize: 16.sp,
                                fontWeight: FontWeight.w900,
                                color: AppColors.neutralGray900,
                              ),
                            ),
                            SizedBox(height: 16.h),
                            _buildIncludedItem('Speaking Skills', LucideIcons.mic),
                            _buildIncludedItem('Listening Comprehension', LucideIcons.headphones),
                            _buildIncludedItem('Reading & Vocabulary', LucideIcons.bookOpen),
                            _buildIncludedItem('Grammar & Structure', LucideIcons.code),
                          ],
                        ),
                      ),
                      SizedBox(height: 32.h),
                      
                      // Start Button
                      AnimatedButton(
                        onPressed: () {
                          // Start assessment
                        },
                        child: Container(
                          width: double.infinity,
                          padding: EdgeInsets.symmetric(vertical: 18.h),
                          decoration: BoxDecoration(
                            gradient: LinearGradient(colors: AppColors.cardBlueGradient),
                            borderRadius: BorderRadius.circular(20.r),
                            boxShadow: [
                              BoxShadow(
                                color: AppColors.primaryBlue.withOpacity(0.3),
                                blurRadius: 20.r,
                                offset: Offset(0, 10.h),
                              ),
                            ],
                          ),
                          child: Text(
                            'Start Assessment',
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
          ],
        ),
      ),
    );
  }

  Widget _buildDetailCard({
    required IconData icon,
    required String title,
    required String value,
    required Color color,
  }) {
    return Container(
      padding: EdgeInsets.all(20.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20.r),
        border: Border.all(color: AppColors.neutralGray200, width: 2.w),
      ),
      child: Row(
        children: [
          Container(
            width: 56.w,
            height: 56.w,
            decoration: BoxDecoration(
              color: color.withOpacity(0.1),
              borderRadius: BorderRadius.circular(16.r),
            ),
            child: Icon(icon, color: color, size: 28.sp),
          ),
          SizedBox(width: 16.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 13.sp,
                    color: AppColors.neutralGray600,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                SizedBox(height: 4.h),
                Text(
                  value,
                  style: TextStyle(
                    fontSize: 16.sp,
                    color: AppColors.neutralGray900,
                    fontWeight: FontWeight.w900,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildIncludedItem(String text, IconData icon) {
    return Padding(
      padding: EdgeInsets.only(bottom: 12.h),
      child: Row(
        children: [
          Container(
            width: 32.w,
            height: 32.w,
            decoration: BoxDecoration(
              color: AppColors.secondarySuccess.withOpacity(0.1),
              shape: BoxShape.circle,
            ),
            child: Icon(icon, color: AppColors.secondarySuccess, size: 16.sp),
          ),
          SizedBox(width: 12.w),
          Expanded(
            child: Text(
              text,
              style: TextStyle(
                fontSize: 14.sp,
                color: AppColors.neutralGray700,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
