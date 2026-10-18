import { useState, useCallback, useEffect } from "react";
import { useAdminContent } from "@admin/hooks/useAdminContent.js";
import { useAdminAuth } from "@admin/auth/auth.js";
import { contentStore } from "@shared/lib/contentStore.js";
import { Button } from "@shared/components/ui/Button.jsx";
import {
  Save,
  Eye,
  RotateCcw,
  ChevronUp,
  ChevronDown,
  Plus,
  Trash2,
  LayoutDashboard,
  BarChart3,
  GraduationCap,
  FileText,
} from "@shared/components/ui/Icons.jsx";
import { toast } from "sonner";

const DEFAULT_WIDGETS = [
  { id: "kpi", label: "Kartu KPI Utama", visible: true },
  { id: "prodi_pulse", label: "Pulse Prodi", visible: true },
  { id: "annual_trend", label: "Tren Tahunan", visible: true },
  { id: "output_comp", label: "Komposisi Luaran", visible: true },
  { id: "prodi_ranking", label: "Peringkat Prodi", visible: true },
  { id: "full_table", label: "Tabel Data Lengkap", visible: true },
];

const DEFAULT_KPI = [
  { value: 0, label: "Penelitian", description: "Jumlah kegiatan penelitian", previousValue: 0 },
  { value: 0, label: "PKM", description: "Jumlah pengabdian masyarakat", previousValue: 0 },
  { value: 0, label: "Publikasi", description: "Artikel jurnal dan prosiding", previousValue: 0 },
  { value: 0, label: "HKI", description: "Hak kekayaan intelektual", previousValue: 0 },
];

const DEFAULT_CONFIG = {
  title: "Dashboard Capaian",
  intro: "Ringkasan kinerja penelitian dan pengabdian LPPM Universitas Tiga Serangkai.",
  updatedLabel: "Terakhir diperbarui pada",
  howToRead: [
    "Angka menunjukkan total kegiatan dalam tahun berjalan.",
    "Perbandingan dengan tahun sebelumnya ditampilkan di bawah angka.",
    "Klik kartu untuk melihat detail per program studi.",
  ],
  widgets: DEFAULT_WIDGETS,
  kpiMode: "auto",
  manualKpi: DEFAULT_KPI,
  yearStart: 2020,
  yearDefault: new Date().getFullYear(),
  dataSource: "Sistem Informasi LPPM",
  lastUpdated: new Date().toISOString(),
};

