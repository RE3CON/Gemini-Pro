const { Octokit } = require('octokit');

async function checkPR() {
  const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
  const owner = 'RE3CON';
  const repo = 'Gemini-Pro';

  try {
    const { data: pr } = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: 5
    });
    console.log(`PR #${pr.number}: ${pr.title}`);
    console.log(`State: ${pr.state}`);
    console.log(`Base: ${pr.base.ref} | Head: ${pr.head.ref}`);
    console.log(`Mergeable: ${pr.mergeable}`);
    console.log(`Mergeable State: ${pr.mergeable_state}`);
    
    // Get files changed in PR
    const { data: files } = await octokit.rest.pulls.listFiles({
      owner,
      repo,
      pull_number: 5
    });
    console.log('\\nFiles changed:');
    files.forEach(f => console.log(`- ${f.filename} (${f.status})`));

    // Get check runs for PR head
    const { data: checkRuns } = await octokit.rest.checks.listForRef({
      owner,
      repo,
      ref: pr.head.sha
    });
    console.log('\\nCheck runs:');
    checkRuns.check_runs.forEach(run => {
      console.log(`- ${run.name}: ${run.status} | ${run.conclusion}`);
    });

  } catch (e) {
    console.error('Error:', e.message);
  }
}

checkPR();
