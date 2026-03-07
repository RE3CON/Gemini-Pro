const { execSync } = require('child_process');

async function checkLock() {
  try {
    console.log('Checking package-lock.json...');
    execSync('cd Gemini-Pro && grep -A 5 "\\"octokit\\"" package-lock.json', { stdio: 'inherit' });
  } catch (e) {
    console.error('Error:', e.message);
  }
}

checkLock();
