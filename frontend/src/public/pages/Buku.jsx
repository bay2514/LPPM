import LayananDetail from "./LayananDetail.jsx";

export default function Buku() {
  const steps = [
    {
      title: "Draft Naskah Buku",
      description: "Penyusunan naskah buku ajar atau referensi sesuai kaidah penulisan ilmiah dan ISBN."
    },
    {
      title: "Review & Layout",
      description: "Proses peer review internal, editing, tata letak, dan pembuatan desain cover buku."
    },
    {
      title: "Penerbitan ISBN",
      description: "Pengurusan nomor ISBN resmi dan publikasi buku untuk kebutuhan akademik."
    }
  ];

  return (
    <LayananDetail 
      title="Buku Ajar & Referensi"
      description="Fasilitasi penulisan, penerbitan, dan pengurusan ISBN buku ajar, monograf, serta referensi hasil riset dosen TSU."
      steps={steps}
      docCategory="Panduan"
      eventTag="Buku"
    />
  );
}
