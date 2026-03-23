'use client'

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { setModal } from "@/store/slices/modalSlice"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontalIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { myToast } from "@/lib/utils"
import BlogsTableModal from "@/components/modals/BlogsTableModal"

export default function BlogsTable() {
  const dispatch = useDispatch()
  const router = useRouter()

  const openModal = useSelector(
    (state: RootState) => state.modal["blogsTable"] || false
  )
  const setOpenModal = (open: boolean) => {
    dispatch(setModal({ key: "blogsTable", value: open }))
  }

  const [rows, setRows] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<'add' | 'edit'>('add')
  const [selectedRow, setSelectedRow] = useState<any>(null)

  // ---------------- FETCH ----------------
  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/blogs")
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
    fetchBlogs()
  }, [])

  // ---------------- HANDLERS ----------------
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
      form.append("id", row._id)

      const res = await fetch("/api/blogs", {
        method: "DELETE",
        body: form,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      myToast.success("Deleted successfully")
      fetchBlogs()
    } catch (err: any) {
      myToast.error(err.message)
    }
  }

  const handleEditDetails = (row: any) => {
    router.push(`/dashboard/blogs/${row._id}`)
  }

  const handleSubmit = async (data: any) => {
    try {
      const form = new FormData()
      if (mode === 'edit') form.append("id", selectedRow._id)
      form.append("heading", data.heading)
      form.append("description", data.description)
      if (data.image) form.append("image", data.image)

      const res = await fetch("/api/blogs", {
        method: mode === 'add' ? "POST" : "PUT",
        body: form
      })
      const resData = await res.json()
      if (!res.ok) throw new Error(resData.message)
      myToast.success(resData.message || "Success")
      setOpenModal(false)
      fetchBlogs()
    } catch (err: any) {
      myToast.error(err.message)
    }
  }

  // ---------------- UI ----------------
  const headings = ["Image", "Heading", "Description", "Details", "Actions"]

  return (
    <div className="flex flex-col">
      <Table className="bg-black/20 rounded-md">
        <TableHeader>
          <TableRow>
            {headings.map((heading, i) => (
              <TableHead key={heading} className={`font-bold ${i === headings.length - 1 ? "text-right" : ""}`}>
                {heading}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row._id || index}>
              <TableCell>
                {row.image ? (
                  <img src={row.image} alt="blog" className="w-14 h-14 object-cover rounded-md border" />
                ) : "-"}
              </TableCell>

              <TableCell className="max-w-[200px] truncate">{row.heading || "-"}</TableCell>
              <TableCell className="max-w-[300px] truncate">{row.description || "-"}</TableCell>

              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleEditDetails(row)}>
                  Edit Details
                </Button>
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
                    <DropdownMenuItem className="text-red-500" onClick={() => handleDelete(row)}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}

          {!rows.length && !loading && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">No blogs found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Button onClick={handleAdd} className="mx-auto w-20 mt-2">Add</Button>

      <BlogsTableModal
        open={openModal}
        onOpenChange={setOpenModal}
        onSubmit={handleSubmit}
        defaultValues={selectedRow}
        mode={mode}
      />
    </div>
  )
}