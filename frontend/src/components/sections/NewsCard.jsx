import { Link } from "react-router-dom";

export default function NewsCard({ tag, date, title, excerpt, to = "#", variant = "default" }) {
  if (variant === "featured") {
    return (
      <Link to={to} className="group block rounded-lg bg-gradient-to-br from-navy-800 to-navy-700 p-6 text-white shadow-lift h-full">
        <div className="mb-3 inline-block rounded-md bg-orange-500 px-3 py-1 text-xs font-bold uppercase">{tag}</div>
        <h3 className="mb-2 text-xl font-bold">{title}</h3>
        <p className="mb-4 text-sm text-white/80">{excerpt}</p>
        <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:underline">{date}</div>
      </Link>
    );
  }
  return (
    <div className="rounded-lg border border-line bg-surface shadow-card overflow-hidden">
      <Link to={to} className="block">
        <div className="bg-orange-50 px-4 py-2 text-xs font-semibold text-orange-700">{tag}</div>
        <div className="px-4 pb-2 text-xs text-ink-500">{date}</div>
        <h3 className="px-4 pb-3 text-lg font-bold text-navy-800">{title}</h3>
        <p className="px-4 pb-4 text-sm text-ink-500">{excerpt}</p>
        <div className="border-t border-line bg-orange-50 px-4 py-3 text-xs font-bold text-orange-700">Selengkapnya</div>
      </Link>
    </div>
  );
}
