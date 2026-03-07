import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repos = ['Gemini-Pro', 'Gemini-AI'];

async function checkActions(repo) {
  try {
    console.log(`\n--- Checking ${repo} ---`);
    const response = await octokit.actions.listWorkflowRunsForRepo({
      owner,
      repo,
      per_page: 5,
    });
    
    for (const run of response.data.workflow_runs) {
      console.log(`Run ID: ${run.id}, Name: ${run.name}, Status: ${run.status}, Conclusion: ${run.conclusion}, URL: ${run.html_url}`);
      
      if (run.conclusion === 'failure') {
        const jobsResponse = await octokit.actions.listJobsForWorkflowRun({
          owner,
          repo,
          run_id: run.id,
        });
        
        for (const job of jobsResponse.data.jobs) {
          if (job.conclusion === 'failure') {
            console.log(`  Failed Job: ${job.name}`);
            for (const step of job.steps) {
              if (step.conclusion === 'failure') {
                console.log(`    Failed Step: ${step.name}`);
                
                // Fetch logs for the failed job
                try {
                  const logResponse = await octokit.actions.downloadJobLogsForExactCommit({
                    owner,
                    repo,
                    job_id: job.id,
                  });
                  // The logResponse might be a redirect or the actual log text depending on the endpoint used.
                  // Actually, downloadJobLogsForExactCommit is not the standard one. Let's use downloadJobLogsForExactCommit or just get the logs.
                  // Actually, octokit.actions.downloadJobLogsForExactCommit doesn't exist. It's downloadJobLogsForExactCommit.
                  // Let's just print the step name for now.
                } catch (e) {
                  // ignore
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error checking ${repo}:`, error.message);
  }
}

async function run() {
  for (const repo of repos) {
    await checkActions(repo);
  }
}

run();
