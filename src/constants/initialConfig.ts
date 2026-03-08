import { ScriptConfig } from '../types';

export const INITIAL_CONFIG: ScriptConfig = {
  version: '27.9.23-FULL-RESTORE',
  
  // --- RECOMMENDED DEFAULTS ---
  // Core Identity & Speed
  spoofPixel11ProXL: true,
  spoofLocation: false,
  enableSovereignState: false,
  enableOmniMaximus: true,
  enableLudicrousSpeed: true,
  enableHyperVelocity: true,
  enableMainThreadLiberation: true,

  // Ecosystem & Bridges (Silent/Invisible)
  enableSamsungEcosystem: true, 
  enableSamsungPass: true,
  enableSamsungWallet: true,
  enableDeXMode: true,
  enableWhatsAppBridge: true,
  enableGoogleWorkspace: true,
  enableGoogleDrive: true,
  enableYouTube: true,

  // Models
  enableGemini3_1Flash: true,
  enableGemini3_1Pro: true,
  enableGemini3_1FlashImage: true,
  enableGemini3_0Flash: true,
  enableGemini3_0Pro: true,
  enableGemini2_5FlashImage: true,
  enableGemini2_5NativeAudio: true,
  enableGemini2_5TTS: true,
  enableVeo3_1Fast: true,
  enableVeo3_1Generate: true,
  enableDeepThink: true,
  enableHighFidelityMedia: true,
  
  // Input
  enableNativeClipboard: true, 
  enableNativePrint: false,
  enableHapticFeedback: true,
  enableContinuousVoice: true,
  enableContextSnatcher: true,
  enableVoiceCommandMode: true,
  enableLogConsole: false,
  
  // Dev
  enableTermuxBridge: true,
  enableAShellBridge: false,
  
  // Models Legacy (Disabled)
  enableMariner: false,
  enableCanvasPro: false,
  enableUnlimitedBudget: false,
  enableExperimentalModels: false,
  enableProjectAstra: false,
  
  // Commerce
  enableKleinanzeigen: false,
  enableEbayNative: false,
  enableAmazonBridge: false,
  enableAliExpress: false,
  enableIdealo: false,
  enableBilliger: false,
  enableGeizhals: false,
  enableStripe: false,
  enableShopify: false,

  // AI Bridge
  enableBixbyFusion: false,
  enableChatGPTBridge: false,
  enableDeepSeekBridge: false,
  enableCoPilotBridge: false,
  enableGrokBridge: false,
  
  // Tone
  enableToneProfessional: false,
  enableToneAcademic: false,
  enableToneCreative: false,
  enableFormatJson: false,
  enableFormatMarkdown: false,
  
  // Enterprise Core
  enableGitHub: false,
  enableGitLab: false,
  enableDockerHub: false,
  enableJira: false,
  enableSlack: false,
  enableSalesforce: false,
  enableFigma: false,
  enableNotion: false,
  enableLinear: false,
  enableReplit: false,
  enableTrello: false,
  enableCloudStorage: false,

  // Enterprise Extended
  enableDiscord: false,
  enableZoom: false,
  enableTeams: false,
  enableAsana: false,
  enableMonday: false,
  enableClickUp: false,
  enableStackBlitz: false,
  enableCodeSandbox: false,
  enableTableau: false,
  enablePowerBI: false,
  enableSnowflake: false,
  enableHubSpot: false,

  // Dev Max
  enableProjectIDX: false,
  enableGitPod: false,
  enableGlitch: false,
  enableCloudShell: false,
  enableKubernetes: false,
  enableCircleCI: false,
  enableTravisCI: false,

  // Commerce Support (Legacy)
  enableZendesk: false,
  enableIntercom: false,
  
  // Media
  enableSpotify: false,
  enableAppleMusic: false,
  enableNetflix: false,
  enableTwitch: false,
  enableTwitter: false,
  enableLinkedIn: false,
  enableReddit: false,
  enableInstagram: false,
  enableTelegram: false,

  // Lifestyle
  enableCoinbase: false,
  enableRobinhood: false,
  enableYahooFinance: false,
  enableUber: false,
  enableAirbnb: false,
  enableBooking: false,
  enableEvernote: false,
  enableOneNote: false,
  enableTodoist: false,
  enableCanva: false,
  enableAdobeCC: false,
  
  // Legacy
  enableWolframAlpha: false,
  enableKayak: false,
  enableOpenTable: false,
  enableInstacart: false,
  enableZillow: false,
  
  // Social
  enableMessengerBridge: false,
  enableSignalBridge: false,
  enableSMSBridge: false,
  
  // Workspace
  enableGoogleKeep: false,
  enableGoogleTasks: false,
  enableGoogleMeet: false,
  enableGoogleChat: false,
  enableGoogleColab: false,
  enableAppSheet: false,
  enableSmartCanvas: false,
  
  // Exports
  enableExportToDocs: false,
  enableExportToGmail: false,
  enableExportToSheets: false,
  enableDriveMount: false,
  enableExportToColab: false,
  enableExportToReplit: false,
  enableExportToKaggle: false,
  enableExportToDeepNote: false,
  enableExportToGist: false,
  enableExportToZapier: false,
  enableExportToMake: false,
  enableExportToIFTTT: false,
  
  // Native Google Plugins
  enableGoogleFlights: false,
  enableGoogleHotels: false,
  enableGoogleMaps: false,
  
  // Workspace Extended
  enableGoogleForms: false,
  enableGoogleSites: false,
  enableGoogleBlogger: false,
  enableWordPressIntegration: false,
  enableTumblrIntegration: false,
  enableMediumIntegration: false,
  enableGoogleEarth: false,
  
  // Advanced Creative & Data
  enableGoogleVids: false,
  enableLookerStudio: false,
  
  // Developer Ecosystem
  enableAppsScript: false,
  enableVertexAI: false,
  enableFirebase: false,
  enableGeminiCodeAssist: false,
  
  enableMicrosoft365: false,
  enableOneDrive: false,
  
  // Samsung Native Bridge
  enableSamsungNotes: false,
  enableSamsungGallery: false,
  enableSamsungReminder: false,
  enableSamsungCalendar: false,
  
  // Productivity & Input
  enableAdvancedPDF: false,
  enableStylusOptimizations: false,
  
  // Security & Stealth
  enableSurgicalCookieSanitizer: false,
  enableWebRTCShield: false,
  enableTelemetryFirewall: false,
  enableCanvasNoise: false,
  enableAudioNoise: false,
  
  // System & Compatibility
  enableAdGuardNightly: false,
  enableCanaryBuild: false,
  
  // Billing & Quota
  enableBillingGradeBypass: false,
  enableBucketOverride: false,
  enableExtremeThinking: false,
  
  // Developer & Internal
  enableDeveloperTools: false,
  enableSREGodMode: false,
  enableStagingRouting: false,
  enableQuantumCode: false,
  enablePsychModel: false,
  enableMemoryManager: false,
  
  // Hardware Emulation
  enableTensorG6: false,
  enableNeuralCore: false,
  enableGPUSpoof: false,
  enableAudioSpoof: false,
  enableScreenSpoof: false,
  enableBatterySpoof: false,
  
  // Environment & Integrity
  enableIntegrityBypass: false,
  enableRegionShift: false,
  enableSIMSpoof: false,
  enableSamsungBypass: false,
  enableCookieGuard: false,
  enableDeepResearchV2: false,
  enableSafetyOverride: false,
  enableFutureLabs: false,
  
  // Advanced ADB Spoofing & Chrome Flag Injection
  enableCommandLineOnNonRootedDevices: false,
  commandLineArguments: '--disable-gpu --disable-web-rtc --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"',
};
