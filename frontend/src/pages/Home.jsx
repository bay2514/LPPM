import { Link } from "react-router-dom";
import {
  Flask,
  Award,
  BookOpen,
  Users,
  Handshake,
  Lightbulb,
  MapPin,
  Mail,
  Calendar,
  ChevronRight,
} from "../components/ui/Icons.jsx";
import { stats, services, news, events, collaborators } from "../data/mock.js";

function Icon({ name, className = "" }) {
  const map = {
    flask: Flask,
    award: Award,
    bookOpen: BookOpen,
    users: Users,
    handshake: Handshake,
    lightbulb: Lightbulb,
  };
  const IconComp = map[name] || Flask;
  return <IconComp className={className} size={32} />;
}

function QuickAccessCard({ title, link }) {
  return (
    <Link
      to={link}
      className="group flex items-center justify-between rounded-md border border-line bg-surface px-4 py-3 text-sm font-medium text-ink-700 hover:bg-canvas hover:shadow-card"
    >
      <span>{title}</span>
      <ChevronRight size={16} className="text-ink-500 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 py-16 lg:py-24">
        <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="text-white">
              <div className="mb-4 inline-flex items-center rounded-full bg-orange-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-300">
                LPPM
              </div>
              <h1 className="mb-6 text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">
                Ekosistem Digital Penelitian, Pengabdian, Publikasi, dan Sentra HKI
              </h1>
              <p className="mb-8 text-base leading-relaxed text-ink-500 md:text-lg">
               Portal terpadu untuk memfasilitasi seluruh proses penelitian, pengabdian masyarakat,
                publikasi ilmiah, dan pengelolaan hak kekayaan intelektual secara digital.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/pengajuan"
                  className="inline-flex items-center justify-center rounded-md bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-orange-600"
                >
                  Mulai Sekarang
                </Link>
                <Link
                  to="/dokumen"
                  className="inline-flex items-center justify-center rounded-md border border-white/20 bg-transparent px-5 py-3 text-sm font-bold text-white hover:bg-white/10"
                >
                  <span className="mr-2">Lihat Layanan</span>
                  <ChevronRight size={18} />
                </Link>
              </div>
            </div>
            <div>
              <div className="rounded-lg bg-surface p-6 shadow-lift">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-navy-800">
                  Quick Access Portal
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <QuickAccessCard title="Portal Penelitian" link="/penelitian" />
                  <QuickAccessCard title="Portal PKM" link="/pengabdian" />
                  <QuickAccessCard title="Pengajuan Jurnal" link="/publikasi" />
                  <QuickAccessCard title="Sentra HKI" link="/hki" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-canvas py-16">
        <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {stats.map((s) => (
              <div key={s.id} className="flex flex-col items-center rounded-lg bg-surface px-6 py-8 text-center shadow-card">
                <Icon name={s.icon} className="mb-3 text-orange-500" />
                <div className="text-3xl font-extrabold text-navy-800">{s.value}</div>
                <div className="mt-1 text-sm font-semibold text-ink-900">{s.label}</div>
                <div className="text-xs text-ink-500">{s.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">LAYANAN</span>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-navy-800 md:text-3xl">
              Layanan Utama LPPM
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.id}
                to="#"
                className="group rounded-lg border border-line bg-surface p-6 shadow-card transition-shadow hover:shadow-lift"
              >
                <div className="mb-4 rounded-md bg-navy-50 p-3 text-navy-700">
                  <Icon name={s.icon} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-navy-800">{s.title}</h3>
                <p className="mb-4 text-sm text-ink-500">{s.description}</p>
                <span className="inline-flex items-center text-sm font-bold text-orange-500 group-hover:translate-x-1 transition-transform">
                  Pelajari <ChevronRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">INFORMASI</span>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-navy-800 md:text-3xl">
              Berita dan Pengumuman
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {news.slice(0, 2).map((n) => (
              <div key={n.id} className="rounded-lg border border-line bg-surface shadow-card">
                <Link to="#">
                  <div className="bg-orange-50 px-4 py-2 text-xs font-semibold text-orange-700">
                    {n.tag}
                  </div>
                  <div className="px-4 pb-2 text-xs text-ink-500">{n.date}</div>
                  <h3 className="px-4 pb-3 text-lg font-bold text-navy-800">{n.title}</h3>
                  <p className="px-4 pb-4 text-sm text-ink-500">{n.excerpt}</p>
                  <div className="border-t border-line bg-orange-50 px-4 py-3 text-xs font-bold text-orange-700">
                    Selengkapnya
                  </div>
                </Link>
              </div>
            ))}
            <div className="rounded-lg bg-gradient-to-br from-navy-800 to-navy-700 p-6 text-white shadow-lift">
              <div className="mb-3 inline-block rounded-md bg-orange-500 px-3 py-1 text-xs font-bold uppercase">
                Workshop
              </div>
              <h3 className="mb-2 text-xl font-bold">{news[2].title}</h3>
              <p className="mb-4 text-sm text-ink-500">{news[2].excerpt}</p>
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                {events[2].day} {events[2].month} • {events[2].meta}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaborators */}
      <section className="bg-canvas py-16">
        <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">KOLABORASI</span>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-navy-800 md:text-3xl">
              Kolaborasi dan Duta Inovasi
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {collaborators.map((c) => (
              <div key={c.id} className="flex flex-col items-center rounded-lg bg-surface p-6 shadow-card">
                <div className="mb-3 h-16 w-16 rounded-full border-4 border-navy-50 bg-white flex items-center justify-center">
                  <span className="text-2xl font-bold text-ink-700">{c.name.charAt(0)}</span>
                </div>
                <h3 className="text-base font-bold text-navy-800">{c.name}</h3>
                <div className="text-xs text-ink-500">{c.role}</div>
                <span className="mt-2 rounded-full bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700">
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
