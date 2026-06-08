const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'components', 'Nav.tsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Add import statement
if (!content.includes('import companyProfilePdf')) {
  content = content.replace(
    /import { useTranslation } from "react-i18next";/g,
    'import { useTranslation } from "react-i18next";\nimport companyProfilePdf from "@/assets/pdf/Viaara_company_profile.pdf";'
  );
}

// 2. Replace hardcoded string with variable
content = content.replace(/"\/pdf\/Viaara_company_profile\.pdf"/g, 'companyProfilePdf');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed PDF links in Nav.tsx');
