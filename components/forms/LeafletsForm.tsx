'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import ImageInput from '../ui/input-image'

type LeafletsFormProps = {
  onSubmit: (data: any) => void
  defaultValues?: any
}

export default function LeafletsForm({ onSubmit, defaultValues }: LeafletsFormProps) {
  const [title, setTitle] = useState(defaultValues?.title || '')
  const [description, setDescription] = useState(defaultValues?.description || '')
  const [isActive, setIsActive] = useState(defaultValues?.isActive ?? true)
  const [icon, setIcon] = useState<File | null>(null)
  const [pdf, setPdf] = useState<File | null>(null)
  const [defaultIcon, setDefaultIcon] = useState(defaultValues?.icon || null)
  const [pdfName, setPdfName] = useState('')

  useEffect(() => {
    setTitle(defaultValues?.title || '')
    setDescription(defaultValues?.description || '')
    setIsActive(defaultValues?.isActive ?? true)
    setIcon(null)
    setPdf(null)
    setDefaultIcon(defaultValues?.icon || null)
    setPdfName('')
  }, [defaultValues])

  const handleSubmit = () => {
    onSubmit({
      title,
      description,
      isActive,
      icon,
      pdf,
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="font-semibold mb-1 block">Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter leaflet title" />
      </div>

      <div>
        <label className="font-semibold mb-1 block">Description</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter leaflet description"
          className="resize-none"
        />
      </div>

      <ImageInput defaultImage={defaultIcon} onFileSelect={(file: File) => setIcon(file)} />

      <div>
        <label className="font-semibold mb-1 block">PDF File</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            const selected = e.target.files?.[0] || null
            setPdf(selected)
            setPdfName(selected?.name || '')
          }}
          className="block mb-2"
        />
        {pdfName && <p className="text-sm text-muted-foreground">{pdfName}</p>}
        {!pdfName && defaultValues?.pdfUrl && (
          <a
            href={defaultValues.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 underline"
          >
            View current PDF
          </a>
        )}
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
