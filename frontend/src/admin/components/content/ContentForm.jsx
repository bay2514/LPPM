import React, { useState } from "react";
import * as Icons from "@shared/components/ui/Icons.jsx";
import Button from "@shared/components/ui/Button.jsx";
import FieldRenderer from "./FieldRenderer.jsx";

/**
 * ContentForm: Formulir generik yang membaca field dari schema.
 * Mendukung validasi otomatis, publish status (draf, terbit, dijadwalkan),
 * pratinjau, dan tombol riwayat versi jika sedang mode edit.
 */
export default function ContentForm({
  schema,
  initialData = {},
  onSubmit,
  onCancel,
  versions = [],
  onRollback,
}) {
  const [formData, setFormData] = useState(() => {
    const defaults = {};
    schema.fields.forEach((f) => {
      defaults[f.name] = initialData[f.name] !== undefined ? initialData[f.name] : (f.defaultValue || "");
    });
    return {
      ...defaults,
      status: initialData.status || "draf",
      publishAt: initialData.publishAt || "",
    };
  });

  const [errors, setErrors] = useState({});
  const [showVersions, setShowVersions] = useState(false);

  const handleFieldChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Hapus error jika ada perubahan
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    schema.fields.forEach((f) => {
      const val = formData[f.name];
      if (f.required && (val === undefined || val === null || String(val).trim() === "")) {
        newErrors[f.name] = `${f.label} wajib diisi.`;
      } else if (f.validation && !f.validation(val)) {
        newErrors[f.name] = `Format ${f.label} tidak valid.`;
      }
    });

    if (formData.status === "dijadwalkan" && !formData.publishAt) {
      newErrors.publishAt = "Tanggal jadwal publikasi wajib ditentukan jika status 'Dijadwalkan'.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <div className="space-y-6">
      {/* Header Form */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            type="button"
            onClick={onCancel}
            className="mb-2 inline-flex items-center text-sm font-medium text-ink-500 hover:text-navy-900"
          >
            <Icons.ArrowLeft size={16} className="mr-1" />
            Kembali ke Daftar
          </button>
          <h1 className="text-2xl font-bold text-navy-900">
            {initialData.id ? `Sunting ${schema.label.singular}` : `Tambah ${schema.label.singular}`}
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          {initialData.id && versions.length > 0 && (
            <button
              type="button"
              onClick={() => setShowVersions(!showVersions)}
              className="inline-flex items-center rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-navy-800 shadow-sm hover:bg-canvas"
            >
              <Icons.BookOpen size={16} className="mr-2 text-ink-500" />
              Riwayat Versi ({versions.length})
            </button>
          )}
          <Button variant="outline" onClick={onCancel}>
            Batal
          </Button>
          <Button onClick={handleSubmit} className="bg-orange-600 hover:bg-orange-700 text-white">
            Simpan Perubahan
          </Button>
        </div>
      </div>

      {/* Drawer Riwayat Versi */}
      {showVersions && (
        <div className="rounded-xl border border-line bg-surface p-4 shadow-card">
          <div className="flex items-center justify-between border-b border-line pb-3 mb-3">
            <h3 className="text-base font-bold text-navy-900">Riwayat Revisi (20 Versi Terakhir)</h3>
            <button
              type="button"
              onClick={() => setShowVersions(false)}
              className="text-ink-400 hover:text-navy-900"
            >
              <Icons.X size={18} />
            </button>
          </div>
          <div className="max-h-60 overflow-y-auto divide-y divide-line">
            {versions.map((ver, idx) => (
              <div key={ver.versionId || idx} className="flex items-center justify-between py-2 text-sm">
                <div>
                  <span className="font-semibold text-navy-800">Versi #{versions.length - idx}</span>
                  <span className="ml-2 text-xs text-ink-400">
                    {new Date(ver.timestamp).toLocaleString("id-ID")}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Kembalikan konten ke versi ini? Perubahan saat ini akan ditimpa.")) {
                      onRollback(idx);
                      setShowVersions(false);
                    }
                  }}
                  className="rounded bg-navy-50 px-2.5 py-1 text-xs font-semibold text-navy-800 hover:bg-navy-100"
                >
                  Kembalikan ke Versi Ini
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid Form Fields & Settings Sidebar */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Kolom Kiri: Input Field Skema */}
        <div className="space-y-5 lg:col-span-2 rounded-xl border border-line bg-surface p-6 shadow-card">
          {schema.fields.map((field) => (
            <FieldRenderer
              key={field.name}
              field={field}
              value={formData[field.name]}
              onChange={handleFieldChange}
              error={errors[field.name]}
            />
          ))}
        </div>

        {/* Kolom Kanan: Pengaturan Status & Publikasi */}
        <div className="space-y-6">
          <div className="rounded-xl border border-line bg-surface p-6 shadow-card space-y-4">
            <h3 className="text-base font-bold text-navy-900">Pengaturan Publikasi</h3>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-navy-800">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleFieldChange("status", e.target.value)}
                className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-navy-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value="draf">Draf (Tidak Publik)</option>
                <option value="terbit">Terbit Langsung</option>
                <option value="dijadwalkan">Dijadwalkan</option>
              </select>
            </div>

            {formData.status === "dijadwalkan" && (
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-navy-800">
                  Waktu Publikasi <span className="text-orange-600">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={formData.publishAt ? formData.publishAt.substring(0, 16) : ""}
                  onChange={(e) => handleFieldChange("publishAt", new Date(e.target.value).toISOString())}
                  className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-navy-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                {errors.publishAt && <p className="text-xs text-orange-600">{errors.publishAt}</p>}
                <p className="text-xs text-ink-500">
                  Item otomatis tampil di halaman publik setelah tanggal dan jam ini terlewati.
                </p>
              </div>
            )}

            <div className="border-t border-line pt-4">
              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                Simpan Konten
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
