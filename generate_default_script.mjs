import fs from 'fs';
import path from 'path';
import { generateUserScript } from './utils/scriptGenerator.ts';

const defaultConfig = {
  version: '1.0.0',
  enableLudicrousSpeed: true,
  enableHyperVelocity: true,
  spoofPixel10Pro: true,
  enableOmniMaximus: true,
  enableContinuousVoice: true,
  enableTermuxBridge: true,
  enableKleinanzeigen: true,
  enableIdealo: true,
  enableExtremeThinking: false,
  enableBillingBypass: false,
  enableSamsungNotes: true,
  enableSamsungGallery: true,
  enableSamsungReminder: true,
  enableSamsungEcosystem: true,
  enableSamsungPass: true,
  enableSamsungWallet: true,
  enableBixbyFusion: true,
  enableOneDrive: true,
  enableMicrosoft365: true,
  enableWhatsAppBridge: true,
  enableMessengerBridge: true,
  enableGoogleChat: true,
  enableSignalBridge: true,
  enableSMSBridge: true
};

const scriptContent = generateUserScript(defaultConfig);

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}
fs.writeFileSync('dist/gemini-adaptive.user.js', scriptContent);
console.log('Generated default UserScript.');
