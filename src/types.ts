
export interface ScriptConfig {
  version: string;
  // Core Identity
  spoofPixel11ProXL: boolean; // TARGET: Pixel 11 Pro XL (Android 17)
  spoofLocation: boolean; // US-SRE Mountain View
  enableSovereignState: boolean; // SINGULARITY: German Killer / Region Lock
  enableOmniMaximus: boolean; // v8.0.0 MAXIMUS: God Mode Headers

  // Performance & Velocity (NEW v27.7)
  enableLudicrousSpeed: boolean; // SECRET KEY: "Dark Matter" Headers
  enableHyperVelocity: boolean; // DOM: Strip animations, force GPU
  enableMainThreadLiberation: boolean; // JS: Aggressive task scheduling

  // Input & Accessibility (NEW v27)
  enableContinuousVoice: boolean; // WebSpeech API "Infinite" Dictation
  enableVoiceCommandMode: boolean; // Control UI via Voice
  enableNativeClipboard: boolean; // Enhanced Clipboard Bridge
  enableNativePrint: boolean; // Native Android Print / PDF
  enableContextSnatcher: boolean; // NEW: Clipboard/Logcat Context Analyzer
  enableHapticFeedback: boolean; // NEW: Intelligent Haptic Profiling

  // Developer Tools & Shell (NEW v27)
  enableTermuxBridge: boolean; // Share intents for Termux
  enableAShellBridge: boolean; // Intents for AShell/ADB
  enableLogConsole: boolean; // Expose debug logs to window
  
  // Intelligence & Models
  enableDeepThink: boolean;
  enableMariner: boolean;
  enableCanvasPro: boolean;
  enableUnlimitedBudget: boolean;
  enableExperimentalModels: boolean;
  enableGemini3_1Flash: boolean; // NEW: Flash 3.1 (2026)
  enableGemini3_1Pro: boolean;   // NEW: Pro 3.1 (2026)
  enableGemini3_1FlashLite: boolean; // NEW: Flash Lite 3.1
  enableGemini3_0Flash: boolean; // Legacy: Flash 3.0
  enableGemini3_0Pro: boolean;   // Legacy: Pro 3.0
  
  // Media & Labs
  enableHighFidelityMedia: boolean; // 4K/8K Nano Banana
  enableProjectAstra: boolean; // Multimodal Realtime
  
  // Commerce Nexus (NEW v24)
  enableKleinanzeigen: boolean; // Native Kleinanzeigen (DE)
  enableEbayNative: boolean; // eBay Native App
  enableAmazonBridge: boolean; // Amazon Native
  enableAliExpress: boolean; // NEW: AliExpress App
  enableIdealo: boolean; // NEW: Idealo Price Compare
  enableBilliger: boolean; // NEW: Billiger.de
  enableGeizhals: boolean; // NEW: Geizhals (EU)
  enableStripe: boolean;
  enableShopify: boolean;

  // AI Singularity Bridge
  enableBixbyFusion: boolean; // Samsung Bixby Handoff
  enableChatGPTBridge: boolean; // OpenAI Native Handoff
  enableDeepSeekBridge: boolean; // DeepSeek Native
  enableCoPilotBridge: boolean; // MS CoPilot Native
  enableGrokBridge: boolean; // xAI Grok (via X)
  
  // Cognitive Tone & Formatting
  enableToneProfessional: boolean; // Force Corporate/Formal Tone
  enableToneAcademic: boolean; // Force Academic/Citational Tone
  enableToneCreative: boolean; // Force High Temperature/Creative
  enableFormatJson: boolean; // Force JSON Output preference
  enableFormatMarkdown: boolean; // Force Heavy Markdown use
  
  // Enterprise Bridge (Core)
  enableGitHub: boolean;
  enableGitLab: boolean;
  enableDockerHub: boolean;
  enableJira: boolean;
  enableSlack: boolean;
  enableSalesforce: boolean;
  enableFigma: boolean;
  enableNotion: boolean;
  enableLinear: boolean;
  enableReplit: boolean;
  enableTrello: boolean;
  enableCloudStorage: boolean;

  // Enterprise Bridge (Extended)
  enableDiscord: boolean;
  enableZoom: boolean;
  enableTeams: boolean;
  enableAsana: boolean;
  enableMonday: boolean;
  enableClickUp: boolean;
  enableStackBlitz: boolean;
  enableCodeSandbox: boolean;
  enableTableau: boolean;
  enablePowerBI: boolean;
  enableSnowflake: boolean;
  enableHubSpot: boolean;

  // Dev Ecosystem MAX
  enableProjectIDX: boolean;
  enableGitPod: boolean;
  enableGlitch: boolean;
  enableCloudShell: boolean;
  enableKubernetes: boolean; // GKE
  enableCircleCI: boolean;
  enableTravisCI: boolean;

  // Commerce Support (Legacy)
  enableZendesk: boolean;
  enableIntercom: boolean;
  
  // Universal Media & Social
  enableSpotify: boolean;
  enableAppleMusic: boolean;
  enableNetflix: boolean;
  enableTwitch: boolean;
  enableTwitter: boolean; // X
  enableLinkedIn: boolean;
  enableReddit: boolean;
  enableInstagram: boolean;
  enableTelegram: boolean;

