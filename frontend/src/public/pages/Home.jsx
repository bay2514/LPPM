import { Link } from "react-router-dom";
import { ChevronRight } from "@shared/components/ui/Icons.jsx";
import HeroSection from "@public/components/sections/HeroSection.jsx";
import StatCard from "@public/components/sections/StatCard.jsx";
import ServiceCard from "@public/components/sections/ServiceCard.jsx";
import NewsCard from "@public/components/sections/NewsCard.jsx";
import EventItem from "@public/components/sections/EventItem.jsx";
import { useContent } from "@public/hooks/useContent.js";

function QuickAccessCard({ title, link }) {
  return (
    <Link
      to={link}
      className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-surface p-6 text-center shadow-lg transition-all hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-xl"
    >
      <div className="rounded-full bg-orange-50 p-3 text-orange-600 transition-colors group-hover:bg-orange-500 group-hover:text-white">
        <ChevronRight size={24} className="rotate-0 group-hover:rotate-90 transition-transform" />
      </div>
      <span className="text-sm font-bold text-navy-950">{title}</span>
    </Link>
  );
}

export default function Home() {
  const stats = useContent("stats");
  const services = useContent("services");
  const news = useContent("news");
  const events = useContent("events");
  const collaborators = useContent("collaborators");

  const displayedNews = news.slice(0, 3);
  const featured = displayedNews[2];

  return (
    <>
      <HeroSection
        badge="LPPM"
        title="Ekosistem Digital Penelitian, Pengabdian, Publikasi, dan Sentra HKI"
        description="Portal terpadu untuk memfasilitasi seluruh proses penelitian, pengabdian masyarakat, publikasi ilmiah, dan pengelolaan hak kekayaan intelektual secara digital."
        primaryAction={{ label: "Mulai Sekarang", to: "/pengajuan" }}
        secondaryAction={{ label: "Lihat Layanan", to: "/dokumen" }}
      >
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
      </HeroSection>

      <section className="bg-canvas py-16">
        <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {stats.map((s) => (
              <StatCard key={s.id} {...s} />
            ))}
          </div>
        </div>
      </section>

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
              <ServiceCard key={s.id} {...s} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">INFORMASI</span>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-navy-800 md:text-3xl">
              Berita dan Pengumuman
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {displayedNews.slice(0, 2).map((n) => (
              <NewsCard key={n.id} {...n} />
            ))}
            {featured && (
              <NewsCard
                tag={featured.tag || "Berita"}
                date={featured.date}
                title={featured.title}
                excerpt={featured.excerpt}
                variant="featured"
              />
            )}
          </div>
        </div>
      </section>

      <section className="bg-canvas py-16">
        <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-orange-500">AGENDA</span>
                <h2 className="mt-2 text-2xl font-bold leading-tight text-navy-800 md:text-3xl">
                  Kegiatan Terdekat
                </h2>
              </div>
              <div className="space-y-3">
                {events.map((e) => (
                  <EventItem key={e.id} {...e} />
                ))}
              </div>
            </div>
            <div>
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-orange-500">KOLABORASI</span>
                <h2 className="mt-2 text-2xl font-bold leading-tight text-navy-800 md:text-3xl">
                  Kolaborasi dan Duta Inovasi
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {collaborators.map((c) => (
                  <div key={c.id} className="flex flex-col items-center rounded-lg bg-surface p-6 shadow-card">
                    <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border-4 border-navy-50 bg-white">
                      <span className="text-2xl font-bold text-ink-700">{c.name?.charAt(0) || "?"}</span>
                    </div>
                    <h3 className="text-center text-base font-bold text-navy-800">{c.name}</h3>
                    <div className="text-xs text-ink-500">{c.role}</div>
                    <span className="mt-2 rounded-full bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700">
                      {c.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
