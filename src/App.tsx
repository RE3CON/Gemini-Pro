
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Shield, Zap, Smartphone, Rocket, Crown, Sparkles, BrainCircuit, ShoppingBag, 
  Accessibility, Brush, MessageSquare, Newspaper, Cloud, Terminal, Briefcase, 
  PenTool, Music, Archive, Skull, Search, ChevronDown, ChevronUp, RotateCcw,
  Lightbulb, Play, BookOpen, Wrench, FileText, Settings, Github, Copy, Check,
  Loader2, XCircle, CheckCircle2, AlertCircle, Image as ImageIcon, Download,
  Maximize, Minimize, AppWindow, Key
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GoogleGenAI } from '@google/genai';

import { Switch } from './components/Switch';
import { CodeBlock } from './components/CodeBlock';
import { AndroidExport } from './components/AndroidExport';
import { generateUserScript } from './utils/scriptGenerator';
import { ScriptConfig } from './types';

// --- INITIAL CONFIGURATION (FULL RESTORATION) ---
const INITIAL_CONFIG: ScriptConfig = {
  version: '27.9.23-FULL-RESTORE',
  
  // --- RECOMMENDED DEFAULTS ---
  spoofPixel11ProXL: true,
  enableOmniMaximus: true,
  enableLudicrousSpeed: true,
  enableHyperVelocity: true,
  enableMainThreadLiberation: true,

  enableSamsungEcosystem: true, 
  enableSamsungPass: true,
  enableSamsungWallet: true,
  enableDeXMode: true,
  enableWhatsAppBridge: true,
  enableGoogleWorkspace: true,
  enableGoogleDrive: true,
  enableYouTube: true,

  enableGemini3_0Pro: true,
  enableGemini3_0Flash: true,
  enableDeepThink: true,
  enableHighFidelityMedia: true,
  
  enableNativeClipboard: true, 
  enableNativePrint: false,
  enableHapticFeedback: true,
  enableContinuousVoice: false,
  enableContextSnatcher: false,
  enableVoiceCommandMode: false,
  enableLogConsole: false,

  enableTermuxBridge: true,
  enableAShellBridge: false,
  
  enableMariner: false,
  enableCanvasPro: false,
  enableUnlimitedBudget: false,
  enableExperimentalModels: false,
  enableGemini2_0Flash: false,
  enableGemini2_0Pro: false,
  enableProjectAstra: false,
  
  enableKleinanzeigen: false,
  enableEbayNative: false,
  enableAmazonBridge: false,
  enableAliExpress: false,
  enableIdealo: false,
  enableBilliger: false,
  enableGeizhals: false,
  enableStripe: false,
  enableShopify: false,

  enableBixbyFusion: false,
  enableChatGPTBridge: false,
  enableDeepSeekBridge: false,
  enableCoPilotBridge: false,
  enableGrokBridge: false,
  
  enableToneProfessional: false,
  enableToneAcademic: false,
  enableToneCreative: false,
  enableFormatJson: false,
  enableFormatMarkdown: false,
  
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

  enableProjectIDX: false,
  enableGitPod: false,
  enableGlitch: false,
  enableCloudShell: false,
  enableKubernetes: false,
  enableCircleCI: false,
  enableTravisCI: false,

  enableZendesk: false,
  enableIntercom: false,
  
  enableSpotify: false,
  enableAppleMusic: false,
  enableNetflix: false,
  enableTwitch: false,
  enableTwitter: false,
  enableLinkedIn: false,
  enableReddit: false,
  enableInstagram: false,
  enableTelegram: false,

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
  
  enableWolframAlpha: false,
  enableKayak: false,
  enableOpenTable: false,
  enableInstacart: false,
  enableZillow: false,
  
  enableMessengerBridge: false,
  enableSignalBridge: false,
  enableSMSBridge: false,
  
  enableGoogleKeep: false,
  enableGoogleTasks: false,
  enableGoogleMeet: false,
  enableGoogleChat: false,
  enableGoogleColab: false,
  enableAppSheet: false,
  enableSmartCanvas: false,
  
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

  enableGoogleFlights: false,
  enableGoogleHotels: false,
  enableGoogleMaps: false,
  
  enableGoogleForms: false,
  enableGoogleSites: false,
  enableGoogleBlogger: false,
  enableWordPressIntegration: false,
  enableTumblrIntegration: false,
  enableMediumIntegration: false,
  enableGoogleEarth: false,
  
  enableGoogleVids: false,
  enableLookerStudio: false,
  
  enableAppsScript: false,
  enableVertexAI: false,
  enableFirebase: false,
  enableGeminiCodeAssist: false,
  
  enableMicrosoft365: false,
  enableOneDrive: false,
  
  enableSamsungNotes: false,
  enableSamsungGallery: false,
  enableSamsungReminder: false,
  enableSamsungCalendar: false,
  
  enableAdvancedPDF: false,
  enableStylusOptimizations: false,
  
  spoofLocation: false,
  enableSovereignState: false,
  
  enableSurgicalCookieSanitizer: false,
  enableWebRTCShield: false,
  enableTelemetryFirewall: false,
  enableCanvasNoise: false,
  enableAudioNoise: false,
  
  enableAdGuardNightly: false,
  enableCanaryBuild: false,
  
  enableBillingGradeBypass: false,
  enableBucketOverride: false,
  enableExtremeThinking: false,
  
  enableDeveloperTools: false,
  enableSREGodMode: false,
  enableStagingRouting: false,
  enableQuantumCode: false,
  enablePsychModel: false,
  enableMemoryManager: false,
  
  enableTensorG6: false,
  enableNeuralCore: false,
  enableGPUSpoof: false,
  enableAudioSpoof: false,
  enableScreenSpoof: false,
  enableBatterySpoof: false,
  
  enableIntegrityBypass: false,
  enableRegionShift: false,
  enableSIMSpoof: false,
  enableSamsungBypass: false,
  enableCookieGuard: false,
  enableDeepResearchV2: false,
  enableSafetyOverride: false,
  enableFutureLabs: false,
};

