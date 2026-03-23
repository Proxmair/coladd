'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import ImageInput from '../ui/input-image'

type ContentFormProps = {
  onSubmit: (data: any) => void
  defaultValues?: any
}

export default function ContentForm({
  onSubmit,
  defaultValues,
}: ContentFormProps) {
  const [identity, setIdentity] = useState<'heading' | 'subheading' | 'text' | 'imageLink'>('text')
  const [text, setText] = useState('')
  const [imageLink, setImageLink] = useState('')
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    if (defaultValues) {
      setIdentity(defaultValues.identity || 'text')
      setText(defaultValues.text || '')
      setImageLink(defaultValues.imageLink || '')
      setFile(null)
    } else {
      // reset on add
      setIdentity('text')
      setText('')
      setImageLink('')
      setFile(null)
    }
  }, [defaultValues])

  const handleSubmit = () => {
    const payload: any = {
      identity,
    }

    if (identity === 'imageLink') {
      if (file) {
        payload.file = file // 🔥 handled later in FormData
      } else if (imageLink) {
        payload.imageLink = imageLink
      }
    } else {
      payload.text = text
    }

    onSubmit(payload)
  }

  return (
    <div className="space-y-4">
      {/* TYPE */}
      <div>
        <label className="font-semibold mb-1 block">Type</label>
        <select
          value={identity}
          onChange={(e) => setIdentity(e.target.value as any)}
          className="w-full border rounded px-2 py-2"
        >
          <option value="heading">Heading</option>
          <option value="subheading">Subheading</option>
          <option value="text">Text</option>
          <option value="imageLink">Image</option>
        </select>
      </div>

      {/* TEXT TYPES */}
      {(identity === 'heading' ||
        identity === 'subheading' ||
        identity === 'text') && (
        <div>
          <label className="font-semibold mb-1 block">Text</label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Enter ${identity}`}
            className="resize-none"
          />
        </div>
      )}

      {/* IMAGE */}
      {identity === 'imageLink' && (
        <div className="space-y-2">
          <ImageInput
            defaultImage={imageLink || defaultValues?.imageLink || null}
            onFileSelect={(file: File) => setFile(file)}
          />
        </div>
      )}

      {/* SUBMIT */}
      <Button className="w-full" onClick={handleSubmit}>
        Save Content
      </Button>
    </div>
  )
}
