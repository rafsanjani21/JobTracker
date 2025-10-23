'use client'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="text-center py-16 bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-lg h-screen flex items-center justify-center">
  <div className="flex flex-col items-center relative">
    <img src="/logoo.png" alt="Hero Image" className="h-50" />
    <h1 className="text-4xl font-extrabold mb-4">
      Selamat Datang di <span className="text-yellow-300">JobTracker</span>
    </h1>
    <p className="max-w-2xl mx-auto text-lg text-blue-100 mb-6">
      Kelola semua lamaran kerja kamu di satu tempat. Tambahkan perusahaan, posisi, dan status dengan mudah!
    </p>
    <Link
      href="/add-job"
      className="bg-yellow-400 text-blue-900 font-semibold px-6 py-3 rounded-lg shadow hover:bg-yellow-300 transition"
    >
      + Tambah Lamaran Baru
    </Link>
  </div>
</section>
  )
}
