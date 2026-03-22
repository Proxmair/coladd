'use client'

import { ReactNode } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface BaseTableProps {
  headers: string[]
  rows: ReactNode[][]
}

export default function BaseTable({ headers, rows }: BaseTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            {headers.map((header, i) => (
              <TableHead key={i} className="px-0 py-2 font-bold whitespace-nowrap">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {row.map((cell, i) => (
                <TableCell key={i} className="px-0 py-2 align-top">
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}