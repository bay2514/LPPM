import LayananDetail from "./LayananDetail.jsx";

export default function Penelitian() {
  const steps = [
    {
      title: "Pengajuan Proposal",
      description: "Dosen/mahasiswa mengunggah proposal sesuai template melalui portal SIM-LPPM."
    },
    {
      title: "Review & Penetapan",
      description: "Proses seleksi oleh reviewer internal/eksternal dan pengumuman pemenang hibah."
    },
    {
      title: "Pelaksanaan & Pelaporan",
      description: "Pelaksanaan riset, monitoring kemajuan (monev), dan penyerahan laporan akhir."
    }
  ];

  return (
    <LayananDetail 
      title="Penelitian"
      description="Pusat keunggulan riset Universitas Tiga Serangkai yang mendorong inovasi melalui pendanaan internal, kemitraan strategis, dan publikasi bereputasi global."
      steps={steps}
      docCategory="Panduan"
      eventTag="Pengumuman"
    />
  );
}
