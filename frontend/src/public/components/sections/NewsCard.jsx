import { Link } from "react-router-dom";

export default function NewsCard({ news, variant = "default", ...props }) {
  const item = news || props;
  const { tag, date, title, excerpt, description, to = "#" } = item;
  const desc = excerpt || description;

  if (variant === "featured") {
    return (
      <Link
        to={to}
        className="group block rounded-lg bg-gradient-to-br from-navy-800 to-navy-700 p-6 text-white shadow-lift transition-transform hover:-translate-y-1 h-full"
      >
        <div className="mb-3 inline-block rounded-md bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-wide">
          {tag}
        </div>
        <h3 className="mb-2 text-xl font-bold leading-snug">{title}</h3>
        <p className="mb-4 text-sm text-white/80 line-clamp-3">{desc}</p>
        <div className="flex items-center gap-2 text-xs font-semibold text-white/60">
          <span>{date}</span>
        </div>
      </Link>
    );
  }

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-line bg-surface shadow-lg overflow-hidden transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-orange-400 group">
      <div className="relative p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-orange-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-700 shadow-sm">
            {tag}
          </span>
          <span className="text-xs font-semibold text-ink-500 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            {date}
          </span>
        </div>
        <h3 className="mb-3 text-lg font-bold leading-snug text-navy-950 group-hover:text-navy-800">
          <Link to={to} className="hover:text-orange-600 transition-colors block">
            {title}
          </Link>
        </h3>
        <p className="text-sm text-ink-600 line-clamp-2 leading-relaxed">{desc}</p>
      </div>
      <div className="border-t border-line bg-gradient-to-r from-canvas/50 to-orange-50/50 px-6 py-4 group-hover:bg-gradient-to-r group-hover:from-orange-100 group-hover:to-white">
        <Link
          to={to}
          className="text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline flex items-center gap-1"
        >
          Selengkapnya →
        </Link>
      </div>
    </div>
  );
}
