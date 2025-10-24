'use client'

import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Yakin ingin logout?',
      text: 'Kamu akan keluar dari akun saat ini.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, logout',
      cancelButtonText: 'Batal',
    })

    if (!result.isConfirmed) return

    const { error } = await supabase.auth.signOut()
    if (error) {
      Swal.fire('Gagal', 'Terjadi kesalahan saat logout: ' + error.message, 'error')
      return
    }

    await Swal.fire({
      title: 'Berhasil Logout!',
      text: 'Sampai jumpa lagi 👋',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
    })

    router.push('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer transition font-semibold hover:shadow-lg"
    >
      Logout
    </button>
  )
}
