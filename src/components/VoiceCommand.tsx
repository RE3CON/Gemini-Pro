import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';

export const VoiceCommand: React.FC = () => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    // Request microphone permission on mount
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => console.log('Microphone access granted'))
      .catch(err => console.error('Microphone access denied', err));
  }, []);

  const toggleListening = () => {
    setIsListening(!isListening);
    // Add speech recognition logic here
  };

  return (
    <button
      onClick={toggleListening}
      className={`fixed bottom-20 right-20 p-4 rounded-full shadow-lg transition-all ${isListening ? 'bg-red-500 animate-pulse' : 'bg-blue-500 hover:bg-blue-600'}`}
    >
      {isListening ? <MicOff className="text-white" /> : <Mic className="text-white" />}
    </button>
  );
};
