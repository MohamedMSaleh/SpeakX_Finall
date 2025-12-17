import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/app_bar.dart';
import '../../../../shared/widgets/animated_components.dart';

class AssessmentHistoryPage extends StatelessWidget {
  const AssessmentHistoryPage({super.key});

  final List<AssessmentResult> results = const [
    AssessmentResult(
      date: 'Dec 15, 2025',
      score: 85,
      speaking: 88,
      listening: 82,
      reading: 86,
      grammar: 84,
      level: 'Upper Intermediate',
    ),
    AssessmentResult(
      date: 'Nov 20, 2025',
      score: 78,
      speaking: 75,
      listening: 80,
      reading: 77,
      grammar: 79,
      level: 'Intermediate',
    ),
    AssessmentResult(
      date: 'Oct 10, 2025',
      score: 70,
      speaking: 68,
      listening: 72,
      reading: 71,
      grammar: 69,
      level: 'Intermediate',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.neutralGray50,
      body: SafeArea(
        child: Column(
          children: [
            CustomAppBar(
              title: 'Assessment History',
              showBackButton: true,
            ),
            Expanded(
              child: SingleChildScrollView(
                child: Padding(
                  padding: EdgeInsets.all(20.w),
                  child: Column(
                    children: [
                      // Progress Card
                      PopInAnimation(
                        child: Container(
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
                          child: Column(
                            children: [
                              Text(
                                'Your Progress',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 18.sp,
                                  fontWeight: FontWeight.w900,
                                ),
                              ),
                              SizedBox(height: 16.h),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceAround,
                                children: [
                                  _buildProgressStat('Tests', results.length.toString()),
                                  _buildProgressStat('Avg Score', '${((results.fold(0, (sum, r) => sum + r.score)) / results.length).round()}%'),
                                  _buildProgressStat('Improvement', '+15%'),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ),
                      SizedBox(height: 24.h),
                      
                      // Results List
                      ...results.asMap().entries.map((entry) {
                        final index = entry.key;
                        final result = entry.value;
                        return PopInAnimation(
                          delay: 100 * (index + 1),
                          child: _buildResultCard(result),
                        );
                      }),
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

  Widget _buildProgressStat(String label, String value) {
    return Column(
      children: [
        Text(
          value,
          style: TextStyle(
            color: Colors.white,
            fontSize: 24.sp,
            fontWeight: FontWeight.w900,
          ),
        ),
        SizedBox(height: 4.h),
        Text(
          label,
          style: TextStyle(
            color: Colors.white.withOpacity(0.9),
            fontSize: 12.sp,
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }

  Widget _buildResultCard(AssessmentResult result) {
    return Container(
      margin: EdgeInsets.only(bottom: 16.h),
      padding: EdgeInsets.all(20.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24.r),
        border: Border.all(color: AppColors.neutralGray200, width: 2.w),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 64.w,
                height: 64.w,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: _getScoreGradient(result.score),
                  ),
                  shape: BoxShape.circle,
                ),
                child: Center(
                  child: Text(
                    '${result.score}',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 24.sp,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                ),
              ),
              SizedBox(width: 16.w),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      result.level,
                      style: TextStyle(
                        fontSize: 16.sp,
                        fontWeight: FontWeight.w900,
                        color: AppColors.neutralGray900,
                      ),
                    ),
                    SizedBox(height: 4.h),
                    Text(
                      result.date,
                      style: TextStyle(
                        fontSize: 13.sp,
                        color: AppColors.neutralGray600,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          SizedBox(height: 20.h),
          Row(
            children: [
              Expanded(child: _buildSkillScore('Speaking', result.speaking)),
              SizedBox(width: 12.w),
              Expanded(child: _buildSkillScore('Listening', result.listening)),
            ],
          ),
          SizedBox(height: 12.h),
          Row(
            children: [
              Expanded(child: _buildSkillScore('Reading', result.reading)),
              SizedBox(width: 12.w),
              Expanded(child: _buildSkillScore('Grammar', result.grammar)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSkillScore(String skill, int score) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          skill,
          style: TextStyle(
            fontSize: 12.sp,
            color: AppColors.neutralGray600,
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 6.h),
        Stack(
          children: [
            Container(
              height: 8.h,
              decoration: BoxDecoration(
                color: AppColors.neutralGray200,
                borderRadius: BorderRadius.circular(4.r),
              ),
            ),
            FractionallySizedBox(
              widthFactor: score / 100,
              child: Container(
                height: 8.h,
                decoration: BoxDecoration(
                  gradient: LinearGradient(colors: _getScoreGradient(score)),
                  borderRadius: BorderRadius.circular(4.r),
                ),
              ),
            ),
          ],
        ),
        SizedBox(height: 4.h),
        Text(
          '$score%',
          style: TextStyle(
            fontSize: 12.sp,
            color: AppColors.neutralGray900,
            fontWeight: FontWeight.w700,
          ),
        ),
      ],
    );
  }

  List<Color> _getScoreGradient(int score) {
    if (score >= 80) return AppColors.cardGreenGradient;
    if (score >= 60) return AppColors.cardYellowGradient;
    return AppColors.cardPinkGradient;
  }
}

class AssessmentResult {
  final String date;
  final int score;
  final int speaking;
  final int listening;
  final int reading;
  final int grammar;
  final String level;

  const AssessmentResult({
    required this.date,
    required this.score,
    required this.speaking,
    required this.listening,
    required this.reading,
    required this.grammar,
    required this.level,
  });
}
