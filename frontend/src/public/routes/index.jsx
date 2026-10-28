import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import lazy public pages
const Home = lazy(() => import("@public/pages/Home.jsx"));
const Documents = lazy(() => import("@public/pages/Documents.jsx"));
const DocumentDetail = lazy(() => import("@public/pages/DocumentDetail.jsx"));
const Dashboard = lazy(() => import("@public/pages/Dashboard.jsx"));
const Luaran = lazy(() => import("@public/pages/Luaran.jsx"));
const Pengajuan = lazy(() => import("@public/pages/Pengajuan.jsx"));
const Berita = lazy(() => import("@public/pages/Berita.jsx"));
const Kegiatan = lazy(() => import("@public/pages/Kegiatan.jsx"));
const Kerjasama = lazy(() => import("@public/pages/Kerjasama.jsx"));
const Penelitian = lazy(() => import("@public/pages/Penelitian.jsx"));
const Pengabdian = lazy(() => import("@public/pages/Pengabdian.jsx"));
const Publikasi = lazy(() => import("@public/pages/Publikasi.jsx"));
const HKI = lazy(() => import("@public/pages/HKI.jsx"));
const PlaceholderPage = lazy(() => import("@public/pages/PlaceholderPage.jsx"));
const NotFound = lazy(() => import("@public/pages/NotFound.jsx"));
const Layout = lazy(() => import("@public/layouts/Layout.jsx"));

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-canvas">
    <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function PublicRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<Layout />}>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Layanan LPPM Routes */}
          <Route path="/layanan/penelitian" element={<Penelitian />} />
          <Route path="/layanan/pengabdian" element={<Pengabdian />} />
          <Route path="/layanan/luaran" element={<Luaran />} />
          <Route path="/layanan/luaran/publikasi" element={<Publikasi />} />
          <Route path="/layanan/luaran/hki" element={<HKI />} />
          <Route
            path="/layanan/luaran/buku"
            element={
              <PlaceholderPage
                title="Buku"
                description="Katalog buku referensi, ajar, dan monograf hasil riset sivitas akademika Universitas Tiga Serangkai."
              />
            }
          />
          <Route
            path="/layanan/luaran/monograf"
            element={
              <PlaceholderPage
                title="Monograf"
                description="Koleksi monograf ilmiah dan laporan riset mendalam LPPM TSU."
              />
            }
          />
          <Route
            path="/layanan/kkn"
            element={
              <PlaceholderPage
                title="KKN"
                description="Kuliah Kerja Nyata Pembelajaran Pemberdayaan Masyarakat (KKN-PPM) Universitas Tiga Serangkai."
              />
            }
          />

          {/* Info LPPM Routes */}
          <Route path="/info/agenda" element={<Kegiatan />} />
          <Route path="/info/pengumuman" element={<Berita />} />
          <Route path="/info/dokumen" element={<Documents />} />
          <Route path="/dokumen/:slug" element={<DocumentDetail />} />
          <Route
            path="/info/surat-penugasan"
            element={
              <PlaceholderPage
                title="Surat Penugasan"
                description="Daftar surat penugasan penelitian, pengabdian, dan tugas resmi LPPM TSU."
              />
            }
          />

          {/* Unlisted active routes (Kerjasama & Pengajuan) */}
          <Route path="/kerjasama" element={<Kerjasama />} />
          <Route path="/pengajuan" element={<Pengajuan />} />

          {/* Old Route Redirects (Navigate replace to prevent 404) */}
          <Route path="/dokumen" element={<Navigate to="/info/dokumen" replace />} />
          <Route path="/kegiatan" element={<Navigate to="/info/agenda" replace />} />
          <Route path="/berita" element={<Navigate to="/info/pengumuman" replace />} />
          <Route path="/luaran" element={<Navigate to="/layanan/luaran" replace />} />
          <Route path="/penelitian" element={<Navigate to="/layanan/penelitian" replace />} />
          <Route path="/pengabdian" element={<Navigate to="/layanan/pengabdian" replace />} />
          <Route path="/capaian" element={<Navigate to="/dashboard" replace />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
