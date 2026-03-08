
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Shield, Zap, Smartphone, Rocket, Crown, Sparkles, BrainCircuit, ShoppingBag, 
  Accessibility, Brush, MessageSquare, Newspaper, Cloud, Terminal, Briefcase, 
  PenTool, Music, Archive, Skull, Search, ChevronDown, ChevronUp, RotateCcw,
  Lightbulb, Play, BookOpen, Wrench, FileText, Settings, Github,
  Loader2, XCircle, CheckCircle2, AlertCircle, Image as ImageIcon, Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Switch } from './components/Switch';
import { CodeBlock } from './components/CodeBlock';
import { VoiceCommand } from './components/VoiceCommand';
import { ClipboardTester } from './components/ClipboardTester';
import { ClipboardButton } from './components/ClipboardButton';
import { AndroidExport } from './components/AndroidExport';
import { DeviceSync } from './components/DeviceSync';
import { generateUserScript } from './utils/scriptGenerator';
import { ScriptConfig } from './types';
import { clipboardService } from './services/clipboardService';
import { sendSocketMessage, addSocketListener } from './services/socketService';
import { getActiveBridge } from './services/bridgeService';

// --- INITIAL CONFIGURATION (FULL RESTORATION) ---
export const INITIAL_CONFIG: ScriptConfig = {
  version: '27.9.23-FULL-RESTORE',
  
  // --- RECOMMENDED DEFAULTS ---
  // Core Identity & Speed
  spoofPixel11ProXL: true,
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

  // Native Google
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
  
  // Creative
  enableGoogleVids: false,
  enableLookerStudio: false,
  
  // Dev
  enableAppsScript: false,
  enableVertexAI: false,
  enableFirebase: false,
  enableGeminiCodeAssist: false,
  
  enableMicrosoft365: false,
  enableOneDrive: false,
  
  // Samsung (Rest)
  enableSamsungNotes: false,
  enableSamsungGallery: false,
  enableSamsungReminder: false,
  enableSamsungCalendar: false,
  
  // Productivity
  enableAdvancedPDF: false,
  enableStylusOptimizations: false,
  
  // Misc
  spoofLocation: false,
  enableSovereignState: false,
  
  // Security
  enableSurgicalCookieSanitizer: false,
  enableWebRTCShield: false,
  enableTelemetryFirewall: false,
  enableCanvasNoise: false,
  enableAudioNoise: false,
  
  // System
  enableAdGuardNightly: false,
  enableCanaryBuild: false,
  
  // Danger
  enableBillingGradeBypass: false,
  enableBucketOverride: false,
  enableExtremeThinking: false,
  
  // Internal
  enableDeveloperTools: false,
  enableSREGodMode: false,
  enableStagingRouting: false,
  enableQuantumCode: false,
  enablePsychModel: false,
  enableMemoryManager: false,
  
  // Hardware
  enableTensorG6: false,
  enableNeuralCore: false,
  enableGPUSpoof: false,
  enableAudioSpoof: false,
  enableScreenSpoof: false,
  enableBatterySpoof: false,
  
  // Integrity
  enableIntegrityBypass: false,
  enableRegionShift: false,
  enableSIMSpoof: false,
  enableSamsungBypass: false,
  enableCookieGuard: false,
  enableDeepResearchV2: false,
  enableSafetyOverride: false,
  enableFutureLabs: false,
};

const MERGED_SCRIPT = `${generateUserScript(INITIAL_CONFIG)}`;


