# REVISI struktur menu LPPM (dari sketsa tangan pemilik)
Branch fe/implementasi-desain, folder frontend/. Hanya ubah struktur menu, rute,
dan halaman yang disebut di sini. Baca docs/design-spec.md dan
docs/IA_LPPM_TSU_Baru.md (jika ada; jika bertentangan dengan sketsa ini,
sketsa menang, tetapi laporkan).

## Struktur menu baru (kiri ke kanan)
1. Beranda -> /
2. Dashboard -> /dashboard   (urutan Beranda lalu Dashboard; simpan urutan di
   satu konfigurasi agar mudah ditukar)
3. Layanan LPPM (dropdown, tidak punya halaman sendiri)
   - Penelitian -> /layanan/penelitian
   - Pengabdian -> /layanan/pengabdian
   - Luaran (submenu) -> /layanan/luaran
       - Publikasi -> /layanan/luaran/publikasi
       - HKI -> /layanan/luaran/hki
       - Buku -> /layanan/luaran/buku
       - Monograf -> /layanan/luaran/monograf
   - KKN -> /layanan/kkn
   - Item kelima di sketsa tidak terbaca: JANGAN dibuat. Tulis sebagai
     pertanyaan di docs/revisi-nav-questions.md.
4. Info LPPM (dropdown, tidak punya halaman sendiri)
   - Agenda -> /info/agenda
   - Pengumuman -> /info/pengumuman
   - Dokumen -> /info/dokumen
   - Surat Penugasan -> /info/surat-penugasan (halaman daftar surat; jika
     pemilik ingin submenu, akan dikonfirmasi)
5. Login Admin tetap di kanan seperti sekarang.
Menu lama yang tidak ada di sketsa (Kerjasama, Kegiatan, Berita, Pengajuan,
Capaian): hapus dari menu, tetapi JANGAN hapus halaman dan datanya.

## Pengalihan rute lama (Navigate replace, tidak boleh 404)
/dokumen -> /info/dokumen, /kegiatan -> /info/agenda, /berita ->
/info/pengumuman, /luaran -> /layanan/luaran, /penelitian ->
/layanan/penelitian, /pengabdian -> /layanan/pengabdian, /capaian ->
/dashboard. Rute /kerjasama dan /pengajuan tetap berfungsi (tidak di menu);
catat di laporan agar pemilik memutuskan.

## Aturan umum
- Satu sumber untuk menu: src/shared/config/navigation.js (atau seed navigasi
  yang sudah ada) berbentuk pohon (label, path, anak). Navbar desktop, drawer
  HP, footer (kolom Layanan dan Info), breadcrumb halaman dalam, dan penanda
  menu aktif membaca dari sana. Tidak ada daftar menu yang ditulis ulang di
  komponen lain.
- Data konten lewat hook bersama (contentStore dan hook yang sudah ada). Jangan
  memanggil hook yang tidak diekspor; pastikan semua impor benar (bug
  sebelumnya: "usePublicData is not defined").
- Pakai komponen yang sudah ada (PageHero, Card, Badge, EmptyState, Skeleton).
  Tema dan token tidak diubah.

## TAHAP 1: menu dan rute
- Dropdown desktop: terbuka saat klik atau hover, tutup saat Esc, klik di luar,
  atau rute berubah. Submenu Luaran tampil sebagai flyout ke samping (di HP
  akordeon bertingkat). Keyboard: Enter atau Spasi membuka, Esc menutup, panah
  berpindah. aria-haspopup, aria-expanded, area sentuh minimal 44 px, fokus
  terlihat. Menu induk berstatus aktif jika salah satu anaknya aktif. Jangan
  memakai backdrop-blur pada elemen induk dari elemen fixed. Teks logo tidak
  boleh menabrak menu di lebar sempit.
- Daftarkan semua rute baru (lazy dan Suspense) sebagai halaman SEMENTARA
  yang memakai PageHero, judul, dan satu paragraf, plus pengalihan rute lama.
- Breadcrumb di halaman dalam (Beranda > Layanan LPPM > Luaran > Publikasi).

## TAHAP 2: halaman Layanan LPPM
- Penelitian, Pengabdian, KKN: PageHero, ringkasan program, 3 langkah alur,
  daftar kegiatan atau dokumen terkait dari data konten, tombol "Unduh
  panduan" ke /info/dokumen dengan filter kategori yang sesuai.
- Luaran (induk): kartu 4 jenis (Publikasi, HKI, Buku, Monograf) dengan
  jumlah masing-masing dan tautan ke sub-halamannya.
- Luaran/Publikasi, HKI, Buku, Monograf: daftar dengan pencarian, filter tahun,
  kartu (judul, penulis, tahun, jenis, tautan), EmptyState, skeleton. Satu
  komponen daftar yang dipakai keempatnya (parameter jenis).

## TAHAP 3: halaman Info LPPM
- Agenda (jadwal mendatang dan yang sudah lewat, tanggal, lokasi), Pengumuman
  (daftar dengan tanggal dan ringkasan, halaman detail), Dokumen (pindahkan
  halaman Dokumen yang ada), Surat Penugasan (tabel di desktop dan kartu di HP:
  nomor, perihal, tanggal, tahun, tombol unduh; pencarian dan filter tahun).

## TAHAP 4: admin dan data
- Jenis konten admin: Luaran dengan kolom jenis (Publikasi, HKI, Buku,
  Monograf), KKN, Surat Penugasan (nomor, perihal, tanggal, tahun, berkas),
  Agenda (ganti label dari Kegiatan), Pengumuman (ganti label dari Berita).
  Pakai mesin form yang sudah ada, bukan halaman terpisah per fitur.
- Jika ada pengaturan navigasi di admin, ubah seed ke struktur baru dan pastikan
  admin masih bisa mengubah urutan dan menyembunyikan item.
- Data contoh yang masuk akal untuk tiap jenis (tandai sebagai DATA CONTOH).

## TAHAP 5: QA
- `npm run build` bersih. Jalankan smoke test semua rute (baru dan lama) dan
  pastikan tidak ada error render, tidak ada 404 pada rute lama, tidak ada
  impor lintas sisi public dan admin. Perbarui docs/qa-checklist.md. Uji di
  lebar 390, 768, dan 1440 px: dropdown tidak terpotong, tidak ada scroll
  horizontal, teks tidak bertabrakan, kontras AA.

## Cara kerja
- Buat docs/REVISI-PROGRESS.md berisi 5 tahap sebagai checklist. Kerjakan SATU
  tahap lalu berhenti dan laporkan; lanjut hanya setelah saya bilang "lanjut".
  Setelah tiap tahap: build bersih, commit "feat(nav): <ringkasan>", centang.
- Jika sesi terputus, sesi baru membaca file ini, REVISI-PROGRESS.md, dan
  `git log`, lalu lanjut ke tahap berikutnya yang belum dicentang.
- Batasan: hanya branch fe/implementasi-desain; jangan push; jangan menyentuh
  folder Laravel; jangan mengubah logika auth; jangan menghapus halaman atau
  data lama; jangan install dependensi baru tanpa menyebut nama dan alasan;
  jangan menampilkan isi .env; tanya jika ada yang tidak jelas.
