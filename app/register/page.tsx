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
    <main className="min-h-screen justify-center items-center lg:justify-start flex bg-[url('/login.jpg')] bg-cover bg-center">
      <div className="w-full h-screen rounded-none md:w-3/4 md:h-3/4 md:rounded-2xl lg:rounded-none lg:w-1/2 lg:h-screen flex items-center justify-center bg-black/20 backdrop-blur-md p-8">
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
    </main>
  );
}
