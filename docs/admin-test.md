# Skenario Uji Admin: Pengaturan Dashboard Capaian

Skenario uji untuk memverifikasi fitur edit dashboard capaian secara mandiri oleh admin.

## Skenario 1: Ubah Tampilan Singleton (Pengaturan Dashboard)
1. Masuk ke Admin Panel > Menu **Tampilan Situs**.
2. Ubah **Judul Halaman** menjadi "Capaian Kinerja LPPM".
3. Tambah satu poin di **Cara Membaca Dashboard**.
4. Klik **Simpan Perubahan**.
5. Klik tombol **Lihat Publik**.
6. **Verifikasi**: Judul di `/capaian` berubah dan poin baru muncul.

## Skenario 2: Kelola Widget & Urutan
1. Di halaman **Tampilan Situs**, tab **Tampilan & Widget**.
2. Matikan toggle pada widget **Peringkat Prodi**.
3. Tukar urutan **KPI Utama** dengan **Tren Tahunan** menggunakan tombol panah.
4. Klik **Simpan**.
5. **Verifikasi**: Widget Peringkat Prodi hilang di halaman publik dan urutan widget berubah.

## Skenario 3: Mode KPI Manual
1. Ubah **Mode Angka KPI Utama** ke "Manual".
2. Isi angka manual untuk **Penelitian** (misal: 150) dan **Publikasi** (misal: 80).
3. Klik **Simpan**.
4. **Verifikasi**: Halaman `/capaian` menampilkan angka manual tersebut, bukan hitungan otomatis dari data prodi.

## Skenario 4: Impor CSV Data Kinerja
1. Buka tab **Data Kinerja**.
2. Klik **Unduh Templat CSV**.
3. Isi file CSV dengan data minimal 2 prodi dan tahun yang berbeda.
4. Klik **Impor CSV**, tempel/pilih data CSV.
5. Klik **Pratinjau** dan pastikan tidak ada baris merah (eror).
6. Klik **Konfirmasi Impor**.
7. **Verifikasi**: Tabel data kinerja terisi dengan data dari CSV.

## Skenario 5: Akses Editor dari Halaman Publik
1. Dalam keadaan login sebagai admin, buka `/capaian`.
2. Klik tombol melayang **Ubah Bagian Ini**.
3. **Verifikasi**: Halaman admin **Pengaturan Dashboard** terbuka secara otomatis.
