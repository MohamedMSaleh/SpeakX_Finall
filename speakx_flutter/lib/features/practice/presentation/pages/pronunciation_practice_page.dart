import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/app_bar.dart';

class PronunciationPracticePage extends StatefulWidget {
  const PronunciationPracticePage({super.key});

  @override
  State<PronunciationPracticePage> createState() => _PronunciationPracticePageState();
}

class _PronunciationPracticePageState extends State<PronunciationPracticePage> {
  String currentWord = 'Beautiful';
  String phonetic = '/ˈbjuːtɪfəl/';
  bool isRecording = false;
  int? score;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.neutralGray50,
      body: SafeArea(
        child: Column(
          children: [
            CustomAppBar(
              title: 'Pronunciation',
              showBackButton: true,
            ),
            Expanded(
              child: Padding(
                padding: EdgeInsets.all(20.w),
                child: Column(
                  children: [
                    // Word Card
                    Container(
                      width: double.infinity,
                      padding: EdgeInsets.all(32.w),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: AppColors.cardGreenGradient,
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                        borderRadius: BorderRadius.circular(28.r),
                      ),
                      child: Column(
                        children: [
                          Text(
                            currentWord,
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 36.sp,
                              fontWeight: FontWeight.w900,
                            ),
                          ),
                          SizedBox(height: 12.h),
                          Text(
                            phonetic,
                            style: TextStyle(
                              color: Colors.white.withOpacity(0.9),
                              fontSize: 18.sp,
                              fontWeight: FontWeight.w600,
                              fontStyle: FontStyle.italic,
                            ),
                          ),
                          SizedBox(height: 20.h),
                          AnimatedButton(
                            onPressed: () {},
                            child: Container(
                              padding: EdgeInsets.all(12.w),
                              decoration: BoxDecoration(
                                color: Colors.white.withOpacity(0.2),
                                shape: BoxShape.circle,
                              ),
                              child: Icon(LucideIcons.volume2, color: Colors.white, size: 28.sp),
                            ),
                          ),
                        ],
                      ),
                    ),
                    SizedBox(height: 32.h),
                    
                    // Score Display
                    if (score != null) ...[
                      Container(
                        padding: EdgeInsets.all(24.w),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(24.r),
                          border: Border.all(color: AppColors.neutralGray200, width: 2.w),
                        ),
                        child: Column(
                          children: [
                            Text(
                              'Your Score',
                              style: TextStyle(
                                fontSize: 14.sp,
                                color: AppColors.neutralGray600,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            SizedBox(height: 8.h),
                            Text(
                              '$score%',
                              style: TextStyle(
                                fontSize: 40.sp,
                                fontWeight: FontWeight.w900,
                                color: _getScoreColor(score!),
                              ),
                            ),
                            SizedBox(height: 8.h),
                            Text(
                              _getScoreFeedback(score!),
                              style: TextStyle(
                                fontSize: 13.sp,
                                color: AppColors.neutralGray600,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                      ),
                      SizedBox(height: 24.h),
                    ],
                    
                    const Spacer(),
                    
                    // Record Button
                    AnimatedButton(
                      onPressed: () {
                        setState(() {
                          if (!isRecording) {
                            isRecording = true;
                            // Simulate recording
                            Future.delayed(const Duration(seconds: 2), () {
                              if (mounted) {
                                setState(() {
                                  isRecording = false;
                                  score = 85;
                                });
                              }
                            });
                          }
                        });
                      },
                      child: Container(
                        width: 120.w,
                        height: 120.w,
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            colors: isRecording ? AppColors.cardPinkGradient : AppColors.cardGreenGradient,
                          ),
                          shape: BoxShape.circle,
                          boxShadow: [
                            BoxShadow(
                              color: (isRecording ? AppColors.secondaryPink : AppColors.secondarySuccess).withOpacity(0.4),
                              blurRadius: 30.r,
                              offset: Offset(0, 10.h),
                            ),
                          ],
                        ),
                        child: Icon(
                          isRecording ? LucideIcons.loader : LucideIcons.mic,
                          color: Colors.white,
                          size: 48.sp,
                        ),
                      ),
                    ),
                    SizedBox(height: 16.h),
                    Text(
                      isRecording ? 'Recording...' : 'Say the word',
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

  Color _getScoreColor(int score) {
    if (score >= 80) return AppColors.secondarySuccess;
    if (score >= 60) return AppColors.secondaryWarning;
    return AppColors.secondaryPink;
  }

  String _getScoreFeedback(int score) {
    if (score >= 80) return 'Excellent! 🎉';
    if (score >= 60) return 'Good job! Keep practicing.';
    return 'Try again!';
  }
}
