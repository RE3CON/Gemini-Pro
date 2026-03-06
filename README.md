# Gemini Adaptive Suite: Sovereign Productivity Bridge

<div align="center">
  <h3>🌐 <a href="https://re3con.github.io/Gemini-Pro/">Official Website & Community Forum</a> 🌐</h3>
  <br/>
  <a href="https://github.com/RE3CON/Gemini-Pro/raw/main/dist/gemini-adaptive.user.js">
    <img src="https://img.shields.io/badge/Install-UserScript-success?style=for-the-badge&logo=tampermonkey" alt="Install UserScript" />
  </a>
  <a href="https://github.com/RE3CON/Gemini-Pro/releases/latest">
    <img src="https://img.shields.io/github/v/release/RE3CON/Gemini-Pro?style=for-the-badge" alt="Latest Release" />
  </a>
  <br/>
  <a href="https://github.com/RE3CON/Gemini-Pro/issues">
    <img src="https://img.shields.io/github/issues/RE3CON/Gemini-Pro?style=for-the-badge" alt="Issues" />
  </a>
  <a href="https://github.com/RE3CON/Gemini-Pro/discussions">
    <img src="https://img.shields.io/badge/💬_Forum-Discussions-purple?style=for-the-badge" alt="Discussions" />
  </a>
</div>
<br/>

