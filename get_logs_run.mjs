import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-Pro';
const run_id = 22798061383;

async function getWorkflowRunLogs() {
  try {
    const { data } = await octokit.actions.downloadWorkflowRunLogs({
      owner,
      repo,
      run_id
    });
    
    // This returns a redirect URL to the logs
    console.log(`Logs URL: ${data}`);
    
  } catch (error) {
    console.error(`Error fetching logs:`, error.message);
  }
}

getWorkflowRunLogs();
