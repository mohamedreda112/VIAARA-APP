const fs = require('fs');
const path = require('path');

const SECTIONS_DIR = path.join(__dirname, 'src', 'components', 'sections');

// Helper to replace standard header patterns
function replaceHeader(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // If SectionHeader is already imported, skip
  if (content.includes('import { SectionHeader }')) return;
  
  // Example for Process.tsx
  if (filePath.endsWith('Process.tsx')) {
    content = content.replace(
      /import \{ Reveal \} from "\.\.\/Reveal";/g,
      'import { Reveal } from "../Reveal";\nimport { SectionHeader } from "../ui/SectionHeader";'
    );
    
    const oldHeader = `<Reveal>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
            {t("process.badge")}
          </p>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-12">
            <h2 className="w-full sm:max-w-2xl mx-auto font-display fluid-h2 font-semibold">
              {t("process.title1")}
              <br />
              <span className="text-gradient">{t("process.title2")}</span>
            </h2>
            <p className="w-full sm:max-w-md mx-auto text-muted-foreground">
              {t("process.description")}
            </p>
          </div>
        </Reveal>`;
        
    const newHeader = `<Reveal>
          <SectionHeader
            label={t("process.badge")}
            title1={t("process.title1")}
            title2={t("process.title2")}
            description={t("process.description")}
            align="left"
          />
        </Reveal>`;
        
    content = content.replace(oldHeader, newHeader);
  }
  
  // Example for Services.tsx
  if (filePath.endsWith('Services.tsx')) {
    content = content.replace(
      /import \{ Reveal \} from "\.\.\/Reveal";/g,
      'import { Reveal } from "../Reveal";\nimport { SectionHeader } from "../ui/SectionHeader";'
    );
    
    // Services might have a different structure, we need to inspect it first.
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

replaceHeader(path.join(SECTIONS_DIR, 'Process.tsx'));
console.log('Fixed Process.tsx');
