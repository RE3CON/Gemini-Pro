import React, { useState } from 'react';
import { ChevronLeft, Search, Cpu, Globe, Settings, ChevronRight, LayoutList, Terminal } from 'lucide-react';

export const AdvancedConfiguration: React.FC = () => {
  const [cacheSize, setCacheSize] = useState(512);
  const [activeCategory, setActiveCategory] = useState<'Hardware' | 'Network' | 'Stealth' | 'Engine' | 'ADB & Flags'>('Hardware');
  const [commandLineArgs, setCommandLineArgs] = useState('--disable-gpu --disable-web-rtc --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"');

  const loadRecommendedFlags = () => {
    const recommended = [
      '--disable-gpu',
      '--disable-web-rtc',
      '--disable-web-security',
      '--disable-notifications',
      '--disable-background-networking',
      '--disable-sync',
      '--no-sandbox',
      '--disable-infobars',
      '--user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"',
      '--proxy-server="socks5://127.0.0.1:9050"'
    ].join(' ');
    setCommandLineArgs(recommended);
  };

  const categories = [
    { name: 'Hardware', icon: Cpu },
    { name: 'Network', icon: Globe },
    { name: 'Stealth', icon: LayoutList },
    { name: 'Engine', icon: Settings },
    { name: 'ADB & Flags', icon: Terminal },
  ] as const;

  const renderContent = () => {
    switch (activeCategory) {
      case 'Hardware':
        return (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold tracking-wider text-[#81c995] mb-4">HARDWARE SPOOFING</h2>
            <SettingItem label="Device User Agent" type="dropdown" value="Chrome/Windows 10" />
            <SettingItem label="GPU Fingerprinting" type="toggle" value={true} />
            <SettingItem label="Battery Status Spoofing" type="toggle" value={false} />
            <SettingItem label="Resolution/DPI" type="dropdown" value="Native (1440p)" />
            
            <h2 className="text-sm font-semibold tracking-wider text-[#81c995] mt-8 mb-4">MEMORY MANAGEMENT</h2>
            <div className="py-4">
              <label className="block mb-2">Heap Size Limit</label>
              <input type="range" min="2" max="8" step="2" className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#81c995]" />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>2GB</span><span>2GB</span><span>4GB</span><span>6GB</span><span>7GB</span><span>8GB</span>
              </div>
            </div>
            <SettingItem label="Process Memory Limit" type="dropdown" value="Site-Per-Process" />
          </div>
        );
      case 'ADB & Flags':
        return (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold tracking-wider text-[#81c995] mb-4">ADB SPOOFING & FLAG INJECTION</h2>
            <SettingItem label="Enable command line on non-rooted devices" type="toggle" value={false} />
            <div className="mt-4">
              <label className="block text-sm text-gray-400 mb-2">Command Line Arguments</label>
              <textarea 
                className="w-full bg-[#202124] text-white p-3 rounded-lg text-sm font-mono"
                rows={6}
                value={commandLineArgs}
                onChange={(e) => setCommandLineArgs(e.target.value)}
              />
              <button 
                onClick={loadRecommendedFlags}
                className="mt-2 text-xs bg-[#1e2e2a] text-[#81c995] px-3 py-1 rounded-md hover:bg-[#2a3e39]"
              >
                Load Recommended Flags
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Common flags: --disable-gpu, --disable-web-rtc, --disable-web-security, --user-agent="...", --proxy-server="..."
              </p>
            </div>
          </div>
        );
      default:
        return <div className="text-gray-500">Settings for {activeCategory}...</div>;
    }
  };

  return (
    <div className="bg-[#121212] text-white min-h-screen font-sans">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center p-4 mb-2">
        <ChevronLeft className="mr-4" />
        <h1 className="text-xl flex-grow">Advanced Configuration</h1>
        <Search />
      </div>

      <div className="flex h-screen">
        {/* Sidebar (Split Pane) */}
        <div className="w-1/3 border-r border-gray-800 p-4 space-y-2">
          <h1 className="text-xl mb-6 hidden lg:block">Advanced Configuration</h1>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`w-full flex items-center p-3 rounded-lg ${activeCategory === cat.name ? 'bg-[#1e2e2a] text-[#81c995]' : 'hover:bg-gray-800'}`}
            >
              <cat.icon className="mr-3" size={20} />
              {cat.name}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="w-2/3 p-8">
          <h2 className="text-2xl mb-8">{activeCategory} Settings</h2>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const SettingItem: React.FC<{ label: string, type: 'toggle' | 'dropdown', value: any }> = ({ label, type, value }) => (
  <div className="flex justify-between items-center py-2">
    <span>{label}</span>
    {type === 'toggle' ? (
      <div className={`w-10 h-6 rounded-full p-1 ${value ? 'bg-[#81c995]' : 'bg-gray-600'}`}>
        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${value ? 'translate-x-4' : 'translate-x-0'}`} />
      </div>
    ) : (
      <span className="bg-[#202124] px-3 py-1 rounded-md text-sm">{value}</span>
    )}
  </div>
);
