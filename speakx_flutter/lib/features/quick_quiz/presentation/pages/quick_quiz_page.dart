import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/app_bar.dart';

class QuickQuizPage extends StatefulWidget {
  const QuickQuizPage({super.key});

  @override
  State<QuickQuizPage> createState() => _QuickQuizPageState();
}

class _QuickQuizPageState extends State<QuickQuizPage> {
  int currentQuestion = 0;
  int correctAnswers = 0;
  String? selectedAnswer;
  bool isFinished = false;

  final List<QuizQuestion> questions = [
    QuizQuestion(
      question: 'What is the past tense of "go"?',
      options: ['went', 'goed', 'gone', 'goes'],
      correctAnswer: 'went',
    ),
    QuizQuestion(
      question: 'Choose the correct: "She ___ a doctor."',
      options: ['is', 'are', 'am', 'be'],
      correctAnswer: 'is',
    ),
    QuizQuestion(
      question: 'Which word means "happy"?',
      options: ['Sad', 'Angry', 'Joyful', 'Tired'],
      correctAnswer: 'Joyful',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    if (isFinished) {
      return _buildResultScreen();
    }

    final question = questions[currentQuestion];
    final progress = (currentQuestion + 1) / questions.length;

    return Scaffold(
      backgroundColor: AppColors.neutralGray50,
      body: SafeArea(
        child: Column(
          children: [
            // Header
            Container(
              padding: EdgeInsets.all(20.w),
              color: Colors.white,
              child: Column(
                children: [
                  Row(
                    children: [
                      AnimatedButton(
                        onPressed: () => Navigator.pop(context),
                        child: Icon(LucideIcons.x, size: 24.sp, color: AppColors.neutralGray700),
                      ),
                      SizedBox(width: 16.w),
                      Expanded(
                        child: AnimatedProgressBar(
                          progress: progress,
                          gradient: LinearGradient(colors: AppColors.cardYellowGradient),
                          height: 12.h,
                        ),
                      ),
                      SizedBox(width: 16.w),
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
                ],
              ),
            ),
            
            Expanded(
              child: Padding(
                padding: EdgeInsets.all(20.w),
                child: Column(
                  children: [
                    // Question
                    Container(
                      width: double.infinity,
                      padding: EdgeInsets.all(24.w),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: AppColors.cardYellowGradient,
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                        borderRadius: BorderRadius.circular(24.r),
                      ),
                      child: Text(
                        question.question,
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
                    
                    // Next Button
                    AnimatedButton(
                      onPressed: selectedAnswer != null ? _nextQuestion : null,
                      child: Container(
                        width: double.infinity,
                        padding: EdgeInsets.symmetric(vertical: 18.h),
                        decoration: BoxDecoration(
                          gradient: selectedAnswer != null
                              ? LinearGradient(colors: AppColors.cardYellowGradient)
                              : null,
                          color: selectedAnswer != null ? null : AppColors.neutralGray300,
                          borderRadius: BorderRadius.circular(20.r),
                        ),
                        child: Text(
                          currentQuestion + 1 < questions.length ? 'Next' : 'Finish',
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
          color: isSelected ? AppColors.secondaryWarning.withOpacity(0.1) : Colors.white,
          borderRadius: BorderRadius.circular(20.r),
          border: Border.all(
            color: isSelected ? AppColors.secondaryWarning : AppColors.neutralGray200,
            width: 2.w,
          ),
        ),
        child: Text(
          option,
          style: TextStyle(
            fontSize: 15.sp,
            fontWeight: FontWeight.w600,
            color: isSelected ? AppColors.secondaryWarning : AppColors.neutralGray900,
          ),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }

  void _nextQuestion() {
    if (selectedAnswer == questions[currentQuestion].correctAnswer) {
      correctAnswers++;
    }

    if (currentQuestion + 1 < questions.length) {
      setState(() {
        currentQuestion++;
        selectedAnswer = null;
      });
    } else {
      setState(() => isFinished = true);
    }
  }

  Widget _buildResultScreen() {
    final percentage = (correctAnswers / questions.length * 100).round();

    return Scaffold(
      backgroundColor: AppColors.neutralGray50,
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.all(20.w),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 120.w,
                height: 120.w,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: percentage >= 70 ? AppColors.cardGreenGradient : AppColors.cardYellowGradient,
                  ),
                  shape: BoxShape.circle,
                ),
                child: Center(
                  child: Text(
                    '$percentage%',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 32.sp,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                ),
              ),
              SizedBox(height: 32.h),
              Text(
                percentage >= 70 ? 'Great Job! 🎉' : 'Keep Practicing! 💪',
                style: TextStyle(
                  fontSize: 28.sp,
                  fontWeight: FontWeight.w900,
                  color: AppColors.neutralGray900,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 16.h),
              Text(
                'You got $correctAnswers out of ${questions.length} correct',
                style: TextStyle(
                  fontSize: 16.sp,
                  color: AppColors.neutralGray600,
                  fontWeight: FontWeight.w600,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 48.h),
              AnimatedButton(
                onPressed: () => Navigator.pop(context),
                child: Container(
                  width: double.infinity,
                  padding: EdgeInsets.symmetric(vertical: 18.h),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(colors: AppColors.cardBlueGradient),
                    borderRadius: BorderRadius.circular(20.r),
                  ),
                  child: Text(
                    'Done',
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
    );
  }
}

class QuizQuestion {
  final String question;
  final List<String> options;
  final String correctAnswer;

  QuizQuestion({
    required this.question,
    required this.options,
    required this.correctAnswer,
  });
}
