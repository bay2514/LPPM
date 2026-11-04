/**
 * Data dummy untuk preview frontend.
 * Bentuk data disesuaikan dengan kontrak API di docs/api-contract.md.
 */

export const stats = [
  { id: "penelitian", label: "Penelitian Aktif", value: 42, sublabel: "Dosen dan mahasiswa", icon: "flask" },
  { id: "hki", label: "HKI Terdaftar", value: 28, sublabel: "Hak Cipta & Paten", icon: "award" },
  { id: "jurnal", label: "Jurnal Bereputasi", value: 88, sublabel: "Sinta & Scopus", icon: "bookOpen" },
  { id: "pkm", label: "PKM Berjalan", value: 19, sublabel: "Kemitraan komunitas", icon: "users" },
  { id: "mitra", label: "Mitra Kolaborasi", value: 34, sublabel: "Industri & pemerintah", icon: "handshake" },
  { id: "inovasi", label: "Produk Inovasi", value: 12, sublabel: "Tersertifikasi", icon: "lightbulb" },
];

export const services = [
  {
    id: "penelitian",
    title: "Penelitian & Hibah",
    description: "Fasilitas pendanaan riset internal dan eksternal (Simlitabmas) untuk dosen dan mahasiswa.",
    icon: "flask",
    status: "terbit",
    to: "/layanan/penelitian",
  },
  {
    id: "pengabdian",
    title: "Pengabdian Masyarakat",
    description: "Program pemberdayaan masyarakat, KKN tematik, dan pengembangan desa binaan.",
    icon: "users",
    status: "terbit",
    to: "/layanan/pengabdian",
  },
  {
    id: "publikasi",
    title: "Publikasi & Jurnal",
    description: "Layanan pendampingan artikel ilmiah, pengelolaan jurnal TSU Press, dan indeksasi Sinta/Scopus.",
    icon: "bookOpen",
    status: "terbit",
    to: "/layanan/publikasi",
  },
  {
    id: "hki",
    title: "Sentra Kekayaan Intelektual",
    description: "Pengurusan Hak Cipta, Paten, Merek, dan layanan pemeriksaan plagiarisme (Turnitin).",
    icon: "shield",
    status: "terbit",
    to: "/layanan/sentra-hki",
  },
];

export const news = [
  {
    id: "n1",
    tag: "Pengumuman",
    date: "2025-03-10",
    title: "Pengumuman Hasil Seleksi Program Hibah Penelitian Tahun 2025",
    excerpt: "LPPM mengumumkan hasil seleksi program hibah penelitian dosen dan mahasiswa tahun 2025.",
    status: "terbit",
    publishAt: "2025-03-10T00:00:00.000Z",
  },
  {
    id: "n2",
    tag: "Berita",
    date: "2025-03-08",
    title: "Workshop Penulisan Artikel Jurnal Bereputasi Sinta dan Scopus",
    excerpt: "Dalam rangka meningkatkan kualitas publikasi, LPPM mengadakan workshop intensif.",
    status: "terbit",
    publishAt: "2025-03-08T00:00:00.000Z",
  },
  {
    id: "n3",
    tag: "Agenda",
    date: "2025-03-05",
    title: "Pelatihan Manajemen Data Riset dan Sentra HKI",
    excerpt: "Pelatihan manajemen data riset dan pengenalan Sentra HKI bagi dosen baru.",
    status: "terbit",
    publishAt: "2025-03-05T00:00:00.000Z",
  },
];

export const events = [
  {
    id: "e1",
    day: "12",
    month: "Mar",
    title: "Webinar Metodologi Penelitian Kuantitatif",
    meta: "Online via Zoom",
    status: "terbit",
    publishAt: "2025-03-12T00:00:00.000Z",
  },
  {
    id: "e2",
    day: "15",
    month: "Mar",
    title: "Sosialisasi Hibah Penelitian Dosen 2025",
    meta: "Auditorium Rektorat",
    status: "terbit",
    publishAt: "2025-03-15T00:00:00.000Z",
  },
  {
    id: "e3",
    day: "20",
    month: "Mar",
    title: "Pengabdian Masyarakat di Desa Binaan",
    meta: "Desa Binaan TSU",
    status: "terbit",
    publishAt: "2025-03-20T00:00:00.000Z",
  },
  {
    id: "e4",
    day: "25",
    month: "Mar",
    title: "Klinik Penulisan Artikel Ilmiah",
    meta: "Ruang Klinik LPPM",
    status: "terbit",
    publishAt: "2025-03-25T00:00:00.000Z",
  },
];

export const collaborators = [
  { id: "c1", name: "Dr. Budi Santoso", role: "Ketua LPPM", label: "Pengelola", avatar: "#0B2C4D" },
  { id: "c2", name: "Prof. Siti Rahayu", role: "Kepala Sentra HKI", label: "HKI", avatar: "#2B7C8C" },
  { id: "c3", name: "Dr. Agus Wijaya", role: "Koordinator Publikasi", label: "Jurnal", avatar: "#F58220" },
  { id: "c4", name: "Maya Lestari, M.T.", role: "Kepala Lab Inovasi", label: "Inovasi", avatar: "#F2B01E" },
];

