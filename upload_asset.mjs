import { Octokit } from "@octokit/rest";
import fs from 'fs';

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-Pro';
const file_path = 'google-ai-identity.user.js';
const release_id = 294231599;

async function uploadAsset() {
  try {
    // 1. Get file content
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: file_path
    });
    
    const content = Buffer.from(data.content, 'base64');
    
    // 2. Upload asset
    await octokit.repos.uploadReleaseAsset({
      owner,
      repo,
      release_id,
      name: file_path,
      data: content,
      headers: {
        'content-type': 'application/javascript',
        'content-length': content.length
      }
    });
    
    console.log(`Asset ${file_path} uploaded successfully.`);
    
  } catch (error) {
    console.error(`Error uploading asset:`, error.message);
  }
}

uploadAsset();
