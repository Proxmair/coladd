'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, Plus, MoreVertical } from 'lucide-react'
import BaseTable from '../BaseTable'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface TableRowData {
  id: string
  location: string
  timings: string
  contact: string
}

const initialData: TableRowData[] = [
  {
    id: '1',
    location: 'Block H North Nazimabad, Karachi',
    timings: 'Monday 3:30 PM - 5:30 PM\nThursday 3:30 PM - 5:30 PM',
    contact: '0327-2057338\n0340-8749434 (WhatsApp)',
  },
]

export default function HomeScheduleTable() {
  const [rows, setRows] = useState<TableRowData[]>(initialData)

  const handleEdit = (id: string) => {
    const row = rows.find((r) => r.id === id)
    if (!row) return
    const newLocation = prompt('Edit Location:', row.location)
    const newTimings = prompt('Edit Timings:', row.timings)
    const newContact = prompt('Edit Contact:', row.contact)
    if (newLocation && newTimings && newContact) {
      setRows((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, location: newLocation, timings: newTimings, contact: newContact }
            : r
        )
      )
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this row?')) {
      setRows((prev) => prev.filter((r) => r.id !== id))
    }
  }

  const handleAdd = () => {
    const newId = (rows.length + 1).toString()
    setRows((prev) => [
      ...prev,
      {
        id: newId,
        location: '',
        timings: '',
        contact: '',
      },
    ])
  }

  const tableRows = rows.map((row, index) => [
    index + 1,
    <div className="whitespace-pre-line break-words max-w-[250px] sm:max-w-[400px] md:max-w-[600px]">
      {row.location}
    </div>,
    <div className="whitespace-pre-line break-words max-w-[250px] sm:max-w-[400px] md:max-w-[600px]">
      {row.timings}
    </div>,
    <div className="whitespace-pre-line break-words max-w-[250px] sm:max-w-[400px] md:max-w-[600px]">
      {row.contact}
    </div>,
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost" className="p-1">
          <MoreVertical size={16} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleEdit(row.id)}>
          <Edit size={14} className="mr-2" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleDelete(row.id)} className="text-red-500">
          <Trash2 size={14} className="mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>,
  ])

  return (
    <div className="p-8 bg-primary/20 rounded-4xl overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Schedules</h1>

      <BaseTable headers={['S.No', 'Location', 'Timings', 'Contact', 'Action']} rows={tableRows} />

      <div className="mt-4">
        <Button onClick={handleAdd} className="flex items-center justify-center w-12 h-10 p-1">
          <Plus size={16} />
        </Button>
      </div>
    </div>
  )
}