import React from 'react';
import { Clipboard } from 'lucide-react';
import { clipboardService } from '../services/clipboardService';

interface ClipboardButtonProps {
  scriptContent: string;
}

export const ClipboardButton: React.FC<ClipboardButtonProps> = ({ scriptContent }) => {
  const handleCopy = async () => {
    try {
      await clipboardService.write(scriptContent);
      alert('Script copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="fixed bottom-20 right-36 z-[100] p-4 rounded-full shadow-2xl transition-all bg-slate-800 hover:bg-slate-700 border border-slate-600"
    >
      <Clipboard className="text-white" />
    </button>
  );
};
