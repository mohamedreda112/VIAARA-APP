const fs = require('fs');
const path = require('path');

const SECTIONS_DIR = path.join(__dirname, 'src', 'components', 'sections');

function replaceHeader(fileName, matchPattern, replacePattern) {
  const filePath = path.join(SECTIONS_DIR, fileName);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('import { SectionHeader }')) {
    content = content.replace(
      /import \{ Reveal \} from "\.\.\/Reveal";/g,
      'import { Reveal } from "../Reveal";\nimport { SectionHeader } from "../ui/SectionHeader";'
    );
  }
  
  content = content.replace(matchPattern, replacePattern);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed', fileName);
}

replaceHeader(
  'Services.tsx',
  /<Reveal>\s*<p className="mb-5 font-mono text-xs uppercase tracking-\[0\.3em\] text-cyan">\s*\{t\("services\.badge"\)\}\s*<\/p>\s*<div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">\s*<h2 className="w-full sm:max-w-2xl mx-auto font-display fluid-h2 font-semibold">\s*\{t\("services\.title1"\)\}\s*<br \/>\s*<span className="text-gradient">\{t\("services\.title2"\)\}<\/span>\s*<\/h2>\s*<p className="w-full sm:max-w-md mx-auto text-muted-foreground">\s*\{t\("services\.description"\)\}\s*<\/p>\s*<\/div>\s*<\/Reveal>/,
  `<Reveal>
          <SectionHeader
            label={t("services.badge")}
            title1={t("services.title1")}
            title2={t("services.title2")}
            description={t("services.description")}
            align="left"
          />
        </Reveal>`
);
