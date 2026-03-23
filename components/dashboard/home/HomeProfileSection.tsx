'use client'

import { useEffect, useState, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { FloatingLabelInput } from '@/components/ui/floatingInput'
import { FloatingLabelTextarea } from '@/components/ui/floatingTextArea'
import { myToast } from '@/lib/utils'

interface ProfileData {
  name: string
  designation: string
  description: string
  pdfFile?: File
  pdfLink?: string
}

const HomeProfileSection = () => {
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    designation: '',
    description: '',
    pdfLink: ''
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Fetch profile
  const fetchProfile = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/home/profile')
      const data = await res.json()

      if (res.ok && data.data) {
        setProfile({
          name: data.data.name || '',
          designation: data.data.designation || '',
          description: data.data.description || '',
          pdfLink: data.data.pdfLink || ''
        })
      }
    } catch (err: any) {
      myToast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleChange = (key: keyof ProfileData, value: string | File) => {
    setProfile(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async () => {
    try {
      const formData = new FormData()

      formData.append('name', profile.name)
      formData.append('designation', profile.designation)
      formData.append('description', profile.description)

      if (profile.pdfFile) {
        formData.append('pdf', profile.pdfFile)
      }

      setSaving(true)

      const res = await fetch('/api/home/profile', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (res.ok) {
        myToast.success('Profile updated successfully')
        fetchProfile() // refresh to get latest pdfLink
      } else {
        throw new Error(data.message)
      }
    } catch (err: any) {
      myToast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading)
    return (
      <p className="text-center text-sm text-foreground/70 mt-4">
        Loading profile...
      </p>
    )

  return (
    <div className="space-y-8 my-4">
      <div className="space-y-4">

        <FloatingLabelInput
          type="text"
          label="Name"
          value={profile.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />

        <FloatingLabelInput
          type="text"
          label="Designation"
          value={profile.designation}
          onChange={(e) => handleChange('designation', e.target.value)}
        />

        <FloatingLabelTextarea
          label="Description"
          value={profile.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />

        {/* 🔥 PDF Section */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            PDF Document
          </label>

          {/* Existing PDF Preview */}
          {profile.pdfLink && !profile.pdfFile && (
            <div className="border rounded-lg p-3 bg-muted/30 space-y-2">
              <iframe
                src={profile.pdfLink}
                className="w-full h-64 rounded-md border"
              />

              <div className="flex justify-between items-center">
                <a
                  href={profile.pdfLink}
                  target="_blank"
                  className="text-sm text-blue-500 underline"
                >
                  Open PDF
                </a>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setProfile(prev => ({ ...prev, pdfLink: '' }))}
                >
                  Replace PDF
                </Button>
              </div>
            </div>
          )}

          {/* Upload UI (only shows if no pdf OR replacing) */}
          {!profile.pdfLink && (
            <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/30 transition">
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                id="pdfUpload"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files?.[0]) {
                    handleChange('pdfFile', e.target.files[0])
                  }
                }}
              />

              <label htmlFor="pdfUpload" className="cursor-pointer">
                {profile.pdfFile ? (
                  <p className="text-sm font-medium">
                    Selected: {profile.pdfFile.name}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Click to upload PDF
                  </p>
                )}
              </label>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </Button>
        </div>

      </div>
    </div>
  )
}

export default HomeProfileSection