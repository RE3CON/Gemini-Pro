import { GoogleGenAI } from "@google/genai";

export const generateLogo = async (apiKey: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey });
  
  let imageData = '';
  let lastError: any = null;
  
  const models = ['gemini-2.5-flash-image', 'gemini-3.1-flash-image-preview'];
  
  for (const modelName of models) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: {
          parts: [
            {
              text: 'Cybersecurity app logo. Vector art, neon gradients, futuristic shield, no text, transparent background.',
            },
          ],
        }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          imageData = part.inlineData.data;
          break;
        }
      }
      
      if (imageData) break;
    } catch (e: any) {
      console.error(`Failed with ${modelName}:`, e);
      lastError = e;
      
      const msg = e.message || "";
      if (msg.includes("API_KEY_INVALID") || msg.includes("not found") || msg.includes("403") || msg.includes("401")) {
        break;
      }
    }
  }

  if (imageData) {
    return `data:image/png;base64,${imageData}`;
  } else {
    throw lastError || new Error("Failed to generate logo data.");
  }
};
