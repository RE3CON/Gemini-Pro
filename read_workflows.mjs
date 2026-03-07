import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-AI';

async function getWorkflowFiles() {
  try {
    const files = [
      '.github/workflows/build-and-release.yml',
      '.github/workflows/deploy.yml',
      '.github/workflows/pages.yml'
    ];
    
    for (const path of files) {
      console.log(`--- ${path} ---`);
      try {
        const { data } = await octokit.repos.getContent({ owner, repo, path });
        console.log(Buffer.from(data.content, 'base64').toString('utf-8'));
      } catch (e) {
        console.log(`File ${path} not found or error: ${e.message}`);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

getWorkflowFiles();
