const fs = require("fs");
const path = require("path");

const sectionsDir = path.join(__dirname, "src", "components", "sections");

function walk(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walk(filepath, callback);
    } else if (filepath.endsWith(".tsx")) {
      callback(filepath);
    }
  }
}

const replacements = [
  // H1
  {
    match:
      /text-3xl font-semibold leading-\[1\.12\] tracking-tight sm:text-4xl md:text-\[3\.5rem\] lg:text-\[6rem\]/g,
    replace: "fluid-h1 font-semibold tracking-tight",
  },
  // H2
  {
    match: /text-4xl font-semibold leading-\[1\.0[45]\] md:text-6xl/g,
    replace: "fluid-h2 font-semibold",
  },
  {
    match: /text-4xl font-semibold leading-\[1\.15\] md:text-5xl/g,
    replace: "fluid-h2 font-semibold",
  },
  {
    match: /text-4xl font-semibold leading-\[1\.1\] md:text-5xl lg:text-6xl/g,
    replace: "fluid-h2 font-semibold",
  },
  {
    match: /text-4xl font-semibold leading-\[1\.05\] md:text-5xl lg:text-6xl/g,
    replace: "fluid-h2 font-semibold",
  },
  {
    match: /text-3xl font-semibold leading-\[1\.05\] sm:text-4xl md:text-5xl lg:text-6xl/g,
    replace: "fluid-h2 font-semibold",
  },
  { match: /text-3xl font-semibold md:text-5xl/g, replace: "fluid-h2 font-semibold" },
  {
    match: /text-4xl font-semibold leading-\[1\.02\] tracking-tight md:text-6xl/g,
    replace: "fluid-h2 font-semibold tracking-tight",
  }, // CTABanner
  // H3
  {
    match: /text-xl font-bold text-foreground md:text-2xl/g,
    replace: "fluid-h3 font-bold text-foreground",
  },
  { match: /text-2xl font-bold text-foreground/g, replace: "fluid-h3 font-bold text-foreground" },
  {
    match: /text-2xl font-semibold leading-snug text-foreground md:text-3xl lg:text-4xl/g,
    replace: "fluid-h3 font-semibold text-foreground",
  },
  { match: /text-2xl font-semibold/g, replace: "fluid-h3 font-semibold" },
  // Body text
  {
    match: /text-sm leading-relaxed text-muted-foreground md:text-base/g,
    replace: "fluid-body text-muted-foreground",
  },
  {
    match: /text-sm text-muted-foreground leading-relaxed md:text-base/g,
    replace: "fluid-body text-muted-foreground",
  },
  {
    match: /text-sm leading-relaxed text-muted-foreground sm:text-base/g,
    replace: "fluid-body text-muted-foreground",
  },
  {
    match: /text-sm text-muted-foreground md:text-base/g,
    replace: "fluid-body text-muted-foreground",
  },
  {
    match: /text-base leading-relaxed text-muted-foreground md:text-lg/g,
    replace: "fluid-body text-muted-foreground",
  },
  {
    match: /text-sm md:text-base text-muted-foreground leading-relaxed/g,
    replace: "fluid-body text-muted-foreground",
  },
  // Container max widths on mobile
  { match: /\bmax-w-md\b/g, replace: "w-full sm:max-w-md mx-auto" },
  { match: /\bmax-w-2xl\b/g, replace: "w-full sm:max-w-2xl mx-auto" },
  { match: /\bmax-w-3xl\b/g, replace: "w-full sm:max-w-3xl mx-auto" },
  { match: /\bmax-w-4xl\b/g, replace: "w-full sm:max-w-4xl mx-auto" },
];

walk(sectionsDir, (filepath) => {
  let content = fs.readFileSync(filepath, "utf8");
  let changed = false;

  for (const { match, replace } of replacements) {
    if (match.test(content)) {
      content = content.replace(match, replace);
      changed = true;
    }
  }

  // De-duplicate any double `mx-auto mx-auto` caused by replacement
  if (changed) {
    content = content.replace(/mx-auto mx-auto/g, "mx-auto");
    content = content.replace(/w-full w-full/g, "w-full");
    content = content.replace(/sm:max-w-2xl w-full sm:max-w-2xl/g, "w-full sm:max-w-2xl");
    fs.writeFileSync(filepath, content, "utf8");
    console.log(`Updated ${path.basename(filepath)}`);
  }
});
