import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-Pro';

async function listPRs() {
  try {
    const prs = await octokit.pulls.list({
      owner,
      repo,
      state: 'open'
    });
    
    prs.data.forEach(pr => {
      console.log(`PR #${pr.number}: ${pr.title}`);
      console.log(`  Body: ${pr.body}`);
    });
  } catch (error) {
    console.error(`Error:`, error.message);
  }
}

listPRs();
