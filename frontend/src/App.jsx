import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Documents from "./pages/Documents.jsx";
import Capaian from "./pages/Capaian.jsx";
import Pengajuan from "./pages/Pengajuan.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dokumen" element={<Documents />} />
          <Route path="/capaian" element={<Capaian />} />
          <Route path="/pengajuan" element={<Pengajuan />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
