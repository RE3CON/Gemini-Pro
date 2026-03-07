const { Octokit } = require('octokit');

async function checkIssues() {
  const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
  const owner = 'RE3CON';
  const repo = 'Gemini-Pro';

  try {
    console.log('--- Latest Commits ---');
    const { data: commits } = await octokit.rest.repos.listCommits({
      owner,
      repo,
      per_page: 5
    });
    
    for (const commit of commits) {
      console.log(`[${commit.sha.substring(0, 7)}] ${commit.commit.message.split('\\n')[0]}`);
      
      // Check check runs for this commit
      const { data: checkRuns } = await octokit.rest.checks.listForRef({
        owner,
        repo,
        ref: commit.sha
      });
      
      if (checkRuns.total_count > 0) {
        checkRuns.check_runs.forEach(run => {
          console.log(`  -> Check: ${run.name} | Status: ${run.status} | Conclusion: ${run.conclusion}`);
        });
      } else {
        console.log('  -> No check runs found.');
      }
    }
    
    console.log('\\n--- Open Pull Requests ---');
    const { data: prs } = await octokit.rest.pulls.list({
      owner,
      repo,
      state: 'open'
    });
    if (prs.length === 0) console.log('No open PRs.');
    prs.forEach(pr => console.log(`[PR #${pr.number}] ${pr.title}`));

  } catch (e) {
    console.error('Error:', e.message);
  }
}

checkIssues();
