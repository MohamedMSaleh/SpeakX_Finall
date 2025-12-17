import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/app_bar.dart';

class VocabPracticePage extends StatefulWidget {
  const VocabPracticePage({super.key});

  @override
  State<VocabPracticePage> createState() => _VocabPracticePageState();
}

class _VocabPracticePageState extends State<VocabPracticePage> with SingleTickerProviderStateMixin {
  int currentIndex = 0;
  bool showDefinition = false;
  late AnimationController _flipController;

  final List<VocabWord> words = [
    VocabWord(word: 'Eloquent', definition: 'Fluent or persuasive in speaking or writing', example: 'She gave an eloquent speech.'),
    VocabWord(word: 'Abundant', definition: 'Existing or available in large quantities', example: 'There was abundant food at the party.'),
    VocabWord(word: 'Benevolent', definition: 'Well-meaning and kindly', example: 'A benevolent smile.'),
  ];

  @override
  void initState() {
    super.initState();
    _flipController = AnimationController(
      duration: const Duration(milliseconds: 400),
      vsync: this,
    );
  }

  @override
  void dispose() {
    _flipController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final word = words[currentIndex];

    return Scaffold(
      backgroundColor: AppColors.neutralGray50,
      body: SafeArea(
        child: Column(
          children: [
            CustomAppBar(
              title: 'Vocabulary',
              showBackButton: true,
            ),
            Expanded(
              child: Padding(
                padding: EdgeInsets.all(20.w),
                child: Column(
                  children: [
                    // Progress
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          '${currentIndex + 1} of ${words.length}',
                          style: TextStyle(
                            fontSize: 14.sp,
                            fontWeight: FontWeight.w700,
                            color: AppColors.neutralGray600,
                          ),
                        ),
                        Row(
                          children: List.generate(words.length, (index) {
                            return Container(
                              margin: EdgeInsets.only(left: 6.w),
                              width: 8.w,
                              height: 8.w,
                              decoration: BoxDecoration(
                                color: index == currentIndex ? AppColors.primaryBlue : AppColors.neutralGray300,
                                shape: BoxShape.circle,
                              ),
                            );
                          }),
                        ),
                      ],
                    ),
                    SizedBox(height: 32.h),
                    
                    // Flashcard
                    Expanded(
                      child: GestureDetector(
                        onTap: () {
                          setState(() => showDefinition = !showDefinition);
                          if (showDefinition) {
                            _flipController.forward();
                          } else {
                            _flipController.reverse();
                          }
                        },
                        child: AnimatedBuilder(
                          animation: _flipController,
                          builder: (context, child) {
                            final angle = _flipController.value * 3.14159;
                            return Transform(
                              transform: Matrix4.identity()
                                ..setEntry(3, 2, 0.001)
                                ..rotateY(angle),
                              alignment: Alignment.center,
                              child: angle >= 1.5708
                                  ? Transform(
                                      transform: Matrix4.identity()..rotateY(3.14159),
                                      alignment: Alignment.center,
                                      child: _buildDefinitionSide(word),
                                    )
                                  : _buildWordSide(word),
                            );
                          },
                        ),
                      ),
                    ),
                    SizedBox(height: 24.h),
                    
                    // Navigation Buttons
                    Row(
                      children: [
                        if (currentIndex > 0)
                          Expanded(
                            child: AnimatedButton(
                              onPressed: () {
                                setState(() {
                                  currentIndex--;
                                  showDefinition = false;
                                  _flipController.reset();
                                });
                              },
                              child: Container(
                                padding: EdgeInsets.symmetric(vertical: 16.h),
                                decoration: BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.circular(16.r),
                                  border: Border.all(color: AppColors.neutralGray200, width: 2.w),
                                ),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Icon(LucideIcons.chevronLeft, size: 20.sp, color: AppColors.neutralGray700),
                                    SizedBox(width: 4.w),
                                    Text(
                                      'Previous',
                                      style: TextStyle(
                                        fontSize: 14.sp,
                                        fontWeight: FontWeight.w700,
                                        color: AppColors.neutralGray700,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        if (currentIndex > 0) SizedBox(width: 12.w),
                        if (currentIndex < words.length - 1)
                          Expanded(
                            child: AnimatedButton(
                              onPressed: () {
                                setState(() {
                                  currentIndex++;
                                  showDefinition = false;
                                  _flipController.reset();
                                });
                              },
                              child: Container(
                                padding: EdgeInsets.symmetric(vertical: 16.h),
                                decoration: BoxDecoration(
                                  gradient: LinearGradient(colors: AppColors.cardBlueGradient),
                                  borderRadius: BorderRadius.circular(16.r),
                                ),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Text(
                                      'Next',
                                      style: TextStyle(
                                        fontSize: 14.sp,
                                        fontWeight: FontWeight.w700,
                                        color: Colors.white,
                                      ),
                                    ),
                                    SizedBox(width: 4.w),
                                    Icon(LucideIcons.chevronRight, size: 20.sp, color: Colors.white),
                                  ],
                                ),
                              ),
                            ),
                          ),
                      ],
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

  Widget _buildWordSide(VocabWord word) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(32.w),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: AppColors.cardYellowGradient,
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(28.r),
        boxShadow: [
          BoxShadow(
            color: AppColors.secondaryWarning.withOpacity(0.3),
            blurRadius: 30.r,
            offset: Offset(0, 15.h),
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            word.word,
            style: TextStyle(
              color: Colors.white,
              fontSize: 48.sp,
              fontWeight: FontWeight.w900,
            ),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 24.h),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 20.w, vertical: 12.h),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.2),
              borderRadius: BorderRadius.circular(20.r),
            ),
            child: Text(
              'Tap to see definition',
              style: TextStyle(
                color: Colors.white,
                fontSize: 14.sp,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDefinitionSide(VocabWord word) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(32.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(28.r),
        border: Border.all(color: AppColors.neutralGray200, width: 2.w),
        boxShadow: [
          BoxShadow(
            color: AppColors.neutralGray300.withOpacity(0.3),
            blurRadius: 30.r,
            offset: Offset(0, 15.h),
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            word.word,
            style: TextStyle(
              color: AppColors.primaryBlue,
              fontSize: 32.sp,
              fontWeight: FontWeight.w900,
            ),
          ),
          SizedBox(height: 24.h),
          Text(
            'Definition',
            style: TextStyle(
              color: AppColors.neutralGray600,
              fontSize: 12.sp,
              fontWeight: FontWeight.w700,
              textTransform: TextTransform.uppercase,
              letterSpacing: 1.2,
            ),
          ),
          SizedBox(height: 8.h),
          Text(
            word.definition,
            style: TextStyle(
              color: AppColors.neutralGray900,
              fontSize: 16.sp,
              fontWeight: FontWeight.w600,
              height: 1.5,
            ),
          ),
          SizedBox(height: 24.h),
          Text(
            'Example',
            style: TextStyle(
              color: AppColors.neutralGray600,
              fontSize: 12.sp,
              fontWeight: FontWeight.w700,
              textTransform: TextTransform.uppercase,
              letterSpacing: 1.2,
            ),
          ),
          SizedBox(height: 8.h),
          Text(
            '"${word.example}"',
            style: TextStyle(
              color: AppColors.neutralGray700,
              fontSize: 14.sp,
              fontWeight: FontWeight.w600,
              fontStyle: FontStyle.italic,
              height: 1.5,
            ),
          ),
        ],
      ),
    );
  }
}

class VocabWord {
  final String word;
  final String definition;
  final String example;

  VocabWord({
    required this.word,
    required this.definition,
    required this.example,
  });
}
