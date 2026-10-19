import { Link } from "react-router-dom";
import { Flask, Award, BookOpen, Users, Handshake, Lightbulb, Shield, ExternalLink, ChevronRight } from "@shared/components/ui/Icons.jsx";

const map = {
  flask: Flask, award: Award, bookOpen: BookOpen, users: Users, handshake: Handshake, lightbulb: Lightbulb,
  shield: Shield, externalLink: ExternalLink,
};

export default function ServiceCard({ title, description, icon, to = "#" }) {
  const Icon = map[icon] || Flask;
  return (
    <Link to={to} className="group flex flex-col rounded-2xl border border-line bg-surface p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl hover:border-orange-200">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-50 text-navy-700 transition-colors group-hover:bg-orange-500 group-hover:text-white shadow-sm">
        <Icon size={28} />
      </div>
      <h3 className="mb-3 text-xl font-bold text-navy-950 transition-colors group-hover:text-orange-600">{title}</h3>
      <p className="mb-6 text-sm leading-relaxed text-ink-600">{description}</p>
      <div className="mt-auto flex items-center font-bold text-orange-600">
        <span className="text-sm">Pelajari Selengkapnya</span>
        <ChevronRight size={18} className="ml-1 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
