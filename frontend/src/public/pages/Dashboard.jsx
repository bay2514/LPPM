import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "@shared/components/ui/PageHero.jsx";
import { Download, ArrowRight, BarChart3, Shield } from "@shared/components/ui/Icons.jsx";
import { stats, analytics } from "@shared/lib/mock.js";

export default function Dashboard() {
  const [selectedProdi, setSelectedProdi] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  const prodiList = [
    { id: "all", name: "Semua Program Studi" },
    { id: "ti", name: "Teknik Informatika" },
    { id: "si", name: "Sistem Informasi" },
    { id: "ak", name: "Akuntansi" },
    { id: "mn", name: "Manajemen" },
  ];

  const yearList = ["all", "2022", "2023", "2024", "2025"];

  const rawPerformanceData = [
    { year: "2022", prodi: "ti", penelitian: 10, pengabdian: 6, publikasi: 18, hki: 4 },
    { year: "2022", prodi: "si", penelitian: 8, pengabdian: 5, publikasi: 14, hki: 3 },
    { year: "2022", prodi: "ak", penelitian: 6, pengabdian: 4, publikasi: 12, hki: 2 },
    { year: "2022", prodi: "mn", penelitian: 4, pengabdian: 3, publikasi: 8, hki: 1 },

    { year: "2023", prodi: "ti", penelitian: 12, pengabdian: 8, publikasi: 22, hki: 5 },
    { year: "2023", prodi: "si", penelitian: 10, pengabdian: 6, publikasi: 18, hki: 4 },
    { year: "2023", prodi: "ak", penelitian: 8, pengabdian: 5, publikasi: 16, hki: 3 },
    { year: "2023", prodi: "mn", penelitian: 5, pengabdian: 3, publikasi: 12, hki: 3 },

    { year: "2024", prodi: "ti", penelitian: 14, pengabdian: 9, publikasi: 25, hki: 7 },
    { year: "2024", prodi: "si", penelitian: 11, pengabdian: 7, publikasi: 20, hki: 6 },
    { year: "2024", prodi: "ak", penelitian: 9, pengabdian: 5, publikasi: 18, hki: 5 },
    { year: "2024", prodi: "mn", penelitian: 6, pengabdian: 4, publikasi: 12, hki: 4 },

    { year: "2025", prodi: "ti", penelitian: 15, pengabdian: 10, publikasi: 28, hki: 9 },
    { year: "2025", prodi: "si", penelitian: 12, pengabdian: 8, publikasi: 24, hki: 8 },
    { year: "2025", prodi: "ak", penelitian: 9, pengabdian: 6, publikasi: 20, hki: 6 },
    { year: "2025", prodi: "mn", penelitian: 6, pengabdian: 4, publikasi: 14, hki: 5 },
  ];

  const filteredData = rawPerformanceData.filter(item => {
    if (selectedProdi !== "all" && item.prodi !== selectedProdi) return false;
    if (selectedYear !== "all" && item.year !== selectedYear) return false;
    return true;
  });

  const years = ["2022", "2023", "2024", "2025"].filter(y => selectedYear === "all" || y === selectedYear);
  
  const chartData = years.map(yr => {
    const records = filteredData.filter(item => item.year === yr);
    const penelitian = records.reduce((acc, curr) => acc + curr.penelitian, 0);
    const pengabdian = records.reduce((acc, curr) => acc + curr.pengabdian, 0);
    const publikasi = records.reduce((acc, curr) => acc + curr.publikasi, 0);
    const hki = records.reduce((acc, curr) => acc + curr.hki, 0);
    return { year: yr, penelitian, pengabdian, publikasi, hki };
  });

  return (
    <div className="bg-canvas min-h-screen">
      <PageHero
        title="Dashboard Capaian"
        description="Visualisasi data kinerja riset, publikasi, pengabdian masyarakat, dan HKI di lingkungan Universitas Tiga Serangkai dengan filter tahun dan program studi."
        badge="Transparansi & Akuntabilitas"
        updated="Maret 2025"
      >
        <div className="flex flex-wrap gap-4">
          <Link
            to="/info/dokumen"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all"
          >
            <Download size={18} />
            Unduh Laporan Tahunan
          </Link>
          <Link
            to="/pengajuan"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all"
          >
            Ajukan Proposal Baru
            <ArrowRight size={18} />
          </Link>
        </div>
      </PageHero>

      <div className="mx-auto max-w-container px-4 py-12 md:px-8 md:py-20">
        {/* KPI Stats Grid */}
        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
              <span className="w-2.5 h-6 bg-orange-500 rounded-full inline-block" />
              Indikator Kinerja Utama (IKU)
            </h2>
            <span className="text-xs font-semibold text-ink-500 bg-surface px-3 py-1.5 rounded-xl border border-line">
              Tahun Akademik Berjalan
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, idx) => (
              <div 
                key={idx}
                className="rounded-2xl border border-line bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-xl group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <BarChart3 size={24} />
                  </div>
                  <span className="text-2xl font-black text-navy-950">{stat.value}</span>
                </div>
                <h3 className="font-bold text-navy-900 text-base mb-1">{stat.label}</h3>
                <p className="text-xs text-ink-500">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Grafik Kinerja Berdasar Tahun & Prodi (Line Chart Style) */}
        <section className="mb-16">
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-navy-950 flex items-center gap-2">
              <span className="w-2.5 h-6 bg-teal-600 rounded-full inline-block" />
              Grafik Kinerja LPPM (Line Chart & Filter)
            </h2>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-surface border border-line rounded-xl px-3 py-1.5">
                <Shield size={16} className="text-orange-500" />
                <span className="text-xs font-medium text-ink-600">Prodi:</span>
                <select 
                  value={selectedProdi}
                  onChange={(e) => setSelectedProdi(e.target.value)}
                  className="bg-transparent text-xs font-bold text-navy-900 focus:outline-none cursor-pointer"
                >
                  {prodiList.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 bg-surface border border-line rounded-xl px-3 py-1.5">
                <span className="text-xs font-medium text-ink-600">Tahun:</span>
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="bg-transparent text-xs font-bold text-navy-900 focus:outline-none cursor-pointer"
                >
                  <option value="all">Semua Tahun</option>
                  {yearList.filter(y => y !== "all").map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6 md:p-8 shadow-card">
            {/* SVG Line Chart Simulator */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center justify-between mb-6 pb-4 border-b border-line gap-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-500 inline-block" />
                    <span className="text-xs font-bold text-navy-900">Penelitian</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-teal-600 inline-block" />
                    <span className="text-xs font-bold text-navy-900">Pengabdian</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-navy-900 inline-block" />
                    <span className="text-xs font-bold text-navy-900">Publikasi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                    <span className="text-xs font-bold text-navy-900">HKI</span>
                  </div>
                </div>
                <span className="text-xs font-medium text-ink-500">
                  Menampilkan data untuk: <strong className="text-navy-900">{prodiList.find(p => p.id === selectedProdi)?.name}</strong> ({selectedYear === "all" ? "Semua Tahun" : selectedYear})
                </span>
              </div>

              {/* Chart Canvas Mock using SVG Polyline / Points */}
              <div className="relative h-64 w-full bg-canvas rounded-xl border border-line p-4 flex flex-col justify-between">
                {/* Horizontal grid lines */}
                <div className="absolute inset-x-4 inset-y-4 flex flex-col justify-between pointer-events-none opacity-20">
                  <div className="border-b border-navy-900 w-full" />
                  <div className="border-b border-navy-900 w-full" />
                  <div className="border-b border-navy-900 w-full" />
                  <div className="border-b border-navy-900 w-full" />
                </div>

                {/* SVG Line Visualizer */}
                <svg className="absolute inset-0 h-full w-full p-6 overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
                  {/* Penelitian Line */}
                  <path 
                    d={chartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${i * (600 / (chartData.length || 1)) + 50} ${200 - (d.penelitian * 2.5)}`).join(' ')} 
                    fill="none" 
                    stroke="#ff6b35" 
                    strokeWidth="3" 
                  />
                  {/* Pengabdian Line */}
                  <path 
                    d={chartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${i * (600 / (chartData.length || 1)) + 50} ${200 - (d.pengabdian * 2.5)}`).join(' ')} 
                    fill="none" 
                    stroke="#2B7C8C" 
                    strokeWidth="3" 
                  />
                  {/* Publikasi Line */}
                  <path 
                    d={chartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${i * (600 / (chartData.length || 1)) + 50} ${200 - (d.publikasi * 1.5)}`).join(' ')} 
                    fill="none" 
                    stroke="#0B2C4D" 
                    strokeWidth="3" 
                  />
                  {/* HKI Line */}
                  <path 
                    d={chartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${i * (600 / (chartData.length || 1)) + 50} ${200 - (d.hki * 3)}`).join(' ')} 
                    fill="none" 
                    stroke="#F2B01E" 
                    strokeWidth="3" 
                  />
                </svg>

                {/* X-Axis Labels */}
                <div className="mt-auto pt-4 flex justify-around text-xs font-bold text-ink-600 relative z-10 border-t border-line">
                  {chartData.map((d, i) => (
                    <div key={i} className="text-center">
                      <span>Tahun {d.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Data Table for Current Filter */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-xs font-bold uppercase text-ink-500">
                    <th className="pb-3">Tahun</th>
                    <th className="pb-3">Penelitian</th>
                    <th className="pb-3">Pengabdian</th>
                    <th className="pb-3">Publikasi</th>
                    <th className="pb-3">HKI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {chartData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-canvas transition-colors">
                      <td className="py-3 font-bold text-navy-900">{row.year}</td>
                      <td className="py-3 text-ink-700 font-semibold">{row.penelitian} judul</td>
                      <td className="py-3 text-ink-700 font-semibold">{row.pengabdian} judul</td>
                      <td className="py-3 text-ink-700 font-semibold">{row.publikasi} artikel</td>
                      <td className="py-3 text-ink-700 font-semibold">{row.hki} sertifikat</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Analytics Summary */}
        <section className="rounded-2xl border border-line bg-gradient-to-r from-navy-950 to-navy-900 p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/30">
              Total Pendanaan & Proposal
            </span>
            <h3 className="text-2xl font-extrabold mt-3 text-white">Akumulasi Pendanaan Riset & Pengabdian</h3>
            <p className="text-ink-300 text-sm mt-1">Total pendanaan tersalurkan mencapai {analytics.totalFunding} dengan total {analytics.totalProposals} proposal aktif.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/10 border border-white/10 rounded-xl p-5 text-center min-w-[130px]">
              <span className="block text-2xl font-black text-orange-400">{analytics.totalFunding}</span>
              <span className="text-xs text-ink-300">Total Pendanaan</span>
            </div>
            <div className="bg-white/10 border border-white/10 rounded-xl p-5 text-center min-w-[130px]">
              <span className="block text-2xl font-black text-teal-400">{analytics.totalProposals}</span>
              <span className="text-xs text-ink-300">Total Proposal</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
