import React from 'react';
import { samsungBridge } from '../services/samsungBridge';
import { microsoftBridge } from '../services/microsoftBridge';

export const NativeBridges: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="border rounded-xl p-4 bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Samsung Native Bridge</h2>
        <p className="text-sm">Status: {samsungBridge.isNative ? 'Connected' : 'Disconnected'}</p>
      </div>
      <div className="border rounded-xl p-4 bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Microsoft Native Bridge</h2>
        <p className="text-sm">Status: {microsoftBridge.isNative ? 'Connected' : 'Disconnected'}</p>
      </div>
    </div>
  );
};
