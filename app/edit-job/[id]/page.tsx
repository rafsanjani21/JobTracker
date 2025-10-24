'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function EditJobPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [formData, setFormData] = useState({
    company_name: '',
    position: '',
    platform: '',
    status: '',
    applied_date: '',
    notes: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        alert('Gagal memuat data: ' + error.message)
        router.push('/')
      } else {
        setFormData(data)
      }
      setLoading(false)
    }
    fetchData()
  }, [id, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const { error } = await supabase
      .from('applications')
      .update({
        company_name: formData.company_name,
        position: formData.position,
        platform: formData.platform,
        status: formData.status,
        applied_date: formData.applied_date,
        notes: formData.notes,
      })
      .eq('id', id)

    setSaving(false)
    if (error) {
      alert('Gagal memperbarui: ' + error.message)
    } else {
      alert('Lamaran berhasil diperbarui!')
      router.push('/dashboard')
    }
  }

  // Loading screen
  if (loading)
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-700 via-blue-600 to-blue-500 text-white">
        <div className="flex flex-col items-center space-y-4">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-white/40 border-t-yellow-400 rounded-full animate-spin"></div>
          <p className="text-lg font-semibold tracking-wide animate-pulse">
            Memuat data lamaran...
          </p>
        </div>
      </main>
    )

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-700 via-blue-600 to-blue-500 p-6">
      <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full border border-white/20 max-w-lg">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
          Edit Lamaran
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-blue-900">
              Nama Perusahaan
            </label>
            <input
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-blue-900">Posisi</label>
            <input
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-blue-900">
              Platform Pendaftaran
            </label>
            <input
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-blue-900">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="Dikirim">Dikirim</option>
              <option value="Interview">Interview</option>
              <option value="Diterima">Diterima</option>
              <option value="Ditolak">Ditolak</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-blue-900">
              Tanggal Lamar
            </label>
            <input
              type="date"
              name="applied_date"
              value={formData.applied_date || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-blue-900">Catatan</label>
            <textarea
              name="notes"
              value={formData.notes || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              rows={3}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={saving}
            className={`w-full font-semibold px-4 py-3 rounded-xl transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
              saving
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-yellow-400 text-blue-900 hover:bg-yellow-300'
            }`}
          >
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </form>
      </div>
    </main>
  )
}
