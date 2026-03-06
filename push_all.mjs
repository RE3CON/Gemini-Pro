import { execSync } from 'child_process';
import fs from 'fs';

try {
  const token = fs.readFileSync('.token', 'utf-8').trim();
  const repoUrl = `https://oauth2:${token}@github.com/RE3CON/Gemini-Pro.git`;
  
  execSync('git add .', { stdio: 'inherit' });
  
  try {
    execSync('git commit -m "chore: Synchronize all files to GitHub"', { stdio: 'inherit' });
  } catch (commitError) {
     console.log('No changes to commit.');
  }

  execSync(`git push ${repoUrl} master`, { stdio: 'inherit' });
  console.log('Successfully synchronized and pushed all changes to GitHub.');
} catch (error) {
  console.error('Error pushing to GitHub:', error.message);
}
