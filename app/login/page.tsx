'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  // === LOGIN EMAIL & PASSWORD ===
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setErrorMsg(error.message)
    } else {
      router.push('/')
    }
  }

  // === LOGIN DENGAN GOOGLE ===
  const handleGoogleLogin = async () => {
    setErrorMsg('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })
    if (error) {
      setErrorMsg('Gagal login dengan Google: ' + error.message)
    }
  }

  return (
    <main className="min-h-screen flex bg-[url('/login.jpg')] bg-cover bg-center">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-black/20 backdrop-blur-md p-8">
      <div className=" p-8 max-w-md w-full rounded-xl">
        <h1 className="text-3xl font-bold text-center text-white">Job Tracker</h1>
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-white"
              placeholder="Masukkan email"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-white"
              placeholder="Masukkan password"
            />
          </div>

          {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full border border-white text-white py-2 rounded hover:bg-black/45 transition cursor-pointer"
          >
            {loading ? 'Masuk...' : 'Masuk'}
          </button>
        </form>

        {/* GARIS PEMISAH */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm text-white">atau</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* LOGIN DENGAN GOOGLE */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 py-2 rounded flex items-center justify-center gap-2 hover:bg-black/45 transition text-white cursor-pointer"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-white font-medium">Login dengan Google</span>
        </button>

        <p className="text-sm text-center mt-4 text-white">
          Belum punya akun?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Daftar di sini
          </a>
        </p>
      </div>
      </div>
    </main>
  )
}
