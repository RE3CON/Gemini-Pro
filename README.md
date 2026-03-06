<div align="center">
  <a href="https://re3con.github.io/Gemini-AI/">
    <img src="https://img.shields.io/badge/🌐_Open_Web_App-Click_Here-blue?style=for-the-badge" alt="Open Web App" />
  </a>
  <a href="https://raw.githubusercontent.com/RE3CON/Gemini-AI/main/google-ai-identity.user.js">
    <img src="https://img.shields.io/badge/📦_Install_UserScript-Click_Here-success?style=for-the-badge" alt="Install UserScript" />
  </a>
  <br>
  <a href="https://github.com/RE3CON/Gemini-AI/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/RE3CON/Gemini-AI/build-and-release.yml?style=for-the-badge" alt="Build Status" />
  </a>
  <a href="https://github.com/RE3CON/Gemini-AI/issues">
    <img src="https://img.shields.io/github/issues/RE3CON/Gemini-AI?style=for-the-badge" alt="Issues" />
  </a>
  <a href="https://github.com/RE3CON/Gemini-AI/discussions">
    <img src="https://img.shields.io/badge/💬_Forum-Discussions-purple?style=for-the-badge" alt="Discussions" />
  </a>
</div>

<br />

# AI Identity Hardener

Sovereign fingerprint protection for Google AI & LLM environments. Merged Golden Master architecture with zero-blindspot hardening.

## Overview

This project provides an advanced Tampermonkey/Violentmonkey script designed to harden your browser fingerprint against tracking and behavioral analysis, specifically tailored for Google's AI environments (Gemini, AI Studio, NotebookLM, etc.). 

It includes active modules for:
- **Hardware Spoofing:** Simulates an RTX 3080 / 16-Core / 8GB environment.
- **Network Stealth:** Spoofs 4G connections, enforces Global Privacy Control (GPC), and locks WebRTC to prevent IP leaks.
- **Masking Engine:** Protects spoofed functions from `.toString()` detection.
- **Jitter Logic:** Injects noise into timing APIs (`performance.now`) and `requestAnimationFrame`.
- **GNOME Simulation:** Provides realistic screen geometry for Linux desktop environments.

## How to Use

1. **Install an Extension:** Install a userscript manager like [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/) in your browser.
2. **Get the Script:** 
   - Click the **Install UserScript** badge at the top of this page to install directly from GitHub.
   - Alternatively, copy the script from the [Web App](https://re3con.github.io/Gemini-AI/).
3. **Activate:** Save the script and refresh any Google AI pages (e.g., `gemini.google.com`, `aistudio.google.com`). The script will run automatically at `document-start`.

## Browser Test Pages

The script is configured to run on several popular browser fingerprinting test pages so you can verify its effectiveness. Visit any of the following to see the spoofing in action:

```javascript
// @match        https://bot.sannysoft.com/*
// @match        https://pixelscan.net/*
// @match        https://amiunique.org/*
// @match        https://browserleaks.com/*
// @match        https://coveryourtracks.eff.org/*
// @match        https://abrahamjuliot.github.io/creepjs/*
```

## Features
- **PWA Support:** Install the application directly to your device.
- **Dark/Light Mode:** Automatically syncs with your system preferences.
- **AI Logo Generation:** Generate unique, transparent, and colorful security-focused logos using the Gemini API.
- **Auto-Updates:** The script includes `@updateURL` and `@downloadURL` pointing to this repository, ensuring you always have the latest version.

## Compilers, Ports & Prototyping

This project is built using modern web technologies (React, Vite, TypeScript) and compiled via **GitHub Actions**. 

To compile the web app and extract the UserScript locally:
1. Clone the repository: `git clone https://github.com/RE3CON/Gemini-AI.git`
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Extract the UserScript: The script is embedded in `src/App.tsx`. You can write a quick Node script to extract it or use the automated GitHub Action workflow provided in `.github/workflows/`.

**Porting & Enhancements:**
The core logic inside `google-ai-identity.user.js` is highly modular. You can easily port this to a native Chrome/Firefox Extension by wrapping the core IIFE inside a `content_script.js` and adding a `manifest.json`. We encourage the community to prototype new stealth modules (e.g., Canvas/WebGL poisoning) and submit them!

## Documentation

Detailed documentation is available in our [Project Wiki](https://github.com/RE3CON/Gemini-AI/wiki). 

The wiki is automatically synchronized with the `docs/` folder in this repository via GitHub Actions.

## Bug Tracker & Forum

We utilize the full suite of GitHub features to manage this project:
- **[Bug Tracker (Issues)](https://github.com/RE3CON/Gemini-AI/issues):** Found a fingerprint leak? Does the script break a specific Google AI feature? Open an issue using our provided bug report templates.
- **[Community Forum (Discussions)](https://github.com/RE3CON/Gemini-AI/discussions):** Have an idea for a new spoofing technique? Want to discuss the future of AI privacy? Join the GitHub Discussions tab!

## Releases & Packages

We use **GitHub Releases** and **GitHub Packages** to distribute stable versions of the UserScript and the compiled Web App. 
- Check the [Releases](https://github.com/RE3CON/Gemini-AI/releases) page for versioned downloads, changelogs, and source code archives.
- The CI/CD pipeline automatically builds and attaches artifacts (the raw `.user.js` and the compiled `dist/` folder) to every successful run on the `main` branch.

## Community & Contributing

We invite the community to join and help improve this project! Whether you're finding bugs, suggesting new features, or submitting pull requests for better fingerprint hardening techniques, your contributions are highly valued. 

- **Fork the repository** to experiment with your own ideas.
- **Open an issue** to discuss potential changes or report bugs.
- **Submit a Pull Request!** Let's build the ultimate privacy shield together.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
