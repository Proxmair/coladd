'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setModal } from '@/store/slices/modalSlice'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { MoreHorizontalIcon } from 'lucide-react'
import { myToast } from '@/lib/utils'
import LeafletsTableModal from '@/components/modals/LeafletsTableModal'

export default function LeafletsTable() {
  const dispatch = useDispatch()

  const openModal = useSelector(
    (state: RootState) => state.modal['leafletsTable'] || false
  )
  const setOpenModal = (open: boolean) => {
    dispatch(setModal({ key: 'leafletsTable', value: open }))
  }

  const [rows, setRows] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<'add' | 'edit'>('add')
  const [selectedRow, setSelectedRow] = useState<any>(null)

  const fetchLeaflets = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/leaflets')
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      setRows(data.data || [])
    } catch (err: any) {
      myToast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeaflets()
  }, [])

  const handleAdd = () => {
    setMode('add')
    setSelectedRow(null)
    setOpenModal(true)
  }

  const handleEdit = (row: any) => {
    setMode('edit')
    setSelectedRow(row)
    setOpenModal(true)
  }

  const handleDelete = async (row: any) => {
    try {
      const form = new FormData()
      form.append('id', row._id)

      const res = await fetch('/api/leaflets', {
        method: 'DELETE',
        body: form,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      myToast.success(data.message || 'Deleted successfully')
      fetchLeaflets()
    } catch (err: any) {
      myToast.error(err.message)
    }
  }

  const handleSubmit = async (data: any) => {
    try {
      const form = new FormData()

      if (mode === 'edit') form.append('id', selectedRow._id)
      form.append('title', data.title)
      form.append('description', data.description || '')
      form.append('isActive', String(Boolean(data.isActive)))
      if (data.icon) form.append('icon', data.icon)
      if (data.pdf) form.append('pdf', data.pdf)

      const res = await fetch('/api/leaflets', {
        method: mode === 'add' ? 'POST' : 'PUT',
        body: form,
      })

      const resData = await res.json()
      if (!res.ok) throw new Error(resData.message)
      myToast.success(resData.message || 'Success')
      setOpenModal(false)
      fetchLeaflets()
    } catch (err: any) {
      myToast.error(err.message)
    }
  }

  const headings = ['Icon', 'Title', 'Description', 'PDF', 'Status', 'Actions']

  return (
    <div className="flex flex-col">
      <Table className="bg-black/20 rounded-md">
        <TableHeader>
          <TableRow>
            {headings.map((heading, i) => (
              <TableHead key={heading} className={`font-bold ${i === headings.length - 1 ? 'text-right' : ''}`}>
                {heading}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row._id || index}>
              <TableCell>
                {row.icon ? (
                  <img src={row.icon} alt={row.title} className="w-14 h-14 object-cover rounded-md border" />
                ) : (
                  '-'
                )}
              </TableCell>

              <TableCell className="max-w-[220px] truncate">{row.title || '-'}</TableCell>
              <TableCell className="max-w-[300px] truncate">{row.description || '-'}</TableCell>
              <TableCell>
                {row.pdfUrl ? (
                  <a
                    href={row.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Open PDF
                  </a>
                ) : (
                  '-'
                )}
              </TableCell>
              <TableCell>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${row.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                  {row.isActive ? 'Active' : 'Inactive'}
                </span>
              </TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontalIcon />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(row)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500" onClick={() => handleDelete(row)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}

          {!rows.length && !loading && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">No leaflets found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Button onClick={handleAdd} className="mx-auto w-20 mt-2">Add</Button>

      <LeafletsTableModal
        open={openModal}
        onOpenChange={setOpenModal}
        onSubmit={handleSubmit}
        defaultValues={selectedRow}
        mode={mode}
      />
    </div>
  )
}
