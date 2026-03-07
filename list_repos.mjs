import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';

async function listRepos() {
  try {
    const repos = await octokit.repos.listForUser({
      username: owner
    });
    
    console.log(`Repositories for ${owner}:`);
    repos.data.forEach(repo => {
      console.log(`- ${repo.name} (Open Issues: ${repo.open_issues_count})`);
    });
  } catch (error) {
    console.error(`Error:`, error.message);
  }
}

listRepos();
