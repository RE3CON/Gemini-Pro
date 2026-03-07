const { execSync } = require('child_process');

async function checkCommit() {
  try {
    console.log('Checking commit 877eee4...');
    execSync('cd Gemini-Pro && git show --stat 877eee4', { stdio: 'inherit' });
  } catch (e) {
    console.error('Error:', e.message);
  }
}

checkCommit();
