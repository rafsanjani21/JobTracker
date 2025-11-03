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
    handleForgotPassword,
  } = useLogin();

  return (
    <main className="min-h-screen justify-center items-center lg:justify-start flex bg-[url('/login.jpg')] bg-cover bg-center">
      <div className="w-full h-screen rounded-none md:w-3/4 md:h-3/4 md:rounded-2xl lg:rounded-none lg:w-1/2 lg:h-screen flex items-center justify-center bg-black/20 backdrop-blur-md p-8">
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          errorMsg={errorMsg}
          loading={loading}
          handleLogin={handleLogin}
          handleGoogleLogin={handleGoogleLogin}
          handleForgotPassword={handleForgotPassword}
        />
      </div>
    </main>
  );
}
