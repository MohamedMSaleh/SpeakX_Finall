import 'package:flutter/material.dart';

/// Complete color palette matching the React design system exactly
class AppColors {
  // Private constructor to prevent instantiation
  AppColors._();

  // ===== PRIMARY BRAND COLORS =====
  static const Color primaryBlue = Color(0xFF4F46E5); // Indigo-600
  static const Color primaryBlueLight = Color(0xFF818CF8); // Indigo-400
  static const Color primaryBlueDark = Color(0xFF3730A3); // Indigo-800
  static const Color primaryWhite = Color(0xFFFFFFFF);
  static const Color primaryOffWhite = Color(0xFFF9FAFB);

  // ===== SECONDARY REWARD COLORS =====
  static const Color secondarySuccess = Color(0xFF10B981); // Emerald-500
  static const Color secondarySuccessLight = Color(0xFF6EE7B7); // Emerald-300
  static const Color secondaryWarning = Color(0xFFF59E0B); // Amber-500
  static const Color secondaryWarningLight = Color(0xFFFCD34D); // Amber-300
  static const Color secondaryEnergy = Color(0xFF8B5CF6); // Violet-500
  static const Color secondaryEnergyLight = Color(0xFFC4B5FD); // Violet-300
  static const Color secondaryPink = Color(0xFFEC4899); // Pink-500
  static const Color secondaryPinkLight = Color(0xFFF9A8D4); // Pink-300

  // ===== NEUTRAL COLORS =====
  static const Color neutralGray50 = Color(0xFFF9FAFB);
  static const Color neutralGray100 = Color(0xFFF3F4F6);
  static const Color neutralGray200 = Color(0xFFE5E7EB);
  static const Color neutralGray300 = Color(0xFFD1D5DB);
  static const Color neutralGray400 = Color(0xFF9CA3AF);
  static const Color neutralGray500 = Color(0xFF6B7280);
  static const Color neutralGray600 = Color(0xFF4B5563);
  static const Color neutralGray700 = Color(0xFF374151);
  static const Color neutralGray800 = Color(0xFF1F2937);
  static const Color neutralGray900 = Color(0xFF111827);

  // ===== GRADIENT COLORS (for gradient definitions) =====
  
  // Background Gradients
  static const List<Color> backgroundPrimaryGradient = [
    Color(0xFFEEF2FF), // Blue-50
    Color(0xFFE0E7FF), // Blue-100
    Color(0xFFDBEAFE), // Sky-100
  ];
  
  static const List<Color> backgroundSuccessGradient = [
    Color(0xFFD1FAE5), // Emerald-100
    Color(0xFFA7F3D0), // Emerald-200
  ];
  
  static const List<Color> backgroundWarningGradient = [
    Color(0xFFFEF3C7), // Amber-100
    Color(0xFFFDE68A), // Amber-200
  ];
  
  static const List<Color> backgroundEnergyGradient = [
    Color(0xFFEDE9FE), // Violet-100
    Color(0xFFDDD6FE), // Violet-200
  ];
  
  static const List<Color> backgroundPinkGradient = [
    Color(0xFFFCE7F3), // Pink-100
    Color(0xFFFBCFE8), // Pink-200
  ];

  // Card Gradients
  static const List<Color> cardBlueGradient = [
    Color(0xFF6366F1), // Indigo-500
    Color(0xFF4F46E5), // Indigo-600
  ];
  
  static const List<Color> cardGreenGradient = [
    Color(0xFF34D399), // Emerald-400
    Color(0xFF10B981), // Emerald-500
  ];
  
  static const List<Color> cardYellowGradient = [
    Color(0xFFFBBF24), // Amber-400
    Color(0xFFF59E0B), // Amber-500
  ];
  
  static const List<Color> cardPurpleGradient = [
    Color(0xFFA78BFA), // Violet-400
    Color(0xFF8B5CF6), // Violet-500
  ];
  
  static const List<Color> cardPinkGradient = [
    Color(0xFFF472B6), // Pink-400
    Color(0xFFEC4899), // Pink-500
  ];

  // Shimmer Gradient (for loading states)
  static const List<Color> shimmerGradient = [
    Color(0x00FFFFFF),
    Color(0xCCFFFFFF),
    Color(0x00FFFFFF),
  ];

  // Sky/Cyan Gradients (for specific cards)
  static const List<Color> skyGradient = [
    Color(0xFFE0F2FE), // Sky-100
    Color(0xFFBAE6FD), // Sky-200
  ];
  
  static const List<Color> cyanGradient = [
    Color(0xFFCFFAFE), // Cyan-100
    Color(0xFFA5F3FC), // Cyan-200
  ];

  static const List<Color> tealGradient = [
    Color(0xFFCCFBF1), // Teal-100
    Color(0xFF99F6E4), // Teal-200
  ];

  static const List<Color> emeraldGradient = [
    Color(0xFFD1FAE5), // Emerald-100
    Color(0xFFA7F3D0), // Emerald-200
  ];

  // Additional practice area gradients
  static const List<Color> roseGradient = [
    Color(0xFFFCE7F3), // Pink-100
    Color(0xFFFBCFE8), // Pink-200
  ];

  static const List<Color> orangeGradient = [
    Color(0xFFFFEDD5), // Orange-100
    Color(0xFFFED7AA), // Orange-200
  ];

  // ===== SHADOW COLORS =====
  static Color softShadow = primaryBlue.withOpacity(0.08);
  static Color mediumShadow = primaryBlue.withOpacity(0.12);
  static Color largeShadow = primaryBlue.withOpacity(0.16);
  static Color glowShadow = primaryBlueLight.withOpacity(0.3);
  static Color successShadow = secondarySuccess.withOpacity(0.2);
  static Color warningShadow = secondaryWarning.withOpacity(0.2);
  static Color energyShadow = secondaryEnergy.withOpacity(0.2);
}
