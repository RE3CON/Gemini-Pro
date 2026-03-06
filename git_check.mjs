import { execSync } from 'child_process';
try {
  const status = execSync('git status', { encoding: 'utf8' });
  console.log('Git Status:\n', status);
  
  const remotes = execSync('git remote -v', { encoding: 'utf8' });
  console.log('Remotes:\n', remotes);
} catch (e) {
  console.log('Error:', e.stdout || e.message);
}
