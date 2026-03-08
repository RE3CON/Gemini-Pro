# Maximum Capacity Android Chromium Build: Dynamic Configuration

This document outlines the architecture for a fully dynamic, user-configurable Android Chromium build. This build replaces static `chrome://flags` with a real-time, persistent configuration manager.

## 1. UI Mockup: Maximum Capacity Settings

The configuration UI is designed to be responsive, adapting to both smartphone and tablet form factors.

### Smartphone View (Vertical Stack)
![Smartphone UI Mockup](smartphone_mockup.png)

### Tablet View (Split-Pane)
![Tablet UI Mockup](tablet_mockup.png)

## 2. Dynamic Configuration Architecture

To achieve this, we implement a three-tier bridge:

### Tier 1: The Android UI (Java/Kotlin)
- **`ConfigManager.java`**: A singleton that manages the state of all features.
- **`SettingsActivity.java`**: A dynamic `PreferenceFragmentCompat` that reads the schema and renders the UI.

### Tier 2: The JNI Bridge (C++)
- **`JniBridge.cc`**: Exposes Java methods to C++.
- **`FeatureRegistry.h`**: Maps Java-based feature names to C++ `base::Feature` pointers.

### Tier 3: The Engine Gate (C++)
- **`EngineGate.cc`**: Replaces static `base::FeatureList::IsEnabled()` checks with dynamic JNI calls.

```cpp
// Example of dynamic gating
bool IsFeatureEnabled(const char* feature_name) {
  // Call into Java ConfigManager via JNI
  return JniBridge::CallBooleanMethod("IsFeatureEnabled", feature_name);
}
```

## 3. Implementation Checklist
- [ ] **Schema Definition:** Define all configurable features in a central JSON/Java schema.
- [ ] **Persistence:** Implement `SharedPreferences` storage for all dynamic settings.
- [ ] **JNI Bridge:** Implement the JNI layer to bridge Java state to C++ engine.
- [ ] **Engine Gating:** Audit and replace static feature checks throughout the Chromium source tree.
- [ ] **UI:** Build the dynamic, responsive settings UI.

> [!WARNING]
> This is a high-maintenance architecture. Every upstream Chromium update requires auditing all engine-level feature gates to ensure your JNI bridge remains compatible.
