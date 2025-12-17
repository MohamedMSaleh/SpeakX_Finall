import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';

import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_animations.dart';
import '../../../../core/providers/auth_provider.dart';
import '../../../../shared/widgets/decorative_elements.dart';
import '../../../../shared/widgets/animated_widgets.dart';
import '../../../../shared/widgets/animated_components.dart';

/// Sign In Page - Pixel-perfect recreation of React SignIn.tsx
class SignInPage extends StatefulWidget {
  const SignInPage({super.key});

  @override
  State<SignInPage> createState() => _SignInPageState();
}

class _SignInPageState extends State<SignInPage> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _showPassword = false;
  bool _isLoading = false;
  SignInMode _mode = SignInMode.signIn;
  bool _resetSent = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _handleSignIn() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    final authProvider = context.read<AuthProvider>();
    final success = await authProvider.signIn(
      _emailController.text,
      _passwordController.text,
    );

    setState(() => _isLoading = false);

    if (success && mounted) {
      context.go('/dashboard');
    }
  }

  Future<void> _handleGoogleSignIn() async {
    setState(() => _isLoading = true);

    final authProvider = context.read<AuthProvider>();
    final success = await authProvider.signInWithGoogle();

    setState(() => _isLoading = false);

    if (success && mounted) {
      context.go('/dashboard');
    }
  }

  Future<void> _handleResetPassword() async {
    if (_emailController.text.isEmpty) return;

    setState(() => _isLoading = true);

    final authProvider = context.read<AuthProvider>();
    final success = await authProvider.resetPassword(_emailController.text);

    setState(() {
      _isLoading = false;
      if (success) _resetSent = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GradientBackground(
        gradientColors: const [
          Color(0xFFEEF2FF), // Blue-50
          Color(0xFFEDE9FE), // Purple-50
          Color(0xFFFEF3C7), // Amber-50
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
                    // Logo & Header
                    SlideUp(
                      duration: const Duration(milliseconds: 600),
                      child: _buildHeader(),
                    ),
                    
                    SizedBox(height: 40.h),
                    
                    // Main Content Card
                    SlideUp(
                      delay: const Duration(milliseconds: 200),
                      duration: const Duration(milliseconds: 600),
                      child: _mode == SignInMode.signIn
                          ? _buildSignInForm()
                          : _buildForgotPasswordForm(),
                    ),
                    
                    SizedBox(height: 24.h),
                    
                    // Footer
                    if (_mode == SignInMode.signIn)
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
        // Logo
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
        
        // Title & Subtitle
        Text(
          _mode == SignInMode.signIn ? '✨ Welcome Back!' : '🔐 Reset Password',
          style: TextStyle(
            fontSize: 32.sp,
            fontWeight: FontWeight.w900,
            color: AppColors.neutralGray900,
          ),
          textAlign: TextAlign.center,
        ),
        
        SizedBox(height: 12.h),
        
        Text(
          _mode == SignInMode.signIn
              ? 'Continue your amazing journey'
              : 'We\'ll help you get back in',
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

  Widget _buildSignInForm() {
    return AnimatedCard(
      padding: EdgeInsets.all(24.w),
      enableHover: false,
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
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
              accentColor: AppColors.secondaryEnergy,
            ),
            
            SizedBox(height: 8.h),
            
            // Forgot Password
            Align(
              alignment: Alignment.centerRight,
              child: TextButton(
                onPressed: () => setState(() => _mode = SignInMode.forgot),
                style: TextButton.styleFrom(
                  padding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 4.h),
                  tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                ),
                child: Text(
                  'Forgot Password?',
                  style: TextStyle(
                    fontSize: 12.sp,
                    fontWeight: FontWeight.w700,
                    color: AppColors.primaryBlue,
                  ),
                ),
              ),
            ),
            
            SizedBox(height: 24.h),
            
            // Sign In Button
            AnimatedButton(
              onPressed: _isLoading ? null : _handleSignIn,
              fullWidth: true,
              size: ButtonSize.large,
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
                        const Text('Sign In'),
                        SizedBox(width: 8.w),
                        const Icon(LucideIcons.arrowRight, size: 20),
                      ],
                    ),
            ),
            
            SizedBox(height: 24.h),
            
            // Divider
            Row(
              children: [
                Expanded(
                  child: Container(
                    height: 1,
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: [
                          Colors.transparent,
                          AppColors.neutralGray200,
                          Colors.transparent,
                        ],
                      ),
                    ),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 16.w),
                  child: Text(
                    'OR CONTINUE WITH',
                    style: TextStyle(
                      fontSize: 10.sp,
                      fontWeight: FontWeight.w700,
                      color: AppColors.neutralGray400,
                      letterSpacing: 1,
                    ),
                  ),
                ),
                Expanded(
                  child: Container(
                    height: 1,
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: [
                          Colors.transparent,
                          AppColors.neutralGray200,
                          Colors.transparent,
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
            
            SizedBox(height: 24.h),
            
            // Google Sign In
            _buildGoogleButton(),
          ],
        ),
      ),
    );
  }

  Widget _buildForgotPasswordForm() {
    return AnimatedCard(
      padding: EdgeInsets.all(24.w),
      enableHover: false,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          if (_resetSent) ...[
            Container(
              padding: EdgeInsets.all(16.w),
              decoration: BoxDecoration(
                color: AppColors.secondarySuccessLight.withOpacity(0.2),
                borderRadius: BorderRadius.circular(12.r),
                border: Border.all(
                  color: AppColors.secondarySuccess,
                  width: 1,
                ),
              ),
              child: Row(
                children: [
                  Icon(
                    LucideIcons.checkCircle,
                    color: AppColors.secondarySuccess,
                    size: 20.sp,
                  ),
                  SizedBox(width: 12.w),
                  Expanded(
                    child: Text(
                      'Reset link sent! Check your email.',
                      style: TextStyle(
                        fontSize: 14.sp,
                        fontWeight: FontWeight.w600,
                        color: AppColors.secondarySuccess,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: 20.h),
          ],
          
          _buildInputField(
            label: 'Email Address',
            icon: LucideIcons.mail,
            controller: _emailController,
            keyboardType: TextInputType.emailAddress,
            hintText: 'hello@example.com',
            accentColor: AppColors.primaryBlue,
          ),
          
          SizedBox(height: 24.h),
          
          AnimatedButton(
            onPressed: _isLoading ? null : _handleResetPassword,
            fullWidth: true,
            size: ButtonSize.large,
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
                : const Text('Send Reset Link'),
          ),
          
          SizedBox(height: 16.h),
          
          TextButton(
            onPressed: () => setState(() {
              _mode = SignInMode.signIn;
              _resetSent = false;
            }),
            child: Text(
              'Back to Sign In',
              style: TextStyle(
                fontSize: 14.sp,
                fontWeight: FontWeight.w700,
                color: AppColors.primaryBlue,
              ),
            ),
          ),
        ],
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
            validator: (value) {
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

  Widget _buildGoogleButton() {
    return InkWell(
      onTap: _isLoading ? null : _handleGoogleSignIn,
      borderRadius: BorderRadius.circular(16.r),
      child: Container(
        padding: EdgeInsets.symmetric(vertical: 14.h),
        decoration: BoxDecoration(
          color: Colors.white,
          border: Border.all(color: AppColors.neutralGray200, width: 2),
          borderRadius: BorderRadius.circular(16.r),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Google Icon (simplified)
            Container(
              width: 24.w,
              height: 24.w,
              decoration: const BoxDecoration(
                color: Colors.white,
                shape: BoxShape.circle,
              ),
              child: const Icon(
                LucideIcons.globe,
                size: 20,
                color: AppColors.primaryBlue,
              ),
            ),
            SizedBox(width: 12.w),
            Text(
              'Continue with Google',
              style: TextStyle(
                fontSize: 16.sp,
                fontWeight: FontWeight.w700,
                color: AppColors.neutralGray700,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFooter() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          'Don\'t have an account?',
          style: TextStyle(
            fontSize: 14.sp,
            color: AppColors.neutralGray600,
          ),
        ),
        SizedBox(width: 8.w),
        TextButton(
          onPressed: () => context.go('/signup'),
          style: TextButton.styleFrom(
            padding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 4.h),
            tapTargetSize: MaterialTapTargetSize.shrinkWrap,
          ),
          child: Text(
            'Sign Up',
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

enum SignInMode { signIn, forgot }
