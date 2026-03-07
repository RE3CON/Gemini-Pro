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
    
    // Update repository URL
    content = content.replace(
      '"url": "git+https://github.com/RE3CON/Gemini-Pro.git"',
      '"url": "git+https://github.com/RE3CON/Gemini-AI.git"'
    );
    
    // Update bugs URL
    content = content.replace(
      '"url": "https://github.com/RE3CON/Gemini-Pro/issues"',
      '"url": "https://github.com/RE3CON/Gemini-AI/issues"'
    );
    
    // Update homepage
    content = content.replace(
      '"homepage": "https://re3con.github.io/Gemini-Pro/"',
      '"homepage": "https://re3con.github.io/Gemini-AI/"'
    );
    
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: 'fix: update remaining URLs in package.json to match Gemini-AI',
      content: Buffer.from(content).toString('base64'),
      sha: fileData.sha
    });
    
    console.log('package.json updated successfully.');
    
  } catch (error) {
    console.error(`Error updating package.json:`, error.message);
  }
}

updatePackageJson();
