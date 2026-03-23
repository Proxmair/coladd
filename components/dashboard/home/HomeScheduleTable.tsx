'use client'

import { useEffect, useState } from "react"
import HomeScheduleTableModal from "@/components/modals/HomeScheduleTableModal"
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
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { setModal } from "@/store/slices/modalSlice"
import { myToast } from "@/lib/utils"

export default function HomeScheduleTable() {
  const dispatch = useDispatch()

  const openModal = useSelector(
    (state: RootState) => state.modal["homeSchedule"] || false
  )

  const setOpenModal = (open: boolean) => {
    dispatch(setModal({ key: "homeSchedule", value: open }))
  }

  const [mode, setMode] = useState<'add' | 'edit'>('add')
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const [rows, setRows] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // ---------------- FETCH DATA ----------------
  const fetchSchedules = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/home/schedule")
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
    fetchSchedules()
  }, [])

  // ---------------- HELPERS ----------------
  const transformRowToForm = (row: any) => {
    return {
      _id: row._id,
      location: row.location || [],
      contact: row.contact || [],
      timings: row.timings || {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
      },
    }
  }

 const formatTimings = (timings: any) => {
  if (!timings || typeof timings !== "object") return "-"

  return Object.entries(timings)
    .filter(([_, v]: any) => Array.isArray(v) && v.length)
    .map(([day, times]: any) => `${day}: ${times.join(", ")}`)
    .join(" | ") || "-"
}

  // ---------------- HANDLERS ----------------
  const handleEdit = (row: any) => {
    setMode('edit')
    setSelectedRow(transformRowToForm(row))
    setOpenModal(true)
  }

  const handleAdd = () => {
    setMode('add')
    setSelectedRow(null)
    setOpenModal(true)
  }

  const handleDelete = async (row: any) => {
    try {
      const form = new FormData()
      form.append("id", row._id)

      const res = await fetch("/api/home/schedule", {
        method: "DELETE",
        body: form,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      myToast.success("Deleted successfully")
      fetchSchedules()
    } catch (err: any) {
      myToast.error(err.message)
    }
  }

  const handleSubmit = async (data: any) => {
    try {
      const form = new FormData()

      if (mode === "edit") {
        form.append("id", selectedRow._id)
      }

      form.append("location", JSON.stringify(data.location))
      form.append("contact", JSON.stringify(data.contact))
      form.append("timings", JSON.stringify(data.timings))

      const res = await fetch("/api/home/schedule", {
        method: mode === "add" ? "POST" : "PUT",
        body: form,
      })

      const resData = await res.json()
      if (!res.ok) throw new Error(resData.message)

      myToast.success(resData.message || "Success")
      setOpenModal(false)
      fetchSchedules()
    } catch (err: any) {
      myToast.error(err.message)
    }
  }

  // ---------------- UI ----------------
  const headings = ["Location", "Timings", "Contact", "Actions"]

  return (
    <div className="flex flex-col">
      <Table className="bg-black/20 rounded-md">

        {/* HEADER */}
        <TableHeader>
          <TableRow>
            {headings.map((heading, i) => {
              const isLast = i === headings.length - 1
              return (
                <TableHead
                  key={heading}
                  className={`font-bold ${isLast ? "text-right" : ""}`}
                >
                  {heading}
                </TableHead>
              )
            })}
          </TableRow>
        </TableHeader>

        {/* BODY */}
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={row._id || rowIndex}>
              <TableCell>{row.location?.join(", ")}</TableCell>
              <TableCell>{formatTimings(row.timings)}</TableCell>
              <TableCell>{row.contact?.join(", ")}</TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(row)}>
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => handleDelete(row)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}

          {!rows.length && !loading && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                No schedules found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Button onClick={handleAdd} className="mx-auto w-20 mt-2">
        Add
      </Button>

      <HomeScheduleTableModal
        open={openModal}
        onOpenChange={setOpenModal}
        onSubmit={handleSubmit}
        defaultValues={selectedRow}
        mode={mode}
      />
    </div>
  )
}