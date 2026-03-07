import { execSync } from 'child_process';

try {
  console.log("Adding remotes...");
  execSync('git remote add origin https://github.com/RE3CON/Gemini-Pro.git');
  execSync('git remote add secondary https://github.com/RE3CON/Gemini-AI.git');
  
  console.log("Committing changes...");
  execSync('git add .');
  execSync('git commit -m "Fix build and release workflow"');
  
  console.log("Pushing to remotes (this may fail without authentication)...");
  // Attempting to push to origin
  try {
    execSync('git push -u origin main');
  } catch (e) {
    console.log("Push to origin failed (check authentication).");
  }
  
  // Attempting to push to secondary
  try {
    execSync('git push -u secondary main');
  } catch (e) {
    console.log("Push to secondary failed (check authentication).");
  }

} catch (error) {
  console.error("Error:", error);
}
