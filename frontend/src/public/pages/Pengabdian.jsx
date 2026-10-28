import LayananDetail from "./LayananDetail.jsx";

export default function Pengabdian() {
  const steps = [
    {
      title: "Identifikasi Masalah",
      description: "Analisis kebutuhan masyarakat mitra dan penyusunan rencana aksi pengabdian."
    },
    {
      title: "Verifikasi & Hibah",
      description: "Pemeriksaan kelayakan proposal dan pencairan dana hibah pengabdian masyarakat."
    },
    {
      title: "Implementasi Solusi",
      description: "Penerapan teknologi atau ilmu pengetahuan kepada mitra dan evaluasi dampak."
    }
  ];

  return (
    <LayananDetail 
      title="Pengabdian Masyarakat"
      description="Inisiatif strategis untuk mentransformasikan ilmu pengetahuan dan teknologi menjadi solusi nyata bagi permasalahan masyarakat dan pengembangan wilayah."
      steps={steps}
      docCategory="SOP"
      eventTag="Pengabdian"
    />
  );
}
