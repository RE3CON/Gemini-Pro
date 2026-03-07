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
    const lock = JSON.parse(content);
    
    // Update version in lock file
    lock.version = "1.1.3";
    lock.packages[""].version = "1.1.3";
    
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: 'chore: update version in package-lock.json to 1.1.3',
      content: Buffer.from(JSON.stringify(lock, null, 2)).toString('base64'),
      sha: fileData.sha
    });
    
    console.log('package-lock.json updated successfully.');
    
  } catch (error) {
    console.error(`Error updating package-lock.json:`, error.message);
  }
}

updateLockFile();
