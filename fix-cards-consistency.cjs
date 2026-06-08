const fs = require("fs");
const path = require("path");

const replaceInFile = (relPath, replacements) => {
  const fp = path.join(__dirname, relPath);
  if (!fs.existsSync(fp)) return;
  let content = fs.readFileSync(fp, "utf8");
  for (const [oldStr, newStr] of replacements) {
    content = content.split(oldStr).join(newStr);
  }
  fs.writeFileSync(fp, content, "utf8");
};

// 1. styles/team.css
replaceInFile("src/styles/team.css", [
  ["border-radius: 24px;", "border-radius: 32px;"], // matches rounded-[2rem]
]);

// 2. components/sections/Services.tsx
replaceInFile("src/components/sections/Services.tsx", [
  [
    "rounded-3xl border border-white/10 bg-card/60 p-7 transition-all duration-500 hover:-translate-y-1",
    "rounded-[2rem] border border-white/10 bg-card/60 p-8 transition-all duration-500 hover:-translate-y-2",
  ],
  ["rounded-3xl opacity-0", "rounded-[2rem] opacity-0"],
]);

// 3. components/sections/Process.tsx
replaceInFile("src/components/sections/Process.tsx", [
  [
    "hover:border-cyan/35 hover:bg-card/75 transition-all duration-300",
    "hover:border-cyan/35 hover:bg-card/75 transition-all duration-300 hover:-translate-y-2",
  ],
]);

console.log("Fixed card consistencies.");
