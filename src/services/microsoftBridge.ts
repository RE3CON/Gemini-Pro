import { Bridge } from './bridgeInterface';

export interface MicrosoftBridge extends Bridge {
  edge: {
    isEdgeWebView2: () => Promise<boolean>;
    getTheme: () => Promise<string>;
  };
  windows: {
    getSystemInfo: () => Promise<string>;
  };
}

// Helper to check for native bridge (Edge WebView2 or Windows interface)
const getNativeInterface = () => {
  if (typeof window === 'undefined') return null;
  // @ts-ignore
  return (window as any).chrome?.webview || (window as any).Windows || null;
};

// Lazy initialization of native interface
const getNative = () => getNativeInterface();

export const microsoftBridge: MicrosoftBridge = {
  name: 'Microsoft',
  get isNative() { return !!getNative(); },
  clipboard: {
    read: async () => typeof navigator !== 'undefined' ? navigator.clipboard.readText() : '',
    write: async (text: string) => { if (typeof navigator !== 'undefined') await navigator.clipboard.writeText(text); },
  },
  edge: {
    isEdgeWebView2: async () => !!getNative()?.chrome?.webview,
    getTheme: async () => 'unknown', // Stub
  },
  windows: {
    getSystemInfo: async () => 'unknown', // Stub
  },
  hardware: {
    setDeXMode: async (enabled: boolean) => console.log('DeX mode set to:', enabled),
    setBatteryOptimization: async (enabled: boolean) => console.log('Battery optimization set to:', enabled),
  },
};
