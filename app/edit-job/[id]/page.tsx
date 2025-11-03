"use client";

import { useEditJob } from "../../hooks/useEditJob";
import EditJobForm from "../../components/EditJobForm";

export default function EditJobPage() {
  const { formData, handleChange, handleSubmit, loading, saving } = useEditJob();

  if (loading)
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-700 via-blue-600 to-blue-500 text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-white/40 border-t-yellow-400 rounded-full animate-spin"></div>
          <p className="text-lg font-semibold tracking-wide animate-pulse">
            Memuat data lamaran...
          </p>
        </div>
      </main>
    );

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-700 via-blue-600 to-blue-500 p-6">
      <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full border border-white/20">
        <h1 className="md:text-3xl text-2xl font-extrabold mb-6 text-center text-blue-700">
          Edit Lamaran
        </h1>
        <EditJobForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          saving={saving}
        />
      </div>
    </main>
  );
}
