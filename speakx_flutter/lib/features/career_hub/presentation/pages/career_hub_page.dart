import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/app_bar.dart';
import '../../../../shared/widgets/animated_components.dart';

class CareerHubPage extends StatelessWidget {
  const CareerHubPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.neutralGray50,
      body: SafeArea(
        child: Column(
          children: [
            CustomAppBar(
              title: 'Career Hub',
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
                                child: Icon(LucideIcons.briefcase, color: Colors.white, size: 40.sp),
                              ),
                              SizedBox(width: 16.w),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'Boost Your Career',
                                      style: TextStyle(
                                        color: Colors.white,
                                        fontSize: 20.sp,
                                        fontWeight: FontWeight.w900,
                                      ),
                                    ),
                                    SizedBox(height: 4.h),
                                    Text(
                                      'Professional English courses',
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
                      SizedBox(height: 24.h),
                      
                      // Course Categories
                      _buildCourseCard(
                        title: 'Business English',
                        description: 'Master workplace communication',
                        icon: LucideIcons.briefcase,
                        gradient: AppColors.cardBlueGradient,
                        lessons: 24,
                        delay: 0,
                      ),
                      _buildCourseCard(
                        title: 'Interview Preparation',
                        description: 'Ace your job interviews',
                        icon: LucideIcons.userCheck,
                        gradient: AppColors.cardGreenGradient,
                        lessons: 18,
                        delay: 100,
                      ),
                      _buildCourseCard(
                        title: 'Presentation Skills',
                        description: 'Deliver impactful presentations',
                        icon: LucideIcons.presentation,
                        gradient: AppColors.cardPurpleGradient,
                        lessons: 15,
                        delay: 200,
                      ),
                      _buildCourseCard(
                        title: 'Email Writing',
                        description: 'Write professional emails',
                        icon: LucideIcons.mail,
                        gradient: AppColors.cardYellowGradient,
                        lessons: 12,
                        delay: 300,
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

  Widget _buildCourseCard({
    required String title,
    required String description,
    required IconData icon,
    required List<Color> gradient,
    required int lessons,
    required int delay,
  }) {
    return PopInAnimation(
      delay: delay,
      child: Container(
        margin: EdgeInsets.only(bottom: 16.h),
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
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: () {},
            borderRadius: BorderRadius.circular(24.r),
            child: Padding(
              padding: EdgeInsets.all(20.w),
              child: Row(
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
                          description,
                          style: TextStyle(
                            fontSize: 13.sp,
                            color: AppColors.neutralGray600,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        SizedBox(height: 8.h),
                        Row(
                          children: [
                            Icon(LucideIcons.bookOpen, size: 14.sp, color: AppColors.primaryBlue),
                            SizedBox(width: 4.w),
                            Text(
                              '$lessons lessons',
                              style: TextStyle(
                                fontSize: 12.sp,
                                color: AppColors.primaryBlue,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  Icon(LucideIcons.chevronRight, color: AppColors.neutralGray400, size: 24.sp),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
