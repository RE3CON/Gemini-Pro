import { execSync } from 'child_process';
import fs from 'fs';

try {
  const token = fs.readFileSync('.token', 'utf-8').trim();
  const repoUrl = `https://oauth2:${token}@github.com/RE3CON/Gemini-Pro.git`;
  
  // Undo the last commit that included the secret
  try {
    execSync('git reset HEAD~1', { stdio: 'inherit' });
  } catch (e) {
    console.log('Could not reset HEAD~1, might not be needed.');
  }

  // Add .npmrc to .gitignore if not already there
  const gitignore = fs.readFileSync('.gitignore', 'utf-8');
  if (!gitignore.includes('.npmrc')) {
    fs.appendFileSync('.gitignore', '\n.npmrc\n');
  }

  // Remove .npmrc from git tracking just in case
  try {
    execSync('git rm --cached .npmrc', { stdio: 'inherit' });
  } catch (e) {
    console.log('.npmrc not tracked.');
  }

  execSync('git add .', { stdio: 'inherit' });
  
  try {
    execSync('git commit -m "chore: Synchronize all files to GitHub, ignore .npmrc"', { stdio: 'inherit' });
  } catch (commitError) {
     console.log('No changes to commit.');
  }

  execSync(`git push ${repoUrl} master`, { stdio: 'inherit' });
  console.log('Successfully synchronized and pushed all changes to GitHub.');
} catch (error) {
  console.error('Error pushing to GitHub:', error.message);
}
