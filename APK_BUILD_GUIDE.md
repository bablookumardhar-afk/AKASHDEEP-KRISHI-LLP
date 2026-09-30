# AKASHDEEP KRISHI LLP — Mobile APK Build Guide

Your repository is now structured to build a native Android `.apk` using **five supported workflows** (including two **Zero-Install Cloud APK** methods that do not require installing Android Studio on your computer):

---

## Method A: 60-Second Cloud APK via PWABuilder (No Software Installation Needed)
1. Click **Publish** / **Share** in AI Studio and copy your live public App URL.
2. Go to **[https://www.pwabuilder.com](https://www.pwabuilder.com)** and paste your published App URL.
3. Click **Package for Stores** → select **Android** → click **Download Package**.
4. Extract the downloaded ZIP file — your installable **`AKASHDEEP KRISHI LLP.apk`** (and Google Play Store `.aab` bundle) is inside!

---

## Method B: Automated GitHub Cloud APK (`.github/workflows/build-apk.yml`)
We have included a GitHub Actions cloud builder at **`.github/workflows/build-apk.yml`**.
1. Push or upload this project folder to a **GitHub repository**.
2. Click the **Actions** tab in your GitHub repository → select **Build Android APK (AKASHDEEP KRISHI LLP)** → click **Run workflow**.
3. GitHub's cloud servers will automatically compile your Capacitor Android project and provide **`AKASHDEEP-KRISHI-LLP-apk.zip`** ready to download in ~3 minutes!

---

## Option 1: Direct Native Android APK via Capacitor (Recommended — 100% Exact UI & Zero Rewrite)

Because **AKASHDEEP KRISHI LLP** is already engineered for a mobile viewport with offline `localStorage` and Service Worker caching, **Ionic Capacitor** wraps your exact React + Tailwind build (`dist/`) into a native Android APK (`com.akashdeepkrishi.agriadvisor`) in under 2 minutes.

### Prerequisites
- Node.js 18+
- Android Studio (with Android SDK installed)

### Commands (Run in Project Root)
```bash
# 1. Install dependencies & build the production bundle
npm install
npm run build

# 2. Install Capacitor Android & generate the native android/ folder
npm run apk:cap:setup

# 3. Sync the compiled dist/ assets into the Android project
npm run apk:cap:sync

# 4. Build the installable APK via Gradle (or open in Android Studio)
cd android && ./gradlew assembleDebug
```
**Output APK Path:**
`android/app/build/outputs/apk/debug/app-debug.apk`

---

## Option 2: React Native (Expo SDK 52 + EAS Cloud/Local APK)

A standalone React Native project is pre-structured in the **`/mobile-react-native/`** directory with `app.json`, `eas.json` (configured with `"buildType": "apk"`), and native `App.tsx`.

### Commands
```bash
cd mobile-react-native

# 1. Install React Native / Expo dependencies
npm install

# 2. Build an installable Android APK in the cloud using EAS CLI
npx eas-cli login
npm run build:apk

# OR compile locally on your machine with Android SDK:
npx expo run:android --variant release
```

---

## Option 3: Flutter Native Android APK (`/mobile-flutter/`)

A standalone Flutter Material 3 project is pre-structured in the **`/mobile-flutter/`** directory (`pubspec.yaml` and `lib/main.dart`).

### Commands
```bash
cd mobile-flutter

# 1. Initialize Android platform files (if not already generated)
flutter create --org com.akashdeepkrishi --project-name akashdeep_krishi_llp .

# 2. Fetch packages & build release APK
flutter pub get
flutter build apk --release
```
**Output APK Path:**
`mobile-flutter/build/app/outputs/flutter-apk/app-release.apk`
