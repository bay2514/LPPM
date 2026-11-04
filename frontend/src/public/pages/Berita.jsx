import { useState } from "react";
import PageHero from "@shared/components/ui/PageHero.jsx";
import { Newspaper, Calendar, Search, ArrowRight } from "@shared/components/ui/Icons.jsx";
import { useContent } from "@public/hooks/useContent";

export default function Berita() {
  const news = useContent("news");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = ["Semua", "Pengumuman", "Berita", "Agenda"];

  const filtered = news.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) ||
                          (n.excerpt && n.excerpt.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = selectedCategory === "Semua" || n.tag === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="bg-canvas min-h-screen">
      <PageHero 
        title="Pengumuman & Berita"
        description="Informasi resmi, pengumuman hibah, berita kegiatan riset, dan pengabdian masyarakat Universitas Tiga Serangkai."
        badge="Informasi Publik"
      />

      <div className="mx-auto max-w-container px-4 py-12 md:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" size={18} />
            <input
              type="text"
              placeholder="Cari pengumuman atau berita..."
              className="w-full rounded-2xl border border-line bg-surface py-3 pl-12 pr-4 text-sm focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  selectedCategory === cat 
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20" 
                    : "bg-surface text-navy-900 border border-line hover:bg-canvas"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div 
                key={item.id}
                className="group flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm transition-all hover:border-orange-200 hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-lg bg-orange-50 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-orange-700">
                    {item.tag || "Pengumuman"}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold text-ink-400">
                    <Calendar size={14} />
                    {item.date || "2025-03-10"}
                  </span>
                </div>

                <h3 className="mb-3 text-lg font-bold text-navy-950 group-hover:text-orange-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="mb-6 text-sm leading-relaxed text-ink-600 line-clamp-3">
                  {item.excerpt || item.description || "Informasi lengkap mengenai pengumuman resmi LPPM TSU."}
                </p>

                <div className="mt-auto pt-4 border-t border-line flex items-center justify-between">
                  <span className="text-xs font-bold text-ink-500">LPPM TSU</span>
                  <button className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 group-hover:translate-x-1 transition-transform">
                    Baca Selengkapnya
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-3xl border border-dashed border-line bg-surface p-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-canvas text-ink-300">
                <Newspaper size={32} />
              </div>
              <h3 className="text-lg font-bold text-navy-900">Pengumuman Tidak Ditemukan</h3>
              <p className="text-sm text-ink-500">Coba kata kunci lain atau pilih kategori yang berbeda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
