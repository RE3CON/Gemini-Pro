import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-Pro';

async function listTags() {
  try {
    const tags = await octokit.repos.listTags({
      owner,
      repo,
      per_page: 5
    });
    
    console.log(`--- Recent Tags for ${repo} ---`);
    tags.data.forEach(tag => {
      console.log(`Tag: ${tag.name}, Commit: ${tag.commit.sha}`);
    });
    
  } catch (error) {
    console.error(`Error fetching tags:`, error.message);
  }
}

listTags();
