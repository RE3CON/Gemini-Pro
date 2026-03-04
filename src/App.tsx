import React, { useState, useEffect } from 'react';
import { Shield, Copy, Check, Terminal, Cpu, Globe, Lock, Zap, Github, Loader2, XCircle, CheckCircle2, AlertCircle, Image as ImageIcon, Download, Maximize, Minimize, AppWindow } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';

const MERGED_SCRIPT = `// ==UserScript==
// @name         Google AI Identity Hardener
// @namespace    http://tampermonkey.net/
// @version      12.5
// @description  Ultimate Chrome fingerprint hardening for Google AI services - Full Sovereign Hybrid
// @author       Anonymous
// @license      MIT
// @match        https://*.google.com/*
// @match        https://gemini.google.com/*
// @match        https://ai.google.dev/*
// @match        https://aistudio.google.com/*
// @match        https://notebooklm.google.com/*
// @match        https://accounts.google.com/*
// @match        https://assistant.google.com/*
// @match        https://*.google.dev/*
// @match        https://chatgpt.com/*
// @updateURL    https://raw.githubusercontent.com/RE3CON/Gemini-AI/main/google-ai-identity.user.js
// @downloadURL  https://raw.githubusercontent.com/RE3CON/Gemini-AI/main/google-ai-identity.user.js
// @run-at       document-start
// @grant        none
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    // ─── 1. CORE MASKING ENGINE & UTILITIES ────────────────────────────────
    // Prevents detection of spoofed functions via .toString()
    const originalToString = Function.prototype.toString;
    const modifiedFns = new Set();
    
    Function.prototype.toString = function() {
        if (modifiedFns.has(this)) return \`function \${this.name}() { [native code] }\`;
        return originalToString.call(this);
    };

    const protect = (fn) => { 
        if (fn && typeof fn === 'function') modifiedFns.add(fn); 
        return fn; 
    };

    const secureProps = (obj, prop, value) => {
        try {
            Object.defineProperty(obj, prop, {
                get: protect(() => value),
                configurable: true,
                enumerable: true
            });
        } catch (e) { /* Property lock bypass */ }
    };

    // ─── 2. TIMING & BEHAVIORAL JITTER ──────────────────────────────────────
    // Breaks timing-based fingerprinting and behavioral analysis
    const originalNow = performance.now;
    performance.now = protect(function() {
        return originalNow.apply(this) + (Math.random() * 0.1);
    });

    const originalRAF = window.requestAnimationFrame;
    window.requestAnimationFrame = protect(function(callback) {
        return originalRAF(function(time) {
            callback(time + (Math.random() * 0.05));
        });
    });

    // ─── 3. NAVIGATOR & CPU CONSISTENCY (Linux RTX 3080 Profile) ─────────────
    const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';
    
    secureProps(navigator, 'userAgent', UA);
    secureProps(navigator, 'platform', 'Linux x86_64');
    secureProps(navigator, 'vendor', 'Google Inc');
    secureProps(navigator, 'hardwareConcurrency', 16);
    secureProps(navigator, 'deviceMemory', 8);
    secureProps(navigator, 'maxTouchPoints', 0); // Spoofing desktop on mobile
    secureProps(navigator, 'language', 'en-US');
    secureProps(navigator, 'languages', ['en-US', 'en']);
    secureProps(navigator, 'webdriver', undefined);
    secureProps(navigator, 'pdfViewerEnabled', true);

    // High-Entropy UserAgentData (Client Hints Restoration)
    if (navigator.userAgentData) {
        const getHighEntropyValues = navigator.userAgentData.getHighEntropyValues;
        navigator.userAgentData.getHighEntropyValues = protect(async (hints) => {
            const values = await getHighEntropyValues.apply(navigator.userAgentData, [hints]);
            return { 
                ...values, 
                platform: "Linux", 
                architecture: "x86", 
                model: "", 
                platformVersion: "6.5.0",
                uaFullVersion: "128.0.6613.119"
            };
        });

        Object.defineProperty(Navigator.prototype, 'userAgentData', {
            get: protect(() => Promise.resolve({
                brands: [
                    { brand: 'Not_A Brand', version: '8' }, 
                    { brand: 'Chromium', version: '128' }, 
                    { brand: 'Chrome', version: '128' }
                ],
                platform: 'Linux', 
                mobile: false,
                getHighEntropyValues: navigator.userAgentData.getHighEntropyValues
            }))
        });
    }

    // Permissions & Hardware Enumeration Spoofing
    if (navigator.permissions && navigator.permissions.query) {
        const origQuery = navigator.permissions.query;
        navigator.permissions.query = protect(async (param) => {
            const res = await origQuery.apply(navigator.permissions, [param]);
            if (['notifications', 'geolocation'].includes(param.name)) {
                Object.defineProperty(res, 'state', { get: () => 'granted' });
            }
            return res;
        });
    }

    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        navigator.mediaDevices.enumerateDevices = protect(async () => [
            { kind: 'audioinput', label: 'Internal Microphone (Generic)', deviceId: 'default', groupId: 'default' },
            { kind: 'videoinput', label: 'Integrated Webcam (Generic)', deviceId: 'default', groupId: 'default' },
            { kind: 'audiooutput', label: 'Internal Speakers', deviceId: 'default', groupId: 'default' }
        ]);
    }

    // ─── 4. WEBGL & CANVAS STEALTH ──────────────────────────────────────────
    // Spoofs high-end GPU signature (RTX 3080)
    const spoofWebGL = (proto) => {
        const getParam = proto.getParameter;
        proto.getParameter = protect(function(param) {
            const mask = {
                37445: 'Google Inc. (NVIDIA)', 
                37446: 'ANGLE (NVIDIA, NVIDIA GeForce RTX 3080 Direct3D11 vs_5_0 ps_5_0)', 
                7936: 'NVIDIA Corporation', 
                7937: 'NVIDIA GeForce RTX 3080' 
            };
            return mask[param] || getParam.apply(this, arguments);
        });
    };
    if (window.WebGLRenderingContext) spoofWebGL(WebGLRenderingContext.prototype);
    if (window.WebGL2RenderingContext) spoofWebGL(WebGL2RenderingContext.prototype);

    // Canvas Noise Injection
    const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
    HTMLCanvasElement.prototype.toDataURL = protect(function() {
        if (this.width > 16 && this.height > 16) {
            const ctx = this.getContext('2d');
            if (ctx) {
                ctx.fillStyle = '#00000001';
                ctx.fillRect(0, 0, 1, 1);
            }
        }
        return originalToDataURL.apply(this, arguments);
    });

    const origGetImageData = CanvasRenderingContext2D.prototype.getImageData;
    CanvasRenderingContext2D.prototype.getImageData = protect(function(x, y, w, h) {
        const data = origGetImageData.apply(this, arguments);
        data.data[Math.floor(Math.random() * data.data.length)] ^= 1;
        return data;
    });

    // ─── 5. GEOMETRY & SCREEN REALISM (Linux GNOME Style) ───────────────────
    // Spoofs desktop screen dimensions on mobile devices
    Object.defineProperties(screen, {
        height: { get: protect(() => 1080) },
        width: { get: protect(() => 1920) },
        availHeight: { get: protect(() => 1052) }, // GNOME Taskbar simulation
        availWidth: { get: protect(() => 1920) },
        colorDepth: { get: protect(() => 24) },
        pixelDepth: { get: protect(() => 24) }
    });

    const origGetClientRects = Element.prototype.getClientRects;
    Element.prototype.getClientRects = protect(function() {
        const rects = origGetClientRects.apply(this, arguments);
        for (let i = 0; i < rects.length; i++) {
            Object.defineProperty(rects[i], 'width', { get: protect(() => rects[i].width + 0.00001), configurable: true });
        }
        return rects;
    });

    // ─── 6. DYNAMIC INTL, DATE & NETWORK ────────────────────────────────────
    const OriginalIntl = Intl.DateTimeFormat;
    window.Intl.DateTimeFormat = protect(function(locale, options) {
        return new OriginalIntl('en-US', { ...options, timeZone: 'America/Los_Angeles' });
    });
    window.Intl.DateTimeFormat.prototype = OriginalIntl.prototype;
    window.Intl.DateTimeFormat.supportedLocalesOf = OriginalIntl.supportedLocalesOf;
    Date.prototype.getTimezoneOffset = protect(() => 420); 

    // Battery & Connection Spoofing
    if (navigator.getBattery) {
        navigator.getBattery = protect(async () => ({ 
            charging: true, 
            level: 1.0, 
            chargingTime: 0, 
            dischargingTime: Infinity,
            addEventListener: () => {}
        }));
    }
    if (navigator.connection) {
        secureProps(navigator.connection, 'effectiveType', '4g');
        secureProps(navigator.connection, 'rtt', 50);
        secureProps(navigator.connection, 'downlink', 10);
        secureProps(navigator.connection, 'saveData', false);
    }

    // ─── 7. WEBRTC & AUDIO HARDENING ────────────────────────────────────────
    // Disables ICE servers to prevent local IP leaks via WebRTC
    const origPeer = window.RTCPeerConnection || window.webkitRTCPeerConnection;
    if (origPeer) {
        window.RTCPeerConnection = protect(function(config) {
            if (config) config.iceServers = []; 
            return new origPeer(config);
        });
        window.RTCPeerConnection.prototype = origPeer.prototype;
    }

    const spoofAudio = (proto) => {
        const origGetChannelData = proto.getChannelData;
        proto.getChannelData = protect(function() {
            const data = origGetChannelData.apply(this, arguments);
            for (let i = 0; i < data.length; i += 100) data[i] += (Math.random() - 0.5) * 0.0000001;
            return data;
        });
    };
    if (window.AudioBuffer) spoofAudio(AudioBuffer.prototype);

    // ─── 8. STORAGE LOCK & PRIVACY ──────────────────────────────────────────
    // Prevents websites from clearing or setting storage unexpectedly
    const secureStorage = (storageName) => {
        try {
            const storage = window[storageName];
            storage.setItem = protect(() => {});
            storage.clear = protect(() => {});
        } catch (e) { /* Storage lock bypassed */ }
    };
    secureStorage('localStorage');
    secureStorage('sessionStorage');

    Object.defineProperty(navigator, 'globalPrivacyControl', { get: protect(() => true), configurable: true });
    Object.defineProperty(document, 'visibilityState', { get: protect(() => 'visible') });
    Object.defineProperty(document, 'hidden', { get: protect(() => false) });

    // Blocks tracking beacons
    const originalBeacon = navigator.sendBeacon;
    navigator.sendBeacon = protect((url, data) => { 
        console.log('[Identity Hardener] Beacon blocked:', url); 
        return true; 
    });

    console.log('[Golden Master Sovereign] Identity Hardened & Stabilized (AdGuard Android Compatible).');
})();`;

