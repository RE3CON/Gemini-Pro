# Gemini-AI Wiki

Welcome to the Gemini-AI Wiki! This is the central repository for detailed documentation regarding the project.

**Latest Update (2026-03-07):** Hardened the native bridge service (`samsungBridge.ts`) to prevent `ReferenceError: window is not defined` in Node.js build environments, ensuring reliable CI/CD builds.

## Table of Contents

1. [Overview](#overview)
2. [Fingerprint Hardening Techniques](#fingerprint-hardening-techniques)
3. [Samsung Ecosystem Integration](#samsung-ecosystem-integration)
4. [PWA Installation](#pwa-installation)
5. [CI/CD Pipeline](#cicd-pipeline)
6. [Contributing](#contributing)

---

## Overview

Gemini-AI is a sovereign fingerprint protection tool for Google AI & LLM environments. It uses a Golden Master architecture to ensure zero-blindspot hardening.

## Fingerprint Hardening Techniques

- **Hardware Spoofing:** Simulates high-end hardware.
- **Network Stealth:** Spoofs 4G, enforces GPC, locks WebRTC.
- **Masking Engine:** Protects spoofed functions from detection.
- **Jitter Logic:** Injects noise into timing APIs.
- **GNOME Simulation:** Realistic screen geometry for Linux.

## Native Ecosystem Integration

We provide bridges for native-like ecosystem features.

### Samsung Ecosystem Integration
The bridge is located at `src/services/samsungBridge.ts`. It automatically detects if it is running in a native environment (via `window.Capacitor` or `window.Android`).

### Microsoft Ecosystem Integration
The bridge is located at `src/services/microsoftBridge.ts`. It automatically detects if it is running in a native environment (via `window.chrome.webview` or `window.Windows`).

### Native-Side Implementation (Android/Windows)
To enable these features, you must implement a bridge in your native code that exposes the corresponding interface to the WebView.

```kotlin
// Example Android Interface
class SamsungBridgeInterface {
    @JavascriptInterface
    fun isSecureContainer(): Boolean { /* Knox check */ }
    
    @JavascriptInterface
    fun getSecurityStatus(): String { /* Knox status */ }
    
    @JavascriptInterface
    fun isSPenConnected(): Boolean { /* S-Pen check */ }
    
    @JavascriptInterface
    fun getStepCount(): Int { /* Samsung Health API */ }
    
    @JavascriptInterface
    fun saveNote(title: String, content: String) { /* Samsung Notes API */ }
}

// Add to WebView
webView.addJavascriptInterface(SamsungBridgeInterface(), "Android")
```

## UI Mockups

Below are the mockups for the Advanced Configuration UI on different devices.

### Smartphone View
![Smartphone UI](docs/smartphone_mockup.png)

### Tablet View
![Tablet UI](docs/tablet_mockup.png)

## PWA Installation

Gemini-AI is a PWA. You can install it to your device's home screen for a native-like experience.

## CI/CD Pipeline

We use GitHub Actions to automate:
- Building the web app.
- Extracting the UserScript.
- Creating GitHub Releases.
- Deploying to GitHub Pages.
- Publishing to GitHub Packages.

## Contributing

We welcome contributions! Please fork the repository, open an issue, or submit a pull request.
