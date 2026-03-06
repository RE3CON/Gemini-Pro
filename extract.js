import fs from 'fs';

const appCode = fs.readFileSync('./src/App.tsx', 'utf8');
const match = appCode.match(/const MERGED_SCRIPT = `([\s\S]*?)`;/);

if (match && match[1]) {
  fs.writeFileSync('./google-ai-identity.user.js', match[1]);
  console.log('Successfully created google-ai-identity.user.js');
} else {
  console.error('Failed to extract script');
}
