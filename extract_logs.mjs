import fs from 'fs';
import JSZip from 'jszip';
import path from 'path';

const data = fs.readFileSync('logs.zip');
JSZip.loadAsync(data).then(zip => {
  zip.forEach((relativePath, zipEntry) => {
    if (zipEntry.dir) {
      fs.mkdirSync(relativePath, { recursive: true });
    } else {
      const dir = path.dirname(relativePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      zipEntry.async('nodebuffer').then(content => {
        fs.writeFileSync(relativePath, content);
        console.log(`Extracted: ${relativePath}`);
      });
    }
  });
});
