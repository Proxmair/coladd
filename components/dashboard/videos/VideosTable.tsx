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
import VideosTableModal from '@/components/modals/VideosTableModal'

export default function VideosTable() {
  const dispatch = useDispatch()

  const openModal = useSelector(
    (state: RootState) => state.modal['videosTable'] || false
  )
  const setOpenModal = (open: boolean) => {
    dispatch(setModal({ key: 'videosTable', value: open }))
  }

  const [rows, setRows] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<'add' | 'edit'>('add')
  const [selectedRow, setSelectedRow] = useState<any>(null)

  const fetchVideos = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/videos')
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
    fetchVideos()
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

      const res = await fetch('/api/videos', {
        method: 'DELETE',
        body: form,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      myToast.success(data.message || 'Deleted successfully')
      fetchVideos()
    } catch (err: any) {
      myToast.error(err.message)
    }
  }

  const handleSubmit = async (data: any) => {
    try {
      const form = new FormData()

      if (mode === 'edit') form.append('id', selectedRow._id)
      form.append('title', data.title)
      form.append('youtubeId', data.youtubeId)
      form.append('thumbnail', data.thumbnail || '')
      form.append('duration', data.duration || '')
      form.append('description', data.description || '')
      form.append('isActive', String(Boolean(data.isActive)))

      const res = await fetch('/api/videos', {
        method: mode === 'add' ? 'POST' : 'PUT',
        body: form,
      })

      const resData = await res.json()
      if (!res.ok) throw new Error(resData.message)
      myToast.success(resData.message || 'Success')
      setOpenModal(false)
      fetchVideos()
    } catch (err: any) {
      myToast.error(err.message)
    }
  }

  const headings = ['Thumbnail', 'Title', 'YouTube ID', 'Duration', 'Status', 'Actions']

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
                {row.thumbnail ? (
                  <img src={row.thumbnail} alt={row.title} className="w-20 h-12 object-cover rounded-md border" />
                ) : (
                  '-'
                )}
              </TableCell>

              <TableCell className="max-w-[220px] truncate">{row.title || '-'}</TableCell>
              <TableCell className="max-w-[180px] truncate">{row.youtubeId || '-'}</TableCell>
              <TableCell>{row.duration || '-'}</TableCell>
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
              <TableCell colSpan={6} className="text-center py-6">No videos found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Button onClick={handleAdd} className="mx-auto w-20 mt-2">Add</Button>

      <VideosTableModal
        open={openModal}
        onOpenChange={setOpenModal}
        onSubmit={handleSubmit}
        defaultValues={selectedRow}
        mode={mode}
      />
    </div>
  )
}
