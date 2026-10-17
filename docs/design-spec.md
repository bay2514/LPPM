# SPESIFIKASI DESAIN UTAMA (DESIGN SPECIFICATION) - LPPM TSU
Acuan Mutlak untuk Implementasi Frontend (VERSI B)

## 1. DESIGN TOKENS (WARNA, FONT, RADIUS, BAYANGAN, CONTAINER)
- **Aturan Emas**: Wajib menggunakan **VERSI B** (Hero gelap Navy `#0B2C4D`, Oranye `#ff6b35` / `#F58220`). Dilarang mencampur dengan Versi A.
- **Palet Warna**:
  - `primary`: `#0B2C4D` (Navy Utama)
  - `primary-dark`: `#071d33` (Navy Gelap)
  - `accent` / `orange`: `#ff6b35` atau `#F58220` (Oranye CTA / Aksen)
  - `teal`: `#2B7C8C` (Aksen Pendukung)
  - `gold`: `#F2B01E` (Badge / Peringkat)
  - `background`: `#F8FAFC` (Latar belakang halaman)
  - `surface`: `#FFFFFF` (Kartu / Kotak putih)
  - `text-main`: `#1E293B` (Teks utama / heading)
  - `text-muted`: `#64748B` (Teks sekunder / deskripsi)
  - `border`: `#E2E8F0` (Garis pembatas kartu)
- **Font**: Inter / Poppins / Sans-serif modern.
- **Border Radius**: 
  - Kartu: `12px` (`rounded-xl`)
  - Tombol / Badge: `8px` (`rounded-lg`) atau `6px` (`rounded-md`)
- **Bayangan (Shadow)**:
  - Kartu standar: `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)` (`shadow-card`)
  - Kartu hover / elevated: `0 10px 15px -3px rgba(0,0,0,0.1)`
- **Container**: `max-w-7xl` (`max-w-container` / `max-w-[1200px]`), padding horizontal responsif (`px-4 md:px-6 lg:px-8`).

## 2. TOP BAR, NAVBAR (+ DROPDOWN), DAN FOOTER
- **Top Bar**:
  - Background: `#102c4c` (Dark Navy)
  - Tinggi: `~44px`
  - Kiri: Titik oranye (`#f37021`) + Teks lokasi ("Surakarta, Indonesia"), Putih, tebal.
  - Kanan: Email ("lppm@utp.ac.id" / "lppm@tsu.ac.id") dan tautan "Login Admin".
- **Navbar**:
  - Background: Putih (`#FFFFFF`) dengan border bawah tipis (`#E2E8F0`).
  - Logo: `logo-lppm-tsu.png` di kiri dengan teks "LPPM TSU".
  - Menu: Beranda, Layanan (Dropdown: Penelitian, Pengabdian, Kerjasama), Pusat Studi & Unit, Dokumen & SOP, Capaian & Luaran, Kontak.
  - Dropdown Menu: Latar putih, border tipis, teks abu-abu gelap, hover abu-abu terang.
- **Footer**:
  - Background utama: `#0F2744` (Navy gelap), Bar Copyright: `#0A1C33` (Navy lebih gelap).
  - Kolom 1: Logo & Deskripsi singkat LPPM Universitas Tiga Serangkai.
  - Kolom 2: Menu Cepat (Pusat Dokumen, Agenda & Pengumuman, Dashboard Luaran).
  - Kolom 3: Kontak (Alamat Gedung Rektorat Lt. 2, Email, Telepon).
  - Copyright: © Tahun LPPM Universitas Tiga Serangkai. All Rights Reserved.

## 3. HALAMAN UTAMA & MODUL LAIN
### 3.1 Beranda (Hero & Sections)
- **Hero Section**: Background Navy Gelap (`#0B2C4D`), Judul besar "Ekosistem Digital Penelitian, Pengabdian, Publikasi, dan Sentra HKI", tombol CTA "Masuk Portal" (Oranye) dan "Lihat Layanan" (Outline Putih). Di sebelah kanan: Kartu Quick Access Portal.
- **Statistik / Angka**: 6 kotak statistik dengan angka oranye (Penelitian, Publikasi, Pengabdian, HKI, Kerjasama, Unit).
- **Layanan Utama**: 3 kartu utama (Penelitian, Pengabdian, HKI) dan kartu pendukung (Publikasi, Penghargaan) dengan tag oranye dan border halus.
- **Berita & Pengumuman**: Daftar kartu berita dengan tanggal, kategori, judul, dan cuplikan.
- **Agenda & Kolaborasi**: Kolom kiri (Agenda Terdekat dengan nomor urut), Kolom kanan (Kolaborasi dan Desa Binaan).

### 3.2 Capaian & Luaran (Capaian)
- Ringkasan grafik/tabel capaian riset, publikasi internasional/nasional, HKI terdaftar, dan luaran pengabdian per tahun.

### 3.3 Pusat Dokumen (Pusat Unduhan)
- Daftar kategori dokumen (Panduan Penelitian, SK Hibah, Format Laporan, SOP) dengan tombol unduh/download yang jelas.

### 3.4 Dashboard / Admin Login
- Halaman portal login admin terpisah (`/admin/login`) dengan keamanan dan estetika yang selaras.
