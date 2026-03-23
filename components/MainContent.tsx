'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

interface ProfileData {
  name: string
  designation: string
  description: string
  pdfLink?: string
}

const MainContent = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/home/profile')
      const data = await res.json()

      if (res.ok && data.data) {
        setProfile(data.data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleDownloadPDF = () => {
    if (!profile?.pdfLink) return

    const link = document.createElement('a')
    link.href = profile.pdfLink
    link.download = `${profile.name || 'profile'}.pdf`
    link.target = '_blank'
    link.click()
  }

  if (loading) {
    return (
      <div className="lg:col-span-2">
        <p className="text-sm text-foreground/70">Loading...</p>
      </div>
    )
  }

  if (!profile) return null

  return (
    <div className="lg:col-span-2 space-y-8">

      {/* Heading */}
      <div className="space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold text-primary leading-tight">
          {profile.name || '—'}
        </h1>
        <p className="text-xl md:text-2xl text-accent font-semibold">
          {profile.designation || '—'}
        </p>
      </div>

      {/* Description */}
      <div className="space-y-4">
        {profile.description ? (
          profile.description.split('\n').map((para, i) => (
            <p
              key={i}
              className="text-lg text-foreground/90 leading-relaxed"
            >
              {para}
            </p>
          ))
        ) : (
          <p className="text-lg text-foreground/60">
            No description available.
          </p>
        )}
      </div>

      {/* Download Button */}
      {profile.pdfLink && (
        <div>
          <Button
            onClick={handleDownloadPDF}
            className="bg-secondary hover:bg-secondary/90 text-primary font-semibold px-8 py-6 text-lg flex items-center gap-2 rounded-lg"
          >
            <Download className="w-5 h-5" />
            Download Profile
          </Button>
        </div>
      )}

    </div>
  )
}

export default MainContent