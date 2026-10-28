import { Link } from "react-router-dom";
import PageHero from "@shared/components/ui/PageHero.jsx";
import { Download, ArrowRight, CheckCircle2, Calendar, FileText } from "@shared/components/ui/Icons.jsx";
import { useContent } from "@public/hooks/useContent";

export default function LayananDetail({ 
  title, 
  description, 
  steps = [], 
  docCategory, 
  eventTag 
}) {
  const documents = useContent("documents");
  const events = useContent("events");
  const news = useContent("news");

  // Filter related content
  const relatedDocs = documents
    .filter(d => d.category === docCategory)
    .slice(0, 3);
  
  const relatedEvents = events
    .filter(e => e.tag === eventTag || title.toLowerCase().includes(e.title.toLowerCase()))
    .slice(0, 3);

  const relatedNews = news
    .filter(n => n.tag === eventTag || n.title.toLowerCase().includes(title.toLowerCase()))
    .slice(0, 3);

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
            Mulai Pengajuan
            <ArrowRight size={18} />
          </Link>
        </div>
      </PageHero>

      <div className="mx-auto max-w-container px-4 py-12 md:px-8 md:py-20">
        {/* Alur Program */}
        <section className="mb-20">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-extrabold text-navy-950 md:text-3xl">Alur Pelaksanaan</h2>
            <p className="mt-2 text-ink-500">Tiga tahapan utama dalam mengikuti program {title.toLowerCase()}.</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center group">
                {idx < steps.length - 1 && (
                  <div className="absolute left-[60%] top-12 hidden h-0.5 w-[80%] bg-line md:block" />
                )}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 shadow-sm transition-all group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-500/20">
                  <span className="text-2xl font-black">{idx + 1}</span>
                </div>
                <h3 className="mb-3 text-lg font-bold text-navy-900">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ink-600">{step.description}</p>
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
      </div>
    </div>
  );
}
