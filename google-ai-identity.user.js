// ==UserScript==
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
        if (modifiedFns.has(this)) return \`function \${this.name}() { [native code] }\