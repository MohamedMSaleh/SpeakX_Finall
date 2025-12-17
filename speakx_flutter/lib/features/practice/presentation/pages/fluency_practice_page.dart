import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/app_bar.dart';

class FluencyPracticePage extends StatefulWidget {
  const FluencyPracticePage({super.key});

  @override
  State<FluencyPracticePage> createState() => _FluencyPracticePageState();
}

class _FluencyPracticePageState extends State<FluencyPracticePage> {
  bool isRecording = false;
  double waveformHeight = 50.h;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.neutralGray50,
      body: SafeArea(
        child: Column(
          children: [
            CustomAppBar(
              title: 'Fluency Practice',
              showBackButton: true,
            ),
            Expanded(
              child: Padding(
                padding: EdgeInsets.all(20.w),
                child: Column(
                  children: [
                    // Topic Card
                    Container(
                      width: double.infinity,
                      padding: EdgeInsets.all(24.w),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: AppColors.cardBlueGradient,
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                        borderRadius: BorderRadius.circular(24.r),
                      ),
                      child: Column(
                        children: [
                          Text(
                            'Talk about your favorite hobby',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 20.sp,
                              fontWeight: FontWeight.w900,
                              height: 1.4,
                            ),
                            textAlign: TextAlign.center,
                          ),
                          SizedBox(height: 16.h),
                          Container(
                            padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 8.h),
                            decoration: BoxDecoration(
                              color: Colors.white.withOpacity(0.2),
                              borderRadius: BorderRadius.circular(20.r),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Icon(LucideIcons.clock, color: Colors.white, size: 16.sp),
                                SizedBox(width: 6.w),
                                Text(
                                  'Speak for 2 minutes',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 13.sp,
                                    fontWeight: FontWeight.w700,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                    SizedBox(height: 32.h),
                    
                    // Waveform Visualization
                    if (isRecording) ...[
                      Container(
                        height: waveformHeight,
                        decoration: BoxDecoration(
                          color: AppColors.neutralGray100,
                          borderRadius: BorderRadius.circular(16.r),
                        ),
                        child: Center(
                          child: Text(
                            '🎤 Listening...',
                            style: TextStyle(
                              fontSize: 16.sp,
                              fontWeight: FontWeight.w700,
                              color: AppColors.primaryBlue,
                            ),
                          ),
                        ),
                      ),
                      SizedBox(height: 32.h),
                    ],
                    
                    const Spacer(),
                    
                    // Record Button
                    AnimatedButton(
                      onPressed: () => setState(() => isRecording = !isRecording),
                      child: Container(
                        width: 120.w,
                        height: 120.w,
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            colors: isRecording ? AppColors.cardPinkGradient : AppColors.cardBlueGradient,
                          ),
                          shape: BoxShape.circle,
                          boxShadow: [
                            BoxShadow(
                              color: (isRecording ? AppColors.secondaryPink : AppColors.primaryBlue).withOpacity(0.4),
                              blurRadius: 30.r,
                              offset: Offset(0, 10.h),
                            ),
                          ],
                        ),
                        child: Icon(
                          isRecording ? LucideIcons.square : LucideIcons.mic,
                          color: Colors.white,
                          size: 48.sp,
                        ),
                      ),
                    ),
                    SizedBox(height: 16.h),
                    Text(
                      isRecording ? 'Tap to Stop' : 'Tap to Start',
                      style: TextStyle(
                        fontSize: 16.sp,
                        fontWeight: FontWeight.w700,
                        color: AppColors.neutralGray700,
                      ),
                    ),
                    SizedBox(height: 40.h),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
