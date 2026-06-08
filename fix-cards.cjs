const fs = require("fs");
const path = require("path");

// 1. Update projects.tsx: object-cover -> object-contain bg-white p-4
const pPath = path.join(__dirname, "src", "data", "projects.tsx");
let pData = fs.readFileSync(pPath, "utf8");
pData = pData.replace(
  /className="w-full h-full object-cover"/g,
  'className="w-full h-full object-contain bg-white p-2"',
);
fs.writeFileSync(pPath, pData, "utf8");

const fixComponent = (filePath) => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, "utf8");

  // Remove badges from top image container
  const oldBadgesRegex =
    /\{\/\*\s*Category & Type pills\s*\*\/\}\s*<div className="absolute ltr:left-4 rtl:right-4 top-4 flex flex-col gap-1\.5 items-start">\s*<div className="rounded-full glass px-3 py-1 font-mono text-\[9px\] uppercase tracking-wider text-cyan">\s*\{t\(`projects\.categories\.\$\{p\.type\}`,\s*p\.type\)\}\s*<\/div>\s*<div className="rounded-full glass px-2\.5 py-1 font-mono text-\[8px\] uppercase tracking-wider text-white\/70">\s*\{t\(`projects\.categories\.\$\{p\.category\}`,\s*p\.category\)\}\s*<\/div>\s*<\/div>/g;

  content = content.replace(oldBadgesRegex, "");

  // Add badges to the top of the content area
  const contentAreaStart =
    /\{\/\*\s*Content\s*\*\/\}\s*<div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-6">\s*<div className="flex items-center gap-3">/g;

  const newContentStart = `{/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-cyan/10 border border-cyan/20 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-cyan">
            {t(\`projects.categories.\${p.type}\`, p.type)}
          </span>
          <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            {t(\`projects.categories.\${p.category}\`, p.category)}
          </span>
        </div>

        <div className="flex items-center gap-3">`;

  content = content.replace(contentAreaStart, newContentStart);
  fs.writeFileSync(filePath, content, "utf8");
};

fixComponent(path.join(__dirname, "src", "components", "sections", "FeaturedProjects.tsx"));
fixComponent(path.join(__dirname, "src", "components", "sections", "Projects.tsx"));

console.log("Project cards fixed.");
