import { Link } from "react-router-dom";
import { ChevronRight } from "@shared/components/ui/Icons.jsx";

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
    <section className={`${dark ? "bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" : "bg-white border-b border-line"} py-16 lg:py-24`}>
      <div className="mx-auto max-w-container px-4 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className={`${dark ? "text-white" : ""}`}>
            {badge ? (
              <div className="mb-5 inline-flex items-center rounded-full bg-orange-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-400 border border-orange-500/20">
                {badge}
              </div>
            ) : null}
            <h1 className={`mb-6 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl ${dark ? "text-white" : "text-navy-950"}`}>
              {title}
            </h1>
            {description ? (
              <p className={`mb-10 text-lg leading-relaxed ${dark ? "text-white/70" : "text-ink-600"}`}>
                {description}
              </p>
            ) : null}
            <div className="flex flex-wrap gap-4">
              {primaryAction && (
                <Link
                  to={primaryAction.to}
                  className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-orange-500/20 hover:bg-orange-600 transition-all"
                >
                  {primaryAction.label}
                </Link>
              )}
              {secondaryAction && (
                <Link
                  to={secondaryAction.to}
                  className={`inline-flex items-center justify-center rounded-2xl border px-8 py-4 text-sm font-bold transition-all ${dark ? "border-white/10 text-white hover:bg-white/5" : "border-line text-navy-900 hover:bg-canvas"}`}
                >
                  {secondaryAction.label}
                  <ChevronRight size={18} className="ml-2" />
                </Link>
              )}
            </div>
          </div>
          {children && <div className="rounded-3xl bg-surface/5 backdrop-blur-sm p-2 shadow-2xl">{children}</div>}
        </div>
      </div>
    </section>
  );
}
