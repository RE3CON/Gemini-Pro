import { Octokit } from "@octokit/rest";
import fs from 'fs';

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-Pro';
const file_path = 'dist.zip';
const release_id = 294231599;

async function uploadAsset() {
  try {
    const content = fs.readFileSync(file_path);
    
    await octokit.repos.uploadReleaseAsset({
      owner,
      repo,
      release_id,
      name: file_path,
      data: content,
      headers: {
        'content-type': 'application/zip',
        'content-length': content.length
      }
    });
    
    console.log(`Asset ${file_path} uploaded successfully.`);
    
  } catch (error) {
    console.error(`Error uploading asset:`, error.message);
  }
}

uploadAsset();
