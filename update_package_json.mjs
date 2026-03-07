import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-AI';
const path = 'package.json';

async function updatePackageJson() {
  try {
    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path
    });
    
    let content = Buffer.from(fileData.content, 'base64').toString('utf-8');
    
    // Update name
    content = content.replace(
      '"name": "@re3con/gemini-pro"',
      '"name": "@re3con/gemini-ai"'
    );
    
    // Update repository URL
    content = content.replace(
      '"url": "git+https://github.com/RE3CON/Gemini-Pro.git"',
      '"url": "git+https://github.com/RE3CON/Gemini-AI.git"'
    );
    
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: 'fix: update package name and repository URL to match Gemini-AI',
      content: Buffer.from(content).toString('base64'),
      sha: fileData.sha
    });
    
    console.log('package.json updated successfully.');
    
  } catch (error) {
    console.error(`Error updating package.json:`, error.message);
  }
}

updatePackageJson();
