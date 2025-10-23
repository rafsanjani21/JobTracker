'use client'

import Link from 'next/link'

interface JobCardProps {
  app: {
    id: number
    company_name: string
    field: string
    position: string
    status: string
  }
  onDelete: (id: number) => void
}

export default function JobCard({ app, onDelete }: JobCardProps) {
  return (
    <li className="border p-4 rounded shadow-sm flex justify-between items-center mx-6">
      <div>
        <p className="font-bold">{app.company_name}</p>
        <p className="text-sm text-gray-600">
          {app.field} — {app.position}
        </p>
        <p className="text-sm mt-1">
          Status: <b>{app.status}</b>
        </p>
      </div>
      <div className="flex gap-2">
        <Link
          href={`/edit-job/${app.id}`}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(app.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Hapus
        </button>
      </div>
    </li>
  )
}
