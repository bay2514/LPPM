# Diagnosis Login Admin — Langkah 1

Tanggal: 2026-10-17  
Branch: fe/implementasi-desain  
Status sebelum perubahan: working tree clean (sudah di-commit)

---

## 1. Alur Sekarang (Ringkasan)

- **Tautan Login Admin** di `Navbar.jsx` baris 90 dan `UtilityBar.jsx` baris 18 menunjuk ke **"/login"**.
- **Router utama** `App.jsx` hanya memuat rute publik di bawah `<Layout>`. Tidak ada import atau mount `AdminRoutes`.
- **Router admin** `src/admin/routes/index.jsx` mendefinisikan rute `/login` dan `/*` di bawah `ProtectedRoute`, tetapi komponen ini **tidak pernah dipakai** di mana pun.
- **Halaman login** `src/admin/pages/auth/Login.jsx` memvalidasi email & password, memanggil `login({email,password})`, lalu menyimpan objek `{email}` ke `localStorage` (bukan sessionStorage) dan mengarah ke dashboard.
- **Lapisan auth** `src/admin/auth/auth.js` menyimpan user di variabel `let currentSessionUser` (in-memory). Tidak ada persistensi storage.
- **ProtectedRoute** `src/admin/auth/ProtectedRoute.jsx` memeriksa `user` via hook `useAdminAuth` yang membaca `currentSessionUser`. Jika null, redirect ke `/admin/login`. Saat memeriksa menggunakan `setTimeout(50ms)` yang tidak menunggu async `getCurrentUser()`.

---

## 2. Pemeriksaan Satu per Satu

### 2.1 Apakah rute halaman login ada dan terdaftar, dan path-nya sama dengan tujuan tautan?

**TIDAK.**
- `AdminRoutes` (admin/routes/index.jsx) men-register path `/login` untuk login dan `/*` untuk admin.
- Tetapi `App.jsx` **tidak pernah import atau mount** `<AdminRoutes />`. Tidak ada `<Route path="/admin/*" …>` atau `<Route path="/login" …>` di App.jsx.
- Akibatnya:
  - `/login` → tidak ada rute → jatuh ke `*` → `NotFound.jsx`.
  - `/admin` → tidak ada rute → jatuh ke `*` → `NotFound.jsx`.
  - `/admin/login` → tidak ada rute → jatuh ke `*` → `NotFound.jsx`.

### 2.2 Apakah kredensial mock dibaca dari import.meta.env? Apakah .env.example ada? Apakah .env ada?

**YA dibaca dari import.meta.env.**
- `auth.js` baris 11 & 15: `import.meta.env.VITE_MOCK_ADMIN_EMAIL` dan `VITE_MOCK_ADMIN_PASSWORD`.
- `.env.example` ADA (baris 2-3 berisi placeholder).
- `.env` **TIDAK ADA** di mesin ini (`git status` tidak menunjukkan file `.env`; file tidak ditemukan di root frontend).

### 2.3 Apakah login() mengembalikan hasil yang benar dan form menangani Promise-nya?

**SEBAGIAN.**
- `login()` (auth.js baris 33) mengembalikan `{ user }` saat berhasil dan melempar error dengan `.status` serta `.errors` saat gagal.
- Tetapi `Login.jsx` memanggil `await login({ email, password });` dengan objek, sementara fungsi login sebenarnya menerima objek juga (destructured di signature), jadi cocok.
- Form tidak menangani redirect setelah login ke tujuan semula: `navigate(from, { replace: true })` ada, tetapi `from` diambil dari `location.state?.from` yang tidak pernah diisi oleh `ProtectedRoute` (karena App.jsx tidak memakai ProtectedRoute).

### 2.4 Setelah berhasil, apakah status login disimpan dan dibaca ProtectedRoute dengan benar?

**TIDAK.**
- Login.jsx menyimpan `{ email }` ke `localStorage` dengan key `lppm_admin_session`.
- ProtectedRoute dan `useAdminAuth` membaca dari variabel `currentSessionUser` in-memory di auth.js, **bukan** dari `localStorage`.
- Akibatnya setelah refresh halaman, `currentSessionUser` kembali `null`, sehingga ProtectedRoute langsung redirect ke login.

### 2.5 Apakah status login hilang saat refresh? Apakah penyimpanan sesuai aturan?

**YA, hilang saat refresh.**
- Tidak ada sessionStorage usage untuk menyimpan objek user non-sensitif.
- Login.jsx malah pakai `localStorage` dan menyimpan `{email}` — ini melanggar instruksi (seharusnya sessionStorage, dan tanpa password/token).
- Spec: simpan objek user (id, nama, peran) di sessionStorage, tanpa password/token.

### 2.6 Apakah ada redirect berulang (loop) antara /login dan /admin?

**TIDAK BISA TERJADI** karena `/login` dan `/admin` sama-sama tidak terdaftar di App.jsx → keduanya jatuh ke NotFound. Jika App.jsx diperbaiki nanti, risiko loop ada karena Login.jsx redirect ke `/admin` jika sudah login, tetapi ProtectedRoute redirect ke `/admin/login` jika belum login — dengan path yang tidak konsisten bisa menyebabkan loop.

### 2.7 Apakah ada error build atau impor alias yang tidak terselesaikan?

**TIDAK ADA error build.**
- `npm run build` berhasil (exit 0) sebelum perubahan apa pun.
- Alias `@admin`, `@shared`, `@app` semua ter-resolve dengan baik (terbukti dari build sukses).

### 2.8 Apakah `.env` di-ignore oleh git?

**TIDAK.**
- `.gitignore` tidak mencantumkan `.env`.
- `git check-ignore .env` keluar exit 1 (tidak di-ignore).
- Ini berarti jika `.env` dibuat, ia bisa tert-commit secara tidak sengaja.

---

## 3. Ringkasan Akar Masalah

1. **App.jsx tidak memuat AdminRoutes** — ini adalah akar masalah utama. Semua URL admin dan login jatuh ke 404.
2. **Path tidak konsisten**: tautan publik menunjuk ke `/login`, sedangkan router admin mendaftarkan `/login`, dan ProtectedRoute redirect ke `/admin/login`. Perlu dipatenkan ke `/admin/login`.
3. **Tidak ada persistensi sesi**: state in-memory hilang saat refresh. Harus pakai `sessionStorage` untuk mock, tanpa menyimpan password/token.
4. **ProtectedRoute tidak menunggu pemeriksaan selesai**: pakai `setTimeout(50ms)` yang tidak reliable; harus menunggu `getCurrentUser()` selesai.
5. **Login.jsx menyimpan ke localStorage**: melanggar instruksi dan tidak konsisten dengan ProtectedRoute.
6. **`.env` tidak di-ignore**: harus ditambahkan ke `.gitignore` agar tidak ter-commit.

---

## 4. Skenario Uji Manual (akan diverifikasi setelah perbaikan)

a. Buka `/admin` tanpa login → diarahkan ke `/admin/login`.  
b. Login dengan akun salah → pesan error umum "Email atau kata sandi salah".  
c. Login benar → masuk ke `/admin`.  
d. Refresh halaman `/admin` → tetap login (sessionStorage).  
e. Klik Keluar → kembali ke `/admin/login`.  
f. Buka `/login` → diarahkan ke `/admin/login`.  
g. Buka `/admin/login` saat sudah login → diarahkan ke `/admin`.  