![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)
![Android Build](https://img.shields.io/badge/platform-Android-green.svg)
![UserScript](https://img.shields.io/badge/type-UserScript-orange.svg)

**Gemini Adaptive Suite** is a high-performance, sovereign productivity bridge designed to augment the Google Gemini web experience with native-level capabilities, ludicrous speed optimizations, and deep ecosystem integrations.

This project provides a web-based configuration suite that generates a custom **UserScript** (.user.js) and a **Native Android Project** wrapper.

---

## ⚠️ About This Project & Technical Reality

**This project is currently a coding test and showcase built with the absolutely genius Gemini Coding Assistant!**

While the UI presents many advanced features (like device spoofing and deep system integrations), these are currently placebos in the UserScript context. 

**The Technical Reality:** To achieve *real* UA spoofing and complete control over Chrome-based browsers on Android, you must use **ADB commands** (which mostly make temporary changes in RAM). Most importantly, on Android without root, the `Local State` file is the real control center for Chrome-based browsers (especially since Developer Tools are not available in the mobile browser). You must modify this file alongside utilizing internal `chrome://` URLs, flags, and debug menus. A simple UserScript cannot bypass these Android-level security restrictions.

**Future Plans:** I recently acquired Gemini Pro on Google Workspace Business Turkey, and this repository will soon pivot to something completely different and highly useful—focusing on real AI tips, related tech, and special offers. Stay tuned!

---

## 🚀 Key Features

### ⚡ Hyper-Performance & Velocity
- **Ludicrous Speed**: Injects secret keys to bypass standard throttling and achieve maximum throughput.
- **Hyper Velocity**: Disables heavy UI animations and transitions for an instantaneous feel.
- **Main Thread Liberation**: Aggressively schedules AI tasks to prevent UI jank.

### 📱 Ecosystem Bridges
- **Samsung Nexus**: Deep integration with Samsung Notes, Gallery, Pass, and DeX mode.
- **Google Workspace**: Enhanced bridges for Drive, Keep, Tasks, and Colab.
- **Communication Hub**: Native-like handoffs for WhatsApp, Signal, Telegram, and Teams.

### 🧠 Advanced AI Models
- **Gemini 3.0 Preview**: Early access hooks for 2026-class models (Flash & Pro).
- **DeepThink v3**: Advanced reasoning engine integration.
- **16M Token Budget**: Overrides standard quotas for extreme long-context tasks.

### 🛡️ Stealth & Security
- **Anti-Fingerprinting**: Injects noise into Canvas and Audio APIs to prevent tracking.
- **Telemetry Firewall**: Blocks outgoing analytics and usage tracking.
- **Sovereign State**: Forces regional locks and spoofs high-end hardware (Pixel 11 Pro XL).
- **Hardware Spoofing:** Simulates an RTX 3080 / 16-Core / 8GB environment.
- **Network Stealth:** Spoofs 4G connections, enforces Global Privacy Control (GPC), and locks WebRTC to prevent IP leaks.
- **Masking Engine:** Protects spoofed functions from `.toString()` detection.
- **Jitter Logic:** Injects noise into timing APIs (`performance.now`) and `requestAnimationFrame`.
- **GNOME Simulation:** Provides realistic screen geometry for Linux desktop environments.

### 🌐 App Experience
- **PWA Support:** Install the application directly to your device.
- **Dark/Light Mode:** Automatically syncs with your system preferences.
- **AI Logo Generation:** Generate unique, transparent, and colorful security-focused logos using the Gemini API.
- **Auto-Updates:** The script includes `@updateURL` and `@downloadURL` pointing to this repository, ensuring you always have the latest version.

---

## 🛠️ Configuration Functions (Deep Dive)

| Category | Function | Description |
| :--- | :--- | :--- |
| **Performance** | `enableLudicrousSpeed` | Bypasses standard API rate limits using internal priority headers. |
| | `enableHyperVelocity` | Removes DOM bloat and CSS transitions for raw speed. |
| **Identity** | `spoofPixel11ProXL` | Spoofs the device as a Pixel 11 Pro XL (Android 17) to unlock exclusive features. |
| | `enableOmniMaximus` | Injects "God Mode" headers for unrestricted model access. |
| **Input** | `enableContinuousVoice` | Overrides WebSpeech API timeouts for infinite dictation. |
| | `enableTermuxBridge` | Creates a bridge to execute local shell commands via Termux. |
| **Commerce** | `enableKleinanzeigen` | Native intent hooks for the German Kleinanzeigen marketplace. |
| | `enableIdealo` | Real-time price comparison bridge for EU markets. |
| **Danger** | `enableExtremeThinking` | Unlocks 16M token context window (User assumes quota risk). |
| | `enableBillingBypass` | Spoofs premium billing status for feature access. |

---

## 📦 Installation & Usage

### 1. Web Suite (This Repository)
The web suite allows you to toggle over 200+ flags to customize your experience.
1. Open the [Preview Site](https://RE3CON.github.io/Gemini-Pro/).
2. Configure your desired features.
3. Click **Download UserScript** to get your `.user.js` file.

### 2. UserScript (Browser)
1. Install a UserScript manager like **Tampermonkey** or **Violentmonkey**.
2. Drag and drop the downloaded `gemini-adaptive.user.js` into your browser.
3. Navigate to [gemini.google.com](https://gemini.google.com/).

### 3. Android Native App
1. Click **Download Project ZIP** in the web suite.
2. Extract the ZIP on your device.
3. Open **Apktool M** or **Android Studio**.
4. Build and install the APK to have a standalone Gemini app with all features injected.

---

## 🤖 GitHub Integration (CI/CD)

This project is fully integrated with GitHub Actions:
- **Android CI**: Automatically builds your APK whenever you push changes to the source code.
- **Web Deploy**: (Optional) Deploy this configuration suite to GitHub Pages for easy access.

---

## 🛠️ Compilers, Ports & Prototyping

This project is built using modern web technologies (React, Vite, TypeScript) and compiled via **GitHub Actions**. 

To compile the web app and extract the UserScript locally:
1. Clone the repository: `git clone https://github.com/RE3CON/Gemini-Pro.git`
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Extract the UserScript: The script is embedded in `src/App.tsx`. You can write a quick Node script to extract it or use the automated GitHub Action workflow provided in `.github/workflows/`.

**Porting & Enhancements:**
The core logic inside `gemini-adaptive.user.js` is highly modular. You can easily port this to a native Chrome/Firefox Extension by wrapping the core IIFE inside a `content_script.js` and adding a `manifest.json`. We encourage the community to prototype new stealth modules (e.g., Canvas/WebGL poisoning) and submit them!

---

## 🧪 Testing & Verification

To ensure that your spoofing, anti-fingerprinting, and identity masking features are working correctly, we recommend testing your browser environment using the following tools. The UserScript is configured to run on these domains automatically:

- **[BrowserLeaks](https://browserleaks.com/)**: Comprehensive suite of tools to test WebRTC leaks, Canvas/WebGL fingerprinting, Font detection, and IP address exposure.
- **[AmIUnique](https://www.amiunique.org/)**: Analyzes your browser fingerprint and compares it against a global database to see how identifiable your current configuration is.
- **[Fingerprint.com](https://fingerprint.com/)**: Tests advanced device identification techniques, including audio context and hardware concurrency spoofing.
- **[Pixelscan](https://pixelscan.net/)**: Checks for bot-like behavior, proxy/VPN usage, and verifies if your User-Agent and hardware headers match a legitimate device profile.

---

## 📚 Documentation & Wiki

Detailed documentation, guides, and advanced configurations are available in our [Project Wiki](https://github.com/RE3CON/Gemini-AI/wiki). 

*Note: The Wiki, Discussions, and Community Forums are hosted on the main [Gemini-AI](https://github.com/RE3CON/Gemini-AI) repository to centralize community efforts.*

---

## 🐛 Bug Tracker & Forum

We utilize the full suite of GitHub features to manage this project:
- **[Bug Tracker (Issues)](https://github.com/RE3CON/Gemini-Pro/issues):** Found a fingerprint leak? Does the script break a specific Google AI feature? Open an issue using our provided bug report templates.
- **[Community Forum (Discussions)](https://github.com/RE3CON/Gemini-Pro/discussions):** Have an idea for a new spoofing technique? Want to discuss the future of AI privacy? Join the GitHub Discussions tab!

---

## 📦 Releases & Packages

We use **GitHub Releases** and **GitHub Packages** to distribute stable versions of the UserScript and the compiled Web App. 
- Check the [Releases](https://github.com/RE3CON/Gemini-Pro/releases) page for versioned downloads, changelogs, and source code archives.
- The CI/CD pipeline automatically builds and attaches artifacts (the raw `.user.js` and the compiled `dist/` folder) to every successful run on the `main` branch.

---

## 🤝 Community & Contributing

We invite the community to join and help improve this project! Whether you're finding bugs, suggesting new features, or submitting pull requests for better fingerprint hardening techniques, your contributions are highly valued. 

- **Fork the repository** to experiment with your own ideas.
- **Open an issue** to discuss potential changes or report bugs.
- **Submit a Pull Request!** Let's build the ultimate privacy shield together.

---

## 📜 License
MIT License - See [LICENSE](LICENSE) for details.

## ⚠️ Disclaimer
This tool is for educational and productivity enhancement purposes. Users are responsible for adhering to the Terms of Service of the platforms they interact with.
