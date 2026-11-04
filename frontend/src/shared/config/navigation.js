export const navigationConfig = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Beranda", to: "/" },
  {
    label: "Profil",
    to: "/profil/tentang",
    children: [
      { label: "Tentang LPPM", to: "/profil/tentang" },
      { label: "Visi dan Misi", to: "/profil/visi-misi" },
      { label: "Struktur Organisasi", to: "/profil/struktur" },
      { label: "Kontak Kami", to: "/profil/kontak" },
    ],
  },
  {
    label: "Layanan LPPM",
    to: "/layanan/penelitian",
    children: [
      { label: "Penelitian", to: "/layanan/penelitian" },
      { label: "Pengabdian", to: "/layanan/pengabdian" },
      {
        label: "Luaran",
        to: "/layanan/luaran",
        children: [
          { label: "Publikasi", to: "/layanan/luaran/publikasi" },
          { label: "HKI", to: "/layanan/luaran/hki" },
          { label: "Buku", to: "/layanan/luaran/buku" },
          { label: "Monograf", to: "/layanan/luaran/monograf" },
        ],
      },
      { label: "KKN", to: "/layanan/kkn" },
      { label: "E-Jurnal", to: "/layanan/e-jurnal" },
      { label: "Kerjasama", to: "/layanan/kerjasama" },
    ],
  },
  {
    label: "Info LPPM",
    to: "/info/agenda",
    children: [
      { label: "Agenda", to: "/info/agenda" },
      { label: "Pengumuman", to: "/info/pengumuman" },
      { label: "Dokumen", to: "/info/dokumen" },
      { label: "Surat Penugasan", to: "/info/surat-penugasan" },
    ],
  },
];
