import { FileText, Download } from "../ui/Icons.jsx";

export default function DocumentCard({ title, description, category, fileType, size, year, slug }) {
  return (
    <div className="flex flex-col justify-between rounded-lg border border-line bg-surface p-5 shadow-card h-full">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-orange-700">
            {category}
          </span>
          <span className="text-[11px] font-medium text-ink-500">{fileType} • {year}</span>
        </div>
        <div className="mb-2 flex items-center gap-2 text-navy-800">
          <FileText size={18} />
          <h3 className="text-base font-bold leading-snug">{title}</h3>
        </div>
        <p className="text-sm text-ink-500">{description}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-ink-500">{size}</span>
        <a
          href={`#unduh-${slug}`}
          className="inline-flex items-center gap-2 rounded-md bg-orange-500 px-3 py-2 text-xs font-bold text-white hover:bg-orange-600"
        >
          <Download size={14} /> Unduh
        </a>
      </div>
    </div>
  );
}
