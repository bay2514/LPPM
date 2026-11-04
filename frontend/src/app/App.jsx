import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import Layout from "@public/layouts/Layout.jsx";
import Home from "@public/pages/Home.jsx";
import Documents from "@public/pages/Documents.jsx";
import DocumentDetail from "@public/pages/DocumentDetail.jsx";
import Dashboard from "@public/pages/Dashboard.jsx";
import Luaran from "@public/pages/Luaran.jsx";
import Pengajuan from "@public/pages/Pengajuan.jsx";
import Berita from "@public/pages/Berita.jsx";
import Kegiatan from "@public/pages/Kegiatan.jsx";
import Kerjasama from "@public/pages/Kerjasama.jsx";
import NotFound from "@public/pages/NotFound.jsx";
import Penelitian from "@public/pages/Penelitian.jsx";
import Pengabdian from "@public/pages/Pengabdian.jsx";
import Publikasi from "@public/pages/Publikasi.jsx";
import HKI from "@public/pages/HKI.jsx";
import Buku from "@public/pages/Buku.jsx";
import Monograf from "@public/pages/Monograf.jsx";
import KKN from "@public/pages/KKN.jsx";
import SuratPenugasan from "@public/pages/SuratPenugasan.jsx";
import { ErrorBoundary } from "@components/ErrorBoundary.jsx";

const AdminRoutes = lazy(() => import("@admin/routes/index.jsx"));

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profil" element={<Home />} />
            
            {/* Layanan */}
            <Route path="/layanan/penelitian" element={<Penelitian />} />
            <Route path="/layanan/pengabdian" element={<Pengabdian />} />
            <Route path="/layanan/luaran" element={<Luaran />} />
            <Route path="/layanan/luaran/publikasi" element={<Publikasi />} />
            <Route path="/layanan/luaran/hki" element={<HKI />} />
            <Route path="/layanan/luaran/buku" element={<Buku />} />
            <Route path="/layanan/luaran/monograf" element={<Monograf />} />
            <Route path="/layanan/kkn" element={<KKN />} />

            {/* Info */}
            <Route path="/info/agenda" element={<Kegiatan />} />
            <Route path="/info/pengumuman" element={<Berita />} />
            <Route path="/info/dokumen" element={<Documents />} />
            <Route path="/dokumen/:slug" element={<DocumentDetail />} />
            <Route path="/info/surat-penugasan" element={<SuratPenugasan />} />

            {/* Legacy & flat routes redirect or map directly */}
            <Route path="/penelitian" element={<Navigate to="/layanan/penelitian" replace />} />
            <Route path="/pengabdian" element={<Navigate to="/layanan/pengabdian" replace />} />
            <Route path="/publikasi" element={<Navigate to="/layanan/luaran/publikasi" replace />} />
            <Route path="/hki" element={<Navigate to="/layanan/luaran/hki" replace />} />
            <Route path="/dokumen" element={<Navigate to="/info/dokumen" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/luaran" element={<Navigate to="/layanan/luaran" replace />} />
            <Route path="/pengajuan" element={<Pengajuan />} />
            <Route path="/berita" element={<Navigate to="/info/pengumuman" replace />} />
            <Route path="/kegiatan" element={<Navigate to="/info/agenda" replace />} />
            <Route path="/kerjasama" element={<Kerjasama />} />
            <Route path="/agenda" element={<Navigate to="/info/agenda" replace />} />
            <Route path="/pengumuman" element={<Navigate to="/info/pengumuman" replace />} />
            <Route path="/kkn" element={<Navigate to="/layanan/kkn" replace />} />
            <Route path="/surat-penugasan" element={<Navigate to="/info/surat-penugasan" replace />} />
            <Route path="/capaian" element={<Navigate to="/dashboard" replace />} />

            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin area */}
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/login" element={<Navigate to="/admin/login" replace />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
