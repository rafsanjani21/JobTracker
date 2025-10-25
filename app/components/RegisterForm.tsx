"use client";

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
  return (
    <div className="p-8 max-w-md w-full rounded-xl">
      <h1 className="text-3xl font-bold text-center text-white">Job Tracker</h1>
      <h1 className="text-2xl font-bold mb-6 text-center text-white">Daftar Akun</h1>

      <form onSubmit={handleRegister} className="space-y-4">
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

        <div>
          <label className="block mb-1 font-medium text-white">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-white outline-none text-white bg-transparent"
            placeholder="Minimal 6 karakter"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-white">Konfirmasi Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-white outline-none text-white bg-transparent"
            placeholder="Ulangi password"
          />
        </div>

        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        {successMsg && <p className="text-green-400 text-sm">{successMsg}</p>}

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
