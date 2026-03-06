import fs from 'fs';
import path from 'path';

async function createRelease() {
  const token = fs.readFileSync('.token', 'utf-8').trim();
  const repo = 'RE3CON/Gemini-Pro';
  
  console.log('Creating release...');
  const releaseRes = await fetch(`https://api.github.com/repos/${repo}/releases`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tag_name: 'v1.0.0',
      name: 'Gemini Adaptive Suite v1.0.0',
      body: 'Initial release of the Gemini Adaptive Suite.\n\n### Features\n- Sovereign Productivity Bridge\n- UserScript Generation\n- Android Wrapper Generation\n- Deep Ecosystem Integrations\n\nDownload the `gemini-adaptive.user.js` asset below to install directly into Tampermonkey/Violentmonkey.',
      draft: false,
      prerelease: false
    })
  });
  
  if (!releaseRes.ok) {
    const err = await releaseRes.text();
    console.error('Failed to create release:', err);
    return;
  }
  
  const releaseData = await releaseRes.json();
  console.log('Release created:', releaseData.html_url);
  
  // Upload asset
  const uploadUrl = releaseData.upload_url.replace('{?name,label}', '?name=gemini-adaptive.user.js');
  const assetPath = 'dist/gemini-adaptive.user.js';
  const assetContent = fs.readFileSync(assetPath);
  
  console.log('Uploading asset...');
  const uploadRes = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/javascript'
    },
    body: assetContent
  });
  
  if (!uploadRes.ok) {
    const err = await uploadRes.text();
    console.error('Failed to upload asset:', err);
  } else {
    console.log('Asset uploaded successfully!');
  }
}

createRelease();
