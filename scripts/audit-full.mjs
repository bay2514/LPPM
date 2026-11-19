import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const stat = fs.statSync(dirPath);
    if (stat.isDirectory()) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const sourceFiles = [];
walkDir('frontend/src', (filePath) => {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.js') || filePath.endsWith('.json')) {
    sourceFiles.push(filePath);
  }
});

console.log(`Total berkas sumber yang dipindai: ${sourceFiles.length}`);

// Analisis Tautan & Placeholder
let placeholderCount = 0;
let externalLinks = new Set();
let internalLinks = [];
let placeholderLinks = [];
let issuesList = [];

const placeholderKeywords = ['Lorem', 'TODO', 'FIXME', 'Segera hadir', 'Coming soon', 'belum tersedia', 'dummy', 'contoh', 'Data contoh', 'xxx', '08xxxxxxxx', 'nama@example.com'];

sourceFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  
  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    
    // Deteksi placeholder keywords
    placeholderKeywords.forEach(kw => {
      if (line.includes(kw)) {
        placeholderCount++;
        if (placeholderCount <= 30) { // Batasi log
          // Simpan temuan
        }
      }
    });

    // Deteksi href atau to
    const hrefMatch = line.match(/href=["']([^"']+)["']/g);
    const toMatch = line.match(/to=["']([^"']+)["']/g);
    
    if (hrefMatch) {
      hrefMatch.forEach(m => {
        const val = m.match(/["']([^"']+)["/]/);
        if (val && val[1]) {
          const target = val[1];
          if (target.startsWith('http')) {
            externalLinks.add(target);
          } else if (target === '#' || target === '' || target.includes('xxx')) {
            placeholderLinks.push({ file, lineNum, target });
          }
        }
      });
    }
  });
});

console.log(`Total temuan placeholder di kode/data: ~${placeholderCount} indikasi`);
console.log(`Total tautan eksternal unik: ${externalLinks.size}`);
console.log(`Total tautan placeholder/rusak: ${placeholderLinks.length}`);
