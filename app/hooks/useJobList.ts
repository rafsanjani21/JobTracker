import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";

export function useJobList(user: any) {
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

  // Filter dan pencarian
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

  // Reset halaman saat filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  return {
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
  };
}
