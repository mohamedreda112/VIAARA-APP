import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Clients } from "@/components/sections/Clients";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { TechStack } from "@/components/sections/TechStack";
import { Work } from "@/components/sections/Work";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { Stats } from "@/components/sections/Stats";
import { Team } from "@/components/sections/Team";
import { Pricing } from "@/components/sections/Pricing";
import { Voices } from "@/components/sections/Voices";
import { FAQ } from "@/components/sections/FAQ";
import { CTABanner } from "@/components/sections/CTABanner";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VIAARA — Custom Software House & Systems Engineering" },
      {
        name: "description",
        content:
          "VIAARA is an elite software engineering agency developing scalable web apps, mobile apps, enterprise ERP solutions, and digital products for ambitious brands.",
      },
      { property: "og:title", content: "VIAARA — Custom Software House & Systems Engineering" },
      {
        property: "og:description",
        content:
          "High-performance custom software, web platforms, and enterprise systems engineered with craft from concept to production at scale.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main className="relative">
        <Hero />
        <Clients />
        <About />
        <Services />
        <TechStack />
        <Work />
        <Projects />
        <Process />
        <Stats />
        <Team />
        <Pricing />
        <Voices />
        <FAQ />
        <CTABanner />
        <Contact />
      </main>
    </>
  );
}
