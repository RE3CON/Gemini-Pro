import { Octokit } from "@octokit/rest";
import fs from 'fs';

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-Pro';

async function listFiles() {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: ''
    });
    
    console.log('Files in repository:');
    data.forEach(file => {
      console.log(file.name);
    });
    
  } catch (error) {
    console.error(`Error listing files:`, error.message);
  }
}

listFiles();
