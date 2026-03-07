import { Octokit } from "@octokit/rest";
import fs from 'fs';

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-AI';
const run_id = 22802552930;

async function getWorkflowRunLogs() {
  try {
    const { data } = await octokit.actions.downloadWorkflowRunLogs({
      owner,
      repo,
      run_id
    });
    
    fs.writeFileSync('logs.zip', Buffer.from(data));
    console.log('Logs saved to logs.zip');
    
  } catch (error) {
    console.error(`Error fetching logs:`, error.message);
  }
}

getWorkflowRunLogs();
