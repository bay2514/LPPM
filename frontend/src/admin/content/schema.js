/**
 * Schema Registry untuk Admin Panel.
 * Satu sumber kebenaran untuk mendefinisikan struktur konten, field, validasi, dan UI.
 */

// --- Definisi Skema Dasar (Gunakan ini sebagai referensi jika menambah modul baru) ---

export const newsSchema = {
  key: "news",
  label: { singular: "Berita", plural: "Berita & Pengumuman" },
  icon: "Newspaper",
  group: "content",
  type: "collection",
  publicRoute: "/berita",
  listColumns: [
    { key: "image", label: "Gambar" },
    { key: "title", label: "Judul" },
    { key: "tag", label: "Tag" },
    { key: "date", label: "Tanggal" },
  ],
  searchableFields: ["title", "excerpt", "content"],
  fields: [
    { name: "title", label: "Judul Berita", type: "text", required: true },
    {
      name: "tag",
      label: "Kategori",
      type: "select",
      required: true,
      options: [
        { label: "Berita", value: "Berita" },
        { label: "Pengumuman", value: "Pengumuman" },
        { label: "Agenda", value: "Agenda" },
      ],
      defaultValue: "Berita",
    },
    { name: "date", label: "Tanggal", type: "date", required: true },
    { name: "excerpt", label: "Ringkasan", type: "textarea", required: true },
    { name: "content", label: "Isi Berita", type: "richtext", required: true },
    { name: "image", label: "Gambar Sampul", type: "image", required: false },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { label: "Draf", value: "draft" },
        { label: "Terbit", value: "published" },
        { label: "Dijadwalkan", value: "scheduled" },
      ],
      defaultValue: "draft",
    },
    { name: "publishAt", label: "Waktu Terbit", type: "datetime", required: false },
  ],
};

export const collaboratorsSchema = {
  key: "collaborators",
  label: { singular: "Mitra", plural: "Mitra & Kolaborator" },
  icon: "Handshake",
  group: "content",
  type: "collection",
  publicRoute: "/kerjasama",
  listColumns: [
    { key: "logo", label: "Logo" },
    { key: "name", label: "Nama Mitra" },
    { key: "category", label: "Kategori" },
  ],
  searchableFields: ["name", "category"],
  fields: [
    { name: "name", label: "Nama Mitra", type: "text", required: true },
    {
      name: "category",
      label: "Kategori",
      type: "select",
      required: true,
      options: [
        { label: "Industri", value: "Industri" },
        { label: "Pemerintah", value: "Pemerintah" },
        { label: "Perguruan Tinggi", value: "Perguruan Tinggi" },
      ],
    },
    { name: "website", label: "Website", type: "url", required: false },
    { name: "logo", label: "Logo Mitra", type: "image", required: false },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { label: "Aktif", value: "active" },
        { label: "Nonaktif", value: "inactive" },
      ],
      defaultValue: "active",
    },
  ],
};

export const eventsSchema = {
  key: "events",
  label: { singular: "Kegiatan", plural: "Kegiatan & Agenda" },
  icon: "Calendar",
  group: "content",
  type: "collection",
  publicRoute: "/kegiatan",
  listColumns: [
    { key: "title", label: "Judul" },
    { key: "date", label: "Tanggal" },
    { key: "location", label: "Lokasi" },
  ],
  searchableFields: ["title", "location"],
  fields: [
    { name: "title", label: "Judul Kegiatan", type: "text", required: true },
    { name: "date", label: "Tanggal", type: "date", required: true },
    { name: "time", label: "Waktu", type: "text", required: false },
    { name: "location", label: "Lokasi", type: "text", required: true },
    { name: "speaker", label: "Narasumber", type: "text", required: false },
    { name: "description", label: "Deskripsi", type: "textarea", required: false },
    { name: "image", label: "Poster", type: "image", required: false },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { label: "Terbit", value: "published" },
        { label: "Draf", value: "draft" },
      ],
      defaultValue: "published",
    },
  ],
};

export const documentsSchema = {
  key: "documents",
  label: { singular: "Dokumen", plural: "Dokumen & SOP" },
  icon: "FileText",
  group: "content",
  type: "collection",
  publicRoute: "/dokumen",
  listColumns: [
    { key: "title", label: "Judul" },
    { key: "category", label: "Kategori" },
    { key: "year", label: "Tahun" },
  ],
  searchableFields: ["title", "category"],
  fields: [
    { name: "title", label: "Judul Dokumen", type: "text", required: true },
    {
      name: "category",
      label: "Kategori",
      type: "select",
      required: true,
      options: [
        { label: "SOP", value: "SOP" },
        { label: "Laporan", value: "Laporan" },
        { label: "Buku Panduan", value: "Buku Panduan" },
      ],
    },
    { name: "year", label: "Tahun", type: "number", required: true },
    { name: "file", label: "File Dokumen", type: "url", required: true },
    { name: "description", label: "Deskripsi", type: "textarea", required: false },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { label: "Terbit", value: "published" },
        { label: "Draf", value: "draft" },
      ],
      defaultValue: "published",
    },
  ],
};

