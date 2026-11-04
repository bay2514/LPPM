/**
 * Halaman Pengelolaan Profil Lembaga & Kontak (Admin).
 * Form edit Visi & Misi, Deskripsi LPPM, Struktur Organisasi, Kontak & Alamat.
 * Menyimpan data ke store/backend endpoint `profile`.
 */

import { useState, useEffect } from "react";
import { adminList, adminUpdate } from "@admin/api/index.js";
import { Button } from "@shared/components/ui/Button.jsx";
import { Input } from "@shared/components/forms/Input.jsx";
import { Textarea } from "@shared/components/forms/Textarea.jsx";
import { AlertCircle } from "@shared/components/ui/Icons.jsx";

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    name: "",
    description: "",
    vision: "",
    mission: [],
    email: "",
    phone: "",
    address: "",
  });
  const [missionText, setMissionText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await adminList("profile");
        const data = res.data || {};
        setProfile({
          name: data.name || "LPPM Universitas Tiga Serangkai",
          description: data.description || "",
          vision: data.vision || "",
          mission: Array.isArray(data.mission) ? data.mission : [],
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
        setMissionText(
          Array.isArray(data.mission) ? data.mission.join("\n") : ""
        );
      } catch (err) {
        showToast("Gagal memuat data profil: " + err.message, "error");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleMissionChange = (value) => {
    setMissionText(value);
    setIsDirty(true);
  };

  const validate = () => {
    const errs = {};
    if (!profile.name.trim()) errs.name = "Nama lembaga wajib diisi";
    if (!profile.description.trim()) errs.description = "Deskripsi lembaga wajib diisi";
    if (!profile.vision.trim()) errs.vision = "Visi wajib diisi";
    if (!profile.email.trim()) errs.email = "Email kontak wajib diisi";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      const parsedMission = missionText
        .split("\n")
        .map((m) => m.trim())
        .filter((m) => m.length > 0);

      const payload = {
        ...profile,
        mission: parsedMission,
      };

      await adminUpdate("profile", 1, payload);
      showToast("Profil lembaga berhasil disimpan");
      setIsDirty(false);
    } catch (err) {
      showToast("Gagal menyimpan profil: " + err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-xl border border-gray-200 text-center text-ink-500">
        Memuat data profil...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium text-sm transition-all ${
            toast.type === "error" ? "bg-red-600" : "bg-emerald-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-navy-950">Kelola Profil Lembaga</h2>
          <p className="text-sm text-ink-700">
            Perbarui data profil lembaga. Perubahan akan langsung terlihat di pratinjau samping.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          {isDirty && (
            <div className="p-3 rounded-xl bg-amber-50 text-amber-800 text-xs flex items-center gap-2 border border-amber-200">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              Ada perubahan yang belum disimpan.
            </div>
          )}

          {/* ...Form fields... (tetap sama) */}
          <div className="bg-surface p-6 rounded-2xl border border-line shadow-sm space-y-4">
            <h3 className="text-base font-bold text-navy-950 border-b pb-2">Informasi Umum</h3>
            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">Nama Lembaga *</label>
              <Input value={profile.name} onChange={(e) => handleChange("name", e.target.value)} error={errors.name} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">Deskripsi *</label>
              <Textarea rows={4} value={profile.description} onChange={(e) => handleChange("description", e.target.value)} error={errors.description} />
            </div>
          </div>
          
          <div className="bg-surface p-6 rounded-2xl border border-line shadow-sm space-y-4">
            <h3 className="text-base font-bold text-navy-950 border-b pb-2">Kontak & Lokasi</h3>
            <div className="grid grid-cols-2 gap-4">
                <Input label="Email" value={profile.email} onChange={(e) => handleChange("email", e.target.value)} error={errors.email} />
                <Input label="Telepon" value={profile.phone} onChange={(e) => handleChange("phone", e.target.value)} />
            </div>
          </div>

          <Button type="submit" disabled={saving || !isDirty} className="w-full">
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </form>

        {/* Live Preview */}
        <div className="lg:col-span-5">
           <div className="sticky top-24 bg-navy-950 p-8 rounded-2xl text-white shadow-xl">
              <h4 className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-6">Pratinjau Publik</h4>
              <h2 className="text-2xl font-bold mb-4">{profile.name || "Nama Lembaga"}</h2>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">{profile.description || "Deskripsi akan muncul di sini..."}</p>
              <div className="space-y-3 text-xs border-t border-navy-800 pt-6">
                <p>Email: {profile.email || "-"}</p>
                <p>Telp: {profile.phone || "-"}</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
