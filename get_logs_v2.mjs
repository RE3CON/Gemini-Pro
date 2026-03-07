import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-Pro';
const run_id = '22797946626'; // Failed Publish Package run

async function getLogs() {
  try {
    const logs = await octokit.rest.actions.getWorkflowJobLogs({
      owner,
      repo,
      job_id: run_id // This might be wrong, need job_id not run_id
    });
    
    console.log(`Logs URL: ${logs.url}`);
    
  } catch (error) {
    console.error(`Error fetching logs:`, error.message);
  }
}

getLogs();
