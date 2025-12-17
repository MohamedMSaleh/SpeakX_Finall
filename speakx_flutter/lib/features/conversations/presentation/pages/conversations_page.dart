import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/app_bar.dart';
import '../../../../shared/widgets/animated_components.dart';

class ConversationsPage extends StatelessWidget {
  const ConversationsPage({super.key});

  final List<Conversation> conversations = const [
    Conversation(
      name: 'Sarah Ahmed',
      avatar: 'https://picsum.photos/100/100?random=1',
      lastMessage: 'See you in the next practice session!',
      time: '2m ago',
      unread: 2,
      isOnline: true,
    ),
    Conversation(
      name: 'John Doe',
      avatar: 'https://picsum.photos/100/100?random=2',
      lastMessage: 'Thanks for the pronunciation tips 👍',
      time: '1h ago',
      unread: 0,
      isOnline: false,
    ),
    Conversation(
      name: 'Emma Wilson',
      avatar: 'https://picsum.photos/100/100?random=3',
      lastMessage: 'Let\'s practice together tomorrow',
      time: '3h ago',
      unread: 1,
      isOnline: true,
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
              title: 'Messages',
              showBackButton: true,
              actions: [
                IconButton(
                  icon: const Icon(LucideIcons.edit, color: AppColors.neutralGray600),
                  onPressed: () {},
                ),
              ],
            ),
            Expanded(
              child: ListView.builder(
                padding: EdgeInsets.all(20.w),
                itemCount: conversations.length,
                itemBuilder: (context, index) {
                  final conversation = conversations[index];
                  return PopInAnimation(
                    delay: 100 * index,
                    child: _buildConversationCard(context, conversation),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildConversationCard(BuildContext context, Conversation conversation) {
    return Container(
      margin: EdgeInsets.only(bottom: 12.h),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20.r),
        border: Border.all(color: AppColors.neutralGray200, width: 2.w),
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () {
            // Navigate to chat session
          },
          borderRadius: BorderRadius.circular(20.r),
          child: Padding(
            padding: EdgeInsets.all(16.w),
            child: Row(
              children: [
                Stack(
                  children: [
                    Container(
                      width: 56.w,
                      height: 56.w,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        image: DecorationImage(
                          image: NetworkImage(conversation.avatar),
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                    if (conversation.isOnline)
                      Positioned(
                        bottom: 0,
                        right: 0,
                        child: Container(
                          width: 16.w,
                          height: 16.w,
                          decoration: BoxDecoration(
                            color: AppColors.secondarySuccess,
                            shape: BoxShape.circle,
                            border: Border.all(color: Colors.white, width: 2.w),
                          ),
                        ),
                      ),
                  ],
                ),
                SizedBox(width: 12.w),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        conversation.name,
                        style: TextStyle(
                          fontSize: 15.sp,
                          fontWeight: FontWeight.w900,
                          color: AppColors.neutralGray900,
                        ),
                      ),
                      SizedBox(height: 4.h),
                      Text(
                        conversation.lastMessage,
                        style: TextStyle(
                          fontSize: 13.sp,
                          color: AppColors.neutralGray600,
                          fontWeight: FontWeight.w600,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),
                SizedBox(width: 8.w),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      conversation.time,
                      style: TextStyle(
                        fontSize: 11.sp,
                        color: AppColors.neutralGray500,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    if (conversation.unread > 0) ...[
                      SizedBox(height: 4.h),
                      Container(
                        padding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 4.h),
                        decoration: BoxDecoration(
                          gradient: LinearGradient(colors: AppColors.cardBlueGradient),
                          borderRadius: BorderRadius.circular(10.r),
                        ),
                        child: Text(
                          conversation.unread.toString(),
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 11.sp,
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                      ),
                    ],
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class Conversation {
  final String name;
  final String avatar;
  final String lastMessage;
  final String time;
  final int unread;
  final bool isOnline;

  const Conversation({
    required this.name,
    required this.avatar,
    required this.lastMessage,
    required this.time,
    required this.unread,
    required this.isOnline,
  });
}
