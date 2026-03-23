'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import HomeScheduleForm from '../forms/HomeScheduleForm'

export default function HomeScheduleTableModal({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  mode = 'add',
}: any) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:w-125 w-[90%]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            {mode === 'edit' ? 'Edit Schedule' : 'Add Schedule'}
          </DialogTitle>
        </DialogHeader>

        <HomeScheduleForm
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