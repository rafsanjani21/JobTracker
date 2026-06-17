"use client";

import { useLogin } from "../hooks/useLogin";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const { errorMsg, loading, handleGoogleLogin } = useLogin();

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center bg-[url('/login.jpg')] bg-cover bg-center bg-no-repeat">
      
      {/* OVERLAY PREMIUM: Warna gelap merata dengan efek blur halus pada background */}
      <div className="absolute inset-0 bg-[#050505]/50 backdrop-blur-[4px] z-0"></div>

      {/* CONTAINER FORM: Terpusat sempurna tanpa elemen yang mendistraksi */}
      <div className="relative z-10 flex w-full justify-center px-4">
        <LoginForm
          errorMsg={errorMsg}
          loading={loading}
          handleGoogleLogin={handleGoogleLogin}
        />
      </div>

    </main>
  );
}