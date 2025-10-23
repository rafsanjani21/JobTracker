'use client'

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import JobList from "./components/JobList";
import Footer from "./components/Footer";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getSession:", error.message);
        return;
      }

      if (!data.session) router.push("/login");
      else setUser(data.session.user);
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) router.push("/login");
        else setUser(session.user);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <>
      <Navbar user={user} />
      <main className="w-full relative">
        <Hero />
        <JobList user={user} />
        <Footer />
      </main>
      
    </>
  );
}
