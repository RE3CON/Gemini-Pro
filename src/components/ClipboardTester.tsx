import React, { useState } from 'react';
import { clipboardService } from '../services/clipboardService';
import { Clipboard, Copy, Check } from 'lucide-react';

export const ClipboardTester: React.FC = () => {
  const [clipboardContent, setClipboardContent] = useState('');
  const [status, setStatus] = useState('');

  const readClipboard = async () => {
    try {
      const text = await clipboardService.read();
      setClipboardContent(text);
      setStatus('Read successful');
    } catch (err: any) {
      console.error('Clipboard read error:', err);
      setStatus(`Read failed: ${err.message || 'Unknown error'}`);
    }
  };

  const writeClipboard = async () => {
    try {
      await clipboardService.write(clipboardContent);
      setStatus('Write successful');
    } catch (err: any) {
      setStatus(`Write failed: ${err.message}`);
    }
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-xl">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Clipboard size={20} /> Clipboard Tester
      </h2>
      <textarea
        value={clipboardContent}
        onChange={(e) => setClipboardContent(e.target.value)}
        className="w-full h-32 p-3 bg-slate-800 text-white rounded-lg mb-4"
        placeholder="Enter text to write to clipboard..."
      />
      <div className="flex gap-2">
        <button onClick={readClipboard} className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600">Read</button>
        <button onClick={writeClipboard} className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600">Write</button>
      </div>
      <p className="mt-2 text-sm text-slate-400">{status}</p>
    </div>
  );
};
