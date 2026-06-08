const fs = require("fs");
const path = require("path");

const replaceInFile = (relPath, replacements) => {
  const fp = path.join(__dirname, relPath);
  if (!fs.existsSync(fp)) return;
  let content = fs.readFileSync(fp, "utf8");
  for (const [oldStr, newStr] of replacements) {
    // using split join for exact string replacement
    content = content.split(oldStr).join(newStr);
  }
  fs.writeFileSync(fp, content, "utf8");
};

// 1. Stats.tsx
replaceInFile("src/components/sections/Stats.tsx", [["md:text-7xl", "md:text-6xl"]]);

// 2. Pricing.tsx
replaceInFile("src/components/sections/Pricing.tsx", [["text-5xl", "text-4xl"]]);

// 3. Hero.tsx (pt-40 is 160px, replace with pt-32 which is 128px or pt-28 which is 112px)
replaceInFile("src/components/sections/Hero.tsx", [
  ["pt-32 pb-16 md:pt-40 md:pb-24", "pt-24 pb-16 md:pt-28 md:pb-20"],
]);

// 4. Contact.tsx
replaceInFile("src/components/sections/Contact.tsx", [
  ["pt-24 md:pt-32", "pt-20 md:pt-24"],
  [
    "text-3xl font-semibold leading-[1.05] sm:text-4xl md:text-5xl lg:text-6xl",
    "fluid-h2 font-semibold",
  ],
]);

console.log("Fixed oversized text and spacing classes.");
