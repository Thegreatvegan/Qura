import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import FeaturesSection from "@/components/features-section"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import Navbar from "@/components/navbar"
import ProblemSection from "@/components/problem-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-white relative">
      <AnimatedBackground />
      <Navbar />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="problem">
        <ProblemSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="contact">
        <ContactForm />
      </div>
      <Footer />
    </main>
  )
}

