const fs = require("fs");
const path = require("path");

const applyRedesign = (filePath, isFeatured) => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, "utf8");

  // 1. Spacing: use padding-top/bottom 100px instead of section-pad
  content = content.replace(
    /className="relative overflow-hidden section-pad"/g,
    'className="relative overflow-hidden pt-[100px] pb-[100px]"',
  );

  // 2. Header Layout & Title Styling
  // For FeaturedProjects.tsx header:
  if (isFeatured) {
    const oldHeaderRegex =
      /<div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-12">\s*<h2 className="w-full sm:max-w-2xl mx-auto font-display fluid-h2 font-semibold">([\s\S]*?)<\/h2>\s*<Link\s*to="\/projects"\s*className="group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-cyan transition-all duration-200 hover:gap-3 shrink-0"\s*aria-label="View all projects"\s*>([\s\S]*?)<\/Link>\s*<\/div>/g;

    const newHeader = `<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="w-full max-w-[650px] font-display text-[clamp(3rem,5vw,4.8rem)] leading-none font-bold">
                $1
              </h2>
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 font-mono text-[14px] uppercase tracking-[2px] text-cyan transition-all duration-300 hover:translate-x-1 shrink-0"
                aria-label="View all projects"
              >
                $2
              </Link>
            </div>`;

    content = content.replace(oldHeaderRegex, newHeader);
  } else {
    // For Projects.tsx header
    const oldProjHeaderRegex =
      /<div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-12">\s*<h2 className="w-full sm:max-w-2xl mx-auto font-display fluid-h2 font-semibold">([\s\S]*?)<\/h2>\s*<p className="w-full sm:max-w-md mx-auto text-muted-foreground">([\s\S]*?)<\/p>\s*<\/div>/g;
    const newProjHeader = `<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="w-full max-w-[650px] font-display text-[clamp(3rem,5vw,4.8rem)] leading-none font-bold">
                $1
              </h2>
              <p className="w-full max-w-md text-muted-foreground text-left md:text-right pb-2">$2</p>
            </div>`;
    content = content.replace(oldProjHeaderRegex, newProjHeader);
  }

  // 3. Grid margin-top 40px and gap 24px (gap-6)
  if (isFeatured) {
    content = content.replace(
      /<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 justify-items-center">/g,
      '<div className="mt-[40px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">',
    );
  } else {
    content = content.replace(
      /<motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 justify-items-center">/g,
      '<motion.div layout className="mt-[40px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">',
    );
  }

  // 4. Card Design: min-height: 620px, padding: 24px (p-6)
  // Max width max-w-[460px] is currently there, wait: we need "3 cards per row", so if we have gap 24px in a 1400px container, each card is around 430px. max-w-[460px] is fine.
  const oldCardWrapperRegex =
    /className="w-full max-w-\[460px\] mx-auto group relative flex h-full flex-col overflow-hidden rounded-\[2rem\] border border-white\/10 bg-card\/40 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-cyan\/20 hover:bg-card"/g;
  const newCardWrapper =
    'className="w-full max-w-[460px] mx-auto group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-card/40 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-cyan/20 hover:bg-card min-h-[620px]"';
  content = content.replace(oldCardWrapperRegex, newCardWrapper);

  // Content padding: currently `p-4 sm:p-5 lg:p-6`. Make it exactly `p-[24px]`
  content = content.replace(
    /className="flex flex-1 flex-col p-4 sm:p-5 lg:p-6"/g,
    'className="flex flex-1 flex-col p-[24px]"',
  );

  // Typography: Title 28px, Desc 16px line-height 1.7
  content = content.replace(
    /<h3 className="font-display text-\[24px\] font-bold text-foreground transition-colors group-hover:text-cyan">/g,
    '<h3 className="font-display text-[28px] font-bold text-foreground transition-colors group-hover:text-cyan leading-tight">',
  );
  content = content.replace(
    /<p className="mt-4 flex-1 text-\[15px\] leading-\[1\.6\] line-clamp-3 text-muted-foreground">/g,
    '<p className="mt-4 flex-1 text-[16px] leading-[1.7] line-clamp-3 text-muted-foreground">',
  );

  fs.writeFileSync(filePath, content, "utf8");
};

applyRedesign(path.join(__dirname, "src", "components", "sections", "FeaturedProjects.tsx"), true);
applyRedesign(path.join(__dirname, "src", "components", "sections", "Projects.tsx"), false);

console.log("Done rewriting project layouts");
