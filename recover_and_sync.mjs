import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

try {
  const token = fs.readFileSync('.token', 'utf-8').trim();
  const repoUrl = `https://oauth2:${token}@github.com/RE3CON/Gemini-Pro.git`;

  console.log('--- Full Git Repository Recovery ---');

  // 1. Remove corrupted .git directory
  if (fs.existsSync('.git')) {
    console.log('Removing corrupted .git directory...');
    // Use fs.rmSync if available, otherwise shell command
    execSync('rm -rf .git', { stdio: 'inherit' });
  }

  // 2. Initialize new repository
  console.log('Initializing new repository...');
  execSync('git init', { stdio: 'inherit' });

  // 3. Add remote
  console.log('Adding remote...');
  execSync(`git remote add origin ${repoUrl}`, { stdio: 'inherit' });

  // 4. Fetch from remote
  console.log('Fetching from remote...');
  execSync('git fetch origin master', { stdio: 'inherit' });

  // 5. Reset to remote master
  console.log('Resetting to remote master...');
  execSync('git reset --mixed origin/master', { stdio: 'inherit' });

  // 6. Add all local files
  console.log('Adding local files...');
  execSync('git add .', { stdio: 'inherit' });

  // 7. Commit changes
  try {
    execSync('git config user.email "RE3CON@users.noreply.github.com"', { stdio: 'inherit' });
    execSync('git config user.name "RE3CON"', { stdio: 'inherit' });
    
    const status = execSync('git status --porcelain').toString();
    if (status) {
      console.log('Committing changes...');
      execSync('git commit -m "chore: full session synchronization after repository recovery"', { stdio: 'inherit' });
    } else {
      console.log('No local changes to commit.');
    }
  } catch (e) {
    console.log('Commit check/execution error:', e.message);
  }

  // 8. Push to remote
  console.log('Pushing to remote...');
  execSync('git push origin master', { stdio: 'inherit' });

  console.log('--- Recovery and Synchronization Complete ---');
} catch (error) {
  console.error('Critical Error during recovery:', error.message);
}
