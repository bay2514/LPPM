export default function PlaceholderPage({ title }) {
  return (
    <div className="mx-auto max-w-container px-4 py-16 md:px-6 lg:px-8">
      <div className="rounded-2xl border border-line bg-surface p-12 text-center shadow-card">
        <span className="text-xs font-bold uppercase tracking-widest text-orange-500">LAYANAN LPPM</span>
        <h1 className="mt-2 text-3xl font-extrabold text-navy-800">{title}</h1>
        <p className="mt-4 text-base text-ink-500 max-w-xl mx-auto">
          Halaman layanan {title} sedang dalam pengembangan sesuai standar desain LPPM Universitas Tiga Serangkai. Silakan gunakan menu lainnya atau hubungi admin.
        </p>
      </div>
    </div>
  );
}
