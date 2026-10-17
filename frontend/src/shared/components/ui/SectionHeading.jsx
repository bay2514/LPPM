export default function SectionHeading({ eyebrow, title, description, align = "left", className = "" }) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-2 ${alignment} ${className}`}>
      {eyebrow && (
        <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl font-bold leading-tight text-navy-800 md:text-3xl">{title}</h2>
      {description && (
        <p className={`max-w-2xl text-sm leading-relaxed text-ink-500 ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </div>
  );
}
