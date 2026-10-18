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

export const contentRegistry = {
  news: newsSchema,
  collaborators: collaboratorsSchema,
  events: eventsSchema,
  documents: documentsSchema,
  profile: profileSchema,
};

export const collaboratorSchema = collaboratorsSchema;

export function getSchema(type) {
  return contentRegistry[type] || null;
}
