import { execSync } from 'child_process';
import fs from 'fs';

try {
  const token = fs.readFileSync('.token', 'utf-8').trim();
  
  execSync('git add App.tsx README.md', {stdio: 'pipe'});
  
  try {
    execSync('git commit -m "feat: use raw github urls to trigger userscript installation"', {stdio: 'pipe'});
  } catch (e) {}
  
  const repoUrl = `https://RE3CON:${token}@github.com/RE3CON/Gemini-Pro.git`;
  execSync(`git push --force ${repoUrl} HEAD:main`, {stdio: 'pipe'});
  
  console.log('SUCCESS');
} catch (e) {
  console.error('FAILED');
  if (e.stderr) {
    const errStr = e.stderr.toString().replace(/ghp_[a-zA-Z0-9]+/g, 'ghp_***');
    console.error(errStr);
  } else {
    console.error(e.message);
  }
}
