const fs = require("fs");
const path = require("path");

const fp = path.join(__dirname, "src", "components", "ProjectModal.tsx");
if (fs.existsSync(fp)) {
  let content = fs.readFileSync(fp, "utf8");

  // 1. Image Height (Carousel)
  content = content.replace(
    /className="relative flex-1 overflow-hidden rounded-2xl border border-white\/\[0\.07\] bg-zinc-950"[\s\S]*?style=\{\{\s*minHeight:\s*200\s*\}\}/g,
    'className="relative h-[220px] md:h-auto md:min-h-[320px] md:flex-1 overflow-hidden rounded-[20px] border border-white/[0.07] bg-zinc-950"',
  );

  // 2. Scroll Fix: Outer Container
  // Search for:
  // <div
  //   className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-5 md:p-8"
  //   role="dialog"
  //   aria-modal="true"
  //   aria-label={`${project.title} — project details`}
  // >
  //   {/* ── Card ── */}
  //   <motion.div
  content = content.replace(
    /<div\s+className="fixed inset-0 z-\[101\] flex items-center justify-center p-3 sm:p-5 md:p-8"\s+role="dialog"\s+aria-modal="true"\s+aria-label=\{`\$\{project\.title\} — project details`\}\s*>\s*\{\/\*\s*── Card ──\s*\*\/\}\s*<motion\.div/g,
    `<div
            className="fixed inset-0 z-[101] overflow-y-auto p-4 sm:p-5 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={\`\${project.title} — project details\`}
            data-lenis-prevent="true"
          >
            <div className="flex min-h-full items-start justify-center md:items-center py-8 md:py-12">
              {/* ── Card ── */}
              <motion.div`,
  );

  // Close the new wrapper div at the end
  //           </div>
  //         </>
  //       )}
  //     </AnimatePresence>
  content = content.replace(
    /<\/div>\s*<\/>\s*\)}\s*<\/AnimatePresence>/g,
    `  </div>\n            </div>\n        </>\n      )}\n    </AnimatePresence>`,
  );

  // 3. Remove inner scroll
  content = content.replace(
    /className="modal-right-scroll flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto p-4 sm:p-5 md:p-6"/g,
    'className="flex min-w-0 flex-1 flex-col gap-5 p-4 sm:p-5 md:p-6"',
  );

  // Remove style={{ maxHeight: "min(74vh, 580px)" }}
  content = content.replace(/style=\{\{\s*maxHeight:\s*"min\(74vh, 580px\)"\s*\}\}/g, "");

  // 4. Content Spacing: group Title + Badges
  // Find Title block and Meta pills and wrap them in `<div className="flex flex-col gap-3">`
  const oldTitleGroupRegex =
    /\{\/\*\s*Title block\s*\*\/\}([\s\S]*?)\{\/\*\s*Description\s*\*\/\}/g;
  content = content.replace(oldTitleGroupRegex, (match, inner) => {
    return `<div className="flex flex-col gap-3">\n                    {/* Title block */}${inner}</div>\n\n                    {/* Description */}`;
  });

  // 5. Left panel sticky on desktop
  content = content.replace(
    /className="w-full p-4 sm:p-5 md:w-\[52%\] md:flex-shrink-0 md:p-6"/g,
    'className="w-full p-4 sm:p-5 md:w-[52%] md:flex-shrink-0 md:p-6 md:sticky md:top-0"',
  );

  // 6. Two column body md:items-stretch to md:items-start
  content = content.replace(
    /className="flex flex-col md:flex-row md:items-stretch"/g,
    'className="flex flex-col md:flex-row md:items-start"',
  );

  fs.writeFileSync(fp, content, "utf8");
  console.log("ProjectModal.tsx updated robustly.");
}
