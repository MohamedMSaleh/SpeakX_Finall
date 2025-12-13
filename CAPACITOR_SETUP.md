# Capacitor Mobile Development Setup

## ✅ Installation Complete!

Your SpeakX React app is now configured for **Android** and **iOS** development using Capacitor.

## 📱 Mobile Projects Created

- **Android**: `/android` folder
- **iOS**: `/ios` folder
- **Config**: `capacitor.config.ts`

## 🚀 Quick Start Commands

### Build Your React App
```bash
npm run build
```

### Copy Web Assets to Mobile Platforms
```bash
npx cap copy
```
Or use the npm script:
```bash
npm run cap:copy
```

### Sync Everything (Copy + Update Plugins)
```bash
npx cap sync
```
Or:
```bash
npm run cap:sync
```

### Open in Android Studio
```bash
npx cap open android
```
Or:
```bash
npm run cap:android
```

### Open in Xcode (macOS only)
```bash
npx cap open ios
```
Or:
```bash
npm run cap:ios
```

## 🛠️ Development Workflow

### Standard Workflow
```bash
# 1. Make changes to your React app
# 2. Build the React app
npm run build

# 3. Copy to native platforms
npx cap copy

# 4. Open in IDE
npx cap open android  # or ios
```

### Quick Android Build
```bash
npm run build:android
```
This runs: build → copy → open Android Studio

### Quick iOS Build
```bash
npm run build:ios
```
This runs: build → copy → open Xcode

### Sync All Platforms
```bash
npm run build:mobile
```
This runs: build → sync both platforms

## 📝 Available NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build React app for production |
| `npm run cap:copy` | Copy web assets to mobile |
| `npm run cap:sync` | Sync plugins and assets |
| `npm run cap:android` | Open Android Studio |
| `npm run cap:ios` | Open Xcode |
| `npm run build:android` | Build + open Android |
| `npm run build:ios` | Build + open iOS |
| `npm run build:mobile` | Build + sync both |

## 🎯 Capacitor Configuration

**File**: `capacitor.config.ts`

```typescript
{
  appId: 'com.speakx.app',
  appName: 'SpeakX',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    iosScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#3B82F6',
      showSpinner: false
    }
  }
}
```

## 📦 Installed Packages

- `@capacitor/core` - Capacitor runtime
- `@capacitor/cli` - Capacitor CLI tools
- `@capacitor/android` - Android platform
- `@capacitor/ios` - iOS platform

## 🔧 Requirements

### For Android Development
- **Android Studio** (download from https://developer.android.com/studio)
- **Java Development Kit (JDK)** 17 or later
- **Android SDK** (installed via Android Studio)

### For iOS Development (macOS only)
- **Xcode** (download from Mac App Store)
- **CocoaPods** (install with: `sudo gem install cocoapods`)
- **Xcode Command Line Tools**

## 📱 Running on Devices/Emulators

### Android

1. **Build the app**:
   ```bash
   npm run build
   npx cap copy android
   ```

2. **Open Android Studio**:
   ```bash
   npx cap open android
   ```

3. **In Android Studio**:
   - Wait for Gradle sync to complete
   - Click the "Run" button (green play icon)
   - Select your device or emulator
   - App will install and launch

### iOS (macOS only)

1. **Build the app**:
   ```bash
   npm run build
   npx cap copy ios
   ```

2. **Open Xcode**:
   ```bash
   npx cap open ios
   ```

3. **In Xcode**:
   - Select your target device/simulator
   - Click the "Run" button (play icon)
   - App will build, install, and launch

## 🔄 Live Reload (Development)

For live reload during development:

1. **Start Vite dev server**:
   ```bash
   npm run dev
   ```
   (This runs on http://localhost:3000)

2. **Update capacitor.config.ts**:
   ```typescript
   server: {
     url: 'http://192.168.1.x:3000', // Your local IP
     cleartext: true
   }
   ```

3. **Run on device**:
   ```bash
   npx cap run android
   # or
   npx cap run ios
   ```

## 🔌 Adding Capacitor Plugins

Install official plugins:
```bash
# Camera
npm install @capacitor/camera
npx cap sync

# Geolocation
npm install @capacitor/geolocation
npx cap sync

# Storage
npm install @capacitor/preferences
npx cap sync
```

See all plugins: https://capacitorjs.com/docs/plugins

## 🎨 App Icons & Splash Screens

### Generate Icons
1. Create a 1024x1024px icon: `icon.png`
2. Install generator:
   ```bash
   npm install @capacitor/assets --save-dev
   ```
3. Run generator:
   ```bash
   npx capacitor-assets generate
   ```

### Custom Splash Screen
- Android: `android/app/src/main/res/drawable/splash.png`
- iOS: Use Xcode Asset Catalog

## 🚨 Common Issues & Solutions

### "Could not find dist directory"
```bash
npm run build  # Must build before cap copy
```

### Android Gradle sync failed
```bash
cd android
./gradlew clean
cd ..
npx cap sync android
```

### iOS pod install failed
```bash
cd ios/App
pod install
cd ../..
npx cap sync ios
```

### Can't open Android Studio
- Make sure Android Studio is installed
- Add to PATH or use full path:
  ```bash
  "C:\Program Files\Android\Android Studio\bin\studio64.exe" android
  ```

### Port 3000 already in use
Update vite.config.ts:
```typescript
server: {
  port: 3001  // Change port
}
```

## 📚 Folder Structure

```
SpeakX_Finall/
├── android/              # Native Android project
│   ├── app/
│   │   └── src/main/
│   │       └── assets/public/  # React build copied here
│   └── build.gradle
├── ios/                  # Native iOS project
│   └── App/
│       └── App/public/   # React build copied here
├── dist/                 # React build output
├── src/                  # React source code
├── capacitor.config.ts   # Capacitor configuration
└── package.json
```

## 🎯 Best Practices

1. **Always build before deploying**:
   ```bash
   npm run build
   npx cap copy
   ```

2. **Sync after installing plugins**:
   ```bash
   npm install @capacitor/some-plugin
   npx cap sync
   ```

3. **Test on real devices** - Emulators don't support all features

4. **Use HTTPS schemes** for production (already configured)

5. **Update native projects** when changing app config:
   ```bash
   npx cap sync
   ```

## 🔐 Publishing

### Android (Google Play)
1. Build signed APK/AAB in Android Studio
2. Go to: Build → Generate Signed Bundle/APK
3. Follow the signing wizard
4. Upload to Google Play Console

### iOS (App Store)
1. Archive in Xcode: Product → Archive
2. Distribute to App Store
3. Upload via Xcode or Transporter app

## 📖 Documentation

- Capacitor Docs: https://capacitorjs.com/docs
- Android Developer: https://developer.android.com
- iOS Developer: https://developer.apple.com

## ✅ Next Steps

1. **Test the setup**:
   ```bash
   npm run build:android
   ```

2. **Add native features** (camera, storage, etc.)

3. **Configure app icons and splash screens**

4. **Test on real devices**

5. **Prepare for app store submission**

---

**Your app is ready for mobile development! 🎉**
