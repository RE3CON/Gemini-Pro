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
   - Copy the script from the application interface, OR
   - Download the `google-ai-identity.user.js` file.
3. **Install the Script:**
   - Open your userscript manager's dashboard.
   - Create a new script and paste the copied code, OR drag and drop the downloaded file into the dashboard.
4. **Activate:** Save the script and refresh any Google AI pages (e.g., `gemini.google.com`, `aistudio.google.com`). The script will run automatically at `document-start`.

## Features
- **PWA Support:** Install the application directly to your device.
- **Dark/Light Mode:** Automatically syncs with your system preferences.
- **AI Logo Generation:** Generate unique, transparent, and colorful security-focused logos using the Gemini API.
