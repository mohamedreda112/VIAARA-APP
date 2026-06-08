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
  'FeaturedProjects.tsx',
  /<Reveal>\s*<p className="mb-5 font-mono text-xs uppercase tracking-\[0\.3em\] text-cyan">\s*\{t\("projects\.badge"\)\}\s*<\/p>\s*<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">\s*<h2 className="w-full max-w-\[650px\] font-display text-\[clamp\(3rem,5vw,4\.8rem\)\] leading-none font-bold">\s*\{t\("featuredProjects\.title1"\)\}\s*<br \/>\s*<span className="text-gradient">\{t\("featuredProjects\.title2"\)\}<\/span>\s*<\/h2>\s*<Link\s*to="\/projects"\s*className="group inline-flex items-center gap-2 font-mono text-\[14px\] uppercase tracking-\[2px\] text-cyan transition-all duration-300 hover:translate-x-1 shrink-0"\s*aria-label="View all projects"\s*>\s*\{t\("featuredProjects\.viewAll"\)\}\s*<ArrowRight\s*size=\{14\}\s*className="transition-transform group-hover:translate-x-0\.5"\s*aria-hidden="true"\s*\/>\s*<\/Link>\s*<\/div>\s*<\/Reveal>/,
  `<Reveal>
            <SectionHeader
              label={t("projects.badge")}
              title1={t("featuredProjects.title1")}
              title2={t("featuredProjects.title2")}
              align="left"
            >
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 font-mono text-[14px] uppercase tracking-[2px] text-cyan transition-all duration-300 hover:translate-x-1 shrink-0"
                aria-label="View all projects"
              >
                {t("featuredProjects.viewAll")}
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </SectionHeader>
          </Reveal>`
);

replaceHeader(
  'Projects.tsx',
  /<Reveal>\s*<p className="mb-5 font-mono text-xs uppercase tracking-\[0\.3em\] text-cyan">\s*\{t\("projects\.badge"\)\}\s*<\/p>\s*<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">\s*<h2 className="w-full max-w-\[650px\] font-display text-\[clamp\(3rem,5vw,4\.8rem\)\] leading-none font-bold">\s*\{t\("projects\.title1"\)\}\s*<br \/>\s*<span className="text-gradient">\{t\("projects\.title2"\)\}<\/span>\s*<\/h2>\s*<p className="w-full max-w-md text-muted-foreground">\s*\{t\("projects\.description"\)\}\s*<\/p>\s*<\/div>\s*<\/Reveal>/,
  `<Reveal>
            <SectionHeader
              label={t("projects.badge")}
              title1={t("projects.title1")}
              title2={t("projects.title2")}
              description={t("projects.description")}
              align="left"
            />
          </Reveal>`
);
