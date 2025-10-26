"use client";

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  errorMsg,
  loading,
  handleLogin,
  handleGoogleLogin,
}: {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  errorMsg: string;
  loading: boolean;
  handleLogin: (e: React.FormEvent) => Promise<void>;
  handleGoogleLogin: () => Promise<void>;
}) {
  return (
    <div className="p-8 max-w-md w-full rounded-xl">
      <h1 className="text-3xl font-bold text-center text-white">JobTracker</h1>
      <h1 className="text-2xl font-bold mb-6 text-center text-white">Login</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-white bg-transparent"
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
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-white bg-transparent"
            placeholder="Masukkan password"
          />
        </div>

        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full border border-white text-white py-2 rounded hover:bg-black/45 transition cursor-pointer"
        >
          {loading ? "Masuk..." : "Masuk"}
        </button>
      </form>

      {/* Garis Pemisah */}
      <div className="flex items-center my-6">
        <hr className="grow border-gray-300" />
        <span className="px-2 text-sm text-white">atau</span>
        <hr className="grow border-gray-300" />
      </div>

      {/* Login dengan Google */}
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
        Belum punya akun?{" "}
        <a href="/register" className="text-blue-400 hover:underline">
          Daftar di sini
        </a>
      </p>
    </div>
  );
}
