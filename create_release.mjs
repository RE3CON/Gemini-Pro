import { Octokit } from "@octokit/rest";
import fs from 'fs';

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-AI';
const tag_name = 'v1.0.0';
const file_path = 'dist.zip';

async function createRelease() {
  try {
    // 1. Create Release
    const { data: release } = await octokit.repos.createRelease({
      owner,
      repo,
      tag_name,
      name: `Release ${tag_name}`,
      body: 'Initial release of Gemini-AI',
      draft: false,
      prerelease: false
    });
    
    console.log(`Release ${tag_name} created successfully: ${release.html_url}`);
    
    // 2. Upload Asset
    const content = fs.readFileSync(file_path);
    
    await octokit.repos.uploadReleaseAsset({
      owner,
      repo,
      release_id: release.id,
      name: file_path,
      data: content,
      headers: {
        'content-type': 'application/zip',
        'content-length': content.length
      }
    });
    
    console.log(`Asset ${file_path} uploaded successfully.`);
    
  } catch (error) {
    console.error(`Error creating release:`, error.message);
  }
}

createRelease();
