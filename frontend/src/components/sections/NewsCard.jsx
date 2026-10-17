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
    <div className="flex flex-col justify-between rounded-lg border border-line bg-surface shadow-card overflow-hidden transition-transform hover:-translate-y-1">
      <div className="p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-orange-700">
            {tag}
          </span>
          <span className="text-xs text-ink-500">{date}</span>
        </div>
        <h3 className="mb-2 text-base font-bold leading-snug text-navy-800">
          <Link to={to} className="hover:text-orange-500">
            {title}
          </Link>
        </h3>
        <p className="text-sm text-ink-500 line-clamp-2">{desc}</p>
      </div>
      <div className="border-t border-line bg-canvas/50 px-6 py-3">
        <Link
          to={to}
          className="text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline"
        >
          Selengkapnya →
        </Link>
      </div>
    </div>
  );
}
