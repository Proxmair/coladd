'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ImageInput from '../ui/input-image'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setModal } from '@/store/slices/modalSlice'
import { Edit, Trash } from 'lucide-react'
import ContentTableModal from '../modals/BlogContentModal'

type BlogDetailFormProps = {
  onSubmit: (form: FormData) => void
  defaultValues?: any
}

export default function BlogDetailForm({ onSubmit, defaultValues }: BlogDetailFormProps) {
  const dispatch = useDispatch()

  // ✅ MODAL STATE (like Navbar)
  const openContentModal = useSelector(
    (state: RootState) => state.modal['content'] || false
  )

  const setOpenContentModal = (open: boolean) => {
    dispatch(setModal({ key: 'content', value: open }))
  }

  // ---------------- BASIC FIELDS ----------------
  const [heading, setHeading] = useState(defaultValues?.details?.heading || '')
  const [author, setAuthor] = useState(defaultValues?.details?.author || '')
  const [date, setDate] = useState(
    defaultValues?.details?.date
      ? new Date(defaultValues.details.date).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10)
  )

  const [tags, setTags] = useState<string[]>(defaultValues?.details?.tags || [])
  const [content, setContent] = useState<any[]>(defaultValues?.details?.content || [])

  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const [image, setImage] = useState<File | null>(null)
  const [defaultImage] = useState(defaultValues?.image || null)

  // ---------------- TAG ----------------
  const updateTag = (index: number, value: string) => {
    const updated = [...tags]
    updated[index] = value
    setTags(updated)
  }

  const addTag = () => setTags([...tags, ''])
  const removeTag = (index: number) => setTags(tags.filter((_, i) => i !== index))

  // ---------------- CONTENT ----------------
  const handleSaveContent = (data: any) => {
    if (editingIndex !== null) {
      const updated = [...content]
      updated[editingIndex] = data
      setContent(updated)
    } else {
      setContent([...content, data])
    }
    setEditingIndex(null)
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setOpenContentModal(true)
  }

  const handleDelete = (index: number) => {
    setContent(content.filter((_, i) => i !== index))
  }

  // ---------------- SUBMIT ----------------
  const handleSubmit = () => {
    const form = new FormData()

    if (image) form.append('image', image)

    if (heading.trim()) form.append('detailsHeading', heading)
    if (author.trim()) form.append('author', author)
    if (date) form.append('date', date)

    if (tags.length) {
      form.append('tags', JSON.stringify(tags.filter(t => t.trim())))
    }

    // ✅ CONTENT PAYLOAD (same logic, cleaner)
    const contentPayload = content.map((c, index) => {
      if (c.identity === 'imageLink') {
        if (c.file) {
          const key = `contentFile_${index}`
          form.append(key, c.file)

          return {
            identity: 'imageLink',
            fileKey: key,
          }
        }

        return {
          identity: 'imageLink',
          imageLink: c.imageLink || '',
        }
      }

      return {
        identity: c.identity,
        text: c.text || '',
      }
    })

    if (contentPayload.length) {
      form.append('content', JSON.stringify(contentPayload))
    }

    onSubmit(form)
  }

  return (
    <div className="space-y-4">
      {/* IMAGE */}
      <ImageInput
        defaultImage={defaultImage}
        onFileSelect={(file: File) => setImage(file)}
      />

      {/* HEADING */}
      <Input value={heading} onChange={(e) => setHeading(e.target.value)} placeholder="Heading" />

      {/* AUTHOR */}
      <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" />

      {/* DATE */}
      <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

      {/* TAGS */}
      <div>
        {tags.map((tag, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <Input value={tag} onChange={(e) => updateTag(i, e.target.value)} />
            <Button variant="destructive" onClick={() => removeTag(i)}>X</Button>
          </div>
        ))}
        <Button size="sm" onClick={addTag}>+ Add Tag</Button>
      </div>

      {/* CONTENT */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <h3 className="font-semibold">Content</h3>
          <Button
            size="sm"
            onClick={() => {
              setEditingIndex(null)
              setOpenContentModal(true)
            }}
          >
            Add Content
          </Button>
        </div>

        {content.map((item, index) => (
          <div key={index} className="border p-3 rounded flex justify-between">
            <div>
              <p className="text-sm font-medium">{item.identity}</p>
              <p className="text-xs text-muted-foreground truncate max-w-[250px]">
                {item.text || item.imageLink || item.file?.name}
              </p>
            </div>

            <div className="flex gap-2">
              <Button size="icon" variant="secondary" onClick={() => handleEdit(index)}>
                <Edit size={16} />
              </Button>
              <Button size="icon" variant="destructive" onClick={() => handleDelete(index)}>
                <Trash size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* SUBMIT */}
      <Button className="w-full" onClick={handleSubmit}>
        Save
      </Button>

      {/* ✅ MODAL */}
      <ContentTableModal
        open={openContentModal}
        onOpenChange={setOpenContentModal}
        onSubmit={handleSaveContent}
        defaultValues={editingIndex !== null ? content[editingIndex] : null}
        mode={editingIndex !== null ? 'edit' : 'add'}
      />
    </div>
  )
}
