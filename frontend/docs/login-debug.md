# Catatan Debugging Skenario Login & Panel Admin LPPM

Dokumen ini mencatat akar permasalahan dari isu panel admin yang menampilkan layar kosong setelah login berhasil, serta langkah-langkah mitigasi yang diterapkan.

## 1. Akar Permasalahan (Root Cause)
1. **Ketidakcocokan Nilai Kredensial Mock pada Environment (.env):**
   - Berkas autentikasi (`src/admin/auth/auth.js`) menggunakan `import.meta.env.VITE_MOCK_ADMIN_EMAIL` dan `VITE_MOCK_ADMIN_PASSWORD` untuk verifikasi login.
   - Variabel `.env` sebelumnya belum disesuaikan atau menggunakan nilai default yang berbeda dengan pemeriksaan pada fungsi `login()`, sehingga proses autentikasi gagal atau mengembalikan error tanpa menampilkan pesan error yang ramah di UI.

2. **Ekspor yang Hilang (MISSING_EXPORT) dan Impor Komponen:**
   - Beberapa komponen atau ikon pendukung pada tata letak admin (`AdminLayout`) dan halaman dasbor memanggil hook atau ikon yang tidak di-ekspor dengan benar, menyebabkan komponen gagal dirender (unhandled runtime error / blank screen).

3. **Absennya ErrorBoundary di Tingkat Akar Aplikasi (`src/app/App.jsx`):**
   - Saat terjadi kegagalan rendering pada modul lazy-loaded seperti rute admin (`AdminRoutes`), React melemparkan error yang tidak tertangkap oleh boundary lokal, mengakibatkan seluruh halaman utama dan admin menampilkan layar kosong berwarna abu-abu.

4. **Pembacaan Properti dari Nilai `undefined`:**
   - Hook autentikasi `useAdminAuth` mengembalikan status `user` sebagai `undefined` saat proses inisialisasi awal (`isLoading`), namun beberapa komponen mengakses `user.name` secara langsung tanpa pengecekan aman, memicu *TypeError: Cannot read properties of undefined*.

---

## 2. Perbaikan yang Dilakukan
1. **Penambahan ErrorBoundary Global:**
   - Membuat komponen `src/components/ErrorBoundary.jsx` dan membungkus router utama di `src/app/App.jsx`. Pada mode development (`import.meta.env.DEV`), pesan error detail dan nama komponen yang gagal ditampilkan, sedangkan pada produksi menampilkan pesan umum yang ramah pengguna.
2. **Pembungkusan Suspense dengan Fallback yang Layak:**
   - Memastikan semua komponen `React.lazy` di `src/admin/routes/index.jsx` dan `src/app/App.jsx` dibungkus dengan `<Suspense fallback={<Loading />}>` yang menampilkan indikator putar (spinner), bukan nilai kosong atau `null`.
3. **Pengamanan Pemanggilan Properti `useAdminAuth`:**
   - Memberikan nilai aman/opsional (`auth?.user` atau nilai default) pada komponen `AdminLayout` dan halaman terkait untuk menghindari error ketika objek user masih dalam status `undefined`.
4. **Penyelarasan Variabel Environment (.env):**
   - Mengatur nilai `VITE_MOCK_ADMIN_EMAIL` dan `VITE_MOCK_ADMIN_PASSWORD` agar sesuai dengan fungsi verifikasi login mock.

---

## 3. Skenario Pengujian (Test Scenario)
1. **Skenario Login Berhasil:**
   - Buka halaman `/admin/login`.
   - Masukkan email dan kata sandi demo yang valid.
   - Klik tombol Masuk. Sistem akan mengarahkan pengguna ke `/admin` dan menampilkan sidebar serta panel dasbor dengan benar tanpa layar kosong.
2. **Skenario Navigasi Menu Admin:**
   - Klik setiap menu pada sidebar (`Berita & Pengumuman`, `Kegiatan & Agenda`, `Dokumen & SOP`, `Mitra & Kerjasama`, `Profil & Banner`).
   - Pastikan setiap halaman termuat dengan baik dan tidak memicu layar kosong.
3. **Skenario Keluar (Logout):**
   - Klik tombol **Keluar** pada bagian bawah sidebar.
   - Pastikan sesi dihapus dan pengguna diarahkan kembali ke `/admin/login`.
