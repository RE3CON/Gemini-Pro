export interface Bridge {
  name: string;
  isNative: boolean;
  clipboard: {
    read: () => Promise<string>;
    write: (text: string) => Promise<void>;
  };
  hardware: {
    setDeXMode: (enabled: boolean) => Promise<void>;
    setBatteryOptimization: (enabled: boolean) => Promise<void>;
    getCPUInfo: () => Promise<string>;
    getGPUInfo: () => Promise<string>;
    getSystemSettings: () => Promise<Record<string, any>>;
  };
}
