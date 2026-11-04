# Rencana Frontend — LPPM TSU

## Stack

- **Framework:** Vite + React (JavaScript)
- **Styling:** Tailwind CSS (CSS-first, no CSS modules)
- **Routing:** React Router v6
- **Icons:** Inline SVG (Lucide/Feather style), tanpa library ekstra
- **Form:** Native HTML form + `useField` hook sederhana
- **HTTP:** `fetch` + `axios` (untuk error handling yang konsisten)
- **Icons:** Lucide icons (pilihan: `lucide-react`), tapi karena ingin ringan dan konten
  di mock semuanya line icon sederhana, akan **digambar ulang inline SVG**.

---

## Struktur folder (frontend/)

```
frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/           # aset desain: logo, foto placeholder (opsional)
│   ├── components/       # komponen UI berulang
│   │   ├── layout/       # Navbar, Footer, Container, UtilityBar
│   │   ├── ui/           # Button, Input, Card, Badge, Dropdown, etc.
│   │   ├── sections/     # StatSection, ServiceGrid, NewsGrid, EventList, etc.
│   │   └── forms/        # FormRoot, FormField, FormError, Select, etc.
│   ├── lib/
│   │   ├── api.js        # one function per endpoint
│   │   └── api-contract.md  # dokumentasi endpoint
│   ├── data/
│   │   └── mock.js       # data dummy, sesuai kontrak
│   ├── pages/            # halaman SPA
│   │   ├── Home.jsx
│   │   ├── Documents.jsx
│   │   ├── DocumentDetail.jsx
│   │   ├── Capaian.jsx
│   │   ├── Pengajuan.jsx
│   │   ├── NotFound.jsx
│   │   └── Login.jsx
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── .env.example
└── README.md
```

---

## Urutan implementasi

### 1. Setup project
- `npm create vite@latest frontend -- --template react`
- Install Tailwind, React Router
- Setup konfigurasi: `tailwind.config`, `postcss.config`, `vite.config`
- Setup `src/lib/api.js`, `src/data/mock.js`, `.env.example`

### 2. Design tokens
- Config Tailwind: colors, spacing, radius, font, container
- Import Inter font di `index.html`

### 3. Komponen dasar (berulang)
- `Button`, `Badge`, `Card`, `Container`, `UtilityBar`, `Navbar`, `Footer`

### 4. Komponen sections
- `StatSection`, `ServiceGrid`, `NewsGrid`, `EventList`, `ContactSection`, `QuickAccessCard`

### 5. Layout & routing
- `App.jsx`: Router + layout dasar (Navbar + Outlet + Footer)
- Routes: `/`, `/dokumen`, `/capaian`, `/pengajuan`, `/login`, `*`

### 6. Halaman satu per satu
- `/` (Home) — paling lengkap, taruh semua sections
- `/dokumen` — search + grid kartu
- `/capaian` — stats + chart mock + latest outputs
- `/pengajuan` — form sederhana (5 field)
- `/login` — form login

### 7. API layer
- `src/lib/api.js`: satu fungsi per endpoint
- `docs/api-contract.md`: dokumentasi endpoint + field
- `src/data/mock.js`: data dummy sesuai kontrak

---

## Kegiatan yang harus dilakukan

1. Buat project Vite React
2. Setup Tailwind + font
3. Buat `docs/api-contract.md` (kontrak API backend)
4. Buat semua komponen dasar
5. Buat layout & routing
6. Implementasi 5 halaman utama
7. Buat `src/lib/api.js` + `src/data/mock.js`
8. Verifikasi build → commit
9. Push ke `fe/implementasi-desain`
10. Buat `frontend/README.md`

---

## Catatan penting

- **Jangan** menginstall dependensi di luar React/Vite/Tailwind/Routernya tanpa alasan jelas.
- **Jangan** mengubah apa pun di `app/`, `routes/`, `database/`, `config/`, atau `composer.json`.
- **Jangan** menjalankan `php`, `artisan`, atau `composer`.
- **Jangan** commit zip, `node_modules`, `.env`, atau token.
- Setiap tahap harus **build bersih** (`npm run build`) sebelum commit.

---

## Deadline & halt point

Jika sesi terputus, commit progress terakhir dan laporkan:
1. tahap terakhir yang sudah selesai
2. error jika ada
3. sisa tahap berikutnya
