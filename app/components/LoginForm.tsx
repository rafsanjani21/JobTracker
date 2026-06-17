"use client";

import { BriefcaseBusiness, AlertCircle } from "lucide-react";

export default function LoginForm({
  errorMsg,
  loading,
  handleGoogleLogin,
}: {
  errorMsg?: string;
  loading: boolean;
  handleGoogleLogin: () => Promise<void>;
}) {
  return (
    <div className="relative w-full max-w-md mx-auto px-4 sm:px-0">
      {/* Efek Glow di belakang card (Aksen Visual) */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[2rem] blur-xl opacity-20"></div>

      {/* Card Utama */}
      <div className="relative w-full p-6 sm:p-10 rounded-[2rem] bg-[#0A0A0A]/60 backdrop-blur-2xl border border-white/10 shadow-2xl text-white">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-5 border border-white/10 shadow-inner">
            <BriefcaseBusiness className="w-8 h-8 text-yellow-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-br from-white via-blue-100 to-blue-400 bg-clip-text text-transparent">
            JobTracker
          </h1>
          <p className="text-gray-400 mt-3 text-sm sm:text-base px-2">
            Kelola proses lamaran kerjamu dengan lebih teratur.
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">{errorMsg}</p>
          </div>
        )}

        {/* LOGIN GOOGLE BUTTON */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="group relative w-full bg-white hover:bg-gray-50 text-gray-900 py-3.5 px-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 font-semibold cursor-pointer active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
              <span>Membuka Akses...</span>
            </div>
          ) : (
            <>
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5 transition-transform group-hover:scale-110"
              />
              <span className="text-[15px]">Lanjutkan dengan Google</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}