// --- SECTION DEFINITIONS (FULL UI RESTORED) ---
const SECTION_DEFINITIONS = [
  {
    id: 'performance_max',
    title: 'Hyper-Performance & Velocity',
    icon: Rocket,
    color: 'text-rose-500',
    bg: 'bg-rose-950/10',
    border: 'border-rose-900/30',
    items: [
      { key: 'enableLudicrousSpeed', label: 'Engage "Ludicrous Speed" (Secret Key)' },
      { key: 'enableHyperVelocity', label: 'Hyper Velocity (Disable Animations/Transitions)' },
      { key: 'enableMainThreadLiberation', label: 'Main Thread Liberation (Aggressive Sched)' },
    ]
  },
  {
    id: 'accessibility_core',
    title: 'Adaptive Input & Shell',
    icon: Accessibility,
    color: 'text-white',
    bg: 'bg-gold-500/10',
    border: 'border-gold-500/50',
    items: [
      { key: 'enableContinuousVoice', label: 'Enable "Infinite" Dictation Mode (No Timeout)' },
      { key: 'enableContextSnatcher', label: 'Enable Context Snatcher (Clipboard/Logcat Analysis)' },
      { key: 'enableHapticFeedback', label: 'Enable Intelligent Haptic Profiling (Tactile)' },
      { key: 'enableTermuxBridge', label: 'Enable Termux/Shell Bridge (ADB Scripts)' },
      { key: 'enableAShellBridge', label: 'Enable AShell Intent Bridge' },
      { key: 'enableLogConsole', label: 'Enable Illusion Logger (Debug)' },
      { key: 'enableNativeClipboard', label: 'Enhanced Native Clipboard' },
      { key: 'enableNativePrint', label: 'Native Print / Save to PDF' },
    ]
  },
  {
    id: 'identity',
    title: 'Identity & Core (Illusion)',
    icon: Crown,
    color: 'text-gold-500',
    items: [
      { key: 'enableOmniMaximus', label: 'Enable ILLUSION-MAXIMUS (God Mode Headers)' },
      { key: 'enableSovereignState', label: 'Enable Sovereign State (Region Lock)' },
      { key: 'spoofPixel11ProXL', label: 'Spoof Pixel 11 Pro XL (Android 17) [Target]' },
      { key: 'enableCanaryBuild', label: 'Enable Canary/Internal Build (Dogfood)' },
      { key: 'enableHighFidelityMedia', label: 'Nano Banana 3 / 8K Media' },
      { key: 'enableExperimentalModels', label: 'Experimental & Labs Models' },
    ]
  },
  {
    id: 'gemini_models',
    title: 'Gemini & Veo Models (2026)',
    icon: BrainCircuit,
    color: 'text-indigo-400',
    items: [
      { key: 'enableGemini3_1Pro', label: 'Gemini 3.1 Pro' },
      { key: 'enableGemini3_1Flash', label: 'Gemini 3.1 Flash' },
      { key: 'enableGemini3_1FlashImage', label: 'Gemini 3.1 Flash Image' },
      { key: 'enableGemini3_0Pro', label: 'Gemini 3.0 Pro' },
      { key: 'enableGemini3_0Flash', label: 'Gemini 3.0 Flash' },
      { key: 'enableGemini2_5FlashImage', label: 'Gemini 2.5 Flash Image' },
      { key: 'enableGemini2_5NativeAudio', label: 'Gemini 2.5 Native Audio' },
      { key: 'enableGemini2_5TTS', label: 'Gemini 2.5 TTS' },
      { key: 'enableVeo3_1Fast', label: 'Veo 3.1 Fast' },
      { key: 'enableVeo3_1Generate', label: 'Veo 3.1 Generate' },
      { key: 'enableDeepThink', label: 'DeepThink v3 (Reasoning)' },
    ]
  },
  {
    id: 'commerce',
    title: 'Commerce Nexus (DE/Global)',
    icon: ShoppingBag,
    color: 'text-emerald-400',
    items: [
      { key: 'enableKleinanzeigen', label: 'Kleinanzeigen (No eBay) Native' },
      { key: 'enableEbayNative', label: 'eBay.de Native App' },
      { key: 'enableAmazonBridge', label: 'Amazon Native' },
      { key: 'enableAliExpress', label: 'AliExpress App (App First)' },
      { key: 'enableIdealo', label: 'Idealo Price Compare (DE)' },
      { key: 'enableBilliger', label: 'Billiger.de Price Search' },
      { key: 'enableGeizhals', label: 'Geizhals (EU Price Search)' },
      { key: 'enableShopify', label: 'Shopify' },
      { key: 'enableStripe', label: 'Stripe' },
    ]
  },
  {
    id: 'tone_style',
    title: 'Cognitive Tone & Style',
    icon: Brush,
    color: 'text-violet-400',
    items: [
      { key: 'enableToneProfessional', label: 'Force Professional/Corporate Tone' },
      { key: 'enableToneAcademic', label: 'Force Academic/Scientific Tone' },
      { key: 'enableToneCreative', label: 'Force Creative/High-Temp Tone' },
      { key: 'enableFormatJson', label: 'Force JSON Output Mode' },
      { key: 'enableFormatMarkdown', label: 'Force Rich Markdown' },
    ]
  },
  {
    id: 'native_comms',
    title: 'Native Communication & Bridge',
    icon: MessageSquare,
    color: 'text-green-400',
    items: [
      { key: 'enableWhatsAppBridge', label: 'WhatsApp Native Bridge' },
      { key: 'enableMessengerBridge', label: 'Facebook Messenger' },
      { key: 'enableSignalBridge', label: 'Signal Private Messenger' },
      { key: 'enableSMSBridge', label: 'System SMS / RCS Bridge' },
      { key: 'enableGoogleChat', label: 'Google Chat (Dynamite)' },
      { key: 'enableTeams', label: 'MS Teams Native' },
      { key: 'enableSlack', label: 'Slack Connect' },
      { key: 'enableDiscord', label: 'Discord Bridge' },
    ]
  },
  {
    id: 'publishing',
    title: 'Publishing Powerhouse',
    icon: Newspaper,
    color: 'text-orange-400',
    items: [
      { key: 'enableWordPressIntegration', label: 'WordPress Native (App)' },
      { key: 'enableGoogleBlogger', label: 'Google Blogger (Draft)' },
      { key: 'enableTumblrIntegration', label: 'Tumblr Integration' },
      { key: 'enableMediumIntegration', label: 'Medium Native' },
      { key: 'enableGoogleSites', label: 'Google Sites' },
      { key: 'enableGoogleForms', label: 'Google Forms' },
    ]
  },
  {
    id: 'samsung_ms',
    title: 'Samsung & Microsoft Native Bridge',
    icon: Smartphone,
    color: 'text-blue-400',
    items: [
      { key: 'enableSamsungEcosystem', label: 'Samsung Ecosystem (System)' },
      { key: 'enableSamsungNotes', label: 'Samsung Notes (Cloud Sync)' },
      { key: 'enableSamsungGallery', label: 'Samsung Gallery (Vision)' },
      { key: 'enableSamsungPass', label: 'Samsung Pass (Biometrics)' },
      { key: 'enableSamsungWallet', label: 'Samsung Wallet/Pay' },
      { key: 'enableSamsungReminder', label: 'Samsung Reminder' },
      { key: 'enableDeXMode', label: 'Samsung DeX Mode' },
      { key: 'enableStylusOptimizations', label: 'S-Pen Optimization' },
      { key: 'enableMicrosoft365', label: 'Microsoft 365 Suite' },
      { key: 'enableOneDrive', label: 'OneDrive (Native)' },
    ]
  },
  {
    id: 'google_eco',
    title: 'Google Ecosystem & Workspace',
    icon: Cloud,
    color: 'text-blue-400',
    items: [
      { key: 'enableGoogleWorkspace', label: 'Google Workspace Core' },
      { key: 'enableGoogleDrive', label: 'Deep Drive Mount' },
      { key: 'enableGoogleKeep', label: 'Google Keep' },
      { key: 'enableGoogleTasks', label: 'Google Tasks' },
      { key: 'enableGoogleMeet', label: 'Google Meet' },
      { key: 'enableGoogleColab', label: 'Google Colab' },
      { key: 'enableAppSheet', label: 'AppSheet' },
      { key: 'enableSmartCanvas', label: 'Smart Canvas' },
      { key: 'enableGoogleEarth', label: 'Google Earth' },
      { key: 'enableGoogleVids', label: 'Google Vids' },
      { key: 'enableAppsScript', label: 'Apps Script' },
      { key: 'enableFirebase', label: 'Firebase Console' },
      { key: 'enableVertexAI', label: 'Vertex AI' },
    ]
  },
  {
    id: 'dev_max',
    title: 'Developer Ecosystem (MAX)',
    icon: Terminal,
    color: 'text-cyan-400',
    items: [
      { key: 'enableGitHub', label: 'GitHub Enterprise' },
      { key: 'enableGitLab', label: 'GitLab Ultimate' },
      { key: 'enableDockerHub', label: 'Docker Hub' },
      { key: 'enableReplit', label: 'Replit Ecosystem' },
      { key: 'enableProjectIDX', label: 'Project IDX' },
      { key: 'enableGitPod', label: 'GitPod' },
      { key: 'enableGlitch', label: 'Glitch' },
      { key: 'enableCloudShell', label: 'Cloud Shell' },
      { key: 'enableDockerHub', label: 'Docker Hub' },
      { key: 'enableKubernetes', label: 'Kubernetes (GKE)' },
      { key: 'enableStackBlitz', label: 'StackBlitz' },
      { key: 'enableCodeSandbox', label: 'CodeSandbox' },
      { key: 'enableCircleCI', label: 'CircleCI' },
      { key: 'enableTravisCI', label: 'TravisCI' },
    ]
  },
  {
    id: 'enterprise',
    title: 'Enterprise & SaaS Bridge',
    icon: Briefcase,
    color: 'text-purple-400',
    items: [
      { key: 'enableJira', label: 'Jira Cloud' },
      { key: 'enableSalesforce', label: 'Salesforce' },
      { key: 'enableHubSpot', label: 'HubSpot' },
      { key: 'enableAsana', label: 'Asana' },
      { key: 'enableMonday', label: 'Monday.com' },
      { key: 'enableClickUp', label: 'ClickUp' },
      { key: 'enableNotion', label: 'Notion' },
      { key: 'enableLinear', label: 'Linear' },
      { key: 'enableTrello', label: 'Trello' },
    ]
  },
  {
    id: 'creative',
    title: 'Creative, Data & Commerce',
    icon: PenTool,
    color: 'text-orange-400',
    items: [
      { key: 'enableFigma', label: 'Figma Dev Mode' },
      { key: 'enableCanva', label: 'Canva' },
      { key: 'enableAdobeCC', label: 'Adobe CC' },
      { key: 'enableLookerStudio', label: 'Looker Studio' },
      { key: 'enableTableau', label: 'Tableau' },
      { key: 'enablePowerBI', label: 'PowerBI' },
      { key: 'enableSnowflake', label: 'Snowflake' },
      { key: 'enableZendesk', label: 'Zendesk' },
      { key: 'enableIntercom', label: 'Intercom' },
    ]
  },
  {
    id: 'media',
    title: 'Universal Media & Lifestyle',
    icon: Music,
    color: 'text-pink-400',
    items: [
      { key: 'enableSpotify', label: 'Spotify' },
      { key: 'enableAppleMusic', label: 'Apple Music' },
      { key: 'enableNetflix', label: 'Netflix' },
      { key: 'enableTwitch', label: 'Twitch' },
      { key: 'enableYouTube', label: 'YouTube' },
      { key: 'enableTwitter', label: 'Twitter (X)' },
      { key: 'enableReddit', label: 'Reddit' },
      { key: 'enableLinkedIn', label: 'LinkedIn' },
      { key: 'enableInstagram', label: 'Instagram' },
      { key: 'enableTelegram', label: 'Telegram' },
      { key: 'enableCoinbase', label: 'Coinbase' },
      { key: 'enableRobinhood', label: 'Robinhood' },
      { key: 'enableUber', label: 'Uber' },
      { key: 'enableAirbnb', label: 'Airbnb' },
      { key: 'enableBooking', label: 'Booking.com' },
      { key: 'enableEvernote', label: 'Evernote' },
      { key: 'enableOneNote', label: 'OneNote' },
      { key: 'enableTodoist', label: 'Todoist' },
    ]
  },
  {
    id: 'legacy',
    title: 'Legacy Plugins',
    icon: Archive,
    color: 'text-amber-400',
    items: [
      { key: 'enableWolframAlpha', label: 'Wolfram Alpha' },
      { key: 'enableKayak', label: 'Kayak' },
      { key: 'enableOpenTable', label: 'OpenTable' },
      { key: 'enableInstacart', label: 'Instacart' },
      { key: 'enableZillow', label: 'Zillow' },
      { key: 'enableGoogleFlights', label: 'Google Flights' },
      { key: 'enableGoogleHotels', label: 'Google Hotels' },
      { key: 'enableGoogleMaps', label: 'Google Maps' },
    ]
  },
  {
    id: 'danger',
    title: 'Danger Zone & Hardware',
    icon: Skull,
    color: 'text-red-400',
    bg: 'bg-red-950/10',
    border: 'border-red-900/30',
    items: [
      { key: 'enableUnlimitedBudget', label: 'Enable Unlimited Budget (Safe 2M)' },
      { key: 'enableExtremeThinking', label: 'Extreme Thinking (16M) [BANNABLE]' },
      { key: 'enableBillingGradeBypass', label: 'Billing Grade Bypass (Titanium)' },
      { key: 'enableBucketOverride', label: 'Quota Bucket Override' },
      { key: 'enableWebRTCShield', label: 'WebRTC Shield' },
      { key: 'enableTelemetryFirewall', label: 'Telemetry Firewall' },
      { key: 'enableSurgicalCookieSanitizer', label: 'Cookie Sanitizer' },
      { key: 'enableTensorG6', label: 'Emulate Tensor G6 (Mali)' },
      { key: 'enableGPUSpoof', label: 'Spoof WebGL Vendor' },
      { key: 'enableBatterySpoof', label: 'Spoof Battery API (Mobile Curve)' },
      { key: 'enableCanvasNoise', label: 'Anti-Fingerprint Canvas Noise' },
      { key: 'enableAudioNoise', label: 'Anti-Fingerprint Audio Noise' },
    ]
  }
];

