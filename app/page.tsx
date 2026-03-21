import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import ContactSection from '@/components/contact-section'
import BlogSection from '@/components/blog-section'
import VideosSection from '@/components/videos-section'
import LeafletsSection from '@/components/leaflets-section'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ContactSection />
      <BlogSection />
      <VideosSection />
      <LeafletsSection />
      <Footer />
    </main>
  )
}
