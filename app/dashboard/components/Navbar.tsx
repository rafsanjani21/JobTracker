"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Navbar({ user }: { user: any }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md border-gray-200" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2">
          <img src="/logoo.png" alt="Logo" className="h-10" />
          <Link
            href="/dashboard"
            className="text-2xl font-bold text-yellow-400 justify-self-start"
          >
            JobTracker
          </Link>
        </div>

        <div className="flex gap-6 items-center">
          <button
            onClick={() => {
              const section = document.getElementById("hero");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="text-yellow-400 hover:text-[#92C127] transition font-bold cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => {
              const section = document.getElementById("job-list");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="text-yellow-400 hover:text-[#92C127] transition font-bold cursor-pointer"
          >
            Daftar Lamaran
          </button>
          {user && <LogoutButton />}
        </div>
      </div>
    </nav>
  );
}