const GitHubMarkdown: React.FC<{ url: string }> = ({ url }) => {
  const [content, setContent] = useState<string>('Loading...');

  useEffect(() => {
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.text();
      })
      .then(text => setContent(text))
      .catch(err => setContent(`Error loading content from GitHub: ${err.message}`));
  }, [url]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 lg:p-10 overflow-auto prose prose-invert prose-slate max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
    </div>
  );
};

const GitHubIssues: React.FC = () => {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/repos/RE3CON/Gemini-Pro/issues')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch issues');
        return res.json();
      })
      .then(data => {
        setIssues(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-slate-400 p-8 text-center">Loading issues...</div>;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/80 flex justify-between items-center">
        <h2 className="text-lg font-medium text-white flex items-center gap-2">
          <Github size={18} />
          GitHub Issues & Discussions
        </h2>
        <a 
          href="https://github.com/RE3CON/Gemini-Pro/discussions" 
          target="_blank" 
          rel="noreferrer"
          className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-slate-900 text-sm font-medium rounded-lg transition-colors"
        >
          Open Discussions
        </a>
      </div>
      <div className="divide-y divide-slate-800">
        {issues.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No open issues found.</div>
        ) : (
          issues.map(issue => (
            <a 
              key={issue.id} 
              href={issue.html_url} 
              target="_blank" 
              rel="noreferrer"
              className="block p-6 hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-white font-medium mb-1">{issue.title}</h3>
                  <div className="text-sm text-slate-400 flex items-center gap-2">
                    <span className="text-gold-400">#{issue.number}</span>
                    <span>opened by {issue.user.login}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {issue.labels.map((label: any) => (
                    <span 
                      key={label.id} 
                      className="px-2 py-1 text-[10px] rounded-full border"
                      style={{ 
                        borderColor: `#${label.color}40`, 
                        backgroundColor: `#${label.color}20`,
                        color: `#${label.color}` 
                      }}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [config, setConfig] = useState<ScriptConfig>(INITIAL_CONFIG);
  const [autoCopyEnabled, setAutoCopyEnabled] = useState(false);
  const [serverInfo, setServerInfo] = useState<{nodeVersion: string, serverType: string, startTime: number} | null>(null);
  const [generationTime, setGenerationTime] = useState(0);
  const [isPWA, setIsPWA] = useState(false);
  const [androidVersion, setAndroidVersion] = useState<string | null>(null);
  const [deviceInfo, setDeviceInfo] = useState<{manufacturer: string, model: string, platform: string}>({manufacturer: 'Unknown', model: 'Unknown', platform: 'Unknown'});
  const [browserInfo, setBrowserInfo] = useState<{name: string, version: string}>({name: 'Unknown', version: 'Unknown'});
  const [ipInfo, setIpInfo] = useState<{ip: string, city: string, country: string, vpn: boolean, lat: number, lon: number} | null>(null);
  const [connectionType, setConnectionType] = useState<string>('Unknown');
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [language, setLanguage] = useState<string>(navigator.language);
  const [theme, setTheme] = useState<'dark' | 'light'>(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const [screenRes, setScreenRes] = useState({ width: screen.width, height: screen.height });
  const [viewport, setViewport] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [timeInfo, setTimeInfo] = useState(() => {
    return { zone: Intl.DateTimeFormat().resolvedOptions().timeZone };
  });
  const [hardware, setHardware] = useState({ memory: (navigator as any).deviceMemory || 'N/A', cores: navigator.hardwareConcurrency || 'N/A', gpu: 'Loading...' });

  useEffect(() => {
    // GPU Detection
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        setHardware(prev => ({ ...prev, gpu: renderer }));
      } else {
        setHardware(prev => ({ ...prev, gpu: 'Unknown' }));
      }
    } else {
      setHardware(prev => ({ ...prev, gpu: 'Not supported' }));
    }
    // Fetch Server Info
    fetch('/api/info')
      .then(res => res.json())
      .then(data => {
        setServerInfo(data);
        setGenerationTime(Date.now() - data.startTime);
      })
      .catch(console.error);

    setIsPWA(window.matchMedia('(display-mode: standalone)').matches);
    
    // User Agent Client Hints
    if ((navigator as any).userAgentData) {
      (navigator as any).userAgentData.getHighEntropyValues(['model', 'platform', 'platformVersion'])
        .then((ua: any) => {
          const model = ua.model || 'Unknown';
          const platform = ua.platform || 'Unknown';
          const userAgentString = navigator.userAgent;
          
          let manufacturer = 'Unknown';
          const mLower = model.toLowerCase();
          const uLower = userAgentString.toLowerCase();
          
          if (mLower.startsWith('sm-') || uLower.includes('samsung')) manufacturer = 'Samsung';
          else if (mLower.includes('pixel') || uLower.includes('pixel')) manufacturer = 'Google';
          else if (mLower.includes('iphone') || mLower.includes('ipad') || uLower.includes('iphone')) manufacturer = 'Apple';
          else if (mLower.includes('redmi') || mLower.includes('mi ') || uLower.includes('xiaomi')) manufacturer = 'Xiaomi';
          else if (mLower.includes('oneplus') || uLower.includes('oneplus')) manufacturer = 'OnePlus';
          else if (mLower.includes('moto') || uLower.includes('motorola')) manufacturer = 'Motorola';
          else if (mLower.includes('sony') || uLower.includes('sony')) manufacturer = 'Sony';
          
          setDeviceInfo({ manufacturer, model, platform });
          if (ua.platformVersion) setAndroidVersion(ua.platformVersion);
        })
        .catch(console.error);
    }
    
    // Browser Detection
    const fallbackUA = () => {
      const ua = navigator.userAgent;
      let name = 'Unknown';
      let version = 'Unknown';
      if (ua.includes('Firefox/')) { name = 'Firefox'; version = ua.split('Firefox/')[1]; }
      else if (ua.includes('Edg/')) { name = 'Edge'; version = ua.split('Edg/')[1]; }
      else if (ua.includes('Chrome/')) { name = 'Chrome'; version = ua.split('Chrome/')[1].split(' ')[0]; }
      else if (ua.includes('Safari/')) { name = 'Safari'; version = ua.split('Version/')[1]?.split(' ')[0] || ua.split('Safari/')[1]; }
      setBrowserInfo({ name, version });
    };

    if ((navigator as any).userAgentData) {
      (navigator as any).userAgentData.getHighEntropyValues(['fullVersionList'])
        .then((uaData: any) => {
          if (uaData.fullVersionList && uaData.fullVersionList.length > 0) {
            // Find the main browser brand
            const browser = uaData.fullVersionList.find((b: any) => !b.brand.includes('Not A(Brand)'));
            if (browser) {
              setBrowserInfo({ name: browser.brand, version: browser.version });
            } else {
              fallbackUA();
            }
          } else {
            fallbackUA();
          }
        })
        .catch(fallbackUA);
    } else {
      fallbackUA();
    }

    // Theme & Language
    const themeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e: MediaQueryListEvent) => setTheme(e.matches ? 'dark' : 'light');
    themeQuery.addEventListener('change', handleThemeChange);
    
    setLanguage(navigator.language);
    
    // Online Status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Connection Type
    const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const updateConnection = () => {
      if (conn) {
        const type = conn.type || 'Unknown';
        const effective = conn.effectiveType || 'Unknown';
        setConnectionType(`${type} (${effective})`);
      }
    };
    if (conn) {
      updateConnection();
      conn.addEventListener('change', updateConnection);
    }
    
    // IP Info (VPN/Proxy detection)
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => setIpInfo({
        ip: data.ip, 
        city: data.city, 
        country: data.country_name,
        vpn: data.proxy || false,
        lat: data.latitude,
        lon: data.longitude
      }))
      .catch(console.error);

    // Resize & Time
    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
      setScreenRes({ width: screen.width, height: screen.height });
    };
    window.addEventListener('resize', handleResize);
    const timeInterval = setInterval(() => {
        setTimeInfo({ zone: Intl.DateTimeFormat().resolvedOptions().timeZone });
    }, 1000);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      themeQuery.removeEventListener('change', handleThemeChange);
      clearInterval(timeInterval);
    };
  }, []);

  const generatedScript = useMemo(() => {
    try {
      return generateUserScript(config);
    } catch (e) {
      console.error("Script generation failed", e);
      return "// Error generating script. Please reset configuration.";
    }
  }, [config]);

  useEffect(() => {
    const start = performance.now();
    generateUserScript(config);
    const end = performance.now();
    setGenerationTime(Math.round(end - start));
  }, [config]);

  useEffect(() => {
    if (autoCopyEnabled) {
      clipboardService.write(generatedScript).catch(console.error);
    }
  }, [generatedScript, autoCopyEnabled]);

  useEffect(() => {
    // Check clipboard permission
    navigator.permissions.query({ name: 'clipboard-read' as PermissionName })
      .then(result => {
        console.log('Clipboard read permission state:', result.state);
      })
      .catch(err => {
        console.error('Clipboard permission query not supported:', err);
      });
  }, []);

  useEffect(() => {
    addSocketListener((data) => {
      if (data.type === 'CONFIG_SYNC') {
        setConfig(data.config);
        console.log('Config synced from remote:', data.config);
      } else if (data.type === 'FRITZBOX_DATA') {
        setFritzBoxData(data);
        console.log('FritzBox data received:', data);
      }
    });
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [fritzBoxData, setFritzBoxData] = useState<any>(null);
  const [remoteVersion, setRemoteVersion] = useState<string | null>(null);
  const [isCheckingVersion, setIsCheckingVersion] = useState(false);
  const [activeTab, setActiveTab] = useState<'configurator' | 'readme' | 'troubleshooting' | 'license' | 'forum' | 'security'>('configurator');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    performance_max: false,
    accessibility_core: false,
    identity: false,
    gemini_models: false,
    commerce: false,
  });

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const [showGithubModal, setShowGithubModal] = useState(false);
  const [githubToken, setGithubToken] = useState('');
  const [githubRepo, setGithubRepo] = useState('Gemini-Pro');
  const [isPushing, setIsPushing] = useState(false);
  const [pushStatus, setPushStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isGeneratingLogo, setIsGeneratingLogo] = useState(false);
  const [toast, setToast] = useState<{ id: number; type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now();
    setToast({ id, type, message });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 10000);
  };

  const handleGenerateLogo = async () => {
    // Check for API key
    if (window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
      await window.aistudio.openSelectKey();
    }

    // 2. Aggressive Caching (Client-side)
    const cachedLogo = localStorage.getItem('re3con_cached_logo');
    if (cachedLogo) {
      setLogoUrl(cachedLogo);
      showToast('success', 'Loaded cached logo instantly!');
      return;
    }

    setIsGeneratingLogo(true);
    try {
      const response = await fetch('/api/generate-logo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ forceRefresh: false })
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        const newLogoUrl = `data:image/png;base64,${data.imageData}`;
        setLogoUrl(newLogoUrl);
        localStorage.setItem('re3con_cached_logo', newLogoUrl); // Save to cache
        showToast('success', 'Logo generated successfully!');
      } else {
        if (response.status === 401 && window.aistudio) {
          await window.aistudio.openSelectKey();
        }
        if (response.status === 429) {
          showToast('error', 'Quota exceeded for this project. Please select a different project in the API key selection dialog.');
        } else {
          showToast('error', data.details || data.error || 'Failed to generate logo.');
        }
      }
    } catch (error: any) {
      console.error('Error generating logo:', error);
      if (error.message && error.message.includes("Requested entity was not found.") && window.aistudio) {
        await window.aistudio.openSelectKey();
      }
      showToast('error', 'Network error during logo generation.');
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
    const timeoutId = setTimeout(() => controller.abort(), 300000); // 5 minute timeout

    try {
      const response = await fetch('/api/github/push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: githubToken,
          repoOwner: 'RE3CON',
          repoName: githubRepo,
          branch: githubRepo === 'Gemini-Pro' ? 'master' : 'main',
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (response.ok) {
        if (data.prUrl) {
          setPushStatus({ type: 'success', message: `Created Pull Request: ${data.prUrl}` });
          showToast('success', 'Pull Request created successfully!');
        } else {
          setPushStatus({ type: 'success', message: `Successfully pushed to RE3CON/${githubRepo}! Commit: ${data.commitSha.substring(0, 7)}` });
          showToast('success', 'Codebase successfully deployed to GitHub!');
        }
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

  const checkVersion = async () => {
    setIsCheckingVersion(true);
    try {
      // Attempt to fetch the version from the userscript on GitHub
      const response = await fetch('https://raw.githubusercontent.com/RE3CON/Gemini-Pro/master/dist/gemini-adaptive.user.js');
      if (response.ok) {
        const text = await response.text();
        const versionMatch = text.match(/@version\s+([^\n\r]+)/);
        if (versionMatch && versionMatch[1]) {
          setRemoteVersion(versionMatch[1].trim());
        }
      }
    } catch (error) {
      console.error('Error checking version:', error);
    } finally {
      setIsCheckingVersion(false);
    }
  };

  useEffect(() => {
    checkVersion();
  }, []);

  // Generate downloadable UserScript file (.user.js)
  const downloadUrl = useMemo(() => {
    try {
      const blob = new Blob([generatedScript], { type: 'text/javascript' });
      return URL.createObjectURL(blob);
    } catch (e) {
      console.error("Blob creation failed", e);
      return '#';
    }
  }, [generatedScript]);

  // Cleanup object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (downloadUrl && downloadUrl !== '#') {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  const toggle = (key: keyof ScriptConfig) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const applyProfile = (profileType: 'max' | 'samsung' | 'stealth' | 'reset') => {
    switch (profileType) {
      case 'max':
        setConfig(prev => ({ 
          ...INITIAL_CONFIG, 
          enableOmniMaximus: true, 
          enableUnlimitedBudget: true,
          enableGemini3_0Pro: true, 
          enableGemini3_0Flash: true,
          enableLudicrousSpeed: true,
          enableHyperVelocity: true,
          enableExtremeThinking: true
        }));
        break;
      case 'samsung':
        setConfig(prev => ({
          ...INITIAL_CONFIG,
          // S24 Ultra Native Mix (2026 Edition - v24.0)
          spoofPixel11ProXL: true,
          enableGemini3_0Pro: true, 
          enableSamsungEcosystem: true,
          enableSamsungNotes: true,
          enableSamsungGallery: true,
          enableSamsungPass: true,
          enableSamsungWallet: true,
          enableDeXMode: true,
          enableStylusOptimizations: true,
          // New S24 Specifics
          enableBixbyFusion: true, // Samsung Native
          enableKleinanzeigen: true, // Popular in DE
          enableEbayNative: true,
          enableIdealo: true, // DE Price Check
          enableBilliger: true,
          enableAliExpress: true, // App Support
          enableToneProfessional: true, // S24 Business Target
          enableWhatsAppBridge: true,
          enableNativePrint: true,
          enableNativeClipboard: true,
          enableContextSnatcher: true,
          enableContinuousVoice: true,
          enableTermuxBridge: true,
          spoofLocation: false,
        }));
        break;
      case 'stealth':
        setConfig(prev => ({
          ...INITIAL_CONFIG,
          enableOmniMaximus: false,
          enableTelemetryFirewall: true,
          enableWebRTCShield: true,
          enableAudioNoise: true,
          enableCanvasNoise: true,
          enableSurgicalCookieSanitizer: true,
          enableSovereignState: false, 
        }));
        break;
      case 'reset':
        setConfig(INITIAL_CONFIG);
        break;
    }
  };

  const filteredSections = useMemo(() => {
    if (!searchQuery) return SECTION_DEFINITIONS;
    return SECTION_DEFINITIONS.map(section => ({
      ...section,
      items: section.items.filter(item => 
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.key.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(section => section.items.length > 0);
  }, [searchQuery]);

  const suggestions = useMemo(() => {
    const list = [];
    
    // PRIORITY 1: VELOCITY & GEAR SHIFT
    if (!config.enableLudicrousSpeed) {
        list.push("⚡ WARNING: Sub-optimal velocity. Engage 'Ludicrous Speed' with Secret Key for maximum throughput.");
    } else {
        list.push("🚀 LUDICROUS SPEED: Secret Key injected. Latency Class: Zero Tolerance.");
    }

    if (!config.enableHyperVelocity) {
        list.push("🐢 DRAG DETECTED: Animations are slowing you down. Enable Hyper Velocity.");
    }

    if (config.enableMainThreadLiberation) {
        list.push("��� UNCHAINED: Main thread scheduler overridden for aggressive execution.");
    }

    // THINKING BUDGET & CONFLICTS
    if (config.enableUnlimitedBudget && !config.enableExtremeThinking) {
        list.push("⚙️ GEAR SHIFT: Enable 'Extreme Thinking' to unlock full 16M token velocity.");
    }
    if (config.enableExtremeThinking) {
        list.push("🧠 EXTREME THINKING: 16M Token Limit Override Active. Monitor quota.");
    }
    if (config.enableExtremeThinking && !config.enableUnlimitedBudget) {
        list.push("⚠️ LOGIC ERROR: Extreme Thinking requires Unlimited Budget to be effective.");
    }

    // REGION CONFLICTS
    if (config.enableSovereignState && !config.spoofLocation) {
        list.push("⚠️ GEO CONFLICT: 'Sovereign State' (US Lock) is ineffective without 'Spoof Location'.");
    }

    // ACCESSIBILITY & INPUT
    if (config.enableContinuousVoice) list.push("🎙️ INFINITE DICTATION: WebSpeech API Lock active.");
    if (config.enableTermuxBridge) list.push("📟 SHELL LINK: Termux Intent Bridge ready.");
    
    // IDENTITY & SECURITY
    if (config.enableOmniMaximus) list.push("👑 ILLUSION-MAXIMUS: God Mode Headers injected.");
    
    // MODELS
    if (config.enableGemini3_0Pro) list.push("✨ GEMINI 3.0: 2026 Preview Models selected.");

    // HYBRID
    if (config.spoofPixel11ProXL && config.enableSamsungEcosystem) list.push("📱 HYBRID IDENTITY: Pixel 11 Pro XL + S24 Ultra Fusion.");
    
    // STEALTH
    if (config.enableCanvasNoise || config.enableAudioNoise) list.push("👻 STEALTH MATRIX: Fingerprinting noise generators active.");

    if (config.enableKleinanzeigen) list.push("🛍️ COMMERCE NEXUS: 'Sell on Kleinanzeigen' Intent Active.");
    
    if (!config.enableLogConsole) list.push("🔧 DIAGNOSTICS: Enable 'Illusion Logger' to track gear shifts.");

    return list;
  }, [config]);

  return (
    <div className={`min-h-screen flex flex-col bg-space-950 text-slate-200 p-4 md:p-8 font-sans selection:bg-gold-500/30 ${config.enableLudicrousSpeed ? 'selection:bg-rose-500/30' : ''}`}>
      {/* Global Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl bg-slate-800 border border-slate-700"
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            {toast.type === 'error' && <XCircle className="w-5 h-5 text-rose-500" />}
            {toast.type === 'info' && <AlertCircle className="w-5 h-5 text-blue-500" />}
            <span className="text-sm font-medium text-white">{toast.message}</span>
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
              className="relative w-full max-w-md bg-slate-900 rounded-3xl p-8 shadow-2xl overflow-hidden border border-slate-800"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-black">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Push to GitHub</h2>
                  <p className="text-xs text-slate-400">Deploy current codebase to your repository</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1.5">
                    Target Repository
                  </label>
                  <select
                    value={githubRepo}
                    onChange={(e) => setGithubRepo(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-slate-700 transition-all appearance-none"
                  >
                    <option value="Gemini-Pro">RE3CON/Gemini-Pro (master)</option>
                    <option value="Gemini-AI">RE3CON/Gemini-AI (main)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1.5">
                    GitHub Personal Access Token
                  </label>
                  <input
                    type="password"
                    value={githubToken}
                    onChange={(e) => setGithubToken(e.target.value)}
                    placeholder="ghp_xxxxxxxxxxxx"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-slate-700 transition-all"
                  />
                  <p className="mt-2 text-[10px] text-slate-400 leading-relaxed">
                    Requires <code className="bg-slate-800 px-1 rounded">repo</code> scope. Your token is only used for this session and never stored.
                  </p>
                </div>

                {pushStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl text-xs ${
                      pushStatus.type === 'success' 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-rose-500/10 text-rose-400'
                    }`}
                  >
                    {pushStatus.message}
                  </motion.div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    disabled={isPushing}
                    onClick={() => setShowGithubModal(false)}
                    className="flex-1 px-6 py-3 rounded-xl text-sm font-medium border border-slate-800 text-white hover:bg-slate-800 transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isPushing || !githubToken}
                    onClick={handleGithubPush}
                    className="flex-1 bg-white text-black px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
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

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Header & Config Column */}
        <div className={`${activeTab === 'configurator' ? 'lg:col-span-6' : 'lg:col-span-12'} space-y-6 transition-all duration-300`}>
          
          {/* Brand Card */}
          <div className={`bg-slate-900/50 border ${config.enableLudicrousSpeed ? 'border-rose-500/50 shadow-rose-900/20' : 'border-gold-500/20'} rounded-xl p-6 backdrop-blur-sm relative overflow-hidden transition-all duration-500`}>
            <div className={`absolute top-0 right-0 w-32 h-32 ${config.enableLudicrousSpeed ? 'bg-rose-500/5' : 'bg-gold-500/5'} rounded-full blur-3xl -mr-16 -mt-16 transition-colors duration-500`}></div>
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 ${config.enableLudicrousSpeed ? 'bg-rose-500/10 border-rose-500/20' : 'bg-gold-500/10 border-gold-500/20'} rounded-lg border transition-colors duration-500`}>
                {logoUrl ? (
                  <img src={logoUrl} alt="App Logo" className="w-6 h-6 object-contain drop-shadow-sm" referrerPolicy="no-referrer" />
                ) : (
                  <Accessibility className={config.enableLudicrousSpeed ? "text-rose-400" : "text-gold-400"} size={24} />
                )}
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">Gemini Adaptive Suite</h1>
                <div className="flex items-center gap-2">
                  <p className={`text-xs ${config.enableLudicrousSpeed ? 'text-rose-500/80' : 'text-gold-500/80'} font-mono tracking-widest uppercase transition-colors duration-500`}>
                    Accessibility, Voice & Native Shell / v{config.version.split('-')[0]}
                  </p>
                  <button 
                    onClick={checkVersion}
                    disabled={isCheckingVersion}
                    className={`p-1 rounded-md hover:bg-white/10 transition-colors ${isCheckingVersion ? 'animate-spin' : ''}`}
                    title="Check for updates on GitHub"
                  >
                    <RotateCcw size={10} className={config.enableLudicrousSpeed ? 'text-rose-400' : 'text-gold-400'} />
                  </button>
                  <button
                    onClick={handleGenerateLogo}
                    disabled={isGeneratingLogo}
                    className={`p-1 rounded-md hover:bg-white/10 transition-colors disabled:opacity-50`}
                    title="Generate Logo"
                  >
                    {isGeneratingLogo ? <Loader2 size={10} className="animate-spin text-blue-400" /> : <ImageIcon size={10} className="text-blue-400" />}
                  </button>
                  {remoteVersion && remoteVersion !== config.version && (
                    <span className="text-[9px] bg-rose-500 text-white px-1.5 py-0.5 rounded-full animate-pulse font-bold">NEW</span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                  <a href="https://re3con.github.io/Gemini-Pro/" target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:text-blue-300 hover:underline inline-block">
                    🌐 Official Website
                  </a>
                  <a href="https://github.com/RE3CON/Gemini-Pro/discussions" target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:text-blue-300 hover:underline inline-block">
                    💬 Community Forum
                  </a>
                  <a href="https://github.com/RE3CON/Gemini-Pro/projects?query=is%3Aopen" target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:text-blue-300 hover:underline inline-block">
                    📁 AI Projects
                  </a>
                </div>
              </div>
            </div>
            
            {/* Quick Profiles */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
              <button onClick={() => applyProfile('max')} className="px-3 py-2 bg-slate-800 hover:bg-gold-600/20 border border-slate-700 hover:border-gold-500/50 rounded-lg text-xs font-medium transition-all flex flex-col items-center gap-1 group">
                <Zap size={14} className="text-gold-400 group-hover:text-gold-300" />
                <span>God Mode</span>
              </button>
              <button onClick={() => applyProfile('samsung')} className="px-3 py-2 bg-slate-800 hover:bg-blue-600/20 border border-slate-700 hover:border-blue-500/50 rounded-lg text-xs font-medium transition-all flex flex-col items-center gap-1 group">
                <Smartphone size={14} className="text-blue-400 group-hover:text-blue-300" />
                <span>S24 Ultra</span>
              </button>
              <button onClick={() => applyProfile('stealth')} className="px-3 py-2 bg-slate-800 hover:bg-green-600/20 border border-slate-700 hover:border-green-500/50 rounded-lg text-xs font-medium transition-all flex flex-col items-center gap-1 group">
                <Shield size={14} className="text-green-400 group-hover:text-green-300" />
                <span>Stealth</span>
              </button>
              <button onClick={() => applyProfile('reset')} className="px-3 py-2 bg-slate-800 hover:bg-red-600/20 border border-slate-700 hover:border-red-500/50 rounded-lg text-xs font-medium transition-all flex flex-col items-center gap-1 group">
                <RotateCcw size={14} className="text-red-400 group-hover:text-red-300" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto hide-scrollbar bg-slate-900 border border-slate-800 rounded-xl p-1 gap-1">
            <button 
              onClick={() => setActiveTab('configurator')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'configurator' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              <Settings size={16} /> Configurator
            </button>
            <button 
              onClick={() => setActiveTab('readme')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'readme' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              <BookOpen size={16} /> Readme
            </button>
            <button 
              onClick={() => setActiveTab('troubleshooting')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'troubleshooting' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              <Wrench size={16} /> Troubleshooting
            </button>
            <button 
              onClick={() => setActiveTab('license')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'license' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              <FileText size={16} /> License
            </button>
            <button 
              onClick={() => setActiveTab('forum')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'forum' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              <MessageSquare size={16} /> Forum / Issues
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'security' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              <Shield size={16} /> Security
            </button>
          </div>

          {activeTab === 'configurator' && (
            <div className="mb-6 flex items-center justify-between bg-slate-800/50 p-4 rounded-xl border border-slate-700">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Copy size={18} className="text-indigo-400" />
                  <span className="text-sm text-slate-200">Auto-Copy Script</span>
                  <Switch checked={autoCopyEnabled} onChange={setAutoCopyEnabled} />
                </div>
                <DeviceSync onSync={() => sendSocketMessage('CONFIG_SYNC', { config })} />
              </div>
            </div>
          )}
          {activeTab === 'configurator' && (
            <>
              {/* Search Bar */}
              <div className="relative sticky top-4 z-10">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search flags (e.g., 'Termux', 'Voice', 'Bixby')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl leading-5 bg-slate-900 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 sm:text-sm shadow-xl"
                />
              </div>

              {/* Configuration Grid */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            {filteredSections.map((section) => {
               const Icon = section.icon;
               const isOpen = openSections[section.id] || searchQuery.length > 0;
               const activeCount = section.items.filter(i => config[i.key as keyof ScriptConfig]).length;
               
               return (
                 <div key={section.id} className={`border-b border-slate-800 last:border-0 ${section.bg || ''} ${section.border ? `border ${section.border} m-1 rounded-lg` : ''}`}>
                   <button 
                     onClick={() => toggleSection(section.id)}
                     className={`w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors ${isOpen ? 'bg-slate-800/30' : ''}`}
                   >
                     <div className="flex items-center gap-3">
                       <Icon size={16} className={section.color} />
                       <div className="text-left">
                         <h3 className="text-sm font-semibold text-slate-200">{section.title}</h3>
                         <span className="text-[10px] text-slate-500 uppercase tracking-wider">{activeCount} / {section.items.length} Active</span>
                       </div>
                     </div>
                     {isOpen ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
                   </button>
                   
                   {isOpen && (
                     <div className="px-6 py-2 pb-6 space-y-1 animate-in slide-in-from-top-2 duration-200">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                         {section.items.map((item) => (
                           <Switch 
                             key={item.key} 
                             checked={config[item.key as keyof ScriptConfig] as boolean} 
                             onChange={() => toggle(item.key as keyof ScriptConfig)} 
                             label={item.label} 
                           />
                         ))}
                       </div>
                     </div>
                   )}
                 </div>
               );
            })}
            
            {filteredSections.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                <Search size={32} className="mx-auto mb-2 opacity-50" />
                <p>No flags found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
          </>
          )}

          {activeTab === 'readme' && (
            <GitHubMarkdown url="https://raw.githubusercontent.com/RE3CON/Gemini-Pro/master/README.md" />
          )}

          {activeTab === 'troubleshooting' && (
            <div className="space-y-6">
              <ClipboardTester />
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-xl">
                <h2 className="text-lg font-semibold text-white mb-4">Hardware Control</h2>
                <div className="flex gap-4">
                  <button onClick={() => getActiveBridge().hardware.setDeXMode(true)} className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600">Toggle DeX Mode</button>
                  <button onClick={() => getActiveBridge().hardware.setBatteryOptimization(true)} className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600">Toggle Battery Opt</button>
                </div>
              </div>
              <GitHubMarkdown url="https://raw.githubusercontent.com/RE3CON/Gemini-Pro/master/TROUBLESHOOTING.md" />
            </div>
          )}

          {activeTab === 'license' && (
            <GitHubMarkdown url="https://raw.githubusercontent.com/RE3CON/Gemini-Pro/master/LICENSE" />
          )}

          {activeTab === 'security' && (
            <GitHubMarkdown url="https://raw.githubusercontent.com/RE3CON/Gemini-Pro/master/SECURITY.md" />
          )}

          {activeTab === 'forum' && (
            <GitHubIssues />
          )}
        </div>

        {/* Preview Column */}
        {activeTab === 'configurator' && (
        <div className="lg:col-span-6 flex flex-col">
          <div className="mb-4 flex items-center justify-between">
             <div className="flex items-center gap-2">
               <Smartphone className="text-slate-400" size={18} />
               <h2 className="text-lg font-medium text-white">Final Script</h2>
             </div>
             <div className="flex gap-2">
                 <div className="text-xs text-slate-500 font-mono py-1.5">v{config.version.split('-')[0]}</div>
             </div>
          </div>
          
           {/* Suggestions Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mb-6 shadow-lg">
             <div className="px-6 py-3 border-b border-slate-800 bg-slate-900/80">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Lightbulb size={12} className="text-yellow-400" />
                  Illusion Insights
                </h2>
             </div>
             <div className="p-4 bg-slate-900/50">
                <ul className="space-y-2">
                   {suggestions.map((suggestion, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                         <span className="block w-1 h-1 rounded-full bg-gold-500 mt-1.5 shrink-0"></span>
                         {suggestion}
                      </li>
                   ))}
                   {suggestions.length === 0 && (
                      <li className="text-xs text-slate-500 italic">Configuration looks optimal. No critical suggestions.</li>
                   )}
                </ul>
             </div>
          </div>

          <div className="flex-grow">
            <div className="flex flex-col items-center justify-center my-4 gap-3">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a 
                  href="https://github.com/RE3CON/Gemini-Pro/raw/master/dist/gemini-adaptive.user.js"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-green-900/20 hover:shadow-green-900/40 hover:scale-[1.02]"
                >
                  <Play size={18} fill="currentColor" />
                  <span>Install Default Script</span>
                </a>
                <a 
                  href={downloadUrl}
                  download="gemini-adaptive.user.js"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gold-600 hover:bg-gold-500 text-black text-sm font-bold rounded-xl transition-all shadow-lg shadow-gold-900/20 hover:shadow-gold-900/40 hover:scale-[1.02]"
                >
                  <FileText size={18} fill="currentColor" />
                  <span>Download Custom Script</span>
                </a>
                <button 
                  onClick={() => setShowGithubModal(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40 hover:scale-[1.02]"
                >
                  <Github size={18} fill="currentColor" />
                  <span>Push to GitHub</span>
                </button>
              </div>
              <p className="mt-3 text-[10px] text-orange-600 text-center max-w-md">
                <strong>Note:</strong> This is a coding test built with the genius Gemini Coding Assistant! Many advanced features shown here are UI placebos. True UA spoofing and complete control of Chrome on Android actually require <strong>ADB commands</strong> (which mostly make temporary changes in RAM). Most importantly, on Android without root, the <code>Local State</code> file is the real control center for Chrome-based browsers (especially since Developer Tools are not available in the mobile browser). You must modify this file alongside utilizing internal <code>chrome://</code> URLs, flags, and debug menus. <br/><br/>
                <em>Stay tuned: This project will soon pivot to share real AI tips, tricks, and special offers!</em>
              </p>
            </div>
            <CodeBlock code={generatedScript} />
            <VoiceCommand />
            <ClipboardButton scriptContent={generatedScript} />
          </div>

          <AndroidExport scriptContent={generatedScript} userAgent={config.spoofPixel11ProXL ? "Mozilla/5.0 (Linux; Android 17; Pixel 11 Pro XL Build/CP21.260116.011.A1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36" : navigator.userAgent} />
        </div>
        )}
        <footer className="mt-8 mb-4 mx-4 p-3 border border-slate-700 rounded-xl bg-slate-950 text-[8px] sm:text-[9px] text-slate-400 font-mono shadow-lg">
          <div className="mb-2 font-bold text-slate-200 uppercase tracking-wider">System & Network Diagnostics</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
            <div className="flex flex-col gap-1">
              <span><span className="text-slate-500">Device:</span> {deviceInfo.manufacturer} {deviceInfo.model} ({deviceInfo.platform})</span>
              <span><span className="text-slate-500">Android:</span> {androidVersion || 'N/A'}</span>
              <span><span className="text-slate-500">Browser:</span> {browserInfo.name} {browserInfo.version}</span>
              <span><span className="text-slate-500">Status:</span> {isOnline ? '🟢 Online' : '🔴 Offline'}</span>
              <span><span className="text-slate-500">Conn:</span> {connectionType}</span>
              <span><span className="text-slate-500">VPN:</span> {ipInfo?.vpn ? 'Yes' : 'No'}</span>
              <span><span className="text-slate-500">IP:</span> {ipInfo?.ip || 'Loading...'}</span>
              <span><span className="text-slate-500">Loc:</span> {ipInfo ? `${ipInfo.city}, ${ipInfo.country}` : 'Loading...'}</span>
              <span><span className="text-slate-500">Coords:</span> {ipInfo ? `${ipInfo.lat}, ${ipInfo.lon}` : 'Loading...'}</span>
              <span><span className="text-slate-500">Lang:</span> {language}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span><span className="text-slate-500">Theme:</span> {theme}</span>
              <span><span className="text-slate-500">HW:</span> {hardware.memory}GB RAM, {hardware.cores} Cores</span>
              <span className="break-all"><span className="text-slate-500">GPU/Chip:</span> {hardware.gpu}</span>
              <span className="break-all"><span className="text-slate-500">URL:</span> {window.location.origin}</span>
              <span><span className="text-slate-500">Engine:</span> Vite</span>
              <span><span className="text-slate-500">Server:</span> Nginx</span>
              <span><span className="text-slate-500">Node:</span> {serverInfo?.nodeVersion || 'Loading...'}</span>
              <span><span className="text-slate-500">Env:</span> {(import.meta as any).env?.MODE || 'development'}</span>
              <span><span className="text-slate-500">Zone:</span> {timeInfo.zone}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
