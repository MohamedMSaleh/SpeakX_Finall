import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/app_bar.dart';

class GrammarPracticePage extends StatefulWidget {
  const GrammarPracticePage({super.key});

  @override
  State<GrammarPracticePage> createState() => _GrammarPracticePageState();
}

class _GrammarPracticePageState extends State<GrammarPracticePage> {
  int currentQuestion = 0;
  String? selectedAnswer;

  final List<GrammarQuestion> questions = [
    GrammarQuestion(
      text: 'She ___ to the store yesterday.',
      options: ['go', 'goes', 'went', 'going'],
      correctAnswer: 'went',
      explanation: 'Use past tense "went" for actions completed in the past.',
    ),
    GrammarQuestion(
      text: 'They ___ playing football now.',
      options: ['is', 'are', 'am', 'be'],
      correctAnswer: 'are',
      explanation: 'Use "are" with plural subject "they" in present continuous.',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    final question = questions[currentQuestion];

    return Scaffold(
      backgroundColor: AppColors.neutralGray50,
      body: SafeArea(
        child: Column(
          children: [
            CustomAppBar(
              title: 'Grammar Practice',
              showBackButton: true,
            ),
            Expanded(
              child: Padding(
                padding: EdgeInsets.all(20.w),
                child: Column(
                  children: [
                    // Progress
                    Row(
                      children: [
                        Expanded(
                          child: AnimatedProgressBar(
                            progress: (currentQuestion + 1) / questions.length,
                            gradient: LinearGradient(colors: AppColors.cardPurpleGradient),
                            height: 10.h,
                          ),
                        ),
                        SizedBox(width: 12.w),
                        Text(
                          '${currentQuestion + 1}/${questions.length}',
                          style: TextStyle(
                            fontSize: 14.sp,
                            fontWeight: FontWeight.w700,
                            color: AppColors.neutralGray700,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 32.h),
                    
                    // Question Card
                    Container(
                      width: double.infinity,
                      padding: EdgeInsets.all(24.w),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: AppColors.cardPurpleGradient,
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                        borderRadius: BorderRadius.circular(24.r),
                      ),
                      child: Text(
                        question.text,
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 20.sp,
                          fontWeight: FontWeight.w900,
                          height: 1.5,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                    SizedBox(height: 32.h),
                    
                    // Options
                    ...question.options.map((option) => _buildOption(option)),
                    
                    const Spacer(),
                    
                    // Check Button
                    AnimatedButton(
                      onPressed: selectedAnswer != null ? _checkAnswer : null,
                      child: Container(
                        width: double.infinity,
                        padding: EdgeInsets.symmetric(vertical: 18.h),
                        decoration: BoxDecoration(
                          gradient: selectedAnswer != null
                              ? LinearGradient(colors: AppColors.cardPurpleGradient)
                              : null,
                          color: selectedAnswer != null ? null : AppColors.neutralGray300,
                          borderRadius: BorderRadius.circular(20.r),
                        ),
                        child: Text(
                          'Check Answer',
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
          ],
        ),
      ),
    );
  }

  Widget _buildOption(String option) {
    final isSelected = selectedAnswer == option;

    return AnimatedButton(
      onPressed: () => setState(() => selectedAnswer = option),
      child: Container(
        margin: EdgeInsets.only(bottom: 12.h),
        padding: EdgeInsets.all(16.w),
        decoration: BoxDecoration(
          color: isSelected ? AppColors.secondaryEnergy.withOpacity(0.1) : Colors.white,
          borderRadius: BorderRadius.circular(20.r),
          border: Border.all(
            color: isSelected ? AppColors.secondaryEnergy : AppColors.neutralGray200,
            width: 2.w,
          ),
        ),
        child: Text(
          option,
          style: TextStyle(
            fontSize: 15.sp,
            fontWeight: FontWeight.w600,
            color: isSelected ? AppColors.secondaryEnergy : AppColors.neutralGray900,
          ),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }

  void _checkAnswer() {
    final question = questions[currentQuestion];
    final isCorrect = selectedAnswer == question.correctAnswer;

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
                gradient: LinearGradient(
                  colors: isCorrect ? AppColors.cardGreenGradient : AppColors.cardPinkGradient,
                ),
                shape: BoxShape.circle,
              ),
              child: Icon(
                isCorrect ? LucideIcons.check : LucideIcons.x,
                color: Colors.white,
                size: 40.sp,
              ),
            ),
            SizedBox(height: 20.h),
            Text(
              isCorrect ? 'Correct! 🎉' : 'Not quite!',
              style: TextStyle(
                fontSize: 22.sp,
                fontWeight: FontWeight.w900,
                color: AppColors.neutralGray900,
              ),
            ),
            SizedBox(height: 12.h),
            Text(
              question.explanation,
              style: TextStyle(
                fontSize: 14.sp,
                color: AppColors.neutralGray600,
                height: 1.5,
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 24.h),
            AnimatedButton(
              onPressed: () {
                Navigator.pop(context);
                if (currentQuestion + 1 < questions.length) {
                  setState(() {
                    currentQuestion++;
                    selectedAnswer = null;
                  });
                } else {
                  Navigator.pop(context);
                }
              },
              child: Container(
                width: double.infinity,
                padding: EdgeInsets.symmetric(vertical: 14.h),
                decoration: BoxDecoration(
                  gradient: LinearGradient(colors: AppColors.cardPurpleGradient),
                  borderRadius: BorderRadius.circular(16.r),
                ),
                child: Text(
                  currentQuestion + 1 < questions.length ? 'Continue' : 'Finish',
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

class GrammarQuestion {
  final String text;
  final List<String> options;
  final String correctAnswer;
  final String explanation;

  GrammarQuestion({
    required this.text,
    required this.options,
    required this.correctAnswer,
    required this.explanation,
  });
}
