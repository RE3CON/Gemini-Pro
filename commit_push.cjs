const { execSync } = require('child_process');

async function commitAndPush() {
  try {
    console.log('Committing and pushing changes...');
    execSync('cd Gemini-Pro && git add . && git commit -m "fix: update CI workflows and extraction script" && git push origin main', { stdio: 'inherit' });
    console.log('Successfully pushed changes!');
  } catch (e) {
    console.error('Error:', e.message);
  }
}

commitAndPush();
