const { Octokit } = require('octokit');
const fs = require('fs');
const https = require('https');

async function downloadLogs() {
  const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
  const owner = 'RE3CON';
  const repo = 'Gemini-Pro';

  try {
    const { data: pr } = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: 5
    });
    
    const { data: checkRuns } = await octokit.rest.checks.listForRef({
      owner,
      repo,
      ref: pr.head.sha
    });
    
    const failedBuild = checkRuns.check_runs.find(r => r.name === 'build' && r.conclusion === 'failure');
    if (!failedBuild) {
      console.log('No failed build found.');
      return;
    }
    
    console.log(`Downloading logs for job ID: ${failedBuild.id}`);
    
    // We need the job id to get the logs
    const { url } = await octokit.rest.actions.downloadJobLogsForWorkflowRun({
      owner,
      repo,
      job_id: failedBuild.id
    });
    
    console.log('Log URL:', url);
    // Download the log
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        fs.writeFileSync('job_log.txt', data);
        console.log('Saved to job_log.txt');
      });
    }).on('error', (e) => {
      console.error(e);
    });

  } catch (e) {
    console.error('Error:', e.message);
  }
}

downloadLogs();
