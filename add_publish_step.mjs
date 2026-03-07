import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: 'ghp_***MASKED***' });
const owner = 'RE3CON';
const repo = 'Gemini-AI';
const path = '.github/workflows/build-and-release.yml';

async function addPublishStep() {
  try {
    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path
    });
    
    const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
    
    const publishStep = `
      - name: Publish to GitHub Packages
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        run: |
          npm config set //npm.pkg.github.com/:_authToken \${{ secrets.GITHUB_TOKEN }}
          npm publish --registry https://npm.pkg.github.com
        env:
          NODE_AUTH_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`;
    
    // Insert after Create GitHub Release
    const newContent = content.replace(
      '        env:\n          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}',
      '        env:\n          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}\n' + publishStep
    );
    
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: 'feat: re-add Publish to GitHub Packages step with correct package name',
      content: Buffer.from(newContent).toString('base64'),
      sha: fileData.sha
    });
    
    console.log('Workflow file updated successfully.');
    
  } catch (error) {
    console.error(`Error updating file:`, error.message);
  }
}

addPublishStep();
