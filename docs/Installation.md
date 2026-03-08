# Installation Guide

Follow these steps to install and activate the AI Identity Hardener.

## Prerequisites
You need a userscript manager installed in your browser:
- [Tampermonkey](https://www.tampermonkey.net/) (Recommended)
- [Violentmonkey](https://violentmonkey.github.io/)
- [AdGuard for Android](https://adguard.com/adguard-android.html) (Includes a built-in UserScript manager)

### AdGuard for Android Setup
1. **Install AdGuard:** Download and install [AdGuard for Android](https://adguard.com/adguard-android.html).
2. **Enable Userscripts:**
   - Open the AdGuard app.
   - Navigate to **Settings** > **Extensions**.
   - Ensure the **Userscripts** toggle is switched to **ON**.
   - Tap on **Userscripts** to enter the management menu.
3. **Add the Script:**
   - Tap the **+** (Add) button.
   - Select **Add from URL**.
   - Paste the following URL: `https://raw.githubusercontent.com/RE3CON/Gemini-AI/main/google-ai-identity.user.js`
   - Tap **Add**.
4. **Permissions:** AdGuard may ask for permission to access your browser data or modify network traffic. Grant these permissions to ensure the script can successfully spoof your fingerprint and block tracking.
5. **Verification:** Open your browser (e.g., Kiwi or Yandex) and visit a Google AI site. The script should now be active.

## Installation Steps

### Method 1: Direct Install (Recommended)
1. Navigate to the [GitHub Repository](https://github.com/RE3CON/Gemini-AI).
2. Click the **Install UserScript** badge or open the `google-ai-identity.user.js` file.
3. Your userscript manager should automatically prompt you to install the script.

### Method 2: Manual Copy
1. Open the [Web App](https://re3con.github.io/Gemini-AI/).
2. Click the **Copy** button to copy the "Golden Master" script to your clipboard.
3. Open your userscript manager's dashboard.
4. Create a new script and paste the copied code.
5. Save the script.

## Verification
1. Open a Google AI page (e.g., [Gemini](https://gemini.google.com/)).
2. Open the browser console (F12).
3. You should see the message: `[Golden Master Sovereign] Identity Hardened & Stabilized`.
