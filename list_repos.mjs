import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });

async function listRepos() {
  try {
    const { data } = await octokit.repos.listForAuthenticatedUser({
      per_page: 100
    });
    
    const repoNames = data.map(repo => repo.full_name);
    console.log("Repositories:", repoNames);
    
    const geminiAIRepo = data.find(repo => repo.name === 'Gemini-AI');
    if (geminiAIRepo) {
        console.log("Found Gemini-AI:", geminiAIRepo.full_name);
    } else {
        console.log("Gemini-AI not found.");
    }
    
  } catch (error) {
    console.error(`Error listing repos:`, error.message);
  }
}

listRepos();
