import React, { useState } from "react";
import { rowsFor, totals, delta } from "@shared/lib/analytics.js";
import { UPDATED, PRODI } from "@shared/lib/dashboardData.js";
import { FileText, Award, BookOpen, ShieldCheck, Users, MapPin, TrendingUp, TrendingDown, Download, Search } from "@shared/components/ui/Icons.jsx";

// Komponen Grafik (SVG Internal)
const BarChart = ({ data, title, color = "#3b82f6" }) => {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="bg-navy-900 rounded-lg p-6 border border-navy-800" role="img" aria-label={`Grafik ${title}`}>
      <h3 className="text-sm font-semibold text-ink-300 mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="w-24 text-xs text-ink-400 truncate">{d.label}</span>
            <div className="flex-1 h-3 bg-navy-950 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full" 
                style={{ width: `${(d.value / max) * 100}%`, backgroundColor: color }}
              />
            </div>
            <span className="w-8 text-xs font-bold text-white text-right">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function DashboardCapaian() {
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedProdi, setSelectedProdi] = useState("Semua Prodi");

  const currentYear = parseInt(selectedYear, 10);
  const currentRows = rowsFor(currentYear, selectedProdi);
  const currentTotals = totals(currentRows, currentYear, selectedProdi);
  
  // Data untuk grafik per prodi pada tahun tersebut
  const chartData = PRODI.map(p => {
    const r = rowsFor(currentYear, p);
    const tot = totals(r, currentYear, p);
    return { label: p, value: tot.penelitian };
  }).sort((a, b) => b.value - a.value).slice(0, 5);

  const kpis = [
    { title: "Penelitian Aktif", value: currentTotals.penelitian, delta: delta(currentYear, selectedProdi, "penelitian"), icon: FileText, color: "text-blue-600 bg-blue-50 border-blue-100" },
    { title: "PKM Aktif", value: currentTotals.pkm, delta: delta(currentYear, selectedProdi, "pkm"), icon: Award, color: "text-orange-600 bg-orange-50 border-orange-100" },
    { title: "Publikasi Ilmiah", value: currentTotals.publikasi, delta: delta(currentYear, selectedProdi, "publikasi"), icon: BookOpen, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { title: "HKI Terdaftar", value: currentTotals.hki, delta: delta(currentYear, selectedProdi, "hki"), icon: ShieldCheck, color: "text-purple-600 bg-purple-50 border-purple-100" },
    { title: "Mitra Strategis", value: currentTotals.mitra, delta: delta(currentYear, selectedProdi, "mitra"), icon: Users, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
    { title: "Desa Binaan", value: currentTotals.desa, delta: delta(currentYear, selectedProdi, "desa"), icon: MapPin, color: "text-teal-600 bg-teal-50 border-teal-100" },
  ];

  // Handler Unduh CSV
  const handleDownloadCSV = () => {
    const headers = ["ID", "Tahun", "Prodi", "Penelitian", "PKM", "Publikasi", "HKI", "Dana (Juta)"];
    const csvRows = [headers.join(",")];
    
    currentRows.forEach(row => {
      const values = [row.id, row.tahun, `"${row.prodi}"`, row.penelitian, row.pkm, row.publikasi, row.hki, row.danaJuta];
      csvRows.push(values.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `laporan-capaian-${selectedYear}-${selectedProdi.toLowerCase().replace(/\s+/g, "-")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-canvas pb-16">
      <section className="bg-navy-950 text-white py-12 px-4 md:px-8 border-b border-navy-800">
        <div className="mx-auto max-w-container">
          <div className="inline-flex items-center gap-2 rounded-full bg-navy-800/80 px-3 py-1 text-xs font-semibold text-orange-400 mb-4 border border-navy-700">
            DASHBOARD CAPAIAN
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">Dashboard Capaian LPPM</h1>
          <p className="text-ink-300 text-sm md:text-base max-w-2xl mb-4">Monitoring kinerja penelitian, pengabdian masyarakat, publikasi, dan hilirisasi.</p>
          <div className="text-xs font-medium text-ink-400">Diperbarui: {UPDATED}</div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="mx-auto max-w-container px-4 md:px-8 mt-6">
        <div className="bg-surface p-4 rounded-xl border border-line shadow-card flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div>
              <label className="block text-xs font-semibold text-ink-600 mb-1">Tahun</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-canvas border border-line rounded-lg px-3 py-2 text-sm text-navy-900 font-medium focus:outline-none focus:border-orange-500"
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-600 mb-1">Program Studi</label>
              <select
                value={selectedProdi}
                onChange={(e) => setSelectedProdi(e.target.value)}
                className="bg-canvas border border-line rounded-lg px-3 py-2 text-sm text-navy-900 font-medium focus:outline-none focus:border-orange-500"
              >
                <option value="Semua Prodi">Semua Program Studi</option>
                {PRODI.map((p, idx) => (
                  <option key={idx} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={handleDownloadCSV}
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
          >
            <Download size={16} />
            Unduh CSV
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-container px-4 md:px-8 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            const isPositive = kpi.delta.diff >= 0;
            return (
              <div key={idx} className="bg-surface rounded-xl p-4 shadow-card border border-line flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-ink-500 uppercase truncate">{kpi.title}</span>
                  <div className={`p-2 rounded-lg border ${kpi.color}`}><Icon size={18} /></div>
                </div>
                <div className="text-2xl font-extrabold text-navy-900">{typeof kpi.value === "number" ? kpi.value.toLocaleString("id-ID") : kpi.value}</div>
                <div className="flex items-center gap-1 text-[11px] font-medium text-ink-600 mt-2">
                  {typeof kpi.delta.diff === "number" && (
                    isPositive ? <TrendingUp size={14} className="text-emerald-600" /> : <TrendingDown size={14} className="text-red-600" />
                  )}
                  <span className={isPositive ? "text-emerald-700" : "text-red-700"}>{kpi.delta.text}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Seksi Pulse LPPM */}
      <section className="mx-auto max-w-container px-4 md:px-8 mt-12">
        <h2 className="text-2xl font-bold text-navy-950 mb-6">Pulse LPPM</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <BarChart data={chartData} title={`Top 5 Prodi Penelitian (${selectedYear})`} />
          <div className="bg-surface p-6 rounded-lg border border-line shadow-card flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-ink-700 mb-4">Ringkasan Kinerja {selectedYear}</h3>
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 border border-orange-100 rounded-lg">
                  <div className="text-sm text-orange-800">Total Pendanaan Riset & PKM</div>
                  <div className="text-2xl font-bold text-orange-950">Rp {currentTotals.danaJuta.toLocaleString("id-ID")} Juta</div>
                </div>
                <div className="p-4 bg-navy-50 border border-navy-100 rounded-lg">
                  <div className="text-sm text-navy-800">Total Luaran (Publikasi + HKI)</div>
                  <div className="text-2xl font-bold text-navy-950">{(currentTotals.publikasi + currentTotals.hki).toLocaleString("id-ID")}</div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-ink-500 italic">
              * Data diambil dari database LPPM TSU yang terintegrasi dengan Sistem Informasi Akademik.
            </div>
          </div>
        </div>
      </section>

      {/* Tabel Rincian */}
      <section className="mx-auto max-w-container px-4 md:px-8 mt-12">
        <h2 className="text-2xl font-bold text-navy-950 mb-6">Rincian Data Kinerja</h2>
        <div className="bg-surface rounded-xl border border-line shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-canvas border-b border-line text-xs font-semibold text-ink-600 uppercase">
                  <th className="p-4">No</th>
                  <th className="p-4">Tahun</th>
                  <th className="p-4">Program Studi</th>
                  <th className="p-4 text-right">Penelitian</th>
                  <th className="p-4 text-right">PKM</th>
                  <th className="p-4 text-right">Publikasi</th>
                  <th className="p-4 text-right">HKI</th>
                  <th className="p-4 text-right">Dana (Juta Rp)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-sm text-navy-900">
                {currentRows.length > 0 ? (
                  currentRows.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-canvas/50 transition-colors">
                      <td className="p-4 text-ink-500">{idx + 1}</td>
                      <td className="p-4 font-medium">{row.tahun}</td>
                      <td className="p-4 font-semibold">{row.prodi}</td>
                      <td className="p-4 text-right">{row.penelitian}</td>
                      <td className="p-4 text-right">{row.pkm}</td>
                      <td className="p-4 text-right">{row.publikasi}</td>
                      <td className="p-4 text-right">{row.hki}</td>
                      <td className="p-4 text-right font-bold text-orange-600">{row.danaJuta}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-ink-500">
                      Tidak ada data untuk filter yang dipilih.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
