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
    
    // 2. Remove the failing Publish Package step
    const newContent = content.replace(
      `      - name: Publish to GitHub Packages
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        run: |
          npm config set //npm.pkg.github.com/:_authToken \${{ secrets.GITHUB_TOKEN }}
          npm pkg set version=12.5.\${{ github.run_number }}-\${{ github.sha.slice(0, 7) }}
          npm publish --registry https://npm.pkg.github.com
        env:
          NODE_AUTH_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`,
      ''
    );
    
    // 3. Update the file
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: 'fix: remove failing Publish Package step',
      content: Buffer.from(newContent).toString('base64'),
      sha: fileData.sha
    });
    
    console.log('Workflow file updated successfully.');
    
  } catch (error) {
    console.error(`Error updating file:`, error.message);
  }
}

updateWorkflowFile();
