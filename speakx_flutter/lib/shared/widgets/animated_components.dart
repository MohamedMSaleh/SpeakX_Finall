import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';
import '../../core/theme/app_animations.dart';

/// Animated Button matching React AnimatedButton component
class AnimatedButton extends StatefulWidget {
  final Widget child;
  final VoidCallback? onPressed;
  final ButtonVariant variant;
  final ButtonSize size;
  final Widget? icon;
  final bool fullWidth;
  final bool disabled;
  final Gradient? customGradient;

  const AnimatedButton({
    super.key,
    required this.child,
    this.onPressed,
    this.variant = ButtonVariant.primary,
    this.size = ButtonSize.medium,
    this.icon,
    this.fullWidth = false,
    this.disabled = false,
    this.customGradient,
  });

  @override
  State<AnimatedButton> createState() => _AnimatedButtonState();
}

class _AnimatedButtonState extends State<AnimatedButton>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  bool _isPressed = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: AppAnimations.fast,
    );

    _scaleAnimation = Tween<double>(begin: 1.0, end: 0.95).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  EdgeInsets get _padding {
    switch (widget.size) {
      case ButtonSize.small:
        return const EdgeInsets.symmetric(horizontal: 16, vertical: 8);
      case ButtonSize.medium:
        return const EdgeInsets.symmetric(horizontal: 24, vertical: 12);
      case ButtonSize.large:
        return const EdgeInsets.symmetric(horizontal: 32, vertical: 16);
    }
  }

  double get _fontSize {
    switch (widget.size) {
      case ButtonSize.small:
        return 14;
      case ButtonSize.medium:
        return 16;
      case ButtonSize.large:
        return 18;
    }
  }

  Gradient get _gradient {
    if (widget.customGradient != null) return widget.customGradient!;
    
    switch (widget.variant) {
      case ButtonVariant.primary:
        return const LinearGradient(
          colors: AppColors.cardBlueGradient,
        );
      case ButtonVariant.success:
        return const LinearGradient(
          colors: AppColors.cardGreenGradient,
        );
      case ButtonVariant.gold:
        return const LinearGradient(
          colors: AppColors.cardYellowGradient,
        );
      case ButtonVariant.purple:
        return const LinearGradient(
          colors: AppColors.cardPurpleGradient,
        );
      case ButtonVariant.pink:
        return const LinearGradient(
          colors: AppColors.cardPinkGradient,
        );
      case ButtonVariant.outline:
        return const LinearGradient(
          colors: [Colors.transparent, Colors.transparent],
        );
      case ButtonVariant.ghost:
        return const LinearGradient(
          colors: [Colors.transparent, Colors.transparent],
        );
    }
  }

  BoxBorder? get _border {
    if (widget.variant == ButtonVariant.outline) {
      return Border.all(color: AppColors.primaryBlue, width: 2);
    }
    return null;
  }

  Color get _textColor {
    if (widget.variant == ButtonVariant.outline || 
        widget.variant == ButtonVariant.ghost) {
      return AppColors.primaryBlue;
    }
    return Colors.white;
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _scaleAnimation,
      builder: (context, child) {
        return Transform.scale(
          scale: _scaleAnimation.value,
          child: GestureDetector(
            onTapDown: widget.disabled ? null : (_) {
              setState(() => _isPressed = true);
              _controller.forward();
            },
            onTapUp: widget.disabled ? null : (_) {
              setState(() => _isPressed = false);
              _controller.reverse();
              widget.onPressed?.call();
            },
            onTapCancel: () {
              setState(() => _isPressed = false);
              _controller.reverse();
            },
            child: Opacity(
              opacity: widget.disabled ? 0.5 : 1.0,
              child: Container(
                width: widget.fullWidth ? double.infinity : null,
                padding: _padding,
                decoration: BoxDecoration(
                  gradient: _gradient,
                  borderRadius: AppBorderRadius.largeRadius,
                  border: _border,
                  boxShadow: widget.variant != ButtonVariant.ghost && 
                             widget.variant != ButtonVariant.outline
                      ? AppShadows.medium
                      : null,
                ),
                child: Row(
                  mainAxisSize: widget.fullWidth ? MainAxisSize.max : MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    if (widget.icon != null) ...[
                      widget.icon!,
                      const SizedBox(width: 8),
                    ],
                    DefaultTextStyle(
                      style: TextStyle(
                        fontSize: _fontSize,
                        fontWeight: FontWeight.w700,
                        color: _textColor,
                      ),
                      child: widget.child,
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}

enum ButtonVariant {
  primary,
  success,
  gold,
  purple,
  pink,
  outline,
  ghost,
}

enum ButtonSize {
  small,
  medium,
  large,
}

/// Animated Card matching React AnimatedCard component
class AnimatedCard extends StatefulWidget {
  final Widget child;
  final CardVariant variant;
  final bool enableHover;
  final VoidCallback? onTap;
  final EdgeInsetsGeometry? padding;
  final Gradient? customGradient;

  const AnimatedCard({
    super.key,
    required this.child,
    this.variant = CardVariant.defaultStyle,
    this.enableHover = true,
    this.onTap,
    this.padding,
    this.customGradient,
  });

  @override
  State<AnimatedCard> createState() => _AnimatedCardState();
}

class _AnimatedCardState extends State<AnimatedCard>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  late Animation<double> _elevationAnimation;
  bool _isHovered = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: AppAnimations.normal,
    );

    _scaleAnimation = Tween<double>(begin: 1.0, end: 1.02).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOut),
    );

    _elevationAnimation = Tween<double>(begin: 4.0, end: 12.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOut),
    );
  }

  Decoration get _decoration {
    switch (widget.variant) {
      case CardVariant.defaultStyle:
        return BoxDecoration(
          color: Colors.white,
          borderRadius: AppBorderRadius.xxlargeRadius,
          border: Border.all(color: AppColors.neutralGray100, width: 1),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(_isHovered ? 0.15 : 0.08),
              blurRadius: _elevationAnimation.value,
              offset: const Offset(0, 4),
            ),
          ],
        );
      case CardVariant.gradient:
        return BoxDecoration(
          gradient: widget.customGradient ?? 
            const LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                Colors.white,
                Color(0xFFE0E7FF), // Blue-100
              ],
            ),
          borderRadius: AppBorderRadius.xxlargeRadius,
          border: Border.all(color: AppColors.primaryBlueLight.withOpacity(0.3), width: 1),
          boxShadow: [
            BoxShadow(
              color: AppColors.primaryBlue.withOpacity(_isHovered ? 0.2 : 0.1),
              blurRadius: _elevationAnimation.value,
              offset: const Offset(0, 4),
            ),
          ],
        );
      case CardVariant.glow:
        return BoxDecoration(
          color: Colors.white,
          borderRadius: AppBorderRadius.xxlargeRadius,
          border: Border.all(color: AppColors.primaryBlueLight.withOpacity(0.5), width: 2),
          boxShadow: [
            BoxShadow(
              color: AppColors.primaryBlueLight.withOpacity(_isHovered ? 0.4 : 0.25),
              blurRadius: _elevationAnimation.value * 2,
              offset: Offset.zero,
            ),
          ],
        );
    }
  }

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: widget.enableHover ? (_) {
        setState(() => _isHovered = true);
        _controller.forward();
      } : null,
      onExit: widget.enableHover ? (_) {
        setState(() => _isHovered = false);
        _controller.reverse();
      } : null,
      child: GestureDetector(
        onTap: widget.onTap,
        child: AnimatedBuilder(
          animation: _controller,
          builder: (context, child) {
            return Transform.scale(
              scale: widget.enableHover ? _scaleAnimation.value : 1.0,
              child: Container(
                padding: widget.padding ?? const EdgeInsets.all(24),
                decoration: _decoration,
                child: widget.child,
              ),
            );
          },
        ),
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}

enum CardVariant {
  defaultStyle,
  gradient,
  glow,
}
