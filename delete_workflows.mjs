import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-AI';

async function deleteWorkflows() {
  try {
    const files = [
      '.github/workflows/deploy.yml',
      '.github/workflows/pages.yml'
    ];
    
    for (const path of files) {
      try {
        const { data: fileData } = await octokit.repos.getContent({ owner, repo, path });
        await octokit.repos.deleteFile({
          owner,
          repo,
          path,
          message: `chore: remove redundant workflow ${path}`,
          sha: fileData.sha
        });
        console.log(`Deleted ${path}`);
      } catch (e) {
        console.log(`File ${path} not found or error: ${e.message}`);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

deleteWorkflows();
