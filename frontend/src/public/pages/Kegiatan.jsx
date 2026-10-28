import { useState } from "react";
import PageHero from "@shared/components/ui/PageHero.jsx";
import { Calendar, MapPin, Search } from "@shared/components/ui/Icons.jsx";
import { useContent } from "@public/hooks/useContent";

export default function Kegiatan() {
  const events = useContent("events");
  const [search, setSearch] = useState("");

  const filtered = events.filter(e => 
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    (e.meta && e.meta.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-canvas min-h-screen">
      <PageHero 
        title="Agenda LPPM"
        description="Jadwal kegiatan, webinar, workshop, sosialisasi hibah, dan agenda penting LPPM Universitas Tiga Serangkai."
        badge="Informasi Agenda"
      />

      <div className="mx-auto max-w-container px-4 py-12 md:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" size={18} />
            <input
              type="text"
              placeholder="Cari agenda atau lokasi..."
              className="w-full rounded-2xl border border-line bg-surface py-3 pl-12 pr-4 text-sm focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="text-sm font-semibold text-ink-500">
            Menampilkan {filtered.length} agenda kegiatan
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div 
                key={item.id}
                className="group flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm transition-all hover:border-orange-200 hover:shadow-md"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-orange-50 text-orange-600 shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-all">
                    <span className="text-xs font-bold uppercase">{item.month || "Mar"}</span>
                    <span className="text-2xl font-black">{item.day || "12"}</span>
                  </div>
                  <div>
                    <span className="rounded-lg bg-canvas px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-600 border border-line">
                      Agenda Resmi
                    </span>
                    <h3 className="mt-2 text-base font-bold text-navy-950 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-line flex items-center gap-2 text-xs font-semibold text-ink-500">
                  <MapPin size={14} className="text-orange-500 shrink-0" />
                  <span className="line-clamp-1">{item.meta || "Auditorium LPPM TSU"}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-3xl border border-dashed border-line bg-surface p-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-canvas text-ink-300">
                <Calendar size={32} />
              </div>
              <h3 className="text-lg font-bold text-navy-900">Agenda Tidak Ditemukan</h3>
              <p className="text-sm text-ink-500">Coba kata kunci lain untuk pencarian agenda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
