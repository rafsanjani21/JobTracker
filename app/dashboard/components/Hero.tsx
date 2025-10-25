'use client'
import Link from 'next/link'

export default function Hero() {
  return (
    <section id="hero" className="relative text-center py-16 bg-[url('/heroo.png')] bg-cover bg-center text-white h-screen flex items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center relative z-10">
        <img src="/logoo.png" alt="Hero Image" className="h-50 mb-6" />
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

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="block w-full h-[200px]"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,224L60,224C120,224,240,224,360,213.3C480,203,600,181,720,181.3C840,181,960,203,1080,181.3C1200,160,1320,96,1380,64L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}
