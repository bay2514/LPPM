export default function Textarea({ id, label, error, helper, className = "", ...props }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-ink-700">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={4}
        className={`w-full resize-y rounded-md border bg-surface px-3 py-2.5 text-sm text-ink-900 placeholder-ink-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 ${error ? "border-danger" : "border-line"}`}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : helper ? `${id}-helper` : undefined}
        {...props}
      />
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

export { Textarea };
