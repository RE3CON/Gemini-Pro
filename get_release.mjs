import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-Pro';
const tag = 'v28.0.1';

async function getRelease() {
  try {
    const { data } = await octokit.repos.getReleaseByTag({
      owner,
      repo,
      tag
    });
    
    console.log(`Release ID: ${data.id}`);
    console.log(`Upload URL: ${data.upload_url}`);
    
  } catch (error) {
    console.error(`Error fetching release:`, error.message);
  }
}

getRelease();
