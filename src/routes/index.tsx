import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Clients } from "@/components/sections/Clients";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Team } from "@/components/sections/Team";
import { FAQ } from "@/components/sections/FAQ";
import { CTABanner } from "@/components/sections/CTABanner";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VIAARA TECH | Software Solutions Company" },
      {
        name: "description",
        content:
          "VIAARA TECH delivers custom software development, AI solutions, web applications, mobile applications, cloud solutions, DevOps consulting, and digital transformation services.",
      },
      { property: "og:title", content: "VIAARA TECH | Software Solutions Company" },
      {
        property: "og:description",
        content:
          "VIAARA TECH delivers custom software development, AI solutions, web applications, mobile applications, cloud solutions, DevOps consulting, and digital transformation services.",
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
        <Services />
        <Process />
        <FeaturedProjects />
        <Team preview />
        <FAQ />
        <CTABanner />
        <Contact />
      </main>
    </>
  );
}
