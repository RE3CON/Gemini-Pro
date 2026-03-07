import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-Pro';

async function listWorkflows() {
  try {
    const { data } = await octokit.actions.listRepoWorkflows({
      owner,
      repo
    });
    
    console.log(`--- Workflows for ${repo} ---`);
    data.workflows.forEach(workflow => {
      console.log(`Name: ${workflow.name}, ID: ${workflow.id}, Path: ${workflow.path}`);
    });
    
  } catch (error) {
    console.error(`Error fetching workflows:`, error.message);
  }
}

listWorkflows();
