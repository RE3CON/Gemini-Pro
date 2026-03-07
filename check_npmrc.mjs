import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-AI';

async function checkNpmrc() {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: '.npmrc'
    });
    
    console.log('--- .npmrc ---');
    console.log(Buffer.from(data.content, 'base64').toString('utf-8'));
    
  } catch (error) {
    console.log(`.npmrc not found`);
  }
}

checkNpmrc();
