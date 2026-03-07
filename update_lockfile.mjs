import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-AI';
const path = 'package-lock.json';

async function updateLockFile() {
  try {
    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path
    });
    
    let content = Buffer.from(fileData.content, 'base64').toString('utf-8');
    
    // Replace all occurrences of gemini-pro with gemini-ai
    content = content.replace(/gemini-pro/g, 'gemini-ai');
    
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: 'fix: update package name in package-lock.json to match Gemini-AI',
      content: Buffer.from(content).toString('base64'),
      sha: fileData.sha
    });
    
    console.log('package-lock.json updated successfully.');
    
  } catch (error) {
    console.error(`Error updating package-lock.json:`, error.message);
  }
}

updateLockFile();
