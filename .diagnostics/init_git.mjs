import { execSync } from 'child_process';

// Initialize git repository
console.log("Initializing git repository...");
try {
  execSync('git init');
  execSync('git config user.name "github-actions[bot]"');
  execSync('git config user.email "github-actions[bot]@users.noreply.github.com"');
  console.log("Git repository initialized.");
} catch (error) {
  console.error("Error initializing git:", error);
}
