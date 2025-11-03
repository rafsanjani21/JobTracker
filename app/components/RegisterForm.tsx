"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterForm({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  errorMsg,
  successMsg,
  loading,
  handleRegister,
}: {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  errorMsg: string;
  successMsg: string;
  loading: boolean;
  handleRegister: (e: React.FormEvent) => Promise<void>;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="p-8 max-w-md w-full rounded-xl">
      <h1 className="text-3xl font-bold text-center text-white">JobTracker</h1>
      <h1 className="text-2xl font-bold mb-6 text-center text-white">Daftar Akun</h1>

      <form onSubmit={handleRegister} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block mb-1 font-medium text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-white outline-none text-white bg-transparent"
            placeholder="Masukkan email"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block mb-1 font-medium text-white">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:ring-1 focus:ring-white outline-none text-white bg-transparent"
            placeholder="Minimal 6 karakter"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-10 text-gray-300 hover:text-white"
            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Konfirmasi Password */}
        <div className="relative">
          <label className="block mb-1 font-medium text-white">Konfirmasi Password</label>
          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:ring-1 focus:ring-white outline-none text-white bg-transparent"
            placeholder="Ulangi password"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-10 text-gray-300 hover:text-white"
            aria-label={showConfirm ? "Sembunyikan password" : "Tampilkan password"}
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Error & Success */}
        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        {successMsg && <p className="text-green-400 text-sm">{successMsg}</p>}

        {/* Tombol Daftar */}
        <button
          type="submit"
          disabled={loading}
          className="w-full border border-white text-white py-2 rounded hover:bg-black/45 transition cursor-pointer"
        >
          {loading ? "Mendaftar..." : "Daftar"}
        </button>
      </form>

      <p className="text-sm text-center mt-4 text-white">
        Sudah punya akun?{" "}
        <a href="/login" className="text-blue-400 hover:underline">
          Login di sini
        </a>
      </p>
    </div>
  );
}
