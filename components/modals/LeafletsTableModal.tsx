'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import LeafletsForm from '../forms/LeafletsForm'

interface LeafletsTableModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
  defaultValues?: any
  mode?: 'add' | 'edit'
}

export default function LeafletsTableModal({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  mode = 'add',
}: LeafletsTableModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:w-125 w-[90%]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            {mode === 'edit' ? 'Edit Leaflet' : 'Add Leaflet'}
          </DialogTitle>
        </DialogHeader>

        <LeafletsForm onSubmit={onSubmit} defaultValues={defaultValues} />
      </DialogContent>
    </Dialog>
  )
}
