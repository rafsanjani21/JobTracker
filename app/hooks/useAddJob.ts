import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"

export function useAddJob() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    company_name: "",
    position: "",
    platform: "",
    status: "Dikirim",
    applied_date: "",
    notes: "",
  })

  // Cek user login
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        Swal.fire({
          icon: "warning",
          title: "Belum login",
          text: "Silakan login terlebih dahulu.",
          confirmButtonText: "Login",
          confirmButtonColor: "#2563eb", // biru Tailwind
        }).then(() => {
          router.push("/login")
        })
      } else {
        setUser(data.user)
      }
    }
    checkUser()
  }, [router])

  // Handle input
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Submit ke Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    const { error } = await supabase.from("applications").insert([
      {
        user_id: user.id,
        company_name: formData.company_name,
        position: formData.position,
        platform: formData.platform,
        status: formData.status,
        applied_date:
          formData.applied_date || new Date().toISOString().split("T")[0],
        notes: formData.notes,
      },
    ])

    setLoading(false)

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal menyimpan",
        text: error.message,
        confirmButtonColor: "#dc2626",
      })
    } else {
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Lamaran berhasil ditambahkan.",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        router.push("/dashboard")
      })
    }
  }

  return { formData, handleChange, handleSubmit, loading }
}
