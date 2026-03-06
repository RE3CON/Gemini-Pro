import { execSync } from 'child_process';
try {
  execSync('git add -A', { stdio: 'inherit' });
  execSync('git commit -m "chore: final cleanup and lint fixes"', { stdio: 'inherit' });
  console.log('Final commit done.');
} catch (e) {
  console.log(e.stdout?.toString() || e.message);
}
