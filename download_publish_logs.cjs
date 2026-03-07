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
    
    const failedPublish = checkRuns.check_runs.find(r => r.name === 'publish' && r.conclusion === 'failure');
    if (!failedPublish) {
      console.log('No failed publish found.');
      return;
    }
    
    console.log(`Downloading logs for job ID: ${failedPublish.id}`);
    
    const { url } = await octokit.rest.actions.downloadJobLogsForWorkflowRun({
      owner,
      repo,
      job_id: failedPublish.id
    });
    
    console.log('Log URL:', url);
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        fs.writeFileSync('publish_log.txt', data);
        console.log('Saved to publish_log.txt');
      });
    }).on('error', (e) => {
      console.error(e);
    });

  } catch (e) {
    console.error('Error:', e.message);
  }
}

downloadLogs();
