import { Hero } from "@/components/sections/Hero";
import { SystemsIntro } from "@/components/sections/SystemsIntro";
import { SystemsIBuild } from "@/components/sections/SystemsIBuild";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { ExperienceEvolution } from "@/components/sections/ExperienceEvolution";
import { WritingPreview } from "@/components/sections/WritingPreview";
import { ContactClosing } from "@/components/sections/ContactClosing";

export default function Home() {
  return (
    <>
      <Hero />
      <SystemsIntro />
      <SystemsIBuild />
      <FeaturedWork />
      <ExperienceEvolution />
      <WritingPreview />
      <ContactClosing />
    </>
  );
}
