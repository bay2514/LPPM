import React from "react";
import { Svg } from "./Icons.jsx";

export function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        {eyebrow && (
          <span className="inline-block text-xs font-semibold tracking-wider text-orange-600 uppercase mb-1">
            {eyebrow}
          </span>
        )}
        <h1 className="text-2xl font-bold text-navy-900">{title}</h1>
        {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
      </div>
      {action && <div className="w-full sm:w-auto flex-shrink-0">{action}</div>}
    </div>
  );
}

export function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-surface rounded-lg border border-line shadow-card p-4 sm:p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function StatCard({ title, value, icon, linkText, linkHref, onClick, color = "navy" }) {
  const colorClass =
    color === "orange"
      ? "bg-orange-50 text-orange-600"
      : "bg-navy-50 text-navy-700";

  return (
    <div className="bg-surface rounded-lg border border-line shadow-card p-4 sm:p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-navy-900 mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClass}`}>
          {icon}
        </div>
      </div>
      {linkText && (
        <button
          onClick={onClick}
          className="inline-flex items-center text-sm font-semibold text-navy-700 hover:text-orange-600 min-h-[44px] py-2 transition-colors"
        >
          {linkText} →
        </button>
      )}
    </div>
  );
}

export function StatusBadge({ status }) {
  const map = {
    published: { label: "Terbit", class: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    draft: { label: "Draf", class: "bg-gray-100 text-gray-700 border-gray-200" },
    scheduled: { label: "Dijadwalkan", class: "bg-navy-50 text-navy-700 border-navy-200" },
    active: { label: "Aktif", class: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    inactive: { label: "Nonaktif", class: "bg-gray-100 text-gray-600 border-gray-200" },
  };

  const item = map[status] || { label: status, class: "bg-gray-100 text-gray-700 border-gray-200" };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${item.class}`}>
      {item.label}
    </span>
  );
}

export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="bg-surface rounded-lg border border-line shadow-card p-8 sm:p-12 text-center flex flex-col items-center justify-center">
      {icon && <div className="w-16 h-16 rounded-full bg-navy-50 text-navy-700 flex items-center justify-center mb-4">{icon}</div>}
      <h3 className="text-lg font-bold text-navy-900 mb-1">{title}</h3>
      {description && <p className="text-sm text-gray-500 max-w-md mb-6">{description}</p>}
      {action && action}
    </div>
  );
}

export function Toast({ message, type = "success", onClose }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-lg shadow-card text-white font-medium text-sm flex items-center gap-3 transition-all ${
        type === "error" ? "bg-red-600" : "bg-navy-900 border border-orange-500/30"
      }`}
    >
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="text-white/80 hover:text-white font-bold ml-2">
          ×
        </button>
      )}
    </div>
  );
}

export function FormField({ label, required, error, helperText, children }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-semibold text-navy-900">
          {label} {required && <span className="text-orange-600">*</span>}
        </label>
      )}
      {children}
      {helperText && !error && <p className="text-xs text-gray-500">{helperText}</p>}
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
}
