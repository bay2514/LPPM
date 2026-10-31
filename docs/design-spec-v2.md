# Spesifikasi Desain v2: Portal LPPM Universitas Tiga Serangkai (TSU)

Sumber: 24 screenshot preview Figma Make (tampilan situs desktop) di
`docs/design-v2/`. Dokumen ini MENGGANTIKAN `docs/design-spec.md` (Versi B,
hero navy gelap) dan struktur menu di `docs/REVISI-NAV.md`. Jika dokumen ini
bertentangan dengan gambar, gambar yang menang; laporkan, jangan menebak.

Tanda: **[ukur]** diambil dari piksel gambar, **[perkiraan]** hanya tebakan
dari gambar beresolusi rendah, **[baca]** teks dibaca dari gambar kecil dan
perlu diperiksa ejaannya sebelum dianggap final.

## 0. Perubahan besar dibanding versi sebelumnya
1. Warna hero, footer, dan tombol sekunder berubah dari navy gelap menjadi
   **biru TSU `#3466af`**. Oranye aksen tetap, tetapi sedikit lebih terang.
2. Menu baru: **Dashboard, Beranda, Profil, Layanan LPPM, Info LPPM** (tiga
   terakhir berupa dropdown) dan "Login Admin" sebagai teks biasa di kanan.
3. Halaman baru: Profil (Tentang, Visi dan Misi, Struktur Organisasi,
   Kontak Kami), Penelitian dan Pengabdian bergaya dasbor, Luaran (Publikasi,
   HKI, Buku, Monograf), KKN, e-Jurnal, Kerjasama, Agenda, Pengumuman,
   Dokumen, dan Surat Penugasan (form).
4. Data di desain adalah angka riil LPPM (bukan data contoh lama): 114
   penelitian, 74 PkM, 311 publikasi, 50 HKI, dan seterusnya. Pakai sebagai
   data awal (seed), tetap bisa diubah admin.

## 1. Token desain
| Token | Nilai | Dipakai untuk |
|---|---|---|
| `--brand` | `#3466af` [ukur] | Hero, footer, panel utama, kartu "Total Keseluruhan" |
| `--brand-deep` | `#2a548e` [ukur] | Panel di atas latar biru (kartu analitik), hover |
| `--accent` | `#f97216` [ukur] | Eyebrow, tombol utama, tautan "Selengkapnya", angka sorotan |
| `--bg-alt` | `#f1f4f9` [ukur] | Seksi berlatar abu kebiruan |
| `--bg-page` | `#fafcfd` [ukur] | Latar halaman, putih untuk kartu |
| `--ink` | `#0f172a` [perkiraan] | Judul dan teks utama |
| `--muted` | `#64748b` [perkiraan] | Deskripsi dan teks kecil |
| `--on-brand-muted` | `#c9d6ea` [perkiraan] | Paragraf di atas biru |
| `--ext` / `--int` / `--self` | `#0ea5e9` / `#f97316` / `#8b5cf6` [perkiraan] | Seri grafik: eksternal, internal, mandiri |
Pastikan kontras teks minimal 4,5:1 (khususnya teks kecil abu-abu dan teks
oranye di atas putih; jika kurang, gelapkan sedikit warnanya).

Tipografi [perkiraan]: sans-serif bergaya Roboto/Inter, judul tebal dengan
tracking rapat. Hero e-Jurnal memakai judul **serif** (Source Serif atau Noto
Serif) dan angka serif. Eyebrow: huruf kapital 11 sampai 12 px, tebal,
letter-spacing 0.08em, oranye. Teks kecil minimal 12 px.
Bentuk: kartu putih radius 12 sampai 16 px dengan border tipis dan bayangan
lembut, tombol pill atau radius 8 px, ikon KPI dalam kotak pastel.
Container maksimum sekitar 1200 px, padding samping 24 px (desktop), 16 px (HP).

## 2. Komponen global
- **Navbar** (putih, sticky): kiri logo (kotak gambar LPPM) dengan dua baris teks
  "LPPM" dan "UNIVERSITAS TIGA SERANGKAI"; tengah menu kecil semi-bold:
  Dashboard, Beranda, Profil v, Layanan LPPM v, Info LPPM v; kanan "Login Admin"
  (teks tebal tanpa kotak). Menu yang terbuka berwarna lebih gelap.
- **Dropdown** (kartu putih, bayangan, item teks kecil):
  - Layanan LPPM: Penelitian, Pengabdian, **Luaran >** (flyout ke kanan:
    Publikasi, HKI, Buku, Monograf), KKN, E-Jurnal, Kerjasama.
  - Info LPPM: Agenda, Pengumuman, Dokumen, Surat Penugasan.
  - Profil: Tentang LPPM, Visi dan Misi, Struktur Organisasi, Kontak Kami
    [perkiraan; urutan dan label dibaca dari halaman yang ada].
  - Di HP menjadi drawer dengan akordeon bertingkat.
