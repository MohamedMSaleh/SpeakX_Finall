import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/app_bar.dart';
import '../../../../shared/widgets/animated_components.dart';

class UserProfilePage extends StatelessWidget {
  final String userName;
  final String userAvatar;

  const UserProfilePage({
    super.key,
    required this.userName,
    required this.userAvatar,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.neutralGray50,
      body: SafeArea(
        child: Column(
          children: [
            CustomAppBar(
              title: userName,
              showBackButton: true,
              actions: [
                IconButton(
                  icon: const Icon(LucideIcons.moreVertical, color: AppColors.neutralGray600),
                  onPressed: () {},
                ),
              ],
            ),
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    SizedBox(height: 20.h),
                    
                    // Profile Header
                    PopInAnimation(
                      child: Column(
                        children: [
                          Container(
                            width: 120.w,
                            height: 120.w,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              border: Border.all(color: AppColors.primaryBlue, width: 4.w),
                              image: DecorationImage(
                                image: NetworkImage(userAvatar),
                                fit: BoxFit.cover,
                              ),
                            ),
                          ),
                          SizedBox(height: 16.h),
                          Text(
                            userName,
                            style: TextStyle(
                              fontSize: 24.sp,
                              fontWeight: FontWeight.w900,
                              color: AppColors.neutralGray900,
                            ),
                          ),
                          SizedBox(height: 8.h),
                          Container(
                            padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 8.h),
                            decoration: BoxDecoration(
                              gradient: LinearGradient(colors: AppColors.cardBlueGradient),
                              borderRadius: BorderRadius.circular(20.r),
                            ),
                            child: Text(
                              'Level 15 • Intermediate',
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
                    SizedBox(height: 32.h),
                    
                    Padding(
                      padding: EdgeInsets.symmetric(horizontal: 20.w),
                      child: Column(
                        children: [
                          // Stats Row
                          Row(
                            children: [
                              _buildStatCard('1,250', 'XP', AppColors.cardBlueGradient),
                              SizedBox(width: 12.w),
                              _buildStatCard('45', 'Streak', AppColors.cardYellowGradient),
                              SizedBox(width: 12.w),
                              _buildStatCard('28', 'Friends', AppColors.cardPinkGradient),
                            ],
                          ),
                          SizedBox(height: 24.h),
                          
                          // Action Buttons
                          Row(
                            children: [
                              Expanded(
                                child: AnimatedButton(
                                  onPressed: () {},
                                  child: Container(
                                    padding: EdgeInsets.symmetric(vertical: 14.h),
                                    decoration: BoxDecoration(
                                      gradient: LinearGradient(colors: AppColors.cardBlueGradient),
                                      borderRadius: BorderRadius.circular(16.r),
                                    ),
                                    child: Row(
                                      mainAxisAlignment: MainAxisAlignment.center,
                                      children: [
                                        Icon(LucideIcons.userPlus, color: Colors.white, size: 18.sp),
                                        SizedBox(width: 8.w),
                                        Text(
                                          'Add Friend',
                                          style: TextStyle(
                                            color: Colors.white,
                                            fontSize: 14.sp,
                                            fontWeight: FontWeight.w900,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ),
                              SizedBox(width: 12.w),
                              AnimatedButton(
                                onPressed: () {},
                                child: Container(
                                  padding: EdgeInsets.all(14.w),
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(16.r),
                                    border: Border.all(color: AppColors.neutralGray200, width: 2.w),
                                  ),
                                  child: Icon(LucideIcons.messageCircle, color: AppColors.primaryBlue, size: 20.sp),
                                ),
                              ),
                            ],
                          ),
                          SizedBox(height: 32.h),
                          
                          // Achievements Section
                          _buildSectionHeader('Achievements'),
                          SizedBox(height: 16.h),
                          _buildAchievementsList(),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatCard(String value, String label, List<Color> gradient) {
    return Expanded(
      child: Container(
        padding: EdgeInsets.all(16.w),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20.r),
          border: Border.all(color: AppColors.neutralGray200, width: 2.w),
        ),
        child: Column(
          children: [
            Container(
              padding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 6.h),
              decoration: BoxDecoration(
                gradient: LinearGradient(colors: gradient),
                borderRadius: BorderRadius.circular(12.r),
              ),
              child: Text(
                value,
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 18.sp,
                  fontWeight: FontWeight.w900,
                ),
              ),
            ),
            SizedBox(height: 8.h),
            Text(
              label,
              style: TextStyle(
                fontSize: 12.sp,
                color: AppColors.neutralGray600,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Row(
      children: [
        Text(
          title,
          style: TextStyle(
            fontSize: 18.sp,
            fontWeight: FontWeight.w900,
            color: AppColors.neutralGray900,
          ),
        ),
      ],
    );
  }

  Widget _buildAchievementsList() {
    final achievements = [
      {'icon': LucideIcons.trophy, 'title': 'First Victory', 'subtitle': 'Complete first lesson'},
      {'icon': LucideIcons.flame, 'title': 'On Fire', 'subtitle': '7 day streak'},
      {'icon': LucideIcons.star, 'title': 'Super Star', 'subtitle': 'Score 100% on quiz'},
    ];

    return Column(
      children: achievements.map((achievement) {
        return Container(
          margin: EdgeInsets.only(bottom: 12.h),
          padding: EdgeInsets.all(16.w),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(20.r),
            border: Border.all(color: AppColors.neutralGray200, width: 2.w),
          ),
          child: Row(
            children: [
              Container(
                width: 48.w,
                height: 48.w,
                decoration: BoxDecoration(
                  gradient: LinearGradient(colors: AppColors.cardYellowGradient),
                  borderRadius: BorderRadius.circular(14.r),
                ),
                child: Icon(achievement['icon'] as IconData, color: Colors.white, size: 24.sp),
              ),
              SizedBox(width: 16.w),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      achievement['title'] as String,
                      style: TextStyle(
                        fontSize: 14.sp,
                        fontWeight: FontWeight.w900,
                        color: AppColors.neutralGray900,
                      ),
                    ),
                    SizedBox(height: 4.h),
                    Text(
                      achievement['subtitle'] as String,
                      style: TextStyle(
                        fontSize: 12.sp,
                        color: AppColors.neutralGray600,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      }).toList(),
    );
  }
}
