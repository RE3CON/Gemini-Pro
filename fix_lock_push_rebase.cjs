const { execSync } = require('child_process');

async function fixLockFile() {
  try {
    console.log('Pulling latest changes with rebase...');
    execSync('cd Gemini-Pro && git pull --rebase origin main', { stdio: 'inherit' });
    
    console.log('Committing and pushing changes...');
    execSync('cd Gemini-Pro && git push origin main', { stdio: 'inherit' });
    
    console.log('Successfully updated package-lock.json!');
  } catch (e) {
    console.error('Error:', e.message);
  }
}

fixLockFile();
