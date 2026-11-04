# Rencana Pemisahan Public & Admin (Separation Plan)

## 1. Struktur Target
```text
frontend/src/
  app/              # Router utama, providers
  shared/           # Komponen UI dasar, token/style, lib/util, mock store
    components/ui/  # Button, Input, Modal, Badge, Icons, dsb.
    styles/         # design tokens, index.css
    lib/            # http client (api.js), mock store bersama
    hooks/
  public/           # Area Publik Pengunjung
    layouts/        # Layout, Navbar, Footer, UtilityBar
    pages/          # Home, Documents, DocumentDetail, Capaian, dsb.
    components/     # Sections (HeroSection, StatCard, ServiceCard, dsb.)
    api/            # Hanya fungsi baca (GET)
  admin/            # Area Panel Admin
    layouts/        # AdminLayout (Sidebar, AdminHeader)
    pages/          # Dashboard, NewsManager, DocumentManager, EventManager, dsb.
    components/     # Komponen khusus admin (DataTable, ConfirmModal, dsb.)
    auth/           # AuthContext, ProtectedRoute, authApi
    api/            # CRUD API untuk konten (list, get, create, update, delete)
```

## 2. Pemetaan & Pemindahan File (dengan `git mv`)
- `src/components/ui/*` -> `src/shared/components/ui/`
- `src/components/forms/*` -> `src/shared/components/forms/`
- `src/components/layout/*` -> `src/public/layouts/`
- `src/components/sections/*` -> `src/public/components/sections/`
- `src/pages/*` -> `src/public/pages/`
- `src/data/mock.js` -> `src/shared/lib/mock.js` (dan mock store)
- `src/lib/api.js` -> `src/shared/lib/api.js`
- `src/index.css` -> `src/shared/styles/index.css`

## 3. Aturan Impor (Enforced via ESLint & Code Convention)
- `@public/*` hanya boleh impor dari `@shared/*`. DILARANG impor dari `@admin/*`.
- `@admin/*` hanya boleh impor dari `@shared/*`. DILARANG impor dari `@public/*`.
- `@shared/*` TIDAK BOLEH impor dari `@public/*` maupun `@admin/*`.
- Link dari publik ke login admin hanya berupa tautan HTML/Link URL (`/admin/login`), bukan impor komponen langsung.

## 4. Mitigasi Risiko
- Path impor akan diperbarui dengan alias `@public`, `@admin`, dan `@shared`.
- Vite config dan jsconfig dikonfigurasi alias path.
- `npm run build` dijalankan setelah pemindahan untuk memastikan semua impor terhubung dengan benar.
