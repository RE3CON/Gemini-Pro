const { Octokit } = require('octokit');
const fs = require('fs');
const https = require('https');

async function downloadLogs() {
  const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
  const owner = 'RE3CON';
  const repo = 'Gemini-Pro';

  try {
    const { data: checkRuns } = await octokit.rest.checks.listForRef({
      owner,
      repo,
      ref: 'main'
    });
    
    const failedBuild = checkRuns.check_runs.find(r => r.name === 'build' && r.conclusion === 'failure');
    if (!failedBuild) {
      console.log('No failed build found.');
      return;
    }
    
    console.log(`Downloading logs for job ID: ${failedBuild.id}`);
    
    const { url } = await octokit.rest.actions.downloadJobLogsForWorkflowRun({
      owner,
      repo,
      job_id: failedBuild.id
    });
    
    console.log('Log URL:', url);
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        fs.writeFileSync('job_log_latest.txt', data);
        console.log('Saved to job_log_latest.txt');
      });
    }).on('error', (e) => {
      console.error(e);
    });

  } catch (e) {
    console.error('Error:', e.message);
  }
}

downloadLogs();
