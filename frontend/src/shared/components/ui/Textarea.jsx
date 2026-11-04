import React from "react";

export default function Textarea({ label, error, helperText, className = "", rows = 4, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-semibold text-navy-800">
          {label} {props.required && <span className="text-orange-600">*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        className={`w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-navy-900 placeholder:text-ink-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 ${
          error ? "border-orange-600 focus:border-orange-600 focus:ring-orange-600" : ""
        } ${className}`}
        {...props}
      />
      {helperText && !error && <p className="text-xs text-ink-500">{helperText}</p>}
      {error && <p className="text-xs text-orange-600 font-medium">{error}</p>}
    </div>
  );
}
