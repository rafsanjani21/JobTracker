'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import LogoutButton from './LogoutButton'

export default function Navbar({ user }: { user: any }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setScrolled(true)
      else setScrolled(false)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md border-gray-200'
          : 'bg-white/50 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/dashboard" className="text-2xl font-bold text-blue-600">
          JobTracker
        </Link>

        <div className="flex gap-6 items-center">
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition">
            Dashboard
          </Link>
          <Link href="/add-job" className="text-gray-700 hover:text-blue-600 transition">
            Tambah Lamaran
          </Link>
          {user && <LogoutButton />}
        </div>
      </div>
    </nav>
  )
}
