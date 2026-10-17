import { useMemo, useState } from "react";
import HeroSection from "@public/components/sections/HeroSection.jsx";
import NewsCard from "@public/components/sections/NewsCard.jsx";
import { usePublicData } from "@public/hooks/useStore.js";
import { Search } from "@shared/components/ui/Icons.jsx";

const CATEGORIES = ["Semua", "Pengumuman", "Penelitian", "Pengabdian", "Kegiatan"];

export default function Berita() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");
  const news = usePublicData("news");

  const filteredNews = useMemo(() => {
    return news.filter((n) => {
      const matchQuery =
        !query ||
        n.title.toLowerCase().includes(query.toLowerCase()) ||
        n.description.toLowerCase().includes(query.toLowerCase());
      const matchCategory = category === "Semua" || n.tag === category;
      return matchQuery && matchCategory;
    });
  }, [query, category]);

  return (
    <>
      <HeroSection
        badge="Informasi LPPM"
        title="Berita & Pengumuman"
        description="Dapatkan kabar terbaru seputar kegiatan penelitian, pengabdian masyarakat, dan pengumuman resmi LPPM."
        dark
      />

      <section className="bg-canvas py-10">
        <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                    category === c
                      ? "bg-navy-800 text-white"
                      : "bg-surface border border-line text-ink-700 hover:bg-canvas"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari berita..."
                className="w-full rounded-lg border border-line bg-surface py-2 pl-9 pr-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Grid Berita */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((n, idx) => (
              <NewsCard key={n.id} news={n} variant={idx === 0 ? "featured" : "default"} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
