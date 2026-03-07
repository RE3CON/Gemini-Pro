import { execSync } from 'child_process';

// List workflows (mock implementation)
console.log("Listing workflows...");
try {
  console.log(execSync('gh workflow list').toString());
} catch (error) {
  console.error("Error listing workflows:", error);
}
