import React from 'react'
import { Inbox } from 'lucide-react'

export default function DataTable({ columns, rows, emptyLabel = 'No records found' }) {
  if (!rows || rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-faint gap-2">
        <Inbox size={28} />
        <p className="text-sm">{emptyLabel}</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <table className="w-full text-sm min-w-[640px]">
        <thead>
          <tr className="border-b border-line text-left">
            {columns.map((col) => (
              <th key={col.key} className="label-eyebrow px-4 py-3 font-medium whitespace-nowrap">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line/70">
          {rows.map((row, i) => (
            <tr key={row.id || i} className="hover:bg-white/[0.02] transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-slate-300 whitespace-nowrap">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
