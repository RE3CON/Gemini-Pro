import fs from 'fs';

async function fetchFiles() {
  const readmeRes = await fetch('https://raw.githubusercontent.com/RE3CON/Gemini-AI/main/README.md');
  const readme = await readmeRes.text();
  fs.writeFileSync('Gemini-AI-README.md', readme);

  const securityRes = await fetch('https://raw.githubusercontent.com/RE3CON/Gemini-AI/main/SECURITY.md');
  const security = await securityRes.text();
  fs.writeFileSync('Gemini-AI-SECURITY.md', security);
}

fetchFiles();
