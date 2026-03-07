import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-AI';
const path = 'src/components/AndroidExport.tsx';

async function fixAndroidExport() {
  try {
    // 1. Get current file
    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path
    });
    
    const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
    
    // 2. Fix the import
    const newContent = content.replace(
      "import { saveAs } from 'file-saver';",
      "import saveAs from 'file-saver';"
    );
    
    // 3. Update the file
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: 'fix: correct file-saver import',
      content: Buffer.from(newContent).toString('base64'),
      sha: fileData.sha
    });
    
    console.log('AndroidExport.tsx updated successfully.');
    
  } catch (error) {
    console.error(`Error updating file:`, error.message);
  }
}

fixAndroidExport();
