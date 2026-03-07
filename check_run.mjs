import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-Pro';
const run_id = '22797868676';

async function checkRun() {
  try {
    const run = await octokit.actions.getWorkflowRun({
      owner,
      repo,
      run_id
    });
    
    console.log(`--- Status for Workflow Run ${run_id} ---`);
    console.log(`Status: ${run.data.status}`);
    console.log(`Conclusion: ${run.data.conclusion}`);
    console.log(`URL: ${run.data.html_url}`);
    
  } catch (error) {
    console.error(`Error fetching workflow run:`, error.message);
  }
}

checkRun();
