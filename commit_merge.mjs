import { execSync } from 'child_process';
try {
  console.log('--- Finalizing Merge ---');
  execSync('git add .gitignore', { stdio: 'inherit' });
  execSync('git commit -m "merge: integrate features from Gemini-AI and resolve conflicts"', { stdio: 'inherit' });
  console.log('Merge committed.');
} catch (e) {
  console.log(e.stdout?.toString() || e.message);
}
