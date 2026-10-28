import LayananDetail from "./LayananDetail.jsx";

export default function KKN() {
  const steps = [
    {
      title: "Pendaftaran Peserta",
      description: "Pendaftaran mahasiswa dan pemilihan lokasi KKN sesuai bidang ilmu/tema."
    },
    {
      title: "Pembekalan & Pelepasan",
      description: "Pemberian materi persiapan lapangan oleh DPL dan pelepasan resmi ke lokasi."
    },
    {
      title: "Pelaksanaan di Desa",
      description: "Penyusunan program kerja, implementasi di lapangan, dan pelaporan mingguan."
    }
  ];

  return (
    <LayananDetail 
      title="KKN-PPM"
      description="Kuliah Kerja Nyata Pembelajaran Pemberdayaan Masyarakat (KKN-PPM) sebagai wadah mahasiswa berkontribusi langsung pada pembangunan desa."
      steps={steps}
      docCategory="Panduan"
      eventTag="KKN"
    />
  );
}
