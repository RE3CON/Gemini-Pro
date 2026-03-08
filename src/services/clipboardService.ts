import { addSocketListener, initSocket, sendSocketMessage } from './socketService';
import { getActiveBridge } from './bridgeService';

initSocket();

addSocketListener((data) => {
  if (data.type === 'CLIPBOARD_UPDATE' && data.text) {
    // Update local clipboard
    try {
      navigator.clipboard.writeText(data.text);
    } catch (err) {
      console.error('Failed to write to clipboard:', err);
    }
  }
});

export const clipboardService = {
  read: async () => {
    const bridge = getActiveBridge();
    try {
      return await bridge.clipboard.read();
    } catch (err: any) {
      console.error('Clipboard read error:', err);
      throw new Error(err.message || 'Clipboard access denied or not supported');
    }
  },
  write: async (text: string) => {
    const bridge = getActiveBridge();
    try {
      await bridge.clipboard.write(text);
      
      // Emit via WebSocket
      sendSocketMessage('CLIPBOARD_UPDATE', { text });
    } catch (err: any) {
      console.error('Clipboard write error:', err);
      throw new Error(err.message || 'Clipboard access denied or not supported');
    }
  },
};
