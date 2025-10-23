"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Password dan konfirmasi password tidak sama");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg("Registrasi berhasil! Silakan cek email untuk verifikasi.");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => router.push("/login"), 2500);
    }
  };

  return (
    <main className="min-h-screen flex bg-[url('/login.jpg')] bg-cover bg-center">
      {/* Bagian kiri */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-black/20 backdrop-blur-md p-8">
        <div className=" p-8 max-w-md w-full rounded-xl">
          <h1 className="text-3xl font-bold text-center text-white">Job Tracker</h1>
          <h1 className="text-2xl font-bold mb-6 text-center text-white">
            Daftar Akun
          </h1>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-white">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-white outline-none text-white"
                placeholder="Masukkan email"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-white">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-white outline-none text-white"
                placeholder="Minimal 6 karakter"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-white">
                Konfirmasi Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-white outline-none text-white"
                placeholder="Ulangi password"
              />
            </div>

            {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
            {successMsg && (
              <p className="text-green-600 text-sm">{successMsg}</p>
            )}

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
            <a href="/login" className="text-blue-600 hover:underline">
              Login di sini
            </a>
          </p>
        </div>
      </div>

      {/* Bagian kanan */}
      <div className="hidden md:block md:w-1/2"></div>
    </main>
  );
}
