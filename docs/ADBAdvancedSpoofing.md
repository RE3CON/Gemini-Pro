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
- **Chrome Channels:** The package name `com.android.chrome` is for the stable version. If you are using other channels, replace it accordingly:
  - **Beta:** `com.chrome.beta`
  - **Dev:** `com.chrome.dev`
  - **Canary:** `com.google.android.apps.chrome.canary`
- **Verification:** Once Chrome is running, navigate to `chrome://version` in the browser to verify that your command-line flags are active.
- **Clearing Flags:** To stop using the flags, you must completely close Chrome. The easiest way is to use the Android task switcher to swipe it away, or use `adb shell am force-stop com.android.chrome`.

## Recommended Chrome Flags

The app now supports a "Load Recommended Flags" feature that automatically configures the following command-line arguments for optimal stealth and performance:

- `--disable-gpu`: Reduces GPU fingerprinting.
- `--disable-web-rtc`: Prevents WebRTC leaks.
- `--disable-web-security`: Enables advanced proxying/spoofing.
- `--disable-notifications`: Enhances stealth.
- `--disable-background-networking`: Prevents background data leaks.
- `--disable-sync`: Disables Chrome sync.
- `--no-sandbox`: Required for some containerized environments.
- `--disable-infobars`: Provides a cleaner UI.
- `--user-agent="..."`: Forces a spoofed user agent.
- `--proxy-server="socks5://127.0.0.1:9050"`: Routes traffic through a local SOCKS5 proxy.
