// ==UserScript==
// @name         Google AI Identity - Golden Master Sovereign (AdGuard Android)
// @namespace    http://tampermonkey.net/
// @version      12.5 (AdGuard Optimized)
// @description  Ultimate Chrome fingerprint hardening for Google AI services - Full Sovereign Hybrid
// @author       Anonymous
// @match        https://*.google.com/*
// @match        https://gemini.google.com/*
// @match        https://ai.google.dev/*
// @match        https://aistudio.google.com/*
// @match        https://notebooklm.google.com/*
// @match        https://accounts.google.com/*
// @match        https://assistant.google.com/*
// @match        https://*.google.dev/*
// @match        https://chatgpt.com/*
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
        if (modifiedFns.has(this)) return `function ${this.name}() { [native code] }`;
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
})();