- **PageHero** (halaman dalam): latar `--brand`, badge pill kecil oranye di
  atas judul (mis. "RISET & KAJIAN", "INFO LPPM"), judul putih besar tebal,
  paragraf `--on-brand-muted`, tinggi sekitar 200 px. Dipakai di SEMUA halaman
  dalam agar konsisten.
- **Section header**: eyebrow oranye kapital, judul H2 besar tebal gelap,
  deskripsi abu.
- **Footer** (latar `--brand`): kotak logo oranye "TSU" + "LPPM TSU" + deskripsi,
  kolom LAYANAN, TAUTAN CEPAT, KONTAK (alamat, email, telepon), garis tipis,
  hak cipta dan "Developed by IT Div TSU". Isi teks ikuti gambar.
- **Kartu layanan**: eyebrow kategori oranye, judul tebal, deskripsi 2 baris,
  tautan oranye "Selengkapnya ->".

## 3. Peta screenshot ke halaman (urut nama berkas)
| No | Halaman | Rute |
|---|---|---|
| 01 | Beranda (tampilan Figma Make) | / |
| 02 | Beranda (penuh) | / |
| 03 | Profil: Tentang LPPM (judul "LPPM Tiga Serangkai") | /profil/tentang |
| 04 | Lanjutan Tentang LPPM (target IKU, program kerja 2026, tema unggulan dan laboratorium, fakultas dan prodi, jurnal, akses cepat) | /profil/tentang |
| 05, 06 | Visi dan Misi | /profil/visi-misi |
| 07 | Struktur Organisasi (bagan) | /profil/struktur |
| 08, 09 | Kontak Kami (09 memperlihatkan dropdown Layanan) | /profil/kontak |
| 10 | Penelitian (dasbor pendanaan) | /layanan/penelitian |
| 11, 12 | Pengabdian kepada Masyarakat (12 memperlihatkan flyout Luaran) | /layanan/pengabdian |
| 13 | Luaran: Publikasi Ilmiah | /layanan/luaran/publikasi |
| 14 | Sentra HKI | /layanan/luaran/hki |
| 15 | Monograf | /layanan/luaran/monograf |
| 16 | Buku | /layanan/luaran/buku |
| 17 | KKN (Kuliah Kerja Nyata) | /layanan/kkn |
| 18 | e-Jurnal Universitas Tiga Serangkai | /layanan/e-jurnal |
| 19, 20 | Kerjasama (20 memperlihatkan dropdown Info) | /layanan/kerjasama |
| 21 | Agenda Kegiatan LPPM | /info/agenda |
| 22 | Pengumuman Terbaru | /info/pengumuman |
| 23 | Dokumen dan Panduan (Pusat Dokumen) | /info/dokumen |
| 24 | Surat Penugasan (form) | /info/surat-penugasan |
Menu "Dashboard" (/dashboard) tidak punya screenshot sendiri; pertahankan
dashboard yang ada dan hanya selaraskan warna, hero, dan komponennya.

## 4. Detail halaman yang sudah dibaca dengan jelas [baca]

### Beranda (02)
1. Hero biru, dua kolom. Kiri: eyebrow "PORTAL LPPM TSU", H1 "Ekosistem Digital
   Penelitian, Pengabdian, Publikasi, dan Sentra HKI", paragraf "Pusat data dan
   layanan terbaru LPPM Universitas Tiga Serangkai untuk mendukung riset,
   inovasi, pengabdian, dan kolaborasi.", tombol oranye "Mulai Penelitian" dan
   tombol outline "Pusat Dokumen". Kanan: kartu putih "Quick Access Portal"
   berisi 4 baris dengan panah: Data Penelitian (Program dan dokumen riset),
   Pengabdian kepada Masyarakat (Program PKM dan desa binaan), Luaran &
   Publikasi (Artikel dan jurnal ilmiah), Sentra HKI (Hak cipta dan paten).
2. Pita putih berisi 6 kartu KPI dengan ikon dalam kotak pastel: 114 Penelitian
   (Rekap 2022-2026), 74 Kegiatan PkM (Rekap 2022-2026), 311 Publikasi Ilmiah
   (Rekap 2022-2026), 50 HKI Terpetakan (Baseline Roadmap 2025), 10 Program
   Studi (3 Fakultas, 10 Prodi), 12 Laboratorium Riset (Terpetakan dalam Renop).
