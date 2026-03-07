import React from 'react';
import { RefreshCw } from 'lucide-react';

interface DeviceSyncProps {
  onSync: () => void;
}

export const DeviceSync: React.FC<DeviceSyncProps> = ({ onSync }) => {
  return (
    <button
      onClick={onSync}
      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors"
    >
      <RefreshCw size={16} />
      Sync to Devices
    </button>
  );
};
