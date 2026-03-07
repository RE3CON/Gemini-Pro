# Chrome Internal URLs & Debugging

These internal `chrome://` pages provide deep access to browser configuration, debugging tools, and experimental features. 

> **⚠️ WARNING: Advanced Users Only**
> These pages are intended for developers and debugging. Changing settings in `chrome://flags` or modifying `LocalState` can break browser functionality, compromise security, or cause instability. **Use with extreme caution.**

## Core Configuration & Info
*   **`chrome://chrome-urls`**: A list of all available internal pages.
*   **`chrome://version`**: Displays your current browser version, command-line arguments, and paths to profile/executable files.
*   **`chrome://flags`**: The central hub for experimental features. This is where you can enable/disable features not yet ready for the public.
*   **`chrome://policy`**: Shows all active policies applied to your browser (useful for checking if your browser is managed by an organization).
*   **`chrome://components`**: Lists browser components (like Widevine, updater, etc.) and allows you to check for updates for them.

## Privacy & Security
*   **`chrome://privacy-sandbox-internals`**: Details on Privacy Sandbox settings and topics.
*   **`chrome://safe-browsing`**: Debugging information for Google's Safe Browsing service.
*   **`chrome://sandbox`**: Displays the status of the browser's sandbox security.

## Internals & Debugging (The "Spoofing" Toolkit)
These pages are often used for inspecting or debugging browser behavior:
*   **`chrome://local-state`**: (Requires file access) Displays the JSON-based `LocalState` file, which contains critical browser-wide settings, preferences, and device identifiers. This is the "command center" for Chrome-based browsers.
*   **`chrome://gpu`**: Shows GPU acceleration status, driver information, and detected graphics hardware.
*   **`chrome://net-internals`**: A powerful tool for inspecting network requests, DNS cache, sockets, and proxy settings.
*   **`chrome://prefs-internals`**: Shows the current values of all browser preferences.
*   **`chrome://webrtc-internals`**: Real-time monitoring and debugging for WebRTC connections.
*   **`chrome://media-internals`**: Debugging information for media playback.
*   **`chrome://crashes`**: Lists recent browser crashes and allows you to upload crash reports.

## Command URLs for Debugging
These URLs are designed to trigger specific browser behaviors, often for testing stability. **Warning: These will crash or hang your browser.**

*   **`chrome://crash`**: Triggers a renderer crash.
*   **`chrome://hang`**: Causes the renderer to hang.
*   **`chrome://restart`**: Restarts the browser.
*   **`chrome://quit`**: Closes the browser.
*   **`chrome://gpucrash`**: Simulates a GPU process crash.

***

### How to use these for "Hardening"
A simple UserScript cannot modify these internal settings directly. To use these for browser hardening:
1.  **`chrome://flags`**: Manually toggle flags to disable telemetry, enable strict site isolation, or force specific GPU behaviors.
2.  **`LocalState`**: On rooted Android devices or desktop environments, you can manually edit the `LocalState` JSON file to change device IDs, disable specific features, or force regional settings that aren't exposed in the UI.
3.  **ADB Commands**: On Android, you use `adb shell` to modify these preferences directly in the browser's data directory, which is the only way to achieve "true" hardware spoofing.
