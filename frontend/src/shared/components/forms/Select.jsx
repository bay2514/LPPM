export default function Select({ id, label, error, helper, children, className = "", ...props }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-ink-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className={`w-full appearance-none rounded-md border bg-surface px-3 py-2.5 pr-8 text-sm text-ink-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 ${error ? "border-danger" : "border-line"}`}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${id}-error` : helper ? `${id}-helper` : undefined}
          {...props}
        >
          {children}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-xs text-danger" role="alert">
          {error}
        </p>
      )}
      {helper && !error && (
        <p id={`${id}-helper`} className="text-xs text-ink-500">
          {helper}
        </p>
      )}
    </div>
  );
}
