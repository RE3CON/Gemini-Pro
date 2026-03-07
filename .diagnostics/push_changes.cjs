const { execSync } = require('child_process');

// Push changes to GitHub
console.log("Pushing changes to GitHub...");
try {
  execSync('git add .');
  execSync('git commit -m "Update from diagnostic script"');
  execSync('git push');
  console.log("Changes pushed successfully.");
} catch (error) {
  console.error("Error pushing changes:", error);
}
