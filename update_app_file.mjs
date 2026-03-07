import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-AI';
const path = 'src/App.tsx';

async function updateAppFile() {
  try {
    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path
    });
    
    const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
    
    // 1. Update INITIAL_CONFIG
    let newContent = content.replace(
      '  enableGemini3_0Pro: true,',
      '  enableGemini3_1Pro: true,\n  enableGemini3_1Flash: true,\n  enableGemini3_1FlashLite: true,\n  enableGemini3_0Pro: true,'
    );
    
    // 2. Update SECTION_DEFINITIONS
    newContent = newContent.replace(
      '      { key: \'enableGemini3_0Flash\', label: \'Enable Gemini 3.0 Flash Preview\' },',
      '      { key: \'enableGemini3_1Flash\', label: \'Enable Gemini 3.1 Flash Preview\' },\n      { key: \'enableGemini3_1Pro\', label: \'Enable Gemini 3.1 Pro Preview\' },\n      { key: \'enableGemini3_1FlashLite\', label: \'Enable Gemini 3.1 Flash Lite\' },\n      { key: \'enableGemini3_0Flash\', label: \'Enable Gemini 3.0 Flash Preview\' },'
    );
    
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: 'feat: add Gemini 3.1 model options',
      content: Buffer.from(newContent).toString('base64'),
      sha: fileData.sha
    });
    
    console.log('App.tsx updated successfully.');
    
  } catch (error) {
    console.error(`Error updating App.tsx:`, error.message);
  }
}

updateAppFile();
