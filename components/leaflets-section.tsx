'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Download } from 'lucide-react'

export default function LeafletsSection() {
  const [leaflets, setLeaflets] = useState<any[]>([])

  useEffect(() => {
    const fetchLeaflets = async () => {
      try {
        const res = await fetch('/api/leaflets')
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        setLeaflets((data.data || []).filter((item: any) => item.isActive))
      } catch (error) {
        console.error('Failed to fetch leaflets:', error)
      }
    }

    fetchLeaflets()
  }, [])

  return (
    <section id="leaflets" className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-accent" />
              <h2 className="text-4xl md:text-5xl font-bold text-primary">Patient Information</h2>
            </div>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Download our patient information leaflets for valuable health insights and guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaflets.map((leaflet) => (
              <Card
                key={leaflet._id}
                className="bg-card border-2 border-accent/10 hover:border-accent/40 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 flex flex-col"
              >
                <div className="bg-gradient-to-r from-secondary to-accent p-8 flex items-center justify-center">
                  {leaflet.icon ? (
                    <img src={leaflet.icon} alt={leaflet.title} className="w-20 h-20 object-cover rounded-xl border border-white/30" />
                  ) : (
                    <FileText className="w-16 h-16 text-primary" />
                  )}
                </div>

                <div className="p-6 space-y-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-foreground">
                    {leaflet.title}
                  </h3>
                  <p className="text-foreground/70 flex-grow">
                    {leaflet.description}
                  </p>

                  <a
                    href={leaflet.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto"
                  >
                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-primary font-semibold rounded-lg flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>

          {leaflets.length === 0 && (
            <p className="text-center py-6 text-gray-500">No leaflets found</p>
          )}
        </div>
      </div>
    </section>
  )
}
