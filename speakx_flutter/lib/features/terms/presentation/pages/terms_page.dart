import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/app_bar.dart';

class TermsPage extends StatelessWidget {
  const TermsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.neutralGray50,
      body: SafeArea(
        child: Column(
          children: [
            CustomAppBar(
              title: 'Terms & Conditions',
              showBackButton: true,
            ),
            Expanded(
              child: SingleChildScrollView(
                child: Padding(
                  padding: EdgeInsets.all(20.w),
                  child: Container(
                    padding: EdgeInsets.all(24.w),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(24.r),
                      border: Border.all(color: AppColors.neutralGray200, width: 2.w),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _buildSection(
                          title: '1. Acceptance of Terms',
                          content:
                              'By accessing and using SpeakX, you accept and agree to be bound by the terms and provision of this agreement.',
                        ),
                        _buildSection(
                          title: '2. Use License',
                          content:
                              'Permission is granted to temporarily download one copy of the materials on SpeakX for personal, non-commercial transitory viewing only.',
                        ),
                        _buildSection(
                          title: '3. Disclaimer',
                          content:
                              'The materials on SpeakX are provided on an \'as is\' basis. SpeakX makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
                        ),
                        _buildSection(
                          title: '4. Limitations',
                          content:
                              'In no event shall SpeakX or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SpeakX.',
                        ),
                        _buildSection(
                          title: '5. Privacy Policy',
                          content:
                              'Your use of SpeakX is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.',
                        ),
                        _buildSection(
                          title: '6. Governing Law',
                          content:
                              'These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.',
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSection({required String title, required String content}) {
    return Padding(
      padding: EdgeInsets.only(bottom: 24.h),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(
              fontSize: 16.sp,
              fontWeight: FontWeight.w900,
              color: AppColors.neutralGray900,
            ),
          ),
          SizedBox(height: 12.h),
          Text(
            content,
            style: TextStyle(
              fontSize: 14.sp,
              color: AppColors.neutralGray700,
              height: 1.6,
            ),
          ),
        ],
      ),
    );
  }
}
