# TUGAS: ubah frontend publik agar sesuai desain UI/UX terbaru (v2)
Repo /root/proyek/LPPM, branch fe/implementasi-desain, folder frontend/.
Sumber kebenaran: docs/design-spec-v2.md (token, komponen, peta halaman, isi) dan
screenshot di docs/design-v2/ (bernomor 01 sampai 25). Dokumen ini menggantikan
docs/design-spec.md dan docs/REVISI-NAV.md untuk warna, menu, dan halaman publik.
Hanya ubah tampilan, rute, dan konten publik; logika auth, data, dan admin
tidak diubah kecuali disebut.

## ATURAN KERJA
- Kerjakan SATU tahap lalu berhenti dan laporkan; lanjut hanya setelah saya bilang
  "lanjut". Buat docs/UI-V2-PROGRESS.md berisi tahap 0 sampai 6 sebagai checklist.
- Setelah tiap tahap: `npm run build` bersih, jalankan smoke test render semua rute
  (buat scripts/smoke-routes.mjs bila belum ada, memakai API JavaScript Vite
  ssrLoadModule dan renderToString dengan stub window dan storage), perbaiki semua
  error, `git add -A && git commit -m "feat(ui-v2): <ringkasan>"`, lalu centang.
- Jika sesi terputus: sesi baru membaca file ini, UI-V2-PROGRESS.md, dan `git log`,
  lalu lanjut ke tahap berikutnya yang belum dicentang.
- Semua hook dan komponen yang dipakai harus diekspor dan diimpor lewat alias
  (bug sebelumnya: "usePublicData is not defined"). Jangan memanggil hook yang
  tidak didefinisikan. Satu sumber untuk menu: src/shared/config/navigation.js.
- Teks diambil dari gambar dan spesifikasi; bagian yang tidak terbaca ditulis di
  docs/ui-v2-questions.md, JANGAN dikarang. Angka di desain jadi data awal (seed)
  yang tetap bisa diubah admin; tandai sebagai [DATA DESAIN].
- Satu PageHero untuk semua halaman dalam. Tanpa warna hardcode: semua lewat
  token Tailwind. Mobile-first (uji 390, 768, 1440), kontras minimal 4,5:1,
  fokus terlihat, tombol dan tautan minimal 44 px di HP.
- Batasan: hanya branch fe/implementasi-desain; jangan push; jangan menyentuh
  folder Laravel; jangan menghapus halaman atau data lama (alihkan rute lama);
  jangan install dependensi baru tanpa menyebut nama dan alasan; jangan
  menampilkan isi .env; tanya jika ada yang tidak jelas.

## TAHAP 0 - Audit (tanpa mengubah kode)
`git status` bersih (jika kotor, commit "checkpoint sebelum ui v2"). Buka dan
lihat SETIAP gambar di docs/design-v2/. Jika kamu tidak bisa melihat gambar,
katakan terus terang dan berhenti. Bandingkan dengan kode sekarang dan tulis
docs/ui-v2-diff.md: per halaman, apa yang sudah ada, apa yang berbeda, apa yang
belum ada, dan pemetaan nomor gambar ke berkas halaman. Tampilkan ringkasannya.

## TAHAP 1 - Fondasi dan navigasi
Token baru (biru #3466af, oranye #f97216, dst) di tailwind.config.js, dan
perbarui komponen dasar (PageHero, Section header, Card, Button, Badge, footer)
sesuai spesifikasi bagian 1 dan 2. Navbar baru: Dashboard, Beranda, Profil v,
Layanan LPPM v (Penelitian, Pengabdian, Luaran > Publikasi/HKI/Buku/Monograf,
KKN, E-Jurnal, Kerjasama), Info LPPM v (Agenda, Pengumuman, Dokumen, Surat
Penugasan), dan "Login Admin" sebagai teks di kanan. Dropdown dengan flyout
Luaran, drawer akordeon di HP, keyboard (Enter, Esc, panah), aria-expanded,
menu induk aktif bila anaknya aktif. Daftarkan semua rute baru (lazy dan
Suspense) sebagai halaman sementara bertema PageHero, lengkap dengan
pengalihan rute lama (tidak boleh 404). Teks logo tidak boleh menabrak menu.

## TAHAP 2 - Modal Login Admin
Implementasikan sesuai spesifikasi bagian 7 dan gambar 25: modal dua panel,
fokus terkunci, Esc dan klik di luar menutup, validasi, state loading, pesan
error terpisah (salah akun, 419, 5xx/jaringan), "Ingat saya", "Lupa kata sandi?"
tanpa alur palsu, label "Dasbor Admin" bila sudah login, rute /admin/login
membuka modal yang sama. Hapus teks akun demo dari UI. Logika auth tetap.

## TAHAP 3 - Beranda
Sesuai gambar 02 dan spesifikasi bagian 4: hero dua kolom dengan Quick Access,
pita 6 KPI, seksi Pulse LPPM (grafik area SVG buatan sendiri tanpa pustaka,
tabel alternatif), Layanan Utama, Berita dan Pengumuman, Kegiatan Terdekat,
Kolaborasi dan Desa Binaan. Slot foto tetap memakai SlotImage.

## TAHAP 4 - Layanan LPPM
Penelitian (gambar 10, dasbor pendanaan dengan donat per prodi, filter tahun,
batang bertumpuk, tabel alternatif), Pengabdian (11), Luaran: Publikasi (13),
HKI (14), Buku (16), Monograf (15), KKN (17), e-Jurnal (18, judul serif, kartu
jurnal, alur lima langkah), Kerjasama (19). Daftar dan kartu memakai komponen
bersama (satu komponen daftar Luaran dengan parameter jenis). EmptyState dan
skeleton untuk tiap data.

## TAHAP 5 - Profil dan Info LPPM
Profil: Tentang (03, 04), Visi dan Misi (05), Struktur Organisasi (07), Kontak
Kami (08). Info: Agenda (21), Pengumuman (22, plus halaman detail), Dokumen dan
Panduan (23), Surat Penugasan (24): form bergaya formulir dengan lima jenis,
dibangun dari satu skema konfigurasi (kolom, jenis, wajib), validasi, dan hasil
kirim lewat lapisan data mock (belum ke server; tampilkan keterangan itu).

## TAHAP 6 - Dashboard, admin, dan QA
Selaraskan halaman Dashboard dan tema admin (warna, tombol, kartu) dengan token
baru tanpa mengubah fungsi. Pastikan data baru bisa diubah lewat admin bila
mesin form admin tersedia. Jalankan build, lint, smoke test semua rute baru dan
lama, uji lebar 390, 768, dan 1440 px (tidak ada scroll horizontal, dropdown tidak
terpotong, teks tidak bertabrakan), perbarui docs/qa-checklist.md, dan tulis
ringkasan: halaman yang selesai, yang berbeda dari gambar beserta alasan, dan
pertanyaan yang tersisa.
