import { execSync } from 'child_process';
import fs from 'fs';

try {
  console.log('--- Resolving Merge Conflicts ---');

  // 1. Prefer upstream for build and config files
  const theirsFiles = [
    '.gitignore',
    'LICENSE',
    'README.md',
    'SECURITY.md',
    'index.html',
    'tsconfig.json',
    'vite.config.ts',
    'public/manifest.json'
  ];

  theirsFiles.forEach(file => {
    try {
      console.log(`Resolving ${file} using upstream version...`);
      execSync(`git checkout --theirs ${file}`, { stdio: 'inherit' });
    } catch (e) {
      console.log(`Could not checkout --theirs for ${file}: ${e.message}`);
    }
  });

  // 2. Custom resolution for package.json
  console.log('Resolving package.json...');
  const pkgContent = fs.readFileSync('package.json', 'utf-8');
  // We'll take the upstream package.json but merge the current repository's specific dependencies
  // Actually, let's just use the upstream one and then add the missing ones.
  execSync('git checkout --theirs package.json', { stdio: 'inherit' });
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  
  // Add missing dependencies from current repo
  pkg.dependencies = pkg.dependencies || {};
  pkg.dependencies['file-saver'] = '^2.0.5';
  pkg.dependencies['jszip'] = '^3.10.1';
  pkg.dependencies['react-markdown'] = '^10.1.0';
  pkg.dependencies['remark-gfm'] = '^4.0.1';
  pkg.dependencies['@types/file-saver'] = '^2.0.7';
  
  // Keep current repository name if it's important, but user said "Take all advantages"
  // Let's keep the name as gemini-pro but update version and description from upstream
  pkg.name = '@re3con/gemini-pro'; 
  
  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));

  // 3. Custom resolution for metadata.json
  console.log('Resolving metadata.json...');
  execSync('git checkout --ours metadata.json', { stdio: 'inherit' });
  // Keep the current metadata name/description but maybe update permissions if upstream has more
  // Actually, let's just keep ours for now.

  // 4. Resolve package-lock.json (just use theirs and we'll npm install later)
  console.log('Resolving package-lock.json...');
  execSync('git checkout --theirs package-lock.json', { stdio: 'inherit' });

  // 5. Handle .github/workflows/deploy.yml
  console.log('Resolving .github/workflows/deploy.yml...');
  execSync('git checkout --theirs .github/workflows/deploy.yml', { stdio: 'inherit' });

  console.log('\n--- Finalizing Merge ---');
  execSync('git add .', { stdio: 'inherit' });
  // We don't commit yet, we need to make sure it builds.
  
} catch (error) {
  console.error('Error during conflict resolution:', error.message);
}
