'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import JobCard from './JobCard'

export default function JobList({ user }: { user: any }) {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    if (!user) return
    const fetchApplications = async () => {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error) setApplications(data || [])
      setLoading(false)
    }

    fetchApplications()
  }, [user])

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus lamaran ini?')) return
    const { error } = await supabase.from('applications').delete().eq('id', id)
    if (error) alert(error.message)
    else setApplications((prev) => prev.filter((a) => a.id !== id))
  }

  // 🔹 Hitung total halaman
  const totalPages = Math.ceil(applications.length / itemsPerPage)

  // 🔹 Data yang akan ditampilkan pada halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = applications.slice(indexOfFirstItem, indexOfLastItem)

  // 🔹 Fungsi untuk pindah halaman
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1)
  }

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1)
  }

  return (
    <section>
      <h2 className="text-4xl font-extrabold my-6 text-center">Daftar Lamaran</h2>

      {loading ? (
        <p>Memuat...</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-500 italic text-center">Tidak ada data.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {currentItems.map((app) => (
              <JobCard key={app.id} app={app} onDelete={handleDelete} />
            ))}
          </ul>

          {/* 🔹 Pagination Controls */}
          <div className="flex justify-center items-center mt-6 gap-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Sebelumnya
            </button>

            <span className="text-gray-700">
              Halaman <b>{currentPage}</b> dari <b>{totalPages}</b>
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Berikutnya
            </button>
          </div>
        </>
      )}
    </section>
  )
}
