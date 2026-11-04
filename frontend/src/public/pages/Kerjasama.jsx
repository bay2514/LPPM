import PlaceholderPage from "./PlaceholderPage.jsx";
export default function Kerjasama() { 
  return <PlaceholderPage 
    title="Kerjasama"
    description="Informasi dan sistem pengelolaan kerjasama dalam bidang penelitian, pengabdian, dan inovasi antara LPPM dengan mitra institusi, industri, dan masyarakat."
    features={[
      { title: "Mitra Institusi", desc: "Kerja sama dengan perguruan tinggi, lembaga riset, dan organisasi nasional/internasional." },
      { title: "Kerja Sama Industri", desc: "Kolaborasi riset terapan, pendanaan, dan pengembangan inovasi berbasis industri." },
      { title: "Program Duta Inovasi", desc: "Jaringan kolaborator internal dan eksternal untuk mendorong inovasi bersama." }
    ]}
  />; 
}
