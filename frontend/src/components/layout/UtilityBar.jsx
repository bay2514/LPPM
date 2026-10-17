import { MapPin, Mail } from "../ui/Icons.jsx";
import { Link } from "react-router-dom";

export default function UtilityBar() {
  return (
    <div className="hidden bg-navy-800 text-white md:block">
      <div className="mx-auto flex max-w-container items-center justify-between px-4 py-1.5 text-xs md:px-6 lg:px-8">
        <div className="flex items-center gap-5">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500" />
            Surakarta, Indonesia
          </span>
          <a href="mailto:lppm@tsu.ac.id" className="inline-flex items-center gap-1.5 hover:text-orange-300">
            <Mail size={14} />
            lppm@tsu.ac.id
          </a>
        </div>
        <Link to="/login" className="font-medium hover:text-orange-300">
          Login Admin
        </Link>
      </div>
    </div>
  );
}
