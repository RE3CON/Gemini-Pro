const { execSync } = require('child_process');

async function fixLockFile() {
  try {
    console.log('Cloning repository...');
    execSync('git clone https://ghp_***MASKED***@github.com/RE3CON/Gemini-Pro.git', { stdio: 'inherit' });
    
    console.log('Running npm install...');
    execSync('cd Gemini-Pro && npm install', { stdio: 'inherit' });
    
    console.log('Committing and pushing changes...');
    execSync('cd Gemini-Pro && git config user.name "AI Assistant" && git config user.email "assistant@example.com" && git add package-lock.json && git commit -m "chore: update package-lock.json to fix CI build" && git push origin main', { stdio: 'inherit' });
    
    console.log('Successfully updated package-lock.json!');
  } catch (e) {
    console.error('Error:', e.message);
  }
}

fixLockFile();
