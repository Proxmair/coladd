'use client'

import React, { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'

const HomeBackgroundImage = () => {
  const [imageUrl, setImageUrl] = useState(
    'https://res.cloudinary.com/proxmaircloud/image/upload/v1774124473/products/ndg6rydh0jxbq0t3ulxi.png'
  )
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Show preview immediately
    const previewUrl = URL.createObjectURL(file)
    setImageUrl(previewUrl)

    // Upload to API
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/update-background', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Failed to update image')
      const data = await res.json()

      setImageUrl(data.imageUrl) // Update with returned URL
    } catch (err: any) {
      console.error(err)
      alert(err.message || 'Failed to update image')
    } finally {
      setLoading(false)
      if (fileInputRef.current) fileInputRef.current.value = '' // reset input
    }
  }

  const handleUpdateClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="p-4 bg-primary/20 rounded-2xl max-w-md">
      <div className="relative w-full h-60 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
        <img src={imageUrl} alt="Background" className="w-full h-full object-cover" />
      </div>

      <div className="mt-4">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileSelect}
        />

        <Button
          size="sm"
          variant="secondary"
          onClick={handleUpdateClick}
          disabled={loading}
          className="flex items-center gap-2"
        >
          {loading ? <Spinner /> : <Upload size={16} />}
          {loading ? 'Updating...' : 'Update'}
        </Button>
      </div>
    </div>
  )
}

export default HomeBackgroundImage