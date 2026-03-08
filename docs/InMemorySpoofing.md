# In-Memory Spoofing & Fingerprint Hardening

This project utilizes in-memory modification techniques to harden your browser fingerprint.

## How it works
Because userscripts (via Tampermonkey, Violentmonkey, or AdGuard) operate within the web page's sandbox (DOM context), they are restricted from accessing the browser's internal file system or core process memory.

To bypass this restriction while still providing effective fingerprint hardening, the script performs the following in-memory modifications:

- **Navigator Spoofing:** Overwrites properties of the `window.navigator` object (e.g., `userAgent`, `platform`, `hardwareConcurrency`) to simulate a specific device environment (e.g., Pixel 11 Pro XL).
- **Timing API Jitter:** Injects noise into timing APIs like `performance.now()` and `requestAnimationFrame` to prevent timing-based fingerprinting.
- **Canvas/WebGL Masking:** Intercepts `canvas` and `WebGL` rendering calls to inject subtle noise, preventing canvas-based fingerprinting.
- **Function Masking:** Protects spoofed functions from `.toString()` detection by overriding their `toString` method to return the expected native code string.

These modifications are applied at `document-start`, ensuring they are active before any tracking scripts can execute.
