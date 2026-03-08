import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X } from 'lucide-react';
import { INITIAL_CONFIG } from '../constants/initialConfig';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleFeature: (key: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onToggleFeature }) => {
  const [search, setSearch] = useState('');
  
  const features = Object.keys(INITIAL_CONFIG).filter(key => key.startsWith('enable'));

  const filteredFeatures = features.filter(feature => 
    feature.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        isOpen ? onClose() : null; // Toggle logic would be better but this is fine for now
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="w-full max-w-lg overflow-hidden rounded-xl bg-zinc-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center border-b border-zinc-800 p-4">
              <Search className="mr-3 text-zinc-500" />
              <input
                type="text"
                placeholder="Search features..."
                className="w-full bg-transparent text-white placeholder-zinc-500 outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
              <button onClick={onClose} className="text-zinc-500 hover:text-white">
                <X />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto p-2">
              {filteredFeatures.map(feature => (
                <button
                  key={feature}
                  className="flex w-full items-center justify-between rounded-lg p-3 text-left text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  onClick={() => {
                    onToggleFeature(feature);
                    onClose();
                  }}
                >
                  {feature.replace('enable', '')}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
