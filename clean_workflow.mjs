import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-AI';
const path = '.github/workflows/build-and-release.yml';

async function updateWorkflowFile() {
  try {
    // 1. Get current file
    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path
    });
    
    const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
    
    // 2. Remove the failing Publish Package step (if it still exists)
    // and ensure the workflow is clean.
    const lines = content.split('\n');
    const newLines = [];
    let skip = false;
    for (const line of lines) {
      if (line.includes('- name: Publish to GitHub Packages')) {
        skip = true;
      }
      if (skip) {
        if (line.trim() === '' || line.startsWith('      - name:')) {
            if (line.startsWith('      - name:')) {
                skip = false;
                newLines.push(line);
            } else {
                skip = false;
            }
        }
        continue;
      }
      newLines.push(line);
    }
    
    const newContent = newLines.join('\n');
    
    // 3. Update the file
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: 'fix: ensure failing Publish Package step is removed',
      content: Buffer.from(newContent).toString('base64'),
      sha: fileData.sha
    });
    
    console.log('Workflow file cleaned successfully.');
    
  } catch (error) {
    console.error(`Error updating file:`, error.message);
  }
}

updateWorkflowFile();
