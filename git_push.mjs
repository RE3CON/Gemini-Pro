import { execSync } from 'child_process';
try {
  console.log('Adding changes...');
  execSync('git add .', { stdio: 'inherit' });
  
  console.log('Committing changes...');
  execSync('git commit -m "Update Gemini models to 3.1 and version to 28.3.6-ULTIMATE"', { stdio: 'inherit' });
  
  console.log('Pushing to GitHub...');
  execSync('git push origin master', { stdio: 'inherit' });
  console.log('Successfully pushed to GitHub.');
} catch (e) {
  console.log('Error:', e.stdout || e.message);
}