export default function DashboardSettingsPage() {
  const { items: configs, updateItem } = useAdminContent("dashboard_config");
  const { items: programs } = useAdminContent("programs");
  const { user } = useAdminAuth();
  const [activeTab, setActiveTab] = useState("display");
  const [form, setForm] = useState(() => {
    const existing = configs[0];
    return existing ? { ...existing } : { ...DEFAULT_CONFIG, id: "singleton" };
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const existing = configs[0];
    if (existing) {
      setForm({ ...existing });
    } else {
      setForm({ ...DEFAULT_CONFIG, id: "singleton" });
    }
  }, [configs]);

  const handleChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        lastUpdated: new Date().toISOString(),
        updatedBy: user?.name || "Admin",
      };
      if (configs[0]) {
        await updateItem(configs[0].id, payload);
      } else {
        await contentStore.create("dashboard_config", payload);
      }
      toast.success("Pengaturan dashboard berhasil disimpan");
    } catch (err) {
      toast.error("Gagal menyimpan pengaturan: " + err.message);
    } finally {
      setSaving(false);
    }
  }, [form, configs, updateItem, user]);

  const handleWidgetToggle = (widgetId) => {
    const next = form.widgets.map((w) =>
      w.id === widgetId ? { ...w, visible: !w.visible } : w
    );
    handleChange("widgets", next);
  };

  const handleWidgetMove = (index, direction) => {
    const next = [...form.widgets];
    const swapIdx = direction === "up" ? index - 1 : index + 1;
    if (swapIdx < 0 || swapIdx >= next.length) return;
    [next[index], next[swapIdx]] = [next[swapIdx], next[index]];
    handleChange("widgets", next);
  };

  const handleKpiChange = (idx, field, value) => {
    const next = [...form.manualKpi];
    next[idx] = { ...next[idx], [field]: value };
    handleChange("manualKpi", next);
  };

  const handleHowToReadChange = (idx, value) => {
    const next = [...form.howToRead];
    next[idx] = value;
    handleChange("howToRead", next);
  };

  const addHowToRead = () => {
    handleChange("howToRead", [...form.howToRead, ""]);
  };

  const removeHowToRead = (idx) => {
    const next = form.howToRead.filter((_, i) => i !== idx);
    handleChange("howToRead", next);
  };

  const handleReset = () => {
    if (confirm("Yakin ingin mengembalikan ke pengaturan awal? Semua perubahan akan hilang.")) {
      setForm({ ...DEFAULT_CONFIG, id: form.id || "singleton" });
    }
  };

  const totalVisible = form.widgets?.filter((w) => w.visible).length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-950">Pengaturan Dashboard</h1>
          <p className="text-sm text-ink-700 mt-1">
            Atur tampilan, widget, dan data KPI halaman Dashboard Capaian publik.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            className="gap-2"
            disabled={saving}
          >
            <RotateCcw size={16} />
            Reset
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open("/dashboard", "_blank")}
            className="gap-2"
          >
            <Eye size={16} />
            Lihat Publik
          </Button>
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            <Save size={16} />
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-canvas p-1 rounded-xl border border-line w-fit">
        {[
          { id: "display", label: "Tampilan & Widget", icon: LayoutDashboard },
          { id: "kpi", label: "Data KPI", icon: BarChart3 },
          { id: "programs", label: "Prodi & Unit", icon: GraduationCap },
          { id: "performance", label: "Data Kinerja", icon: FileText },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-white text-navy-950 shadow-sm border border-line"
                : "text-ink-700 hover:text-navy-950 hover:bg-white/50"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Tampilan & Widget */}
      {activeTab === "display" && (
        <div className="space-y-6">
          {/* Info Card */}
          <div className="bg-white rounded-2xl border border-line p-6 shadow-card">
            <h2 className="text-lg font-bold text-navy-950 mb-4">Informasi Umum</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-1.5">
                  Judul Halaman
                </label>
                <input
                  type="text"
                  value={form.title || ""}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  placeholder="Dashboard Capaian"
                />
                <p className="text-xs text-ink-700 mt-1.5">
                  Teks yang muncul di header paling atas halaman dashboard publik.
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-1.5">
                  Label "Diperbarui"
                </label>
                <input
                  type="text"
                  value={form.updatedLabel || ""}
                  onChange={(e) => handleChange("updatedLabel", e.target.value)}
                  className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  placeholder="Terakhir diperbarui pada"
                />
                <p className="text-xs text-ink-700 mt-1.5">
                  Teks sebelum tanggal pembaruan data.
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-navy-900 mb-1.5">
                  Paragraf Pengantar
                </label>
                <textarea
                  value={form.intro || ""}
                  onChange={(e) => handleChange("intro", e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
                  placeholder="Ringkasan kinerja penelitian dan pengabdian..."
                />
                <p className="text-xs text-ink-700 mt-1.5">
                  Penjelasan singkat mengenai isi dashboard capaian.
                </p>
              </div>
            </div>
          </div>

          {/* How to Read */}
          <div className="bg-white rounded-2xl border border-line p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-navy-950">Cara Membaca Dashboard</h2>
              <Button variant="outline" size="sm" onClick={addHowToRead} className="gap-1.5">
                <Plus size={14} />
                Tambah Poin
              </Button>
            </div>
            <div className="space-y-3">
              {form.howToRead?.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="mt-2.5 w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleHowToReadChange(idx, e.target.value)}
                    className="flex-1 rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                    placeholder={`Poin penjelasan ${idx + 1}`}
                  />
                  <button
                    onClick={() => removeHowToRead(idx)}
                    className="mt-1.5 w-8 h-8 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
                    title="Hapus poin"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              {(!form.howToRead || form.howToRead.length === 0) && (
                <p className="text-sm text-ink-700 italic">Belum ada poin penjelasan.</p>
              )}
            </div>
          </div>

          {/* Widget Manager */}
          <div className="bg-white rounded-2xl border border-line p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-navy-950">Pengaturan Widget</h2>
                <p className="text-sm text-ink-700 mt-0.5">
                  {totalVisible} dari {form.widgets?.length || 0} widget aktif
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {form.widgets?.map((widget, idx) => (
                <div
                  key={widget.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    widget.visible
                      ? "bg-white border-line"
                      : "bg-canvas border-transparent opacity-60"
                  }`}
                >
                  <button
                    onClick={() => handleWidgetToggle(widget.id)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      widget.visible ? "bg-orange-500" : "bg-ink-200"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                        widget.visible ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <span className="flex-1 text-sm font-medium text-navy-950">
                    {widget.label}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleWidgetMove(idx, "up")}
                      disabled={idx === 0}
                      className="w-8 h-8 rounded-lg border border-line flex items-center justify-center text-ink-700 hover:bg-canvas disabled:opacity-30 transition-colors"
                      title="Naikkan"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      onClick={() => handleWidgetMove(idx, "down")}
                      disabled={idx === form.widgets.length - 1}
                      className="w-8 h-8 rounded-lg border border-line flex items-center justify-center text-ink-700 hover:bg-canvas disabled:opacity-30 transition-colors"
                      title="Turunkan"
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Year Settings */}
          <div className="bg-white rounded-2xl border border-line p-6 shadow-card">
            <h2 className="text-lg font-bold text-navy-950 mb-4">Pengaturan Tahun</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-1.5">
                  Tahun Awal Filter
                </label>
                <input
                  type="number"
                  value={form.yearStart || 2020}
                  onChange={(e) => handleChange("yearStart", parseInt(e.target.value) || 2020)}
                  className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                />
                <p className="text-xs text-ink-700 mt-1.5">
                  Tahun paling awal yang tersedia di filter dropdown.
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-1.5">
                  Tahun Default Tampilan
                </label>
                <input
                  type="number"
                  value={form.yearDefault || new Date().getFullYear()}
                  onChange={(e) => handleChange("yearDefault", parseInt(e.target.value) || new Date().getFullYear())}
                  className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                />
                <p className="text-xs text-ink-700 mt-1.5">
                  Tahun yang dipilih saat pengunjung pertama membuka dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Data KPI */}
      {activeTab === "kpi" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-line p-6 shadow-card">
            <h2 className="text-lg font-bold text-navy-950 mb-4">Mode Angka KPI Utama</h2>
            <div className="flex gap-4 mb-6">
              <label className="flex items-center gap-3 p-4 rounded-xl border border-line cursor-pointer hover:bg-canvas transition-colors flex-1">
                <input
                  type="radio"
                  name="kpiMode"
                  value="auto"
                  checked={form.kpiMode === "auto"}
                  onChange={(e) => handleChange("kpiMode", e.target.value)}
                  className="w-4 h-4 text-orange-500"
                />
                <div>
                  <p className="text-sm font-bold text-navy-950">Otomatis dari Konten</p>
                  <p className="text-xs text-ink-700">Angka dihitung otomatis dari data kinerja prodi.</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-4 rounded-xl border border-line cursor-pointer hover:bg-canvas transition-colors flex-1">
                <input
                  type="radio"
                  name="kpiMode"
                  value="manual"
                  checked={form.kpiMode === "manual"}
                  onChange={(e) => handleChange("kpiMode", e.target.value)}
                  className="w-4 h-4 text-orange-500"
                />
                <div>
                  <p className="text-sm font-bold text-navy-950">Manual (Entri Langsung)</p>
                  <p className="text-xs text-ink-700">Anda mengisi angka KPI secara manual.</p>
                </div>
              </label>
            </div>

            {form.kpiMode === "manual" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-navy-900">Data KPI Manual</h3>
                {form.manualKpi?.map((kpi, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-canvas border border-line"
                  >
                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1">Nilai</label>
                      <input
                        type="number"
                        value={kpi.value}
                        onChange={(e) => handleKpiChange(idx, "value", parseInt(e.target.value) || 0)}
                        className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-navy-950 outline-none focus:border-orange-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1">Label</label>
                      <input
                        type="text"
                        value={kpi.label}
                        onChange={(e) => handleKpiChange(idx, "label", e.target.value)}
                        className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-navy-950 outline-none focus:border-orange-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1">Keterangan</label>
                      <input
                        type="text"
                        value={kpi.description}
                        onChange={(e) => handleKpiChange(idx, "description", e.target.value)}
                        className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-navy-950 outline-none focus:border-orange-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1">Tahun Lalu</label>
                      <input
                        type="number"
                        value={kpi.previousValue}
                        onChange={(e) => handleKpiChange(idx, "previousValue", parseInt(e.target.value) || 0)}
                        className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-navy-950 outline-none focus:border-orange-500 transition-all"
                      />
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy-900 mb-1.5">Sumber Data</label>
                    <input
                      type="text"
                      value={form.dataSource || ""}
                      onChange={(e) => handleChange("dataSource", e.target.value)}
                      className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-orange-500 transition-all"
                      placeholder="Sistem Informasi LPPM"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-900 mb-1.5">Tanggal Pembaruan</label>
                    <input
                      type="datetime-local"
                      value={form.lastUpdated ? new Date(form.lastUpdated).toISOString().slice(0, 16) : ""}
                      onChange={(e) => handleChange("lastUpdated", new Date(e.target.value).toISOString())}
                      className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-orange-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Live Preview */}
          <div className="bg-white rounded-2xl border border-line p-6 shadow-card">
            <h2 className="text-lg font-bold text-navy-950 mb-4">Pratinjau KPI</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {(form.kpiMode === "manual" ? form.manualKpi : DEFAULT_KPI).map((kpi, idx) => {
                const diff = kpi.value - kpi.previousValue;
                const positive = diff >= 0;
                return (
                  <div key={idx} className="p-4 rounded-xl bg-canvas border border-line">
                    <p className="text-2xl font-black text-navy-950">{kpi.value.toLocaleString("id-ID")}</p>
                    <p className="text-xs font-semibold text-navy-900 mt-1">{kpi.label}</p>
                    <p className="text-[10px] text-ink-700 mt-0.5">{kpi.description}</p>
                    <div className={`flex items-center gap-1 mt-2 text-xs font-bold ${positive ? "text-teal-700" : "text-red-500"}`}>
                      <span>{positive ? "↑" : "↓"}</span>
                      <span>{Math.abs(diff).toLocaleString("id-ID")}</span>
                      <span className="text-ink-700 font-normal">vs tahun lalu</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Prodi & Unit */}
      {activeTab === "programs" && (
        <ProgramsManager />
      )}

      {/* Tab: Data Kinerja */}
      {activeTab === "performance" && (
        <PerformanceDataManager />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-komponen: ProgramsManager                                      */
/* ------------------------------------------------------------------ */
function ProgramsManager() {
  const { items, createItem, updateItem, deleteItem } = useAdminContent("programs");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", code: "", order: 0, status: "active" });

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.code.trim()) {
      toast.error("Nama dan singkatan wajib diisi");
      return;
    }
    try {
      if (editing) {
        await updateItem(editing, form);
        toast.success("Prodi diperbarui");
      } else {
        await createItem({ ...form, id: crypto.randomUUID() });
        toast.success("Prodi ditambahkan");
      }
      setEditing(null);
      setForm({ name: "", code: "", order: 0, status: "active" });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (item) => {
    setEditing(item.id);
    setForm({ name: item.name, code: item.code, order: item.order || 0, status: item.status });
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus prodi ini?")) return;
    try {
      await deleteItem(id);
      toast.success("Prodi dihapus");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const sorted = [...items].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-line p-6 shadow-card">
        <h2 className="text-lg font-bold text-navy-950 mb-4">{editing ? "Edit Prodi/Unit" : "Tambah Prodi/Unit"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-navy-900 mb-1">Nama Lengkap</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-orange-500 transition-all"
              placeholder="Teknik Informatika"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">Singkatan</label>
            <input
              type="text"
              value={form.code}
              onChange={(e) => setForm((p) => ({ ...p, code: e.target.value }))}
              className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-orange-500 transition-all"
              placeholder="TI"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">Urutan</label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => setForm((p) => ({ ...p, order: parseInt(e.target.value) || 0 }))}
              className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-orange-500 transition-all"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <Button onClick={handleSubmit} className="gap-2">
            <Save size={16} />
            {editing ? "Simpan Perubahan" : "Tambah Prodi"}
          </Button>
          {editing && (
            <Button variant="outline" onClick={() => { setEditing(null); setForm({ name: "", code: "", order: 0, status: "active" }); }}>
              Batal
            </Button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-line shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-canvas border-b border-line">
              <tr>
                <th className="text-left px-6 py-3 font-bold text-navy-900">Urut</th>
                <th className="text-left px-6 py-3 font-bold text-navy-900">Nama</th>
                <th className="text-left px-6 py-3 font-bold text-navy-900">Singkatan</th>
                <th className="text-left px-6 py-3 font-bold text-navy-900">Status</th>
                <th className="text-right px-6 py-3 font-bold text-navy-900">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {sorted.map((item) => (
                <tr key={item.id} className="hover:bg-canvas/50 transition-colors">
                  <td className="px-6 py-3 text-ink-700">{item.order || 0}</td>
                  <td className="px-6 py-3 font-medium text-navy-950">{item.name}</td>
                  <td className="px-6 py-3 text-ink-700">{item.code}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
                      item.status === "active" ? "bg-teal-50 text-teal-700 border border-teal-100" : "bg-ink-100 text-ink-700 border border-ink-200"
                    }`}>
                      {item.status === "active" ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>Edit</Button>
                      <Button variant="outline" size="sm" className="text-red-500 border-red-100 hover:bg-red-50" onClick={() => handleDelete(item.id)}>Hapus</Button>
                    </div>
                  </td>
                </tr>
              ))}
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-ink-700 italic">
                    Belum ada data prodi. Tambahkan di atas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-komponen: PerformanceDataManager                               */
/* ------------------------------------------------------------------ */
function PerformanceDataManager() {
  const { items: programs } = useAdminContent("programs");
  const { items, createItem, updateItem, deleteItem } = useAdminContent("performance_data");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    programId: "",
    year: new Date().getFullYear(),
    research_count: 0,
    pkm_count: 0,
    publication_count: 0,
    hki_count: 0,
    funding_amount: 0,
    notes: "",
  });
  const [importOpen, setImportOpen] = useState(false);

  const activePrograms = programs.filter((p) => p.status === "active");

  const handleSubmit = async () => {
    if (!form.programId || !form.year) {
      toast.error("Prodi dan tahun wajib diisi");
      return;
    }
    const duplicate = items.find((i) => i.programId === form.programId && i.year === form.year && i.id !== editing);
    if (duplicate) {
      toast.error("Data untuk prodi dan tahun ini sudah ada");
      return;
    }
    try {
      if (editing) {
        await updateItem(editing, form);
        toast.success("Data kinerja diperbarui");
      } else {
        await createItem({ ...form, id: crypto.randomUUID() });
        toast.success("Data kinerja ditambahkan");
      }
      setEditing(null);
      setForm({ programId: "", year: new Date().getFullYear(), research_count: 0, pkm_count: 0, publication_count: 0, hki_count: 0, funding_amount: 0, notes: "" });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (item) => {
    setEditing(item.id);
    setForm({ ...item });
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    try {
      await deleteItem(id);
      toast.success("Data dihapus");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const exportCSV = () => {
    const headers = ["programId", "year", "research_count", "pkm_count", "publication_count", "hki_count", "funding_amount", "notes"];
    const rows = items.map((i) => headers.map((h) => `"${(i[h] ?? "").toString().replace(/"/g, '""')}"`).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `data-kinerja-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Data diekspor ke CSV");
  };

  const downloadTemplate = () => {
    const headers = ["programId", "year", "research_count", "pkm_count", "publication_count", "hki_count", "funding_amount", "notes"];
    const example = activePrograms.length > 0
      ? [`"${activePrograms[0].id}"`, "2024", "10", "5", "8", "2", "150000000", "Contoh catatan"].join(",")
      : `"prog-001",2024,10,5,8,2,150000000,"Contoh catatan"`;
    const csv = [headers.join(","), example].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "template-data-kinerja.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-line p-6 shadow-card">
        <h2 className="text-lg font-bold text-navy-950 mb-4">{editing ? "Edit Data Kinerja" : "Tambah Data Kinerja"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">Program Studi</label>
            <select
              value={form.programId}
              onChange={(e) => setForm((p) => ({ ...p, programId: e.target.value }))}
              className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-orange-500 transition-all"
            >
              <option value="">Pilih prodi...</option>
              {activePrograms.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">Tahun</label>
            <input
              type="number"
              value={form.year}
              onChange={(e) => setForm((p) => ({ ...p, year: parseInt(e.target.value) || 0 }))}
              className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-orange-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">Penelitian</label>
            <input
              type="number"
              min={0}
              value={form.research_count}
              onChange={(e) => setForm((p) => ({ ...p, research_count: Math.max(0, parseInt(e.target.value) || 0) }))}
              className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-orange-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">PKM</label>
            <input
              type="number"
              min={0}
              value={form.pkm_count}
              onChange={(e) => setForm((p) => ({ ...p, pkm_count: Math.max(0, parseInt(e.target.value) || 0) }))}
              className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-orange-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">Publikasi</label>
            <input
              type="number"
              min={0}
              value={form.publication_count}
              onChange={(e) => setForm((p) => ({ ...p, publication_count: Math.max(0, parseInt(e.target.value) || 0) }))}
              className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-orange-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">HKI</label>
            <input
              type="number"
              min={0}
              value={form.hki_count}
              onChange={(e) => setForm((p) => ({ ...p, hki_count: Math.max(0, parseInt(e.target.value) || 0) }))}
              className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-orange-500 transition-all"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-navy-900 mb-1">Pendanaan (Rp)</label>
            <input
              type="number"
              min={0}
              value={form.funding_amount}
              onChange={(e) => setForm((p) => ({ ...p, funding_amount: Math.max(0, parseInt(e.target.value) || 0) }))}
              className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-orange-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">Catatan</label>
            <input
              type="text"
              value={form.notes}
              onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
              className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-navy-950 outline-none focus:border-orange-500 transition-all"
              placeholder="Opsional"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <Button onClick={handleSubmit} className="gap-2">
            <Save size={16} />
            {editing ? "Simpan Perubahan" : "Tambah Data"}
          </Button>
          {editing && (
            <Button variant="outline" onClick={() => { setEditing(null); setForm({ programId: "", year: new Date().getFullYear(), research_count: 0, pkm_count: 0, publication_count: 0, hki_count: 0, funding_amount: 0, notes: "" }); }}>
              Batal
            </Button>
          )}
        </div>
      </div>

      {/* Import / Export */}
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" onClick={() => setImportOpen(true)} className="gap-2">
          <FileSpreadsheet size={16} />
          Impor CSV
        </Button>
        <Button variant="outline" onClick={exportCSV} className="gap-2">
          <FileSpreadsheet size={16} />
          Ekspor CSV
        </Button>
        <Button variant="outline" onClick={downloadTemplate} className="gap-2">
          <Plus size={16} />
          Unduh Templat CSV
        </Button>
      </div>

      {importOpen && (
        <CsvImporter
          programs={activePrograms}
          existing={items}
          onClose={() => setImportOpen(false)}
          onImport={(rows) => {
            rows.forEach((r) => createItem({ ...r, id: crypto.randomUUID() }));
            toast.success(`${rows.length} baris data diimpor`);
            setImportOpen(false);
          }}
        />
      )}

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-line shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-canvas border-b border-line">
              <tr>
                <th className="text-left px-6 py-3 font-bold text-navy-900">Prodi</th>
                <th className="text-left px-6 py-3 font-bold text-navy-900">Tahun</th>
                <th className="text-right px-6 py-3 font-bold text-navy-900">Penelitian</th>
                <th className="text-right px-6 py-3 font-bold text-navy-900">PKM</th>
                <th className="text-right px-6 py-3 font-bold text-navy-900">Publikasi</th>
                <th className="text-right px-6 py-3 font-bold text-navy-900">HKI</th>
                <th className="text-right px-6 py-3 font-bold text-navy-900">Pendanaan</th>
                <th className="text-right px-6 py-3 font-bold text-navy-900">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {items.map((item) => {
                const prog = programs.find((p) => p.id === item.programId);
                return (
                  <tr key={item.id} className="hover:bg-canvas/50 transition-colors">
                    <td className="px-6 py-3 font-medium text-navy-950">{prog?.name || item.programId}</td>
                    <td className="px-6 py-3 text-ink-700">{item.year}</td>
                    <td className="px-6 py-3 text-right text-navy-950">{item.research_count}</td>
                    <td className="px-6 py-3 text-right text-navy-950">{item.pkm_count}</td>
                    <td className="px-6 py-3 text-right text-navy-950">{item.publication_count}</td>
                    <td className="px-6 py-3 text-right text-navy-950">{item.hki_count}</td>
                    <td className="px-6 py-3 text-right text-navy-950">Rp {(item.funding_amount || 0).toLocaleString("id-ID")}</td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>Edit</Button>
                        <Button variant="outline" size="sm" className="text-red-500 border-red-100 hover:bg-red-50" onClick={() => handleDelete(item.id)}>Hapus</Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {items.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-ink-700 italic">
                    Belum ada data kinerja. Tambahkan di atas atau impor dari CSV.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-komponen: CsvImporter                                          */
/* ------------------------------------------------------------------ */
function CsvImporter({ programs, existing, onClose, onImport }) {
  const [text, setText] = useState("");
  const [preview, setPreview] = useState([]);
  const [errors, setErrors] = useState([]);

  const parseCSV = (csvText) => {
    const lines = csvText.trim().split(/\r?\n/);
    if (lines.length < 2) return { rows: [], errors: ["CSV minimal memiliki header dan 1 baris data."] };
    const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
    const required = ["programId", "year", "research_count", "pkm_count", "publication_count", "hki_count", "funding_amount"];
    const missing = required.filter((r) => !headers.includes(r));
    if (missing.length > 0) return { rows: [], errors: [`Header tidak lengkap. Kurang: ${missing.join(", ")}`] };

    const rows = [];
    const errs = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const values = line.split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
      const obj = {};
      headers.forEach((h, idx) => { obj[h] = values[idx] ?? ""; });

      const year = parseInt(obj.year);
      if (!year || year < 2000 || year > 2100) {
        errs.push(`Baris ${i + 1}: Tahun tidak valid`);
        continue;
      }
      const prog = programs.find((p) => p.id === obj.programId || p.code === obj.programId);
      if (!prog) {
        errs.push(`Baris ${i + 1}: Prodi '${obj.programId}' tidak ditemukan`);
        continue;
      }
      obj.programId = prog.id;
      const dup = existing.find((e) => e.programId === obj.programId && e.year === year);
      if (dup) {
        errs.push(`Baris ${i + 1}: Duplikat prodi '${prog.name}' tahun ${year}`);
        continue;
      }
      ["research_count", "pkm_count", "publication_count", "hki_count", "funding_amount"].forEach((k) => {
        obj[k] = Math.max(0, parseInt(obj[k]) || 0);
      });
      rows.push(obj);
    }
    return { rows, errors: errs };
  };

  const handlePreview = () => {
    const { rows, errors: errs } = parseCSV(text);
    setPreview(rows);
    setErrors(errs);
  };

  return (
    <div className="bg-white rounded-2xl border border-line p-6 shadow-card">
      <h3 className="text-lg font-bold text-navy-950 mb-4">Impor Data dari CSV</h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-navy-950 outline-none focus:border-orange-500 transition-all font-mono"
        placeholder={`programId,year,research_count,pkm_count,publication_count,hki_count,funding_amount,notes\nTI,2024,10,5,8,2,150000000,Contoh`}
      />
      <div className="flex items-center gap-3 mt-4">
        <Button variant="outline" onClick={handlePreview} className="gap-2">
          <Eye size={16} />
          Pratinjau
        </Button>
        <Button
          onClick={() => onImport(preview)}
          disabled={preview.length === 0}
          className="gap-2"
        >
          <Save size={16} />
          Konfirmasi Impor ({preview.length} baris)
        </Button>
        <Button variant="outline" onClick={onClose}>Batal</Button>
      </div>
      {errors.length > 0 && (
        <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-100">
          <p className="text-sm font-bold text-red-600 mb-2">Baris Bermasalah:</p>
          <ul className="space-y-1">
            {errors.map((e, i) => (
              <li key={i} className="text-xs text-red-600">• {e}</li>
            ))}
          </ul>
        </div>
      )}
      {preview.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-bold text-navy-900 mb-2">Pratinjau ({preview.length} baris valid):</p>
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-xs">
              <thead className="bg-canvas">
                <tr>
                  <th className="text-left px-3 py-2 font-bold text-navy-900">Prodi</th>
                  <th className="text-left px-3 py-2 font-bold text-navy-900">Tahun</th>
                  <th className="text-right px-3 py-2 font-bold text-navy-900">Penelitian</th>
                  <th className="text-right px-3 py-2 font-bold text-navy-900">PKM</th>
                  <th className="text-right px-3 py-2 font-bold text-navy-900">Publikasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {preview.slice(0, 5).map((row, i) => {
                  const prog = programs.find((p) => p.id === row.programId);
                  return (
                    <tr key={i}>
                      <td className="px-3 py-2">{prog?.name || row.programId}</td>
                      <td className="px-3 py-2">{row.year}</td>
                      <td className="px-3 py-2 text-right">{row.research_count}</td>
                      <td className="px-3 py-2 text-right">{row.pkm_count}</td>
                      <td className="px-3 py-2 text-right">{row.publication_count}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {preview.length > 5 && (
              <p className="px-3 py-2 text-xs text-ink-700 italic">...dan {preview.length - 5} baris lainnya</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
