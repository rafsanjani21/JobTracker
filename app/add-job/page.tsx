'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function AddJobPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    company_name: '',
    position: '',
    platform: '',
    status: 'Dikirim',
    applied_date: '',
    notes: '',
  })

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push('/login')
      } else {
        setUser(data.user)
      }
    }
    checkUser()
  }, [router])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)

    const { error } = await supabase.from('applications').insert([
      {
        user_id: user.id,
        company_name: formData.company_name,
        position: formData.position,
        platform: formData.platform,
        status: formData.status,
        applied_date: formData.applied_date || new Date().toISOString().split('T')[0],
        notes: formData.notes,
      },
    ])

    setLoading(false)

    if (error) {
      alert('Gagal menyimpan data: ' + error.message)
    } else {
      alert('Lamaran berhasil ditambahkan!')
      router.push('/dashboard')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-700 via-blue-600 to-blue-500 p-6">
      <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full border border-white/20">
        <h1 className="text-3xl font-extrabold mb-2 text-center text-blue-700">
          Tambah Lamaran
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Catat lamaran baru kamu dengan mudah ✨
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-blue-900">
              Nama Perusahaan
            </label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-blue-900">Posisi</label>
            <input
              type="text"
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
              type="text"
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
              value={formData.applied_date}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-blue-900">Catatan</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none resize-none"
              rows={3}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-blue-900 hover:bg-yellow-300  font-semibold px-4 py-3 rounded-xl transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            {loading ? 'Menyimpan...' : 'Simpan Lamaran'}
          </button>
        </form>
      </div>
    </main>
  )
}
