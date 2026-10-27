import PlaceholderPage from "./PlaceholderPage.jsx";

export default function Dashboard() {
  return (
    <PlaceholderPage
      title="Dashboard Capaian"
      description="Visualisasi data capaian riset, publikasi, dan pengabdian masyarakat di lingkungan Universitas Tiga Serangkai."
      features={[
        { title: "Statistik Riset", desc: "Data kumulatif penelitian per fakultas dan program studi." },
        { title: "Luaran Publikasi", desc: "Tren publikasi jurnal internasional bereputasi dan nasional." },
        { title: "Sertifikasi HKI", desc: "Status pendaftaran dan kepemilikan Hak Kekayaan Intelektual." }
      ]}
    />
  );
}
