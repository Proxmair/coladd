'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type BlogsFormProps = {
  onSubmit: (data: any) => void
  defaultValues?: any
}

// ---------------- IMAGE UPLOAD COMPONENT ----------------
function ImageInput({ defaultImage, onFileSelect }: any) {
  const [preview, setPreview] = useState<string | null>(defaultImage || null)
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    // Show preview for selected file
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }, [file])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      setFile(selected)
      onFileSelect(selected)
    }
  }

  return (
    <div>
      <label className="font-semibold mb-1 block">Image</label>
      <input type="file" accept="image/*" onChange={handleChange} className="block mb-2" />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-36 h-36 object-cover rounded-md border mt-1"
        />
      )}
    </div>
  )
}

// ---------------- BLOGS FORM ----------------
export default function BlogsForm({ onSubmit, defaultValues }: BlogsFormProps) {
  const [heading, setHeading] = useState(defaultValues?.heading || '')
  const [description, setDescription] = useState(defaultValues?.description || '')
  const [image, setImage] = useState<File | null>(null)
  const [defaultImage, setDefaultImage] = useState(defaultValues?.image || null)

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