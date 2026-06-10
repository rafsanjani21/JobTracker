import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error(error);
        navigate("/login");
        return;
      }

      if (data.session) {
        navigate("/dashboard");
      }
    };

    getSession();
  }, [navigate]);

  return <div>Loading...</div>;
}