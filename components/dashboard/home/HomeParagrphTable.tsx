'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, Plus, MoreVertical } from 'lucide-react'
import BaseTable from '../BaseTable'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface TableRowData {
    id: string
    paragraph: string
}

const initialData: TableRowData[] = [
    {
        id: '1',
        paragraph:
            'Dr. Khurram Baqai, MBBS, FCPS (Gastroenterology and Hepatology), MACG (USA), holds the distinguished position of Consultant Gastroenterologist and Hepatologist at Ziauddin University Hospital...',
    },
    {
        id: '2',
        paragraph:
            'As an esteemed faculty member of Ziauddin University, Dr. Baqai holds the rank of Associate Professor...',
    },
    {
        id: '3',
        paragraph:
            "Dr. Baqai's professional profile is further enriched by his robust research pursuits...",
    },
]

export default function HomeParagraphTable() {
    const [rows, setRows] = useState<TableRowData[]>(initialData)

    const handleEdit = (id: string) => {
        const row = rows.find(r => r.id === id)
        if (!row) return
        const newText = prompt('Edit paragraph:', row.paragraph)
        if (newText !== null) {
            setRows(prev => prev.map(r => (r.id === id ? { ...r, paragraph: newText } : r)))
        }
    }

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this row?')) {
            setRows(prev => prev.filter(r => r.id !== id))
        }
    }

    const handleAdd = () => {
        const newText = prompt('Enter paragraph text:')
        if (newText) {
            const nextId = (rows.length + 1).toString()
            setRows(prev => [...prev, { id: nextId, paragraph: newText }])
        }
    }

    const tableRows = rows.map((row, index) => [
        index + 1,

        <div className="truncate max-w-30 sm:max-w-60 md:max-w-85 lg:max-w-148 xl:max-w-200">
            {row.paragraph}
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

                <DropdownMenuItem
                    onClick={() => handleDelete(row.id)}
                    className="text-red-500"
                >
                    <Trash2 size={14} className="mr-2" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>,
    ])
    return (
        <div className="p-8 bg-primary/20 rounded-4xl">
            <h1 className="text-2xl font-bold mb-4">Paragraphs</h1>

            <BaseTable headers={['S.No', 'Paragraph', 'Action']} rows={tableRows} />

            <div className="mt-4">
                <Button onClick={handleAdd} className="flex items-center justify-center w-12 h-10 p-1">
                    <Plus size={16} />
                </Button>
            </div>
        </div>
    )
}