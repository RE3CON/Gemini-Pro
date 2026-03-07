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
      run_id,
      per_page: 100
    });
    
    console.log(`--- Jobs for Run ${run_id} ---`);
    if (data.jobs.length === 0) {
        console.log("No jobs found. This might be a workflow with no jobs or an error.");
    }
    data.jobs.forEach(job => {
      console.log(`Job ID: ${job.id}, Name: ${job.name}, Status: ${job.status}, Conclusion: ${job.conclusion}`);
    });
    
  } catch (error) {
    console.error(`Error fetching jobs:`, error.message);
  }
}

getWorkflowRunJobs();
