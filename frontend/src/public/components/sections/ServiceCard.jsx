import { Link } from "react-router-dom";
import { Flask, Award, BookOpen, Users, Handshake, Lightbulb, Shield, ExternalLink, ChevronRight } from "@shared/components/ui/Icons.jsx";

const map = {
  flask: Flask, award: Award, bookOpen: BookOpen, users: Users, handshake: Handshake, lightbulb: Lightbulb,
  shield: Shield, externalLink: ExternalLink,
};

export default function ServiceCard({ title, description, icon, to = "#" }) {
  const Icon = map[icon] || Flask;
  return (
    <Link to={to} className="group rounded-lg border border-line bg-surface p-6 shadow-card transition-shadow hover:shadow-lift">
      <div className="mb-4 rounded-md bg-navy-50 p-3 text-navy-700 w-max">
        <Icon size={28} />
      </div>
      <h3 className="mb-2 text-lg font-bold text-navy-800">{title}</h3>
      <p className="mb-4 text-sm text-ink-500">{description}</p>
      <span className="inline-flex items-center text-sm font-bold text-orange-500 transition-transform group-hover:translate-x-1">
        Pelajari <ChevronRight size={16} />
      </span>
    </Link>
  );
}
