import fs from 'fs';
import path from 'path';

// Simulasi daftar rute dan tautan
const routes = [
  '/profil', '/profil/tentang', '/profil/visi-misi', '/profil/struktur', '/profil/kontak',
  '/', '/profil', '/layanan/penelitian', '/layanan/pengabdian',
  '/layanan/luaran', '/layanan/luaran/publikasi', '/layanan/luaran/hki',
  '/layanan/luaran/buku', '/layanan/luaran/monograf', '/layanan/kkn',
  '/layanan/e-jurnal', '/layanan/kerjasama', '/info/agenda',
  '/info/pengumuman', '/info/dokumen', '/dokumen/:slug',
  '/info/surat-penugasan', '/dashboard', '/pengajuan', '/kerjasama', '/kerja-sama'
];

const internalLinks = [
  '/', '/dashboard', '/profil/tentang', '/profil/visi-misi', '/profil/struktur',
  '/profil/kontak', '/layanan/penelitian', '/layanan/pengabdian', '/layanan/luaran',
  '/layanan/luaran/publikasi', '/layanan/luaran/hki', '/layanan/luaran/buku',
  '/layanan/luaran/monograf', '/layanan/kkn', '/layanan/e-jurnal', '/layanan/kerjasama',
  '/info/agenda', '/info/pengumuman', '/info/dokumen', '/info/surat-penugasan'
];

console.log("=== CHECK ROUTES SCRIPT ===");
let missingRoutes = 0;
internalLinks.forEach(link => {
  // Sederhanakan pencocokan route
  const found = routes.some(r => r === link || (r.includes(':') && link.startsWith(r.split(':')[0])));
  if (!found) {
    console.log(`[TIDAK ADA RUTE] Tautan internal: ${link}`);
    missingRoutes++;
  }
});

console.log(`Total tautan internal diperiksa: ${internalLinks.length}`);
console.log(`Tautan tanpa rute: ${missingRoutes}`);
