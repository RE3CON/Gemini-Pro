import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-Pro';
const run_id = '22797946626'; // Failed Publish Package run

async function getJobs() {
  try {
    const jobs = await octokit.actions.listJobsForWorkflowRun({
      owner,
      repo,
      run_id
    });
    
    jobs.data.jobs.forEach(job => {
      console.log(`Job: ${job.name} (ID: ${job.id}, Status: ${job.status}, Conclusion: ${job.conclusion})`);
    });
    
  } catch (error) {
    console.error(`Error fetching jobs:`, error.message);
  }
}

getJobs();