export const documents = [
  {
    id: "d1",
    slug: "panduan-penelitian-2025",
    title: "Panduan Penelitian Dosen dan Mahasiswa 2025",
    description: "Panduan lengkap alur pengajuan, penilaian, dan pelaporan penelitian internal.",
    category: "Panduan",
    fileType: "PDF",
    year: 2025,
    size: "2.4 MB",
    status: "terbit",
    publishAt: "2025-01-15T00:00:00.000Z",
  },
  {
    id: "d2",
    slug: "template-proposal-hibah",
    title: "Template Proposal Hibah Penelitian",
    description: "Format proposal hibah penelitian sesuai standar LPPM dan Kemendikbudristek.",
    category: "Template",
    fileType: "DOCX",
    year: 2025,
    size: "450 KB",
    status: "terbit",
    publishAt: "2025-01-15T00:00:00.000Z",
  },
  {
    id: "d3",
    slug: "sop-pengabdian-masyarakat",
    title: "SOP Pengabdian kepada Masyarakat",
    description: "Standar operasional pelaksanaan program pengabdian masyarakat berbasis kemitraan.",
    category: "SOP",
    fileType: "PDF",
    year: 2024,
    size: "1.1 MB",
    status: "terbit",
    publishAt: "2024-09-01T00:00:00.000Z",
  },
  {
    id: "d4",
    slug: "sk-hki",
    title: "SK Kebijakan Hak Kekayaan Intelektual",
    description: "Kebijakan internal tentang pendaftaran, pemeliharaan, dan insentif HKI.",
    category: "SK",
    fileType: "PDF",
    year: 2024,
    size: "890 KB",
    status: "terbit",
    publishAt: "2024-06-01T00:00:00.000Z",
  },
  {
    id: "d5",
    slug: "rab-penelitian",
    title: "Format RAB Penelitian Internal",
    description: "Template rencana anggaran biaya untuk program penelitian dosen dan mahasiswa.",
    category: "Template",
    fileType: "XLSX",
    year: 2025,
    size: "320 KB",
    status: "terbit",
    publishAt: "2025-01-15T00:00:00.000Z",
  },
  {
    id: "d6",
    slug: "lpj-pengabdian",
    title: "Format LPJ Pengabdian Masyarakat",
    description: "Panduan laporan pertanggungjawaban pengabdian masyarakat semester genap.",
    category: "LPJ",
    fileType: "PDF",
    year: 2024,
    size: "670 KB",
    status: "terbit",
    publishAt: "2024-09-01T00:00:00.000Z",
  },
];

export const capaianKPI = [
  { id: "kpi1", label: "Penelitian Aktif", value: 42, sublabel: "Tahun berjalan" },
  { id: "kpi2", label: "PKM Aktif", value: 28, sublabel: "Tahun berjalan" },
  { id: "kpi3", label: "Publikasi Ilmiah", value: 86, sublabel: "Terindeks" },
  { id: "kpi4", label: "HKI Terdaftar", value: 19, sublabel: "Cipta & Paten" },
  { id: "kpi5", label: "Mitra Sinergi", value: 34, sublabel: "Industri & pemerintah" },
  { id: "kpi6", label: "Dosen Terlibat", value: 12, sublabel: "Aktif meneliti" },
];

export const analytics = {
  quarters: [
    { quarter: "Q1", penelitian: 12, pengabdian: 8 },
    { quarter: "Q2", penelitian: 18, pengabdian: 14 },
    { quarter: "Q3", penelitian: 24, pengabdian: 20 },
    { quarter: "Q4", penelitian: 30, pengabdian: 26 },
  ],
  totalFunding: "Rp 1,84 M",
  totalProposals: 70,
};

export const latestOutputs = [
  {
    id: "lo1",
    tag: "Jurnal",
    year: 2025,
    title: "Pengembangan Model Ekosistem Digital Riset Berbasis Dampak Sosial",
    description: "Studi mengenai model ekosistem digital riset yang berbasis dampak sosial dengan pendekatan kemitraan multidisiplin.",
    status: "terbit",
    publishAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "lo2",
    tag: "HKI",
    year: 2025,
    title: "Sistem Manajemen Data Penelitian Terintegrasi",
    description: "Platform manajemen data penelitian dan pengabdian masyarakat terintegrasi berbasis web.",
    status: "terbit",
    publishAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: "lo3",
    tag: "Buku",
    year: 2024,
    title: "Metodologi Penelitian Kuantitatif dan Kualitatif Terapan",
    description: "Buku ajar metodologi penelitian terapan untuk mahasiswa program pascasarjana.",
    status: "terbit",
    publishAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "lo4",
    tag: "Monograf",
    year: 2024,
    title: "Monograf Analisis Kebijakan Ekonomi Kreatif Daerah",
    description: "Kajian mendalam mengenai pengembangan ekonomi kreatif daerah berbasis potensi lokal.",
    status: "terbit",
    publishAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "lo5",
    tag: "Produk",
    year: 2024,
    title: "Aplikasi Monitoring Capaian Penelitian Real-Time",
    description: "Aplikasi berbasis web untuk monitoring capaian penelitian dan publikasi dosen secara real-time.",
    status: "terbit",
    publishAt: "2024-01-01T00:00:00.000Z",
  },
];
