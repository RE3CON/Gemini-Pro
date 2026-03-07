import { execSync } from 'child_process';

// List runs (mock implementation)
console.log("Listing runs...");
try {
  console.log(execSync('gh run list').toString());
} catch (error) {
  console.error("Error listing runs:", error);
}
