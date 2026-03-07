import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-Pro';
const run_id = 22798061383;

async function getWorkflowRun() {
  try {
    const { data } = await octokit.actions.getWorkflowRun({
      owner,
      repo,
      run_id
    });
    
    console.log(`Workflow: ${data.name}`);
    console.log(`Status: ${data.status}`);
    console.log(`Conclusion: ${data.conclusion}`);
    console.log(`Event: ${data.event}`);
    console.log(`Created at: ${data.created_at}`);
    
  } catch (error) {
    console.error(`Error fetching run:`, error.message);
  }
}

getWorkflowRun();
