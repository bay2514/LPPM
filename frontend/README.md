# Frontend LPPM

Frontend React + Vite untuk website LPPM. Terdiri dari dua area:

- **Publik** — halaman informasi (beranda, berita, dokumen, dll).
- **Admin** — dashboard pengelolaan konten di `/admin`, dilindungi autentikasi.

## Menjalankan

```bash
npm install
npm run dev
```

Dev server default di `http://localhost:5173`.

## Konfigurasi Akun Demo (Mock Auth)

Backend Laravel belum tersedia, sehingga login admin memakai **mock auth** di
`src/admin/auth/auth.js`. Kredensial dibaca dari variabel environment Vite.

### 1. Salin file contoh

```bash
cp .env.example .env
```

### 2. Isi akun demo

Buka `.env` dan isi dua variabel berikut:

```dotenv
VITE_MOCK_ADMIN_EMAIL=admin@example.com
VITE_MOCK_ADMIN_PASSWORD=change-me
```

Gunakan nilai apa pun untuk pengujian lokal. Jangan memakai kata sandi asli.
Nilai di `.env.example` hanya placeholder — jangan menaruh kredensial nyata di sana.

Saat membandingkan kredensial, `login()` menormalisasi input: email di-`trim`
lalu diubah ke huruf kecil, kata sandi hanya di-`trim` di ujung (isi tetap
case-sensitive). Satu-satunya sumber kebenaran kredensial mock adalah
`import.meta.env.VITE_MOCK_ADMIN_EMAIL` dan `import.meta.env.VITE_MOCK_ADMIN_PASSWORD`.

### 3. Restart dev server

Vite hanya membaca variabel `VITE_*` saat proses start. Setelah mengubah `.env`,
**hentikan dev server lalu jalankan ulang** (`Ctrl+C`, kemudian `npm run dev`).
Tanpa restart, halaman login akan terus menampilkan pesan
"Akun demo belum dikonfigurasi".

> `.env` sudah masuk `.gitignore` dan tidak boleh di-commit. Hanya `.env.example`
> yang ikut repository.

## Alur Autentikasi

| Langkah | Perilaku |
| --- | --- |
| Buka `/admin` tanpa login | Dialihkan ke `/admin/login` |
| Login berhasil | Masuk ke halaman yang dituju, default `/admin` |
| Refresh halaman | Sesi tetap aktif (data user non-sensitif disimpan di `sessionStorage`) |
| Klik "Keluar" | Sesi dihapus, kembali ke `/admin/login` |
| Buka `/login` | Dialihkan permanen ke `/admin/login` |
| Buka `/admin/login` saat sudah login | Dialihkan ke `/admin` |

Data yang disimpan di `sessionStorage` hanya `{ id, name, email, role }`.
**Tidak ada kata sandi dan tidak ada token** yang disimpan di browser.

## Mengganti Mock ke Laravel Sanctum

Kontrak endpoint lengkap ada di [`../docs/api-contract.md`](../docs/api-contract.md).
Ringkasnya:

- `POST /api/login` — login, set cookie sesi.
- `POST /api/logout` — hapus sesi.
- `GET /api/user` — ambil user aktif.

Ganti isi `login`, `logout`, dan `getCurrentUser` di `src/admin/auth/auth.js`
dengan pemanggilan `fetch`/`axios` ke endpoint tersebut, dengan
`credentials: "include"` dan cookie CSRF dari `/sanctum/csrf-cookie`.
Tanda tangan fungsi tidak perlu berubah, sehingga komponen tidak ikut diubah.

## Catatan Keamanan

> **Proteksi rute di frontend hanya untuk tampilan.** `ProtectedRoute` mencegah
> pengguna melihat UI admin, tetapi tidak melindungi data. Keamanan sebenarnya
> harus ditegakkan di backend Laravel (middleware `auth:sanctum` pada seluruh
> endpoint `/api/admin/*`). Jangan pernah mengandalkan pengecekan di sisi klien
> sebagai satu-satunya kontrol akses.

## Perintah

```bash
npm run dev      # dev server
npm run build    # build produksi
npm run preview  # pratinjau hasil build
npm run lint     # lint (jika tersedia)
```

## Struktur Singkat

```
src/
  app/            # router utama
  admin/          # area admin (lazy-loaded)
    auth/         # login, logout, getCurrentUser, ProtectedRoute
    layouts/      # shell dashboard admin
    pages/        # halaman admin
    routes/       # definisi rute /admin/*
  public/         # area publik
  shared/         # komponen & util bersama
```
