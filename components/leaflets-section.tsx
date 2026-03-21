'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Download } from 'lucide-react'

const leaflets = [
  {
    id: 1,
    title: 'Understanding Diabetes',
    description: 'A comprehensive guide to diabetes management, prevention, and lifestyle modifications.',
    icon: '🩺',
    pdfUrl: '#',
  },
  {
    id: 2,
    title: 'Blood Pressure Management',
    description: 'Learn how to manage high blood pressure through diet, exercise, and medication.',
    icon: '❤️',
    pdfUrl: '#',
  },
  {
    id: 3,
    title: 'Heart Health Essentials',
    description: 'Essential information about maintaining cardiovascular health and preventing heart disease.',
    icon: '💓',
    pdfUrl: '#',
  },
  {
    id: 4,
    title: 'Respiratory Health Guide',
    description: 'Understanding common respiratory conditions and maintaining lung health.',
    icon: '🫁',
    pdfUrl: '#',
  },
  {
    id: 5,
    title: 'Bone Health and Osteoporosis',
    description: 'Information about bone health, osteoporosis prevention, and treatment options.',
    icon: '🦴',
    pdfUrl: '#',
  },
  {
    id: 6,
    title: 'Healthy Aging Guide',
    description: 'Tips and strategies for maintaining health and vitality as you age.',
    icon: '👴',
    pdfUrl: '#',
  },
]

export default function LeafletsSection() {
  const handleDownload = (title: string) => {
    // In production, this would download the actual PDF
    alert(`Downloading: ${title}`)
  }

  return (
    <section id="leaflets" className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-accent" />
              <h2 className="text-4xl md:text-5xl font-bold text-primary">Patient Information</h2>
            </div>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Download our patient information leaflets for valuable health insights and guidance.
            </p>
          </div>

          {/* Leaflets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaflets.map((leaflet) => (
              <Card
                key={leaflet.id}
                className="bg-card border-2 border-accent/10 hover:border-accent/40 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 flex flex-col"
              >
                {/* Icon/Header */}
                <div className="bg-gradient-to-r from-secondary to-accent p-8 flex items-center justify-center">
                  <span className="text-6xl">{leaflet.icon}</span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-foreground">
                    {leaflet.title}
                  </h3>
                  <p className="text-foreground/70 flex-grow">
                    {leaflet.description}
                  </p>

                  {/* Download Button */}
                  <Button
                    onClick={() => handleDownload(leaflet.title)}
                    className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold rounded-lg mt-auto flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="bg-gradient-to-r from-primary to-accent/80 text-primary-foreground rounded-lg p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Need More Information?
            </h3>
            <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              Contact us directly to request specific health information or schedule a consultation with Dr. Khurram Baqai.
            </p>
            <Button
              asChild
              className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary font-semibold px-8 py-3 rounded-lg"
            >
              <a href="#contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
