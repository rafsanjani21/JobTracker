"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Navbar({ user }: { user: any }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (open && navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      {/* Background blur overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />
      )}

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md border-gray-200" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-2">
            <img src="/logoo.png" alt="Logo" className="md:h-10 h-8" />
            <Link
              href="/dashboard"
              className="md:text-2xl text-xl font-bold text-yellow-400 justify-self-start"
            >
              JobTracker
            </Link>
          </div>

          {/* Hamburger button */}
          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden flex flex-col gap-2 z-50 relative"
          >
            <span
              className={`block w-8 h-1 bg-yellow-400 transition-transform duration-300 ${
                open ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-8 h-1 bg-yellow-400 transition-transform duration-300 ${
                open ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>

          {/* Desktop menu */}
          <div className="hidden sm:flex gap-6 items-center">
            <button
              onClick={() =>
                document.getElementById("hero")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="text-yellow-400 hover:text-[#92C127] transition font-bold cursor-pointer"
            >
              Home
            </button>

            <button
              onClick={() =>
                document.getElementById("job-list")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="text-yellow-400 hover:text-[#92C127] transition font-bold cursor-pointer"
            >
              Daftar Lamaran
            </button>

            {user && <LogoutButton />}
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`sm:hidden bg-white shadow-md transition-all duration-300 overflow-hidden ${
            open ? "max-h-60" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 px-6 pb-4 pt-2">
            <button
              onClick={() => {
                document
                  .getElementById("hero")
                  ?.scrollIntoView({ behavior: "smooth" });
                setOpen(false);
              }}
              className="text-yellow-400 hover:text-[#92C127] transition font-bold text-left"
            >
              Home
            </button>

            <button
              onClick={() => {
                document
                  .getElementById("job-list")
                  ?.scrollIntoView({ behavior: "smooth" });
                setOpen(false);
              }}
              className="text-yellow-400 hover:text-[#92C127] transition font-bold text-left"
            >
              Daftar Lamaran
            </button>

            {user && <LogoutButton />}
          </div>
        </div>
      </nav>
    </>
  );
}
