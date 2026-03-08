# Android Browser Debugging & Developer Tools

This guide covers how to access developer tools, including the console and network inspector, for Android-based browsers and custom Chromium builds.

## 1. Remote Debugging (Standard Method)

The standard way to debug any Chromium-based browser on Android is via remote debugging from a desktop machine.

### Prerequisites
- **ADB (Android Debug Bridge):** Installed on your desktop.
- **USB Debugging:** Enabled in the "Developer Options" on your Android device.
- **USB Cable:** Connected to your desktop.

### Steps
1. **Connect Device:** Plug your Android device into your desktop.
2. **Enable Debugging:** On your Android device, ensure "USB Debugging" is enabled in Developer Options.
3. **Start ADB:** Run `adb devices` on your desktop to ensure your device is listed.
4. **Open Desktop Chrome:** On your desktop, open `chrome://inspect/#devices`.
5. **Inspect:** You will see your device listed. Click "Inspect" next to the tab you want to debug. This will open a full desktop-class DevTools window for the Android browser tab.

## 2. How Kiwi Browser Implements DevTools

Kiwi Browser achieves its "Developer Tools" feature by patching the Chromium source code to load the DevTools frontend directly within the Android browser environment.

### The Architectural Approach
1. **Bundling the Frontend:** Chromium includes the DevTools frontend (a web application) in its source tree. Kiwi ensures this frontend is included in the Android APK build.
2. **Custom UI Hook:** Kiwi adds a menu item ("Developer Tools") to the Android browser's menu.
3. **Local Bridge:** When the menu item is clicked, Kiwi opens a new tab and loads the bundled DevTools frontend URL (e.g., `chrome://devtools/...`).
4. **Protocol Bridging:** The browser's internal logic is patched to allow this local DevTools frontend to connect to the browser's internal `devtools://` protocol handler, effectively bridging the local frontend to the local inspection backend.

### Implementing this in your Custom Build
To replicate this, you must:
- **Modify the Android UI:** Add the menu item in `chrome/android/java/src/org/chromium/chrome/browser/app/appmenu/AppMenuPropertiesDelegateImpl.java` (or similar).
- **Handle the Intent:** Create an intent handler that opens the DevTools URL in a new tab.
- **Patch the Protocol Handler:** Ensure the browser's security policy allows the local DevTools frontend to connect to the local inspection backend. This is the most complex part, as Chromium's security model is designed to prevent this for production builds.

> [!WARNING]
> Implementing this requires deep knowledge of the Chromium Android UI and security model. It is significantly more complex than using standard Remote Debugging.
