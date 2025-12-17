import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/animated_widgets.dart';

class CallSessionPage extends StatefulWidget {
  final String userName;
  final String userAvatar;

  const CallSessionPage({
    super.key,
    required this.userName,
    required this.userAvatar,
  });

  @override
  State<CallSessionPage> createState() => _CallSessionPageState();
}

class _CallSessionPageState extends State<CallSessionPage> {
  bool isMuted = false;
  bool isSpeakerOn = true;
  bool isVideoOn = true;
  int callDuration = 0;

  @override
  void initState() {
    super.initState();
    // Start call timer
    Future.delayed(const Duration(seconds: 1), _incrementDuration);
  }

  void _incrementDuration() {
    if (mounted) {
      setState(() => callDuration++);
      Future.delayed(const Duration(seconds: 1), _incrementDuration);
    }
  }

  String _formatDuration(int seconds) {
    final minutes = (seconds ~/ 60).toString().padLeft(2, '0');
    final secs = (seconds % 60).toString().padLeft(2, '0');
    return '$minutes:$secs';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.neutralGray900,
      body: SafeArea(
        child: Stack(
          children: [
            // Background gradient
            Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    AppColors.primaryBlue.withOpacity(0.3),
                    AppColors.neutralGray900,
                  ],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                ),
              ),
            ),

            Column(
              children: [
                // Header
                Padding(
                  padding: EdgeInsets.all(20.w),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      AnimatedButton(
                        onPressed: () => _endCall(),
                        child: Icon(
                          LucideIcons.chevronLeft,
                          color: Colors.white,
                          size: 28.sp,
                        ),
                      ),
                      Text(
                        _formatDuration(callDuration),
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 16.sp,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      SizedBox(width: 28.sp),
                    ],
                  ),
                ),

                const Spacer(),

                // User Avatar
                Container(
                  width: 180.w,
                  height: 180.w,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(color: Colors.white, width: 4.w),
                    gradient: LinearGradient(
                      colors: AppColors.cardBlueGradient,
                    ),
                  ),
                  child: Center(
                    child: Text(
                      widget.userName[0].toUpperCase(),
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 72.sp,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                  ),
                ),
                SizedBox(height: 24.h),

                // User Name
                Text(
                  widget.userName,
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 28.sp,
                    fontWeight: FontWeight.w900,
                  ),
                ),
                SizedBox(height: 8.h),
                Text(
                  'Voice Call',
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.7),
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w600,
                  ),
                ),

                const Spacer(),

                // Controls
                Padding(
                  padding: EdgeInsets.all(32.w),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      _buildControlButton(
                        icon: isMuted ? LucideIcons.micOff : LucideIcons.mic,
                        label: isMuted ? 'Unmute' : 'Mute',
                        isActive: isMuted,
                        onTap: () => setState(() => isMuted = !isMuted),
                      ),
                      _buildControlButton(
                        icon: isSpeakerOn ? LucideIcons.volume2 : LucideIcons.volumeX,
                        label: 'Speaker',
                        isActive: isSpeakerOn,
                        onTap: () => setState(() => isSpeakerOn = !isSpeakerOn),
                      ),
                      _buildControlButton(
                        icon: isVideoOn ? LucideIcons.video : LucideIcons.videoOff,
                        label: 'Video',
                        isActive: isVideoOn,
                        onTap: () => setState(() => isVideoOn = !isVideoOn),
                      ),
                    ],
                  ),
                ),
                SizedBox(height: 16.h),

                // End Call Button
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 32.w),
                  child: AnimatedButton(
                    onPressed: _endCall,
                    child: Container(
                      width: double.infinity,
                      padding: EdgeInsets.symmetric(vertical: 20.h),
                      decoration: BoxDecoration(
                        color: AppColors.secondaryEnergy,
                        borderRadius: BorderRadius.circular(24.r),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(
                            LucideIcons.phoneOff,
                            color: Colors.white,
                            size: 24.sp,
                          ),
                          SizedBox(width: 12.w),
                          Text(
                            'End Call',
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
                ),
                SizedBox(height: 32.h),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildControlButton({
    required IconData icon,
    required String label,
    required bool isActive,
    required VoidCallback onTap,
  }) {
    return AnimatedButton(
      onPressed: onTap,
      child: Column(
        children: [
          Container(
            width: 64.w,
            height: 64.w,
            decoration: BoxDecoration(
              color: isActive ? AppColors.primaryBlue : Colors.white.withOpacity(0.2),
              shape: BoxShape.circle,
            ),
            child: Icon(
              icon,
              color: Colors.white,
              size: 28.sp,
            ),
          ),
          SizedBox(height: 8.h),
          Text(
            label,
            style: TextStyle(
              color: Colors.white,
              fontSize: 12.sp,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  void _endCall() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24.r)),
        title: Text(
          'End Call?',
          style: TextStyle(
            fontSize: 20.sp,
            fontWeight: FontWeight.w900,
            color: AppColors.neutralGray900,
          ),
        ),
        content: Text(
          'Are you sure you want to end this call?',
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
              'Cancel',
              style: TextStyle(
                fontSize: 14.sp,
                fontWeight: FontWeight.w700,
                color: AppColors.neutralGray600,
              ),
            ),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pop(context);
            },
            child: Text(
              'End Call',
              style: TextStyle(
                fontSize: 14.sp,
                fontWeight: FontWeight.w700,
                color: AppColors.secondaryEnergy,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
