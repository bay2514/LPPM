export default function Badge({ children, variant = "solid", className = "" }) {
  const map = {
    solid: "bg-orange-500 text-white",
    outline: "border border-orange-500 text-orange-500",
    soft: "bg-orange-50 text-orange-700",
    navy: "bg-navy-800 text-white",
    gray: "bg-gray-100 text-ink-500",
  };
  return (
    <span
      className={`inline-flex items-center rounded-pill px-3 py-1 text-xs font-semibold tracking-wide ${map[variant] || map.solid} ${className}`}
    >
      {children}
    </span>
  );
}

export { Badge };
