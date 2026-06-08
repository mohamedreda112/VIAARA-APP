const fs = require("fs");
const path = require("path");

const fp = path.join(__dirname, "src", "components", "ProjectModal.tsx");
if (fs.existsSync(fp)) {
  let content = fs.readFileSync(fp, "utf8");

  // 1. Centering shell -> Scrollable outer wrapper + flex inner wrapper
  // Replace:
  // <div
  //   className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-5 md:p-8"
  //   role="dialog"
  const oldShell = `<div
            className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-5 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={\`\${project.title} — project details\`}
          >`;

  const newShell = `<div
            className="fixed inset-0 z-[101] overflow-y-auto p-3 sm:p-5 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={\`\${project.title} — project details\`}
            data-lenis-prevent="true"
          >
            <div className="flex min-h-full items-center justify-center">`;

  content = content.replace(oldShell, newShell);

  // Close the extra div after </motion.div> (key="card")
  // Replace:
  //           </div>
  //         </>
  //       )}
  //     </AnimatePresence>
  const oldEnd = `          </div>
        </>
      )}
    </AnimatePresence>`;

  const newEnd = `            </div>
          </div>
        </>
      )}
    </AnimatePresence>`;

  content = content.replace(oldEnd, newEnd);

  // 2. Change md:items-stretch to md:items-start so sticky works
  content = content.replace(
    /className="flex flex-col md:flex-row md:items-stretch"/g,
    'className="flex flex-col md:flex-row md:items-start"',
  );

  // 3. Left Panel - make it sticky on desktop
  // Old: className="w-full p-4 sm:p-5 md:w-[52%] md:flex-shrink-0 md:p-6"
  // New: className="w-full p-4 sm:p-5 md:w-[52%] md:flex-shrink-0 md:p-6 md:sticky md:top-0"
  content = content.replace(
    /className="w-full p-4 sm:p-5 md:w-\[52%\] md:flex-shrink-0 md:p-6"/g,
    'className="w-full p-4 sm:p-5 md:w-[52%] md:flex-shrink-0 md:p-6 md:sticky md:top-0"',
  );

  // 4. Right panel - remove max height and nested scroll
  // Old: className="modal-right-scroll flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto p-4 sm:p-5 md:p-6"
  // New: className="flex min-w-0 flex-1 flex-col gap-4 p-4 sm:p-5 md:p-6"
  content = content.replace(
    /className="modal-right-scroll flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto p-4 sm:p-5 md:p-6"/g,
    'className="flex min-w-0 flex-1 flex-col gap-4 p-4 sm:p-5 md:p-6"',
  );

  // Remove style={{ maxHeight: "min(74vh, 580px)" }}
  content = content.replace(/style={{ maxHeight: "min\(74vh, 580px\)" }}/g, "");

  fs.writeFileSync(fp, content, "utf8");
  console.log("ProjectModal scroll layout updated.");
}
