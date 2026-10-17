/**
 * Halaman Dashboard Admin.
 * Menampilkan ringkasan metrik konten dan tautan aksi cepat.
 */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { adminList, adminGetSingle } from "@admin/api/index.js";
import { Card } from "@shared/components/ui/Card.jsx";
import { Button } from "@shared/components/ui/Button.jsx";
import {
  Newspaper,
  Calendar,
  FileText,
  Building2,
  Plus,
  ArrowUpRight,
} from "@shared/components/ui/Icons.jsx";

export default function Dashboard() {
  const [counts, setCounts] = useState({
    news: 0,
    events: 0,
    documents: 0,
    collaborators: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [newsRes, eventsRes, docsRes, collabRes] = await Promise.all([
          adminList("news", { limit: 1 }),
          adminList("events", { limit: 1 }),
          adminList("documents", { limit: 1 }),
          adminList("collaborators", { limit: 1 }),
        ]);
        setCounts({
          news: newsRes.meta.total,
          events: eventsRes.meta.total,
          documents: docsRes.meta.total,
          collaborators: collabRes.meta.total,
        });
      } catch (err) {
        console.error("Gagal memuat data dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const statCards = [
    {
      title: "Berita & Artikel",
      count: counts.news,
      icon: Newspaper,
      link: "/admin/berita",
      color: "bg-blue-500",
    },
    {
      title: "Kegiatan & Agenda",
      count: counts.events,
      icon: Calendar,
      link: "/admin/kegiatan",
      color: "bg-emerald-500",
    },
    {
      title: "Dokumen & SOP",
      count: counts.documents,
      icon: FileText,
      link: "/admin/dokumen",
      color: "bg-indigo-500",
    },
    {
      title: "Mitra & Kerjasama",
      count: counts.collaborators,
      icon: Building2,
      link: "/admin/kerjasama",
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Selamat datang di Panel Pengelolaan LPPM</h2>
          <p className="text-sm text-gray-600 mt-1">
            Kelola publikasi berita, arsip dokumen panduan, agenda kegiatan, dan data profil lembaga secara terpusat.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/admin/berita">
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-1.5" />
              Tulis Berita
            </Button>
          </Link>
          <Link to="/admin/dokumen">
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-1.5" />
              Unggah Dokumen
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-extrabold text-gray-900 mt-2">
                    {loading ? "..." : stat.count}
                  </p>
                </div>
                <div className={`p-3 rounded-lg text-white ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-500">Kelola data</span>
                <Link
                  to={stat.link}
                  className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-0.5"
                >
                  Buka <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Settings & Help */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-base font-bold text-gray-900 mb-3">Pengaturan Banner & Beranda</h3>
          <p className="text-sm text-gray-600 mb-4">
            Ubah teks pengumuman penting, slogan utama, dan tautan aksi cepat pada header halaman utama.
          </p>
          <Link to="/admin/profil">
            <Button variant="outline" size="sm">
              Kelola Pengaturan Banner
            </Button>
          </Link>
        </Card>

        <Card>
          <h3 className="text-base font-bold text-gray-900 mb-3">Keamanan & Panduan</h3>
          <p className="text-sm text-gray-600 mb-4">
            Data mock disimpan di memori selama sesi browser. Perubahan akan langsung terlihat di halaman publik seketika.
          </p>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            Backend Mode: In-Memory Mock Store (Siap Sanctum SPA)
          </div>
        </Card>
      </div>
    </div>
  );
}
