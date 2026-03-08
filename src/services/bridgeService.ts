import { samsungBridge } from './samsungBridge';
import { microsoftBridge } from './microsoftBridge';
import { Bridge } from './bridgeInterface';

export const getActiveBridge = (): Bridge => {
  if (samsungBridge.isNative) return samsungBridge;
  if (microsoftBridge.isNative) return microsoftBridge;
  
  // Fallback to web implementation
  return {
    name: 'Web',
    isNative: false,
    clipboard: {
      read: async () => navigator.clipboard.readText(),
      write: async (text: string) => navigator.clipboard.writeText(text),
    },
    hardware: {
      setDeXMode: async (enabled: boolean) => {
        try {
          const response = await fetch('/api/samsung/dex', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ enabled }),
          });
          if (!response.ok) throw new Error('Failed to set DeX mode');
          return await response.json();
        } catch (error) {
          console.error('DeX mode error:', error);
          throw error;
        }
      },
      setBatteryOptimization: async (enabled: boolean) => {
        try {
          const response = await fetch('/api/samsung/battery', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ enabled }),
          });
          if (!response.ok) throw new Error('Failed to set battery optimization');
          return await response.json();
        } catch (error) {
          console.error('Battery optimization error:', error);
          throw error;
        }
      },
      getCPUInfo: async () => 'unknown',
      getGPUInfo: async () => 'unknown',
      getSystemSettings: async () => ({}),
    },
  };
};
