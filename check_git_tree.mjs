import { execSync } from 'child_process';

try {
  const output = execSync('git ls-tree HEAD src/', { cwd: './Gemini-Pro' }).toString();
  console.log(output);
} catch (e) {
  console.error(e.message);
}
