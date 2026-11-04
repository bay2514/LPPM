# Skenario Uji Manual Admin Panel LPPM

Dokumen ini berisi panduan pengujian manual untuk seluruh fitur CRUD dan sinkronisasi publik pada Admin Panel LPPM.

## 1. Pengujian Berita & Pengumuman (`/admin/berita`)
- **Tambah Berita**:
  1. Masuk ke `/admin/berita`, klik tombol "Tambah Berita Baru".
  2. Isi judul, kategori, ringkasan, dan konten lengkap.
  3. Unggah gambar (pastikan pratinjau muncul).
  4. Klik "Simpan" -> pastikan muncul toast sukses dan kembali ke daftar dengan data baru teratas.
  5. Cek halaman publik `/berita` -> pastikan berita baru langsung muncul tanpa refresh manual.
- **Ubah Berita**:
  1. Klik ikon Ubah pada salah satu berita.
  2. Pastikan form terisi data lama.
  3. Ubah judul atau status (Draf / Terbit), klik "Simpan".
  4. Verifikasi perubahan tampil di daftar admin dan halaman publik.
- **Hapus Berita**:
  1. Klik ikon Hapus, konfirmasi pada modal.
  2. Pastikan data terhapus dari daftar admin dan publik.

## 2. Pengujian Kegiatan & Agenda (`/admin/kegiatan`)
- **Tambah/Ubah/Hapus**: Ikuti pola pengujian yang sama seperti Berita.
- **Verifikasi Publik**: Cek halaman `/kegiatan` untuk memastikan agenda baru langsung muncul.

## 3. Pengujian Dokumen (`/admin/dokumen`)
- **Tambah/Ubah/Hapus**: Uji pengunggahan dokumen PDF/file, pengisian kategori (Panduan, Template, SOP, dll), dan tahun.
- **Verifikasi Publik**: Cek halaman `/dokumen` dan pastikan pencarian/filter berfungsi.

## 4. Pengujian Profil & Kontak (`/admin/profil`)
- **Ubah Profil**:
  1. Masuk ke `/admin/profil`.
  2. Ubah nama institusi, alamat, atau nomor telepon.
  3. Klik "Simpan Pengaturan".
  4. Cek halaman kontak atau footer publik untuk memastikan informasi langsung terbarui.

## Catatan Persistensi
Data disimpan di memori (`sharedStore`). Saat halaman di-refresh total, data kembali ke kondisi awal (mock default). Persistensi permanen akan disediakan oleh API Laravel sesuai spesifikasi produksi.
