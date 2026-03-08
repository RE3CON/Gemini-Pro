# Advanced ADB Spoofing & Chrome Flag Injection

> [!WARNING]
> **Advanced Users Only.** This guide involves using ADB (Android Debug Bridge) to modify Chrome's startup behavior. Incorrect usage can lead to browser instability, data loss, or security vulnerabilities. Proceed at your own risk.

## Overview
While userscripts provide effective DOM-level hardening, deep browser fingerprinting protection often requires modifying Chrome's startup flags. This can be achieved on Android using ADB to pass command-line arguments to the Chrome process.

## Prerequisites
1. **Enable Developer Options & USB Debugging:** On your Android device, go to **Settings** > **About Phone** and tap **Build Number** 7 times. Then go to **Settings** > **System** > **Developer Options** and enable **USB Debugging**.
2. **Install ADB:** Ensure you have the Android Platform Tools installed on your computer.
3. **Connect Device:** Connect your Android device to your computer via USB and run `adb devices` to verify the connection.

## Starting Chrome with Custom Flags
To start Chrome with custom flags, you must first ensure Chrome is completely closed. Then, use the following command structure:

```bash
adb shell am start -n com.android.chrome/com.google.android.apps.chrome.Main \
  --es "com.google.android.apps.chrome.EXTRA_COMMAND_LINE_FLAGS" \
  "--enable-features=FeatureName1,FeatureName2 --disable-features=FeatureName3"
```

### Example: Enabling Experimental Features
To enable experimental web platform features and disable specific tracking features:

```bash
adb shell am start -n com.android.chrome/com.google.android.apps.chrome.Main \
  --es "com.google.android.apps.chrome.EXTRA_COMMAND_LINE_FLAGS" \
  "--enable-features=ExperimentalWebPlatformFeatures --disable-features=InterestCohort"
```

## Important Considerations
- **Persistence:** These flags are only applied for the session started by the ADB command. If you close Chrome normally and reopen it via the app icon, these flags will not be active.
- **Unsafe Commands:** Some flags (like `--no-sandbox` or `--disable-web-security`) significantly reduce browser security. **Never use these for daily browsing.** They are only intended for controlled testing environments.
- **Finding Flags:** You can find a list of available flags by visiting `chrome://flags` in your desktop browser or searching the Chromium source code.
