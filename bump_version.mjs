import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-AI';
const path = 'package.json';

async function incrementVersion() {
  try {
    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path
    });
    
    let content = Buffer.from(fileData.content, 'base64').toString('utf-8');
    const pkg = JSON.parse(content);
    
    // Increment version (simple patch increment)
    const versionParts = pkg.version.split('.');
    versionParts[2] = parseInt(versionParts[2]) + 1;
    pkg.version = versionParts.join('.');
    
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: `chore: bump version to ${pkg.version}`,
      content: Buffer.from(JSON.stringify(pkg, null, 2)).toString('base64'),
      sha: fileData.sha
    });
    
    console.log(`Version bumped to ${pkg.version}`);
    
  } catch (error) {
    console.error(`Error bumping version:`, error.message);
  }
}

incrementVersion();
