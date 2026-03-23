'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import ContentForm from '../forms/BlogContentForm'

interface ContentTableModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
  defaultValues?: any
  mode?: 'add' | 'edit'
}

export default function ContentTableModal({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  mode = 'add',
}: ContentTableModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:w-125 w-[90%]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            {mode === 'edit' ? 'Edit Content' : 'Add Content'}
          </DialogTitle>
        </DialogHeader>

        <ContentForm
          onSubmit={(data: any) => {
            onSubmit(data)
            onOpenChange(false)
          }}
          defaultValues={defaultValues}
        />
      </DialogContent>
    </Dialog>
  )
}