# Recommended Privacy Flags

To access these, navigate to `chrome://flags` in your address bar.

| Flag Name | Recommended Setting | Why? |
| :--- | :--- | :--- |
| **Privacy Sandbox Ads APIs** | **Disabled** | Prevents the browser from participating in interest-based ad tracking. |
| **WebRTC IP Handling** | **Disable non-proxied UDP** | Prevents WebRTC from leaking your real local IP address. |
| **Site Isolation** | **Enabled** | Forces strict process isolation for each site, mitigating Spectre-style attacks. |
| **QUIC Protocol** | **Disabled** | QUIC can sometimes be used to fingerprint network behavior; disabling it forces standard TCP/TLS. |
| **GPU Rasterization** | **Enabled** | While primarily for performance, forcing this can sometimes normalize GPU fingerprinting results. |
| **Reduce User-Agent** | **Enabled** | Forces the browser to report a generic, reduced User-Agent string to reduce fingerprint entropy. |

> **Note:** After changing any flag, you must click the **"Relaunch"** button at the bottom of the page for the changes to take effect. Always test your browser after changing these settings to ensure core functionality (like Google AI tools) is not broken.
