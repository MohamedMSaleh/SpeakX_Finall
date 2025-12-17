import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/app_bar.dart';

class StorySessionPage extends StatefulWidget {
  const StorySessionPage({super.key});

  @override
  State<StorySessionPage> createState() => _StorySessionPageState();
}

class _StorySessionPageState extends State<StorySessionPage> {
  int currentPage = 0;
  bool isRecording = false;

  final List<StoryPage> storyPages = [
    StoryPage(
      image: '📚',
      text: 'Once upon a time, in a small village, there lived a young girl named Emma.',
      question: 'What was the girl\'s name?',
      options: ['Emily', 'Emma', 'Anna', 'Sarah'],
      correctAnswer: 'Emma',
    ),
    StoryPage(
      image: '🏘️',
      text: 'Emma loved reading books and dreamed of visiting the big library in the city.',
      question: 'What did Emma love doing?',
      options: ['Reading', 'Dancing', 'Singing', 'Painting'],
      correctAnswer: 'Reading',
    ),
    StoryPage(
      image: '✨',
      text: 'One day, she found a magical book that could take her anywhere in the world.',
      question: 'What did Emma find?',
      options: ['A map', 'A magical book', 'A key', 'A letter'],
      correctAnswer: 'A magical book',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    final page = storyPages[currentPage];

    return Scaffold(
      backgroundColor: AppColors.neutralGray50,
      body: SafeArea(
        child: Column(
          children: [
            CustomAppBar(
              title: 'Story Time',
              showBackButton: true,
            ),
            // Progress
            Padding(
              padding: EdgeInsets.all(20.w),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Page ${currentPage + 1} of ${storyPages.length}',
                        style: TextStyle(
                          fontSize: 14.sp,
                          fontWeight: FontWeight.w700,
                          color: AppColors.neutralGray700,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 12.h),
                  AnimatedProgressBar(
                    progress: (currentPage + 1) / storyPages.length,
                    gradient: LinearGradient(colors: AppColors.cardPinkGradient),
                    height: 8.h,
                  ),
                ],
              ),
            ),
            Expanded(
              child: SingleChildScrollView(
                child: Padding(
                  padding: EdgeInsets.all(20.w),
                  child: Column(
                    children: [
                      // Story Image
                      Container(
                        width: double.infinity,
                        padding: EdgeInsets.all(48.w),
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            colors: AppColors.cardPinkGradient,
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                          borderRadius: BorderRadius.circular(28.r),
                          boxShadow: [
                            BoxShadow(
                              color: AppColors.secondaryPink.withOpacity(0.3),
                              blurRadius: 30.r,
                              offset: Offset(0, 15.h),
                            ),
                          ],
                        ),
                        child: Text(
                          page.image,
                          style: TextStyle(fontSize: 120.sp),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      SizedBox(height: 24.h),

                      // Story Text
                      Container(
                        width: double.infinity,
                        padding: EdgeInsets.all(24.w),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(24.r),
                          border: Border.all(color: AppColors.neutralGray200, width: 2.w),
                        ),
                        child: Text(
                          page.text,
                          style: TextStyle(
                            fontSize: 18.sp,
                            height: 1.8,
                            color: AppColors.neutralGray900,
                            fontWeight: FontWeight.w600,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      SizedBox(height: 24.h),

                      // Record Button
                      AnimatedButton(
                        onPressed: () => setState(() => isRecording = !isRecording),
                        child: Container(
                          width: double.infinity,
                          padding: EdgeInsets.symmetric(vertical: 20.h),
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              colors: isRecording
                                  ? AppColors.cardYellowGradient
                                  : AppColors.cardBlueGradient,
                            ),
                            borderRadius: BorderRadius.circular(20.r),
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                isRecording ? LucideIcons.square : LucideIcons.mic,
                                color: Colors.white,
                                size: 24.sp,
                              ),
                              SizedBox(width: 12.w),
                              Text(
                                isRecording ? 'Stop Recording' : 'Read Aloud',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 16.sp,
                                  fontWeight: FontWeight.w900,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      SizedBox(height: 24.h),

                      // Question
                      Container(
                        width: double.infinity,
                        padding: EdgeInsets.all(20.w),
                        decoration: BoxDecoration(
                          color: AppColors.secondaryPink.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(20.r),
                          border: Border.all(color: AppColors.secondaryPink.withOpacity(0.3), width: 2.w),
                        ),
                        child: Text(
                          page.question,
                          style: TextStyle(
                            fontSize: 16.sp,
                            fontWeight: FontWeight.w900,
                            color: AppColors.neutralGray900,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      SizedBox(height: 16.h),

                      // Options
                      ...page.options.map((option) => _buildOption(option, page.correctAnswer)),
                    ],
                  ),
                ),
              ),
            ),

            // Navigation
            Padding(
              padding: EdgeInsets.all(20.w),
              child: Row(
                children: [
                  if (currentPage > 0)
                    Expanded(
                      child: AnimatedButton(
                        onPressed: () => setState(() => currentPage--),
                        child: Container(
                          padding: EdgeInsets.symmetric(vertical: 18.h),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(20.r),
                            border: Border.all(color: AppColors.neutralGray200, width: 2.w),
                          ),
                          child: Text(
                            'Previous',
                            style: TextStyle(
                              color: AppColors.neutralGray900,
                              fontSize: 16.sp,
                              fontWeight: FontWeight.w900,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ),
                      ),
                    ),
                  if (currentPage > 0) SizedBox(width: 12.w),
                  Expanded(
                    child: AnimatedButton(
                      onPressed: currentPage < storyPages.length - 1
                          ? () => setState(() => currentPage++)
                          : () => Navigator.pop(context),
                      child: Container(
                        padding: EdgeInsets.symmetric(vertical: 18.h),
                        decoration: BoxDecoration(
                          gradient: LinearGradient(colors: AppColors.cardPinkGradient),
                          borderRadius: BorderRadius.circular(20.r),
                        ),
                        child: Text(
                          currentPage < storyPages.length - 1 ? 'Next' : 'Finish',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 16.sp,
                            fontWeight: FontWeight.w900,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildOption(String option, String correctAnswer) {
    return AnimatedButton(
      onPressed: () => _checkAnswer(option, correctAnswer),
      child: Container(
        margin: EdgeInsets.only(bottom: 12.h),
        padding: EdgeInsets.all(16.w),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20.r),
          border: Border.all(color: AppColors.neutralGray200, width: 2.w),
        ),
        child: Text(
          option,
          style: TextStyle(
            fontSize: 15.sp,
            fontWeight: FontWeight.w600,
            color: AppColors.neutralGray900,
          ),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }

  void _checkAnswer(String selected, String correct) {
    final isCorrect = selected == correct;
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24.r)),
        title: Text(
          isCorrect ? 'Correct! 🎉' : 'Try Again',
          style: TextStyle(
            fontSize: 20.sp,
            fontWeight: FontWeight.w900,
            color: AppColors.neutralGray900,
          ),
        ),
        content: Text(
          isCorrect
              ? 'Great job! You understood the story.'
              : 'Read the story again and try once more.',
          style: TextStyle(
            fontSize: 14.sp,
            color: AppColors.neutralGray600,
            fontWeight: FontWeight.w600,
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(
              'OK',
              style: TextStyle(
                fontSize: 14.sp,
                fontWeight: FontWeight.w700,
                color: AppColors.primaryBlue,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class StoryPage {
  final String image;
  final String text;
  final String question;
  final List<String> options;
  final String correctAnswer;

  StoryPage({
    required this.image,
    required this.text,
    required this.question,
    required this.options,
    required this.correctAnswer,
  });
}
