export default function PageHero({ badge, title, description, updated, children }) {
  return (
    <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-12 px-4 md:px-8 border-b border-navy-800 text-white">
      <div className="mx-auto max-w-container">
        {badge && (
          <div className="inline-flex items-center gap-2 rounded-full bg-navy-800/80 px-3 py-1 text-xs font-semibold text-orange-400 mb-4 border border-navy-700">
            {badge}
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">{title}</h1>
        {description && <p className="text-ink-300 text-sm md:text-base max-w-2xl mb-4">{description}</p>}
        {updated && <div className="text-xs font-medium text-ink-400">Diperbarui: {updated}</div>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}