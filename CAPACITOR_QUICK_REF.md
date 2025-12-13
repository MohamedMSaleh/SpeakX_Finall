# 🚀 Capacitor Quick Reference

## Essential Commands

```bash
# Build React app
npm run build

# Copy to mobile platforms
npx cap copy

# Sync everything (copy + plugins)
npx cap sync

# Open in Android Studio
npx cap open android

# Open in Xcode
npx cap open ios
```

## One-Command Workflows

```bash
# Android: Build → Copy → Open
npm run build:android

# iOS: Build → Copy → Open
npm run build:ios

# Both: Build → Sync
npm run build:mobile
```

## Typical Development Flow

```bash
1. npm run build              # Build React app
2. npx cap copy              # Copy to native
3. npx cap open android      # Open Android Studio
```

## After Installing Plugins

```bash
npm install @capacitor/camera
npx cap sync                 # Always sync after plugin install
```

## File Locations

- **Config**: `capacitor.config.ts`
- **Android**: `/android` folder
- **iOS**: `/ios` folder
- **Build Output**: `/dist` folder

## Requirements

**Android**: Android Studio + JDK 17+  
**iOS**: Xcode + CocoaPods (macOS only)

## Common Issues

**"Missing dist directory"** → Run `npm run build` first  
**Gradle sync failed** → Clean and rebuild in Android Studio  
**Pod install failed** → Run `cd ios/App && pod install`

---

**App ID**: `com.speakx.app`  
**App Name**: `SpeakX`  
**Web Dir**: `dist`
