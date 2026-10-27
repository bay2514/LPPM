import { MapPin, Mail, Phone } from "@shared/components/ui/Icons.jsx";
import { Link } from "react-router-dom";
import logo from "@assets/logo-lppm-tsu.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white">
      <div className="mx-auto max-w-container px-4 py-16 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <img src={logo} alt="Logo LPPM TSU" className="h-12 w-auto rounded-xl bg-white p-2 shadow-sm" />
              <div className="text-xl font-extrabold tracking-tight text-white">LPPM TSU</div>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-ink-500">
              Lembaga Penelitian dan Pengabdian kepada Masyarakat Universitas Tiga
              Serangkai yang mendorong inovasi, riset kolaboratif, dan pengabdian
              berbasis dampak bagi masyarakat luas.
            </p>
            <div className="flex gap-3">
              <a href="#" className="rounded-xl bg-navy-900 p-3 hover:bg-orange-500 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="rounded-xl bg-navy-900 p-3 hover:bg-orange-500 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="mb-6 text-sm font-extrabold uppercase tracking-wider text-white">Menu Cepat</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/pengajuan" className="text-sm font-medium text-ink-400 hover:text-orange-400 transition-colors">
                  Pengajuan Proposal & Layanan
                </Link>
              </li>
              <li>
                <Link to="/penelitian" className="text-sm font-medium text-ink-400 hover:text-orange-400 transition-colors">
                  Panduan & Riset Penelitian
                </Link>
              </li>
              <li>
                <Link to="/pengabdian" className="text-sm font-medium text-ink-400 hover:text-orange-400 transition-colors">
                  Panduan Pengabdian Masyarakat
                </Link>
              </li>
              <li>
                <Link to="/hki" className="text-sm font-medium text-ink-400 hover:text-orange-400 transition-colors">
                  Sertifikat & HKI
                </Link>
              </li>
              <li>
                <Link to="/dokumen" className="text-sm font-medium text-ink-400 hover:text-orange-400 transition-colors">
                  Pusat Dokumen & SOP
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm font-medium text-ink-400 hover:text-orange-400 transition-colors">
                  Dashboard Capaian
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-sm font-extrabold uppercase tracking-wider text-white">Kontak</h4>
            <ul className="space-y-3 text-sm text-ink-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-orange-500" />
                <span className="leading-relaxed">
                  Gedung Rektorat Lt. 2<br />
                  Kampus Utama Universitas Tiga Serangkai
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-orange-500" />
                <a href="mailto:lppm@tsu.ac.id" className="hover:text-orange-400 transition-colors">
                  lppm@tsu.ac.id
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-orange-500" />
                <span>(0271) 788-2123</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm md:flex-row">
          <p className="text-ink-500">© {currentYear} LPPM Universitas Tiga Serangkai. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-ink-500">Developed by IT Div TSU</p>
            <Link to="/admin/login" className="rounded-lg bg-orange-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-orange-700 transition-colors" title="Masuk Portal Admin">
              Masuk Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
