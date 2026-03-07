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
  // @ts-ignore
  return (window as any).chrome?.webview || (window as any).Windows || null;
};

const native = getNativeInterface();

export const microsoftBridge: MicrosoftBridge = {
  name: 'Microsoft',
  isNative: !!native,
  clipboard: {
    read: async () => navigator.clipboard.readText(),
    write: async (text: string) => navigator.clipboard.writeText(text),
  },
  edge: {
    isEdgeWebView2: async () => !!(window as any).chrome?.webview,
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
