import { Link } from "react-router-dom";
import PageHero from "@shared/components/ui/PageHero.jsx";
import { BookOpen, Award, FileText, Newspaper, ArrowRight } from "@shared/components/ui/Icons.jsx";
import { useContent } from "@public/hooks/useContent";

export default function Luaran() {
  const outputs = useContent("latestOutputs");

  const categories = [
    {
      title: "Publikasi",
      description: "Jurnal ilmiah, prosiding, dan artikel populer hasil riset.",
      icon: <Newspaper size={32} />,
      to: "/layanan/luaran/publikasi",
      count: outputs.filter(o => o.tag === "Jurnal" || o.tag === "Publikasi").length,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "HKI",
      description: "Hak Cipta, Paten, Merek, dan Desain Industri.",
      icon: <Award size={32} />,
      to: "/layanan/luaran/hki",
      count: outputs.filter(o => o.tag === "HKI").length,
      color: "bg-teal-50 text-teal-600",
    },
    {
      title: "Buku",
      description: "Buku ajar, referensi, monograf, dan chapter book.",
      icon: <BookOpen size={32} />,
      to: "/layanan/luaran/buku",
      count: outputs.filter(o => o.tag === "Buku").length,
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Monograf",
      description: "Laporan riset mendalam dan hasil studi spesifik.",
      icon: <FileText size={32} />,
      to: "/layanan/luaran/monograf",
      count: outputs.filter(o => o.tag === "Monograf").length,
      color: "bg-navy-50 text-navy-700",
    },
  ];

  return (
    <div className="bg-canvas min-h-screen">
      <PageHero 
        title="Luaran & Capaian"
        description="Katalog publikasi ilmiah, kekayaan intelektual, dan karya akademik sivitas akademika Universitas Tiga Serangkai sebagai bukti nyata dampak riset."
        badge="Repositori Luaran"
      />

      <div className="mx-auto max-w-container px-4 py-16 md:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.to}
              className="group relative flex flex-col rounded-2xl border border-line bg-surface p-8 shadow-md transition-all hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-xl"
            >
              <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${cat.color} group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold text-navy-950 group-hover:text-orange-600 transition-colors">{cat.title}</h3>
              <p className="mb-6 text-sm leading-relaxed text-ink-500">
                {cat.description}
              </p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-2xl font-black text-navy-900">{cat.count}</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-canvas text-navy-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <ArrowRight size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-16 rounded-3xl bg-navy-900 p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">Ingin Mendaftarkan Luaran Anda?</h2>
            <p className="text-ink-300 mb-8 leading-relaxed">
              Pastikan setiap hasil penelitian dan pengabdian Anda tercatat untuk meningkatkan skor SINTA dan performa akademik universitas. Tim LPPM siap membantu proses pendaftaran HKI dan verifikasi publikasi.
            </p>
            <Link
              to="/pengajuan"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all"
            >
              Ajukan Pencatatan Luaran
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl" />
        </div>
      </div>
    </div>
  );
}
