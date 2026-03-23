'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import ScheduleCard from '../components/ScheduleCard'

export default function HeroSection() {
  const handleDownloadPDF = () => {
    const link = document.createElement('a')
    link.href = '#'
    link.download = 'Dr_Khurram_Profile.pdf'
    link.click()
  }

  return (
    <section
      id="home"
      className="relative min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-contain sm:bottom-0 bottom-240 bg-no-repeat bg-center opacity-50"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/proxmaircloud/image/upload/v1774121797/products/zf6aisy27jaolgdms97j.png')",
        }}
      />
      <div className="absolute inset-0 bg-background/70" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-primary leading-tight">
                Dr. Khurram Baqai
              </h1>
              <p className="text-xl md:text-2xl text-accent font-semibold">
                Medical Professional
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-foreground/90 leading-relaxed">
                Welcome to Dr. Khurram Baqai's professional medical practice. With years of dedicated experience in healthcare, I am committed to providing exceptional medical care and guidance to my patients.
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed">
                My approach combines modern medical expertise with compassionate patient care. I specialize in comprehensive health consultations, patient education, and personalized treatment plans tailored to individual needs.
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed">
                Whether you're seeking preventive care, diagnosis, or ongoing treatment, I'm here to support your health journey with professionalism and dedication.
              </p>
            </div>

            <div>
              <Button
                onClick={handleDownloadPDF}
                className="bg-secondary hover:bg-secondary/90 text-primary font-semibold px-8 py-6 text-lg flex items-center gap-2 rounded-lg"
              >
                <Download className="w-5 h-5" />
                Download Profile
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-24">
            <ScheduleCard />
          </div>
        </div>
      </div>
    </section>
  )
}