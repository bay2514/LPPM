import { Link } from "react-router-dom";
import { ChevronRight } from "../ui/Icons.jsx";

export default function HeroSection({
  eyebrow,
  title,
  description,
  primaryAction = null,
  secondaryAction = null,
  children,
  dark = true,
  badge = null,
}) {
  return (
    <section className={`${dark ? "bg-navy-800" : "bg-white border-b border-line"} py-14 lg:py-20`}>
      <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className={`${dark ? "text-white" : ""}`}>
            {badge ? (
              <div className="mb-4 inline-flex items-center rounded-full bg-orange-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-300">
                {badge}
              </div>
            ) : null}
            {eyebrow && !badge ? (
              <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-orange-500">{eyebrow}</span>
            ) : null}
            <h1 className={`mb-5 text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl ${dark ? "text-white" : "text-navy-800"}`}>
              {title}
            </h1>
            {description ? (
              <p className={`mb-8 text-base leading-relaxed md:text-lg ${dark ? "text-white/75" : "text-ink-500"}`}>
                {description}
              </p>
            ) : null}
            <div className="flex flex-wrap gap-3">
              {primaryAction && (
                <Link
                  to={primaryAction.to}
                  className="inline-flex items-center justify-center rounded-md bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-orange-600"
                >
                  {primaryAction.label}
                </Link>
              )}
              {secondaryAction && (
                <Link
                  to={secondaryAction.to}
                  className={`inline-flex items-center justify-center rounded-md border px-5 py-3 text-sm font-bold hover:bg-white/10 ${dark ? "border-white/20 text-white" : "border-line text-ink-700 hover:bg-canvas"}`}
                >
                  <span className="mr-2">{secondaryAction.label}</span>
                  <ChevronRight size={18} />
                </Link>
              )}
            </div>
          </div>
          {children && <div>{children}</div>}
        </div>
      </div>
    </section>
  );
}
