import React from "react";
import { useLocation } from "react-router-dom";
import PageHero from "@shared/components/ui/PageHero.jsx";
import Container from "@shared/components/ui/Container.jsx";
import { contentStore } from "@shared/lib/contentStore.js";

export default function Profil() {
  const location = useLocation();
  const path = location.pathname;

  // Tentukan tab aktif berdasarkan path
  let activeTab = "tentang";
  if (path.includes("visi-misi")) activeTab = "visi-misi";
  else if (path.includes("struktur")) activeTab = "struktur";
  else if (path.includes("kontak")) activeTab = "kontak";

  const profileData = contentStore.getSingle("profile") || {
    name: "LPPM Universitas Tiga Serangkai (TSU)",
    history: "Lembaga Penelitian dan Pengabdian kepada Masyarakat (LPPM) Universitas Tiga Serangkai (TSU) didirikan sebagai wadah penggerak utama Tridharma Perguruan Tinggi dalam bidang riset dan pengabdian kepada masyarakat.",
    vision: "Menjadi lembaga riset dan pengabdian yang unggul, mandiri, dan bereputasi internasional dalam pengembangan ilmu pengetahuan dan teknologi untuk kesejahteraan bangsa.",
    mission: [
      "Menyelenggarakan penelitian berkualitas tinggi yang berorientasi pada inovasi dan pemecahan masalah.",
      "Melaksanakan pengabdian kepada masyarakat yang aplikatif, memberdayakan, dan berkelanjutan.",
      "Mengembangkan kerjasama strategis dengan industri, pemerintah, dan institusi global.",
      "Mewujudkan tata kelola LPPM yang profesional, transparan, dan akuntabel."
    ]
  };

  const structure = [
    { role: "Rektor Universitas Tiga Serangkai", name: "Prof. Dr. H. Budi Santoso, M.Si." },
    { role: "Ketua LPPM TSU", name: "Dr. Ir. Retno Wulandari, M.T." },
    { role: "Sekretaris LPPM", name: "Dr. Ahmad Fauzi, S.Kom., M.Cs." },
    { role: "Kepala Pusat Penelitian", name: "Dr. Dian Puspita, S.Si., M.Sc." },
    { role: "Kepala Pusat Pengabdian", name: "Ir. Joko Susilo, M.Eng." },
  ];

  return (
    <div className="min-h-screen bg-canvas pb-20">
      <PageHero
        title="Profil LPPM Universitas Tiga Serangkai"
        subtitle="Mengenal lebih dekat visi, misi, struktur organisasi, dan komitmen kami dalam memajukan riset dan inovasi."
        badge="Tentang LPPM"
      >
        <div className="mt-8 flex flex-wrap gap-3 items-center justify-center">
          <a
            href="/profil/tentang"
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all min-h-[44px] flex items-center ${
              activeTab === "tentang" ? "bg-orange-600 text-white shadow-md" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Tentang LPPM
          </a>
          <a
            href="/profil/visi-misi"
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all min-h-[44px] flex items-center ${
              activeTab === "visi-misi" ? "bg-orange-600 text-white shadow-md" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Visi & Misi
          </a>
          <a
            href="/profil/struktur"
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all min-h-[44px] flex items-center ${
              activeTab === "struktur" ? "bg-orange-600 text-white shadow-md" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Struktur Organisasi
          </a>
          <a
            href="/profil/kontak"
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all min-h-[44px] flex items-center ${
              activeTab === "kontak" ? "bg-orange-600 text-white shadow-md" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Kontak Kami
          </a>
        </div>
      </PageHero>

      <Container className="mt-12">
        {activeTab === "tentang" && (
          <div className="p-8 rounded-2xl bg-surface border border-line shadow-lg space-y-6">
            <h2 className="text-2xl font-extrabold text-navy-900">Tentang LPPM TSU</h2>
            <p className="text-ink leading-relaxed">{profileData.history}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-line">
              <div className="p-5 rounded-xl bg-canvas border border-line">
                <div className="text-2xl font-extrabold text-navy-900 mb-1">2010</div>
                <div className="text-sm text-ink">Tahun Berdiri Lembaga</div>
              </div>
              <div className="p-5 rounded-xl bg-canvas border border-line">
                <div className="text-2xl font-extrabold text-orange-600 mb-1">500+</div>
                <div className="text-sm text-ink">Judul Riset Per Tahun</div>
              </div>
              <div className="p-5 rounded-xl bg-canvas border border-line">
                <div className="text-2xl font-extrabold text-teal-700 mb-1">A</div>
                <div className="text-sm text-ink">Akreditasi Institusi Unggul</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "visi-misi" && (
          <div className="space-y-8">
            <div className="p-8 rounded-2xl bg-surface border border-line shadow-lg">
              <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Visi Utama</h2>
              <p className="text-lg font-medium text-navy-800 bg-navy-50 p-6 rounded-xl border border-navy-100 italic">
                "{profileData.vision}"
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-surface border border-line shadow-lg">
              <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Misi LPPM TSU</h2>
              <ul className="space-y-4">
                {Array.isArray(profileData.mission) && profileData.mission.map((misi, idx) => (
                  <li key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-canvas border border-line">
                    <span className="w-8 h-8 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-ink font-medium pt-1">{misi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "struktur" && (
          <div className="p-8 rounded-2xl bg-surface border border-line shadow-lg">
            <h2 className="text-2xl font-extrabold text-navy-900 mb-6">Struktur Organisasi LPPM TSU</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {structure.map((item, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-canvas border border-line flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-navy-900 text-white font-extrabold flex items-center justify-center text-lg flex-shrink-0">
                    {item.name.charAt(4)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy-900">{item.name}</h3>
                    <p className="text-sm text-orange-600 font-semibold">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "kontak" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-surface border border-line shadow-lg space-y-6">
              <h2 className="text-2xl font-extrabold text-navy-900">Hubungi Kami</h2>
              <p className="text-ink text-sm">
                Silakan kunjungi kantor kami atau hubungi melalui saluran komunikasi resmi di bawah ini.
              </p>
              <div className="space-y-4 text-sm text-ink">
                <div className="flex items-start gap-3">
                  <span className="font-bold text-navy-900 min-w-[100px]">Alamat:</span>
                  <span>Gedung Rektorat Lt. 3, Kampus Utama Universitas Tiga Serangkai, Jl. Merdeka No. 45, Surakarta</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-navy-900 min-w-[100px]">Email:</span>
                  <span>lppm@tsu.ac.id</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-navy-900 min-w-[100px]">Telepon:</span>
                  <span>(0271) 5551234</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-navy-900 min-w-[100px]">Jam Kerja:</span>
                  <span>Senin - Jumat: 08.00 - 16.00 WIB</span>
                </div>
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-surface border border-line shadow-lg flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-4 text-2xl font-bold">
                📍
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">Lokasi Kampus Utama</h3>
              <p className="text-sm text-ink mb-6">Pusat riset dan pengabdian masyarakat Universitas Tiga Serangkai.</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 transition-all min-h-[44px] flex items-center"
              >
                Buka di Google Maps
              </a>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
