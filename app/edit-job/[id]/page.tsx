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
    field: '',
    position: '',
    status: '',
    applied_date: '',
    notes: '',
  })
  const [loading, setLoading] = useState(true)

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
    setLoading(true)
    const { error } = await supabase
      .from('applications')
      .update({
        company_name: formData.company_name,
        field: formData.field,
        position: formData.position,
        status: formData.status,
        applied_date: formData.applied_date,
        notes: formData.notes,
      })
      .eq('id', id)

    setLoading(false)
    if (error) {
      alert('Gagal memperbarui: ' + error.message)
    } else {
      alert('Lamaran berhasil diperbarui!')
      router.push('/dashboard')
    }
  }

  if (loading) return <p className="p-6">Memuat...</p>

  return (
    <main className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Lamaran</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nama Perusahaan</label>
          <input
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Bidang</label>
          <input
            name="field"
            value={formData.field}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Posisi</label>
          <input
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Dikirim">Dikirim</option>
            <option value="Interview">Interview</option>
            <option value="Diterima">Diterima</option>
            <option value="Ditolak">Ditolak</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Tanggal Lamar</label>
          <input
            type="date"
            name="applied_date"
            value={formData.applied_date || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Catatan</label>
          <textarea
            name="notes"
            value={formData.notes || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={3}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </form>
    </main>
  )
}
