import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-Pro';

async function checkCommit() {
  try {
    const commit = await octokit.repos.getCommit({
      owner,
      repo,
      ref: 'main'
    });
    
    const tree = await octokit.git.getTree({
      owner,
      repo,
      tree_sha: commit.data.commit.tree.sha,
      recursive: 'true'
    });
    
    const appTsx = tree.data.tree.find(t => t.path === 'src/App.tsx');
    console.log('src/App.tsx exists:', !!appTsx);
  } catch (error) {
    console.error(`Error:`, error.message);
  }
}

checkCommit();
