import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-navy-950 border-t border-line">
      <div className="mx-auto max-w-container px-4 py-16 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <div className="text-xl font-extrabold tracking-tight text-navy-950">
                LPPM TSU
              </div>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-ink">
              Lembaga Penelitian dan Pengabdian kepada Masyarakat Universitas Tiga
              Serangkai yang mendorong inovasi, riset kolaboratif, dan pengabdian
              berbasis dampak bagi masyarakat luas.
            </p>
          </div>
          <div>
            <h4 className="mb-6 text-sm font-extrabold uppercase tracking-wider text-navy-950">
              Profil
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/profil/tentang" className="text-sm font-semibold text-ink hover:text-orange-600 transition-colors">
                  Tentang LPPM
                </Link>
              </li>
              <li>
                <Link to="/profil/visi-misi" className="text-sm font-semibold text-ink hover:text-orange-600 transition-colors">
                  Visi dan Misi
                </Link>
              </li>
              <li>
                <Link to="/profil/struktur" className="text-sm font-semibold text-ink hover:text-orange-600 transition-colors">
                  Struktur Organisasi
                </Link>
              </li>
              <li>
                <Link to="/profil/kontak" className="text-sm font-semibold text-ink hover:text-orange-600 transition-colors">
                  Kontak Kami
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-sm font-extrabold uppercase tracking-wider text-navy-950">
              Layanan LPPM
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/layanan/penelitian" className="text-sm font-semibold text-ink hover:text-orange-600 transition-colors">
                  Penelitian
                </Link>
              </li>
              <li>
                <Link to="/layanan/pengabdian" className="text-sm font-semibold text-ink hover:text-orange-600 transition-colors">
                  Pengabdian
                </Link>
              </li>
              <li>
                <Link to="/layanan/luaran" className="text-sm font-semibold text-ink hover:text-orange-600 transition-colors">
                  Luaran & Publikasi
                </Link>
              </li>
              <li>
                <Link to="/layanan/kkn" className="text-sm font-semibold text-ink hover:text-orange-600 transition-colors">
                  KKN
                </Link>
              </li>
              <li>
                <Link to="/layanan/e-jurnal" className="text-sm font-semibold text-ink hover:text-orange-600 transition-colors">
                  E-Jurnal
                </Link>
              </li>
              <li>
                <Link to="/layanan/kerjasama" className="text-sm font-semibold text-ink hover:text-orange-600 transition-colors">
                  Kerjasama
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-sm font-extrabold uppercase tracking-wider text-navy-950">
              Info & Dokumen
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/info/agenda" className="text-sm font-semibold text-ink hover:text-orange-600 transition-colors">
                  Agenda Kegiatan
                </Link>
              </li>
              <li>
                <Link to="/info/pengumuman" className="text-sm font-semibold text-ink hover:text-orange-600 transition-colors">
                  Pengumuman & Berita
                </Link>
              </li>
              <li>
                <Link to="/info/dokumen" className="text-sm font-semibold text-ink hover:text-orange-600 transition-colors">
                  Dokumen & SOP
                </Link>
              </li>
              <li>
                <Link to="/info/surat-penugasan" className="text-sm font-semibold text-ink hover:text-orange-600 transition-colors">
                  Surat Penugasan
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm font-semibold text-ink hover:text-orange-600 transition-colors">
                  Dashboard Capaian
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-sm md:flex-row">
          <p className="text-ink">
            © {currentYear} LPPM Universitas Tiga Serangkai. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-ink">Developed by IT Div TSU</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
