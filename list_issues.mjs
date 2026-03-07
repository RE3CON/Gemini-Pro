import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repos = ['Gemini-Pro', 'Gemini-AI'];

async function listIssues() {
  for (const repo of repos) {
    console.log(`--- Issues for ${repo} ---`);
    try {
      const issues = await octokit.issues.listForRepo({
        owner,
        repo,
        state: 'open'
      });
      
      if (issues.data.length === 0) {
        console.log('No open issues.');
      } else {
        issues.data.forEach(issue => {
          console.log(`Issue #${issue.number}: ${issue.title} (Opened by: ${issue.user.login})`);
        });
      }
    } catch (error) {
      console.error(`Error fetching issues for ${repo}:`, error.message);
    }
    console.log('\n');
  }
}

listIssues();
