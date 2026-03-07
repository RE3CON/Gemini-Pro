const { Octokit } = require('octokit');

async function checkPRStatus() {
  const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
  const owner = 'RE3CON';
  const repo = 'Gemini-Pro';

  try {
    const { data: pr } = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: 5
    });
    console.log(`PR #${pr.number} merged: ${pr.merged}`);
  } catch (e) {
    console.error('Error:', e.message);
  }
}

checkPRStatus();
