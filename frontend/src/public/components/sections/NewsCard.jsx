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
    <div className="flex flex-col justify-between rounded-2xl border border-line bg-surface shadow-lg overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl hover:border-orange-200">
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-orange-100/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-700">
            {tag}
          </span>
          <span className="text-xs font-semibold text-ink-500">{date}</span>
        </div>
        <h3 className="mb-3 text-lg font-bold leading-snug text-navy-950">
          <Link to={to} className="hover:text-orange-600 transition-colors">
            {title}
          </Link>
        </h3>
        <p className="text-sm text-ink-600 line-clamp-2 leading-relaxed">{desc}</p>
      </div>
      <div className="border-t border-line bg-canvas/40 px-6 py-4">
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
