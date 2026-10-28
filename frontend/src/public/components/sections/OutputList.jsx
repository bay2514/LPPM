import { useState } from "react";
import { Search, Calendar, ExternalLink, FileText } from "@shared/components/ui/Icons.jsx";
import { useContent } from "@public/hooks/useContent";

export default function OutputList({ type, title }) {
  const allOutputs = useContent("latestOutputs");
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("Semua");

  const filtered = allOutputs.filter(o => {
    const matchesType = type === "Publikasi" 
      ? (o.tag === "Jurnal" || o.tag === "Publikasi")
      : o.tag === type;
    const matchesSearch = o.title.toLowerCase().includes(search.toLowerCase()) || 
                          (o.description && o.description.toLowerCase().includes(search.toLowerCase()));
    const matchesYear = year === "Semua" || String(o.year) === year;
    
    return matchesType && matchesSearch && matchesYear;
  });

  const years = ["Semua", ...new Set(allOutputs.map(o => String(o.year)))].sort((a, b) => b - a);

  return (
    <div className="py-8">
      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" size={18} />
          <input
            type="text"
            placeholder={`Cari ${title.toLowerCase()}...`}
            className="w-full rounded-2xl border border-line bg-surface py-3 pl-12 pr-4 text-sm focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-navy-900">Tahun:</span>
          <select
            className="rounded-xl border border-line bg-surface px-4 py-2 text-sm font-semibold focus:border-orange-500 focus:outline-none transition-all"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-line bg-surface p-6 shadow-sm transition-all hover:border-orange-200 hover:shadow-md"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-lg bg-orange-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-orange-700">
                      {item.tag}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-ink-500">
                      <Calendar size={14} />
                      {item.year}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-navy-950 group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-600">
                    {item.description}
                  </p>
                </div>
                
                <div className="flex shrink-0 items-center gap-2">
                  <button className="inline-flex items-center gap-2 rounded-xl bg-canvas px-4 py-2 text-xs font-bold text-navy-900 hover:bg-navy-900 hover:text-white transition-all">
                    <FileText size={16} />
                    Detail
                  </button>
                  <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white transition-all">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-line bg-canvas p-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface text-ink-300">
            <Search size={32} />
          </div>
          <h3 className="text-lg font-bold text-navy-900">Tidak ditemukan</h3>
          <p className="text-sm text-ink-500">
            Coba sesuaikan kata kunci atau filter tahun Anda.
          </p>
        </div>
      )}
    </div>
  );
}
