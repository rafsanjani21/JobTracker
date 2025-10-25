"use client";

import { useLogin } from "../hooks/useLogin";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    errorMsg,
    loading,
    handleLogin,
    handleGoogleLogin,
  } = useLogin();

  return (
    <main className="min-h-screen flex bg-[url('/login.jpg')] bg-cover bg-center">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-black/20 backdrop-blur-md p-8">
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          errorMsg={errorMsg}
          loading={loading}
          handleLogin={handleLogin}
          handleGoogleLogin={handleGoogleLogin}
        />
      </div>
    </main>
  );
}
