import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/app_bar.dart';

class ActiveRoomPage extends StatefulWidget {
  final String roomName;
  
  const ActiveRoomPage({super.key, required this.roomName});

  @override
  State<ActiveRoomPage> createState() => _ActiveRoomPageState();
}

class _ActiveRoomPageState extends State<ActiveRoomPage> {
  bool isMuted = false;
  bool isSpeakerOn = true;
  
  final List<Participant> participants = [
    Participant(name: 'Sarah Ahmed', avatar: 'https://picsum.photos/100/100?random=1', isSpeaking: true, isMuted: false),
    Participant(name: 'John Doe', avatar: 'https://picsum.photos/100/100?random=2', isSpeaking: false, isMuted: false),
    Participant(name: 'Emma Wilson', avatar: 'https://picsum.photos/100/100?random=3', isSpeaking: false, isMuted: true),
    Participant(name: 'You', avatar: 'https://picsum.photos/100/100?random=4', isSpeaking: false, isMuted: false, isYou: true),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.neutralGray900,
      body: SafeArea(
        child: Column(
          children: [
            // Header
            Padding(
              padding: EdgeInsets.all(20.w),
              child: Row(
                children: [
                  AnimatedButton(
                    onPressed: () => _showLeaveDialog(),
                    child: Container(
                      padding: EdgeInsets.all(12.w),
                      decoration: BoxDecoration(
                        color: AppColors.neutralGray800,
                        borderRadius: BorderRadius.circular(12.r),
                      ),
                      child: Icon(LucideIcons.chevronDown, color: Colors.white, size: 20.sp),
                    ),
                  ),
                  SizedBox(width: 16.w),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          widget.roomName,
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 16.sp,
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                        SizedBox(height: 4.h),
                        Row(
                          children: [
                            Container(
                              width: 8.w,
                              height: 8.w,
                              decoration: const BoxDecoration(
                                color: AppColors.secondarySuccess,
                                shape: BoxShape.circle,
                              ),
                            ),
                            SizedBox(width: 6.w),
                            Text(
                              '${participants.length} active',
                              style: TextStyle(
                                color: AppColors.neutralGray400,
                                fontSize: 12.sp,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  AnimatedButton(
                    onPressed: () {},
                    child: Container(
                      padding: EdgeInsets.all(12.w),
                      decoration: BoxDecoration(
                        color: AppColors.neutralGray800,
                        borderRadius: BorderRadius.circular(12.r),
                      ),
                      child: Icon(LucideIcons.userPlus, color: Colors.white, size: 20.sp),
                    ),
                  ),
                ],
              ),
            ),
            
            // Participants Grid
            Expanded(
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: 20.w),
                child: GridView.builder(
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    crossAxisSpacing: 16.w,
                    mainAxisSpacing: 16.h,
                    childAspectRatio: 0.85,
                  ),
                  itemCount: participants.length,
                  itemBuilder: (context, index) => _buildParticipantCard(participants[index]),
                ),
              ),
            ),
            
            // Controls
            Container(
              padding: EdgeInsets.all(24.w),
              decoration: BoxDecoration(
                color: AppColors.neutralGray800,
                borderRadius: BorderRadius.vertical(top: Radius.circular(32.r)),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  _buildControlButton(
                    icon: isMuted ? LucideIcons.micOff : LucideIcons.mic,
                    label: isMuted ? 'Unmute' : 'Mute',
                    color: isMuted ? AppColors.secondaryWarning : AppColors.neutralGray700,
                    onTap: () => setState(() => isMuted = !isMuted),
                  ),
                  _buildControlButton(
                    icon: isSpeakerOn ? LucideIcons.volume2 : LucideIcons.volumeX,
                    label: 'Speaker',
                    color: AppColors.neutralGray700,
                    onTap: () => setState(() => isSpeakerOn = !isSpeakerOn),
                  ),
                  _buildControlButton(
                    icon: LucideIcons.phoneOff,
                    label: 'Leave',
                    color: AppColors.secondaryWarning,
                    onTap: _showLeaveDialog,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildParticipantCard(Participant participant) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.neutralGray800,
        borderRadius: BorderRadius.circular(20.r),
        border: participant.isSpeaking
            ? Border.all(color: AppColors.secondarySuccess, width: 3.w)
            : null,
      ),
      child: Stack(
        children: [
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 80.w,
                height: 80.w,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  image: DecorationImage(
                    image: NetworkImage(participant.avatar),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              SizedBox(height: 12.h),
              Text(
                participant.name,
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 14.sp,
                  fontWeight: FontWeight.w700,
                ),
                textAlign: TextAlign.center,
              ),
              if (participant.isYou)
                Container(
                  margin: EdgeInsets.only(top: 4.h),
                  padding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 4.h),
                  decoration: BoxDecoration(
                    color: AppColors.primaryBlue,
                    borderRadius: BorderRadius.circular(8.r),
                  ),
                  child: Text(
                    'You',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 10.sp,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                ),
            ],
          ),
          if (participant.isMuted)
            Positioned(
              top: 12.h,
              right: 12.w,
              child: Container(
                padding: EdgeInsets.all(8.w),
                decoration: BoxDecoration(
                  color: AppColors.neutralGray700,
                  shape: BoxShape.circle,
                ),
                child: Icon(LucideIcons.micOff, color: Colors.white, size: 16.sp),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildControlButton({
    required IconData icon,
    required String label,
    required Color color,
    required VoidCallback onTap,
  }) {
    return AnimatedButton(
      onPressed: onTap,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 64.w,
            height: 64.w,
            decoration: BoxDecoration(
              color: color,
              shape: BoxShape.circle,
            ),
            child: Icon(icon, color: Colors.white, size: 28.sp),
          ),
          SizedBox(height: 8.h),
          Text(
            label,
            style: TextStyle(
              color: Colors.white,
              fontSize: 12.sp,
              fontWeight: FontWeight.w700,
            ),
          ),
        ],
      ),
    );
  }

  void _showLeaveDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppColors.neutralGray800,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24.r)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(LucideIcons.logOut, color: AppColors.secondaryWarning, size: 48.sp),
            SizedBox(height: 16.h),
            Text(
              'Leave Room?',
              style: TextStyle(
                fontSize: 20.sp,
                fontWeight: FontWeight.w900,
                color: Colors.white,
              ),
            ),
            SizedBox(height: 8.h),
            Text(
              'Are you sure you want to leave this room?',
              style: TextStyle(
                fontSize: 14.sp,
                color: AppColors.neutralGray400,
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 24.h),
            Row(
              children: [
                Expanded(
                  child: AnimatedButton(
                    onPressed: () => Navigator.pop(context),
                    child: Container(
                      padding: EdgeInsets.symmetric(vertical: 14.h),
                      decoration: BoxDecoration(
                        color: AppColors.neutralGray700,
                        borderRadius: BorderRadius.circular(16.r),
                      ),
                      child: Text(
                        'Cancel',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 14.sp,
                          fontWeight: FontWeight.w700,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
                ),
                SizedBox(width: 12.w),
                Expanded(
                  child: AnimatedButton(
                    onPressed: () {
                      Navigator.pop(context);
                      Navigator.pop(context);
                    },
                    child: Container(
                      padding: EdgeInsets.symmetric(vertical: 14.h),
                      decoration: BoxDecoration(
                        color: AppColors.secondaryWarning,
                        borderRadius: BorderRadius.circular(16.r),
                      ),
                      child: Text(
                        'Leave',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 14.sp,
                          fontWeight: FontWeight.w900,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class Participant {
  final String name;
  final String avatar;
  final bool isSpeaking;
  final bool isMuted;
  final bool isYou;

  Participant({
    required this.name,
    required this.avatar,
    required this.isSpeaking,
    required this.isMuted,
    this.isYou = false,
  });
}
