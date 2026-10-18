import React, { useState } from "react";
import { Link } from "react-router-dom";
import { latestOutputs } from "@shared/lib/mock.js";
import { BookOpen, Search, ArrowRight, Download } from "@shared/components/ui/Icons.jsx";

export default function Luaran() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("Semua");

  const tags = ["Semua", "Publikasi", "HKI", "Buku", "Prototipe"];

  const filteredOutputs = latestOutputs.filter(output => {
    const matchesSearch = output.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          output.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === "Semua" || output.tag.toLowerCase() === selectedTag.toLowerCase();
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-canvas pb-16">
      {/* Header */}
      <section className="bg-navy-950 text-white py-12 px-4 md:px-8 border-b border-navy-800">
        <div className="mx-auto max-w-container">
          <div className="inline-flex items-center gap-2 rounded-full bg-navy-800/80 px-3 py-1 text-xs font-semibold text-orange-400 mb-4 border border-navy-700">
            REPOSITORY LUARAN
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">Luaran Penelitian & Pengabdian</h1>
          <p className="text-ink-300 text-sm md:text-base max-w-2xl">
            Kumpulan luaran tridharma perguruan tinggi berupa publikasi ilmiah, Hak Kekayaan Intelektual (HKI), buku ajar, dan prototipe inovasi sivitas akademika Universitas Tiga Serangkai.
          </p>
        </div>
      </section>

      {/* Search & Filter Toolbar */}
      <section className="mx-auto max-w-container px-4 md:px-8 mt-6">
        <div className="bg-surface p-4 rounded-xl border border-line shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-ink-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Cari judul luaran, topik, atau kata kunci..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-canvas border border-line rounded-lg pl-10 pr-4 py-2 text-sm text-navy-900 placeholder-ink-400 focus:outline-none focus:border-orange-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedTag === tag
                    ? "bg-orange-600 text-white shadow-sm"
                    : "bg-canvas text-ink-600 hover:bg-line/50 border border-line"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Daftar Luaran Grid */}
      <section className="mx-auto max-w-container px-4 md:px-8 mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-navy-950">
            Menampilkan {filteredOutputs.length} Luaran Ditemukan
          </h2>
        </div>

        {filteredOutputs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredOutputs.map((output) => (
              <div key={output.id} className="bg-surface p-6 rounded-xl border border-line shadow-card flex flex-col gap-4 hover:border-orange-300 transition-all">
                <div className="flex items-center justify-between">
                  <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
                    {output.tag} • {output.year}
                  </span>
                  <span className="text-xs text-ink-500 font-medium">ID: #{output.id}</span>
                </div>
                <h3 className="text-lg font-bold text-navy-950 leading-snug">{output.title}</h3>
                <p className="text-sm text-ink-600 flex-1 leading-relaxed">{output.description}</p>
                <div className="pt-4 border-t border-line flex items-center justify-between mt-auto">
                  <span className="text-xs text-ink-500 font-medium">LPPM TSU Repository</span>
                  <Link
                    to="/dokumen"
                    className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm font-semibold transition-colors"
                  >
                    Detail Dokumen
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-surface rounded-xl border border-line p-12 text-center text-ink-500 shadow-card">
            <BookOpen size={48} className="mx-auto text-ink-400 mb-3 opacity-50" />
            <h3 className="text-lg font-bold text-navy-950 mb-1">Tidak ada luaran ditemukan</h3>
            <p className="text-sm text-ink-500">Coba gunakan kata kunci pencarian yang lain atau ubah filter kategori.</p>
          </div>
        )}
      </section>
    </div>
  );
}
