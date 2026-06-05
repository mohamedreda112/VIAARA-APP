import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { WhoWeAre } from "@/components/sections/about/WhoWeAre";
import { MissionVision } from "@/components/sections/about/MissionVision";
import { CoreValues } from "@/components/sections/about/CoreValues";
import { About as WhyChooseUs } from "@/components/sections/About";
import { CTABanner } from "@/components/sections/CTABanner";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — VIAARA Software Engineering" },
      {
        name: "description",
        content:
          "Viaara Tech is a software solutions company focused on helping organizations transform complex business challenges into scalable, secure, and efficient digital solutions.",
      },
      { property: "og:title", content: "About — VIAARA Software Engineering" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main className="relative">
        <WhoWeAre />
        <MissionVision />
        <CoreValues />
        {/* We reuse the existing 3D Infrastructure component here as "Why Choose Viaara" */}
        <WhyChooseUs />
        <CTABanner />
      </main>
      {/* Contact also serves as the global footer */}
      <Contact />
    </>
  );
}
