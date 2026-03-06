import { execSync } from 'child_process';
import fs from 'fs';

try {
  const token = fs.readFileSync('.token', 'utf-8').trim();
  const repoUrl = `https://oauth2:${token}@github.com/RE3CON/Gemini-Pro.git`;
  
  console.log('--- Starting Synchronization ---');

  // 1. Fetch latest from remote
  console.log('Fetching from remote...');
  execSync(`git fetch ${repoUrl} master`, { stdio: 'inherit' });

  // 2. Add all local changes
  console.log('Adding local changes...');
  execSync('git add .', { stdio: 'inherit' });

  // 3. Commit changes if any
  try {
    const status = execSync('git status --porcelain').toString();
    if (status) {
      console.log('Committing changes...');
      execSync('git commit -m "chore: full session synchronization"', { stdio: 'inherit' });
    } else {
      console.log('No local changes to commit.');
    }
  } catch (e) {
    console.log('Error during commit check/execution:', e.message);
  }

  // 4. Push to remote
  console.log('Pushing to remote...');
  execSync(`git push ${repoUrl} master`, { stdio: 'inherit' });

  console.log('--- Synchronization Complete ---');
} catch (error) {
  console.error('Critical Error during synchronization:', error.message);
}