  // Universal Lifestyle & Finance
  enableCoinbase: boolean;
  enableRobinhood: boolean;
  enableYahooFinance: boolean;
  enableUber: boolean;
  enableAirbnb: boolean;
  enableBooking: boolean;
  enableEvernote: boolean;
  enableOneNote: boolean;
  enableTodoist: boolean;
  enableCanva: boolean;
  enableAdobeCC: boolean;
  
  // Legacy Plugins
  enableWolframAlpha: boolean;
  enableKayak: boolean;
  enableOpenTable: boolean;
  enableInstacart: boolean;
  enableZillow: boolean;
  
  // Social Bridge (Native Android)
  enableWhatsAppBridge: boolean; 
  enableMessengerBridge: boolean;
  enableSignalBridge: boolean; // Signal Private Messenger
  enableSMSBridge: boolean; // Native SMS/RCS
  
  // Omni-Ecosystem (Workspace MAX)
  enableGoogleWorkspace: boolean; // Core Bundle
  enableGoogleKeep: boolean;
  enableGoogleTasks: boolean;
  enableGoogleMeet: boolean;
  enableGoogleChat: boolean; // Google Chat / Dynamite
  enableGoogleColab: boolean; // Ecosystem
  enableAppSheet: boolean;
  enableSmartCanvas: boolean;
  enableGoogleDrive: boolean;
  
  // Workspace Granular Exports
  enableExportToDocs: boolean;
  enableExportToGmail: boolean;
  enableExportToSheets: boolean;
  enableDriveMount: boolean;

  // Granular Code & Automation Exports
  enableExportToColab: boolean;
  enableExportToReplit: boolean;
  enableExportToKaggle: boolean;
  enableExportToDeepNote: boolean;
  enableExportToGist: boolean;
  enableExportToZapier: boolean;
  enableExportToMake: boolean;
  enableExportToIFTTT: boolean;

  // Native Google Plugins
  enableGoogleFlights: boolean;
  enableGoogleHotels: boolean;
  enableGoogleMaps: boolean;
  enableYouTube: boolean;
  
  // Workspace Extended
  enableGoogleForms: boolean;
  enableGoogleSites: boolean;
  enableGoogleBlogger: boolean; // Native Draft Blogger
  enableWordPressIntegration: boolean; // WordPress Native
  enableTumblrIntegration: boolean; // Tumblr Native
  enableMediumIntegration: boolean; // Medium Native
  enableGoogleEarth: boolean;
  
  // Advanced Creative & Data
  enableGoogleVids: boolean;
  enableLookerStudio: boolean;
  
  // Developer Ecosystem
  enableAppsScript: boolean;
  enableVertexAI: boolean;
  enableFirebase: boolean;
  enableGeminiCodeAssist: boolean;
  
  enableMicrosoft365: boolean; // Generic Suite
  enableOneDrive: boolean; // Explicit OneDrive
  enableSamsungEcosystem: boolean; // General
  
  // Samsung Native Bridge (Deep Integration)
  enableSamsungNotes: boolean;
  enableSamsungGallery: boolean;
  enableSamsungReminder: boolean;
  enableSamsungCalendar: boolean;
  enableSamsungPass: boolean; // NEW
  enableSamsungWallet: boolean; // NEW
  
  // Productivity & Input
  enableAdvancedPDF: boolean;
  enableStylusOptimizations: boolean;
  enableDeXMode: boolean;
  
  // Security & Stealth
  enableSurgicalCookieSanitizer: boolean;
  enableWebRTCShield: boolean;
  enableTelemetryFirewall: boolean;
  enableCanvasNoise: boolean;
  enableAudioNoise: boolean; // Audio Context Fingerprint Noise
  
  // System & Compatibility
  enableAdGuardNightly: boolean;
  enableCanaryBuild: boolean; // Internal Canary
  
  // Billing & Quota (Danger Zone)
  enableBillingGradeBypass: boolean;
  enableBucketOverride: boolean;
  enableExtremeThinking: boolean; // 16M Token Override
  
  // Developer & Internal
  enableDeveloperTools: boolean;
  enableSREGodMode: boolean;
  enableStagingRouting: boolean;
  enableQuantumCode: boolean;
  enablePsychModel: boolean;
  enableMemoryManager: boolean;
  
  // Hardware Emulation
  enableTensorG6: boolean;
  enableNeuralCore: boolean;
  enableGPUSpoof: boolean;
  enableAudioSpoof: boolean;
  enableScreenSpoof: boolean;
  enableBatterySpoof: boolean;
  
  // Environment & Integrity
  enableIntegrityBypass: boolean;
  enableRegionShift: boolean;
  enableSIMSpoof: boolean;
  enableSamsungBypass: boolean;
  enableCookieGuard: boolean;
  enableDeepResearchV2: boolean;
  enableSafetyOverride: boolean;
  enableFutureLabs: boolean;
}

export interface FeatureFlag {
  key: string;
  label: string;
  description: string;
}