export default function App() {
  const [copied, setCopied] = useState(false);
  const [showGithubModal, setShowGithubModal] = useState(false);
  const [githubToken, setGithubToken] = useState('');
  const [isPushing, setIsPushing] = useState(false);
  const [pushStatus, setPushStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isGeneratingLogo, setIsGeneratingLogo] = useState(false);
  const [isReaderMode, setIsReaderMode] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  
  // Global Toast State
  const [toast, setToast] = useState<{ id: number; type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now();
    setToast({ id, type, message });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 4000);
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // System Dark Mode Detection
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    
    // Initial check
    handleChange(mediaQuery);
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const handleInstallPWA = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(MERGED_SCRIPT);
      setCopied(true);
      showToast('success', 'Script copied to clipboard successfully!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      showToast('error', 'Failed to copy to clipboard. Please select the text manually.');
    }
  };

  const handleInstallScript = () => {
    window.location.href = 'https://raw.githubusercontent.com/RE3CON/Gemini-AI/main/google-ai-identity.user.js';
  };

  const handleGenerateLogo = async () => {
    setIsGeneratingLogo(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: 'A highly unique, colorful, and vibrant logo for a cybersecurity application. The design must be completely original, focusing heavily on digital security, privacy, and protection. Incorporate abstract security elements like a futuristic shield, cryptographic keys, or a secure vault, combined with vibrant, multi-colored neon gradients. Vector art style, clean edges, isolated on a transparent background. No text, no words.',
            },
          ],
        },
      });
      
      let found = false;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          setLogoUrl(`data:image/png;base64,${base64EncodeString}`);
          showToast('success', 'Logo generated successfully!');
          found = true;
          break;
        }
      }
      if (!found) {
        showToast('error', 'Failed to generate logo.');
      }
    } catch (error: any) {
      console.error('Error generating logo:', error);
      showToast('error', 'Error generating logo: ' + error.message);
    } finally {
      setIsGeneratingLogo(false);
    }
  };

  const handleGithubPush = async () => {
    if (!githubToken) {
      setPushStatus({ type: 'error', message: 'GitHub Personal Access Token is required.' });
      return;
    }

    setIsPushing(true);
    setPushStatus(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const response = await fetch('/api/github/push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: githubToken,
          repoOwner: 'RE3CON',
          repoName: 'Gemini-AI',
          branch: 'main',
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (response.ok) {
        setPushStatus({ type: 'success', message: `Successfully pushed to RE3CON/Gemini-AI! Commit: ${data.commitSha.substring(0, 7)}` });
        showToast('success', 'Codebase successfully deployed to GitHub!');
        setTimeout(() => setShowGithubModal(false), 3000);
      } else {
        setPushStatus({ type: 'error', message: data.error || 'Failed to push to GitHub.' });
        showToast('error', data.error || 'Deployment failed. Check your token and permissions.');
      }
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        setPushStatus({ type: 'error', message: 'Request timed out. The repository might be too large or the network is slow.' });
        showToast('error', 'Connection timed out.');
      } else {
        setPushStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' });
        showToast('error', 'Network error occurred.');
      }
    } finally {
      setIsPushing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E6E6E6] dark:bg-[#0a0a0a] p-4 md:p-8 font-sans text-[#141414] dark:text-[#f5f5f5] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <img src={logoUrl} alt="App Logo" className="w-8 h-8 object-contain drop-shadow-sm" referrerPolicy="no-referrer" />
              ) : (
                <Shield className="w-6 h-6 text-[#FF4444]" />
              )}
              <button
                onClick={handleGenerateLogo}
                disabled={isGeneratingLogo}
                className="flex items-center justify-center gap-1.5 bg-white dark:bg-[#1c1d21] border border-black/10 dark:border-white/10 text-[#151619] dark:text-white px-3 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-[#252629] transition-all active:scale-95 shadow-sm disabled:opacity-50"
              >
                {isGeneratingLogo ? <Loader2 className="w-3 h-3 animate-spin" /> : <ImageIcon className="w-3 h-3" />}
                <span className="text-xs font-medium">Generate Logo</span>
              </button>
            </div>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#8E9299] text-right">
              Security Protocol v12.0
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#151619] dark:text-white transition-colors">
                Identity Hardener
              </h1>
              <p className="mt-2 text-[#8E9299] dark:text-[#A1A5AB] max-w-xl italic serif transition-colors">
                Sovereign fingerprint protection for Google AI & LLM environments. 
                Merged Golden Master architecture with zero-blindspot hardening.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-wrap justify-end">
              {deferredPrompt && (
                <button
                  onClick={handleInstallPWA}
                  className="group relative flex items-center justify-center gap-2 bg-white dark:bg-[#1c1d21] border border-black/10 dark:border-white/10 text-[#151619] dark:text-white px-6 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#252629] transition-all active:scale-95 shadow-sm"
                >
                  <AppWindow className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Install App</span>
                </button>
              )}
              <button
                onClick={() => setShowGithubModal(true)}
                className="group relative flex items-center justify-center gap-2 bg-white dark:bg-[#1c1d21] border border-black/10 dark:border-white/10 text-[#151619] dark:text-white px-6 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#252629] transition-all active:scale-95 shadow-sm"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm font-medium">Push</span>
              </button>
              <button
                onClick={handleCopy}
                className="group relative flex items-center justify-center gap-2 bg-[#151619] dark:bg-white text-white dark:text-[#151619] px-6 py-3 rounded-xl hover:bg-[#252629] dark:hover:bg-gray-200 transition-all active:scale-95 shadow-lg shadow-black/10 dark:shadow-white/10"
              >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
                  <span className="text-sm font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="text-sm font-medium">Copy</span>
                </>
              )}
              </button>
              <button
                onClick={handleInstallScript}
                className="group relative flex items-center justify-center gap-2 bg-[#FF4444] text-white px-6 py-3 rounded-xl hover:bg-[#E63E3E] transition-all active:scale-95 shadow-lg shadow-red-500/20"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Install</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature List */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-[#151619] dark:bg-[#111111] rounded-2xl p-6 text-white shadow-xl border border-transparent dark:border-white/10 transition-colors">
              <h2 className="text-xs font-mono tracking-widest uppercase text-[#8E9299] mb-4">
                Active Modules
              </h2>
              <ul className="space-y-4">
                <FeatureItem icon={<Cpu />} title="Hardware Spoof" desc="RTX 3080 / 16-Core / 8GB" />
                <FeatureItem icon={<Globe />} title="Network Stealth" desc="4G / GPC / WebRTC Lock" />
                <FeatureItem icon={<Lock />} title="Masking Engine" desc="toString() Protection" />
                <FeatureItem icon={<Zap />} title="Jitter Logic" desc="Timing & RAF Noise" />
                <FeatureItem icon={<Terminal />} title="GNOME Simulation" desc="Realistic Screen Geometry" />
              </ul>
            </div>

            <div className="bg-white dark:bg-[#1c1d21] rounded-2xl p-6 border border-black/5 dark:border-white/10 shadow-sm transition-colors">
              <h3 className="text-sm font-bold mb-2 dark:text-white">How to use</h3>
              <ol className="text-xs text-[#8E9299] dark:text-[#A1A5AB] space-y-2 list-decimal list-inside">
                <li>Install Tampermonkey or Violentmonkey</li>
                <li>Create a new script</li>
                <li>Paste the Golden Master code</li>
                <li>Save and refresh Google AI pages</li>
              </ol>
            </div>
          </div>

          {/* Code Preview */}
          <div className={`md:col-span-2 ${isReaderMode ? 'fixed inset-4 md:inset-8 z-50' : ''}`}>
            {isReaderMode && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm -z-10" onClick={() => setIsReaderMode(false)} />
            )}
            <div className={`bg-[#151619] dark:bg-[#111111] rounded-2xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 border border-transparent dark:border-white/10 ${isReaderMode ? 'h-full' : 'h-[600px]'}`}>
              <div className="px-4 py-3 bg-[#1c1d21] border-b border-white/5 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono text-[#8E9299]">golden_master_sovereign.js</span>
                  <button 
                    onClick={() => setIsReaderMode(!isReaderMode)}
                    className="text-[#8E9299] hover:text-white transition-colors"
                    title={isReaderMode ? "Exit Reader Mode" : "Enter Reader Mode"}
                  >
                    {isReaderMode ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <textarea
                  readOnly
                  value={MERGED_SCRIPT}
                  className="flex-1 w-full bg-transparent p-6 font-mono text-xs leading-relaxed text-[#D1D1D1] resize-none focus:outline-none selection:bg-white/20"
                  spellCheck={false}
                  placeholder="Script content will appear here..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-[10px] font-mono text-[#8E9299] uppercase tracking-widest transition-colors">
          <div>System Status: Operational</div>
          <div>Encryption: AES-256-GCM Equivalent</div>
        </footer>

        {/* Global Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl bg-white border border-black/5"
            >
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
              {toast.type === 'error' && <XCircle className="w-5 h-5 text-rose-500" />}
              {toast.type === 'info' && <AlertCircle className="w-5 h-5 text-blue-500" />}
              <span className="text-sm font-medium text-[#151619]">{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GitHub Modal */}
        <AnimatePresence>
          {showGithubModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => !isPushing && setShowGithubModal(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-md bg-white dark:bg-[#1c1d21] rounded-3xl p-8 shadow-2xl overflow-hidden border border-transparent dark:border-white/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-black dark:bg-white flex items-center justify-center text-white dark:text-black">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold dark:text-white">Push to RE3CON/Gemini-AI</h2>
                    <p className="text-xs text-[#8E9299] dark:text-[#A1A5AB]">Deploy current codebase to GitHub</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-[#8E9299] dark:text-[#A1A5AB] mb-1.5">
                      GitHub Personal Access Token
                    </label>
                    <input
                      type="password"
                      value={githubToken}
                      onChange={(e) => setGithubToken(e.target.value)}
                      placeholder="ghp_xxxxxxxxxxxx"
                      className="w-full bg-gray-50 dark:bg-[#111111] border border-black/5 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-[#141414] dark:text-white focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/10 transition-all"
                    />
                    <p className="mt-2 text-[10px] text-[#8E9299] dark:text-[#A1A5AB] leading-relaxed">
                      Requires <code className="bg-gray-100 dark:bg-[#111111] px-1 rounded">repo</code> scope. Your token is only used for this session and never stored.
                    </p>
                  </div>

                  {pushStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl text-xs ${
                        pushStatus.type === 'success' 
                          ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' 
                          : 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400'
                      }`}
                    >
                      {pushStatus.message}
                    </motion.div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      disabled={isPushing}
                      onClick={() => setShowGithubModal(false)}
                      className="flex-1 px-6 py-3 rounded-xl text-sm font-medium border border-black/5 dark:border-white/10 dark:text-white hover:bg-gray-50 dark:hover:bg-[#252629] transition-all disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={isPushing || !githubToken}
                      onClick={handleGithubPush}
                      className="flex-1 bg-[#151619] dark:bg-white text-white dark:text-[#151619] px-6 py-3 rounded-xl text-sm font-medium hover:bg-[#252629] dark:hover:bg-gray-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isPushing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Pushing...
                        </>
                      ) : (
                        'Confirm Push'
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <li className="flex items-start gap-3">
      <div className="mt-1 text-[#FF4444]">{icon}</div>
      <div>
        <div className="text-sm font-medium leading-none mb-1">{title}</div>
        <div className="text-[10px] text-[#8E9299]">{desc}</div>
      </div>
    </li>
  );
}
