'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import VideosForm from '../forms/VideosForm'

interface VideosTableModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
  defaultValues?: any
  mode?: 'add' | 'edit'
}

export default function VideosTableModal({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  mode = 'add',
}: VideosTableModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:w-125 w-[90%]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            {mode === 'edit' ? 'Edit Video' : 'Add Video'}
          </DialogTitle>
        </DialogHeader>

        <VideosForm onSubmit={onSubmit} defaultValues={defaultValues} />
      </DialogContent>
    </Dialog>
  )
}
