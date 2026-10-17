export default function EventItem({ event, ...props }) {
  const item = event || props;
  const { day, month, title, meta } = item;

  return (
    <div className="flex items-start gap-4 rounded-lg border border-line bg-surface p-4 shadow-card transition-all hover:border-orange-200 hover:shadow-md">
      <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-navy-50 text-navy-800">
        <span className="text-xl font-extrabold leading-none">{day}</span>
        <span className="text-[10px] font-bold uppercase tracking-wide text-orange-600">{month}</span>
      </div>
      <div>
        <h4 className="text-sm font-bold text-navy-800 leading-snug">{title}</h4>
        <p className="mt-1 text-xs text-ink-500">{meta}</p>
      </div>
    </div>
  );
}
