import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-AI';

async function listFiles() {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: ''
    });
    
    console.log(data.map(f => f.name));
    
  } catch (error) {
    console.error(`Error listing files:`, error.message);
  }
}

listFiles();
