import { GoogleGenAI } from "@google/genai";
import * as fs from 'fs';
import * as path from 'path';

async function generateAndSaveImage(prompt: string, filename: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

  console.log(`Generating: ${filename}...`);
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-image-preview',
    contents: { parts: [{ text: prompt }] },
    config: { imageConfig: { aspectRatio: "1:1", imageSize: "1K" } }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      const buffer = Buffer.from(part.inlineData.data, 'base64');
      const filePath = path.join('docs', filename);
      fs.writeFileSync(filePath, buffer);
      console.log(`Saved: ${filePath}`);
      return;
    }
  }
  throw new Error(`Failed to generate image for: ${filename}`);
}

async function main() {
  const smartphonePrompt = 'A high-fidelity, photorealistic UI mockup of an Android smartphone screen displaying an "Advanced Configuration" settings menu for a custom Chromium browser. The UI is clean, modern, and dark-themed. It features categorized settings with toggle switches, dropdown menus, and sliders. The categories include "Hardware Spoofing", "Network Stealth", and "Engine Settings". The design should look like a professional, high-end Android system settings app.';
  const tabletPrompt = 'A high-fidelity, photorealistic UI mockup of an Android tablet screen displaying an "Advanced Configuration" settings menu for a custom Chromium browser in a split-pane layout. The left pane shows a list of categories (Hardware, Network, Stealth, Engine), and the right pane shows the detailed settings for the selected category ("Hardware"). The UI is clean, modern, and dark-themed, with toggle switches, dropdowns, and sliders. The design should look like a professional, high-end Android system settings app.';

  await generateAndSaveImage(smartphonePrompt, 'smartphone_mockup.png');
  await generateAndSaveImage(tabletPrompt, 'tablet_mockup.png');
}

main().catch(console.error);
