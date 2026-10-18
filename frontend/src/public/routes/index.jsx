import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Import lazy public pages
const Home = lazy(() => import("@public/pages/Home.jsx"));
const Documents = lazy(() => import("@public/pages/Documents.jsx"));
const DocumentDetail = lazy(() => import("@public/pages/DocumentDetail.jsx"));
const Capaian = lazy(() => import("@public/pages/Capaian.jsx"));
const DashboardCapaian = lazy(() => import("@public/pages/DashboardCapaian.jsx"));
const Pengajuan = lazy(() => import("@public/pages/Pengajuan.jsx"));
const Berita = lazy(() => import("@public/pages/Berita.jsx"));
const Kegiatan = lazy(() => import("@public/pages/Kegiatan.jsx"));
const Kerjasama = lazy(() => import("@public/pages/Kerjasama.jsx"));
const NotFound = lazy(() => import("@public/pages/NotFound.jsx"));
const Layout = lazy(() => import("@public/layouts/Layout.jsx"));

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
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
          <Route path="/capaian" element={<Capaian />} />
          <Route path="/dashboard" element={<DashboardCapaian />} />
          <Route path="/pengajuan" element={<Pengajuan />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/kegiatan" element={<Kegiatan />} />
          <Route path="/kerjasama" element={<Kerjasama />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
