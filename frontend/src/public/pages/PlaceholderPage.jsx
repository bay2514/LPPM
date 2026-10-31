import { Link } from "react-router-dom";
import PageHero from "@shared/components/ui/PageHero.jsx";
import { Download, ArrowRight, Shield, AlertCircle, FileText, Calendar } from "@shared/components/ui/Icons.jsx";
import { useContent } from "@public/hooks/useContent";

export default function PlaceholderPage({ title, description, features = [] }) {
  const documents = useContent("documents");
  const events = useContent("events");
  const news = useContent("news");

  const defaultFeatures = [
    { title: "Panduan & SOP", desc: `Informasi pedoman resmi pelaksanaan ${title.toLowerCase()} LPPM TSU.` },
    { title: "Pengajuan Daring", desc: `Sistem pengajuan proposal dan laporan ${title.toLowerCase()} terintegrasi.` },
    { title: "Monitoring & Evaluasi", desc: `Pelacakan status verifikasi dan capaian luaran secara berkala.` },
  ];

  const displayFeatures = features.length > 0 ? features : defaultFeatures;

  const relatedDocs = documents.slice(0, 3);
  const relatedEvents = events.slice(0, 3);
  const relatedNews = news.slice(0, 3);

  return (
    <div className="bg-canvas min-h-screen">
      <PageHero
        title={title}
        description={description}
        badge="Layanan LPPM"
      >
        <div className="flex flex-wrap gap-4">
          <Link
            to="/info/dokumen"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all focus:ring-2 focus:ring-orange-400"
          >
            <Download size={18} />
            Unduh Panduan
          </Link>
          <Link
            to="/pengajuan"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all focus:ring-2 focus:ring-white/30"
          >
            Ajukan Sekarang
            <ArrowRight size={18} />
          </Link>
        </div>
      </PageHero>

      <div className="mx-auto max-w-container px-4 py-12 md:px-8 md:py-20">
        {/* Feature Grid */}
        <section className="mb-20">
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
        </section>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Dokumen Terkait */}
          <section>
            <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
              <h3 className="flex items-center gap-2 text-xl font-bold text-navy-950">
                <FileText className="text-orange-500" />
                Dokumen & Template
              </h3>
              <Link to="/info/dokumen" className="text-sm font-bold text-orange-600 hover:underline">
                Lihat Semua
              </Link>
            </div>

            <div className="space-y-4">
              {relatedDocs.length > 0 ? (
                relatedDocs.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between rounded-2xl border border-line bg-surface p-5 transition-all hover:border-orange-200 hover:shadow-md">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                        <FileText size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-navy-900 line-clamp-1">{doc.title}</h4>
                        <p className="text-xs text-ink-500">{doc.fileType} • {doc.size}</p>
                      </div>
                    </div>
                    <button className="rounded-xl p-2.5 text-navy-400 hover:bg-canvas hover:text-orange-600">
                      <Download size={20} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-line p-8 text-center text-ink-400">
                  Belum ada dokumen tersedia.
                </div>
              )}
            </div>
          </section>

          {/* Agenda/Kegiatan Terkait */}
          <section>
            <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
              <h3 className="flex items-center gap-2 text-xl font-bold text-navy-950">
                <Calendar className="text-orange-500" />
                Agenda Mendatang
              </h3>
              <Link to="/info/agenda" className="text-sm font-bold text-orange-600 hover:underline">
                Lihat Kalender
              </Link>
            </div>

            <div className="space-y-4">
              {relatedEvents.length > 0 ? (
                relatedEvents.map(event => (
                  <div key={event.id} className="flex items-center gap-5 rounded-2xl border border-line bg-surface p-5 transition-all hover:border-teal-200 hover:shadow-md">
                    <div className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                      <span className="text-xs font-bold uppercase">{event.month}</span>
                      <span className="text-xl font-black">{event.day}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-900 line-clamp-1">{event.title}</h4>
                      <p className="text-xs text-ink-500">{event.meta}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-line p-8 text-center text-ink-400">
                  Tidak ada agenda terdekat.
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Help / Contact Section */}
        <section className="mt-16 rounded-2xl border border-line bg-surface p-8 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
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
        </section>
      </div>
    </div>
  );
}
