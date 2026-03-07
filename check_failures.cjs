const { Octokit } = require('octokit');

async function checkFailures() {
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
    
    for (const run of checkRuns.check_runs) {
      if (run.conclusion === 'failure') {
        console.log(`\\n=== Failed Check: ${run.name} ===`);
        console.log(`URL: ${run.html_url}`);
        
        // Fetch annotations if any
        const { data: annotations } = await octokit.rest.checks.listAnnotations({
          owner,
          repo,
          check_run_id: run.id
        });
        
        if (annotations.length > 0) {
          console.log('Annotations:');
          annotations.forEach(a => console.log(`- [${a.annotation_level}] ${a.path}:${a.start_line} - ${a.message}`));
        } else {
          console.log('No annotations found. You might need to check the GitHub Actions logs directly via the URL.');
        }
      }
    }

  } catch (e) {
    console.error('Error:', e.message);
  }
}

checkFailures();
