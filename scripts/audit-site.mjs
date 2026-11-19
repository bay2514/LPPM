import fs from 'fs';
import path from 'path';

// Kita buat skrip Node.js untuk mengecek dan merender tiap halaman menggunakan Vite
console.log("=== BAGIAN B: RENDER DAN UKUR TIAP HALAMAN ===");
// Kita bisa menggunakan Vite server untuk load module atau membaca komponen dan menghitung metrik teks, section, card, dll.

const routes = [
  { path: '/', component: 'frontend/src/public/pages/Home.jsx' },
  { path: '/profil', component: 'frontend/src/public/pages/Home.jsx' },
  { path: '/layanan/penelitian', component: 'frontend/src/public/pages/Penelitian.jsx' },
  { path: '/layanan/pengabdian', component: 'frontend/src/public/pages/Pengabdian.jsx' },
  { path: '/layanan/luaran', component: 'frontend/src/public/pages/Luaran.jsx' },
  { path: '/layanan/luaran/publikasi', component: 'frontend/src/public/pages/Publikasi.jsx' },
  { path: '/layanan/luaran/hki', component: 'frontend/src/public/pages/HKI.jsx' },
  { path: '/layanan/luaran/buku', component: 'frontend/src/public/pages/Buku.jsx' },
  { path: '/layanan/luaran/monograf', component: 'frontend/src/public/pages/Monograf.jsx' },
  { path: '/layanan/kkn', component: 'frontend/src/public/pages/KKN.jsx' },
  { path: '/info/agenda', component: 'frontend/src/public/pages/Kegiatan.jsx' },
  { path: '/info/pengumuman', component: 'frontend/src/public/pages/Berita.jsx' },
  { path: '/info/dokumen', component: 'frontend/src/public/pages/Documents.jsx' },
  { path: '/dokumen/:slug', component: 'frontend/src/public/pages/DocumentDetail.jsx' },
  { path: '/info/surat-penugasan', component: 'frontend/src/public/pages/SuratPenugasan.jsx' },
  { path: '/dashboard', component: 'frontend/src/public/pages/Dashboard.jsx' },
  { path: '/pengajuan', component: 'frontend/src/public/pages/Pengajuan.jsx' },
  { path: '/kerjasama', component: 'frontend/src/public/pages/Kerjasama.jsx' },
  { path: '/admin/login', component: 'frontend/src/admin/pages/auth/Login.jsx' },
  { path: '/admin', component: 'frontend/src/admin/pages/Dashboard.jsx' },
  { path: '/admin/berita', component: 'frontend/src/admin/pages/content/ContentManagerPage.jsx' },
  { path: '/admin/mitra', component: 'frontend/src/admin/pages/content/ContentManagerPage.jsx' },
  { path: '/admin/kegiatan', component: 'frontend/src/admin/pages/content/ContentManagerPage.jsx' },
  { path: '/admin/dokumen', component: 'frontend/src/admin/pages/content/ContentManagerPage.jsx' },
  { path: '/admin/profil', component: 'frontend/src/admin/pages/content/ContentManagerPage.jsx' },
  { path: '/admin/struktur', component: 'frontend/src/admin/pages/content/ContentManagerPage.jsx' },
  { path: '/admin/prodi', component: 'frontend/src/admin/pages/content/ContentManagerPage.jsx' },
  { path: '/admin/data-kinerja', component: 'frontend/src/admin/pages/content/ContentManagerPage.jsx' },
  { path: '/admin/dashboard-config', component: 'frontend/src/admin/pages/content/ContentManagerPage.jsx' },
];

console.log(`Total rute unik yang dianalisis: ${routes.length}`);
routes.forEach(r => {
  if (fs.existsSync(r.component)) {
    const code = fs.readFileSync(r.component, 'utf8');
    const lines = code.split('\n').length;
    const size = code.length;
    let status = 'LENGKAP';
    if (size < 500) status = 'KERANGKA';
    else if (code.includes('EmptyState') || size < 1500) status = 'SEBAGIAN';
    console.log(`- ${r.path} (${r.component}): ${size} chars, ${lines} lines -> Status: ${status}`);
  } else {
    console.log(`- ${r.path} (${r.component}): TIDAK DITEMUKAN -> Status: KOSONG`);
  }
});
