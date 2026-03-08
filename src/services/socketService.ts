let ws: WebSocket | null = null;
const listeners: ((data: any) => void)[] = [];

export const initSocket = () => {
  if (typeof window !== 'undefined' && 'WebSocket' in window && !ws) {
    try {
      const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
      ws = new WebSocket(`${protocol}${window.location.host}`);
      ws.onopen = () => {};
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          listeners.forEach(listener => listener(data));
        } catch (e) {
          console.error('Error parsing WebSocket message:', e);
        }
      };
      ws.onclose = () => {
        ws = null;
      };
    } catch (e) {
      console.error('WebSocket connection failed:', e);
    }
  }
};

export const getSocket = () => ws;

export const addSocketListener = (listener: (data: any) => void) => {
  listeners.push(listener);
};

export const sendSocketMessage = (type: string, payload: any) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    try {
      ws.send(JSON.stringify({ type, ...payload }));
    } catch (e) {
      console.error('Failed to send socket message:', e);
    }
  } else {
    console.warn('Socket not connected, message dropped:', type);
  }
};
