/**
 * Halaman Pengelolaan Berita & Pengumuman (Admin).
 * List table, search, pagination, status (draft/published),
 * form tambah & ubah (validasi, upload gambar preview, simple text editor),
 * hapus dengan modal konfirmasi, peringatan un-saved changes.
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
  category: "Penelitian",
  author: "LPPM",
  summary: "",
  content: "",
  date: new Date().toISOString().split("T")[0],
  status: "published",
  image: "",
};

export default function AdminBerita() {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ currentPage: 1, lastPage: 1, total: 0 });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  // Modal Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  // Modal Delete State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Feedback Notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchItems = async (page = 1) => {
    setLoading(true);
    try {
      const res = await adminList("news", {
        search,
        status: statusFilter,
        page,
        limit: 8,
      });
      setItems(res.data);
      setMeta(res.meta);
    } catch (err) {
      showToast(err.message || "Gagal memuat berita", "error");
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
      category: item.category || "Penelitian",
      author: item.author || "LPPM",
      summary: item.summary || item.excerpt || "",
      content: item.content || item.summary || item.excerpt || "",
      date: item.date || new Date().toISOString().split("T")[0],
      status: item.status || "published",
      image: item.image || "",
    });
    setFormErrors({});
    setIsDirty(false);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        "Perubahan belum disimpan. Yakin ingin menutup form?"
      );
      if (!confirmLeave) return;
    }
    setIsFormOpen(false);
    setIsDirty(false);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = await adminUpload(file);
      handleInputChange("image", res.data.url);
      showToast("Gambar berhasil diunggah");
    } catch (err) {
      if (err.errors?.file) {
        setFormErrors((prev) => ({ ...prev, image: err.errors.file[0] }));
      } else {
        showToast(err.message || "Gagal mengunggah gambar", "error");
      }
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Judul berita wajib diisi";
    if (!formData.summary.trim()) errors.summary = "Ringkasan wajib diisi";
    if (!formData.content.trim()) errors.content = "Konten lengkap berita wajib diisi";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      if (editingId) {
        await adminUpdate("news", editingId, formData);
        showToast("Berita berhasil diperbarui");
      } else {
        await adminCreate("news", formData);
        showToast("Berita berhasil ditambahkan");
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
      await adminDelete("news", deletingItem.id);
      showToast("Berita berhasil dihapus");
      setIsDeleteOpen(false);
      setDeletingItem(null);
      fetchItems(meta.currentPage);
    } catch (err) {
      showToast(err.message || "Gagal menghapus berita", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium text-sm transition-all ${
            toast.type === "error" ? "bg-red-600" : "bg-emerald-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy-950">Kelola Berita & Pengumuman</h2>
          <p className="text-sm text-ink-700">
            Total {meta.total} artikel terdaftar
          </p>
        </div>
        <Button onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-1.5" />
          Tambah Berita Baru
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari berita berdasarkan judul atau isi..."
            icon={<Search className="w-4 h-4 text-ink-500" />}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: "all", label: "Semua Status" },
              { value: "published", label: "Terbit (Published)" },
              { value: "draft", label: "Draf" },
            ]}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-gray-50 text-ink-700 font-semibold">
              <tr>
                <th className="px-6 py-3.5">Artikel</th>
                <th className="px-6 py-3.5">Kategori</th>
                <th className="px-6 py-3.5">Tanggal</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-ink-500">
                    Memuat data...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-ink-500">
                    Tidak ada berita ditemukan.
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
                          <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center text-ink-500 flex-shrink-0">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-navy-950 line-clamp-1">{item.title}</p>
                          <p className="text-xs text-ink-700 line-clamp-1 mt-0.5">
                            {item.summary || item.excerpt}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-ink-700">
                      <Badge variant="neutral">{item.category || "Umum"}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-ink-700 text-xs">
                      {item.date}
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
                        title="Ubah Berita"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setDeletingItem(item);
                          setIsDeleteOpen(true);
                        }}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        title="Hapus Berita"
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
            <span className="text-xs text-ink-700">
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

      {/* Form Modal (Add / Edit) */}
      <Modal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={editingId ? "Ubah Berita" : "Tambah Berita Baru"}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          {isDirty && (
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              Perubahan belum disimpan. Jangan tutup sebelum menekan tombol Simpan.
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">
              Judul Berita *
            </label>
            <Input
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Masukkan judul artikel berita..."
              error={formErrors.title}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">Kategori</label>
              <Select
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                options={[
                  { value: "Penelitian", label: "Penelitian" },
                  { value: "Pengabdian", label: "Pengabdian" },
                  { value: "Publikasi", label: "Publikasi" },
                  { value: "Pengumuman", label: "Pengumuman" },
                ]}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">Status</label>
              <Select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                options={[
                  { value: "published", label: "Terbit (Published)" },
                  { value: "draft", label: "Draf" },
                ]}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">Tanggal</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
              />
            </div>
          </div>

          {/* Upload Gambar dengan Pratinjau */}
          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">
              Gambar Sampul (Maks. 2MB, JPG/PNG)
            </label>
            <div className="flex items-center gap-4">
              {formData.image ? (
                <div className="relative w-24 h-16 rounded border overflow-hidden bg-gray-50 flex-shrink-0">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleInputChange("image", "")}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded p-0.5 text-xs"
                    title="Hapus gambar"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="w-24 h-16 rounded border border-dashed border-gray-300 flex items-center justify-center text-ink-500 flex-shrink-0 bg-gray-50">
                  <ImageIcon className="w-6 h-6" />
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageUpload}
                  className="text-xs text-ink-700 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
                {formErrors.image && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.image}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">
              Ringkasan Singkat (Excerpt) *
            </label>
            <Textarea
              rows={2}
              value={formData.summary}
              onChange={(e) => handleInputChange("summary", e.target.value)}
              placeholder="Ringkasan 1-2 kalimat untuk kartu berita..."
              error={formErrors.summary}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">
              Isi Lengkap Berita *
            </label>
            <Textarea
              rows={6}
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              placeholder="Tulis narasi lengkap berita di sini..."
              error={formErrors.content}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button variant="outline" onClick={handleCloseForm} disabled={saving}>
              Batal
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Menyimpan..." : "Simpan Berita"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Hapus Berita"
        message={`Apakah Anda yakin ingin menghapus berita "${deletingItem?.title}"?`}
        loading={deleting}
      />
    </div>
  );
}
