const { execSync } = require('child_process');

async function fixLockFile() {
  try {
    console.log('Recreating package-lock.json...');
    execSync('cd Gemini-Pro && rm package-lock.json && npm install', { stdio: 'inherit' });
    
    console.log('Committing and pushing changes...');
    execSync('cd Gemini-Pro && git add package-lock.json && git commit -m "chore: recreate package-lock.json to fix CI build" && git push origin main', { stdio: 'inherit' });
    
    console.log('Successfully updated package-lock.json!');
  } catch (e) {
    console.error('Error:', e.message);
  }
}

fixLockFile();
