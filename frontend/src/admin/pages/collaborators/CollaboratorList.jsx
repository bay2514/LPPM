/**
 * Halaman Pengelolaan Mitra & Kerjasama (Admin).
 * List mitra, filter kategori, search, modal tambah/ubah (nama, logo upload, kategori, website, status),
 * hapus dengan konfirmasi.
 */

import { useState, useEffect } from "react";
import { adminList, adminCreate, adminUpdate, adminDelete, adminUpload } from "@admin/api/index.js";
import { Button } from "@shared/components/ui/Button.jsx";
import { Input } from "@shared/components/forms/Input.jsx";
import { Select } from "@shared/components/forms/Select.jsx";
import { Modal, ConfirmDialog } from "@shared/components/ui/Modal.jsx";
import { Badge } from "@shared/components/ui/Badge.jsx";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Building2,
} from "@shared/components/ui/Icons.jsx";

const initialForm = {
  name: "",
  category: "Industri",
  website: "",
  logo: "",
  status: "active",
};

export default function AdminCollaborators() {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ currentPage: 1, lastPage: 1, total: 0 });
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchItems = async (page = 1) => {
    setLoading(true);
    try {
      const res = await adminList("collaborators", {
        search,
        category: categoryFilter,
        page,
        limit: 8,
      });
      setItems(res.data);
      setMeta(res.meta);
    } catch (err) {
      showToast(err.message || "Gagal memuat daftar mitra", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, categoryFilter]);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialForm);
    setFormErrors({});
    setIsDirty(false);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name || "",
      category: item.category || "Industri",
      website: item.website || "",
      logo: item.logo || "",
      status: item.status || "active",
    });
    setFormErrors({});
    setIsDirty(false);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    if (isDirty) {
      if (!window.confirm("Perubahan belum disimpan. Yakin ingin menutup form?")) return;
    }
    setIsFormOpen(false);
    setIsDirty(false);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
    if (formErrors[field]) setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await adminUpload(file);
      handleInputChange("logo", res.data.url);
      showToast("Logo berhasil diunggah");
    } catch (err) {
      if (err.errors?.file) setFormErrors((prev) => ({ ...prev, logo: err.errors.file[0] }));
      else showToast(err.message || "Gagal mengunggah logo", "error");
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Nama mitra / instansi wajib diisi";
    if (!formData.category) errors.category = "Kategori mitra wajib dipilih";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      if (editingId) {
        await adminUpdate("collaborators", editingId, formData);
        showToast("Data mitra berhasil diperbarui");
      } else {
        await adminCreate("collaborators", formData);
        showToast("Mitra baru berhasil ditambahkan");
      }
      setIsDirty(false);
      setIsFormOpen(false);
      fetchItems(meta.currentPage);
    } catch (err) {
      showToast(err.message || "Gagal menyimpan data mitra", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;
    setDeleting(true);
    try {
      await adminDelete("collaborators", deletingItem.id);
      showToast("Mitra berhasil dihapus");
      setIsDeleteOpen(false);
      setDeletingItem(null);
      fetchItems(meta.currentPage);
    } catch (err) {
      showToast(err.message || "Gagal menghapus mitra", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
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

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Kelola Mitra & Kerjasama</h2>
          <p className="text-sm text-gray-500">Total {meta.total} mitra terdaftar</p>
        </div>
        <Button onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-1.5" />
          Tambah Mitra Baru
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari mitra berdasarkan nama..."
            icon={<Search className="w-4 h-4 text-gray-400" />}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={[
              { value: "all", label: "Semua Kategori" },
              { value: "Industri", label: "Industri" },
              { value: "Pemerintah", label: "Pemerintah" },
              { value: "Perguruan Tinggi", label: "Perguruan Tinggi" },
              { value: "Internasional", label: "Internasional" },
            ]}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-semibold">
              <tr>
                <th className="px-6 py-3.5">Nama Mitra</th>
                <th className="px-6 py-3.5">Kategori</th>
                <th className="px-6 py-3.5">Website</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                    Memuat data...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                    Tidak ada mitra ditemukan.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {item.logo ? (
                          <img
                            src={item.logo}
                            alt=""
                            className="w-10 h-10 rounded-lg object-contain p-1 border bg-white flex-shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 flex-shrink-0">
                            <Building2 className="w-5 h-5" />
                          </div>
                        )}
                        <span className="font-semibold text-gray-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      <Badge variant="neutral">{item.category}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-600 hover:underline text-xs">
                      {item.website ? (
                        <a href={item.website} target="_blank" rel="noopener noreferrer">
                          {item.website}
                        </a>
                      ) : (
                        <span className="text-gray-400 font-normal">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={item.status === "inactive" ? "neutral" : "primary"}>
                        {item.status === "inactive" ? "Nonaktif" : "Aktif"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        title="Ubah Mitra"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setDeletingItem(item);
                          setIsDeleteOpen(true);
                        }}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        title="Hapus Mitra"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {meta.lastPage > 1 && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100 bg-gray-50/50">
            <span className="text-xs text-gray-500">
              Halaman {meta.currentPage} dari {meta.lastPage}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={meta.currentPage <= 1}
                onClick={() => fetchItems(meta.currentPage - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={meta.currentPage >= meta.lastPage}
                onClick={() => fetchItems(meta.currentPage + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingId ? "Ubah Data Mitra" : "Tambah Mitra Baru"}
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          {isDirty && (
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              Perubahan belum disimpan.
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Instansi / Mitra *</label>
            <Input
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Contoh: PT Teknologi Nusantara"
              error={formErrors.name}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Kategori *</label>
              <Select
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                options={[
                  { value: "Industri", label: "Industri" },
                  { value: "Pemerintah", label: "Pemerintah" },
                  { value: "Perguruan Tinggi", label: "Perguruan Tinggi" },
                  { value: "Internasional", label: "Internasional" },
                ]}
                error={formErrors.category}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
              <Select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                options={[
                  { value: "active", label: "Aktif" },
                  { value: "inactive", label: "Nonaktif" },
                ]}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Tautan Website (URL)</label>
            <Input
              value={formData.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              placeholder="https://mitra.co.id"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Logo Instansi (Maks. 2MB)</label>
            <div className="flex items-center gap-4">
              {formData.logo ? (
                <div className="relative w-20 h-20 rounded border overflow-hidden bg-white p-1 flex-shrink-0 flex items-center justify-center">
                  <img src={formData.logo} alt="Preview" className="max-w-full max-h-full object-contain" />
                  <button
                    type="button"
                    onClick={() => handleInputChange("logo", "")}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded p-0.5 text-xs"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 rounded border border-dashed border-gray-300 flex items-center justify-center text-gray-400 flex-shrink-0 bg-gray-50">
                  <ImageIcon className="w-6 h-6" />
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/svg+xml"
                  onChange={handleLogoUpload}
                  className="text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
                {formErrors.logo && <p className="text-xs text-red-500 mt-1">{formErrors.logo}</p>}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button variant="outline" onClick={handleCloseForm} disabled={saving}>
              Batal
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Menyimpan..." : "Simpan Mitra"}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Hapus Mitra"
        message={`Apakah Anda yakin ingin menghapus mitra "${deletingItem?.name}"?`}
        loading={deleting}
      />
    </div>
  );
}
