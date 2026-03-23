'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import ImageInput from '../ui/input-image'

type BlogsFormProps = {
  onSubmit: (data: any) => void
  defaultValues?: any
}
// ---------------- BLOGS FORM ----------------
export default function BlogsForm({ onSubmit, defaultValues }: BlogsFormProps) {
  const [heading, setHeading] = useState(defaultValues?.heading || '')
  const [description, setDescription] = useState(defaultValues?.description || '')
  const [image, setImage] = useState<File | null>(null)
  const [defaultImage, setDefaultImage] = useState(defaultValues?.image || null)

  useEffect(() => {
    setHeading(defaultValues?.heading || '')
    setDescription(defaultValues?.description || '')
    setImage(null)
    setDefaultImage(defaultValues?.image || null)
  }, [defaultValues])

  const handleSubmit = () => {
    onSubmit({
      heading,
      description,
      image,
    })
  }

  return (
    <div className="space-y-4">
      {/* HEADING */}
      <div>
        <label className="font-semibold mb-1 block">Heading</label>
        <Input
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          placeholder="Enter blog heading"
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="font-semibold mb-1 block">Description</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter blog description"
          className="resize-none"
        />
      </div>

      {/* IMAGE */}
      <ImageInput
        defaultImage={defaultImage}
        onFileSelect={(file: File) => setImage(file)}
      />

      {/* SUBMIT */}
      <Button className="w-full" onClick={handleSubmit}>Save</Button>
    </div>
  )
}
