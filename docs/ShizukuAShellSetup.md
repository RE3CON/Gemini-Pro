# Shizuku & AShell Setup Guide

This guide covers how to set up Shizuku and AShell to run shell commands on your Android device without root access.

> [!WARNING]
> **Advanced Users Only.** This setup allows apps to execute system-level commands. Incorrect usage can lead to system instability or security vulnerabilities. Proceed at your own risk.

## 1. Prerequisites
- **Android Device:** Running Android 11 or higher is highly recommended.
- **Developer Options:** Enabled on your device.

## 2. Download Links
- **Shizuku:** [https://shizuku.rikka.app/](https://shizuku.rikka.app/)
- **AShell:** [https://github.com/zhanghai/AShell](https://github.com/zhanghai/AShell)

## 3. Setup Steps

### Step A: Install Apps
1. Download and install the latest **Shizuku** APK from the official website.
2. Download and install the latest **AShell** APK from the GitHub releases page.

### Step B: Start Shizuku (Recommended: Wireless Debugging)
For Android 11+, you can start Shizuku directly on your device without a computer.

1. Open **Settings** > **Developer Options** on your device.
2. Enable **Wireless Debugging**.
3. Open the **Shizuku** app.
4. In the "Start via Wireless Debugging" section, tap **Pairing**.
5. Follow the on-screen instructions to enter the pairing code provided by Shizuku into the "Pair device with pairing code" option in the Wireless Debugging menu.
6. Once paired, return to Shizuku and tap **Start**.

### Step C: Grant Permissions
1. Open the **AShell** app.
2. AShell will request Shizuku permission. Grant it.
3. You can now run shell commands directly in the AShell terminal.

## 4. Alternative: Start via ADB (Computer Required)
If you are on an older Android version or prefer the computer method:

1. Connect your device to your computer via USB.
2. Run the following command:
   ```bash
   adb shell sh /sdcard/Android/data/moe.shizuku.privileged.api/start.sh
   ```

## 5. Usage
Once set up, AShell acts as a terminal emulator that uses Shizuku's privileged API to execute commands. You can use standard Linux shell commands (e.g., `ls`, `cd`, `ps`, `pm`) without needing root access.

> [!NOTE]
> If you reboot your device, Shizuku will stop. You must repeat **Step B** (Wireless Debugging) or **Step 4** (ADB) to start it again.
