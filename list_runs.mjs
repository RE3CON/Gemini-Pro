import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repos = ['Gemini-Pro', 'Gemini-AI'];

async function listRuns() {
  for (const repo of repos) {
    console.log(`--- Recent Workflow Runs for ${repo} ---`);
    try {
      const runs = await octokit.actions.listWorkflowRunsForRepo({
        owner,
        repo,
        per_page: 5
      });
      
      runs.data.workflow_runs.forEach(run => {
        console.log(`Run #${run.run_number}: ${run.name} - Status: ${run.status}, Conclusion: ${run.conclusion}`);
        console.log(`  URL: ${run.html_url}`);
      });
    } catch (error) {
      console.error(`Error fetching workflow runs for ${repo}:`, error.message);
    }
    console.log('\n');
  }
}

listRuns();