3. Seksi biru "PULSE LPPM": kiri judul "Kinerja LPPM berdasarkan tahun.",
   paragraf "Monitor rekap penelitian dan pengabdian 2022-2026, lengkap dengan
   nilai pendanaan yang siap dibaca pimpinan.", tautan "Telusuri publikasi di
   e-Jurnal TSU ->". Kanan: panel `--brand-deep` "ANALITIK KINERJA / Semua Prodi"
   dengan dua select (tahun 2026, Semua Prodi), dua kotak ringkas (Total
   pendanaan Rp 563,29 Jt dengan -13,4% dari tahun lalu; Luaran terbit 53,
   Penelitian + pengabdian), dan grafik area dua seri 2023 sampai 2026:
   Penelitian (oranye) 14, 18, 33, 40 dan Pengabdian (biru) 14, 15, 13, 13.
4. "LAYANAN TERPADU / Layanan Utama LPPM": 5 kartu (3 + 2): Hibah Penelitian
   Dosen Pemula (HIBAH INTERNAL), Hibah Penelitian Kolaboratif (KOLABORASI),
   PKM Desa Binaan (DESA BINAAN), Klinik Publikasi Ilmiah (PUBLIKASI),
   Pendampingan Hak Cipta dan Paten (SENTRA HKI).
5. Seksi abu "INFORMASI TERKINI / Berita dan Pengumuman": kartu dengan label
   (DOKUMEN, JURNAL), tanggal di kanan, judul, ringkasan, "Baca pengumuman ->".
   Satu kartu bersorot border oranye.
6. Dua daftar: "Kegiatan Terdekat" dan "Kolaborasi dan Desa Binaan".

### Penelitian (10)
Hero: badge "RISET & KAJIAN", H1 "Penelitian", paragraf pendek. Seksi
"STATISTIK / Kinerja Pendanaan Penelitian": kartu besar "ANALITIK PENDANAAN /
Pendanaan Penelitian per Prodi" dengan filter tahun, catatan kuning muda
(estimasi 2026), 4 kartu ringkas: Total Eksternal Rp 28 Jt (6%), Total Internal
Rp 44,4 Jt (10%), Total Mandiri Rp 387,7 Jt (84%), Total Keseluruhan Rp 460,1
Jt (kartu biru, "Akumulasi 10 prodi"). Lalu "RINCIAN PROPORSI / Komposisi dana
tiap program studi": grid 4 kolom kartu donat per prodi (Informatika S1 256,3
Jt; Sistem Informasi S1 21,4 Jt; Rekayasa Komputer S1 2,6 Jt; Manajemen S1
12,9 Jt; Psikologi S1 13,9 Jt; PGSD S1 tanpa kegiatan; Teknologi Informasi D3
35,5 Jt; Sistem Informasi D3 81,4 Jt; Desain Komunikasi Visual D3; Desain
Produk Tekstil D3), tiap kartu punya legenda Eksternal, Internal, Mandiri
dengan nominal dan persen. Setelah itu grafik batang bertumpuk per tahun, lalu
"Program Penelitian" dan "Tujuh tema riset unggulan LPPM" (ikuti gambar 10).
Donat harus bisa diklik atau difokus dan punya tabel alternatif.

### e-Jurnal (18)
Hero biru dengan gradasi halus ke ungu keabuan: eyebrow "OPEN ACCESS · TSU
PRESS", judul SERIF "e-Jurnal Universitas Tiga Serangkai", paragraf, tombol
outline "Kunjungi e-Jurnal TSU", dan blok statistik di kanan (04 Jurnal aktif,
311 Publikasi 2022-2026, 04 Di pengelola jurnal) dengan angka serif krem.
"TERBITAN PILIHAN / Jurnal di bawah naungan TSU" dengan tautan "Kembali ke
publikasi ->": 4 kartu jurnal (2x2), tiap kartu punya sampul berwarna dengan
tulisan "TSU JOURNAL" dan nomor (teal, cokelat, biru tua, ungu), kategori
oranye, judul (Jurnal Ilmiah Sinus (JIS); TIKomSiN; Lavanya: Journal of Art;
Sinergia: Journal of Community Services), "Periode pengelola 2026-2027 · SK
...", chip "Resmi TSU", tautan "Lihat edisi ->". "ALUR PENGIRIMAN NASKAH /
Dari naskah hingga terbit dalam lima langkah": 5 kartu bernomor (01 Siapkan
naskah, 02 Daftar akun OJS, 03 Kirim online, 04 Telaah dan review, 05 Revisi
dan terbit) dengan label kecil di bawah tiap kartu. Ditutup banner CTA biru
dengan tombol oranye dan tombol outline.

