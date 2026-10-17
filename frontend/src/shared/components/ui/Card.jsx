export default function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-lg border border-line bg-surface shadow-card transition-shadow hover:shadow-lift ${className}`}
    >
      {children}
    </div>
  );
}

export { Card };
