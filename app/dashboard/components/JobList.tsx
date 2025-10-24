"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import JobCard from "./JobCard";
import Link from "next/link";

export default function JobList({ user }: { user: any }) {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Ambil data dari Supabase
  useEffect(() => {
    if (!user) return;
    const fetchApplications = async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setApplications(data || []);
      setLoading(false);
    };
    fetchApplications();
  }, [user]);

  // Hapus data
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus lamaran ini?")) return;
    const { error } = await supabase.from("applications").delete().eq("id", id);
    if (error) alert(error.message);
    else setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  // Filter dan pencarian (gunakan useMemo agar efisien)
  const filteredApplications = useMemo(() => {
    let filtered = applications;

    if (filterStatus !== "Semua") {
      filtered = filtered.filter(
        (app) => app.status?.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.position?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [applications, filterStatus, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Reset ke halaman 1 setiap kali filter/pencarian berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  return (
    <section id="job-list" className="scroll-mt-24">
      <h2 className="text-4xl font-extrabold my-6 text-center text-blue-900">
        Daftar Lamaran
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 mx-6">
        <input
          type="text"
          placeholder="Cari berdasarkan perusahaan atau posisi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border shadow-lg border-gray-200 rounded-md px-4 py-2 w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border shadow-lg border-gray-200 rounded-md px-4 py-2 w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="Semua">Semua Status</option>
          <option value="Dikirim">Dikirim</option>
          <option value="Interview">Interview</option>
          <option value="Pending">Pending</option>
          <option value="Diterima">Diterima</option>
          <option value="Ditolak">Ditolak</option>
        </select>
      </div>

      {/* Data Section */}
      {loading ? (
        <p>Memuat...</p>
      ) : filteredApplications.length === 0 ? (
        <p className="text-gray-500 italic text-center">
          Tidak ada data yang cocok.
        </p>
      ) : (
        <>
          <ul className="space-y-3">
            {currentItems.map((app) => (
              <JobCard key={app.id} app={app} onDelete={handleDelete} />
            ))}
          </ul>

          <Link
            href="/add-job"
            className="bg-yellow-400 text-blue-900 font-semibold px-6 py-3 rounded-lg shadow hover:bg-yellow-300 transition block w-max mx-auto mt-6"
          >
            + Tambah Lamaran Baru
          </Link>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 gap-2 flex-wrap ">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded border cursor-pointer ${
                  currentPage === page
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-blue-600 border-gray-300 hover:bg-blue-100"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
