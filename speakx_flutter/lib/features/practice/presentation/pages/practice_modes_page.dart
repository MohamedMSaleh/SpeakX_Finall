import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/app_bar.dart';
import '../../../../shared/widgets/animated_components.dart';

class PracticeModesPage extends StatelessWidget {
  const PracticeModesPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.neutralGray50,
      body: SafeArea(
        child: Column(
          children: [
            CustomAppBar(
              title: 'Practice Modes',
              showBackButton: true,
            ),
            Expanded(
              child: SingleChildScrollView(
                child: Padding(
                  padding: EdgeInsets.all(20.w),
                  child: Column(
                    children: [
                      _buildModeCard(
                        context,
                        title: 'Fluency Practice',
                        description: 'Improve your speaking speed and confidence',
                        icon: LucideIcons.messageCircle,
                        gradient: AppColors.cardBlueGradient,
                        delay: 0,
                      ),
                      _buildModeCard(
                        context,
                        title: 'Pronunciation',
                        description: 'Perfect your accent and clarity',
                        icon: LucideIcons.mic,
                        gradient: AppColors.cardGreenGradient,
                        delay: 100,
                      ),
                      _buildModeCard(
                        context,
                        title: 'Vocabulary',
                        description: 'Expand your word knowledge',
                        icon: LucideIcons.bookOpen,
                        gradient: AppColors.cardYellowGradient,
                        delay: 200,
                      ),
                      _buildModeCard(
                        context,
                        title: 'Grammar',
                        description: 'Master sentence structure and rules',
                        icon: LucideIcons.code,
                        gradient: AppColors.cardPurpleGradient,
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

  Widget _buildModeCard(
    BuildContext context, {
    required String title,
    required String description,
    required IconData icon,
    required List<Color> gradient,
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
            onTap: () {
              // Navigate to specific practice mode
            },
            borderRadius: BorderRadius.circular(24.r),
            child: Padding(
              padding: EdgeInsets.all(20.w),
              child: Row(
                children: [
                  Container(
                    width: 72.w,
                    height: 72.w,
                    decoration: BoxDecoration(
                      gradient: LinearGradient(colors: gradient),
                      borderRadius: BorderRadius.circular(20.r),
                    ),
                    child: Icon(icon, color: Colors.white, size: 36.sp),
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
                        SizedBox(height: 6.h),
                        Text(
                          description,
                          style: TextStyle(
                            fontSize: 13.sp,
                            color: AppColors.neutralGray600,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Icon(
                    LucideIcons.chevronRight,
                    color: AppColors.neutralGray400,
                    size: 24.sp,
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
