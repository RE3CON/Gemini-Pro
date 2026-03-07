import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-Pro';

async function listWorkflowRuns() {
  try {
    const { data } = await octokit.actions.listWorkflowRunsForRepo({
      owner,
      repo,
      per_page: 20
    });
    
    console.log(`--- Recent Workflow Runs for ${repo} ---`);
    data.workflow_runs.forEach(run => {
      console.log(`Workflow: ${run.name}, ID: ${run.id}, Status: ${run.status}, Conclusion: ${run.conclusion}`);
    });
    
  } catch (error) {
    console.error(`Error fetching workflow runs:`, error.message);
  }
}

listWorkflowRuns();
