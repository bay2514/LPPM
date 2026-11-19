import React from "react";
import { isValidExternalUrl, normalizeUrl } from "@shared/lib/externalLink.js";

export function ExternalLink({
  url,
  children,
  className = "",
  fallbackText = "Tautan belum diisi",
  showIcon = true,
}) {
  const validUrl = normalizeUrl(url);

  if (!validUrl) {
    if (import.meta.env.DEV) {
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-xs font-medium cursor-not-allowed ${className}`}
          title="URL eksternal belum dikonfigurasi / tidak valid"
        >
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          {fallbackText}
        </span>
      );
    }
    return null;
  }

  return (
    <a
      href={validUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 min-h-[44px] min-w-[44px] py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg transition-colors ${className}`}
    >
      <span>{children}</span>
      {showIcon && (
        <svg
          className="w-3.5 h-3.5 opacity-70 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      )}
      <span className="sr-only">(membuka situs baru)</span>
    </a>
  );
}
