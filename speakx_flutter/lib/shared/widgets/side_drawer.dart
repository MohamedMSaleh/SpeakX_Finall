import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:provider/provider.dart';
import '../../core/theme/app_colors.dart';
import '../../core/providers/auth_provider.dart';
import '../../core/providers/navigation_provider.dart';

class SpeakXDrawer extends StatelessWidget {
  const SpeakXDrawer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Column(
        children: [
          // Profile Header
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  const Color(0xFF1E3A8A),
                  const Color(0xFF3B82F6),
                ],
              ),
            ),
            child: SafeArea(
              bottom: false,
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Stack(
                          children: [
                            Container(
                              width: 64,
                              height: 64,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                border: Border.all(
                                  color: Colors.white.withOpacity(0.3),
                                  width: 2,
                                ),
                                image: const DecorationImage(
                                  image: NetworkImage('https://picsum.photos/200/200?random=8'),
                                  fit: BoxFit.cover,
                                ),
                              ),
                            ),
                            Positioned(
                              bottom: 0,
                              right: 0,
                              child: Container(
                                width: 16,
                                height: 16,
                                decoration: BoxDecoration(
                                  color: AppColors.success,
                                  shape: BoxShape.circle,
                                  border: Border.all(
                                    color: const Color(0xFF1E3A8A),
                                    width: 2,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: const [
                              Text(
                                'Amira M.',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 18,
                                  fontWeight: FontWeight.w700,
                                ),
                                overflow: TextOverflow.ellipsis,
                              ),
                              Text(
                                'amira@example.com',
                                style: TextStyle(
                                  color: Color(0xFFBFDBFE),
                                  fontSize: 14,
                                ),
                                overflow: TextOverflow.ellipsis,
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    Row(
                      children: [
                        _StatChip(
                          icon: LucideIcons.zap,
                          value: '1,250',
                          color: AppColors.yellow,
                        ),
                        const SizedBox(width: 8),
                        _StatChip(
                          icon: LucideIcons.flame,
                          value: '12',
                          color: AppColors.orange,
                        ),
                        const SizedBox(width: 8),
                        _StatChip(
                          icon: LucideIcons.shield,
                          value: 'Pro',
                          color: const Color(0xFF93C5FD),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),

          // Navigation Links
          Expanded(
            child: ListView(
              padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 8),
              children: [
                _DrawerItem(
                  icon: LucideIcons.home,
                  label: 'Home',
                  onTap: () {
                    Navigator.pop(context);
                    context.read<NavigationProvider>().navigateTo('/dashboard');
                  },
                ),
                _DrawerItem(
                  icon: LucideIcons.map,
                  label: 'Plan',
                  onTap: () {
                    Navigator.pop(context);
                    context.read<NavigationProvider>().navigateTo('/roadmap');
                  },
                ),
                _DrawerItem(
                  icon: LucideIcons.zap,
                  label: 'Challenges',
                  onTap: () {
                    Navigator.pop(context);
                    context.read<NavigationProvider>().navigateTo('/challenges');
                  },
                ),
                _DrawerItem(
                  icon: LucideIcons.graduationCap,
                  label: 'Tutor',
                  onTap: () {
                    Navigator.pop(context);
                    context.read<NavigationProvider>().navigateTo('/tutors');
                  },
                ),
                _DrawerItem(
                  icon: LucideIcons.users,
                  label: 'Rooms',
                  onTap: () {
                    Navigator.pop(context);
                    context.read<NavigationProvider>().navigateTo('/rooms');
                  },
                ),
                const Divider(height: 24, thickness: 1),
                _DrawerItem(
                  icon: LucideIcons.userCircle,
                  label: 'Profile',
                  onTap: () {
                    Navigator.pop(context);
                    context.read<NavigationProvider>().navigateTo('/profile');
                  },
                ),
                _DrawerItem(
                  icon: LucideIcons.briefcase,
                  label: 'Career Hub',
                  onTap: () {
                    Navigator.pop(context);
                    context.read<NavigationProvider>().navigateTo('/career-hub');
                  },
                ),
                _DrawerItem(
                  icon: LucideIcons.users,
                  label: 'Friends',
                  onTap: () {
                    Navigator.pop(context);
                    context.read<NavigationProvider>().navigateTo('/friends');
                  },
                ),
                _DrawerItem(
                  icon: LucideIcons.creditCard,
                  label: 'Subscription',
                  onTap: () {
                    Navigator.pop(context);
                    context.read<NavigationProvider>().navigateTo('/subscription');
                  },
                ),
                _DrawerItem(
                  icon: LucideIcons.settings,
                  label: 'Settings',
                  onTap: () {
                    Navigator.pop(context);
                    context.read<NavigationProvider>().navigateTo('/settings');
                  },
                ),
                _DrawerItem(
                  icon: LucideIcons.fileText,
                  label: 'Terms & Privacy',
                  onTap: () {
                    Navigator.pop(context);
                    context.read<NavigationProvider>().navigateTo('/terms');
                  },
                ),
                _DrawerItem(
                  icon: LucideIcons.helpCircle,
                  label: 'Help & Support',
                  onTap: () {
                    Navigator.pop(context);
                    context.read<NavigationProvider>().navigateTo('/support');
                  },
                ),
                const Divider(height: 24, thickness: 1),
                _DrawerItem(
                  icon: LucideIcons.logOut,
                  label: 'Log Out',
                  textColor: AppColors.error,
                  onTap: () {
                    _showLogoutDialog(context);
                  },
                ),
              ],
            ),
          ),

          // Version Footer
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              border: Border(
                top: BorderSide(
                  color: AppColors.gray200,
                  width: 1,
                ),
              ),
            ),
            child: Text(
              'SpeakX v2.4.0',
              style: TextStyle(
                fontSize: 12,
                color: AppColors.gray400,
              ),
              textAlign: TextAlign.center,
            ),
          ),
        ],
      ),
    );
  }

  void _showLogoutDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => Dialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(24),
        ),
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: AppColors.error.withOpacity(0.1),
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  LucideIcons.logOut,
                  color: AppColors.error,
                  size: 24,
                ),
              ),
              const SizedBox(height: 16),
              const Text(
                'Log Out?',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w900,
                  color: Color(0xFF111827),
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Are you sure you want to sign out?',
                style: TextStyle(
                  fontSize: 14,
                  color: AppColors.gray600,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 24),
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: () => Navigator.pop(context),
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 12),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        side: BorderSide(color: AppColors.gray300),
                      ),
                      child: Text(
                        'Cancel',
                        style: TextStyle(
                          fontWeight: FontWeight.w700,
                          color: AppColors.gray700,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () {
                        Navigator.pop(context);
                        Navigator.pop(context);
                        context.read<AuthProvider>().logout();
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.error,
                        padding: const EdgeInsets.symmetric(vertical: 12),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        elevation: 4,
                      ),
                      child: const Text(
                        'Yes, Logout',
                        style: TextStyle(
                          fontWeight: FontWeight.w700,
                          color: Colors.white,
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
    );
  }
}

class _StatChip extends StatelessWidget {
  final IconData icon;
  final String value;
  final Color color;

  const _StatChip({
    Key? key,
    required this.icon,
    required this.value,
    required this.color,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.2),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            icon,
            size: 14,
            color: color,
          ),
          const SizedBox(width: 6),
          Text(
            value,
            style: const TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w900,
              color: Colors.white,
            ),
          ),
        ],
      ),
    );
  }
}

class _DrawerItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback onTap;
  final Color? textColor;

  const _DrawerItem({
    Key? key,
    required this.icon,
    required this.label,
    required this.onTap,
    this.textColor,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final color = textColor ?? AppColors.gray700;
    
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 12),
          child: Row(
            children: [
              Icon(
                icon,
                size: 20,
                color: textColor ?? AppColors.gray500,
              ),
              const SizedBox(width: 12),
              Text(
                label,
                style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w600,
                  color: color,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