// --- SECTION DEFINITIONS ---
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
    id: 'gemini3',
    title: 'Gemini 3.0 (2026) & Models',
    icon: Sparkles,
    color: 'text-indigo-400',
    items: [
      { key: 'enableGemini3_0Flash', label: 'Enable Gemini 3.0 Flash Preview' },
      { key: 'enableGemini3_0Pro', label: 'Enable Gemini 3.0 Pro Preview' },
      { key: 'enableGemini2_0Flash', label: 'Enable Gemini 2.0 Flash (Legacy)' },
      { key: 'enableGemini2_0Pro', label: 'Enable Gemini 2.0 Pro (Legacy)' },
      { key: 'enableDeepThink', label: 'DeepThink v3 (Reasoning)' },
      { key: 'enableMariner', label: 'Mariner (Navigation)' },
      { key: 'enableProjectAstra', label: 'Project Astra (Realtime Multimodal)' },
      { key: 'enableDeepResearchV2', label: 'Deep Research v2' },
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
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
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
          href="https://github.com/RE3CON/Gemini-AI/discussions" 
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

const FeatureItem = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <li className="flex items-start gap-3">
    <div className="mt-1 p-1.5 bg-white/5 rounded-lg text-gold-400">
      {React.cloneElement(icon as React.ReactElement, { size: 14 })}
    </div>
    <div>
      <h4 className="text-xs font-bold text-white">{title}</h4>
      <p className="text-[10px] text-[#8E9299]">{desc}</p>
    </div>
  </li>
);

