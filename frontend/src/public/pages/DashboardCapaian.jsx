import React, { useState } from "react";
import { rowsFor, totals, delta } from "@shared/lib/analytics.js";
import { UPDATED } from "@shared/lib/dashboardData.js";
import { FileText, Award, BookOpen, ShieldCheck, Users, MapPin, TrendingUp, TrendingDown, ChevronDown } from "@shared/components/ui/Icons.jsx";

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
  const currentYear = 2026;
  const currentRows = rowsFor(currentYear);
  const currentTotals = totals(currentRows, currentYear);
  
  // Data dummy untuk grafik
  const chartData = [
    { label: "Informatika", value: 12 },
    { label: "Manajemen", value: 10 },
    { label: "Teknik Sipil", value: 8 },
  ];

  const kpis = [
    { title: "Penelitian Aktif", value: currentTotals.penelitian, delta: delta(currentYear, "Semua Prodi", "penelitian"), icon: FileText, color: "text-blue-600 bg-blue-50 border-blue-100" },
    { title: "PKM Aktif", value: currentTotals.pkm, delta: delta(currentYear, "Semua Prodi", "pkm"), icon: Award, color: "text-orange-600 bg-orange-50 border-orange-100" },
    { title: "Publikasi Ilmiah", value: currentTotals.publikasi, delta: delta(currentYear, "Semua Prodi", "publikasi"), icon: BookOpen, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { title: "HKI Terdaftar", value: currentTotals.hki, delta: delta(currentYear, "Semua Prodi", "hki"), icon: ShieldCheck, color: "text-purple-600 bg-purple-50 border-purple-100" },
    { title: "Mitra Strategis", value: currentTotals.mitra, delta: delta(currentYear, "Semua Prodi", "mitra"), icon: Users, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
    { title: "Desa Binaan", value: currentTotals.desa, delta: delta(currentYear, "Semua Prodi", "desa"), icon: MapPin, color: "text-teal-600 bg-teal-50 border-teal-100" },
  ];

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

      <section className="mx-auto max-w-container px-4 md:px-8 -mt-6">
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
                <div className="text-2xl font-extrabold text-navy-900">{kpi.value.toLocaleString("id-ID")}</div>
                <div className="flex items-center gap-1 text-[11px] font-medium text-ink-600 mt-2">
                  {isPositive ? <TrendingUp size={14} className="text-emerald-600" /> : <TrendingDown size={14} className="text-red-600" />}
                  <span className={isPositive ? "text-emerald-700" : "text-red-700"}>{kpi.delta.text}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TAHAP 2 - Seksi Pulse LPPM */}
      <section className="mx-auto max-w-container px-4 md:px-8 mt-12">
        <h2 className="text-2xl font-bold text-navy-950 mb-6">Pulse LPPM</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <BarChart data={chartData} title="Kinerja Riset per Prodi" />
          <div className="bg-surface p-6 rounded-lg border border-line shadow-card">
            <h3 className="text-sm font-semibold text-ink-700 mb-4">Ringkasan Kinerja</h3>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 border border-orange-100 rounded-lg">
                <div className="text-sm text-orange-800">Total Pendanaan</div>
                <div className="text-2xl font-bold text-orange-950">Rp 1,84 M</div>
              </div>
              <div className="p-4 bg-navy-50 border border-navy-100 rounded-lg">
                <div className="text-sm text-navy-800">Total Luaran (Publikasi + HKI)</div>
                <div className="text-2xl font-bold text-navy-950">{(currentTotals.publikasi + currentTotals.hki).toLocaleString("id-ID")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
