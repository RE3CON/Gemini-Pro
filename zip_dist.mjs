import fs from 'fs';
import JSZip from 'jszip';
import path from 'path';

const zip = new JSZip();
const distPath = './dist';
const zipPath = './dist.zip';

function addFilesToZip(dir, zipFolder) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      addFilesToZip(filePath, zipFolder.folder(file));
    } else {
      zipFolder.file(file, fs.readFileSync(filePath));
    }
  }
}

addFilesToZip(distPath, zip);

zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
  .pipe(fs.createWriteStream(zipPath))
  .on('finish', () => {
    console.log('dist.zip created successfully.');
  });
