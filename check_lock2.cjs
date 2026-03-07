const { execSync } = require('child_process');

async function checkLock() {
  try {
    console.log('Checking package-lock.json for node_modules/octokit...');
    execSync('cd Gemini-Pro && grep -A 5 "\\"node_modules/octokit\\"" package-lock.json || echo "Not found"', { stdio: 'inherit' });
  } catch (e) {
    console.error('Error:', e.message);
  }
}

checkLock();
