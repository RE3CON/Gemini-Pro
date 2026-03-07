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
  // @ts-ignore
  return window.Capacitor || window.Android || null;
};

const native = getNativeInterface();

export const samsungBridge: SamsungBridge = {
  name: 'Samsung',
  isNative: !!native,
  clipboard: {
    read: async () => navigator.clipboard.readText(),
    write: async (text: string) => navigator.clipboard.writeText(text),
  },
  knox: {
    isSecureContainer: async () => native?.knox?.isSecureContainer() ?? false,
    getSecurityStatus: async () => native?.knox?.getSecurityStatus() ?? 'unknown',
  },
  sPen: {
    isSPenConnected: async () => native?.sPen?.isSPenConnected() ?? false,
    getPressure: (event: PointerEvent) => event.pressure,
  },
  health: {
    getStepCount: async () => native?.health?.getStepCount() ?? 0,
  },
  notes: {
    saveNote: async (title: string, content: string) => {
      if (native?.notes?.saveNote) {
        await native.notes.saveNote(title, content);
      } else {
        console.log(`[Web Fallback] Saving note: ${title}`, content);
      }
    },
  },
  hardware: {
    setDeXMode: async (enabled: boolean) => native?.hardware?.setDeXMode?.(enabled) ?? console.log('DeX mode set to:', enabled),
    setBatteryOptimization: async (enabled: boolean) => native?.hardware?.setBatteryOptimization?.(enabled) ?? console.log('Battery optimization set to:', enabled),
  },
};
