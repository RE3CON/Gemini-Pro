# Chromium Implementation Guide: Porting UserScript Features to C++

This guide provides a step-by-step approach to porting the AI Identity Hardener's fingerprint hardening features directly into the Chromium source code for Android.

## 1. Project Context: AI Identity Hardening
The goal of this project is to create a consistent, privacy-hardened browser environment, specifically tailored for Google's AI tools (Gemini, AI Studio, NotebookLM). By porting these features from a UserScript to a custom Chromium build, we ensure:
- **Persistence:** Hardening is baked into the browser binary.
- **Stealth:** Hardening is implemented at the engine level (C++), making it significantly harder to detect than JavaScript-based spoofing.
- **Consistency:** The browser environment remains uniform across all AI tool interactions.

## 2. Architecture Overview
To port UserScript features, you must modify the Chromium engine (Blink/C++), not the browser's runtime (JavaScript).

- **Renderer Process (Blink):** Where `navigator`, `screen`, and `performance` APIs are defined.
- **Browser Process:** Where `Local State` (preferences) and `about:flags` are managed.

## 3. Step-by-Step Implementation

### Step A: Registering New Flags (`about:flags`)
To make your features toggleable, you must register them in the browser's flag system.

1.  **Define the Feature:** In `base/feature_list.h`, define a new `base::Feature`.
2.  **Register the Flag:** In `chrome/browser/about_flags.cc`, add an entry to the `kFeatureEntries` array. This makes the toggle appear in `chrome://flags` on Android.
3.  **Implement the Logic:** In your C++ code, use `base::FeatureList::IsEnabled(kYourNewFeature)` to gate your modifications.

### Step B: Modifying Local State Defaults
To set custom defaults (e.g., forcing GPC or constant battery state):

1.  **Register Preference:** In `chrome/browser/prefs/browser_prefs.cc`, locate `RegisterLocalState`.
2.  **Set Default:** Use `registry->RegisterBooleanPref(...)` or similar to set the default value for your custom preference.
3.  **Read Preference:** In the relevant C++ module, read the preference using `PrefService` to apply the value.

### Step C: Porting Specific Features (C++ Mapping)

| Feature | UserScript (JS) | Chromium Implementation (C++) |
| :--- | :--- | :--- |
| **Navigator Spoofing** | `Object.defineProperty` | Modify `third_party/blink/renderer/core/frame/navigator.cc` getters. |
| **Battery Status** | `navigator.getBattery()` | Modify `content/browser/battery_status/battery_monitor_impl.cc`. |
| **Canvas Noise** | `CanvasRenderingContext2D` | Modify `third_party/blink/renderer/modules/canvas/canvas_rendering_context_2d.cc`. |
| **Timing Jitter** | `performance.now()` | Modify `third_party/blink/renderer/core/timing/performance.cc`. |

## 4. Enabling Advanced Developer Features (e.g., Extensions)
Chromium for Android has advanced features (like extension support) disabled by default. Enabling them requires deep modifications to the build configuration and the Java/C++ bridge.

1. **Enable Extension System:** You must modify the build configuration (`gn` args) to include the extension subsystem in the Android build. This involves setting `enable_extensions = true` in your `args.gn` file. Note: This will likely cause significant build errors that require fixing in the C++ source.
2. **Bridge Extensions to Android:** Extensions rely on desktop-specific APIs. You must implement the necessary C++ bridges to map these desktop extension APIs to the Android environment.
3. **UI Integration:** You will need to modify the Android UI code (`chrome/android/java/`) to add the necessary UI elements (e.g., extension management menus) that are standard on desktop but missing on Android.

## 5. Build & Deployment
After applying your C++ modifications:

1.  **Rebuild:** Run the build command (e.g., `autoninja -C out/Default chrome_public_apk`).
2.  **Install:** Transfer the generated `.apk` to your Android device.
3.  **Verify:** Open `chrome://flags` to toggle your features and use a fingerprinting test site to verify the results.

> [!WARNING]
> This is a permanent modification to the browser binary. You must maintain these patches against the upstream Chromium repository and rebase them frequently as the source code evolves.
