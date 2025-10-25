"use client";

import Link from "next/link";
import JobCard from "./JobCard";
import { useJobList } from "../../hooks/useJobList";

export default function JobList({ user }: { user: any }) {
  const {
    loading,
    currentItems,
    filteredApplications,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    currentPage,
    totalPages,
    handlePageChange,
    handleDelete,
  } = useJobList(user);

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
          <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
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
