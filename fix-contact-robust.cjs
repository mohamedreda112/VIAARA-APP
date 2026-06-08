const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'components', 'sections', 'Contact.tsx');
let content = fs.readFileSync(file, 'utf8');

// Replace contact card phone links
content = content.replace(
  /<a href="tel:\+201000843003" className="hover:underline">\s*\+20 100 084 3003\s*<\/a>/,
  '<a href="https://wa.me/201000843003" target="_blank" rel="noopener noreferrer" className="cursor-pointer transition-colors hover:text-cyan">\n                      +20 100 084 3003\n                    </a>'
);

content = content.replace(
  /<a href="tel:\+201000615819" className="hover:underline">\s*\+20 100 061 5819\s*<\/a>/,
  '<a href="https://wa.me/201000615819" target="_blank" rel="noopener noreferrer" className="cursor-pointer transition-colors hover:text-cyan">\n                      +20 100 061 5819\n                    </a>'
);

// Replace footer phone links
content = content.replace(
  /<a href="tel:\+201000843003" className="transition-colors hover:text-cyan">\s*\+20 100 084 3003\s*<\/a>/,
  '<a href="https://wa.me/201000843003" target="_blank" rel="noopener noreferrer" className="cursor-pointer transition-colors hover:text-cyan">\n                    +20 100 084 3003\n                  </a>'
);

content = content.replace(
  /<a href="tel:\+201000615819" className="transition-colors hover:text-cyan">\s*\+20 100 061 5819\s*<\/a>/,
  '<a href="https://wa.me/201000615819" target="_blank" rel="noopener noreferrer" className="cursor-pointer transition-colors hover:text-cyan">\n                    +20 100 061 5819\n                  </a>'
);

fs.writeFileSync(file, content, 'utf8');
console.log('Done replacing phone links');
