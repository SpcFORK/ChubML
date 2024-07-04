const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

const sourceDir = 'front/dist/';
const outputZip = 'front/dist.zip';

const files = fs.readdirSync(path.resolve(sourceDir));
const output = fs.createWriteStream(outputZip);
const archive = archiver('zip', {
  zlib: { level: 9 }
});

archive.pipe(output);

console.log('Zip in progress...');

files.forEach(file => {
  const filePath = path.join(sourceDir, file);
  console.log('Adding file: ', filePath);
  archive.file(filePath, { name: file });
});

archive.finalize();