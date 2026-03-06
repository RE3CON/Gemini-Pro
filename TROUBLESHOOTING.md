# Troubleshooting Guide

Welcome to the Gemini Adaptive Suite troubleshooting guide. If you are experiencing issues with the UserScript or Android wrapper, please check the common solutions below.

## Common Issues

### 1. UserScript Not Loading
- **Symptom:** The script is installed but the UI doesn't change on Gemini or ChatGPT.
- **Solution:** 
  - Ensure you have a UserScript manager installed (e.g., Tampermonkey or Violentmonkey).
  - Check if the script is enabled in your manager's dashboard.
  - Refresh the page (Ctrl+R or F5).
  - Verify that the URL matches the `@match` rules in the script.

### 2. "Infinite" Dictation Stops Unexpectedly
- **Symptom:** Voice dictation cuts off after a few seconds.
- **Solution:** 
  - Check your browser's microphone permissions.
  - Ensure `enableContinuousVoice` is toggled **ON** in the configurator.
  - Some browsers (like Safari) have strict auto-pause rules for audio capture. Try using Chrome or Firefox.

### 3. Termux/Shell Intents Failing
- **Symptom:** Clicking a Termux intent link does nothing.
- **Solution:**
  - This feature requires the Android Termux app to be installed.
  - Ensure `enableTermuxBridge` is enabled.
  - You may need to grant Termux the `Draw over other apps` permission in Android settings.

### 4. Samsung DeX Layout Issues
- **Symptom:** The UI looks squished or misaligned when using Samsung DeX.
- **Solution:**
  - The suite is optimized for DeX, but window resizing can sometimes cause CSS glitches. Maximize the browser window and refresh the page.

### 5. Script Updates Not Applying
- **Symptom:** You downloaded a new version but the old features are still active.
- **Solution:**
  - Open your UserScript manager and manually delete the old version of the script before installing the new one.
  - Alternatively, click the "Check for updates" button in your UserScript manager.

## Still Need Help?

If your issue isn't listed here, please visit our [Discussions/Forum](https://github.com/RE3CON/Gemini-Pro/discussions) or open an [Issue](https://github.com/RE3CON/Gemini-Pro/issues) on GitHub.
