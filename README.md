<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# SpeakX - AI Language Learning Platform

An interactive AI-powered language learning platform with mobile app support for Android and iOS.

View your app in AI Studio: https://ai.studio/apps/drive/1xLRHcz0jbat_yx3ZfAPBl0UqdSTyyMeg

## 🚀 Quick Start

### Web Development

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key

3. Run the app:
   ```bash
   npm run dev
   ```

### 📱 Mobile Development

**Build for Android/iOS:**

```bash
# Build the React app
npm run build

# Copy to mobile platforms
npx cap copy

# Open in Android Studio
npx cap open android

# Open in Xcode (macOS)
npx cap open ios
```

**Quick build commands:**
```bash
npm run build:android  # Build + open Android Studio
npm run build:ios      # Build + open Xcode
```

See [CAPACITOR_SETUP.md](CAPACITOR_SETUP.md) for complete mobile development guide.

## 📚 Documentation

- **[CAPACITOR_SETUP.md](CAPACITOR_SETUP.md)** - Complete Capacitor mobile setup guide
- **[CAPACITOR_QUICK_REF.md](CAPACITOR_QUICK_REF.md)** - Quick command reference
- **[RESPONSIVE_GUIDE.md](RESPONSIVE_GUIDE.md)** - Responsive design system
- **[DESIGN_GUIDE.md](DESIGN_GUIDE.md)** - Visual design system
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Component usage guide

## 🏗️ Project Structure

```
SpeakX_Finall/
├── android/              # Native Android project (Capacitor)
├── ios/                  # Native iOS project (Capacitor)
├── dist/                 # Production build output
├── src/
│   ├── components/       # Reusable UI components
│   ├── views/            # App screens/pages
│   ├── services/         # API services
│   ├── styles/           # Design system & global styles
│   └── utils/            # Helper utilities
├── capacitor.config.ts   # Capacitor configuration
└── package.json
```

## 🎯 Features

- ✅ AI-powered language tutoring with Gemini
- ✅ Mobile-first responsive design
- ✅ Native Android & iOS apps via Capacitor
- ✅ Interactive practice sessions
- ✅ Gamification with streaks, badges, and rewards
- ✅ Real-time voice practice
- ✅ Progress tracking and analytics

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Custom Design System
- **Mobile**: Capacitor (Android & iOS)
- **AI**: Google Gemini API
- **Icons**: Lucide React
- **Charts**: Recharts

## 📱 Mobile Requirements

### Android Development
- Android Studio
- JDK 17 or later
- Android SDK

### iOS Development (macOS only)
- Xcode
- CocoaPods
- Xcode Command Line Tools
