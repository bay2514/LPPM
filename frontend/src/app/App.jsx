import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@public/layouts/Layout.jsx";
import Home from "@public/pages/Home.jsx";
import Documents from "@public/pages/Documents.jsx";
import DocumentDetail from "@public/pages/DocumentDetail.jsx";
import Capaian from "@public/pages/Capaian.jsx";
import Pengajuan from "@public/pages/Pengajuan.jsx";
import Berita from "@public/pages/Berita.jsx";
import Kegiatan from "@public/pages/Kegiatan.jsx";
import Kerjasama from "@public/pages/Kerjasama.jsx";
import NotFound from "@public/pages/NotFound.jsx";
import Penelitian from "@public/pages/Penelitian.jsx";
import Pengabdian from "@public/pages/Pengabdian.jsx";
import Publikasi from "@public/pages/Publikasi.jsx";
import HKI from "@public/pages/HKI.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Home />} />
          <Route path="/penelitian" element={<Penelitian />} />
          <Route path="/pengabdian" element={<Pengabdian />} />
          <Route path="/publikasi" element={<Publikasi />} />
          <Route path="/hki" element={<HKI />} />
          <Route path="/dokumen" element={<Documents />} />
          <Route path="/dokumen/:slug" element={<DocumentDetail />} />
          <Route path="/capaian" element={<Capaian />} />
          <Route path="/pengajuan" element={<Pengajuan />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/kegiatan" element={<Kegiatan />} />
          <Route path="/kerjasama" element={<Kerjasama />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
