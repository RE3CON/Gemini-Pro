const { Octokit } = require('octokit');

async function checkBuild() {
  const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
  const owner = 'RE3CON';
  const repo = 'Gemini-Pro';

  try {
    const { data: checkRuns } = await octokit.rest.checks.listForRef({
      owner,
      repo,
      ref: 'main'
    });
    
    console.log('Check runs for main:');
    checkRuns.check_runs.forEach(run => {
      console.log(`- ${run.name}: ${run.status} | ${run.conclusion}`);
    });

  } catch (e) {
    console.error('Error:', e.message);
  }
}

checkBuild();
