const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\Mo_Reda\\.gemini\\antigravity-ide\\brain\\605fce8f-ca9b-4edc-91ed-bfe194c7b2f0\\media__1780254753616.png';
const destDir = path.join(__dirname, 'public');
const dest = path.join(destDir, 'favicon.png');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
}

fs.copyFileSync(src, dest);
console.log('Favicon copied successfully.');
