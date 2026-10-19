import { Flask, Award, BookOpen, Users, Handshake, Lightbulb } from "@shared/components/ui/Icons.jsx";

const map = { flask: Flask, award: Award, bookOpen: BookOpen, users: Users, handshake: Handshake, lightbulb: Lightbulb };

export default function StatCard({ label, value, sublabel, icon, className = "" }) {
  const Icon = map[icon] || Flask;
  return (
    <div className={`flex flex-col items-center rounded-2xl border border-line bg-surface p-6 text-center shadow-lg transition-all hover:shadow-xl hover:border-orange-200 ${className}`}>
      <div className="mb-4 rounded-xl bg-orange-50 p-3 text-orange-500">
        <Icon size={24} />
      </div>
      <div className="text-3xl font-extrabold text-navy-950">{value}</div>
      <div className="mt-1 text-xs font-bold uppercase tracking-wider text-navy-600">{label}</div>
      <div className="mt-1 text-[11px] text-ink-500">{sublabel}</div>
    </div>
  );
}
