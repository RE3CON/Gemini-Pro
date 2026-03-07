import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-Pro';
const job_id = '66135288160';

async function getLogs() {
  try {
    const logs = await octokit.rest.actions.downloadJobLogsForWorkflowRun({
      owner,
      repo,
      job_id
    });
    
    console.log(`Logs URL: ${logs.url}`);
    
  } catch (error) {
    console.error(`Error fetching logs:`, error.message);
  }
}

getLogs();
