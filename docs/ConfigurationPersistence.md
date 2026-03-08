# Configuration Persistence

To ensure user settings and script states are maintained across browser sessions, this project utilizes `localStorage`.

## Implementation Details

The configuration state is managed in the main application component (`App.tsx`) using React's `useState` and `useEffect` hooks.

### How it works:
1. **Initialization:** Upon component mount, the application checks `localStorage` for a saved configuration object under the key `gemini-ai-config`.
2. **Merging:** If found, the saved configuration is parsed and merged with the `INITIAL_CONFIG` to ensure compatibility with any future updates to the configuration schema.
3. **Persistence:** Any changes made to the configuration via the UI are automatically saved back to `localStorage` using a `useEffect` hook that triggers whenever the `config` state changes.

### Error Handling
The implementation includes a `try-catch` block to handle potential JSON parsing errors, ensuring that if the `localStorage` data becomes corrupted, the application gracefully falls back to the `INITIAL_CONFIG`.
