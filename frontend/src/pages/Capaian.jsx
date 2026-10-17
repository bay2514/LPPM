import { capaianKPI, latestOutputs } from "../data/mock.js";
import { TrendingUp, Award, BookOpen, Flask } from "../components/ui/Icons.jsx";

export default function Capaian() {
  const maxValue = Math.max(...capaianKPI.map((k) => k.value));

  return (
    <>
      <section className="border-b border-line bg-white py-10">
        <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-3 text-xs text-ink-500">
            <ol className="flex items-center gap-1">
              <li><a href="/" className="hover:text-orange-500">Beranda</a></li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-ink-700">Capaian</li>
            </ol>
          </nav>
          <h1 className="text-3xl font-extrabold text-navy-800 md:text-4xl">Dashboard Capaian</h1>
          <p className="mt-2 max-w-2xl text-sm text-ink-500 md:text-base">
            Ringkasan kinerja penelitian, pengabdian, publikasi, dan kekayaan intelektual LPPM
            Universitas Tiga Serangkai.
          </p>
        </div>
      </section>

      <section className="bg-canvas py-10">
        <div className="mx-auto max-w-container space-y-8 px-4 md:px-6 lg:px-8">
          {/* KPI cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capaianKPI.map((k) => (
              <div key={k.id} className="rounded-lg border border-line bg-surface p-6 shadow-card">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink-500">{k.label}</span>
                  <TrendingUp size={18} className="text-teal-600" />
                </div>
                <div className="text-4xl font-extrabold text-navy-800">{k.value}</div>
                <div className="mt-1 text-xs text-ink-500">{k.sublabel}</div>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div className="rounded-lg border border-line bg-surface p-6 shadow-card">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-navy-800">Distribusi Capaian per Kategori</h2>
              <span className="text-xs font-medium text-ink-500">Tahun berjalan</span>
            </div>
            <ul className="space-y-4">
              {capaianKPI.map((k) => (
                <li key={k.id}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-ink-700">{k.label}</span>
                    <span className="font-bold text-navy-800">{k.value}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-canvas">
                    <div
                      className="h-full rounded-full bg-orange-500"
                      style={{ width: `${Math.round((k.value / maxValue) * 100)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Latest outputs */}
          <div>
            <h2 className="mb-4 text-lg font-bold text-navy-800">Luaran Terbaru</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {latestOutputs.map((o) => (
                <article key={o.id} className="rounded-lg border border-line bg-surface p-5 shadow-card">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-full bg-navy-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-navy-700">
                      {o.tag}
                    </span>
                    <span className="text-[11px] text-ink-500">{o.year}</span>
                  </div>
                  <h3 className="mb-2 text-base font-bold leading-snug text-navy-800">{o.title}</h3>
                  <p className="text-sm text-ink-500">{o.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
