export const navigationConfig = [
  { label: "Beranda", to: "/" },
  { label: "Dashboard", to: "/dashboard" },
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
