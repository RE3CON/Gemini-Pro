import fs from 'fs';

async function updateRelease() {
  try {
    const token = fs.readFileSync('.token', 'utf-8').trim();
    const repo = 'RE3CON/Gemini-Pro';
    const tag = 'v27.9.23';
    
    // Get release by tag
    const getRes = await fetch(`https://api.github.com/repos/${repo}/releases/tags/${tag}`, {
      headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
    });
    const release = await getRes.json();
    
    if (!release.id) {
        console.error('Release not found');
        return;
    }

    const body = `## ⚠️ About This Project & Technical Reality\n\n**This project is currently a coding test and showcase built with the absolutely genius Gemini Coding Assistant!**\n\nWhile the UI presents many advanced features (like device spoofing and deep system integrations), these are currently placebos in the UserScript context. \n\n**The Technical Reality:** To achieve *real* UA spoofing and complete control over Chrome-based browsers on Android, you must use **ADB commands** (which mostly make temporary changes in RAM). Most importantly, on Android without root, the \`Local State\` file is the real control center for Chrome-based browsers (especially since Developer Tools are not available in the mobile browser). You must modify this file alongside utilizing internal \`chrome://\` URLs, flags, and debug menus. A simple UserScript cannot bypass these Android-level security restrictions.\n\n**Future Plans:** I recently acquired Gemini Pro on Google Workspace Business Turkey, and this repository will soon pivot to something completely different and highly useful—focusing on real AI tips, related tech, and special offers. Stay tuned!`;

    const patchRes = await fetch(`https://api.github.com/repos/${repo}/releases/${release.id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ body: body })
    });

    if (patchRes.ok) {
      console.log('Release updated successfully');
    } else {
      console.error('Failed to update release', await patchRes.text());
    }
  } catch (e) {
    console.error(e);
  }
}

updateRelease();
