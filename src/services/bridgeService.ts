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
        const response = await fetch('/api/samsung/dex', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ enabled }),
        });
        return response.json();
      },
      setBatteryOptimization: async (enabled: boolean) => {
        const response = await fetch('/api/samsung/battery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ enabled }),
        });
        return response.json();
      },
    },
  };
};
