import { Link } from "react-router-dom";
import { FileText, Download, ArrowRight, Shield, AlertCircle } from "@shared/components/ui/Icons.jsx";

export default function PlaceholderPage({ title, description, features = [] }) {
  const defaultFeatures = [
    { title: "Panduan & SOP", desc: `Informasi pedoman resmi pelaksanaan ${title.toLowerCase()} LPPM TSU.` },
    { title: "Pengajuan Daring", desc: `Sistem pengajuan proposal dan laporan ${title.toLowerCase()} terintegrasi.` },
    { title: "Monitoring & Evaluasi", desc: `Pelacakan status verifikasi dan capaian luaran secara berkala.` },
  ];

  const displayFeatures = features.length > 0 ? features : defaultFeatures;

  return (
    <div className="bg-canvas min-h-[calc(100vh-200px)] py-12 md:py-16">
      <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
        {/* Header Hero Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 p-8 md:p-12 text-white shadow-2xl mb-12">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block rounded-full bg-orange-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-400 border border-orange-500/30 mb-4">
              Layanan & Informasi
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
              {title}
            </h1>
            <p className="text-ink-200 text-base md:text-lg leading-relaxed">
              {description || `Pusat informasi, pedoman, dan manajemen ${title.toLowerCase()} di lingkungan Lembaga Penelitian dan Pengabdian kepada Masyarakat Universitas Tiga Serangkai.`}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/dokumen"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all"
              >
                <Download size={18} />
                Unduh Panduan
              </Link>
              <Link
                to="/pengajuan"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all"
              >
                Ajukan Sekarang
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          {/* Subtle background decoration */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
          <div className="absolute right-12 top-0 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
        </div>

        {/* Feature Grid */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-navy-950 mb-6 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-orange-500 rounded-full inline-block" />
            Fitur & Ruang Lingkup
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {displayFeatures.map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl border border-line bg-surface p-6 shadow-md transition-all hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-xl"
              >
                <div className="mb-4 inline-flex p-3 rounded-xl bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <Shield size={24} />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-ink-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Help / Contact Section */}
        <div className="rounded-2xl border border-line bg-surface p-8 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-teal-50 text-teal-600">
              <AlertCircle size={28} />
            </div>
            <div>
              <h3 className="font-bold text-navy-900 text-lg">Butuh Bantuan atau Konsultasi?</h3>
              <p className="text-sm text-ink-500">Tim LPPM TSU siap membantu proses pengajuan dan administrasi Anda.</p>
            </div>
          </div>
          <Link
            to="/dokumen"
            className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-2.5 text-sm font-semibold text-navy-900 hover:bg-canvas transition-colors whitespace-nowrap"
          >
            Lihat SOP & Regulasi
          </Link>
        </div>
      </div>
    </div>
  );
}
