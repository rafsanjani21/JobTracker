"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Eye, EyeOff } from "lucide-react"; // ikon lucide

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirm) {
      setErrorMsg("Isi semua kolom terlebih dahulu.");
      return;
    }
    if (password !== confirm) {
      setErrorMsg("Password dan konfirmasi tidak sama.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setErrorMsg("Gagal memperbarui password: " + error.message);
    } else {
      alert("Password berhasil diubah! Silakan login kembali.");
      router.push("/login");
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-[url('/login.jpg')] bg-cover bg-center">
      <div className="w-full h-screen rounded-none md:w-3/4 md:h-3/4 md:rounded-2xl lg:rounded-none lg:w-1/2 lg:h-screen flex items-center justify-center bg-black/20 backdrop-blur-md p-8">
        <div className="p-8 max-w-md w-full rounded-xl">
          <h1 className="text-3xl font-bold text-center text-white">
            JobTracker
          </h1>
          <h1 className="text-2xl font-bold mb-6 text-center text-white">
            Reset Password
          </h1>

          <form onSubmit={handleResetPassword} className="space-y-4">
            {/* Password Baru */}
            <div className="mb-4">
  <label className="block mb-1 font-medium text-white">
    Password Baru
  </label>
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 outline-none text-white bg-transparent"
      placeholder="Masukkan password baru"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
      aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>
</div>


            {/* Konfirmasi Password */}
            <div className="mb-4">
              <label className="block mb-1 font-medium text-white">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 outline-none text-white bg-transparent"
                  placeholder="Ulangi password baru"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
                  aria-label={
                    showConfirm ? "Sembunyikan password" : "Tampilkan password"
                  }
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {errorMsg && (
              <p className="text-red-500 text-sm text-center">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full border border-white text-white py-2 rounded hover:bg-black/45 transition cursor-pointer"
            >
              {loading ? "Memproses..." : "Ubah Password"}
            </button>

            <p
              className="text-center mt-4 text-sm text-blue-400 hover:underline cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Kembali ke halaman login
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
