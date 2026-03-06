import { execSync } from 'child_process';
try {
  console.log('--- Finalizing Merge and Cleanup ---');
  execSync('git add -A', { stdio: 'inherit' });
  execSync('git commit -m "chore: finalize merge, resolve linting errors, and clean up workspace"', { stdio: 'inherit' });
  console.log('Changes committed.');
} catch (e) {
  console.log(e.stdout?.toString() || e.message);
}
