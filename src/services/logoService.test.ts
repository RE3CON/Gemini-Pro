import { describe, it, expect, vi } from 'vitest';
import { generateLogo } from './logoService';

// Mock the GoogleGenAI
vi.mock('@google/genai', () => ({
  GoogleGenAI: class {
    models = {
      generateContent: vi.fn().mockResolvedValue({
        candidates: [{
          content: {
            parts: [{ inlineData: { data: 'mocked-image-data' } }]
          }
        }]
      })
    }
  }
}));

describe('logoService', () => {
  it('should generate a logo', async () => {
    const logo = await generateLogo('mock-api-key');
    expect(logo).toBe('data:image/png;base64,mocked-image-data');
  });
});
