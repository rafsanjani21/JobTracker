"use client";

import React from "react";

export default function EditJobForm({
  formData,
  handleChange,
  handleSubmit,
  saving,
}: {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  saving: boolean;
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium text-blue-900">
          Nama Perusahaan
        </label>
        <input
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-blue-900">Posisi</label>
        <input
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-blue-900">
          Platform Pendaftaran
        </label>
        <input
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-blue-900">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option value="Dikirim">Dikirim</option>
          <option value="Interview">Interview</option>
          <option value="Diterima">Diterima</option>
          <option value="Ditolak">Ditolak</option>
          <option value="Test">Test</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium text-blue-900">
          Tanggal Lamar
        </label>
        <input
          type="date"
          name="applied_date"
          value={formData.applied_date || ""}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-blue-900">Catatan</label>
        <textarea
          name="notes"
          value={formData.notes || ""}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
          rows={3}
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={saving}
        className={`w-full font-semibold px-4 py-3 rounded-xl transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
          saving
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-yellow-400 text-blue-900 hover:bg-yellow-300"
        }`}
      >
        {saving ? "Menyimpan..." : "Simpan Perubahan"}
      </button>
    </form>
  );
}
