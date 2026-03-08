import { Bridge } from './bridgeInterface';

export interface SamsungBridge extends Bridge {
  knox: {
    isSecureContainer: () => Promise<boolean>;
    getSecurityStatus: () => Promise<string>;
  };
  sPen: {
    isSPenConnected: () => Promise<boolean>;
    getPressure: (event: PointerEvent) => number;
  };
  health: {
    getStepCount: () => Promise<number>;
  };
  notes: {
    saveNote: (title: string, content: string) => Promise<void>;
  };
}

// Helper to check for native bridge (Capacitor or Android interface)
const getNativeInterface = () => {
  if (typeof window === 'undefined') return null;
  // @ts-ignore
  return (window.Capacitor || window.Android) || null;
};

// Lazy initialization of native interface
const getNative = () => getNativeInterface();

export const samsungBridge: SamsungBridge = {
  name: 'Samsung',
  get isNative() { return !!getNative(); },
  clipboard: {
    read: async () => typeof navigator !== 'undefined' ? navigator.clipboard.readText() : '',
    write: async (text: string) => { if (typeof navigator !== 'undefined') await navigator.clipboard.writeText(text); },
  },
  knox: {
    isSecureContainer: async () => getNative()?.knox?.isSecureContainer() ?? false,
    getSecurityStatus: async () => getNative()?.knox?.getSecurityStatus() ?? 'unknown',
  },
  sPen: {
    isSPenConnected: async () => getNative()?.sPen?.isSPenConnected() ?? false,
    getPressure: (event: PointerEvent) => event.pressure,
  },
  health: {
    getStepCount: async () => getNative()?.health?.getStepCount() ?? 0,
  },
  notes: {
    saveNote: async (title: string, content: string) => {
      const native = getNative();
      if (native?.notes?.saveNote) {
        await native.notes.saveNote(title, content);
      }
    },
  },
  hardware: {
    setDeXMode: async (enabled: boolean) => getNative()?.hardware?.setDeXMode?.(enabled),
    setBatteryOptimization: async (enabled: boolean) => getNative()?.hardware?.setBatteryOptimization?.(enabled),
    getCPUInfo: async () => getNative()?.hardware?.getCPUInfo?.() ?? 'unknown',
    getGPUInfo: async () => getNative()?.hardware?.getGPUInfo?.() ?? 'unknown',
    getSystemSettings: async () => getNative()?.hardware?.getSystemSettings?.() ?? {},
  },
};
