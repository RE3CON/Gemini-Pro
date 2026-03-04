<div align="center">
  <a href="https://re3con.github.io/Gemini-AI/">
    <img src="https://img.shields.io/badge/🌐_Open_Web_App-Click_Here-blue?style=for-the-badge" alt="Open Web App" />
  </a>
  <a href="https://raw.githubusercontent.com/RE3CON/Gemini-AI/main/google-ai-identity.user.js">
    <img src="https://img.shields.io/badge/📦_Install_UserScript-Click_Here-success?style=for-the-badge" alt="Install UserScript" />
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

## Features
- **PWA Support:** Install the application directly to your device.
- **Dark/Light Mode:** Automatically syncs with your system preferences.
- **AI Logo Generation:** Generate unique, transparent, and colorful security-focused logos using the Gemini API.
- **Auto-Updates:** The script includes `@updateURL` and `@downloadURL` pointing to this repository, ensuring you always have the latest version.

## Community & Contributing

We invite the community to join and help improve this project! Whether you're finding bugs, suggesting new features, or submitting pull requests for better fingerprint hardening techniques, your contributions are highly valued. 

- **Fork the repository** to experiment with your own ideas.
- **Open an issue** to discuss potential changes or report bugs.
- **Submit a Pull Request!** Let's build the ultimate privacy shield together.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
