# Audit & Perbandingan (UI v2)

Dokumen ini mencatat hasil audit TAHAP 0, membandingkan struktur kode saat ini di `frontend/src/public/` dengan spesifikasi `docs/design-spec-v2.md` dan screenshot di `docs/design-v2/`.

## 1. Pemetaan Screenshot ke Halaman & Status Kode Saat Ini

| No (Spek) | Nama Halaman | Rute | Status di Kode Saat Ini | Catatan Perbedaan / Kekurangan |
|---|---|---|---|---|
| 01 | Beranda (Figma Make) | `/` | Ada (`Home.jsx`) | Perlu penyesuaian warna hero ke biru TSU (`#3466af`), Quick Access, Pita KPI, dan Pulse LPPM. |
| 02 | Beranda (Penuh) | `/` | Ada (`Home.jsx`) | Perlu penyempurnaan seksi Layanan Utama dan Berita. |
| 03 | Profil: Tentang LPPM | `/profil/tentang` | Ada (`PlaceholderPage.jsx` / perlu dibuat) | Belum sesuai spesifikasi detail (target IKU, program kerja 2026, dll). |
| 04 | Lanjutan Tentang LPPM | `/profil/tentang` | Belum lengkap | Perlu integrasi bagian laboratorium dan fakultas/prodi. |
| 05-06 | Visi dan Misi | `/profil/visi-misi` | Belum spesifik | Perlu halaman khusus dengan styling baru. |
| 07 | Struktur Organisasi | `/profil/struktur` | Belum spesifik | Perlu komponen bagan organisasi. |
| 08-09 | Kontak Kami | `/profil/kontak` | Belum spesifik | Perlu info kontak dan peta/form. |
| 10 | Penelitian (Dasbor Pendanaan) | `/layanan/penelitian` | Ada (`Penelitian.jsx`) | Perlu perbaikan dasbor pendanaan (donat per prodi, filter tahun, batang bertumpuk, tabel alternatif). |
| 11-12 | Pengabdian kepada Masyarakat | `/layanan/pengabdian` | Ada (`Pengabdian.jsx`) | Perlu penyesuaian dengan desain baru. |
| 13 | Luaran: Publikasi Ilmiah | `/layanan/luaran/publikasi` | Ada (`Publikasi.jsx`) | Perlu komponen bersama daftar luaran. |
| 14 | Sentra HKI | `/layanan/luaran/hki` | Ada (`HKI.jsx`) | Perlu penyesuaian kartu dan data. |
| 15 | Monograf | `/layanan/luaran/monograf` | Ada (`Monograf.jsx`) | Perlu penyesuaian tampilan. |
| 16 | Buku | `/layanan/luaran/buku` | Ada (`Buku.jsx`) | Perlu penyesuaian tampilan. |
| 17 | KKN | `/layanan/kkn` | Ada (`KKN.jsx`) | Perlu penyesuaian tampilan. |
| 18 | e-Jurnal | `/layanan/e-jurnal` | Ada | Perlu judul serif, kartu jurnal, alur lima langkah, dan statistik. |
| 19-20 | Kerjasama | `/layanan/kerjasama` | Ada (`Kerjasama.jsx`) | Perlu penyesuaian tampilan. |
| 21 | Agenda Kegiatan LPPM | `/info/agenda` | Ada (`Kegiatan.jsx`) | Perlu penyesuaian dengan rute `/info/agenda`. |
| 22 | Pengumuman Terbaru | `/info/pengumuman` | Ada (`Berita.jsx`) | Perlu halaman detail pengumuman. |
| 23 | Dokumen dan Panduan | `/info/dokumen` | Ada (`Documents.jsx`) | Perlu penyesuaian Pusat Dokumen. |
| 24 | Surat Penugasan (Form) | `/info/surat-penugasan` | Ada (`SuratPenugasan.jsx`) | Perlu form bergaya formulir dengan 5 jenis, skema, dan validasi. |
| 25 | Modal Login Admin | Modal (Global) | Belum ada modal | Saat ini login masih berupa halaman terpisah (`/admin/login`), harus diubah menjadi modal dua panel dari navbar. |

## 2. Temuan Utama Audit
- Struktur rute sudah ada banyak dalam bentuk halaman placeholder atau halaman terpisah, tetapi belum disatukan di bawah navigasi baru (Dashboard, Beranda, Profil, Layanan LPPM, Info LPPM) dengan dropdown/flyout yang benar.
- Warna tema masih menggunakan navy gelap, perlu diganti ke biru TSU (`#3466af`) sesuai spesifikasi token baru.
- Modal login admin belum diimplementasikan (masih halaman terpisah).
- Komponen grafik dan analitik (seperti donat pendanaan per prodi dan Pulse LPPM) memerlukan komponen SVG kustom atau perbaikan styling.
