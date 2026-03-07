import { Octokit } from "@octokit/rest";
import fs from 'fs';

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-Pro';

async function getLogs() {
  try {
    const jobsResponse = await octokit.actions.listJobsForWorkflowRun({
      owner,
      repo,
      run_id: 22797222044,
    });
    
    for (const job of jobsResponse.data.jobs) {
      if (job.conclusion === 'failure') {
        const logResponse = await octokit.actions.downloadJobLogsForWorkflowRun({
          owner,
          repo,
          job_id: job.id,
        });
        fs.writeFileSync('job_log.txt', logResponse.data);
        console.log('Log written to job_log.txt');
      }
    }
  } catch (error) {
    console.error(`Error:`, error.message);
  }
}

getLogs();
