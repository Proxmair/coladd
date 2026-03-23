'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type VideosFormProps = {
  onSubmit: (data: any) => void
  defaultValues?: any
}

export default function VideosForm({ onSubmit, defaultValues }: VideosFormProps) {
  const [title, setTitle] = useState(defaultValues?.title || '')
  const [youtubeId, setYoutubeId] = useState(defaultValues?.youtubeId || '')
  const [thumbnail, setThumbnail] = useState(defaultValues?.thumbnail || '')
  const [duration, setDuration] = useState(defaultValues?.duration || '')
  const [description, setDescription] = useState(defaultValues?.description || '')
  const [isActive, setIsActive] = useState(defaultValues?.isActive ?? true)

  useEffect(() => {
    setTitle(defaultValues?.title || '')
    setYoutubeId(defaultValues?.youtubeId || '')
    setThumbnail(defaultValues?.thumbnail || '')
    setDuration(defaultValues?.duration || '')
    setDescription(defaultValues?.description || '')
    setIsActive(defaultValues?.isActive ?? true)
  }, [defaultValues])

  const handleSubmit = () => {
    onSubmit({
      title,
      youtubeId,
      thumbnail,
      duration,
      description,
      isActive,
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="font-semibold mb-1 block">Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter video title" />
      </div>

      <div>
        <label className="font-semibold mb-1 block">YouTube ID</label>
        <Input
          value={youtubeId}
          onChange={(e) => setYoutubeId(e.target.value)}
          placeholder="Enter YouTube video ID"
        />
      </div>

      <div>
        <label className="font-semibold mb-1 block">Thumbnail URL</label>
        <Input
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          placeholder="Optional custom thumbnail URL"
        />
      </div>

      <div>
        <label className="font-semibold mb-1 block">Duration</label>
        <Input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 10:45" />
      </div>

      <div>
        <label className="font-semibold mb-1 block">Description</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter video description"
          className="resize-none"
        />
      </div>

      <label className="flex items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="h-4 w-4"
        />
        Active
      </label>

      <Button className="w-full" onClick={handleSubmit}>Save</Button>
    </div>
  )
}
