import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "@admin/auth/auth.js";
import {
  Newspaper,
  Calendar,
  FolderOpen,
  Building2,
  Plus,
  ArrowRight,
  TrendingUp,
  Award,
  Flask,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
} from "@shared/components/ui/Icons.jsx";
import { contentStore } from "@shared/lib/contentStore.js";

export default function Dashboard() {
  const { user } = useAdminAuth();
  const [stats, setStats] = useState({
    news: 0,
    events: 0,
    documents: 0,
    collaborators: 0,
  });

  const [recentNews, setRecentNews] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const news = contentStore.getAll("news") || [];
    const events = contentStore.getAll("events") || [];
    const documents = contentStore.getAll("documents") || [];
    const collaborators = contentStore.getAll("collaborators") || [];

    setStats({
      news: news.length,
      events: events.length,
      documents: documents.length,
      collaborators: collaborators.length,
    });

    setRecentNews(news.slice(0, 4));
    setUpcomingEvents(events.slice(0, 4));
  }, []);

  const statCards = [
    {
      title: "Total Berita",
      value: stats.news,
      icon: Newspaper,
      link: "/admin/berita",
      color: "navy",
      accent: "bg-navy-600",
      lightAccent: "bg-navy-50 text-navy-700 border-navy-100",
      description: "Artikel dan rilis pers terbit",
    },
    {
      title: "Kegiatan Aktif",
      value: stats.events,
      icon: Calendar,
      link: "/admin/kegiatan",
      color: "orange",
      accent: "bg-orange-500",
      lightAccent: "bg-orange-50 text-orange-700 border-orange-100",
      description: "Agenda seminar dan workshop",
    },
    {
      title: "Arsip Dokumen",
      value: stats.documents,
      icon: FolderOpen,
      link: "/admin/dokumen",
      color: "navy",
      accent: "bg-navy-700",
      lightAccent: "bg-slate-50 text-slate-700 border-slate-200",
      description: "Panduan, formulir & regulasi",
    },
    {
      title: "Mitra Kerjasama",
      value: stats.collaborators,
      icon: Building2,
      link: "/admin/mitra",
      color: "orange",
      accent: "bg-orange-600",
      lightAccent: "bg-amber-50 text-amber-700 border-amber-100",
      description: "Instansi dan industri partner",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs font-semibold text-orange-400 mb-3 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
              Sistem Pengelolaan Konten LPPM
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Selamat datang kembali, <span className="text-orange-400">{user?.name || "Admin"}</span>!
            </h1>
            <p className="mt-2 text-sm text-gray-300 leading-relaxed">
              Kelola informasi penelitian, pengabdian masyarakat, publikasi, dan kerjasama institusi dengan mudah dan terstruktur melalui panel kendali ini.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/admin/berita"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm shadow-lg shadow-orange-500/20 transition-all hover:scale-105"
            >
              <Plus size={16} />
              Tulis Berita
            </Link>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-sm border border-white/10 transition-all"
            >
              Lihat Portal
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Background decorative circles */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute right-32 -bottom-16 w-48 h-48 rounded-full bg-navy-600/30 blur-2xl pointer-events-none"></div>
      </div>

      {/* Grid Statistik / KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="relative overflow-hidden rounded-xl border border-line bg-surface p-5 shadow-card hover:shadow-lg transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${card.lightAccent}`}>
                    <Icon size={24} />
                  </div>
                  <Link
                    to={card.link}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-canvas text-gray-400 hover:text-navy-900"
                    title="Buka Menu"
                  >
                    <ChevronRight size={18} />
                  </Link>
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{card.title}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <h3 className="text-3xl font-extrabold text-navy-950 tracking-tight">{card.value}</h3>
                  <span className="text-[10px] font-bold text-success flex items-center">
                    <TrendingUp size={12} className="mr-0.5" /> Aktif
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-xs text-gray-500">
                <span className="truncate">{card.description}</span>
                <Link to={card.link} className="font-semibold text-orange-600 hover:underline shrink-0 ml-2">
                  Kelola
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Content Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent News Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface rounded-xl border border-line shadow-card overflow-hidden">
            <div className="p-5 border-b border-line flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-navy-50 text-navy-700 flex items-center justify-center font-bold">
                  <Newspaper size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy-900">Pembaruan Berita Terakhir</h3>
                  <p className="text-xs text-gray-500">Daftar artikel dan publikasi terkini</p>
                </div>
              </div>
              <Link
                to="/admin/berita"
                className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 group"
              >
                Lihat Semua
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="divide-y divide-line/60">
              {recentNews.length > 0 ? (
                recentNews.map((item) => (
                  <div key={item.id} className="p-4 hover:bg-canvas/50 transition-colors flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded bg-navy-50 text-navy-700 border border-navy-100">
                          {item.tag || "Berita"}
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {item.date || "Baru saja"}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-navy-900 truncate hover:text-orange-600 cursor-pointer">
                        {item.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                        item.status === "publish" 
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}>
                        {item.status === "publish" ? "Terbit" : "Draf"}
                      </span>
                      <Link
                        to="/admin/berita"
                        className="text-xs font-semibold text-gray-400 hover:text-navy-900 p-1"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-400 text-sm">
                  Belum ada data berita. Mulai dengan membuat artikel baru.
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-surface rounded-xl border border-line shadow-card p-5">
            <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4">Aksi Cepat</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link
                to="/admin/berita"
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-line bg-canvas/30 hover:bg-orange-50 hover:border-orange-200 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Newspaper size={20} />
                </div>
                <span className="text-xs font-semibold text-navy-900 text-center">Tambah Berita</span>
              </Link>

              <Link
                to="/admin/kegiatan"
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-line bg-canvas/30 hover:bg-navy-50 hover:border-navy-200 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-navy-100 text-navy-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Calendar size={20} />
                </div>
                <span className="text-xs font-semibold text-navy-900 text-center">Buat Agenda</span>
              </Link>

              <Link
                to="/admin/dokumen"
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-line bg-canvas/30 hover:bg-slate-100 hover:border-slate-300 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <FolderOpen size={20} />
                </div>
                <span className="text-xs font-semibold text-navy-900 text-center">Unggah Dokumen</span>
              </Link>

              <Link
                to="/admin/profil"
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-line bg-canvas/30 hover:bg-amber-50 hover:border-amber-200 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Award size={20} />
                </div>
                <span className="text-xs font-semibold text-navy-900 text-center">Profil Lembaga</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Events & System Status */}
        <div className="space-y-6">
          {/* Upcoming Events Box */}
          <div className="bg-surface rounded-xl border border-line shadow-card overflow-hidden">
            <div className="p-5 border-b border-line flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-orange-500" />
                <h3 className="text-base font-bold text-navy-900">Agenda Terdekat</h3>
              </div>
              <Link to="/admin/kegiatan" className="text-xs font-bold text-orange-600 hover:underline">
                Kelola
              </Link>
            </div>

            <div className="p-4 space-y-3">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((evt) => (
                  <div key={evt.id} className="flex gap-3 p-3 rounded-lg border border-line/60 hover:bg-canvas/40 transition-colors">
                    <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-orange-50 border border-orange-100 shrink-0 text-orange-600 font-bold leading-tight">
                      <span className="text-[10px] uppercase font-semibold text-orange-400">Tgl</span>
                      <span className="text-sm">{evt.date ? evt.date.split("-")[2] || "15" : "15"}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-navy-900 truncate">{evt.title}</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5 truncate">{evt.location || "Kampus TSU / Daring"}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-gray-400">
                  Tidak ada agenda mendatang terdaftar.
                </div>
              )}
            </div>
          </div>

          {/* System & Architecture Info */}
          <div className="bg-gradient-to-br from-navy-900 to-navy-950 rounded-xl p-5 text-white shadow-card">
            <h3 className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">Status Arsitektur</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-navy-800">
                <span className="text-gray-400">Mode Penyimpanan</span>
                <span className="font-semibold text-white bg-navy-800 px-2 py-0.5 rounded">Mock Storage (Local)</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-navy-800">
                <span className="text-gray-400">Pola Arsitektur</span>
                <span className="font-semibold text-white bg-navy-800 px-2 py-0.5 rounded">Schema-Driven v1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Kesiapan API</span>
                <span className="font-semibold text-success flex items-center gap-1">
                  <CheckCircle2 size={12} /> REST Compliant
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
