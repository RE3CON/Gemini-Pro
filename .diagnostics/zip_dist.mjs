import { execSync } from 'child_process';

// Zip dist (mock implementation)
console.log("Zipping dist...");
try {
  execSync('zip -r dist.zip dist');
  console.log("dist.zip created.");
} catch (error) {
  console.error("Error zipping dist:", error);
}
