import React from "react";
import PageHero from "@shared/components/ui/PageHero.jsx";
import Container from "@shared/components/ui/Container.jsx";
import { contentStore } from "@shared/lib/contentStore.js";

export default function Kerjasama() {
  const collaborators = contentStore.getAll("collaborators") || [
    { id: "1", title: "PT Teknologi Nusantara", category: "Industri", year: "2023", description: "Kerjasama riset dan magang mahasiswa." },
    { id: "2", title: "Pemerintah Kota Surakarta", category: "Pemerintah", year: "2023", description: "Pengabdian masyarakat dan hilirisasi teknologi." },
    { id: "3", title: "Universitas Mitra Asia", category: "Akademik", year: "2024", description: "Joint research dan publikasi internasional." },
  ];

  return (
    <div className="min-h-screen bg-canvas pb-20">
      <PageHero
        title="Kolaborasi dengan Industri, Pemerintah, dan Masyarakat"
        subtitle="Membangun sinergi strategis untuk hilirisasi riset, inovasi teknologi, dan pengabdian kepada masyarakat yang berdampak luas."
        badge="Kerja Sama & Kemitraan"
      >
        <div className="mt-8 flex flex-wrap gap-4 items-center justify-center">
          <a
            href="#mitra"
            className="px-6 py-3 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 shadow-lg transition-all min-h-[44px] flex items-center"
          >
            Jelajahi Mitra Strategis
          </a>
        </div>
      </PageHero>

      <Container className="mt-12">
        {/* Indikator Kerjasama & Hilirisasi */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm text-center">
            <div className="text-3xl font-extrabold text-navy-900 mb-1">50+</div>
            <div className="text-sm font-medium text-ink">Mitra Industri & BUMN</div>
          </div>
          <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm text-center">
            <div className="text-3xl font-extrabold text-orange-600 mb-1">25+</div>
            <div className="text-sm font-medium text-ink">Instansi Pemerintah</div>
          </div>
          <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm text-center">
            <div className="text-3xl font-extrabold text-navy-900 mb-1">15+</div>
            <div className="text-sm font-medium text-ink">Perguruan Tinggi Luar Negeri</div>
          </div>
          <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm text-center">
            <div className="text-3xl font-extrabold text-teal-700 mb-1">100%</div>
            <div className="text-sm font-medium text-ink">Hilirisasi Riset Tepat Sasaran</div>
          </div>
        </div>

        {/* Seksi Mitra Potensial / Daftar Mitra */}
        <div id="mitra" className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold text-navy-900">Mitra Kerja Sama Aktif [DATA DESAIN]</h2>
            <span className="text-sm text-ink font-medium">Total: {collaborators.length} Mitra Terdaftar</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collaborators.map((mitra) => (
              <div key={mitra.id} className="p-6 rounded-2xl bg-surface border border-line shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-navy-50 text-navy-800 border border-navy-100">
                      {mitra.category || "Mitra Strategis"}
                    </span>
                    <span className="text-xs text-ink">Sejak {mitra.year || "2023"}</span>
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">{mitra.title}</h3>
                  <p className="text-sm text-ink mb-4">{mitra.description}</p>
                </div>
                <div className="pt-4 border-t border-line flex items-center justify-between text-xs text-ink">
                  <span>Status Kemitraan</span>
                  <span className="font-bold text-teal-700">Aktif & Kolaboratif</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Informasi Pengajuan Kerja Sama */}
        <div className="p-8 rounded-2xl bg-surface border border-line shadow-lg">
          <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Ingin Menjalin Kerja Sama dengan LPPM TSU?</h2>
          <p className="text-ink mb-6 max-w-2xl text-sm">
            Kami terbuka untuk kolaborasi riset, pengembangan teknologi, magang industri, dan program pengabdian masyarakat bersama instansi Anda.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/profil/kontak"
              className="px-6 py-3 rounded-xl bg-navy-900 text-white font-bold hover:bg-navy-800 shadow-md transition-all min-h-[44px] flex items-center"
            >
              Hubungi Tim Kerjasama
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
