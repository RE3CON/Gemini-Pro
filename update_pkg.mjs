import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
pkg.name = '@re3con/gemini-pro';
pkg.version = '1.0.0';
delete pkg.private;
pkg.publishConfig = {
  "registry": "https://npm.pkg.github.com"
};
pkg.repository = {
  "type": "git",
  "url": "git+https://github.com/RE3CON/Gemini-Pro.git"
};

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log('package.json updated');
