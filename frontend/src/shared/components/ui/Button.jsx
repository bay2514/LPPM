export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2";

  const variants = {
    primary:
      "bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 disabled:bg-orange-200",
    outline:
      "border-2 border-current text-navy-800 hover:bg-navy-50 active:bg-navy-100 disabled:text-ink-500 disabled:border-line",
    ghost:
      "text-navy-800 hover:bg-navy-50 active:bg-navy-100 disabled:text-ink-500",
    link:
      "text-orange-500 hover:text-orange-600 hover:underline p-0 disabled:text-ink-500",
  };

  const sizes = {
    sm: "text-sm px-3 py-1.5 rounded-md",
    md: "text-sm px-4 py-2.5 rounded-md",
    lg: "text-base px-6 py-3 rounded-lg",
    icon: "p-2 rounded-md",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