export default function App() {
  const [config, setConfig] = useState<ScriptConfig>(INITIAL_CONFIG);
  const [searchQuery, setSearchQuery] = useState('');
  const [remoteVersion, setRemoteVersion] = useState<string | null>(null);
  const [isCheckingVersion, setIsCheckingVersion] = useState(false);
  const [activeTab, setActiveTab] = useState<'configurator' | 'readme' | 'troubleshooting' | 'license' | 'forum' | 'security'>('configurator');
  const [isReaderMode, setIsReaderMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showGithubModal, setShowGithubModal] = useState(false);
  const [githubToken, setGithubToken] = useState('');
  const [isPushing, setIsPushing] = useState(false);
  const [pushStatus, setPushStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isGeneratingLogo, setIsGeneratingLogo] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [localApiKey, setLocalApiKey] = useState(() => {
    const saved = localStorage.getItem('gemini_api_key');
    if (!saved) return '';
    try {
      return atob(saved.split('').reverse().join(''));
    } catch (e) {
      return saved;
    }
  });
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [toast, setToast] = useState<{ id: number; type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now();
    setToast({ id, type, message });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 4000);
  };

  const checkVersion = async () => {
    setIsCheckingVersion(true);
    try {
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
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    performance_max: true,
    accessibility_core: true,
    identity: true,
    gemini3: true,
    commerce: true,
  });

  const generatedScript = useMemo(() => {
    try {
      return generateUserScript(config);
    } catch (e) {
      console.error("Script generation failed", e);
      return "// Error generating script. Please reset configuration.";
    }
  }, [config]);

  const downloadUrl = useMemo(() => {
    try {
      const blob = new Blob([generatedScript], { type: 'text/javascript' });
      return URL.createObjectURL(blob);
    } catch (e) {
      console.error("Blob creation failed", e);
      return '#';
    }
  }, [generatedScript]);

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

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
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
          spoofPixel11ProXL: true,
          enableGemini3_0Pro: true, 
          enableSamsungEcosystem: true,
          enableSamsungNotes: true,
          enableSamsungGallery: true,
          enableSamsungPass: true,
          enableSamsungWallet: true,
          enableDeXMode: true,
          enableStylusOptimizations: true,
          enableBixbyFusion: true,
          enableKleinanzeigen: true,
          enableEbayNative: true,
          enableIdealo: true,
          enableBilliger: true,
          enableAliExpress: true,
          enableToneProfessional: true,
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
    if (!config.enableLudicrousSpeed) {
        list.push("⚡ WARNING: Sub-optimal velocity. Engage 'Ludicrous Speed' with Secret Key for maximum throughput.");
    } else {
        list.push("🚀 LUDICROUS SPEED: Secret Key injected. Latency Class: Zero Tolerance.");
    }
    if (!config.enableHyperVelocity) list.push("🐢 DRAG DETECTED: Animations are slowing you down. Enable Hyper Velocity.");
    if (config.enableMainThreadLiberation) list.push("🔓 UNCHAINED: Main thread scheduler overridden for aggressive execution.");
    if (config.enableUnlimitedBudget && !config.enableExtremeThinking) list.push("⚙️ GEAR SHIFT: Enable 'Extreme Thinking' to unlock full 16M token velocity.");
    if (config.enableExtremeThinking) list.push("🧠 EXTREME THINKING: 16M Token Limit Override Active. Monitor quota.");
    if (config.enableExtremeThinking && !config.enableUnlimitedBudget) list.push("⚠️ LOGIC ERROR: Extreme Thinking requires Unlimited Budget to be effective.");
    if (config.enableSovereignState && !config.spoofLocation) list.push("⚠️ GEO CONFLICT: 'Sovereign State' (US Lock) is ineffective without 'Spoof Location'.");
    if (config.enableContinuousVoice) list.push("🎙️ INFINITE DICTATION: WebSpeech API Lock active.");
    if (config.enableTermuxBridge) list.push("📟 SHELL LINK: Termux Intent Bridge ready.");
    if (config.enableOmniMaximus) list.push("👑 ILLUSION-MAXIMUS: God Mode Headers injected.");
    if (config.enableGemini3_0Pro) list.push("✨ GEMINI 3.0: 2026 Preview Models selected.");
    if (config.spoofPixel11ProXL && config.enableSamsungEcosystem) list.push("📱 HYBRID IDENTITY: Pixel 11 Pro XL + S24 Ultra Fusion.");
    if (config.enableCanvasNoise || config.enableAudioNoise) list.push("👻 STEALTH MATRIX: Fingerprinting noise generators active.");
    if (config.enableKleinanzeigen) list.push("🛍️ COMMERCE NEXUS: 'Sell on Kleinanzeigen' Intent Active.");
    if (!config.enableLogConsole) list.push("🔧 DIAGNOSTICS: Enable 'Illusion Logger' to track gear shifts.");
    return list;
  }, [config]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedScript);
      setCopied(true);
      showToast('success', 'Script copied to clipboard successfully!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showToast('error', 'Failed to copy to clipboard.');
    }
  };

  const handleSaveKey = () => {
    const obfuscated = btoa(localApiKey).split('').reverse().join('');
    localStorage.setItem('gemini_api_key', obfuscated);
    setShowKeyModal(false);
    showToast('success', 'API Key saved locally.');
  };

  const handleGenerateLogo = async () => {
    setIsGeneratingLogo(true);
    try {
      try {
        const response = await fetch('/api/generate-logo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setLogoUrl(`data:image/png;base64,${data.imageData}`);
            showToast('success', 'Logo generated via server!');
            setIsGeneratingLogo(false);
            return;
          }
        }
      } catch (e) {}

      const apiKey = localApiKey || process.env.GEMINI_API_KEY;
      if (!apiKey) {
        setShowKeyModal(true);
        showToast('info', 'Please provide a Gemini API Key.');
        setIsGeneratingLogo(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: 'A highly unique, colorful, and vibrant logo for a cybersecurity application. Vector art style, clean edges, isolated on a transparent background.' }],
        },
      });
      
      let found = false;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          setLogoUrl(`data:image/png;base64,${part.inlineData.data}`);
          showToast('success', 'Logo generated locally!');
          found = true;
          break;
        }
      }
      if (!found) showToast('error', 'Failed to generate logo.');
    } catch (error: any) {
      showToast('error', 'Error: ' + (error.message || 'Check your API key.'));
    } finally {
      setIsGeneratingLogo(false);
    }
  };

  const handleGithubPush = async () => {
    if (!githubToken) {
      setPushStatus({ type: 'error', message: 'GitHub Token is required.' });
      return;
    }
    setIsPushing(true);
    setPushStatus(null);
    try {
      const response = await fetch('/api/github/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: githubToken,
          repoOwner: 'RE3CON',
          repoName: 'Gemini-Pro',
          branch: 'master',
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setPushStatus({ type: 'success', message: `Successfully pushed! Commit: ${data.commitSha.substring(0, 7)}` });
        showToast('success', 'Codebase successfully deployed to GitHub!');
        setTimeout(() => setShowGithubModal(false), 3000);
      } else {
        setPushStatus({ type: 'error', message: data.error || 'Failed to push.' });
        showToast('error', data.error || 'Deployment failed.');
      }
    } catch (error: any) {
      setPushStatus({ type: 'error', message: 'Network error.' });
      showToast('error', 'Network error occurred.');
    } finally {
      setIsPushing(false);
    }
  };

  return (
    <div className={`min-h-screen bg-space-950 text-slate-200 p-4 md:p-8 font-sans selection:bg-gold-500/30 ${config.enableLudicrousSpeed ? 'selection:bg-rose-500/30' : ''} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Header & Config Column */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`${activeTab === 'configurator' ? 'lg:col-span-6' : 'lg:col-span-12'} space-y-6 transition-all duration-300`}
        >
          {/* Brand Card */}
          <div className={`bg-slate-900/50 border ${config.enableLudicrousSpeed ? 'border-rose-500/50 shadow-rose-900/20' : 'border-gold-500/20'} rounded-xl p-6 backdrop-blur-sm relative overflow-hidden transition-all duration-500`}>
            <div className={`absolute top-0 right-0 w-32 h-32 ${config.enableLudicrousSpeed ? 'bg-rose-500/5' : 'bg-gold-500/5'} rounded-full blur-3xl -mr-16 -mt-16 transition-colors duration-500`}></div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 ${config.enableLudicrousSpeed ? 'bg-rose-500/10 border-rose-500/20' : 'bg-gold-500/10 border-gold-500/20'} rounded-lg border transition-colors duration-500`}>
                  {logoUrl ? (
                    <img src={logoUrl} alt="Logo" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />
                  ) : (
                    <Accessibility className={config.enableLudicrousSpeed ? "text-rose-400" : "text-gold-400"} size={24} />
                  )}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white tracking-tight">Gemini Adaptive Suite</h1>
                  <div className="flex items-center gap-2">
                    <p className={`text-xs ${config.enableLudicrousSpeed ? 'text-rose-500/80' : 'text-gold-500/80'} font-mono tracking-widest uppercase transition-colors duration-500`}>
                      Accessibility & Native Shell / v{config.version.split('-')[0]}
                    </p>
                    <button onClick={checkVersion} disabled={isCheckingVersion} className={`p-1 rounded-md hover:bg-white/10 transition-colors ${isCheckingVersion ? 'animate-spin' : ''}`}>
                      <RotateCcw size={10} className={config.enableLudicrousSpeed ? 'text-rose-400' : 'text-gold-400'} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowKeyModal(true)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white">
                  <Key size={16} />
                </button>
                <button onClick={handleGenerateLogo} disabled={isGeneratingLogo} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white">
                  {isGeneratingLogo ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
                </button>
                <button onClick={() => setShowGithubModal(true)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white">
                  <Github size={16} />
                </button>
              </div>
            </div>
            
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
            {['configurator', 'readme', 'troubleshooting', 'license', 'forum', 'security'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
              >
                {tab === 'configurator' && <Settings size={16} />}
                {tab === 'readme' && <BookOpen size={16} />}
                {tab === 'troubleshooting' && <Wrench size={16} />}
                {tab === 'license' && <FileText size={16} />}
                {tab === 'forum' && <MessageSquare size={16} />}
                {tab === 'security' && <Shield size={16} />}
                <span className="capitalize">{tab}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'configurator' && (
              <motion.div
                key="configurator"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="relative sticky top-4 z-10">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search flags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl leading-5 bg-slate-900 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 sm:text-sm shadow-xl"
                  />
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                  {filteredSections.map((section) => {
                    const Icon = section.icon;
                    const isOpen = openSections[section.id] || searchQuery.length > 0;
                    const activeCount = section.items.filter(i => config[i.key as keyof ScriptConfig]).length;
                    return (
                      <div key={section.id} className={`border-b border-slate-800 last:border-0 ${section.bg || ''} ${section.border ? `border ${section.border} m-1 rounded-lg` : ''}`}>
                        <button onClick={() => toggleSection(section.id)} className={`w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors ${isOpen ? 'bg-slate-800/30' : ''}`}>
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
                          <div className="px-6 py-2 pb-6 space-y-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                              {section.items.map((item) => (
                                <Switch key={item.key} checked={config[item.key as keyof ScriptConfig] as boolean} onChange={() => toggle(item.key as keyof ScriptConfig)} label={item.label} />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'readme' && (
              <motion.div key="readme" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <GitHubMarkdown url="https://raw.githubusercontent.com/RE3CON/Gemini-Pro/master/README.md" />
              </motion.div>
            )}
            {activeTab === 'troubleshooting' && (
              <motion.div key="troubleshooting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <GitHubMarkdown url="https://raw.githubusercontent.com/RE3CON/Gemini-Pro/master/TROUBLESHOOTING.md" />
              </motion.div>
            )}
            {activeTab === 'license' && (
              <motion.div key="license" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <GitHubMarkdown url="https://raw.githubusercontent.com/RE3CON/Gemini-Pro/master/LICENSE" />
              </motion.div>
            )}
            {activeTab === 'security' && (
              <motion.div key="security" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <GitHubMarkdown url="https://raw.githubusercontent.com/RE3CON/Gemini-Pro/master/SECURITY.md" />
              </motion.div>
            )}
            {activeTab === 'forum' && (
              <motion.div key="forum" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <GitHubIssues />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Preview Column */}
        {activeTab === 'configurator' && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-6 flex flex-col h-full sticky top-8"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="text-slate-400" size={18} />
                <h2 className="text-lg font-medium text-white">Final Script</h2>
              </div>
              <div className="text-xs text-slate-500 font-mono py-1.5">v{config.version.split('-')[0]}</div>
            </div>
            
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
                  {suggestions.length === 0 && <li className="text-xs text-slate-500 italic">Configuration looks optimal.</li>}
                </ul>
              </div>
            </div>

            <div className="flex-grow">
              <CodeBlock code={generatedScript} />
            </div>

            <div className="flex flex-col items-center justify-center my-4 gap-3">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button onClick={handleCopy} className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg">
                  {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                  <span>{copied ? 'Copied' : 'Copy Script'}</span>
                </button>
                <a href={downloadUrl} download="gemini-adaptive.user.js" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gold-600 hover:bg-gold-500 text-black text-sm font-bold rounded-xl transition-all shadow-lg">
                  <FileText size={18} />
                  <span>Download Script</span>
                </a>
              </div>
            </div>

            <AndroidExport scriptContent={generatedScript} userAgent={config.spoofPixel11ProXL ? "Mozilla/5.0 (Linux; Android 17; Pixel 11 Pro XL Build/CP21.260116.011.A1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36" : navigator.userAgent} />
          </motion.div>
        )}
      </div>

      {/* Modals & Toasts */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl bg-slate-900 border border-slate-800">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            {toast.type === 'error' && <XCircle className="w-5 h-5 text-rose-500" />}
            {toast.type === 'info' && <AlertCircle className="w-5 h-5 text-blue-500" />}
            <span className="text-sm font-medium text-white">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showKeyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowKeyModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-800">
              <h2 className="text-xl font-bold text-white mb-4">API Configuration</h2>
              <input type="password" value={localApiKey} onChange={(e) => setLocalApiKey(e.target.value)} placeholder="Gemini API Key" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white mb-4" />
              <div className="flex gap-3">
                <button onClick={() => setShowKeyModal(false)} className="flex-1 px-6 py-3 rounded-xl text-sm font-medium border border-slate-800 text-white hover:bg-slate-800 transition-all">Cancel</button>
                <button onClick={handleSaveKey} className="flex-1 bg-gold-600 text-black px-6 py-3 rounded-xl text-sm font-medium hover:bg-gold-500 transition-all">Save Key</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showGithubModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !isPushing && setShowGithubModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-800">
              <h2 className="text-xl font-bold text-white mb-4">Push to GitHub</h2>
              <input type="password" value={githubToken} onChange={(e) => setGithubToken(e.target.value)} placeholder="Personal Access Token" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white mb-4" />
              {pushStatus && <div className={`mb-4 p-3 rounded-lg text-xs ${pushStatus.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>{pushStatus.message}</div>}
              <div className="flex gap-3">
                <button onClick={() => setShowGithubModal(false)} disabled={isPushing} className="flex-1 px-6 py-3 rounded-xl text-sm font-medium border border-slate-800 text-white hover:bg-slate-800 transition-all disabled:opacity-50">Cancel</button>
                <button onClick={handleGithubPush} disabled={isPushing} className="flex-1 bg-white text-black px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                  {isPushing ? <Loader2 className="animate-spin" size={16} /> : <Github size={16} />}
                  <span>{isPushing ? 'Pushing...' : 'Push Now'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
