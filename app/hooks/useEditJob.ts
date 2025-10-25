import Swal from "sweetalert2"
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export function useEditJob() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [formData, setFormData] = useState({
    company_name: "",
    position: "",
    platform: "",
    status: "",
    applied_date: "",
    notes: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal memuat data",
          text: error.message,
        })
        router.push("/dashboard")
      } else {
        setFormData(data)
      }
      setLoading(false)
    }

    if (id) fetchData()
  }, [id, router])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const { error } = await supabase
      .from("applications")
      .update({
        company_name: formData.company_name,
        position: formData.position,
        platform: formData.platform,
        status: formData.status,
        applied_date: formData.applied_date,
        notes: formData.notes,
      })
      .eq("id", id)

    setSaving(false)

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal memperbarui",
        text: error.message,
        confirmButtonColor: "#dc2626"
      })
    } else {
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Lamaran berhasil diperbarui.",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        router.push("/dashboard")
      })
    }
  }

  return {
    formData,
    handleChange,
    handleSubmit,
    loading,
    saving,
  }
}
