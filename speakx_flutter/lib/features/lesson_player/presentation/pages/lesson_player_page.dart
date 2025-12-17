import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/app_bar.dart';

class LessonPlayerPage extends StatefulWidget {
  const LessonPlayerPage({super.key});

  @override
  State<LessonPlayerPage> createState() => _LessonPlayerPageState();
}

class _LessonPlayerPageState extends State<LessonPlayerPage> {
  int currentQuestion = 0;
  int totalQuestions = 10;
  String? selectedAnswer;

  final List<Question> questions = [
    Question(
      text: 'How do you say "Hello" in English?',
      options: ['Hi', 'Goodbye', 'Thank you', 'Please'],
      correctAnswer: 'Hi',
    ),
    Question(
      text: 'Choose the correct sentence:',
      options: [
        'I am student',
        'I am a student',
        'I student',
        'I a student',
      ],
      correctAnswer: 'I am a student',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    final question = questions[currentQuestion % questions.length];
    final progress = (currentQuestion + 1) / totalQuestions;

    return Scaffold(
      backgroundColor: AppColors.neutralGray50,
      body: SafeArea(
        child: Column(
          children: [
            // Header with progress
            Container(
              padding: EdgeInsets.all(20.w),
              color: Colors.white,
              child: Column(
                children: [
                  Row(
                    children: [
                      AnimatedButton(
                        onPressed: () => Navigator.pop(context),
                        child: Container(
                          padding: EdgeInsets.all(10.w),
                          decoration: BoxDecoration(
                            color: AppColors.neutralGray100,
                            borderRadius: BorderRadius.circular(12.r),
                          ),
                          child: Icon(LucideIcons.x, size: 20.sp, color: AppColors.neutralGray700),
                        ),
                      ),
                      SizedBox(width: 16.w),
                      Expanded(
                        child: AnimatedProgressBar(
                          progress: progress,
                          gradient: LinearGradient(colors: AppColors.cardBlueGradient),
                          height: 12.h,
                        ),
                      ),
                      SizedBox(width: 16.w),
                      Text(
                        '${currentQuestion + 1}/$totalQuestions',
                        style: TextStyle(
                          fontSize: 14.sp,
                          fontWeight: FontWeight.w700,
                          color: AppColors.neutralGray700,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            
            // Question Content
            Expanded(
              child: SingleChildScrollView(
                child: Padding(
                  padding: EdgeInsets.all(20.w),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Question Card
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
                          boxShadow: [
                            BoxShadow(
                              color: AppColors.primaryBlue.withOpacity(0.3),
                              blurRadius: 20.r,
                              offset: Offset(0, 10.h),
                            ),
                          ],
                        ),
                        child: Text(
                          question.text,
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 18.sp,
                            fontWeight: FontWeight.w900,
                            height: 1.5,
                          ),
                        ),
                      ),
                      SizedBox(height: 32.h),
                      
                      // Answer Options
                      ...question.options.asMap().entries.map((entry) {
                        final index = entry.key;
                        final option = entry.value;
                        return _buildOptionCard(option, index);
                      }),
                    ],
                  ),
                ),
              ),
            ),
            
            // Check Button
            Container(
              padding: EdgeInsets.all(20.w),
              decoration: BoxDecoration(
                color: Colors.white,
                boxShadow: [
                  BoxShadow(
                    color: AppColors.neutralGray300.withOpacity(0.3),
                    blurRadius: 10.r,
                    offset: Offset(0, -5.h),
                  ),
                ],
              ),
              child: AnimatedButton(
                onPressed: selectedAnswer != null ? _checkAnswer : null,
                child: Container(
                  width: double.infinity,
                  padding: EdgeInsets.symmetric(vertical: 18.h),
                  decoration: BoxDecoration(
                    gradient: selectedAnswer != null
                        ? LinearGradient(colors: AppColors.cardBlueGradient)
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
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildOptionCard(String option, int index) {
    final isSelected = selectedAnswer == option;
    final letters = ['A', 'B', 'C', 'D'];

    return AnimatedButton(
      onPressed: () => setState(() => selectedAnswer = option),
      child: Container(
        margin: EdgeInsets.only(bottom: 12.h),
        padding: EdgeInsets.all(16.w),
        decoration: BoxDecoration(
          color: isSelected ? AppColors.primaryBlue.withOpacity(0.1) : Colors.white,
          borderRadius: BorderRadius.circular(20.r),
          border: Border.all(
            color: isSelected ? AppColors.primaryBlue : AppColors.neutralGray200,
            width: 2.w,
          ),
        ),
        child: Row(
          children: [
            Container(
              width: 40.w,
              height: 40.w,
              decoration: BoxDecoration(
                gradient: isSelected ? LinearGradient(colors: AppColors.cardBlueGradient) : null,
                color: isSelected ? null : AppColors.neutralGray100,
                borderRadius: BorderRadius.circular(12.r),
              ),
              child: Center(
                child: Text(
                  letters[index],
                  style: TextStyle(
                    color: isSelected ? Colors.white : AppColors.neutralGray700,
                    fontSize: 16.sp,
                    fontWeight: FontWeight.w900,
                  ),
                ),
              ),
            ),
            SizedBox(width: 16.w),
            Expanded(
              child: Text(
                option,
                style: TextStyle(
                  fontSize: 15.sp,
                  fontWeight: FontWeight.w600,
                  color: isSelected ? AppColors.primaryBlue : AppColors.neutralGray900,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _checkAnswer() {
    final question = questions[currentQuestion % questions.length];
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
            if (!isCorrect) ...[
              SizedBox(height: 12.h),
              Text(
                'The correct answer is: ${question.correctAnswer}',
                style: TextStyle(
                  fontSize: 14.sp,
                  color: AppColors.neutralGray600,
                ),
                textAlign: TextAlign.center,
              ),
            ],
            SizedBox(height: 24.h),
            AnimatedButton(
              onPressed: () {
                Navigator.pop(context);
                setState(() {
                  currentQuestion++;
                  selectedAnswer = null;
                  if (currentQuestion >= totalQuestions) {
                    Navigator.pop(context);
                  }
                });
              },
              child: Container(
                width: double.infinity,
                padding: EdgeInsets.symmetric(vertical: 14.h),
                decoration: BoxDecoration(
                  gradient: LinearGradient(colors: AppColors.cardBlueGradient),
                  borderRadius: BorderRadius.circular(16.r),
                ),
                child: Text(
                  currentQuestion + 1 >= totalQuestions ? 'Finish' : 'Continue',
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

class Question {
  final String text;
  final List<String> options;
  final String correctAnswer;

  Question({
    required this.text,
    required this.options,
    required this.correctAnswer,
  });
}
