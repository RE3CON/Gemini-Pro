import { execSync } from 'child_process';

try {
  console.log('--- Fetching from upstream ---');
  execSync('git fetch upstream', { stdio: 'inherit' });

  console.log('\n--- Checking differences between master and upstream/main ---');
  const diff = execSync('git diff master upstream/main --stat').toString();
  console.log(diff);
  
  if (diff) {
    console.log('\n--- Attempting to merge upstream/main into master ---');
    // We use --allow-unrelated-histories if needed, but let's try a normal merge first
    try {
        execSync('git merge upstream/main --allow-unrelated-histories -m "merge: integrate features from Gemini-AI"', { stdio: 'inherit' });
    } catch (mergeError) {
        console.log('Merge conflict or error. You might need to resolve manually.');
        console.log(mergeError.message);
    }
  }
} catch (error) {
  console.error('Error:', error.message);
}
