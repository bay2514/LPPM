# Arsitektur Admin Panel Berbasis Skema (Admin Architecture)

Dokumen ini menguraikan arsitektur sistem pengelolaan konten berbasis skema untuk LPPM Universitas Tiga Serangkai (TSU), yang dirancang agar modular, mudah dikembangkan, dan siap dihubungkan ke backend REST API di masa depan.

## 1. Ikhtisar Arsitektur
Arsitektur admin panel ini dibangun di atas prinsip **Schema-Driven UI**:
- **Registri Skema (`src/admin/content/schema.js`)**: Sumber kebenaran tunggal (*single source of truth*) yang mendefinisikan struktur, tipe data, validasi, dan label untuk setiap jenis konten.
- **Penyimpanan Terpusat (`src/shared/lib/contentStore.js`)**: Menyimpan state reaktif menggunakan `localStorage` dengan dukungan *versioning* (riwayat versi hingga 20 revisi), audit log, dan *fallback* ke data mock (`mock.js`).
- **Mesin UI Generik (`src/admin/components/`)**: Komponen generik seperti `ContentList`, `ContentForm`, `SingletonForm`, dan `FieldRenderer` yang secara otomatis merender antarmuka CRUD berdasarkan skema konten tanpa perlu membuat halaman manual per jenis konten.
- **Hook Reaktif (`src/public/hooks/useContent.js`)**: Menghubungkan halaman publik secara reaktif dengan penyimpanan menggunakan `useSyncExternalStore` sehingga pembaruan di admin langsung tampil di publik tanpa muat ulang halaman.

---

## 2. Struktur Direktori Baru
```
frontend/
├── src/
│   ├── admin/
│   │   ├── content/
│   │   │   └── schema.js        # Registri skema seluruh jenis konten & singleton
│   │   ├── components/          # Komponen generik (ContentList, ContentForm, FieldRenderer, dll)
│   │   └── pages/               # Halaman dinamis generik (DynamicList, DynamicForm)
│   └── shared/
│       └── lib/
│           └── contentStore.js  # Store terpusat, versioning, audit log, localStorage
```

---

## 3. Jenis Konten yang Didukung (Tahap Awal: Berita & Mitra)
1. **Berita & Pengumuman (`news`)**: Koleksi artikel, pengumuman, dan agenda dengan richtext, tag, status terbit/draf, dan tanggal publikasi.
2. **Mitra & Kolaborator (`collaborators`)**: Koleksi daftar mitra strategis, industri, dan instansi dengan logo, kategori, dan tautan.

---

## 4. Spesifikasi Penyimpanan & Keamanan
- Menggunakan `localStorage` dengan kunci berversi (`lppm_content_store_v1`).
- Riwayat revisi disimpan otomatis (maksimal 20 versi per item) untuk pemulihan data (*rollback*).
- Audit log mencatat waktu, aksi (create, update, delete), dan ringkasan perubahan.
- Tidak menyimpan kata sandi atau token sensitif di sisi klien.
