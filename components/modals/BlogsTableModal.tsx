'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import BlogsForm from '../forms/BlogsForm'

interface BlogsTableModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
  defaultValues?: any
  mode?: 'add' | 'edit'
}

export default function BlogsTableModal({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  mode = 'add',
}: BlogsTableModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:w-125 w-[90%]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            {mode === 'edit' ? 'Edit Blog' : 'Add Blog'}
          </DialogTitle>
        </DialogHeader>

        <BlogsForm
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