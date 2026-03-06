import fs from 'fs';
import { execSync } from 'child_process';

async function fetchRepo() {
  const repo = 'RE3CON/Gemini-AI';
  const url = `https://api.github.com/repos/${repo}/contents`;
  
  const res = await fetch(url);
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

fetchRepo();
