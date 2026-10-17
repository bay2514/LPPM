/**
 * Halaman Dashboard Admin yang memandu.
 * Sapaan, aksi cepat, ringkasan StatCard, daftar draf, aktivitas, dan panduan.
 */

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminList } from "@admin/api/index.js";
import { useAdminAuth } from "@admin/auth/auth.js";
import { PageHeader, StatCard, EmptyState } from "@shared/components/ui/AdminComponents.jsx";
import { Button } from "@shared/components/ui/Button.jsx";
import {
  Newspaper,
  Calendar,
  FolderOpen,
  Building2,
  Plus,
  ArrowUpRight,
  FileEdit,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
} from "@shared/components/ui/Icons.jsx";

function formatDateID(date = new Date()) {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("id-ID", options);
}

export default function Dashboard() {
  const { user } = useAdminAuth();
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ news: 0, events: 0, documents: 0, collaborators: 0 });
  const [drafts, setDrafts] = useState([]);
  const [activities, setActivities] = useState([]);
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

        // Ambil draf berita & kegiatan
        const [draftNews, draftEvents] = await Promise.all([
          adminList("news", { status: "draft", limit: 5 }),
          adminList("events", { status: "draft", limit: 5 }),
        ]);
        const allDrafts = [
          ...draftNews.data.map((d) => ({ ...d, type: "berita", path: "/admin/berita" })),
          ...draftEvents.data.map((d) => ({ ...d, type: "kegiatan", path: "/admin/kegiatan" })),
        ];
        setDrafts(allDrafts.slice(0, 5));

        // Aktivitas mock (di masa depan bisa dari log)
        setActivities([
          { id: 1, text: "Berita baru ditambahkan", time: "Baru saja", icon: Newspaper },
          { id: 2, text: "Kegiatan diperbarui", time: "10 menit lalu", icon: Calendar },
          { id: 3, text: "Dokumen SOP diunggah", time: "1 jam lalu", icon: FolderOpen },
          { id: 4, text: "Profil lembaga diperbarui", time: "2 jam lalu", icon: CheckCircle2 },
          { id: 5, text: "Mitra baru ditambahkan", time: "Kemarin", icon: Building2 },
        ]);
      } catch (err) {
        console.error("Gagal memuat data dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const quickActions = [
    {
      title: "Tulis Berita",
      desc: "Bagikan informasi terbaru ke publik.",
      icon: <Newspaper className="w-6 h-6" />,
      path: "/admin/berita",
      color: "bg-navy-50 text-navy-700",
    },
    {
      title: "Tambah Kegiatan",
      desc: "Jadwalkan agenda dan publikasikan.",
      icon: <Calendar className="w-6 h-6" />,
      path: "/admin/kegiatan",
      color: "bg-orange-50 text-orange-700",
    },
    {
      title: "Unggah Dokumen",
      desc: "Simpan SOP atau panduan resmi.",
      icon: <FolderOpen className="w-6 h-6" />,
      path: "/admin/dokumen",
      color: "bg-navy-50 text-navy-700",
    },
    {
      title: "Ubah Profil",
      desc: "Perbarui kontak dan visi misi lembaga.",
      icon: <FileEdit className="w-6 h-6" />,
      path: "/admin/profil",
      color: "bg-orange-50 text-orange-700",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Sapaan */}
      <div>
        <p className="text-sm text-gray-500">{formatDateID()}</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy-900 mt-1">
          Halo, {user?.name?.split(" ")[0] || "Admin"} ὄB;
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1 max-w-2xl">
          Selamat datang di panel pengelolaan LPPM. Pilih salah satu aksi cepat di bawah untuk mulai bekerja.
        </p>
      </div>

      {/* Aksi Cepat */}
      <section>
        <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-3">Mulai dari Sini</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className="text-left bg-surface rounded-lg border border-line shadow-card p-4 sm:p-5 hover:shadow-lift hover:border-orange-300 transition-all group"
            >
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center mb-3 ${action.color}`}>
                {action.icon}
              </div>
              <h3 className="font-bold text-navy-900 group-hover:text-orange-600 transition-colors">{action.title}</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">{action.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Ringkasan Statistik */}
      <section>
        <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-3">Ringkasan Data</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Berita & Artikel"
            value={loading ? "..." : counts.news}
            icon={<Newspaper className="w-6 h-6" />}
            linkText="Kelola Berita"
            onClick={() => navigate("/admin/berita")}
            color="navy"
          />
          <StatCard
            title="Kegiatan & Agenda"
            value={loading ? "..." : counts.events}
            icon={<Calendar className="w-6 h-6" />}
            linkText="Kelola Kegiatan"
            onClick={() => navigate("/admin/kegiatan")}
            color="orange"
          />
          <StatCard
            title="Dokumen & SOP"
            value={loading ? "..." : counts.documents}
            icon={<FolderOpen className="w-6 h-6" />}
            linkText="Kelola Dokumen"
            onClick={() => navigate("/admin/dokumen")}
            color="navy"
          />
          <StatCard
            title="Mitra & Kerjasama"
            value={loading ? "..." : counts.collaborators}
            icon={<Building2 className="w-6 h-6" />}
            linkText="Kelola Mitra"
            onClick={() => navigate("/admin/mitra")}
            color="orange"
          />
        </div>
      </section>

      {/* Perlu Perhatian + Aktivitas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Draf */}
        <section className="bg-surface rounded-lg border border-line shadow-card p-4 sm:p-6">
          <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-orange-500" />
            Perlu Perhatian
          </h2>
          {drafts.length === 0 ? (
            <div className="flex items-center gap-3 text-sm text-gray-500 py-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              Semua konten sudah terbit. Tidak ada draf yang menunggu.
            </div>
          ) : (
            <ul className="space-y-3">
              {drafts.map((draft) => (
                <li key={`${draft.type}-${draft.id}`} className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-navy-900 truncate">{draft.title || draft.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{draft.type} · Draf</p>
                  </div>
                  <button
                    onClick={() => navigate(draft.path)}
                    className="text-xs font-semibold text-orange-600 hover:text-orange-700 whitespace-nowrap min-h-[44px] flex items-center px-2"
                  >
                    Lanjutkan →
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Aktivitas */}
        <section className="bg-surface rounded-lg border border-line shadow-card p-4 sm:p-6">
          <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4">Aktivitas Terbaru</h2>
          <ul className="space-y-3">
            {activities.map((act) => (
              <li key={act.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-navy-50 text-navy-700 flex items-center justify-center flex-shrink-0">
                  <act.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-navy-900 truncate">{act.text}</p>
                  <p className="text-xs text-gray-500">{act.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Panduan Singkat */}
      <section className="bg-navy-50 rounded-lg border border-navy-100 p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-navy-900 text-white flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-navy-900">Cara Memperbarui Website</h2>
            <ol className="mt-2 space-y-2 text-sm text-navy-800 list-decimal list-inside">
              <li>Pilih menu sesuai konten yang ingin diubah (Berita, Kegiatan, Dokumen, atau Profil).</li>
              <li>Klik tombol <strong>Tambah</strong> atau pilih data yang sudah ada untuk diubah.</li>
              <li>Isi form dengan lengkap, lalu klik <strong>Terbitkan</strong>. Perubahan langsung terlihat di website publik.</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
