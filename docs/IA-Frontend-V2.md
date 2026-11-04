# Information Architecture (IA) - LPPM TSU (Revisi Desain V2)

Dibuat berdasarkan struktur folder frontend terbaru dan sinkronisasi dengan mockup Figma (Versi B).

## 1. Navigasi Utama (Public)

### A. Dashboard & Beranda
- **Dashboard (`/dashboard`)**: Visualisasi data (chart, statistik) kinerja LPPM secara keseluruhan.
- **Beranda (`/`)**: Landing page utama (Hero, Quick Access, Layanan Utama, Berita & Pengumuman).

### B. Profil
- **Tentang LPPM (`/profil/tentang`)**: Sejarah dan deskripsi lembaga.
- **Visi dan Misi (`/profil/visi-misi`)**: Fokus strategis lembaga.
- **Struktur Organisasi (`/profil/struktur`)**: Bagan hierarki kepemimpinan.
- **Kontak Kami (`/profil/kontak`)**: Informasi alamat, email, dan peta lokasi.

### C. Layanan LPPM
- **Penelitian (`/layanan/penelitian`)**: Daftar dan arsip penelitian dosen.
- **Pengabdian (`/layanan/pengabdian`)**: Program PkM (Pengabdian kepada Masyarakat).
- **Luaran (`/layanan/luaran`)**: 
  - **Publikasi (`/layanan/luaran/publikasi`)**: Jurnal, prosiding, dan artikel ilmiah.
  - **HKI (`/layanan/luaran/hki`)**: Hak Kekayaan Intelektual (Paten, Hak Cipta).
  - **Buku (`/layanan/luaran/buku`)**: Koleksi buku hasil riset.
  - **Monograf (`/layanan/luaran/monograf`)**: Laporan ilmiah spesifik.
- **KKN (`/layanan/kkn`)**: Informasi Kuliah Kerja Nyata.
- **E-Jurnal (`/layanan/e-jurnal`)**: Tautan ke portal OJS universitas.
- **Kerjasama (`/layanan/kerjasama`)**: Mitra instansi dan desa binaan.

### D. Info LPPM
- **Agenda (`/info/agenda`)**: Jadwal kegiatan berjalan (workshop, deadline hibah).
- **Pengumuman (`/info/pengumuman`)**: Berita terbaru dan pengumuman resmi.
- **Dokumen (`/info/dokumen`)**: Pusat unduh (Panduan, Form, Template).
- **Surat Penugasan (`/info/surat-penugasan`)**: Verifikasi dokumen tugas dosen.

---

## 2. Navigasi Admin (`/admin`)

Khusus untuk pengelola konten (Back-office):

- **Login Admin (`/admin/login`)**: Autentikasi pengelola.
- **Dashboard Admin (`/admin/dashboard`)**: Overview pengelolaan konten.
- **Pengaturan Dashboard (`/admin/dashboard/settings`)**: Konfigurasi chart dan statistik publik.
- **Manajemen Konten (`/admin/content`)**: 
  - Edit Berita & Pengumuman.
  - Kelola Dokumen & File.
  - Kelola Agenda & Kegiatan.
  - Kelola Data Mitra & Kolaborasi.
- **Profil Admin (`/admin/profile`)**: Pengaturan akun pengelola.

---

## 3. Komponen Shared (UI System)
- **UI Components**: Button, Card, Badge, Modal, Container, Icons.
- **Forms**: Input, Select, Textarea (Reusable).
- **Layouts**: Navbar (Sticky), Footer (Multi-column), UtilityBar (Top info).
- **Hooks**: `usePublicData` untuk fetch konten dinamis.
