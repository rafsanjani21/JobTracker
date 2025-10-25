"use client";

import AddJobForm from "../components/AddJobForm";
import { useAddJob } from "../hooks/useAddJob";

export default function AddJobPage() {
  const { formData, handleChange, handleSubmit, loading } = useAddJob();

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-700 via-blue-600 to-blue-500 p-6">
      <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full border border-white/20">
        <h1 className="text-3xl font-extrabold mb-2 text-center text-blue-700">
          Tambah Lamaran
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Catat lamaran baru kamu dengan mudah ✨
        </p>
        <AddJobForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </main>
  );
}
