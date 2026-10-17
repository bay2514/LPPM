# Rencana Pengelolaan Admin & Struktur Konten (Admin Plan)

Dokumen ini mendefinisikan jenis konten yang dapat dikelola oleh admin beserta field data masing-masing, serta persiapan arsitektur pengelolaan konten di LPPM Universitas Tiga Serangkai (TSU).

## 1. Jenis Konten yang Dapat Diubah Admin

| Jenis Konten | Deskripsi | Target Pengguna / Akses |
|--------------|-----------|------------------------|
| **Berita & Pengumuman** | Artikel, berita kegiatan, dan pengumuman resmi LPPM | Publik (Home, Berita) |
| **Dokumen Unduhan** | Panduan, SOP, template, SK, RAB, LPJ | Publik (Pusat Unduhan) |
| **Agenda / Kegiatan** | Jadwal webinar, sosialisasi, workshop, pelatihan | Publik (Kegiatan) |
| **Mitra & Kolaborator** | Daftar mitra strategis, industri, dan instansi | Publik (Kerjasama) |
| **Profil & Banner Utama** | Teks hero, sambutan ketua, informasi profil lembaga | Publik (Beranda & Profil) |
| **Data Statistik & Capaian** | Angka statistik penelitian, PKM, HKI, dan grafik PULSE | Publik (Beranda, Capaian) |

---

## 2. Struktur Data & Field per Jenis Konten

### A. Berita & Pengumuman (`news`)
- `id`: string/number (unik)
- `tag`: string ("Pengumuman" | "Berita" | "Agenda")
- `date`: string (YYYY-MM-DD)
- `title`: string (judul berita)
- `excerpt`: string / `content`: string (ringkasan & isi lengkap)
- `status`: string ("terbit" | "draf")

### B. Dokumen Unduhan (`documents`)
- `id`: string/number (unik)
- `slug`: string (URL-friendly string)
- `title`: string (nama dokumen)
- `description`: string (keterangan singkat)
- `category`: string ("Panduan" | "Template" | "SOP" | "SK" | "LPJ")
- `fileType`: string ("PDF" | "DOCX" | "XLSX")
- `year`: number (2024, 2025, 2026)
- `size`: string (contoh: "2.4 MB")
- `fileUrl`: string (path file / mock storage)

### C. Agenda / Kegiatan (`events`)
- `id`: string/number (unik)
- `day`: string ("12")
- `month`: string ("Mar")
- `title`: string (nama kegiatan)
- `meta`: string (lokasi / platform, misal: "Online via Zoom")
- `date`: string (YYYY-MM-DD)

### D. Mitra & Kolaborator (`collaborators`)
- `id`: string/number (unik)
- `name`: string (nama mitra / tokoh)
- `category` / `role`: string (kategori mitra / jabatan)
- `avatar` / `logo`: string (URL logo atau inisial)

---

## 3. Kebutuhan Backend (Untuk Ditinjau Tim Backend)
1. **Autentikasi & Otorisasi**: Hashing kata sandi (bcrypt/argon2), pembatasan percobaan login (rate limiting), proteksi CSRF.
2. **Keamanan Sesi**: Cookie session SPA Sanctum (HTTP-only, secure, samesite lax) tanpa menyimpan token sensitif di localStorage.
3. **Validasi & Sanitasi**: Validasi input di server, sanitasi HTML untuk rich text editor (mencegah XSS).
4. **Manajemen Berkas**: Validasi tipe MIME dan ukuran file unggahan (PDF, DOCX, XLSX, gambar max 2-5MB) di server.
5. **Log Aktivitas (Audit Trail)**: Pencatatan aktivitas admin (create, update, delete konten).
