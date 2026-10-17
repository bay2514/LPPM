import { useMemo, useState } from "react";
import { documents } from "../data/mock.js";
import { Search, Download, FileText, Inbox } from "../components/ui/Icons.jsx";

const CATEGORIES = ["Semua", "Panduan", "Template", "SOP", "SK", "LPJ"];
const YEARS = ["Semua Tahun", "2025", "2024", "2023"];

export default function Documents() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");
  const [year, setYear] = useState("Semua Tahun");

  const filtered = useMemo(() => {
    return documents.filter((doc) => {
      const matchQuery =
        !query ||
        doc.title.toLowerCase().includes(query.toLowerCase()) ||
        doc.description.toLowerCase().includes(query.toLowerCase());
      const matchCategory = category === "Semua" || doc.category === category;
      const matchYear = year === "Semua Tahun" || String(doc.year) === year;
      return matchQuery && matchCategory && matchYear;
    });
  }, [query, category, year]);

  return (
    <>
      {/* Page header */}
      <section className="border-b border-line bg-white py-10">
        <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-3 text-xs text-ink-500">
            <ol className="flex items-center gap-1">
              <li><a href="/" className="hover:text-orange-500">Beranda</a></li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-ink-700">Pusat Unduhan</li>
            </ol>
          </nav>
          <h1 className="text-3xl font-extrabold text-navy-800 md:text-4xl">Pusat Unduhan</h1>
          <p className="mt-2 max-w-2xl text-sm text-ink-500 md:text-base">
            Kumpulan dokumen resmi LPPM: panduan, template, SOP, surat keputusan, dan laporan
            pertanggungjawaban yang dapat diunduh oleh seluruh civitas akademika.
          </p>
        </div>
      </section>

      <section className="bg-canvas py-10">
        <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
            {/* Sidebar filter */}
            <aside className="space-y-6">
              <div>
                <label htmlFor="doc-search" className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink-500">
                  Cari Dokumen
                </label>
                <div className="relative">
                  <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
                  <input
                    id="doc-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Kata kunci..."
                    className="w-full rounded-md border border-line bg-surface py-2.5 pl-9 pr-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-500">Kategori</h2>
                <ul className="space-y-1">
                  {CATEGORIES.map((c) => (
                    <li key={c}>
                      <button
                        onClick={() => setCategory(c)}
                        className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${category === c ? "bg-navy-800 text-white" : "text-ink-700 hover:bg-surface"}`}
                        aria-pressed={category === c}
                      >
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <label htmlFor="doc-year" className="mb-2 block text-xs font-bold uppercase tracking-wider text-ink-500">
                  Tahun
                </label>
                <select
                  id="doc-year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full rounded-md border border-line bg-surface px-3 py-2.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </aside>

            {/* List */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-ink-500">
                  Menampilkan <span className="font-semibold text-ink-900">{filtered.length}</span> dokumen
                </p>
              </div>

              {filtered.length === 0 ? (
                <div className="flex flex-col items-center rounded-lg border border-dashed border-line bg-surface px-6 py-16 text-center">
                  <Inbox size={40} className="mb-3 text-ink-500" />
                  <h3 className="text-base font-bold text-navy-800">Dokumen tidak ditemukan</h3>
                  <p className="mt-1 text-sm text-ink-500">Coba ubah kata kunci atau filter yang dipilih.</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {filtered.map((doc) => (
                    <li
                      key={doc.id}
                      className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-5 shadow-card sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex gap-4">
                        <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-md bg-navy-50 text-navy-700 sm:flex">
                          <FileText size={22} />
                        </div>
                        <div>
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-orange-700">
                              {doc.category}
                            </span>
                            <span className="text-[11px] font-medium text-ink-500">
                              {doc.fileType} • {doc.size} • {doc.year}
                            </span>
                          </div>
                          <h3 className="text-base font-bold leading-snug text-navy-800">{doc.title}</h3>
                          <p className="mt-1 text-sm text-ink-500">{doc.description}</p>
                        </div>
                      </div>
                      <a
                        href={`#unduh-${doc.slug}`}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-orange-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-orange-600"
                      >
                        <Download size={16} />
                        Unduh
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
