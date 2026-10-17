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
    id: "hibah-dosen",
    title: "Hibah Penelitian Dosen / Pemula",
    description: "Bantuan pendanaan riset untuk dosen dan pemula dengan mekanisme seleksi berbasis kualitas proposal.",
    icon: "flask",
  },
  {
    id: "pengabdian-kemitraan",
    title: "Hibah Pengabdian Kemitraan",
    description: "Program pengabdian masyarakat berbasis kemitraan untuk menjangkau masyarakat luas.",
    icon: "users",
  },
  {
    id: "ppm-reward",
    title: "PPM Berbasis Reward",
    description: "Insentif berbasis pencapaian luaran ilmiah dan hak kekayaan intelektual.",
    icon: "award",
  },
  {
    id: "klinik-publikasi",
    title: "Klinik Publikasi Bereputasi",
    description: "Pendampingan menulis, tata bahasa, strategi submit, dan peer review artikel jurnal.",
    icon: "bookOpen",
  },
  {
    id: "hki",
    title: "Pendampingan Hak Cipta dan HKI",
    description: "Pengurusan HKI mulai dari pendaftaran hingga pemeliharaan kekayaan intelektual.",
    icon: "shield",
  },
  {
    id: "jurnal-repositori",
    title: "Akses Jurnal & Repositori",
    description: "Akses terbuka ke jurnal internal dan repositori publikasi seluruh civitas akademika.",
    icon: "externalLink",
  },
];

export const news = [
  {
    id: "n1",
    tag: "Pengumuman",
    date: "2025-03-10",
    title: "Pengumuman Hasil Seleksi Program Hibah Penelitian Tahun 2025",
    excerpt: "LPPM mengumumkan hasil seleksi program hibah penelitian dosen dan mahasiswa tahun 2025.",
  },
  {
    id: "n2",
    tag: "Berita",
    date: "2025-03-08",
    title: "Workshop Penulisan Artikel Jurnal Bereputasi Sinta dan Scopus",
    excerpt: "Dalam rangka meningkatkan kualitas publikasi, LPPM mengadakan workshop intensif.",
  },
  {
    id: "n3",
    tag: "Agenda",
    date: "2025-03-05",
    title: "Pelatihan Manajemen Data Riset dan Sentra HKI",
    excerpt: "Pelatihan manajemen data riset dan pengenalan Sentra HKI bagi dosen baru.",
  },
];

export const events = [
  {
    id: "e1",
    day: "12",
    month: "Mar",
    title: "Webinar Metodologi Penelitian Kuantitatif",
    meta: "Online via Zoom",
  },
  {
    id: "e2",
    day: "15",
    month: "Mar",
    title: "Sosialisasi Hibah Penelitian Dosen 2025",
    meta: "Auditorium Rektorat",
  },
  {
    id: "e3",
    day: "20",
    month: "Mar",
    title: "Pengabdian Masyarakat di Desa Binaan",
    meta: "Desa Binaan TSU",
  },
  {
    id: "e4",
    day: "25",
    month: "Mar",
    title: "Klinik Penulisan Artikel Ilmiah",
    meta: "Ruang Klinik LPPM",
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
  },
  {
    id: "d4",
    slug: "sk-kebijakan-hki",
    title: "SK Kebijakan Hak Kekayaan Intelektual",
    description: "Kebijakan internal tentang pendaftaran, pemeliharaan, dan insentif HKI.",
    category: "SK",
    fileType: "PDF",
    year: 2024,
    size: "890 KB",
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
  },
  {
    id: "lo2",
    tag: "HKI",
    year: 2025,
    title: "Sistem Manajemen Data Penelitian Terintegrasi",
    description: "Platform manajemen data penelitian dan pengabdian masyarakat terintegrasi berbasis web.",
  },
  {
    id: "lo3",
    tag: "Buku",
    year: 2024,
    title: "Metodologi Penelitian Kuantitatif dan Kualitatif Terapan",
    description: "Buku ajar metodologi penelitian terapan untuk mahasiswa program pascasarjana.",
  },
  {
    id: "lo4",
    tag: "Produk",
    year: 2024,
    title: "Aplikasi Monitoring Capaian Penelitian Real-Time",
    description: "Aplikasi berbasis web untuk monitoring capaian penelitian dan publikasi dosen secara real-time.",
  },
];
