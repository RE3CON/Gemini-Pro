import fs from 'fs';

async function createRelease() {
  try {
    const token = fs.readFileSync('.token', 'utf-8').trim();
    const repo = 'RE3CON/Gemini-Pro';
    const tag = 'v28.0.0';
    const name = 'Gemini Adaptive Suite v28.0.0';
    const body = `## ⚠️ About This Project & Technical Reality\n\n**This project is currently a coding test and showcase built with the absolutely genius Gemini Coding Assistant!**\n\nWhile the UI presents many advanced features (like device spoofing and deep system integrations), these are currently placebos in the UserScript context. \n\n**The Technical Reality:** To achieve *real* UA spoofing and complete control over Chrome-based browsers on Android, you must use **ADB commands** to run Chrome with insecure command-line flags and modify the browser's \`Local State\` file. A simple UserScript cannot bypass these Android-level security restrictions.\n\n**Future Plans:** I recently acquired Gemini Pro on Google Workspace Business Turkey, and this repository will soon pivot to something completely different and highly useful—focusing on real AI tips, related tech, and special offers. Stay tuned!`;

    const response = await fetch(`https://api.github.com/repos/${repo}/releases`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tag_name: tag,
        name: name,
        body: body,
        draft: false,
        prerelease: false
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`Release created successfully: ${data.html_url}`);
    } else {
      const error = await response.text();
      console.error(`Failed to create release: ${response.status} ${response.statusText}`);
      console.error(error);
    }
  } catch (e) {
    console.error(e);
  }
}

createRelease();
