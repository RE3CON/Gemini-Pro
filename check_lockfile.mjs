import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-AI';

async function checkLockFile() {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: 'package-lock.json'
    });
    
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    console.log('--- package-lock.json (first 500 chars) ---');
    console.log(content.substring(0, 500));
    
  } catch (error) {
    console.log(`package-lock.json not found`);
  }
}

checkLockFile();
