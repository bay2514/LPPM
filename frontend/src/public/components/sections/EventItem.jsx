export default function EventItem({ event, ...props }) {
  const item = event || props;
  const { day, month, title, meta } = item;

  return (
    <div className="flex items-start gap-5 rounded-2xl border border-line bg-surface p-5 shadow-lg transition-all hover:border-orange-300 hover:shadow-xl hover:pl-6">
      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-navy-50 to-navy-100 text-navy-800 shadow-sm">
        <span className="text-2xl font-extrabold leading-none">{day}</span>
        <span className="text-xs font-bold uppercase tracking-wider text-orange-600">{month}</span>
      </div>
      <div className="flex-1">
        <h4 className="text-base font-bold text-navy-900 leading-tight">{title}</h4>
        <p className="mt-1 text-sm text-ink-500">{meta}</p>
      </div>
    </div>
  );
}
