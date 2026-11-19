# TUGAS: tautan e-Jurnal ke website jurnal kampus (OJS) yang bisa diubah
Repo /root/proyek/LPPM, branch fe/implementasi-desain, folder frontend/. Halaman
e-Jurnal (docs/design-v2/18-e-jurnal.jpg dan docs/design-spec-v2.md) tetap ada.
Alamat website jurnal BELUM diketahui: JANGAN mengarang URL. Siapkan tempat
mengisinya dan perilaku yang aman. Hanya sentuh frontend; jangan push; jangan
menyentuh backend; jangan menampilkan isi .env; jangan install dependensi baru.

## ATURAN KERJA
- Kerjakan per tahap, berhenti dan laporkan di akhir tiap tahap. Setelah tiap
  tahap: `npm run build` bersih, smoke test render semua rute, commit
  "feat(ejurnal): <ringkasan>". Jika sesi terputus: baca berkas ini dan
  `git log`, lanjutkan tahap berikutnya.
- Semua hook dan komponen diekspor dan diimpor lewat alias (bug lama:
  "usePublicData is not defined"). Tanpa warna hardcode di luar token.

## TAHAP 1 - Satu tempat konfigurasi tautan
a. Buat src/shared/config/externalLinks.js dengan komentar di bagian atas:
   // [EDIT-LINK] Semua alamat website jurnal ada di sini (atau lewat admin).
   // Ganti nilai kosong "" dengan alamat https yang benar, lalu muat ulang.
   Isi (semua kosong): ejurnal.main (portal utama), ejurnal.register
   (daftar akun penulis), ejurnal.submit (kirim naskah), ejurnal.guide
   (panduan penulis), dan ejurnal.mode ("page" atau "redirect", bawaan "page").
   Beri komentar [EDIT-LINK] di setiap baris yang perlu diisi, dan jangan
   menaruh URL tebakan.
b. Data jurnal (seed, bisa diedit admin): id, nama (Jurnal Ilmiah Sinus (JIS),
   TIKomSiN, Lavanya: Journal of Art, Sinergia: Journal of Community Services),
   bidang, nomor tampilan, warna sampul (token), periode pengelola, nomor SK
   [DATA DESAIN], chip "Resmi TSU", url (situs jurnal), archiveUrl (arsip
   edisi, opsional), aktif (true/false). url dan archiveUrl kosong bila belum
   diketahui. Jumlah jurnal aktif di hero dihitung otomatis dari data ini.
c. Helper src/shared/lib/externalLink.js:
   - isValidExternalUrl(url): hanya skema https (tolak http, javascript:, data:,
     spasi, dan URL tanpa host). 
   - normalizeUrl(url): trim, hapus spasi, kembalikan null bila tidak valid.
   - getEjurnalTarget(): mengembalikan { type: "internal", to: "/layanan/e-jurnal" }
     untuk mode "page", atau { type: "external", href } untuk mode "redirect"
     (jika href kosong, jatuh ke internal).
   Semua tautan keluar lewat helper ini, tidak ada URL tertulis di komponen.

## TAHAP 2 - Komponen tautan keluar yang aman
Buat komponen ExternalLink (dan varian tombol) di src/shared/components/ui:
- Selalu target="_blank" dan rel="noopener noreferrer", ikon panah keluar kecil
  (ukuran eksplisit), teks bantu tersembunyi "(membuka situs baru)" untuk
  pembaca layar, dan fokus terlihat. Area sentuh minimal 44 px di HP.
- Jika url kosong atau tidak valid: JANGAN membuat tautan mati atau "#".
  Di produksi sembunyikan tombol atau kartu tindakannya (tampilan lain tetap
  rapi, tanpa celah). Di mode pengembangan (import.meta.env.DEV) tampilkan
  tombol nonaktif dengan chip kecil "Tautan belum diisi" agar mudah ketahuan.
- Tidak ada iframe untuk memuat situs jurnal (sering diblokir dan berisiko).
- Tanpa pelacak atau parameter tambahan pada URL.

## TAHAP 3 - Terapkan di halaman
- Halaman e-Jurnal: tombol hero "Kunjungi e-Jurnal TSU" memakai ejurnal.main;
  tiap kartu jurnal: tombol "Lihat edisi" memakai archiveUrl, atau url bila arsip
  kosong; langkah alur pengiriman: 02 "Daftar akun OJS" memakai ejurnal.register,
  03 "Kirim online" memakai ejurnal.submit, 01 dan 05 memakai ejurnal.guide
  bila ada; CTA biru di bawah memakai ejurnal.submit atau ejurnal.main.
  Label domain kecil di langkah (mis. teks seperti "ejurnal.tsu.ac.id" yang
  tertulis di desain) diambil dari host URL yang diisi, bukan ditulis tetap.
- Menu: item "E-Jurnal" di dropdown Layanan LPPM dan di drawer HP memakai
  getEjurnalTarget(). Mode "redirect": membuka situs di tab baru dengan ikon
  keluar dan teks bantu; mode "page": ke /layanan/e-jurnal. Jika mode redirect
  tetapi url kosong, jatuh ke halaman internal.
- Tautan lain yang menyebut e-Jurnal ("Telusuri publikasi di e-Jurnal TSU" di
  seksi Pulse beranda, kartu Quick Access, footer, halaman Publikasi) mengikuti
  aturan yang sama lewat helper, tanpa URL tertulis.
- Rute /layanan/e-jurnal tetap berfungsi di mode apa pun.

## TAHAP 4 - Bisa diedit admin
Pakai mesin form admin yang sudah ada (jangan membuat halaman terpisah):
- Pengaturan "e-Jurnal" (singleton): kolom portal utama, daftar akun, kirim
  naskah, panduan penulis, dan pilihan mode ("Tampilkan halaman e-Jurnal" atau
  "Langsung buka website jurnal"). Teks bantuan jelas dalam bahasa Indonesia.
- Koleksi "Jurnal": kolom sesuai tahap 1b, dengan kolom url dan archiveUrl.
- Validasi: wajib https, tanpa spasi, tampilkan pesan "Gunakan alamat yang
  diawali https://". Beri PERINGATAN (bukan penolakan) bila domain bukan
  tsu.ac.id atau subdomainnya, dengan teks "Pastikan alamat ini benar",
  karena alamat eksternal yang sah bisa berbeda.
- Tombol "Uji tautan" membuka alamat di tab baru (manual); jangan ada
  pengecekan otomatis ke internet dari aplikasi.
- Perubahan langsung tampil di halaman publik (sumber data sama dengan
  contentStore). Jika backend Laravel sudah tersambung, simpan lewat API.

## TAHAP 5 - Verifikasi
- Smoke test: render /layanan/e-jurnal dalam tiga kondisi (semua URL kosong,
  semua terisi dengan alamat uji https://example.org, dan URL tidak valid
  seperti "http://x", "javascript:alert(1)", "ejurnal.tsu.ac.id" tanpa
  skema) dan laporkan hasilnya: tidak ada tautan "#" atau href kosong, semua
  tautan keluar punya rel noopener noreferrer, tombol disembunyikan bila kosong.
- Uji menu mode "page" dan "redirect" (desktop dan drawer HP).
- Tambahkan skenario uji di docs/qa-checklist.md, dan daftarkan URL eksternal
  di docs/AUDIT-KONTEN.md bila berkas itu ada. Uji lebar 390, 768, 1440 px.
- Laporkan: berkas yang berubah, cara mengisi alamat (config dan admin), dan
  daftar alamat yang masih harus diisi pemilik.
