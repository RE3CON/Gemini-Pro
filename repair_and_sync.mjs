import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

try {
  const token = fs.readFileSync('.token', 'utf-8').trim();
  const repoUrl = `https://oauth2:${token}@github.com/RE3CON/Gemini-Pro.git`;

  console.log('--- Attempting Git Index Repair ---');

  // Remove the corrupted index
  if (fs.existsSync('.git/index')) {
    console.log('Removing corrupted index...');
    fs.unlinkSync('.git/index');
  }

  // Reset the index
  console.log('Resetting index...');
  execSync('git reset', { stdio: 'inherit' });

  // Now try the sync again
  console.log('--- Starting Synchronization ---');

  console.log('Adding local changes...');
  execSync('git add .', { stdio: 'inherit' });

  try {
    const status = execSync('git status --porcelain').toString();
    if (status) {
      console.log('Committing changes...');
      execSync('git commit -m "chore: full session synchronization after index repair"', { stdio: 'inherit' });
    } else {
      console.log('No local changes to commit.');
    }
  } catch (e) {
    console.log('No changes or commit error:', e.message);
  }

  console.log('Pushing to remote...');
  execSync(`git push ${repoUrl} master`, { stdio: 'inherit' });

  console.log('--- Synchronization Complete ---');
} catch (error) {
  console.error('Critical Error:', error.message);
}
