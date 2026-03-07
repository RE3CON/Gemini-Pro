import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repos = ['Gemini-Pro', 'Gemini-AI'];

async function listPRs() {
  for (const repo of repos) {
    console.log(`--- Pull Requests for ${repo} ---`);
    try {
      const prs = await octokit.pulls.list({
        owner,
        repo,
        state: 'open'
      });
      
      if (prs.data.length === 0) {
        console.log('No open pull requests.');
      } else {
        prs.data.forEach(pr => {
          console.log(`PR #${pr.number}: ${pr.title} (Opened by: ${pr.user.login}, Created at: ${pr.created_at})`);
        });
      }
    } catch (error) {
      console.error(`Error fetching PRs for ${repo}:`, error.message);
    }
    console.log('\n');
  }
}

listPRs();
