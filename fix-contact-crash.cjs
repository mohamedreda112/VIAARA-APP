const fs = require("fs");
const path = require("path");

const fp = path.join(__dirname, "src", "components", "sections", "Contact.tsx");
let content = fs.readFileSync(fp, "utf8");

// Replace the broken block
const brokenBlock = `const getFooterLinks = (t: (key: string) => string) => [
  { label: t("nav.about"), href: "#about" },
  name,
  type = "text",`;

const fixedBlock = `const getFooterLinks = (t: (key: string) => string) => [
  { label: t("nav.about"), href: "#about" },
  { label: t("nav.services"), href: "#services" },
  { label: t("nav.portfolio"), href: "#projects" },
  { label: t("nav.pricing"), href: "#pricing" },
  { label: t("nav.contact"), href: "#contact" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/viaara-tech-egypt/", icon: FaLinkedinIn },
  { label: "Instagram", href: "https://www.instagram.com/viaara_tech/", icon: FaInstagram },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61590481892370", icon: FaFacebookF },
];

/* ── Form field ── */
function Field({
  label,
  name,
  type = "text",`;

content = content.replace(brokenBlock, fixedBlock);

fs.writeFileSync(fp, content, "utf8");
console.log("Fixed Contact.tsx");
