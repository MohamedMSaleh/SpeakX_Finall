import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/app_bar.dart';

class ChatSessionPage extends StatefulWidget {
  final String userName;
  final String userAvatar;

  const ChatSessionPage({
    super.key,
    required this.userName,
    required this.userAvatar,
  });

  @override
  State<ChatSessionPage> createState() => _ChatSessionPageState();
}

class _ChatSessionPageState extends State<ChatSessionPage> {
  final TextEditingController _messageController = TextEditingController();
  final List<ChatMessage> messages = [
    ChatMessage(text: 'Hey! Ready for practice?', isMine: false, time: '10:30 AM'),
    ChatMessage(text: 'Yes! Let\'s do it 🎉', isMine: true, time: '10:31 AM'),
    ChatMessage(text: 'Great! What topic should we focus on?', isMine: false, time: '10:31 AM'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.neutralGray50,
      body: SafeArea(
        child: Column(
          children: [
            // Header
            Container(
              padding: EdgeInsets.all(16.w),
              decoration: BoxDecoration(
                color: Colors.white,
                border: Border(
                  bottom: BorderSide(color: AppColors.neutralGray200, width: 2.w),
                ),
              ),
              child: Row(
                children: [
                  AnimatedButton(
                    onPressed: () => Navigator.pop(context),
                    child: Icon(LucideIcons.chevronLeft, size: 24.sp, color: AppColors.neutralGray700),
                  ),
                  SizedBox(width: 12.w),
                  Container(
                    width: 40.w,
                    height: 40.w,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      image: DecorationImage(
                        image: NetworkImage(widget.userAvatar),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                  SizedBox(width: 12.w),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          widget.userName,
                          style: TextStyle(
                            fontSize: 15.sp,
                            fontWeight: FontWeight.w900,
                            color: AppColors.neutralGray900,
                          ),
                        ),
                        Text(
                          'Online',
                          style: TextStyle(
                            fontSize: 12.sp,
                            color: AppColors.secondarySuccess,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            
            // Messages
            Expanded(
              child: ListView.builder(
                padding: EdgeInsets.all(20.w),
                itemCount: messages.length,
                itemBuilder: (context, index) {
                  final message = messages[index];
                  return _buildMessage(message);
                },
              ),
            ),
            
            // Input
            Container(
              padding: EdgeInsets.all(16.w),
              decoration: BoxDecoration(
                color: Colors.white,
                border: Border(
                  top: BorderSide(color: AppColors.neutralGray200, width: 2.w),
                ),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Container(
                      padding: EdgeInsets.symmetric(horizontal: 16.w),
                      decoration: BoxDecoration(
                        color: AppColors.neutralGray100,
                        borderRadius: BorderRadius.circular(24.r),
                      ),
                      child: TextField(
                        controller: _messageController,
                        decoration: InputDecoration(
                          hintText: 'Type a message...',
                          border: InputBorder.none,
                          hintStyle: TextStyle(
                            color: AppColors.neutralGray500,
                            fontSize: 14.sp,
                          ),
                        ),
                        style: TextStyle(fontSize: 14.sp),
                      ),
                    ),
                  ),
                  SizedBox(width: 12.w),
                  AnimatedButton(
                    onPressed: () {
                      if (_messageController.text.isNotEmpty) {
                        setState(() {
                          messages.add(ChatMessage(
                            text: _messageController.text,
                            isMine: true,
                            time: 'Now',
                          ));
                          _messageController.clear();
                        });
                      }
                    },
                    child: Container(
                      width: 48.w,
                      height: 48.w,
                      decoration: BoxDecoration(
                        gradient: LinearGradient(colors: AppColors.cardBlueGradient),
                        shape: BoxShape.circle,
                      ),
                      child: Icon(LucideIcons.send, color: Colors.white, size: 20.sp),
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

  Widget _buildMessage(ChatMessage message) {
    return Align(
      alignment: message.isMine ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: EdgeInsets.only(bottom: 12.h),
        padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 12.h),
        constraints: BoxConstraints(maxWidth: 280.w),
        decoration: BoxDecoration(
          gradient: message.isMine ? LinearGradient(colors: AppColors.cardBlueGradient) : null,
          color: message.isMine ? null : Colors.white,
          borderRadius: BorderRadius.circular(20.r),
          border: message.isMine ? null : Border.all(color: AppColors.neutralGray200, width: 2.w),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              message.text,
              style: TextStyle(
                fontSize: 14.sp,
                color: message.isMine ? Colors.white : AppColors.neutralGray900,
                fontWeight: FontWeight.w600,
              ),
            ),
            SizedBox(height: 4.h),
            Text(
              message.time,
              style: TextStyle(
                fontSize: 11.sp,
                color: message.isMine ? Colors.white.withOpacity(0.7) : AppColors.neutralGray500,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    _messageController.dispose();
    super.dispose();
  }
}

class ChatMessage {
  final String text;
  final bool isMine;
  final String time;

  ChatMessage({
    required this.text,
    required this.isMine,
    required this.time,
  });
}
