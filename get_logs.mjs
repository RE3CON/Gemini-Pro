import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-Pro';
const run_id = '22797868676';

async function getLogs() {
  try {
    const logs = await octokit.rest.actions.getWorkflowRunLogs({
      owner,
      repo,
      run_id
    });
    
    console.log(`Logs URL: ${logs.url}`);
    
  } catch (error) {
    console.error(`Error fetching logs:`, error.message);
  }
}

getLogs();
