'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, MapPin, Clock, Phone } from 'lucide-react'

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
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-contain sm:bottom-0 bottom-240 bg-no-repeat bg-center opacity-50"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/proxmaircloud/image/upload/v1774121797/products/zf6aisy27jaolgdms97j.png')",
        }}
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-background/70" />

      {/* Content */}
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
            <Card className="bg-card secondary-2 border-secondary/20 overflow-hidden">
              <div className="bg-linear-to-r from-primary to-accent text-primary-foreground p-6">
                <h3 className="font-bold text-xl mb-6">Schedule & Contact</h3>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                    <h4 className="font-semibold text-foreground">Location</h4>
                  </div>
                  <p className="text-sm text-foreground/80 ml-7">
                    Block H North Nazimabad<br />
                    Karachi
                  </p>
                </div>

                <div className="border-t border-border pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-accent flex-shrink-0" />
                    <h4 className="font-semibold text-foreground">Timings</h4>
                  </div>
                  <div className="text-sm text-foreground/80 ml-7 space-y-2">
                    <p><span className="font-medium">Monday</span><br />3:30 PM - 5:30 PM</p>
                    <p><span className="font-medium">Thursday</span><br />3:30 PM - 5:30 PM</p>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                    <h4 className="font-semibold text-foreground">Contact</h4>
                  </div>
                  <div className="text-sm text-foreground/80 ml-7 space-y-1">
                    <p className="font-medium text-foreground">For Appointment:</p>
                    <p className="hover:text-accent transition-colors">
                      <a href="tel:03272057338">0327-2057338</a>
                    </p>
                    <p className="hover:text-accent transition-colors">
                      <a href="https://wa.me/923408749434">
                        0340-8749434 (WhatsApp)
                      </a>
                    </p>
                  </div>
                </div>

              </div>
            </Card>
          </div>

        </div>
      </div>
    </section>
  )
}