import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export function useLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Login Email dan Password
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  // Login Google
  const handleGoogleLogin = async () => {
    setErrorMsg("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) {
      setErrorMsg("Gagal login dengan Google: " + error.message);
    }
  };

  // Lupa Password
  const handleForgotPassword = async () => {
  if (!email) {
    setErrorMsg("Masukkan email terlebih dahulu.");
    return;
  }

  setLoading(true);
  setErrorMsg("");

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  setLoading(false);

  if (error) {
    setErrorMsg("Gagal mengirim email reset: " + error.message);
  } else {
    alert("Link reset password telah dikirim ke email kamu!");
  }
};

  return {
    email,
    setEmail,
    password,
    setPassword,
    errorMsg,
    loading,
    handleLogin,
    handleGoogleLogin,
    handleForgotPassword,
  };

}
