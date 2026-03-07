import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-AI';
const path = 'src/types.ts';

async function updateTypesFile() {
  try {
    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path
    });
    
    const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
    
    // Add the new fields
    const newContent = content.replace(
      '  enableGemini3_0Pro: boolean;   // Legacy: Pro 3.0',
      '  enableGemini3_1Flash: boolean; // NEW: Flash 3.1 (2026)\n  enableGemini3_1Pro: boolean;   // NEW: Pro 3.1 (2026)\n  enableGemini3_1FlashLite: boolean; // NEW: Flash Lite 3.1\n  enableGemini3_0Flash: boolean; // Legacy: Flash 3.0\n  enableGemini3_0Pro: boolean;   // Legacy: Pro 3.0'
    );
    
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: 'feat: add Gemini 3.1 model options',
      content: Buffer.from(newContent).toString('base64'),
      sha: fileData.sha
    });
    
    console.log('types.ts updated successfully.');
    
  } catch (error) {
    console.error(`Error updating types.ts:`, error.message);
  }
}

updateTypesFile();
