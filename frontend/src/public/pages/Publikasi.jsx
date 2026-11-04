import LayananDetail from "./LayananDetail.jsx";

export default function Publikasi() {
  const steps = [
    {
      title: "Penulisan & Submit",
      description: "Penyusunan naskah ilmiah sesuai template jurnal/prosiding target dan submit via OJS/portal."
    },
    {
      title: "Review & Revisi",
      description: "Peer review oleh mitra bebestari dan perbaikan naskah sesuai catatan reviewer."
    },
    {
      title: "Acceptance & Publikasi",
      description: "Penerbitan artikel dan pelaporan luaran untuk mendapatkan insentif LPPM TSU."
    }
  ];

  return (
    <LayananDetail 
      title="Publikasi Ilmiah"
      description="Fasilitasi dan insentif publikasi artikel ilmiah dosen dan mahasiswa pada jurnal nasional berakreditasi (SINTA) maupun internasional bereputasi (Scopus/WoS)."
      steps={steps}
      docCategory="Panduan"
      eventTag="Publikasi"
    />
  );
}
