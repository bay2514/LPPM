import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

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
          <Route path="/" element={<Home />} />
          <Route path="/dokumen" element={<Documents />} />
          <Route path="/dokumen/:slug" element={<DocumentDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/luaran" element={<Luaran />} />
          <Route path="/pengajuan" element={<Pengajuan />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/kegiatan" element={<Kegiatan />} />
          <Route path="/kerjasama" element={<Kerjasama />} />
          <Route path="/penelitian" element={<Penelitian />} />
          <Route path="/pengabdian" element={<Pengabdian />} />
          <Route path="/publikasi" element={<Publikasi />} />
          <Route path="/hki" element={<HKI />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
