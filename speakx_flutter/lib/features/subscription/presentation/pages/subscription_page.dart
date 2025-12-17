import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/app_bar.dart';
import '../../../../shared/widgets/animated_components.dart';

class SubscriptionPage extends StatefulWidget {
  const SubscriptionPage({super.key});

  @override
  State<SubscriptionPage> createState() => _SubscriptionPageState();
}

class _SubscriptionPageState extends State<SubscriptionPage> {
  String selectedPlan = 'monthly';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.neutralGray50,
      body: SafeArea(
        child: Column(
          children: [
            CustomAppBar(
              title: 'SpeakX Premium',
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
                              Icon(LucideIcons.crown, color: AppColors.secondaryWarning, size: 64.sp),
                              SizedBox(height: 16.h),
                              Text(
                                'Unlock Your Full Potential',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 24.sp,
                                  fontWeight: FontWeight.w900,
                                ),
                                textAlign: TextAlign.center,
                              ),
                              SizedBox(height: 12.h),
                              Text(
                                'Get unlimited access to all features',
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
                      
                      // Features List
                      ...[
                        {'icon': LucideIcons.infinity, 'text': 'Unlimited Lessons'},
                        {'icon': LucideIcons.users, 'text': 'Live Tutoring Sessions'},
                        {'icon': LucideIcons.award, 'text': 'Advanced Analytics'},
                        {'icon': LucideIcons.download, 'text': 'Offline Mode'},
                        {'icon': LucideIcons.zap, 'text': 'AI-Powered Feedback'},
                        {'icon': LucideIcons.x, 'text': 'Ad-Free Experience'},
                      ].map((feature) => _buildFeature(
                        icon: feature['icon'] as IconData,
                        text: feature['text'] as String,
                      )),
                      SizedBox(height: 32.h),
                      
                      // Plans
                      _buildPlanCard(
                        id: 'monthly',
                        title: 'Monthly',
                        price: '\$9.99',
                        period: '/month',
                        savings: null,
                      ),
                      SizedBox(height: 16.h),
                      _buildPlanCard(
                        id: 'yearly',
                        title: 'Yearly',
                        price: '\$79.99',
                        period: '/year',
                        savings: 'Save 33%',
                      ),
                      SizedBox(height: 32.h),
                      
                      // Subscribe Button
                      AnimatedButton(
                        onPressed: () {
                          _showSuccessDialog();
                        },
                        child: Container(
                          width: double.infinity,
                          padding: EdgeInsets.symmetric(vertical: 18.h),
                          decoration: BoxDecoration(
                            gradient: LinearGradient(colors: AppColors.cardPurpleGradient),
                            borderRadius: BorderRadius.circular(20.r),
                            boxShadow: [
                              BoxShadow(
                                color: AppColors.secondaryEnergy.withOpacity(0.3),
                                blurRadius: 20.r,
                                offset: Offset(0, 10.h),
                              ),
                            ],
                          ),
                          child: Text(
                            'Start Free Trial',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 16.sp,
                              fontWeight: FontWeight.w900,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ),
                      ),
                      SizedBox(height: 16.h),
                      Text(
                        '7 days free, then ${selectedPlan == 'monthly' ? '\$9.99/month' : '\$79.99/year'}',
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
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFeature({required IconData icon, required String text}) {
    return PopInAnimation(
      child: Container(
        margin: EdgeInsets.only(bottom: 12.h),
        padding: EdgeInsets.all(16.w),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16.r),
          border: Border.all(color: AppColors.neutralGray200, width: 2.w),
        ),
        child: Row(
          children: [
            Container(
              width: 40.w,
              height: 40.w,
              decoration: BoxDecoration(
                color: AppColors.secondarySuccess.withOpacity(0.1),
                shape: BoxShape.circle,
              ),
              child: Icon(icon, color: AppColors.secondarySuccess, size: 20.sp),
            ),
            SizedBox(width: 16.w),
            Text(
              text,
              style: TextStyle(
                fontSize: 15.sp,
                fontWeight: FontWeight.w700,
                color: AppColors.neutralGray900,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPlanCard({
    required String id,
    required String title,
    required String price,
    required String period,
    String? savings,
  }) {
    final isSelected = selectedPlan == id;

    return AnimatedButton(
      onPressed: () => setState(() => selectedPlan = id),
      child: Container(
        padding: EdgeInsets.all(20.w),
        decoration: BoxDecoration(
          gradient: isSelected ? LinearGradient(colors: AppColors.cardBlueGradient) : null,
          color: isSelected ? null : Colors.white,
          borderRadius: BorderRadius.circular(24.r),
          border: Border.all(
            color: isSelected ? Colors.transparent : AppColors.neutralGray200,
            width: 2.w,
          ),
          boxShadow: isSelected
              ? [
                  BoxShadow(
                    color: AppColors.primaryBlue.withOpacity(0.3),
                    blurRadius: 20.r,
                    offset: Offset(0, 10.h),
                  ),
                ]
              : null,
        ),
        child: Row(
          children: [
            Container(
              width: 24.w,
              height: 24.w,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color: isSelected ? Colors.white : AppColors.neutralGray400,
                  width: 2.w,
                ),
                color: isSelected ? Colors.white : Colors.transparent,
              ),
              child: isSelected
                  ? Center(
                      child: Container(
                        width: 12.w,
                        height: 12.w,
                        decoration: BoxDecoration(
                          color: AppColors.primaryBlue,
                          shape: BoxShape.circle,
                        ),
                      ),
                    )
                  : null,
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
                      color: isSelected ? Colors.white : AppColors.neutralGray900,
                    ),
                  ),
                  if (savings != null) ...[
                    SizedBox(height: 4.h),
                    Container(
                      padding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 4.h),
                      decoration: BoxDecoration(
                        color: isSelected ? Colors.white.withOpacity(0.2) : AppColors.secondarySuccess.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(8.r),
                      ),
                      child: Text(
                        savings,
                        style: TextStyle(
                          fontSize: 11.sp,
                          fontWeight: FontWeight.w900,
                          color: isSelected ? Colors.white : AppColors.secondarySuccess,
                        ),
                      ),
                    ),
                  ],
                ],
              ),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text(
                  price,
                  style: TextStyle(
                    fontSize: 24.sp,
                    fontWeight: FontWeight.w900,
                    color: isSelected ? Colors.white : AppColors.neutralGray900,
                  ),
                ),
                Text(
                  period,
                  style: TextStyle(
                    fontSize: 12.sp,
                    fontWeight: FontWeight.w600,
                    color: isSelected ? Colors.white.withOpacity(0.8) : AppColors.neutralGray600,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void _showSuccessDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24.r)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 80.w,
              height: 80.w,
              decoration: BoxDecoration(
                gradient: LinearGradient(colors: AppColors.cardPurpleGradient),
                shape: BoxShape.circle,
              ),
              child: Icon(LucideIcons.crown, color: Colors.white, size: 40.sp),
            ),
            SizedBox(height: 20.h),
            Text(
              'Welcome to Premium! 🎉',
              style: TextStyle(
                fontSize: 20.sp,
                fontWeight: FontWeight.w900,
                color: AppColors.neutralGray900,
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 12.h),
            Text(
              'Enjoy unlimited access to all features',
              style: TextStyle(
                fontSize: 14.sp,
                color: AppColors.neutralGray600,
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 24.h),
            AnimatedButton(
              onPressed: () => Navigator.pop(context),
              child: Container(
                width: double.infinity,
                padding: EdgeInsets.symmetric(vertical: 14.h),
                decoration: BoxDecoration(
                  gradient: LinearGradient(colors: AppColors.cardPurpleGradient),
                  borderRadius: BorderRadius.circular(16.r),
                ),
                child: Text(
                  'Got it!',
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
