const fs = require("fs");
const path = require("path");

const fp = path.join(__dirname, "src", "components", "sections", "Contact.tsx");
if (fs.existsSync(fp)) {
  let content = fs.readFileSync(fp, "utf8");

  // 1. Update imports
  content = content.replace(
    /import \{ ArrowRight, Mail, MapPin, Github, Twitter, Linkedin, Phone \} from "lucide-react";/g,
    'import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";\nimport { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";',
  );

  // 2. Update SOCIAL_LINKS array
  const oldLinks = `const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
];`;

  const newLinks = `const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/viaara-tech-egypt/", icon: FaLinkedinIn },
  { label: "Instagram", href: "https://www.instagram.com/viaara_tech/", icon: FaInstagram },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61590481892370", icon: FaFacebookF },
];`;
  content = content.replace(oldLinks, newLinks);

  // 3. Brand icons container
  content = content.replace(
    /<div className="mt-5 flex items-center gap-3">/g,
    '<div className="mt-5 flex items-center justify-center sm:justify-start gap-3">',
  );

  // 4. Social Links rendering
  const oldAnchor = `<a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={\`VIAARA on \${label}\`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all duration-200 hover:border-cyan/30 hover:bg-cyan/10 hover:text-cyan"
                  >
                    <Icon size={15} aria-hidden="true" />
                  </a>`;

  const newAnchor = `<a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={\`VIAARA on \${label}\`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground hover:text-cyan hover:border-cyan/30 hover:bg-cyan/10 hover:-translate-y-[3px] hover:scale-[1.08] hover:shadow-[0_0_20px_rgba(0,255,255,0.25)]"
                    style={{ transition: 'all .3s ease' }}
                  >
                    <Icon size={16} aria-hidden="true" />
                  </a>`;
  content = content.replace(oldAnchor, newAnchor);

  // 5. Update phone numbers formatting
  content = content.replace(/\+20 1000 843 003/g, "+20 100 084 3003");
  content = content.replace(/\+20 1000 615 819/g, "+20 100 061 5819");

  fs.writeFileSync(fp, content, "utf8");
  console.log("Contact.tsx updated successfully");
}
