import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/app_bar.dart';

class CreateRoomPage extends StatefulWidget {
  const CreateRoomPage({super.key});

  @override
  State<CreateRoomPage> createState() => _CreateRoomPageState();
}

class _CreateRoomPageState extends State<CreateRoomPage> {
  final TextEditingController _roomNameController = TextEditingController();
  final TextEditingController _topicController = TextEditingController();
  
  String selectedLevel = 'Beginner';
  int maxParticipants = 5;
  bool isPrivate = false;

  final List<String> levels = ['Beginner', 'Intermediate', 'Advanced'];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.neutralGray50,
      body: SafeArea(
        child: Column(
          children: [
            CustomAppBar(
              title: 'Create Room',
              showBackButton: true,
            ),
            Expanded(
              child: SingleChildScrollView(
                child: Padding(
                  padding: EdgeInsets.all(20.w),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _buildSectionTitle('Room Name'),
                      SizedBox(height: 12.h),
                      _buildTextField(
                        controller: _roomNameController,
                        hint: 'Enter room name',
                        icon: LucideIcons.hash,
                      ),
                      SizedBox(height: 24.h),
                      
                      _buildSectionTitle('Topic'),
                      SizedBox(height: 12.h),
                      _buildTextField(
                        controller: _topicController,
                        hint: 'What will you discuss?',
                        icon: LucideIcons.messageCircle,
                      ),
                      SizedBox(height: 24.h),
                      
                      _buildSectionTitle('Level'),
                      SizedBox(height: 12.h),
                      _buildLevelSelector(),
                      SizedBox(height: 24.h),
                      
                      _buildSectionTitle('Max Participants'),
                      SizedBox(height: 12.h),
                      _buildParticipantSelector(),
                      SizedBox(height: 24.h),
                      
                      _buildSectionTitle('Room Privacy'),
                      SizedBox(height: 12.h),
                      _buildPrivacyToggle(),
                      SizedBox(height: 40.h),
                      
                      AnimatedButton(
                        onPressed: _createRoom,
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
                            'Create Room',
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
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(
      title,
      style: TextStyle(
        fontSize: 16.sp,
        fontWeight: FontWeight.w900,
        color: AppColors.neutralGray900,
      ),
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String hint,
    required IconData icon,
  }) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 4.h),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16.r),
        border: Border.all(color: AppColors.neutralGray200, width: 2.w),
      ),
      child: Row(
        children: [
          Icon(icon, color: AppColors.neutralGray400, size: 20.sp),
          SizedBox(width: 12.w),
          Expanded(
            child: TextField(
              controller: controller,
              style: TextStyle(
                fontSize: 14.sp,
                fontWeight: FontWeight.w600,
                color: AppColors.neutralGray900,
              ),
              decoration: InputDecoration(
                hintText: hint,
                hintStyle: TextStyle(
                  color: AppColors.neutralGray400,
                  fontSize: 14.sp,
                  fontWeight: FontWeight.w600,
                ),
                border: InputBorder.none,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLevelSelector() {
    return Row(
      children: levels.map((level) {
        final isSelected = selectedLevel == level;
        return Expanded(
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 4.w),
            child: AnimatedButton(
              onPressed: () => setState(() => selectedLevel = level),
              child: Container(
                padding: EdgeInsets.symmetric(vertical: 14.h),
                decoration: BoxDecoration(
                  gradient: isSelected ? LinearGradient(colors: AppColors.cardBlueGradient) : null,
                  color: isSelected ? null : Colors.white,
                  borderRadius: BorderRadius.circular(16.r),
                  border: Border.all(
                    color: isSelected ? Colors.transparent : AppColors.neutralGray200,
                    width: 2.w,
                  ),
                ),
                child: Text(
                  level,
                  style: TextStyle(
                    color: isSelected ? Colors.white : AppColors.neutralGray700,
                    fontSize: 13.sp,
                    fontWeight: FontWeight.w700,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildParticipantSelector() {
    return Container(
      padding: EdgeInsets.all(16.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16.r),
        border: Border.all(color: AppColors.neutralGray200, width: 2.w),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            'Maximum participants',
            style: TextStyle(
              fontSize: 14.sp,
              fontWeight: FontWeight.w700,
              color: AppColors.neutralGray700,
            ),
          ),
          Row(
            children: [
              _buildCounterButton(LucideIcons.minus, () {
                if (maxParticipants > 2) {
                  setState(() => maxParticipants--);
                }
              }),
              SizedBox(width: 16.w),
              Text(
                maxParticipants.toString(),
                style: TextStyle(
                  fontSize: 18.sp,
                  fontWeight: FontWeight.w900,
                  color: AppColors.primaryBlue,
                ),
              ),
              SizedBox(width: 16.w),
              _buildCounterButton(LucideIcons.plus, () {
                if (maxParticipants < 10) {
                  setState(() => maxParticipants++);
                }
              }),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildCounterButton(IconData icon, VoidCallback onTap) {
    return AnimatedButton(
      onPressed: onTap,
      child: Container(
        width: 36.w,
        height: 36.w,
        decoration: BoxDecoration(
          gradient: LinearGradient(colors: AppColors.cardBlueGradient),
          borderRadius: BorderRadius.circular(10.r),
        ),
        child: Icon(icon, color: Colors.white, size: 18.sp),
      ),
    );
  }

  Widget _buildPrivacyToggle() {
    return Container(
      padding: EdgeInsets.all(16.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16.r),
        border: Border.all(color: AppColors.neutralGray200, width: 2.w),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Private Room',
                style: TextStyle(
                  fontSize: 14.sp,
                  fontWeight: FontWeight.w700,
                  color: AppColors.neutralGray900,
                ),
              ),
              SizedBox(height: 4.h),
              Text(
                'Only invited users can join',
                style: TextStyle(
                  fontSize: 12.sp,
                  color: AppColors.neutralGray600,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          Switch(
            value: isPrivate,
            onChanged: (value) => setState(() => isPrivate = value),
            activeColor: AppColors.primaryBlue,
          ),
        ],
      ),
    );
  }

  void _createRoom() {
    if (_roomNameController.text.isEmpty || _topicController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: const Text('Please fill all fields'),
          backgroundColor: AppColors.secondaryWarning,
        ),
      );
      return;
    }
    
    Navigator.pop(context);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text('Room created successfully! 🎉'),
        backgroundColor: AppColors.secondarySuccess,
      ),
    );
  }

  @override
  void dispose() {
    _roomNameController.dispose();
    _topicController.dispose();
    super.dispose();
  }
}
