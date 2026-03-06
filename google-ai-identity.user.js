// ==UserScript==
// @name         Google AI Identity Hardener
// @namespace    http://tampermonkey.net/
// @version      12.5.3
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
// @match        https://bot.sannysoft.com/*
// @match        https://pixelscan.net/*
// @match        https://amiunique.org/*
// @match        https://browserleaks.com/*
// @match        https://coveryourtracks.eff.org/*
// @match        https://abrahamjuliot.github.io/creepjs/*
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
    const modifiedFns = new WeakSet();
    
    const newToString = new Proxy(originalToString, {
        apply(target, thisArg, args) {
            if (typeof thisArg === 'function' && modifiedFns.has(thisArg)) {
                return 'function ' + (thisArg.name || '') + '() { [native code] }';
            }
            return Reflect.apply(target, thisArg, args);
        }
    });

    Object.defineProperty(Function.prototype, 'toString', {
        value: newToString,
        configurable: true,
        enumerable: false,
        writable: true
    });

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

    // ─── 3. NAVIGATOR & CPU CONSISTENCY (Pixel 8 Pro Profile) ─────────────
    const UA = 'Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.6613.119 Mobile Safari/537.36';
    
    secureProps(navigator, 'userAgent', UA);
    secureProps(navigator, 'platform', 'Linux armv8l');
    secureProps(navigator, 'vendor', 'Google Inc.');
    secureProps(navigator, 'hardwareConcurrency', 9);
    secureProps(navigator, 'deviceMemory', 8);
    secureProps(navigator, 'maxTouchPoints', 10); // Spoofing Pixel 8 Pro
    secureProps(navigator, 'language', 'en-US');
    secureProps(navigator, 'languages', ['en-US', 'en']);
    secureProps(navigator, 'webdriver', undefined);
    secureProps(navigator, 'pdfViewerEnabled', false);

    // High-Entropy UserAgentData (Client Hints Restoration)
    if (navigator.userAgentData) {
        const getHighEntropyValues = navigator.userAgentData.getHighEntropyValues;
        navigator.userAgentData.getHighEntropyValues = protect(async (hints) => {
            const values = await getHighEntropyValues.apply(navigator.userAgentData, [hints]);
            return { 
                ...values, 
                platform: "Android", 
                architecture: "", 
                model: "Pixel 8 Pro", 
                platformVersion: "14.0.0",
                uaFullVersion: "128.0.6613.119",
                bitness: ""
            };
        });

        Object.defineProperty(Navigator.prototype, 'userAgentData', {
            get: protect(() => ({
                brands: [
                    { brand: 'Not_A Brand', version: '8' }, 
                    { brand: 'Chromium', version: '128' }, 
                    { brand: 'Google Chrome', version: '128' }
                ],
                platform: 'Android', 
                mobile: true,
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
            { kind: 'audioinput', label: 'Microphone (built-in)', deviceId: 'default', groupId: 'default' },
            { kind: 'videoinput', label: 'Camera 0, Facing back', deviceId: 'default', groupId: 'default' },
            { kind: 'videoinput', label: 'Camera 1, Facing front', deviceId: 'default', groupId: 'default' },
            { kind: 'audiooutput', label: 'Speaker (built-in)', deviceId: 'default', groupId: 'default' }
        ]);
    }

    // ─── 4. WEBGL & CANVAS STEALTH ──────────────────────────────────────────
    // Spoofs mobile GPU signature (Pixel 8 Pro Mali-G715)
    const spoofWebGL = (proto) => {
        const getParam = proto.getParameter;
        proto.getParameter = protect(function(param) {
            const mask = {
                37445: 'ARM', 
                37446: 'Mali-G715', 
                7936: 'ARM', 
                7937: 'Mali-G715' 
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

    // ─── 5. GEOMETRY & SCREEN REALISM (Pixel 8 Pro Style) ───────────────────
    // Spoofs mobile screen dimensions
    Object.defineProperties(screen, {
        height: { get: protect(() => 918) },
        width: { get: protect(() => 412) },
        availHeight: { get: protect(() => 918) },
        availWidth: { get: protect(() => 412) },
        colorDepth: { get: protect(() => 24) },
        pixelDepth: { get: protect(() => 24) }
    });
    
    try {
        Object.defineProperty(window, 'devicePixelRatio', { get: protect(() => 3.5) });
        Object.defineProperty(window, 'innerWidth', { get: protect(() => 412) });
        Object.defineProperty(window, 'innerHeight', { get: protect(() => 918) });
    } catch (e) {}

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
    // Disables ICE servers and strips IP addresses from SDP to prevent leaks
    const origPeer = window.RTCPeerConnection || window.webkitRTCPeerConnection;
    if (origPeer) {
        const PeerConnection = protect(function(config) {
            if (config) {
                config.iceServers = [];
                config.iceTransportPolicy = 'relay';
            }
            const pc = new origPeer(config);
            pc.addIceCandidate = protect(() => Promise.resolve());
            const stripSDP = (desc) => {
                if (!desc || !desc.sdp) return desc;
                desc.sdp = desc.sdp.replace(/a=candidate:.*/g, '');
                desc.sdp = desc.sdp.replace(/c=IN IP4 .*/g, 'c=IN IP4 0.0.0.0');
                return desc;
            };
            const origSetLocal = pc.setLocalDescription;
            pc.setLocalDescription = protect(function(desc) {
                return origSetLocal.apply(this, [stripSDP(desc)]);
            });
            return pc;
        });
        PeerConnection.prototype = origPeer.prototype;
        window.RTCPeerConnection = PeerConnection;
        if (window.webkitRTCPeerConnection) window.webkitRTCPeerConnection = PeerConnection;
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
