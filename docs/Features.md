# Features

The AI Identity Hardener includes several advanced modules to protect your browser fingerprint.

## 1. Hardware Spoofing
- **GPU:** Simulates an NVIDIA GeForce RTX 3080.
- **CPU:** Reports 16 hardware concurrency cores.
- **Memory:** Reports 8GB of device memory.
- **Platform:** Identifies as Linux x86_64 (GNOME style).

## 2. Network Stealth
- **Connection:** Spoofs a 4G effective connection type.
- **GPC:** Enforces Global Privacy Control.
- **WebRTC:** Locks down ICE servers to prevent local IP leaks.

## 3. Masking & Stealth
- **toString() Protection:** Prevents websites from detecting spoofed functions by checking their string representation.
- **Timing Jitter:** Adds micro-noise to `performance.now()` and `requestAnimationFrame()`.
- **Canvas/WebGL Noise:** Injects subtle noise into rendering APIs to break unique canvas fingerprints.

## 4. Environment Realism
- **Screen Geometry:** Simulates a 1920x1080 desktop environment even on mobile devices.
- **Battery Status:** Reports a constant "charging" state at 100% to prevent battery-based tracking.
- **Intl/Date:** Locks the timezone to America/Los_Angeles and locale to en-US.
