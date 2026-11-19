import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-navy-950 border-t border-line">
      <div className="mx-auto max-w-container px-4 py-16 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
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
              Menu Cepat & Layanan
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/pengajuan" className="text-sm font-semibold text-ink hover:text-orange-600 transition-colors">
                  Pengajuan Proposal & Layanan
                </Link>
              </li>
              <li>
                <Link to="/layanan/penelitian" className="text-sm font-semibold text-ink hover:text-orange-600 transition-colors">
                  Panduan & Riset Penelitian
                </Link>
              </li>
              <li>
                <Link to="/layanan/pengabdian" className="text-sm font-semibold text-ink hover:text-orange-600 transition-colors">
                  Panduan Pengabdian Masyarakat
                </Link>
              </li>
              <li>
                <Link to="/layanan/luaran/hki" className="text-sm font-semibold text-ink hover:text-orange-600 transition-colors">
                  Sertifikat & HKI
                </Link>
              </li>
              <li>
                <Link to="/info/dokumen" className="text-sm font-semibold text-ink hover:text-orange-600 transition-colors">
                  Pusat Dokumen & SOP
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm font-semibold text-ink hover:text-orange-600 transition-colors">
                  Dashboard Capaian
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-sm font-extrabold uppercase tracking-wider text-navy-950">
              Kontak
            </h4>
            <ul className="space-y-3 text-sm text-ink">
              <li>
                Gedung Rektorat Lt. 2, Kampus Utama Universitas Tiga Serangkai
              </li>
              <li>
                <a href="mailto:lppm@tsu.ac.id" className="hover:text-orange-600 transition-colors">
                  lppm@tsu.ac.id
                </a>
              </li>
              <li>
                <span>(0271) 788-2123</span>
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
