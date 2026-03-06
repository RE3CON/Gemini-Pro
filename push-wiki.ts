import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

async function run() {
  const token = process.argv[2];
  const repoUrl = `https://${token}@github.com/RE3CON/Gemini-AI.wiki.git`;
  const wikiDir = path.join(process.cwd(), 'wiki-temp');

  try {
    if (fs.existsSync(wikiDir)) {
      fs.rmSync(wikiDir, { recursive: true, force: true });
    }
    fs.mkdirSync(wikiDir);
    process.chdir(wikiDir);

    execSync('git init');
    execSync('git config user.name "AI Assistant"');
    execSync('git config user.email "write2recon@gmail.com"');

    fs.writeFileSync('Home.md', '# Initializing Wiki');

    execSync('git add .');
    execSync('git commit -m "Init"');
    
    console.log("Pushing to wiki...");
    execSync(`git push ${repoUrl} master --force`);
    console.log("Wiki pushed successfully!");
  } catch (error) {
    console.error("Failed to push wiki:", error.message);
  } finally {
    process.chdir('..');
    if (fs.existsSync(wikiDir)) {
      fs.rmSync(wikiDir, { recursive: true, force: true });
    }
  }
}

run();
