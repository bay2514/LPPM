/**
 * Halaman Pengelolaan Dokumen & SOP (Admin).
 * List dokumen, search, filter kategori/tahun, pagination,
 * form tambah/ubah (validasi, upload file PDF/IMG, pratinjau),
 * hapus dengan konfirmasi.
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
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  FileText as FileIcon,
  Download,
} from "@shared/components/ui/Icons.jsx";

const initialForm = {
  title: "",
  category: "SOP",
  year: new Date().getFullYear().toString(),
  file: null,
  description: "",
  status: "published",
};

export default function AdminDokumen() {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ currentPage: 1, lastPage: 1, total: 0 });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("Semua");
  const [yearFilter, setYearFilter] = useState("Semua Tahun");
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
      const res = await adminList("documents", {
        search,
        status: statusFilter,
        page,
        limit: 8,
      });
      setItems(res.data);
      setMeta(res.meta);
    } catch (err) {
      showToast(err.message || "Gagal memuat dokumen", "error");
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
    setFormData({ ...initialForm, year: new Date().getFullYear().toString() });
    setFormErrors({});
    setIsDirty(false);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      title: item.title || "",
      category: item.category || "SOP",
      year: item.year ? String(item.year) : new Date().getFullYear().toString(),
      file: null,
      description: item.description || "",
      status: item.status || "published",
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

  const handleFileUpload = (file) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setFormErrors((prev) => ({ ...prev, file: "Ukuran file tidak boleh lebih dari 2MB" }));
      return;
    }
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setFormErrors((prev) => ({ ...prev, file: "Format file harus PDF, JPG, PNG, atau WEBP" }));
      return;
    }
    const url = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, file, fileName: file.name, filePreview: url }));
    setFormErrors((prev) => ({ ...prev, file: "" }));
  };

  const validate = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Judul dokumen wajib diisi";
    if (!formData.category) errors.category = "Kategori wajib dipilih";
    if (!formData.year) errors.year = "Tahun wajib diisi";
    if (!editingId && !formData.file) errors.file = "File dokumen wajib diunggah";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      const payload = {
        ...formData,
        file: formData.file instanceof File ? null : formData.file,
        fileName: formData.file instanceof File ? formData.fileName : null,
        filePreview: null,
      };
      if (editingId) {
        await adminUpdate("documents", editingId, payload);
        showToast("Dokumen berhasil diperbarui");
      } else {
        await adminCreate("documents", payload);
        showToast("Dokumen berhasil ditambahkan");
      }
      setIsDirty(false);
      setIsFormOpen(false);
      fetchItems(meta.currentPage);
    } catch (err) {
      showToast(err.message || "Gagal menyimpan dokumen", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;
    setDeleting(true);
    try {
      await adminDelete("documents", deletingItem.id);
      showToast("Dokumen berhasil dihapus");
      setIsDeleteOpen(false);
      setDeletingItem(null);
      fetchItems(meta.currentPage);
    } catch (err) {
      showToast(err.message || "Gagal menghapus dokumen", "error");
    } finally {
      setDeleting(false);
    }
  };

  const filteredCategories = ["SOP", "Laporan", "Buku Panduan", "Kebijakan", "Peraturan"];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => (currentYear - i).toString());

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
          <h2 className="text-xl font-bold text-gray-900">Kelola Dokumen & SOP</h2>
          <p className="text-sm text-gray-500">Total {meta.total} dokumen terdaftar</p>
        </div>
        <Button onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-1.5" />
          Upload Dokumen
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari dokumen..."
            icon={<Search className="w-4 h-4 text-gray-400" />}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="w-full sm:w-40">
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
          <div className="w-full sm:w-36">
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              options={[{ value: "Semua", label: "Semua Kategori" }, ...filteredCategories.map((c) => ({ value: c, label: c }))]}
            />
          </div>
          <div className="w-full sm:w-32">
            <Select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              options={[{ value: "Semua Tahun", label: "Semua Tahun" }, ...years.map((y) => ({ value: y, label: y }))]}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-semibold">
              <tr>
                <th className="px-6 py-3.5">Dokumen</th>
                <th className="px-6 py-3.5">Kategori</th>
                <th className="px-6 py-3.5">Tahun</th>
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
                    Tidak ada dokumen ditemukan.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                          <FileIcon className="w-6 h-6" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 line-clamp-1">{item.title}</p>
                          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      <Badge variant="neutral">{item.category || "Umum"}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-xs">
                      {item.year || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={item.status === "draft" ? "neutral" : "primary"}>
                        {item.status === "draft" ? "Draf" : "Terbit"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <a
                        href={item.file || "#"}
                        download
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        title="Unduh"
                      >
                        <Download className="w-4 h-4" />
                      </a>
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
        title={editingId ? "Ubah Dokumen" : "Upload Dokumen Baru"}
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          {isDirty && (
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              Perubahan belum disimpan.
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Judul Dokumen *</label>
            <Input
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Nama dokumen / SOP..."
              error={formErrors.title}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Kategori *</label>
              <Select
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                options={[
                  { value: "SOP", label: "SOP" },
                  { value: "Laporan", label: "Laporan" },
                  { value: "Buku Panduan", label: "Buku Panduan" },
                  { value: "Kebijakan", label: "Kebijakan" },
                  { value: "Peraturan", label: "Peraturan" },
                ]}
                error={formErrors.category}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Tahun *</label>
              <Input
                type="number"
                value={formData.year}
                onChange={(e) => handleInputChange("year", e.target.value)}
                error={formErrors.year}
              />
            </div>
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

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Upload File Dokumen (PDF, JPG, PNG, WEBP - Maks. 2MB) *
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors">
              <div className="space-y-1 text-center">
                {formData.file ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded border border-green-200">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileIcon className="w-6 h-6 text-green-600 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-green-900 truncate">
                          {formData.file instanceof File ? formData.file.name : formData.fileName}
                        </p>
                        <p className="text-xs text-green-600">
                          {formData.file instanceof File
                            ? `${(formData.file.size / 1024).toFixed(1)} KB`
                            : "File sudah ada"}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          file: null,
                          fileName: null,
                          filePreview: null,
                        }));
                      }}
                      className="text-red-600 hover:bg-red-100 rounded p-1"
                      title="Hapus file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mx-auto w-12 h-12 text-gray-400">
                      <FileIcon className="w-12 h-12" />
                    </div>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                        <span>Unggah file</span>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png,.webp"
                          className="sr-only"
                          onChange={(e) => handleFileUpload(e.target.files?.[0])}
                        />
                      </label>
                      <p className="pl-1">atau tarik dan lepas</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG, WEBP hingga 2MB</p>
                  </>
                )}
              </div>
            </div>
            {formErrors.file && <p className="text-xs text-red-500 mt-1">{formErrors.file}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Deskripsi (Opsional)</label>
            <Textarea
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Keterangan tambahan..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button variant="outline" onClick={handleCloseForm} disabled={saving}>
              Batal
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Menyimpan..." : "Simpan Dokumen"}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Hapus Dokumen"
        message={`Apakah Anda yakin ingin menghapus dokumen "${deletingItem?.title}"?`}
        loading={deleting}
      />
    </div>
  );
}
