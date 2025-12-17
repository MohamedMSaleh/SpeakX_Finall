import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/app_bar.dart';
import '../../../../shared/widgets/animated_components.dart';

class FriendsPage extends StatefulWidget {
  const FriendsPage({super.key});

  @override
  State<FriendsPage> createState() => _FriendsPageState();
}

class _FriendsPageState extends State<FriendsPage> {
  String selectedTab = 'friends';

  final List<Friend> friends = [
    Friend(name: 'Sarah Ahmed', avatar: 'https://picsum.photos/100/100?random=1', level: 15, xp: 1250, isOnline: true),
    Friend(name: 'John Doe', avatar: 'https://picsum.photos/100/100?random=2', level: 12, xp: 980, isOnline: false),
    Friend(name: 'Emma Wilson', avatar: 'https://picsum.photos/100/100?random=3', level: 18, xp: 1580, isOnline: true),
  ];

  final List<Friend> suggestions = [
    Friend(name: 'Mike Ross', avatar: 'https://picsum.photos/100/100?random=4', level: 14, xp: 1120, isOnline: false),
    Friend(name: 'Rachel Green', avatar: 'https://picsum.photos/100/100?random=5', level: 16, xp: 1350, isOnline: true),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.neutralGray50,
      body: SafeArea(
        child: Column(
          children: [
            CustomAppBar(
              title: 'Friends',
              showBackButton: true,
              actions: [
                IconButton(
                  icon: const Icon(LucideIcons.userPlus, color: AppColors.neutralGray600),
                  onPressed: () {},
                ),
              ],
            ),
            
            // Tabs
            Container(
              margin: EdgeInsets.all(20.w),
              padding: EdgeInsets.all(4.w),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16.r),
                border: Border.all(color: AppColors.neutralGray200, width: 2.w),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: AnimatedButton(
                      onPressed: () => setState(() => selectedTab = 'friends'),
                      child: Container(
                        padding: EdgeInsets.symmetric(vertical: 12.h),
                        decoration: BoxDecoration(
                          gradient: selectedTab == 'friends' ? LinearGradient(colors: AppColors.cardBlueGradient) : null,
                          borderRadius: BorderRadius.circular(12.r),
                        ),
                        child: Text(
                          'My Friends',
                          style: TextStyle(
                            fontSize: 14.sp,
                            fontWeight: FontWeight.w700,
                            color: selectedTab == 'friends' ? Colors.white : AppColors.neutralGray700,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ),
                  ),
                  Expanded(
                    child: AnimatedButton(
                      onPressed: () => setState(() => selectedTab = 'suggestions'),
                      child: Container(
                        padding: EdgeInsets.symmetric(vertical: 12.h),
                        decoration: BoxDecoration(
                          gradient: selectedTab == 'suggestions' ? LinearGradient(colors: AppColors.cardBlueGradient) : null,
                          borderRadius: BorderRadius.circular(12.r),
                        ),
                        child: Text(
                          'Suggestions',
                          style: TextStyle(
                            fontSize: 14.sp,
                            fontWeight: FontWeight.w700,
                            color: selectedTab == 'suggestions' ? Colors.white : AppColors.neutralGray700,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            
            // List
            Expanded(
              child: ListView.builder(
                padding: EdgeInsets.symmetric(horizontal: 20.w),
                itemCount: selectedTab == 'friends' ? friends.length : suggestions.length,
                itemBuilder: (context, index) {
                  final friend = selectedTab == 'friends' ? friends[index] : suggestions[index];
                  return PopInAnimation(
                    delay: 100 * index,
                    child: _buildFriendCard(friend, selectedTab == 'suggestions'),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFriendCard(Friend friend, bool isSuggestion) {
    return Container(
      margin: EdgeInsets.only(bottom: 12.h),
      padding: EdgeInsets.all(16.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20.r),
        border: Border.all(color: AppColors.neutralGray200, width: 2.w),
      ),
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
                    image: NetworkImage(friend.avatar),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              if (friend.isOnline)
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
                  friend.name,
                  style: TextStyle(
                    fontSize: 15.sp,
                    fontWeight: FontWeight.w900,
                    color: AppColors.neutralGray900,
                  ),
                ),
                SizedBox(height: 4.h),
                Row(
                  children: [
                    Container(
                      padding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 4.h),
                      decoration: BoxDecoration(
                        color: AppColors.neutralGray100,
                        borderRadius: BorderRadius.circular(8.r),
                      ),
                      child: Text(
                        'Level ${friend.level}',
                        style: TextStyle(
                          fontSize: 11.sp,
                          fontWeight: FontWeight.w700,
                          color: AppColors.neutralGray700,
                        ),
                      ),
                    ),
                    SizedBox(width: 8.w),
                    Icon(LucideIcons.award, size: 14.sp, color: AppColors.secondaryWarning),
                    SizedBox(width: 4.w),
                    Text(
                      '${friend.xp} XP',
                      style: TextStyle(
                        fontSize: 12.sp,
                        fontWeight: FontWeight.w700,
                        color: AppColors.neutralGray700,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          if (isSuggestion)
            AnimatedButton(
              onPressed: () {},
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 8.h),
                decoration: BoxDecoration(
                  gradient: LinearGradient(colors: AppColors.cardBlueGradient),
                  borderRadius: BorderRadius.circular(12.r),
                ),
                child: Text(
                  'Add',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 13.sp,
                    fontWeight: FontWeight.w900,
                  ),
                ),
              ),
            )
          else
            IconButton(
              icon: Icon(LucideIcons.messageCircle, color: AppColors.primaryBlue, size: 22.sp),
              onPressed: () {},
            ),
        ],
      ),
    );
  }
}

class Friend {
  final String name;
  final String avatar;
  final int level;
  final int xp;
  final bool isOnline;

  Friend({
    required this.name,
    required this.avatar,
    required this.level,
    required this.xp,
    required this.isOnline,
  });
}
