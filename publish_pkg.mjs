import fs from 'fs';
import { execSync } from 'child_process';

const token = fs.readFileSync('.token', 'utf-8').trim();
fs.writeFileSync('.npmrc', `//npm.pkg.github.com/:_authToken=${token}\n`);

try {
  execSync('npm publish', { stdio: 'inherit' });
  console.log('Published to GitHub Packages successfully.');
} catch (e) {
  console.error('Failed to publish to GitHub Packages.');
}
