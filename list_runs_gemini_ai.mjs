import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-AI';

async function listRuns() {
  try {
    const { data } = await octokit.actions.listWorkflowRunsForRepo({
      owner,
      repo,
      per_page: 10
    });
    
    console.log(`--- Recent Workflow Runs for ${repo} ---`);
    data.workflow_runs.forEach(run => {
      const start = new Date(run.created_at);
      const end = run.updated_at ? new Date(run.updated_at) : null;
      const duration = end ? ((end.getTime() - start.getTime()) / 1000).toFixed(0) : 'N/A';
      console.log(`Run: ${run.id}, Workflow: ${run.name}, Status: ${run.status}, Conclusion: ${run.conclusion}, Start: ${run.created_at}, Duration: ${duration}s`);
    });
  } catch (error) {
    console.error(error);
  }
}

listRuns();
