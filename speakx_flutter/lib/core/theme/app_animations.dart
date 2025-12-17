import 'package:flutter/material.dart';

/// Animation constants matching the React design system exactly
class AppAnimations {
  AppAnimations._();

  // ===== DURATION =====
  static const Duration fast = Duration(milliseconds: 150);
  static const Duration normal = Duration(milliseconds: 300);
  static const Duration slow = Duration(milliseconds: 500);
  static const Duration confettiFall = Duration(milliseconds: 3000);
  static const Duration shimmer = Duration(milliseconds: 2000);
  static const Duration float = Duration(seconds: 20);
  static const Duration pulse = Duration(seconds: 2);
  static const Duration wiggle = Duration(milliseconds: 500);
  static const Duration sparkle = Duration(seconds: 1);
  static const Duration slideUp = Duration(milliseconds: 500);
  static const Duration glow = Duration(seconds: 2);
  static const Duration popIn = Duration(milliseconds: 500);
  static const Duration bounce = Duration(milliseconds: 600);

  // ===== CURVES (matching CSS cubic-bezier) =====
  static const Curve easeOut = Cubic(0.16, 1.0, 0.3, 1.0);
  static const Curve easeInOut = Cubic(0.65, 0.0, 0.35, 1.0);
  static const Curve bounce = Cubic(0.68, -0.55, 0.265, 1.55);
  static const Curve spring = Cubic(0.175, 0.885, 0.32, 1.275);

  // ===== COMMON TWEENS =====
  static Tween<double> scaleTween({double begin = 0.0, double end = 1.0}) {
    return Tween<double>(begin: begin, end: end);
  }

  static Tween<double> opacityTween({double begin = 0.0, double end = 1.0}) {
    return Tween<double>(begin: begin, end: end);
  }

  static Tween<Offset> slideTween({
    Offset begin = const Offset(0, 0.1),
    Offset end = Offset.zero,
  }) {
    return Tween<Offset>(begin: begin, end: end);
  }

  static Tween<double> rotationTween({double begin = 0.0, double end = 1.0}) {
    return Tween<double>(begin: begin, end: end);
  }
}

/// Border Radius constants matching the React design system
class AppBorderRadius {
  AppBorderRadius._();

  static const double small = 8.0;
  static const double medium = 12.0;
  static const double large = 16.0;
  static const double xlarge = 24.0;
  static const double xxlarge = 32.0;
  static const double full = 9999.0;

  static BorderRadius get smallRadius => BorderRadius.circular(small);
  static BorderRadius get mediumRadius => BorderRadius.circular(medium);
  static BorderRadius get largeRadius => BorderRadius.circular(large);
  static BorderRadius get xlargeRadius => BorderRadius.circular(xlarge);
  static BorderRadius get xxlargeRadius => BorderRadius.circular(xxlarge);
  static BorderRadius get fullRadius => BorderRadius.circular(full);
}

/// Shadow constants matching the React design system
class AppShadows {
  AppShadows._();

  static List<BoxShadow> soft = [
    BoxShadow(
      color: const Color(0xFF4F46E5).withOpacity(0.08),
      blurRadius: 8,
      offset: const Offset(0, 2),
    ),
  ];

  static List<BoxShadow> medium = [
    BoxShadow(
      color: const Color(0xFF4F46E5).withOpacity(0.12),
      blurRadius: 16,
      offset: const Offset(0, 4),
    ),
  ];

  static List<BoxShadow> large = [
    BoxShadow(
      color: const Color(0xFF4F46E5).withOpacity(0.16),
      blurRadius: 32,
      offset: const Offset(0, 8),
    ),
  ];

  static List<BoxShadow> glow = [
    BoxShadow(
      color: const Color(0xFF6366F1).withOpacity(0.3),
      blurRadius: 20,
      offset: Offset.zero,
    ),
  ];

  static List<BoxShadow> success = [
    BoxShadow(
      color: const Color(0xFF10B981).withOpacity(0.2),
      blurRadius: 16,
      offset: const Offset(0, 4),
    ),
  ];

  static List<BoxShadow> warning = [
    BoxShadow(
      color: const Color(0xFFF59E0B).withOpacity(0.2),
      blurRadius: 16,
      offset: const Offset(0, 4),
    ),
  ];

  static List<BoxShadow> energy = [
    BoxShadow(
      color: const Color(0xFF8B5CF6).withOpacity(0.2),
      blurRadius: 16,
      offset: const Offset(0, 4),
    ),
  ];
}

/// Spacing constants for consistent padding and margins
class AppSpacing {
  AppSpacing._();

  static const double xs = 4.0;
  static const double sm = 8.0;
  static const double md = 16.0;
  static const double lg = 24.0;
  static const double xl = 32.0;
  static const double xxl = 48.0;
  static const double xxxl = 64.0;
}
