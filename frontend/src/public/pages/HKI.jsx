import LayananDetail from "./LayananDetail.jsx";

export default function HKI() {
  const steps = [
    {
      title: "Penyusunan Berkas",
      description: "Menyiapkan deskripsi ciptaan, formulir pengalihan hak, dan surat pernyataan keaslian."
    },
    {
      title: "Pemeriksaan & Pendaftaran",
      description: "Verifikasi dokumen oleh tim HKI LPPM dan pengajuan ke Direktorat Jenderal Kekayaan Intelektual (DJKI)."
    },
    {
      title: "Penerbitan Sertifikat",
      description: "Penerbitan sertifikat Hak Cipta / Paten / Desain Industri resmi dari Kemenkumham."
    }
  ];

  return (
    <LayananDetail 
      title="Hak Kekayaan Intelektual (HKI)"
      description="Layanan perlindungan hukum atas karya cipta, paten, merek, dan desain industri hasil inovasi civitas akademika Universitas Tiga Serangkai."
      steps={steps}
      docCategory="SOP"
      eventTag="HKI"
    />
  );
}
