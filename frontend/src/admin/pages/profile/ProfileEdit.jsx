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
      <div className="bg-white p-8 rounded-xl border border-gray-200 text-center text-gray-400">
        Memuat data profil...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
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
          <h2 className="text-xl font-bold text-gray-900">Kelola Profil Lembaga & Kontak</h2>
          <p className="text-sm text-gray-500">
            Perbarui deskripsi, visi-misi, serta informasi kontak yang tampil di website publik
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {isDirty && (
          <div className="p-3 rounded-lg bg-amber-50 text-amber-800 text-xs flex items-center gap-2 border border-amber-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            Anda memiliki perubahan yang belum disimpan. Tekan tombol Simpan Perubahan di bawah.
          </div>
        )}

        {/* Informasi Utama */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900 border-b pb-2">Informasi Umum</h3>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Nama Lembaga / Unit *
            </label>
            <Input
              value={profile.name}
              onChange={(e) => handleChange("name", e.target.value)}
              error={errors.name}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Deskripsi Singkat LPPM *
            </label>
            <Textarea
              rows={4}
              value={profile.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Jelaskan peran dan fungsi LPPM..."
              error={errors.description}
            />
          </div>
        </div>

        {/* Visi & Misi */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900 border-b pb-2">Visi & Misi</h3>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Visi LPPM *
            </label>
            <Textarea
              rows={3}
              value={profile.vision}
              onChange={(e) => handleChange("vision", e.target.value)}
              placeholder="Visi utama..."
              error={errors.vision}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Misi LPPM (Satu poin per baris)
            </label>
            <Textarea
              rows={5}
              value={missionText}
              onChange={(e) => handleMissionChange(e.target.value)}
              placeholder="1. Mendorong penelitian unggulan...&#10;2. Meningkatkan pengabdian..."
            />
          </div>
        </div>

        {/* Informasi Kontak & Alamat */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900 border-b pb-2">Kontak & Lokasi</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Resmi *
              </label>
              <Input
                type="email"
                value={profile.email}
                onChange={(e) => handleChange("email", e.target.value)}
                error={errors.email}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Nomor Telepon / WhatsApp
              </label>
              <Input
                value={profile.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Alamat Lengkap</label>
            <Textarea
              rows={3}
              value={profile.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Alamat kantor LPPM..."
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end gap-3 pt-2">
          <Button type="submit" disabled={saving || !isDirty}>
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </div>
  );
}
