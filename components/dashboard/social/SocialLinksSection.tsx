'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FloatingLabelInput } from '@/components/ui/floatingInput'
import { myToast } from '@/lib/utils'

interface SocialData {
  facebookLink: string
  youtubeLink: string
  twitterLink: string
  instagramLink: string
  linkedinLink: string
}

const SocialLinksSection = () => {
  const [socials, setSocials] = useState<SocialData>({
    facebookLink: '',
    youtubeLink: '',
    twitterLink: '',
    instagramLink: '',
    linkedinLink: '',
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const fetchSocials = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/home/social')
      const data = await res.json()

      if (res.ok && data.data) {
        setSocials({
          facebookLink: data.data.facebookLink || '',
          youtubeLink: data.data.youtubeLink || '',
          twitterLink: data.data.twitterLink || '',
          instagramLink: data.data.instagramLink || '',
          linkedinLink: data.data.linkedinLink || '',
        })
      }
    } catch (err: any) {
      myToast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSocials()
  }, [])

  const handleChange = (key: keyof SocialData, value: string) => {
    setSocials((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async () => {
    try {
      const formData = new FormData()

      formData.append('facebookLink', socials.facebookLink)
      formData.append('youtubeLink', socials.youtubeLink)
      formData.append('twitterLink', socials.twitterLink)
      formData.append('instagramLink', socials.instagramLink)
      formData.append('linkedinLink', socials.linkedinLink)

      setSaving(true)

      const res = await fetch('/api/home/social', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (res.ok) {
        myToast.success('Social links updated successfully')
        fetchSocials()
      } else {
        throw new Error(data.message)
      }
    } catch (err: any) {
      myToast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <p className="text-center text-sm text-foreground/70 mt-4">
        Loading social links...
      </p>
    )
  }

  return (
    <div className="space-y-8 my-4">
      <div className="space-y-4">
        <FloatingLabelInput
          type="text"
          label="Facebook Link"
          value={socials.facebookLink}
          onChange={(e) => handleChange('facebookLink', e.target.value)}
        />

        <FloatingLabelInput
          type="text"
          label="YouTube Link"
          value={socials.youtubeLink}
          onChange={(e) => handleChange('youtubeLink', e.target.value)}
        />

        <FloatingLabelInput
          type="text"
          label="Twitter Link"
          value={socials.twitterLink}
          onChange={(e) => handleChange('twitterLink', e.target.value)}
        />

        <FloatingLabelInput
          type="text"
          label="Instagram Link"
          value={socials.instagramLink}
          onChange={(e) => handleChange('instagramLink', e.target.value)}
        />

        <FloatingLabelInput
          type="text"
          label="LinkedIn Link"
          value={socials.linkedinLink}
          onChange={(e) => handleChange('linkedinLink', e.target.value)}
        />

        <div className="flex gap-2">
          <Button
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Social Links'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SocialLinksSection
