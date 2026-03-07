const { execSync } = require('child_process');

async function checkPackageJson() {
  try {
    console.log('Checking package.json...');
    execSync('cd Gemini-Pro && cat package.json', { stdio: 'inherit' });
  } catch (e) {
    console.error('Error:', e.message);
  }
}

checkPackageJson();
