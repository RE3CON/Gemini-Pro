import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-Pro';
const run_id = 22798061383;

async function getWorkflowRunJobs() {
  try {
    const { data } = await octokit.actions.listJobsForWorkflowRun({
      owner,
      repo,
      run_id
    });
    
    console.log(`--- Jobs for Run ${run_id} ---`);
    data.jobs.forEach(job => {
      console.log(`Job: ${job.name}, Status: ${job.status}, Conclusion: ${job.conclusion}`);
      if (job.conclusion === 'failure') {
        // We can't easily get logs here without another call, but this confirms the failure.
      }
    });
    
  } catch (error) {
    console.error(`Error fetching jobs:`, error.message);
  }
}

getWorkflowRunJobs();
