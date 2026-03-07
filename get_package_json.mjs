import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-AI';

async function getPackageJson() {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: 'package.json'
    });
    
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    console.log(content);
    
  } catch (error) {
    console.error(`Error fetching package.json:`, error.message);
  }
}

getPackageJson();
