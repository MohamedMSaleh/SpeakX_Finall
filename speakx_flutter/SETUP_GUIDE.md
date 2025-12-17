# Flutter Project Setup & Build Guide

## ✅ Prerequisites

1. **Flutter SDK** (3.0.0 or higher)
   - Download from: https://flutter.dev/docs/get-started/install
   - Verify: `flutter --version`

2. **IDE** (Choose one)
   - VS Code with Flutter extension
   - Android Studio with Flutter plugin

3. **Platform SDKs**
   - **Android**: Android Studio with SDK
   - **iOS**: Xcode (Mac only)
   - **Web**: Chrome browser

## 🚀 Getting Started

### 1. Open Project in VS Code/Android Studio

```bash
cd "c:\Users\Mohamed Saleh\Desktop\SpeakX\SpeakX_Finall\speakx_flutter"
```

### 2. Install Dependencies

```bash
flutter pub get
```

### 3. Verify Setup

```bash
flutter doctor
```

Fix any issues shown (Android licenses, iOS setup, etc.)

### 4. Run on Device/Emulator

**For Android:**
```bash
flutter run
```

**For iOS (Mac only):**
```bash
flutter run
```

**For Web:**
```bash
flutter run -d chrome
```

**For Windows Desktop:**
```bash
flutter run -d windows
```

## 📱 Platform-Specific Setup

### Android Setup

1. **Install Android Studio**
2. **Install Android SDK**
3. **Create emulator or connect device**
4. **Accept licenses:**
   ```bash
   flutter doctor --android-licenses
   ```

### iOS Setup (Mac only)

1. **Install Xcode** from Mac App Store
2. **Install CocoaPods:**
   ```bash
   sudo gem install cocoapods
   ```
3. **Open iOS Simulator:**
   ```bash
   open -a Simulator
   ```

### Web Setup

1. **Enable web support:**
   ```bash
   flutter config --enable-web
   ```
2. **Run in Chrome:**
   ```bash
   flutter run -d chrome
   ```

## 🏗️ Building for Production

### Android APK

```bash
flutter build apk --release
```

Output: `build/app/outputs/flutter-apk/app-release.apk`

### Android App Bundle (for Play Store)

```bash
flutter build appbundle --release
```

Output: `build/app/outputs/bundle/release/app-release.aab`

### iOS App (Mac only)

```bash
flutter build ios --release
```

Then open in Xcode and archive for App Store.

### Web

```bash
flutter build web --release
```

Output: `build/web/` (deploy this folder to any web server)

## 🔧 Common Issues & Solutions

### Issue: Gradle build fails
**Solution:**
```bash
cd android
./gradlew clean
cd ..
flutter clean
flutter pub get
```

### Issue: iOS build fails
**Solution:**
```bash
cd ios
pod install
cd ..
flutter clean
flutter pub get
```

### Issue: Web build errors
**Solution:**
```bash
flutter clean
flutter pub get
flutter pub upgrade
```

### Issue: "Waiting for another flutter command to release the startup lock"
**Solution:**
```bash
# Delete the lock file
rm ~/.flutter/bin/cache/lockfile
```

## 📝 Development Commands

### Hot Reload
Press `r` in terminal while app is running

### Hot Restart
Press `R` in terminal while app is running

### Format Code
```bash
dart format .
```

### Analyze Code
```bash
flutter analyze
```

### Run Tests
```bash
flutter test
```

## 🎨 VS Code Setup

### Recommended Extensions
1. Flutter
2. Dart
3. Awesome Flutter Snippets
4. Pubspec Assist
5. Flutter Widget Snippets

### Settings (`.vscode/settings.json`)
```json
{
  "dart.flutterSdkPath": ".flutter",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "[dart]": {
    "editor.rulers": [80],
    "editor.selectionHighlight": false,
    "editor.suggest.snippetsPreventQuickSuggestions": false,
    "editor.suggestSelection": "first",
    "editor.tabCompletion": "onlySnippets",
    "editor.wordBasedSuggestions": false
  }
}
```

## 📦 Adding New Packages

1. Add to `pubspec.yaml`:
```yaml
dependencies:
  package_name: ^version
```

2. Install:
```bash
flutter pub get
```

## 🔄 Updating Flutter

```bash
flutter upgrade
flutter doctor
```

## 🌐 Running on Real Devices

### Android
1. Enable USB Debugging on device
2. Connect via USB
3. Run `flutter devices`
4. Run `flutter run`

### iOS
1. Connect iPhone via USB
2. Trust computer on device
3. Open Xcode and add Apple ID
4. Run `flutter run`

## 🐛 Debugging

### View Logs
```bash
flutter logs
```

### Enable Performance Overlay
Add to `main.dart`:
```dart
MaterialApp(
  debugShowCheckedModeBanner: false,
  showPerformanceOverlay: true, // Add this
  ...
)
```

### Flutter DevTools
```bash
flutter pub global activate devtools
flutter pub global run devtools
```

## 📊 Performance Profiling

```bash
flutter run --profile
```

Then use DevTools to analyze performance.

## 🚢 Deployment Checklist

- [ ] Update version in `pubspec.yaml`
- [ ] Test on multiple devices/screen sizes
- [ ] Run `flutter analyze` (no errors)
- [ ] Run `flutter test` (all pass)
- [ ] Build release version
- [ ] Test release build
- [ ] Update app icons
- [ ] Update splash screen
- [ ] Review permissions (Android/iOS)
- [ ] Add release notes

## 📚 Resources

- [Flutter Documentation](https://flutter.dev/docs)
- [Dart Documentation](https://dart.dev/guides)
- [Flutter Cookbook](https://flutter.dev/docs/cookbook)
- [Pub.dev Packages](https://pub.dev)
- [Flutter Community](https://flutter.dev/community)

## 💡 Tips

1. **Use const constructors** for better performance
2. **Use `flutter clean`** if experiencing weird issues
3. **Check `flutter doctor`** regularly
4. **Use DevTools** for debugging and profiling
5. **Keep dependencies updated** (but test after updates)
6. **Use responsive units** (ScreenUtil) for all sizes
7. **Test on real devices** before production

---

**Need Help?** Check official Flutter docs or ask in Flutter community channels!
