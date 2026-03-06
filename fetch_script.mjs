import fs from 'fs';

async function fetchScript() {
  const res = await fetch('https://raw.githubusercontent.com/RE3CON/Gemini-AI/main/google-ai-identity.user.js');
  const script = await res.text();
  fs.writeFileSync('Gemini-AI-script.js', script);
}

fetchScript();
