import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-AI';

async function getFile(path) {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path
    });
    
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    console.log(content);
    
  } catch (error) {
    console.error(`Error fetching file ${path}:`, error.message);
  }
}

console.log("--- src/App.tsx ---");
await getFile('src/App.tsx');
console.log("\n--- src/types.ts ---");
await getFile('src/types.ts');
