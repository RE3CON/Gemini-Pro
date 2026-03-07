import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repos = ['Gemini-Pro', 'Gemini-AI'];

async function listAll() {
  for (const repo of repos) {
    console.log(`--- Status for ${repo} ---`);
    
    // List Issues (excluding PRs)
    try {
      const issues = await octokit.issues.listForRepo({
        owner,
        repo,
        state: 'open',
        filter: 'all'
      });
      
      const actualIssues = issues.data.filter(i => !i.pull_request);
      const prs = issues.data.filter(i => i.pull_request);
      
      console.log(`Open Issues (excluding PRs): ${actualIssues.length}`);
      actualIssues.forEach(i => console.log(`  Issue #${i.number}: ${i.title}`));
      
      console.log(`Open Pull Requests: ${prs.length}`);
      prs.forEach(p => console.log(`  PR #${p.number}: ${p.title}`));
      
    } catch (error) {
      console.error(`Error fetching for ${repo}:`, error.message);
    }
    console.log('\n');
  }
}

listAll();