export const profileSchema = {
  key: "profile",
  label: { singular: "Profil", plural: "Profil Lembaga" },
  icon: "Building2",
  group: "settings",
  type: "singleton",
  publicRoute: "/tentang",
  fields: [
    { name: "name", label: "Nama Lembaga", type: "text", required: true },
    { name: "address", label: "Alamat", type: "textarea", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Telepon", type: "text", required: true },
    { name: "vision", label: "Visi", type: "textarea", required: true },
    { name: "mission", label: "Misi", type: "textarea", required: true },
    { name: "logo", label: "Logo LPPM", type: "image", required: false },
  ],
};

export const programsSchema = {
  key: "programs",
  label: { singular: "Prodi/Unit", plural: "Program Studi & Unit" },
  icon: "School",
  group: "dashboard",
  type: "collection",
  listColumns: [
    { key: "name", label: "Nama Prodi" },
    { key: "code", label: "Singkatan" },
    { key: "status", label: "Status" },
  ],
  searchableFields: ["name", "code"],
  fields: [
    { name: "name", label: "Nama Lengkap Prodi/Unit", type: "text", required: true },
    { name: "code", label: "Singkatan / Kode", type: "text", required: true },
    { name: "order", label: "Urutan Tampil", type: "number", defaultValue: 0 },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { label: "Aktif", value: "active" },
        { label: "Nonaktif", value: "inactive" },
      ],
      defaultValue: "active",
    },
  ],
};

export const performanceDataSchema = {
  key: "performance_data",
  label: { singular: "Data Kinerja", plural: "Data Kinerja Prodi" },
  icon: "BarChart3",
  group: "dashboard",
  type: "collection",
  listColumns: [
    { key: "programId", label: "Prodi" },
    { key: "year", label: "Tahun" },
    { key: "research_count", label: "Penelitian" },
  ],
  searchableFields: ["programId", "year"],
  fields: [
    {
      name: "programId",
      label: "Program Studi",
      type: "select",
      required: true,
      options: [], // Akan diisi dinamis dari koleksi programs
    },
    { name: "year", label: "Tahun Anggaran", type: "number", required: true },
    { name: "research_count", label: "Jumlah Penelitian", type: "number", min: 0, defaultValue: 0 },
    { name: "pkm_count", label: "Jumlah PKM", type: "number", min: 0, defaultValue: 0 },
    { name: "publication_count", label: "Jumlah Publikasi", type: "number", min: 0, defaultValue: 0 },
    { name: "hki_count", label: "Jumlah HKI", type: "number", min: 0, defaultValue: 0 },
    { name: "funding_amount", label: "Total Pendanaan (Rp)", type: "number", min: 0, defaultValue: 0 },
    { name: "notes", label: "Catatan Tambahan", type: "textarea" },
  ],
};

export const dashboardConfigSchema = {
  key: "dashboard_config",
  label: { singular: "Tampilan Dashboard", plural: "Pengaturan Dashboard" },
  icon: "Layout",
  group: "settings",
  type: "singleton",
  fields: [
    {
      name: "title",
      label: "Judul Halaman Dashboard",
      type: "text",
      required: true,
      help: "Teks yang muncul di header paling atas halaman dashboard publik.",
    },
    {
      name: "intro",
      label: "Paragraf Pengantar",
      type: "textarea",
      help: "Penjelasan singkat mengenai isi dashboard capaian.",
    },
    {
      name: "updatedLabel",
      label: "Label 'Diperbarui'",
      type: "text",
      defaultValue: "Terakhir diperbarui pada",
      help: "Teks sebelum tanggal pembaruan data.",
    },
    {
      name: "howToRead",
      label: "Catatan Cara Membaca",
      type: "list",
      help: "Daftar poin penjelasan cara memahami grafik dan angka di dashboard.",
    },
    {
      name: "widgets",
      label: "Pengaturan Widget",
      type: "widget_manager",
      options: [
        { id: "kpi", label: "Kartu KPI Utama" },
        { id: "prodi_pulse", label: "Pulse Prodi" },
        { id: "annual_trend", label: "Tren Tahunan" },
        { id: "output_comp", label: "Komposisi Luaran" },
        { id: "prodi_ranking", label: "Peringkat Prodi" },
        { id: "full_table", label: "Tabel Data Lengkap" },
      ],
    },
    {
      name: "kpiMode",
      label: "Mode Angka KPI Utama",
      type: "select",
      options: [
        { label: "Otomatis dari konten", value: "auto" },
        { label: "Manual (Entri Langsung)", value: "manual" },
      ],
      defaultValue: "auto",
    },
    {
      name: "manualKpi",
      label: "Data KPI Manual",
      type: "kpi_group",
      condition: { field: "kpiMode", value: "manual" },
    },
    {
      name: "yearStart",
      label: "Tahun Awal Filter",
      type: "number",
      defaultValue: 2020,
    },
    {
      name: "yearDefault",
      label: "Tahun Default Tampilan",
      type: "number",
      defaultValue: new Date().getFullYear(),
    },
  ],
};

export const contentRegistry = {
  news: newsSchema,
  collaborators: collaboratorsSchema,
  events: eventsSchema,
  documents: documentsSchema,
  profile: profileSchema,
  programs: programsSchema,
  performance_data: performanceDataSchema,
  dashboard_config: dashboardConfigSchema,
};

export const collaboratorSchema = collaboratorsSchema;

export function getSchema(type) {
  return contentRegistry[type] || null;
}
