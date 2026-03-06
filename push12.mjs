import { execSync } from 'child_process';
import fs from 'fs';

try {
  const token = fs.readFileSync('.token', 'utf-8').trim();
  const repoUrl = `https://oauth2:${token}@github.com/RE3CON/Gemini-Pro.git`;
  
  execSync('git add README.md', { stdio: 'inherit' });
  execSync('git commit -m "docs: Update README to reflect Android device spoofing (Pixel 11 Pro XL) rather than desktop"', { stdio: 'inherit' });
  execSync(`git push ${repoUrl} master`, { stdio: 'inherit' });
  console.log('Successfully pushed changes to GitHub.');
} catch (error) {
  console.error('Error pushing to GitHub:', error.message);
}
