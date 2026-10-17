import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Documents from "./pages/Documents.jsx";
import DocumentDetail from "./pages/DocumentDetail.jsx";
import Capaian from "./pages/Capaian.jsx";
import Pengajuan from "./pages/Pengajuan.jsx";
import Berita from "./pages/Berita.jsx";
import Kegiatan from "./pages/Kegiatan.jsx";
import Kerjasama from "./pages/Kerjasama.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
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
