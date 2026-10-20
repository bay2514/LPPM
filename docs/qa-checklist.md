# QA Checklist & Route Audit (LPPM TSU Frontend)

Dokumen ini berisi hasil audit dan pengecekan QA untuk seluruh rute publik dan admin berdasarkan hasil SSR Smoke Test (`scripts/smoke-routes.mjs`), pembacaan kode, dan verifikasi build.

| Rute | Dirender Tanpa Error (SSR/Build) | Data Tampil | Tombol & Tautan Berfungsi | Catatan |
| :--- | :--- | :--- | :--- | :--- |
| `/` (Beranda) | Ya | Ya | Perlu Uji Manual | Lolos smoke test, data dimuat dari `contentStore`. Tautan interaktif perlu uji klik fisik (HP). |
| `/dashboard` | Ya | Ya | Perlu Uji Manual | Grafik & statistik capaian render sukses di SSR. |
| `/penelitian` | Ya | Ya | Perlu Uji Manual | Halaman informasi dan daftar penelitian tampil normal. |
| `/pengabdian` | Ya | Ya | Perlu Uji Manual | Halaman informasi pengabdian masyarakat tampil normal. |
| `/kerjasama` | Ya | Ya | Perlu Uji Manual | Daftar mitra kerjasama dimuat dari store. |
| `/dokumen` | Ya | Ya | Perlu Uji Manual | Pusat unduhan dokumen (pencarian & filter kategori aktif). |
| `/luaran` | Ya | Ya | Perlu Uji Manual | Daftar luaran penelitian/pengabdian tampil normal. |
| `/kegiatan` | Ya | Ya | Perlu Uji Manual | Bug `usePublicData is not defined` telah diperbaiki. Agenda/kegiatan tampil normal. |
| `/berita` | Ya | Ya | Perlu Uji Manual | Daftar berita & artikel riset tampil normal. |
| `/pengajuan` | Ya | Ya | Perlu Uji Manual | Formulir pengajuan layanan LPPM. |
| `/profil` | Ya | Ya | Perlu Uji Manual | Mengarah ke komponen beranda/profil institusi. |
| `*` (404 Not Found) | Ya | Ya | Perlu Uji Manual | Halaman not found render dengan benar dan menyediakan tombol kembali. |
| `/admin/login` | Ya | Ya | Perlu Uji Manual | Halaman masuk admin render sukses. |
| `/admin` (Dasbor Admin) | Ya | Ya | Perlu Uji Manual | Statistik & ringkasan admin render sukses. |
| `/admin/content` (Content Manager) | Ya | Ya | Perlu Uji Manual | Manajemen CRUD konten (berita, kegiatan, dokumen, dll) dengan form tambah/ubah. |
| `/admin/settings` (Pengaturan) | Ya | Ya | Perlu Uji Manual | Pengaturan dasbor dan konfigurasi sistem admin. |

## Keterangan Pengujian
1. **Dirender Tanpa Error**: Diverifikasi via Vite SSR Smoke Test (`node scripts/smoke-routes.mjs`) dan `npm run build`. Semua rute lolos tanpa error runtime/SSR.
2. **Data Tampil**: Data reaktif dari `contentStore` dan `sharedStore` terhubung dengan benar via hook publik bersama (`usePublicData` di `@shared/hooks/usePublicData.js`).
3. **Tombol & Tautan Berfungsi**: Ditandai **"Perlu Uji Manual"** untuk diverifikasi langsung di perangkat mobile / browser interaktif oleh pengguna.
