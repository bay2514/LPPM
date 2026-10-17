/**
 * Halaman Pengelolaan Kegiatan & Agenda (Admin).
 * Struktur mirip AdminBerita: list, search, pagination, status,
 * form dengan validasi, upload gambar, dan hapus dengan konfirmasi.
 */

import { useState, useEffect } from "react";
import { adminList, adminCreate, adminUpdate, adminDelete, adminUpload } from "@admin/api/index.js";
import { Button } from "@shared/components/ui/Button.jsx";
import { Input } from "@shared/components/forms/Input.jsx";
import { Textarea } from "@shared/components/forms/Textarea.jsx";
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
} from "@shared/components/ui/Icons.jsx";

const initialForm = {
  title: "",
  date: "",
  time: "",
  location: "",
  description: "",
  speaker: "",
  status: "published",
  image: "",
};

export default function AdminKegiatan() {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ currentPage: 1, lastPage: 1, total: 0 });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
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
      const res = await adminList("events", { search, status: statusFilter, page, limit: 8 });
      setItems(res.data);
      setMeta(res.meta);
    } catch (err) {
      showToast(err.message || "Gagal memuat kegiatan", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, statusFilter]);

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
      title: item.title || "",
      date: item.date || "",
      time: item.time || "",
      location: item.location || "",
      description: item.description || "",
      speaker: item.speaker || "",
      status: item.status || "published",
      image: item.image || "",
    });
    setFormErrors({});
    setIsDirty(false);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    if (isDirty) {
      const confirmLeave = window.confirm("Perubahan belum disimpan. Yakin ingin menutup form?");
      if (!confirmLeave) return;
    }
    setIsFormOpen(false);
    setIsDirty(false);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
    if (formErrors[field]) setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await adminUpload(file);
      handleInputChange("image", res.data.url);
      showToast("Gambar berhasil diunggah");
    } catch (err) {
      if (err.errors?.file) setFormErrors((prev) => ({ ...prev, image: err.errors.file[0] }));
      else showToast(err.message || "Gagal mengunggah gambar", "error");
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Judul kegiatan wajib diisi";
    if (!formData.date.trim()) errors.date = "Tanggal wajib diisi";
    if (!formData.location.trim()) errors.location = "Lokasi wajib diisi";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      if (editingId) {
        await adminUpdate("events", editingId, formData);
        showToast("Kegiatan berhasil diperbarui");
      } else {
        await adminCreate("events", formData);
        showToast("Kegiatan berhasil ditambahkan");
      }
      setIsDirty(false);
      setIsFormOpen(false);
      fetchItems(meta.currentPage);
    } catch (err) {
      showToast(err.message || "Gagal menyimpan data", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;
    setDeleting(true);
    try {
      await adminDelete("events", deletingItem.id);
      showToast("Kegiatan berhasil dihapus");
      setIsDeleteOpen(false);
      setDeletingItem(null);
      fetchItems(meta.currentPage);
    } catch (err) {
      showToast(err.message || "Gagal menghapus kegiatan", "error");
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
          <h2 className="text-xl font-bold text-gray-900">Kelola Kegiatan & Agenda</h2>
          <p className="text-sm text-gray-500">Total {meta.total} kegiatan terdaftar</p>
        </div>
        <Button onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-1.5" />
          Tambah Kegiatan
        </Button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari kegiatan..."
            icon={<Search className="w-4 h-4 text-gray-400" />}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: "all", label: "Semua Status" },
              { value: "published", label: "Terbit" },
              { value: "draft", label: "Draf" },
            ]}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-semibold">
              <tr>
                <th className="px-6 py-3.5">Kegiatan</th>
                <th className="px-6 py-3.5">Tanggal & Waktu</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                    Memuat data...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                    Tidak ada kegiatan ditemukan.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt=""
                            className="w-12 h-12 rounded object-cover flex-shrink-0 bg-gray-100"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center text-gray-400 flex-shrink-0">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 line-clamp-1">{item.title}</p>
                          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{item.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-xs">
                      {item.date} {item.time ? `| ${item.time}` : ""}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={item.status === "draft" ? "neutral" : "primary"}>
                        {item.status === "draft" ? "Draf" : "Terbit"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        title="Ubah"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setDeletingItem(item);
                          setIsDeleteOpen(true);
                        }}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        title="Hapus"
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

        {/* Pagination */}
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

      {/* Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingId ? "Ubah Kegiatan" : "Tambah Kegiatan"}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          {isDirty && (
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              Perubahan belum disimpan.
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Judul Kegiatan *</label>
            <Input
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Judul kegiatan"
              error={formErrors.title}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Tanggal *</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                error={formErrors.date}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Waktu</label>
              <Input
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Lokasi *</label>
            <Input
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="Contoh: Auditorium Rektorat, Lt. 3"
              error={formErrors.location}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Narasumber / Pembicara</label>
            <Input
              value={formData.speaker}
              onChange={(e) => handleInputChange("speaker", e.target.value)}
              placeholder="Nama narasumber (opsional)"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
            <Select
              value={formData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              options={[
                { value: "published", label: "Terbit" },
                { value: "draft", label: "Draf" },
              ]}
            />
          </div>

          {/* Gambar */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Poster (Maks. 2MB, JPG/PNG)</label>
            <div className="flex items-center gap-4">
              {formData.image ? (
                <div className="relative w-24 h-16 rounded border overflow-hidden bg-gray-50 flex-shrink-0">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleInputChange("image", "")}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded p-0.5 text-xs"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="w-24 h-16 rounded border border-dashed border-gray-300 flex items-center justify-center text-gray-400 flex-shrink-0 bg-gray-50">
                  <ImageIcon className="w-6 h-6" />
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageUpload}
                  className="text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
                {formErrors.image && <p className="text-xs text-red-500 mt-1">{formErrors.image}</p>}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Deskripsi</label>
            <Textarea
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Deskripsi kegiatan..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button variant="outline" onClick={handleCloseForm} disabled={saving}>
              Batal
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Menyimpan..." : "Simpan Kegiatan"}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Hapus Kegiatan"
        message={`Apakah Anda yakin ingin menghapus kegiatan "${deletingItem?.title}"?`}
        loading={deleting}
      />
    </div>
  );
}
