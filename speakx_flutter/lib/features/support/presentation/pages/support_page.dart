import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/app_bar.dart';

class SupportPage extends StatelessWidget {
  const SupportPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.neutralGray50,
      body: SafeArea(
        child: Column(
          children: [
            CustomAppBar(
              title: 'Help & Support',
              showBackButton: true,
            ),
            Expanded(
              child: SingleChildScrollView(
                child: Padding(
                  padding: EdgeInsets.all(20.w),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Contact Cards
                      _buildContactCard(
                        icon: LucideIcons.mail,
                        title: 'Email Support',
                        subtitle: 'support@speakx.com',
                        gradient: AppColors.cardBlueGradient,
                      ),
                      SizedBox(height: 16.h),
                      _buildContactCard(
                        icon: LucideIcons.messageCircle,
                        title: 'Live Chat',
                        subtitle: 'Chat with our team',
                        gradient: AppColors.cardGreenGradient,
                      ),
                      SizedBox(height: 32.h),
                      
                      // FAQ Section
                      Text(
                        'Frequently Asked Questions',
                        style: TextStyle(
                          fontSize: 18.sp,
                          fontWeight: FontWeight.w900,
                          color: AppColors.neutralGray900,
                        ),
                      ),
                      SizedBox(height: 16.h),
                      
                      _buildFAQ(
                        question: 'How do I reset my password?',
                        answer: 'Go to Settings > Account > Change Password to reset your password.',
                      ),
                      _buildFAQ(
                        question: 'Can I use SpeakX offline?',
                        answer: 'Premium users can download lessons for offline practice.',
                      ),
                      _buildFAQ(
                        question: 'How do I cancel my subscription?',
                        answer: 'Go to Settings > Subscription > Manage Subscription to cancel.',
                      ),
                      _buildFAQ(
                        question: 'Is there a free trial?',
                        answer: 'Yes! All premium plans include a 7-day free trial.',
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

  Widget _buildContactCard({
    required IconData icon,
    required String title,
    required String subtitle,
    required List<Color> gradient,
  }) {
    return Container(
      padding: EdgeInsets.all(20.w),
      decoration: BoxDecoration(
        gradient: LinearGradient(colors: gradient),
        borderRadius: BorderRadius.circular(24.r),
        boxShadow: [
          BoxShadow(
            color: gradient[0].withOpacity(0.3),
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
            child: Icon(icon, color: Colors.white, size: 28.sp),
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
                    color: Colors.white,
                  ),
                ),
                SizedBox(height: 4.h),
                Text(
                  subtitle,
                  style: TextStyle(
                    fontSize: 13.sp,
                    fontWeight: FontWeight.w600,
                    color: Colors.white.withOpacity(0.9),
                  ),
                ),
              ],
            ),
          ),
          Icon(LucideIcons.chevronRight, color: Colors.white, size: 24.sp),
        ],
      ),
    );
  }

  Widget _buildFAQ({required String question, required String answer}) {
    return Container(
      margin: EdgeInsets.only(bottom: 12.h),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20.r),
        border: Border.all(color: AppColors.neutralGray200, width: 2.w),
      ),
      child: Theme(
        data: ThemeData(dividerColor: Colors.transparent),
        child: ExpansionTile(
          title: Text(
            question,
            style: TextStyle(
              fontSize: 14.sp,
              fontWeight: FontWeight.w700,
              color: AppColors.neutralGray900,
            ),
          ),
          children: [
            Padding(
              padding: EdgeInsets.fromLTRB(16.w, 0, 16.w, 16.h),
              child: Text(
                answer,
                style: TextStyle(
                  fontSize: 13.sp,
                  color: AppColors.neutralGray600,
                  height: 1.5,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
