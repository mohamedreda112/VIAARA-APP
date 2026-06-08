const fs = require("fs");
const path = require("path");

const files = [
  path.join(__dirname, "src", "components", "sections", "FeaturedProjects.tsx"),
  path.join(__dirname, "src", "components", "sections", "Projects.tsx"),
];

for (const fp of files) {
  if (fs.existsSync(fp)) {
    let content = fs.readFileSync(fp, "utf8");

    // 1. Structural
    content = content.replace(/max-w-7xl/g, "max-w-[1600px]");
    content = content.replace(/gap-6 sm:grid-cols-2/g, "gap-4 sm:gap-5 lg:gap-6 sm:grid-cols-2");

    // 2. Card Padding
    content = content.replace(/p-6 md:p-7/g, "p-4 sm:p-5 lg:p-6");

    // 3. Title Typography
    content = content.replace(
      /text-lg font-bold text-foreground transition-colors group-hover:text-cyan md:text-xl/g,
      "text-[22px] font-bold text-foreground transition-colors group-hover:text-cyan",
    );

    // 4. Description Typography
    content = content.replace(
      /flex-1 fluid-body text-muted-foreground/g,
      "flex-1 text-[15px] leading-[1.6] line-clamp-4 text-muted-foreground",
    );

    // 5. Tech Tags
    content = content.replace(
      /rounded-full border border-white\/5 bg-white\/5 px-2\.5 py-1 font-mono text-\[9\.5px\]/g,
      "flex h-8 items-center rounded-lg border border-white/5 bg-white/5 px-3 font-mono text-xs",
    );
    // Ensure the span rendering tech tags gets flex class if it doesn't have it (replaced above adds it)
    content = content.replace(/mt-5 flex flex-wrap gap-1\.5/g, "mt-5 flex flex-wrap gap-2"); // increase gap slightly for the new tags

    // 6. Buttons
    // The buttons have `py-2.5` and `px-4` or `px-3`. We'll replace `py-2.5` with `h-11`.
    content = content.replace(/py-2\.5/g, "h-11");
    content = content.replace(/text-\[11px\]/g, "text-xs");
    content = content.replace(/text-\[10px\]/g, "text-[11px]");

    // 7. Image aspect ratio
    content = content.replace(/aspect-\[16\/10\]/g, "aspect-[16/9]");

    fs.writeFileSync(fp, content, "utf8");
    console.log("Updated " + path.basename(fp));
  }
}
