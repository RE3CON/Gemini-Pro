# Build Guides: UserScript & Chromium for Android

This document outlines the purpose of the project's UserScript, instructions on how to build it, and a guide on building Chromium for Android.

## UserScript Build & Functionality

The UserScript is the core component of this project, designed to harden your browser fingerprint against tracking and behavioral analysis, specifically tailored for Google's AI environments (Gemini, AI Studio, NotebookLM, etc.).

It operates within the browser's sandbox (DOM context) and includes active modules for:

- **Hardware Spoofing:** Simulates a specific device environment (e.g., Pixel 11 Pro XL) by spoofing `navigator` properties.
- **Network Stealth:** Spoofs connection types, enforces Global Privacy Control (GPC), and locks WebRTC to prevent IP leaks.
- **Masking Engine:** Protects spoofed functions from `.toString()` detection by overriding their native code string representation.
- **Jitter Logic:** Injects noise into timing APIs (`performance.now`) and `requestAnimationFrame` to prevent timing-based fingerprinting.
- **Ecosystem Integration:** Provides native-like features for Samsung (S-Pen, Health) and Microsoft (Edge WebView2) ecosystems via PWA/Bridge.

### How to build and extract the UserScript

The UserScript is managed within the project's React/Vite codebase. To build the project and extract the latest version of the script:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/RE3CON/Gemini-AI.git
   cd Gemini-AI
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Build the project:**
   ```bash
   npm run build
   ```
4. **Extract the UserScript:**
   The core logic is embedded within `src/App.tsx` and related service files. The build process compiles the web application, but the raw UserScript (`google-ai-identity.user.js`) is maintained in the root of the repository.

   - **Automated Extraction:** You can use the automated GitHub Action workflow provided in `.github/workflows/` to generate the latest `.user.js` file.
   - **Manual Extraction:** Alternatively, you can copy the contents of `google-ai-identity.user.js` directly from the repository.

Once extracted, you can install the script into your preferred userscript manager (e.g., Tampermonkey, Violentmonkey, or AdGuard Android UserScript Extension).

## Building Chromium for Android (Canary/Main)

Building Chromium from source is a complex task. The "Canary" channel is built directly from the `main` branch of the Chromium source code.

### Prerequisites
- **Workstation:** A powerful Linux machine (Ubuntu recommended) with at least 32GB RAM, 500GB+ free disk space, and a fast multi-core processor.
- **Tools:** `depot_tools` installed and configured.

### Steps to Build
1. **Get the Source Code:**
   Follow the official instructions to clone the `main` branch, which serves as the foundation for Canary builds:
   [Get the Code](https://chromium.googlesource.com/chromium/src/+/main/docs/get_the_code.md)

2. **Configure for Android:**
   Follow the Android-specific build instructions to set up the build environment:
   [Build for Android](https://chromium.googlesource.com/chromium/src/+/main/docs/android_build_instructions.md)

3. **Compile:**
   Run the build command as specified in the official documentation. This process will take several hours depending on your hardware.

4. **Result:**
   Upon successful compilation, you will find the `.apk` file in the `out/` directory, which can be installed on your Android device.

> [!WARNING]
> This process is intended for advanced developers. It is resource-intensive and requires significant troubleshooting skills to resolve build errors.

## Advanced: Mapping UserScript Functions to C++ Source

To realize UserScript functionality directly in a Chromium build, you must map JavaScript APIs to C++ engine modifications.

### 1. Navigator Spoofing (Blink Renderer)
Instead of overwriting `window.navigator` in JS, modify the C++ code that provides these values.
- **Files:** `third_party/blink/renderer/core/frame/navigator.cc` and `navigator.idl`.
- **Method:** Modify the C++ getter functions for properties (e.g., `userAgent()`) to return your desired string directly.

### 2. Custom Flag Injection
To make features toggleable via `chrome://flags`:
- **Files:** `chrome/browser/about_flags.cc`, `base/feature_list.h`.
- **Method:** Define a new `base::Feature` in C++ and register it in `about_flags.cc`. Use `base::FeatureList::IsEnabled()` in your renderer code to gate your spoofing logic.

### 3. Hardcoding Local State Defaults
To set custom defaults for `Local State` preferences:
- **File:** `chrome/browser/prefs/browser_prefs.cc`.
- **Method:** Modify the `RegisterLocalState` function to register your custom preferences and set their initial default values.

> [!IMPORTANT]
> This approach requires maintaining your own patches against the upstream Chromium repository. As Chromium code changes daily, you will need to rebase your patches frequently to keep your build functional.
