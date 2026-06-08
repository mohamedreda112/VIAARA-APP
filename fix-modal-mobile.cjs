const fs = require("fs");
const path = require("path");

const fp = path.join(__dirname, "src", "components", "ProjectModal.tsx");
if (fs.existsSync(fp)) {
  let content = fs.readFileSync(fp, "utf8");

  // 1. Image Height (Carousel)
  // Old: className="relative flex-1 overflow-hidden rounded-2xl border border-white/[0.07] bg-zinc-950"\n        style={{ minHeight: 200 }}
  // New: className="relative h-[220px] md:h-auto md:min-h-[320px] md:flex-1 overflow-hidden rounded-[20px] border border-white/[0.07] bg-zinc-950"
  content = content.replace(
    /className="relative flex-1 overflow-hidden rounded-2xl border border-white\/\[0\.07\] bg-zinc-950"[\s\S]*?style={{ minHeight: 200 }}/g,
    'className="relative h-[220px] md:h-auto md:min-h-[320px] md:flex-1 overflow-hidden rounded-[20px] border border-white/[0.07] bg-zinc-950"',
  );

  // 2. Scroll Fix: Outer Container
  // Old: <div\n            className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-5 md:p-8"
  // New: <div\n            className="fixed inset-0 z-[101] overflow-y-auto p-4 sm:p-5 md:p-8" data-lenis-prevent="true"
  // Plus we need to wrap the card in `<div className="flex min-h-full items-start justify-center md:items-center">`
  // Because it's multi-line, I'll use index based replacement or robust regex.
  const oldShellStart =
    'className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-5 md:p-8"';
  const newShellStart =
    'className="fixed inset-0 z-[101] overflow-y-auto p-4 sm:p-5 md:p-8"\n            data-lenis-prevent="true"';
  content = content.replace(oldShellStart, newShellStart);

  const oldRoleDialog =
    'role="dialog"\n            aria-modal="true"\n            aria-label={`${project.title} — project details`}\n          >';
  const newRoleDialog =
    'role="dialog"\n            aria-modal="true"\n            aria-label={`${project.title} — project details`}\n          >\n            <div className="flex min-h-full items-start justify-center md:items-center py-8">';
  content = content.replace(oldRoleDialog, newRoleDialog);

  // Close the new wrapper div at the end
  const oldEnd = "          </div>\n        </>\n      )}\n    </AnimatePresence>";
  const newEnd =
    "            </div>\n          </div>\n        </>\n      )}\n    </AnimatePresence>";
  content = content.replace(oldEnd, newEnd);

  // 3. Remove inner scroll
  // Old: className="modal-right-scroll flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto p-4 sm:p-5 md:p-6"
  // New: className="flex min-w-0 flex-1 flex-col gap-5 p-4 sm:p-5 md:p-6"
  content = content.replace(
    /className="modal-right-scroll flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto p-4 sm:p-5 md:p-6"/g,
    'className="flex min-w-0 flex-1 flex-col gap-5 p-4 sm:p-5 md:p-6"',
  );

  // Remove style={{ maxHeight: "min(74vh, 580px)" }}
  content = content.replace(/style={{ maxHeight: "min\(74vh, 580px\)" }}/g, "");

  // 4. Content Spacing: group Title + Badges
  const oldTitleGroup = `{/* Title block */}
                    <div className="flex items-start gap-3">
                      <div
                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-white/10"
                        style={{ background: project.accentColor }}
                      >
                        <project.icon size={18} className="text-foreground" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="font-display text-[1.15rem] font-bold leading-tight text-foreground sm:text-xl md:text-2xl">
                          {t(\`projects.items.\${project.title}.title\`, project.title)}
                        </h2>
                        <p
                          className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em]"
                          style={{ color: project.accentColorSolid }}
                        >
                          {t(\`projects.categories.\${project.category}\`, project.category)}
                        </p>
                      </div>
                    </div>

                    {/* Meta pills */}
                    <div className="flex flex-wrap gap-2">
                      <MetaPill
                        icon={<Layers size={9} />}
                        label={t(\`projects.categories.\${project.type}\`, project.type)}
                      />
                      <MetaPill
                        icon={<Tag size={9} />}
                        label={t(\`projects.categories.\${project.category}\`, project.category)}
                      />
                      {project.year && (
                        <MetaPill icon={<Calendar size={9} />} label={project.year} />
                      )}
                    </div>`;

  const newTitleGroup = `<div className="flex flex-col gap-3">
                      {/* Title block */}
                      <div className="flex items-start gap-3">
                        <div
                          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-white/10"
                          style={{ background: project.accentColor }}
                        >
                          <project.icon size={18} className="text-foreground" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <h2 className="font-display text-[1.15rem] font-bold leading-tight text-foreground sm:text-xl md:text-2xl">
                            {t(\`projects.items.\${project.title}.title\`, project.title)}
                          </h2>
                          <p
                            className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em]"
                            style={{ color: project.accentColorSolid }}
                          >
                            {t(\`projects.categories.\${project.category}\`, project.category)}
                          </p>
                        </div>
                      </div>

                      {/* Meta pills */}
                      <div className="flex flex-wrap gap-2">
                        <MetaPill
                          icon={<Layers size={9} />}
                          label={t(\`projects.categories.\${project.type}\`, project.type)}
                        />
                        <MetaPill
                          icon={<Tag size={9} />}
                          label={t(\`projects.categories.\${project.category}\`, project.category)}
                        />
                        {project.year && (
                          <MetaPill icon={<Calendar size={9} />} label={project.year} />
                        )}
                      </div>
                    </div>`;
  content = content.replace(oldTitleGroup, newTitleGroup);

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
  console.log("ProjectModal.tsx updated for mobile scroll and layout.");
}
