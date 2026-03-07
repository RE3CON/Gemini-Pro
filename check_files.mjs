import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-AI';

async function checkFiles() {
  try {
    // Check package.json
    const { data: pkgData } = await octokit.repos.getContent({ owner, repo, path: 'package.json' });
    console.log('--- package.json ---');
    console.log(Buffer.from(pkgData.content, 'base64').toString('utf-8'));
    
    // Check workflow
    const { data: wfData } = await octokit.repos.getContent({ owner, repo, path: '.github/workflows/build-and-release.yml' });
    console.log('--- .github/workflows/build-and-release.yml ---');
    console.log(Buffer.from(wfData.content, 'base64').toString('utf-8'));
    
  } catch (error) {
    console.error(error);
  }
}

checkFiles();
