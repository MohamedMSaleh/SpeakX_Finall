import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';

import '../../../../core/theme/app_colors.dart';
import '../../../../core/providers/auth_provider.dart';
import '../../../../shared/widgets/decorative_elements.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/animated_components.dart';

/// Sign Up Page - Matches React SignUp.tsx
class SignUpPage extends StatefulWidget {
  const SignUpPage({super.key});

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  bool _showPassword = false;
  bool _showConfirmPassword = false;
  bool _isLoading = false;
  bool _agreedToTerms = false;

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  Future<void> _handleSignUp() async {
    if (!_formKey.currentState!.validate()) return;
    
    if (!_agreedToTerms) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Please agree to terms and conditions'),
          backgroundColor: Colors.red,
        ),
      );
      return;
    }

    setState(() => _isLoading = true);

    final authProvider = context.read<AuthProvider>();
    final success = await authProvider.signUp(
      _emailController.text,
      _passwordController.text,
      _nameController.text,
    );

    setState(() => _isLoading = false);

    if (success && mounted) {
      context.go('/dashboard');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GradientBackground(
        gradientColors: const [
          Color(0xFFEEF2FF),
          Color(0xFFEDE9FE),
          Color(0xFFFEF3C7),
        ],
        child: SafeArea(
          child: SingleChildScrollView(
            padding: EdgeInsets.symmetric(horizontal: 24.w, vertical: 32.h),
            child: ConstrainedBox(
              constraints: BoxConstraints(
                maxWidth: 480.w,
                minHeight: MediaQuery.of(context).size.height - 100.h,
              ),
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    // Header
                    SlideUp(
                      duration: const Duration(milliseconds: 600),
                      child: _buildHeader(),
                    ),
                    
                    SizedBox(height: 40.h),
                    
                    // Sign Up Form
                    SlideUp(
                      delay: const Duration(milliseconds: 200),
                      duration: const Duration(milliseconds: 600),
                      child: _buildSignUpForm(),
                    ),
                    
                    SizedBox(height: 24.h),
                    
                    // Footer
                    SlideUp(
                      delay: const Duration(milliseconds: 400),
                      child: _buildFooter(),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Speak',
              style: TextStyle(
                fontSize: 50.sp,
                fontWeight: FontWeight.w900,
                color: AppColors.neutralGray900,
                letterSpacing: -1,
              ),
            ),
            SizedBox(width: 8.w),
            Container(
              padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 8.h),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: AppColors.cardBlueGradient,
                ),
                borderRadius: BorderRadius.circular(16.r),
                boxShadow: [
                  BoxShadow(
                    color: AppColors.primaryBlue.withOpacity(0.3),
                    blurRadius: 12,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: Text(
                'X',
                style: TextStyle(
                  fontSize: 40.sp,
                  fontWeight: FontWeight.w900,
                  color: Colors.white,
                ),
              ),
            ),
          ],
        ),
        
        SizedBox(height: 24.h),
        
        Text(
          '🚀 Start Your Journey!',
          style: TextStyle(
            fontSize: 32.sp,
            fontWeight: FontWeight.w900,
            color: AppColors.neutralGray900,
          ),
          textAlign: TextAlign.center,
        ),
        
        SizedBox(height: 12.h),
        
        Text(
          'Create your account and begin learning',
          style: TextStyle(
            fontSize: 16.sp,
            fontWeight: FontWeight.w500,
            color: AppColors.neutralGray600,
          ),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _buildSignUpForm() {
    return AnimatedCard(
      padding: EdgeInsets.all(24.w),
      enableHover: false,
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Name Field
            _buildInputField(
              label: 'Full Name',
              icon: LucideIcons.user,
              controller: _nameController,
              hintText: 'John Doe',
              accentColor: AppColors.secondaryEnergy,
            ),
            
            SizedBox(height: 20.h),
            
            // Email Field
            _buildInputField(
              label: 'Email Address',
              icon: LucideIcons.mail,
              controller: _emailController,
              keyboardType: TextInputType.emailAddress,
              hintText: 'hello@example.com',
              accentColor: AppColors.primaryBlue,
            ),
            
            SizedBox(height: 20.h),
            
            // Password Field
            _buildInputField(
              label: 'Password',
              icon: LucideIcons.lock,
              controller: _passwordController,
              isPassword: true,
              showPassword: _showPassword,
              onTogglePassword: () => setState(() => _showPassword = !_showPassword),
              hintText: '••••••••',
              accentColor: AppColors.secondarySuccess,
            ),
            
            SizedBox(height: 20.h),
            
            // Confirm Password Field
            _buildInputField(
              label: 'Confirm Password',
              icon: LucideIcons.lockKeyhole,
              controller: _confirmPasswordController,
              isPassword: true,
              showPassword: _showConfirmPassword,
              onTogglePassword: () => setState(() => _showConfirmPassword = !_showConfirmPassword),
              hintText: '••••••••',
              accentColor: AppColors.secondaryPink,
              validator: (value) {
                if (value != _passwordController.text) {
                  return 'Passwords do not match';
                }
                return null;
              },
            ),
            
            SizedBox(height: 20.h),
            
            // Terms Checkbox
            Row(
              children: [
                SizedBox(
                  width: 24.w,
                  height: 24.w,
                  child: Checkbox(
                    value: _agreedToTerms,
                    onChanged: (value) => setState(() => _agreedToTerms = value ?? false),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(4.r),
                    ),
                  ),
                ),
                SizedBox(width: 12.w),
                Expanded(
                  child: Text.rich(
                    TextSpan(
                      text: 'I agree to the ',
                      style: TextStyle(
                        fontSize: 12.sp,
                        color: AppColors.neutralGray600,
                      ),
                      children: [
                        TextSpan(
                          text: 'Terms & Conditions',
                          style: TextStyle(
                            fontSize: 12.sp,
                            fontWeight: FontWeight.w700,
                            color: AppColors.primaryBlue,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
            
            SizedBox(height: 24.h),
            
            // Sign Up Button
            AnimatedButton(
              onPressed: _isLoading ? null : _handleSignUp,
              fullWidth: true,
              size: ButtonSize.large,
              variant: ButtonVariant.success,
              disabled: _isLoading,
              child: _isLoading
                  ? SizedBox(
                      width: 20.w,
                      height: 20.w,
                      child: const CircularProgressIndicator(
                        color: Colors.white,
                        strokeWidth: 2,
                      ),
                    )
                  : Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Text('Create Account'),
                        SizedBox(width: 8.w),
                        const Icon(LucideIcons.arrowRight, size: 20),
                      ],
                    ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildInputField({
    required String label,
    required IconData icon,
    required TextEditingController controller,
    TextInputType? keyboardType,
    String? hintText,
    bool isPassword = false,
    bool showPassword = false,
    VoidCallback? onTogglePassword,
    required Color accentColor,
    String? Function(String?)? validator,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Container(
              width: 8.w,
              height: 8.w,
              decoration: BoxDecoration(
                color: accentColor,
                shape: BoxShape.circle,
              ),
            ),
            SizedBox(width: 8.w),
            Text(
              label,
              style: TextStyle(
                fontSize: 14.sp,
                fontWeight: FontWeight.w700,
                color: AppColors.neutralGray700,
              ),
            ),
          ],
        ),
        
        SizedBox(height: 8.h),
        
        Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                AppColors.neutralGray50,
                accentColor.withOpacity(0.05),
              ],
            ),
            borderRadius: BorderRadius.circular(16.r),
            border: Border.all(
              color: AppColors.neutralGray200,
              width: 2,
            ),
          ),
          child: TextFormField(
            controller: controller,
            keyboardType: keyboardType,
            obscureText: isPassword && !showPassword,
            style: TextStyle(
              fontSize: 14.sp,
              fontWeight: FontWeight.w500,
            ),
            decoration: InputDecoration(
              hintText: hintText,
              hintStyle: TextStyle(
                color: AppColors.neutralGray400,
                fontSize: 14.sp,
              ),
              prefixIcon: Icon(icon, color: AppColors.neutralGray400),
              suffixIcon: isPassword
                  ? IconButton(
                      icon: Icon(
                        showPassword ? LucideIcons.eyeOff : LucideIcons.eye,
                        color: AppColors.neutralGray400,
                      ),
                      onPressed: onTogglePassword,
                    )
                  : null,
              border: InputBorder.none,
              contentPadding: EdgeInsets.symmetric(
                horizontal: 16.w,
                vertical: 14.h,
              ),
            ),
            validator: validator ?? (value) {
              if (value == null || value.isEmpty) {
                return 'This field is required';
              }
              return null;
            },
          ),
        ),
      ],
    );
  }

  Widget _buildFooter() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          'Already have an account?',
          style: TextStyle(
            fontSize: 14.sp,
            color: AppColors.neutralGray600,
          ),
        ),
        SizedBox(width: 8.w),
        TextButton(
          onPressed: () => context.go('/signin'),
          style: TextButton.styleFrom(
            padding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 4.h),
            tapTargetSize: MaterialTapTargetSize.shrinkWrap,
          ),
          child: Text(
            'Sign In',
            style: TextStyle(
              fontSize: 14.sp,
              fontWeight: FontWeight.w700,
              color: AppColors.primaryBlue,
            ),
          ),
        ),
      ],
    );
  }
}
