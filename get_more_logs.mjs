import { Octokit } from "@octokit/rest";
import fs from 'fs';

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';

async function getLogs(repo, run_id, filename) {
  try {
    const jobsResponse = await octokit.actions.listJobsForWorkflowRun({
      owner,
      repo,
      run_id,
    });
    
    for (const job of jobsResponse.data.jobs) {
      if (job.conclusion === 'failure') {
        const logResponse = await octokit.actions.downloadJobLogsForWorkflowRun({
          owner,
          repo,
          job_id: job.id,
        });
        fs.writeFileSync(filename, logResponse.data);
        console.log(`Log written to ${filename}`);
      }
    }
  } catch (error) {
    console.error(`Error:`, error.message);
  }
}

async function run() {
  await getLogs('Gemini-Pro', 22797419124, 'publish_pro.txt');
  await getLogs('Gemini-AI', 22797419784, 'build_ai.txt');
}

run();
