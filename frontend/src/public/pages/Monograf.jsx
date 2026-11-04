import LayananDetail from "./LayananDetail.jsx";

export default function Monograf() {
  const steps = [
    {
      title: "Pengajuan Naskah",
      description: "Penyampaian hasil penelitian mendalam (monograf) kepada pengelola penerbitan LPPM."
    },
    {
      title: "Kurasi & Penyuntingan",
      description: "Penilaian substansi oleh pakar bidang ilmu dan penyuntingan bahasa serta format."
    },
    {
      title: "Penerbitan & Distribusi",
      description: "Pencetakan fisik/digital, registrasi ISBN, dan pendistribusian monograf."
    }
  ];

  return (
    <LayananDetail 
      title="Monograf Penelitian"
      description="Penerbitan karya ilmiah tingkat lanjut yang memuat hasil penelitian mendalam dan spesifik dalam satu bidang ilmu."
      steps={steps}
      docCategory="Panduan"
      eventTag="Monograf"
    />
  );
}
