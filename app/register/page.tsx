"use client";

import { useRegister } from "../hooks/useRegister";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  const {
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
  } = useRegister();

  return (
    <main className="min-h-screen flex bg-[url('/login.jpg')] bg-cover bg-center">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-black/20 backdrop-blur-md p-8">
        <RegisterForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          errorMsg={errorMsg}
          successMsg={successMsg}
          loading={loading}
          handleRegister={handleRegister}
        />
      </div>

      <div className="hidden md:block md:w-1/2"></div>
    </main>
  );
}
