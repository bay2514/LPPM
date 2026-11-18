# TUGAS: AUDIT KONTEN DAN TAUTAN (hanya membaca dan melapor, JANGAN mengubah kode)
Repo /root/proyek/LPPM, branch fe/implementasi-desain, folder frontend/. Keluaran
tunggal: docs/AUDIT-KONTEN.md dan docs/KONTEN-DIBUTUHKAN.md. Tidak ada perubahan
pada src/ atau berkas lain. Satu-satunya berkas baru yang boleh dibuat selain
dua laporan itu adalah scripts/audit-site.mjs.

## ATURAN
- Setiap temuan wajib punya BUKTI (berkas:baris, atau hasil render) dan ANGKA.
  Jangan menulis "sepertinya" tanpa bukti; tulis "tidak terverifikasi".
- Jangan mengarang isi konten. Konten yang kurang ditulis sebagai kebutuhan di
  KONTEN-DIBUTUHKAN.md untuk dilengkapi pemilik.
- `git status` bersih sebelum mulai; jangan commit selain dua laporan dan
  scripts/audit-site.mjs; jangan push; jangan menyentuh folder Laravel dan
  backend; jangan menampilkan isi .env; jangan install dependensi baru.
- Jika sesi terputus: baca berkas ini dan docs/AUDIT-PROGRESS.md (buat, berisi
  bagian A sampai F sebagai checklist), lanjutkan dari bagian yang belum selesai.

## A. INVENTARIS RUTE (nyata, bukan tebakan)
Tulis scripts/audit-site.mjs yang memuat tabel rute sebenarnya dari router
aplikasi (impor konfigurasi rute atau ekstrak dari App), lalu catat tiap rute:
path, berkas halaman, apakah lazy, apakah pengalihan (Navigate) dan tujuannya,
apakah dilindungi (admin). Tandai rute yang tidak punya komponen atau
komponennya hanya mengembalikan null atau satu paragraf.

## B. RENDER DAN UKUR TIAP HALAMAN
Dengan API JavaScript Vite (createServer middlewareMode, appType "custom",
ssrLoadModule) dan renderToString di dalam MemoryRouter pada tiap rute publik
dan admin, beri stub sederhana untuk window, localStorage, sessionStorage, dan
matchMedia. Untuk tiap rute catat: berhasil dirender atau error (pesan dan
berkas), panjang teks tampak (karakter, setelah membuang tag), jumlah seksi
(<section>), jumlah kartu atau item daftar, jumlah gambar dan berapa yang
memakai SlotImage placeholder, jumlah tombol dan tautan, apakah menampilkan
EmptyState atau skeleton secara bawaan. Beri status:
- LENGKAP: seksi sesuai desain dan isi terisi.
- SEBAGIAN: ada kerangka tetapi sebagian seksi kosong atau EmptyState.
- KERANGKA: hanya PageHero dan satu paragraf (halaman sementara).
- KOSONG: tidak merender isi.
Bandingkan dengan docs/design-spec-v2.md dan docs/design-v2/ (peta halaman) dan
laporkan seksi yang ada di desain tetapi belum ada di kode.

## C. TAUTAN DAN REFERENSI
Dari HTML hasil render (bagian B) dan dari kode sumber, kumpulkan SEMUA tautan:
<a href>, <Link to>, navigate(), tombol yang berpindah halaman, dan field tautan
di data seed (link, url, to, href). Untuk tiap tautan catat sumber (berkas:baris
atau rute), target, dan klasifikasi:
- Internal: cocokkan dengan tabel rute memakai matchPath. Tandai TIDAK ADA RUTE,
  RUTE ADA TAPI KERANGKA, LEWAT PENGALIHAN (usulkan tujuan akhir), perbedaan
  huruf besar/kecil atau garis miring akhir.
- Placeholder: "#", kosong, "javascript:", "/", atau teks seperti "xxx".
- Eksternal: format valid (https), tanpa spasi, target="_blank" wajib
  rel="noopener noreferrer". JANGAN mengakses internet untuk memeriksa URL;
  daftarkan semua URL eksternal agar saya cek manual, dan tandai yang
  mencurigakan (domain salah ketik, http tanpa s, localhost).
- mailto: dan tel: (format benar, bukan nomor atau email contoh seperti
  08xxxxxxxx atau nama@example.com).
- Anchor internal (#id): id tujuannya harus ada di halaman itu.
- Unduhan dokumen: berkas atau URL tujuan ada atau tidak.
Periksa juga konsistensi menu: navbar, drawer HP, footer, breadcrumb, Quick
Access, kartu layanan, dan tautan di halaman beranda harus bersumber dari
src/shared/config/navigation.js atau data yang sama; laporkan daftar menu yang
ditulis ulang di tempat lain. Temukan rute yatim (tidak ada tautan menuju)
dan item menu yatim (menuju rute yang tidak ada).

## D. KONTEN PLACEHOLDER
Cari di src dan data seed: "Lorem", "TODO", "FIXME", "Segera hadir", "Coming
soon", "belum tersedia", "dummy", "contoh", "Data contoh", "xxx", "08xxxxxxxx",
"nama@example.com", judul atau tanggal berulang yang sama, angka yang
mencurigakan (semua sama), alt gambar kosong atau generik, gambar yang
diimpor tetapi berkasnya tidak ada, dan impor figma:asset. Untuk tiap jenis
konten (Berita, Agenda, Pengumuman, Dokumen, Surat Penugasan, Luaran, KKN,
Mitra, Tim, FAQ, dan lainnya): jumlah item di data awal, apakah halaman publik
yang menampilkannya ada, apakah ada form admin untuk mengubahnya, dan apakah
teks halaman statis (Profil, Visi Misi, Struktur, Kontak) tersimpan di data
yang bisa diedit atau ditulis langsung di komponen.

## E. KETERHUBUNGAN ADMIN DAN PUBLIK (jika ada)
Untuk tiap jenis konten di admin: apakah perubahannya muncul di halaman
publik (sumber data sama), apakah ada jenis di publik tanpa admin, dan
sebaliknya. Tandai komponen publik yang membaca array statis alih-alih
contentStore.

## F. LAPORAN
Tulis docs/AUDIT-KONTEN.md dengan: (1) Ringkasan angka: jumlah rute, jumlah
LENGKAP/SEBAGIAN/KERANGKA/KOSONG, jumlah tautan per klasifikasi dan jumlah
bermasalah, jumlah placeholder. (2) Tabel rute: rute, berkas, status, bukti
(angka), yang kurang dibanding desain. (3) Tabel tautan bermasalah: sumber,
target, masalah, perbaikan yang diusulkan. (4) Daftar URL eksternal untuk cek
manual. (5) Menu yatim dan rute yatim. (6) Temuan placeholder (berkas:baris).
(7) Keterhubungan admin dan publik. (8) Daftar prioritas perbaikan: P1 (halaman
rusak atau tautan mati), P2 (konten kerangka), P3 (kerapian). Tulis juga
docs/KONTEN-DIBUTUHKAN.md: daftar teks, angka, gambar, dokumen, dan kontak yang
harus diisi pemilik, dikelompokkan per halaman, siap dijadikan checklist.
Setelah selesai, jalankan `git status`; hanya dua laporan dan
scripts/audit-site.mjs yang boleh baru. Lalu berhenti dan bacakan ringkasan
angkanya.
