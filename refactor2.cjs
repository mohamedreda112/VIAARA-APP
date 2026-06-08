const fs = require("fs");
const path = require("path");
const dir = path.join(process.cwd(), "src/components/sections");

function walk(d) {
  const files = fs.readdirSync(d);
  files.forEach((f) => {
    const fp = path.join(d, f);
    if (fs.statSync(fp).isDirectory()) {
      walk(fp);
    } else if (fp.endsWith(".tsx")) {
      let c = fs.readFileSync(fp, "utf8");
      const orig = c;

      c = c.replace(
        /className="([^"]*)text-sm leading-relaxed text-muted-foreground([^"]*)"/g,
        'className="$1fluid-body text-muted-foreground$2"',
      );
      c = c.replace(
        /className="([^"]*)text-sm text-muted-foreground([^"]*)"/g,
        'className="$1fluid-body text-muted-foreground$2"',
      );

      // Specifically for Hero.tsx subtitle
      c = c.replace(
        /text-sm leading-relaxed text-muted-foreground sm:w-full sm:max-w-2xl mx-auto sm:text-base md:text-lg/g,
        "fluid-body text-muted-foreground w-full sm:max-w-2xl mx-auto",
      );

      if (c !== orig) {
        fs.writeFileSync(fp, c);
        console.log("Updated " + f);
      }
    }
  });
}
walk(dir);
