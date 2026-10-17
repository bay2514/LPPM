import { Flask, Award, BookOpen, Users, Handshake, Lightbulb } from "../ui/Icons.jsx";

const map = { flask: Flask, award: Award, bookOpen: BookOpen, users: Users, handshake: Handshake, lightbulb: Lightbulb };

export default function StatCard({ label, value, sublabel, icon, className = "" }) {
  const Icon = map[icon] || Flask;
  return (
    <div className={`flex flex-col items-center rounded-lg bg-surface px-5 py-8 text-center shadow-card ${className}`}>
      <Icon size={28} className="mb-3 text-orange-500" />
      <div className="text-3xl font-extrabold text-navy-800">{value}</div>
      <div className="mt-1 text-sm font-semibold text-ink-900">{label}</div>
      <div className="text-xs text-ink-500">{sublabel}</div>
    </div>
  );
}
