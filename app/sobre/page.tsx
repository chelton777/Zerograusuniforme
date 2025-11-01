import type { Metadata } from "next"
import { AboutHero } from "@/components/about/hero"
import { CompanyStory } from "@/components/about/company-story"
import { TeamSection } from "@/components/about/team-section"
import { CustomerGallery } from "@/components/about/customer-gallery"
import { VideoShowcase } from "@/components/about/video-showcase"
import { ValuesSection } from "@/components/about/values-section"

export const metadata: Metadata = {
  title: "Sobre Nós | ZERO GRAUS - Nossa História",
  description:
    "Conheça a história da ZERO GRAUS, líder em uniformes escolares em Moçambique. Qualidade, tradição e inovação desde o início.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <CompanyStory />
      <ValuesSection />
      <TeamSection />
      <CustomerGallery />
      <VideoShowcase />
    </div>
  )
}