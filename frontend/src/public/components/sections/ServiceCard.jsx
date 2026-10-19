import { Link } from "react-router-dom";
import { Flask, Award, BookOpen, Users, Handshake, Lightbulb, Shield, ExternalLink, ChevronRight } from "@shared/components/ui/Icons.jsx";

const map = {
  flask: Flask, award: Award, bookOpen: BookOpen, users: Users, handshake: Handshake, lightbulb: Lightbulb,
  shield: Shield, externalLink: ExternalLink,
};

export default function ServiceCard({ title, description, icon, to = "#" }) {
  const Icon = map[icon] || Flask;
  return (
    <Link to={to} className="group relative flex flex-col rounded-2xl border border-line bg-surface p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl hover:border-orange-500/50 overflow-hidden">
      {/* Decorative colored strip on top hover */}
      <div className="absolute top-0 left-0 h-1.5 w-0 bg-gradient-to-r from-navy-600 to-orange-500 transition-all duration-300 group-hover:w-full" />
      
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-50 text-navy-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white shadow-sm">
        <Icon size={28} />
      </div>
      <h3 className="mb-3 text-xl font-bold text-navy-950 transition-colors group-hover:text-orange-600">{title}</h3>
      <p className="mb-6 text-sm leading-relaxed text-ink-600 group-hover:text-ink-700">{description}</p>
      <div className="mt-auto flex items-center font-bold text-orange-600">
        <span className="text-sm">Pelajari Selengkapnya</span>
        <ChevronRight size={18} className="ml-1 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