### Surat Penugasan (24)
Hero "Surat Penugasan" (badge INFO LPPM). Judul "Permohonan Surat Penugasan".
Teks bantuan: isian bertanda bintang merah wajib; data tersimpan di peramban
dan belum terhubung ke server. Kiri: 5 tombol biru jenis form (Hak Cipta;
Buku Referensi/Monograf/Book Chapter; Surat Penugasan atau Permohonan Ijin
Penelitian; Ijin Pelaksanaan Pengabdian kepada Masyarakat; Publikasi
Artikel), yang aktif diberi garis oranye. Kanan: kartu form bergaya formulir
(garis atas ungu) berjudul "2026-Form Surat Penugasan Hak Cipta" dengan salam,
catatan, dan kolom-kolom (Email, Judul Hak Cipta, Jenis Ciptaan, Pemegang dan
Alamat Hak Cipta, Nama Dosen ke 1 dan 2, NUPTK, Program Studi dan seterusnya).
Setiap jenis form punya daftar kolomnya sendiri dalam satu konfigurasi
(skema), dengan validasi, dan hasil kirim disimpan lewat lapisan data mock.

## 5. Halaman lain
Untuk Profil (03 sampai 09), Pengabdian (11), Luaran (13 sampai 16), KKN (17),
Kerjasama (19), Agenda (21), Pengumuman (22), dan Dokumen (23) ikuti gambar
bernomor di atas: hero biru standar, seksi putih atau abu bergantian, dan
komponen dari bagian 2. Baca teks langsung dari gambar dan tandai bagian yang
tidak terbaca di `docs/design-v2-questions.md`; jangan mengarang isi.

## 6. Hal yang perlu dikonfirmasi pemilik proyek
1. Daftar item dropdown Profil (di sini hanya perkiraan).
2. Font resmi dan nilai warna resmi dari Figma.
3. Apakah angka di desain (114, 74, 311, dan seterusnya) sudah final.
4. Logo transparan (SVG atau PNG tanpa latar) untuk navbar dan footer.
5. Kode hasil ekspor Figma Make (tab Code) bila tersedia, sebagai acuan yang
   lebih akurat daripada screenshot.

## 7. Modal Login Admin (gambar 25-login-modal.jpg)
- "Login Admin" di navbar MEMBUKA MODAL (bukan pindah halaman). Latar halaman
  diburamkan dan digelapkan (overlay biru tua). Modal lebar maksimum sekitar 960
  px, radius 28 sampai 32 px, dua panel sama tinggi, tombol tutup (X) kanan atas.
- Panel kiri latar --brand (#3466af): lingkaran dekoratif halus (opasitas
  rendah), logo LPPM dalam kotak oranye radius 16 px, eyebrow oranye "PORTAL
  INTERNAL", judul putih tebal "LPPM Universitas Tiga Serangkai", paragraf
  "Kelola data penelitian, pengabdian, publikasi, HKI, agenda, dan dokumen dalam
  satu ruang kerja.", dan di bawah kartu biru tua translusen dengan ikon perisai
  centang oranye, judul "Akses terbatas", teks "Hanya untuk pengelola resmi LPPM TSU."
- Panel kanan putih: eyebrow oranye "SELAMAT DATANG KEMBALI", H "Login Admin",
  paragraf "Masukkan akun pengelola untuk mengakses dashboard administrasi.",
  kolom "Email admin" (ikon surat, placeholder nama@tsu.ac.id), kolom "Kata sandi"
  (ikon gembok, placeholder "Masukkan kata sandi", tombol mata tampil/sembunyi),
  baris centang "Ingat saya" dan tautan oranye tebal "Lupa kata sandi?", tombol
  biru penuh "Masuk ke Dashboard" dengan panah, dan teks "Mengalami kendala
  akses? Hubungi administrator LPPM" (tautan oranye tebal).
- Perilaku: Esc, klik di luar, dan X menutup. Fokus terkunci di dalam modal dan
  kembali ke tombol pemicu saat ditutup. Gulir latar dikunci. aria-modal,
  role="dialog", label jelas. Kolom email dan kata sandi memakai autocomplete
  "username" dan "current-password". Saat memproses, tombol nonaktif dengan
  indikator. Error umum "Email atau kata sandi salah" (jangan membedakan mana
  yang salah); 419, 5xx, atau jaringan memakai pesan terpisah yang ramah.
  Berhasil: tutup modal lalu arahkan ke /admin. Jika sudah login, label navbar
  menjadi "Dasbor Admin" dan langsung ke /admin.
- "Ingat saya" memakai fitur remember bawaan sesi (jangan menyimpan kata sandi
  atau token di localStorage). "Lupa kata sandi?" belum punya alur reset: tampilkan
  pesan kecil "Hubungi administrator LPPM untuk mengatur ulang kata sandi",
  jangan membuat reset palsu. Tidak ada pendaftaran publik. JANGAN menampilkan
  akun demo atau kata sandi di UI. Akun demo hanya dari .env lokal.
- Responsif: di bawah 768 px panel kiri disembunyikan atau diringkas menjadi
  header kecil, modal menjadi satu kolom dan hampir setinggi layar.
- Rute /admin/login tetap ada sebagai tautan langsung: membuka modal yang sama
  di atas Beranda.
